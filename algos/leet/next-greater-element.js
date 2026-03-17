// const findNextGreater = (array, value, index) => {
//   for (let i = index + 1; i < array.length; i++) {
//     if (array[i] > value) {
//       return [array[i], i - index]
//     }
//   }
//   return [-1, -1];
// }

// function findNextGreaterElementsWithDistance(readings) {
//   return readings.map((reading, index) => {
//     if (index === readings.length - 1) {
//       return [-1, -1];
//     }

//     const [nextValue, nextIndex] = findNextGreater(readings, reading, index);
//     if (nextValue > 0) {
//       return [nextValue, nextIndex];
//     }
//     return [-1, -1]
//   });
// }

function findNextGreaterElementsWithDistance(readings) {
  const {length} = readings;
  // start with an array of all the default values
  const results = Array.from({length}, () => [-1, -1]);
  // our stack is going to track the indexes of
  const stack = [];

  for (let i = 0; i < length; i++) {
    while (stack.length > 0 && readings[stack[stack.length - 1]] < readings[i]) {
      const index = stack.pop();
      results[index] = [readings[i], i - index];
    }
    stack.push(i);
  }

  return results;
}

const readings = [2, 1, 2, 4, 3];
console.log(findNextGreaterElementsWithDistance(readings));
