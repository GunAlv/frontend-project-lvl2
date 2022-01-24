import { FILE_FORMATS } from '../constants.js';

const parsers = {
  [FILE_FORMATS.JSON]: JSON.parse,
};

const parse = (type, config) => parsers[type](config);

export default parse;
