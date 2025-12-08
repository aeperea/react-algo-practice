// Implement a function that takes one or more values and returns a function that cycles through those values each time it is called.

export default function cycle(...values) {
  let currentIndex = 0;
  const len = values.length;
  return () => {
    const newValue = values[currentIndex];
    currentIndex = currentIndex + 1 === len ? 0 : currentIndex + 1;
    return newValue;
  }
}
