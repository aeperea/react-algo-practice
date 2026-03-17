// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.



// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]

function twoSum(list, target) {
  const listMap = new Map();
  for (let i = 0; i < list.length; i++) {
    const complement = target - list[i];
    if (listMap.has(complement)) {
      return [listMap.get(complement), i];
    }
    listMap.set(list[i], i)
  }
}

// const nums = [2,7,11,15];
// const target = 9;
const nums = [3,2,4];
const target = 6;

console.log(twoSum(nums, target));

