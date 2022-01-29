import { DIFF_TYPES } from './constants.js';
import { isObject, hasOwnProperty } from './helpers.js';

const buildAST = (config1, config2) => {
  const config1Keys = Object.keys(config1);
  const config2Keys = Object.keys(config2);
  const mergedKeys = [...new Set([...config1Keys, ...config2Keys])];
  const sortedKeys = [...mergedKeys].sort();

  const result = sortedKeys.map((currentKey) => {
    const config1Value = config1[currentKey];
    const config2Value = config2[currentKey];

    switch (true) {
      case !hasOwnProperty(config1, currentKey) && hasOwnProperty(config2, currentKey):
        return { type: DIFF_TYPES.ADDED, key: currentKey, value: config2Value };
      case hasOwnProperty(config1, currentKey) && !hasOwnProperty(config2, currentKey):
        return { type: DIFF_TYPES.REMOVED, key: currentKey, value: config1Value };
      case isObject(config1Value) && isObject(config2Value):
        return {
          type: DIFF_TYPES.NESTED,
          key: currentKey,
          children: buildAST(config1Value, config2Value),
        };
      case config1Value !== config2Value:
        return { type: DIFF_TYPES.UNEQUAL, key: currentKey, value: { old: config1Value, new: config2Value } };
      case config1Value === config2Value:
        return { type: DIFF_TYPES.EQUAL, key: currentKey, value: config1Value };
      default:
        throw new Error(`${currentKey} can't be compared`);
    }
  });

  return result;
};

export default (config1, config2) => ({
  type: DIFF_TYPES.ROOT,
  children: buildAST(config1, config2),
});
