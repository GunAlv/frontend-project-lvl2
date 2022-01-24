import fs from 'fs';
import path from 'path';

import parse from './parsers/index.js';
import buildAST from './build-ast.js';

import { FILE_FORMATS, DIFF_TYPES } from './constants.js';

const getFileData = (file) => {
  const filePathConfig = path.resolve(file);
  const [, format] = path.extname(filePathConfig).split('.');
  const config = fs.readFileSync(filePathConfig, 'utf-8');

  return parse(format, config);
};

const renderDiff = (diff, format) => {
  const result = diff.reduce((acc, currentDiff) => {
    const { type, key, value } = currentDiff;

    switch (type) {
      case DIFF_TYPES.EQUAL: return [...acc, `  ${key}: ${value}`];
      case DIFF_TYPES.REMOVED: return [...acc, `- ${key}: ${value}`];
      case DIFF_TYPES.ADDED: return [...acc, `+ ${key}: ${value}`];
      case DIFF_TYPES.UNEQUAL:
        return [
          ...acc,
          `- ${key}: ${value.old}`,
          `+ ${key}: ${value.new}`,
        ];
      default:
        return acc;
    }
  }, []);

  if (format === FILE_FORMATS.JSON) {
    return JSON.stringify(result, null, 2);
  }

  return result;
};

const genDiff = (file1, file2, format = FILE_FORMATS.JSON) => {
  const config1 = getFileData(file1);
  const config2 = getFileData(file2);

  const diff = buildAST(config1, config2);

  return renderDiff(diff, format);
};

export default genDiff;
