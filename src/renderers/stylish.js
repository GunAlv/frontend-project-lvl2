import { isObject } from '../helpers.js';

import { DIFF_TYPES } from '../constants.js';

const makeIndent = (depth, count = 4) => ' '.repeat(depth * count - 2);

const stringify = (value, depth) => {
  if (!isObject(value)) return value;

  const result = Object.entries(value).map(([key, content]) => {
    const stringifiedContent = `${stringify(content, depth + 1)}`;

    return `${makeIndent(depth + 1)}  ${key}: ${stringifiedContent}`;
  });

  return `{\n${result.join('\n')}\n${makeIndent(depth)}  }`;
};

const stylish = (diff) => {
  const iter = (node, depth) => {
    switch (node.type) {
      case DIFF_TYPES.ROOT: {
        const body = node.children.map((child) => iter(child, depth + 1)).join('\n');
        return `{\n${body}\n}`;
      }
      case DIFF_TYPES.ADDED: {
        const value = stringify(node.value, depth);
        return `${makeIndent(depth)}+ ${node.key}: ${value}`;
      }
      case DIFF_TYPES.REMOVED: {
        const value = stringify(node.value, depth);
        return `${makeIndent(depth)}- ${node.key}: ${value}`;
      }
      case DIFF_TYPES.UNEQUAL: {
        const oldValue = stringify(node.value.old, depth);
        const newValue = stringify(node.value.new, depth);

        const stringifiedOldValue = `${makeIndent(depth)}- ${node.key}: ${oldValue}`;
        const stringifiedNewValue = `${makeIndent(depth)}+ ${node.key}: ${newValue}`;

        return `${stringifiedOldValue}\n${stringifiedNewValue}`;
      }
      case DIFF_TYPES.EQUAL: {
        const value = stringify(node.value, depth);
        return `${makeIndent(depth)}  ${node.key}: ${value}`;
      }
      case DIFF_TYPES.NESTED: {
        const body = node.children.map((child) => iter(child, depth + 1)).join('\n');
        const value = `{\n${body}\n${makeIndent(depth)}  }`;
        return `${makeIndent(depth)}  ${node.key}: ${value}`;
      }
      default: {
        throw new Error(`Can't render node type ${node.type}`);
      }
    }
  };

  return iter(diff, 0);
};

export default stylish;
