import { isObject } from '../helpers.js';

import { DIFF_TYPES } from '../constants.js';

const getPath = (key, path) => [...path, key].join('.');

const stringify = (value) => {
  if (isObject(value)) return '[complex value]';

  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const plain = (diff) => {
  const iter = (node, path) => {
    switch (node.type) {
      case DIFF_TYPES.ROOT: {
        return node.children.flatMap((child) => iter(child, ''));
      }
      case DIFF_TYPES.ADDED: {
        const value = stringify(node.value);
        const property = getPath(node.key, path);

        return `Property '${property}' was added with value: ${value}`;
      }
      case DIFF_TYPES.REMOVED: {
        const property = getPath(node.key, path);

        return `Property '${property}' was removed`;
      }
      case DIFF_TYPES.UNEQUAL: {
        const { old: oldValue, new: newValue } = node.value;

        const stringifiedOldValue = stringify(oldValue);
        const stringifiedNewValue = stringify(newValue);

        const property = getPath(node.key, path);

        return `Property '${property}' was updated. From ${stringifiedOldValue} to ${stringifiedNewValue}`;
      }
      case DIFF_TYPES.NESTED: {
        return node.children.flatMap((child) => iter(child, [...path, node.key]));
      }
      case DIFF_TYPES.EQUAL: {
        return [];
      }
      default: {
        throw new Error(`Can't render node type ${node.type}`);
      }
    }
  };

  return iter(diff, []).join('\n');
};

export default plain;
