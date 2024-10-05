/*
https://leetcode.com/problems/house-robber/
https://leetcode.com/problems/house-robber-ii/
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Example 2:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.

[1,2,1,2,1,2,3]

f[i] = res[1..i]

f[1] = a[1]
f[2] = max(a[1], a[2])
f[3] = max(f[2], a[3] + f[1])

f[i] = max(f[i-1], a[i] + f[i-2])

f[1] = a[1]
f[2] = max(a[1], a[2])
f[3] = max(f[2], a[3])
f[4] = max(f[3], max(f(x))) x = 2...4

f(i) = max(f(i-1), max(f(2...i))


*/

var rob = function(nums) {
  return findMax(nums, {}, nums.length - 1)
};

var findMax = function(nums, memo, i) {
  if(i === 0) {
    return nums[0]
  }
  if(i === 1) {
    return Math.max(nums[0], nums[1])
  }
  if(memo[i] === undefined) {
    memo[i] = Math.max(findMax(nums, memo, i - 1), nums[i] + findMax(nums, memo, i - 2))  
  }
  return memo[i]
}

// console.log(rob([1,2,3,1]))
// console.log(rob([2,7,9,3,1]))
// console.log(rob([1,2,1,2,1,2,3]))

var rob2 = function(nums) {
  if(nums.length === 1) {
    return nums[0]
  }
  return Math.max(findMax(nums, {}, nums.length - 2), findMax(nums.slice(1), {}, nums.length - 2))
};

console.log(rob2([2,3,2]))
console.log(rob2([1,2,3,1]))
console.log(rob2([1,2,3]))