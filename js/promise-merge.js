// Implement a function that accepts two promises and returns a single Promise. This returned promise fulfills when both input promises fulfill, with a single value according to the order and types of the fulfillment values:

//     Numbers should be added together.
//     Strings should be concatenated.
//     Arrays should be combined into a single array.
//     Plain objects should be merged into a single object.
//     Other types aren't supported.

export default function promiseMerge(p1, p2) {
  return Promise.all([p1, p2]).then(([result1, result2]) => {
    try {
      if (typeof result1 === 'number' && typeof result2 === 'number') {
        return result1 + result2;
      }

      if (typeof result1 === 'string' && typeof result2 === 'string') {
        return result1 + result2;
      }

      if (Array.isArray(result1) && Array.isArray(result2)) {
        return [...result1, ...result2];
      }

      if (isPlainObject(result1) && isPlainObject(result2)) {
        return {...result1, ...result2};
      }

      throw 'Unsupported data types';
    } catch {
      throw 'Unsupported data types';
    }
  });
}

const isPlainObject = (value) => {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
