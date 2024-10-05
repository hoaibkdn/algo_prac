/*
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem using only constant extra space.

Example 1:     1  2 3 4 5 
Input: nums = [1,3,4,2,2]
Output: 2

den 1 so thu i
mark thang thu nums[i] am

nums[nums[i]] < 0

Example 2:
Input: nums = [3,1,3,4,2]
Output: 3

nums = [1,3,4,2,2]

*/
// https://leetcode.com/problems/find-the-duplicate-number/
var findDuplicate = function(nums) {
  for(let i = 0; i < nums.length; i++) {
    if(nums[Math.abs(nums[i])- 1] > 0) {
      nums[Math.abs(nums[i])- 1] *= -1
    } else {
      return Math.abs(nums[i])
    }
  }
  return -1
}

console.log(findDuplicate([1,3,4,2,2]))
console.log(findDuplicate([3,1,3,4,2]))


// https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts/

var minimumOperations = function(nums) {
  const obj = {}
  let containedZero = false
  for(let i = 0; i < nums.length; i++) {
    if(!nums[i]) {
      containedZero = true
    }
    obj[nums[i]] =  obj[nums[i]] ? obj[nums[i]] + 1 : 1
  }
  return containedZero ? Object.keys(obj).length - 1 : Object.keys(obj).length
};

console.log(minimumOperations([0]))