/**
 * Given an integer array nums, return the length of the longest strictly increasing subsequence.
 *
 * Example 1:
 * Input: nums = [10,9,2,5,3,7,101,18]
 * Output: 4
 * Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
 *      1 2 3 4 4
 *     [1 2 3 4 3]
 *      0 1 2 3
 *    [10,9,2,5,3,7,101,2,19]
 * dp[i] = max length cua increasing subsequence tu 0 -> i co last num la nums[i]
 * dp[i] = max(dp[j]) + 1 khi nums[j] < nums[i]
 *     nums[0]... nums[i-1] >= nums[i]: dp[i] = 1
 * base: dp[0] = 1
 * return max(dp[0...n-1])
 *
 * Example 2:
 * Input: nums = [0,1,0,3,2,3]
 * Output: 4
 *
 * Example 3:
 * Input: nums = [7,7,7,7,7,7,7]
 * Output: 1
 *
 * Constraints:
 * 1 <= nums.length <= 2500
 * -10^4 <= nums[i] <= 10^4
 *
 * https://leetcode.com/problems/longest-increasing-subsequence
 *
 * @format
 */

var dp = function (nums, i, memo) {
  if (i === 0) {
    return 1;
  }
  if (memo[i]) return memo[i];
  memo[i] = 1;
  for (let j = 0; j < i; j++) {
    if (nums[j] < nums[i]) {
      memo[i] = Math.max(memo[i], dp(nums, j, memo) + 1);
    }
  }
  return memo[i];
};

var lengthOfLIS2 = function (nums) {
  const len = nums.length;
  const memo = Array(len).fill(0);
  let maxRes = 0;
  for (let i = len - 1; i >= 0; i--) {
    maxRes = Math.max(maxRes, dp(nums, i, memo));
  }
  return maxRes;
};

var lengthOfLIS = function (nums) {
  const len = nums.length;
  const memo = Array(len).fill(0);
  for (let i = 0; i < len; i++) {
    memo[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        memo[i] = Math.max(memo[i], memo[j] + 1);
      }
    }
  }
  return Math.max(...memo);
};

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7]));
