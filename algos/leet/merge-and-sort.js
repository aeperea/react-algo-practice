// Given an array of intervals [startTime, endTime], merge all overlapping intervals and return a sorted array of non-overlapping intervals.
// Input
// intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
// Output [[1, 6], [8, 10], [15, 18]]


function mergeHighDefinitionIntervals(intervals) {
  if (intervals.length === 0) return intervals;

  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
  let mergedList = [sortedIntervals[0]];
  let mergedIndex = 0;

  for (let i = 1; i < sortedIntervals.length; i++) {
    const [a, b] = sortedIntervals[i];
    const [lastMergedA, lastMergedB] = mergedList[mergedIndex];
    if (a <= lastMergedB) {
      mergedList[mergedIndex] = [lastMergedA, b];
    } else {
      mergedList.push([a, b]);
      mergedIndex++;
    }
  }

  return mergedList;
}

const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
const result = mergeHighDefinitionIntervals(intervals);

console.log(result.map(x => x.join(' ')).join('\n') + '\n');

