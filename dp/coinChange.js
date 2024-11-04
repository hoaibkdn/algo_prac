/**
 * You are given an integer array coins representing coins of different denominations and an integer
 * amount representing a total amount of money.
 *
 * Return the fewest number of coins that you need to make up that amount. If that amount of money
 * cannot be made up by any combination of the coins, return -1.
 *
 * You may assume that you have an infinite number of each kind of coin.
 *
 * [9, 7, 1]
 * [8. 5, 6]
 *
 * dapan[11] = min[dapan[10], dapan[9], dapan[6]] + 1
 * dapan[10] = min[dapan[9], dapan[8], dapan[5]] + 1
 * dapan[9] = min[dapan[8], dapan[7], dapan[4]] + 1
 *
 * 1. so luong coin it nhat de tao thanh tong = i
 * 2. dp[i] = min(dp[i - coins[j]]) + 1 for i in 0...coins.length-1 and i - coins[j] >= 0
 * 3. base: dp[0] = 0, invalid: dp[i] = inf
 * 4. return dp[amount]
 *
 * Example 1:
 * Input: coins = [1,2,5], amount = 11 // 1
 * Output: 3
 * Explanation: 11 = 5 + 5 + 1
 *
 * Example 2:
 * Input: coins = [2], amount = 3
 * Output: -1
 *
 * Example 3:
 * Input: coins = [1], amount = 0
 * Output: 0
 *
 * Constraints:
 * 1 <= coins.length <= 12
 * 1 <= coins[i] <= 2^31 - 1
 * 0 <= amount <= 10^4
 *
 * https://leetcode.com/problems/coin-change/
 *
 * @format
 */

var dp = function (coins, i, memo) {
  if (i < 0) {
    return 1000000;
  }
  if (i === 0) {
    return 0;
  }
  if (memo[i]) {
    return memo[i];
  }
  memo[i] = 1000000;
  for (let j = 0; j < coins.length; j++) {
    memo[i] = Math.min(memo[i], dp(coins, i - coins[j], memo) + 1);
  }
  return memo[i];
};

var coinChange2 = function (coins, amount) {
  const memo = {};
  const res = dp(coins, amount, memo);
  if (res === 1000000) {
    return -1;
  }
  return res;
};

var coinChange = function (coins, amount) {
  const memo = {};
  for (let i = 0; i <= amount; i++) {
    if (i === 0) {
      memo[i] = 0;
      continue;
    }
    if (memo[i] === undefined) {
      memo[i] = 1000000;
    }
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] < 0) {
        continue;
      }
      memo[i] = Math.min(memo[i], memo[i - coins[j]] + 1);
    }
  }
  if (memo[amount] === 1000000) return -1;
  return memo[amount];
};

console.log(coinChange([1, 2, 5], 11));
console.log(coinChange([1, 2, 6], 11));
console.log(coinChange([1, 2, 6], 0));
console.log(coinChange([8, 6, 4, 1], 10));
console.log(coinChange([2], 3));
console.log(coinChange([1], 0));
