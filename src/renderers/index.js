import { DIFF_TYPES } from '../constants.js';

const render = (diff) => {
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
  }, [])
    .map((str) => str.padStart(str.length + 2)); // TODO

  return ['{', ...result, '}'].join('\n');
};

export default render;
