/**
 * https://leetcode.com/problems/minimum-size-subarray-sum/description/
 *
 * Given an array of positive integers nums and a positive integer target, return the minimal length of a
 * subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.
 *
 * Example 1:
 * Input: target = 7, nums = [2,3,1,2,4,3]
 * Output: 2
 * Explanation: The subarray [4,3] has the minimal length under the problem constraint.
 *
 * Example 2:
 * Input: target = 4, nums = [1,4,4]
 * Output: 1
 *
 * Example 3:
 * Input: target = 11, nums = [1,1,1,1,1,1,1,1]
 * Output: 0
 *
 * Constraints:
 * 1 <= target <= 10^9
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^4
 *       x   - - - - -
 * 1 2 3 4 5 6 7 8 9 10
 *
 * n = nums.length
 * Let sum[l..] = nums[l] + nums[l+1] + nums[l+2] + ...
 * sum[l..r] = nums[l] + nums[l+1] + ... + nums[r] = target
 *           = S - prefixSum[0..l-1] - suffixSum[r+1, n-1] = target
 *          => S - target = prefixSum[0..l-1] + suffixSum[r+1, n-1]
 * sum[l..r] = sum[l..n-1] - sum[r+1..n-1] = target
 *          => sum[r+1..n-1] = sum[l..n-1] - target
 *
 * sum[l..r] = sum[0..r] - x >= target
 *          => x >= sum[0..r] - target
 *          => prefixSum[l-1] >= prefixSum[r] - target
 *
 * map {
 *     sum: pos
 * }
 * r   0....     n
 * l
 *    [2,3,1,2,4,3]
 *
 * l <= r: sum[l..r] = sum[0...r] - sum[0...l-1] = target
 * l: [0..r-1]
 * memo = {
 *     sum[0...r]: r
 * }
 *
 * sum[l..r] >= target, l max of r
 * sum[l..r+1] >= target, find l max of r+1
 * sum[l+1..r+1] < target => lmax[r+1] = l
 *
 *
 * nhi phan dap an: 000011111, chon doan x bat ky
 *       r
 * 2,3,1,2,4,3, target = 7
 * 2 3 1 (x = 3)
 *   3 1 2
 *     1 2 4
 *       2 4 3
 *
 * sum = 7
 * curlen = 2
 * res = 2
 *
 * @format
 */

var minSubArrayLen = function (target, nums) {
  let l = 0,
    r = 0,
    min = 1000000,
    sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (sum >= target) {
      r = i;
      break;
    }
  }
  if (sum < target) return 0;

  while (r < nums.length) {
    // stop when sum - nums[l] < target

    if (sum >= target) {
      min = Math.min(min, r - l + 1);
    }

    while (sum - nums[l] >= target) {
      sum = sum - nums[l];
      l++;
      min = Math.min(min, r - l + 1);
    }
    r++;
    sum += nums[r];
  }
  if (min === 1000000) return 0;
  return min;
};

var minSubArrayLen2 = function (target, nums) {
  const memo = { 0: -1 };
  let temp = 0;
  let min = 1000000;
  for (let r = 0; r < nums.length; r++) {
    temp += nums[r];
    let prefixSum = temp - target; // 0
    if (memo[prefixSum]) {
      min = Math.min(min, r - memo[prefixSum]);
    }
    memo[temp] = r; // neu max thi memo[temp] = r thi r luon nho nhat, k can cap nhat vi memo[temp] da la nho nhat
  }
  if (min === 1000000) return 0;
  return min;
};

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
console.log(minSubArrayLen(4, [1, 4, 4]));
console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]));
console.log(minSubArrayLen(11, [4, 4, 4]));
