function isObject(value) {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function hasOwnProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}

export {
  isObject,
  hasOwnProperty,
};
