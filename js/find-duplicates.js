// Input: numbers = [3,2,6,5,0,3,10,3,10,5]
// Output: true
// Explanation: 3,5, and 10 appears more than once.

export default function findDuplicates(numbers) {
  let map = new Map();

  for (let num of numbers) {
    if (!map.has(num)) {
      map.set(num, 1);
    } else {
      return true;
    }
  }
  return false;
}

export function findDuplicatesTwo(numbers) {
  let orderedNumbers = numbers.sort();

  let currentValue = orderedNumbers[0];
  for (let i = 1; i < orderedNumbers.length; i++) {
    if (orderedNumbers[i] === currentValue) {
      return true;
    } else {
      currentValue = orderedNumbers[i];
    }
  }

  return false;
}
