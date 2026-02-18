// Problem:
// Determine whether there exists an index where the sum of elements on the left equals the sum on the right. Return "YES" or "NO".

// [1,2,3,3] => YES
// [1,2] => NO

function balancedSums(arr) {
  let leftSum = 0;
  let total = arr.reduce((sum, val) => sum + val);

  for (let i = 0; i < arr.length; i++) {
    let rightSum = total - leftSum - arr[i];
    if (leftSum === rightSum) return `YES with index ${i}`;
    leftSum += arr[i];
  }

  return 'NO';
}

console.log(balancedSums([1,2,3,3]));
console.log(balancedSums([1,2]));
