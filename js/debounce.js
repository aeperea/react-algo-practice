export default function debounce(fn, delay) {
  let timeoutId = null;

  return function debounced(...args) {
    const context = this;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn.apply(context, args);
    }, delay);
  }
}
