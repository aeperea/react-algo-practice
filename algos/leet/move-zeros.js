// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Note that you must do this in-place without making a copy of the array.

function moveZeros(nums) {
  let nonZeroIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[i];
      nums[i] = nums[nonZeroIndex];
      nums[nonZeroIndex] = temp;
      nonZeroIndex++;
    }
  }

  return nums;
}

const n = [0,1,0,3,12];
console.log(moveZeros(n));
