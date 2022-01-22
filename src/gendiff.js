import fs from 'fs';
import path from 'path';

import hasOwnProperty from './helpers.js';

import { FILE_FORMATS, DIFF_TYPES } from './constants.js';

const getFileData = (file) => {
  const filePathConfig = path.resolve(file);
  const [, format] = path.extname(filePathConfig).split('.');
  const config = fs.readFileSync(filePathConfig, 'utf-8');

  if (format === FILE_FORMATS.JSON) return JSON.parse(config);

  return config;
};

const getDiff = (config1, config2) => {
  const config1Keys = Object.keys(config1);
  const config2Keys = Object.keys(config2);
  const mergedKeys = [...new Set([...config1Keys, ...config2Keys])];

  const result = mergedKeys.map((currentKey) => {
    const config1Value = config1[currentKey];
    const config2Value = config2[currentKey];

    switch (true) {
      case config1Value === config2Value:
        return { type: DIFF_TYPES.EQUAL, key: currentKey, value: config1Value };
      case hasOwnProperty(config1, currentKey) && !hasOwnProperty(config2, currentKey):
        return { type: DIFF_TYPES.REMOVED, key: currentKey, value: config1Value };
      case !hasOwnProperty(config1, currentKey) && hasOwnProperty(config2, currentKey):
        return { type: DIFF_TYPES.ADDED, key: currentKey, value: config2Value };
      case config1Value !== config2Value:
        return { type: DIFF_TYPES.UNEQUAL, key: currentKey, value: { old: config1Value, new: config2Value } };
      default:
        throw new Error(`${currentKey} can't be compared`);
    }
  })
    .sort((a, b) => a.key.localeCompare(b.key));

  return result;
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

  const diff = getDiff(config1, config2, format);

  return renderDiff(diff, format);
};

export default genDiff;
