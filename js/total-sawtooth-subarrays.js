function getConsecutiveArrays(arr) {
  const result = [];
  const n = arr.length;

  for (let start = 0; start < n; start++) {
    for (let end = start; end < n; end++) {
      // slice(start, end + 1) gives arr[start..end]
      result.push(arr.slice(start, end + 1));
    }
  }

  return result;
}

function isOddEvenSawtooth(arr) {
  if (arr.length <= 1) return true;

  const isOdd = x => x % 2 !== 0;

  for (let i = 0; i < arr.length - 1; i++) {
    if (isOdd(arr[i]) === isOdd(arr[i + 1])) {
      return false;
    }
  }

  return true;
}

export default function totalSawtoothSubarrays(array) {
  const subArrays = getConsecutiveArrays(array);
  let count = 0;

  for (let i = 0; i < subArrays.length; i++) {
    if (isOddEvenSawtooth(subArrays[i])) {
      count++;
    }
  }
  return count;
}
