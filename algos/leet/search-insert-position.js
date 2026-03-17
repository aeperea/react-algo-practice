const searchInsert = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid = 0;

  while (left <= right) {
    mid = Math.floor((left + right)/2);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return target > nums[mid] ? mid + 1: mid;
};

const nums = [1,3,5,6];

console.log(searchInsert(nums, 5))
console.log(searchInsert(nums, 2))
console.log(searchInsert(nums, 7))
