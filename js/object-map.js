// Implement a function objectMap(obj, fn) to return a new object containing the results of calling a provided function on every value in the object. The function fn is called with a single argument, the value that is being mapped/transformed.

export default function objectMap(obj, fn) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn.apply(obj, [value])])
  );
}
