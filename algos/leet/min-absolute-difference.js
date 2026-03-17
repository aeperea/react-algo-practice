// Minimum Absolute Difference
// Given an array of integers, return all pairs of elements with the minimum absolute difference.
// [4,2,1,3] => [[1,2],[2,3],[3,4]]

function minAbsoluteDiff(arr) {
  arr.sort((a, b) => a - b);

  let minDiff = Infinity;
  let solution = [];

  for (let i = 1; i < arr.length; i++) {
    minDiff = Math.min(minDiff, arr[i] - arr[i - 1]);
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] === minDiff) {
      solution.push([arr[i - 1], arr[i]]);
    }
  }

  return solution;
}

console.log(minAbsoluteDiff([4,2,1,3]));
console.log(minAbsoluteDiff([0,5,-10,99, 104]));

const node = (value, left = null, right = null) => ({value, left,  right});
