import yaml from 'js-yaml';

import { FILE_FORMATS } from '../constants.js';

const parsers = {
  [FILE_FORMATS.JSON]: JSON.parse,
  [FILE_FORMATS.YAML]: yaml.load,
  [FILE_FORMATS.YML]: yaml.load,
};

const parse = (type, config) => parsers[type](config);

export default parse;
