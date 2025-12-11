// lodash's isEmpty
// isEmpty(null); // => true
// isEmpty(true); // => true
// isEmpty(1); // => true
// isEmpty([1, 2, 3]); // => false
// isEmpty({ a: 1 }); // => false

export default function isEmpty(value) {
  if (value === null) {
    return false;
  }

  if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'symbol') {
    return true;
  }

  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}
