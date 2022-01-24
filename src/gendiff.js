import fs from 'fs';
import path from 'path';

import parse from './parsers/index.js';
import render from './renderers/index.js';
import buildAST from './build-ast.js';

import { FILE_FORMATS } from './constants.js';

const getFileData = (file) => {
  const filePathConfig = path.resolve(file);
  const [, format] = path.extname(filePathConfig).split('.');
  const config = fs.readFileSync(filePathConfig, 'utf-8');

  return parse(format, config);
};

const genDiff = (file1, file2, format = FILE_FORMATS.JSON) => {
  const config1 = getFileData(file1);
  const config2 = getFileData(file2);

  const diff = buildAST(config1, config2);

  return render(diff, format);
};

export default genDiff;
