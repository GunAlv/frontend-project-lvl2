import fs from 'fs';
import path from 'path';

import parse from './parsers/index.js';
import render from './renderers/index.js';
import buildAST from './build-ast.js';

import { OUTPUT_FORMATS } from './constants.js';

const getFileData = (file) => {
  const filePathConfig = path.resolve(file);
  const [, format] = path.extname(filePathConfig).split('.');
  const config = fs.readFileSync(filePathConfig, 'utf-8');

  return parse(config, format);
};

const genDiff = (file1, file2, format = OUTPUT_FORMATS.STYLISH) => {
  const config1 = getFileData(file1);
  const config2 = getFileData(file2);

  const diff = buildAST(config1, config2);

  return render(diff, format);
};

export default genDiff;
