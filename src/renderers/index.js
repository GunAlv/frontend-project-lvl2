import stylish from './stylish.js';
import plain from './plain.js';

import { OUTPUT_FORMATS } from '../constants.js';

const renderers = {
  [OUTPUT_FORMATS.STYLISH]: stylish,
  [OUTPUT_FORMATS.PLAIN]: plain,
  [OUTPUT_FORMATS.JSON]: JSON.stringify,
};

export default (diff, format) => (
  format === OUTPUT_FORMATS.JSON
    ? renderers[OUTPUT_FORMATS.JSON](diff, null, 2)
    : renderers[format](diff)
);
