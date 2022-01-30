import stylish from './stylish.js';
import plain from './plain.js';

import { OUTPUT_FORMATS } from '../constants.js';

const renderers = {
  [OUTPUT_FORMATS.STYLISH]: stylish,
  [OUTPUT_FORMATS.PLAIN]: plain,
};

export default (diff, format) => renderers[format](diff);
