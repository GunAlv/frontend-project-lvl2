import stylish from './stylish.js';

import { OUTPUT_FORMATS } from '../constants.js';

const renderers = {
  [OUTPUT_FORMATS.STYLISH]: stylish,
};

export default (diff, format) => renderers[format](diff);
