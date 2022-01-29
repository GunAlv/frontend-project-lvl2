function isObject(value) {
  return typeof value === 'object' && !Array.isArray(value);
}

function hasOwnProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}

export {
  isObject,
  hasOwnProperty,
};
