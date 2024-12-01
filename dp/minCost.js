/**
 *
 *     dp[i] = min cost to reach 1 or 2 steps ahead (i+1 or i+2)
 *     i la vi tri de tong cost nho nhat tai vi tri do
 *     dp[i] = min((dp[i-1] + cost[i]), (dp[i-2] + cost[i]))
 *     base: dp[0] = cost[0]
 *         dp[1] = cost[1]
 *     return min(dp[n-1], dp[n-2])
 *
 * @format
 * @param {number[]} cost
 * @return {number} dp[i] = min cost when reaching step ith return dp[n] dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]) dp[0] = dp[1] = 0
 */

/**var dp = function(cost, memo, i) {
    if(i <= 1) return cost[i]
    if(memo[i]) return memo[i] // 2
    memo[i] = Math.min(dp(cost, memo, i-1), dp(cost, memo, i-2)) + cost[i] 
    return memo[i]
}*/
var dp = function (cost, memo, i) {
  if (i <= 1) return 0;
  if (memo[i] !== undefined) return memo[i]; // 2
  memo[i] = Math.min(
    dp(cost, memo, i - 1) + cost[i - 1],
    dp(cost, memo, i - 2) + cost[i - 2]
  );
  return memo[i];
};
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  const memo = Array(n);
  //return Math.min(dp(cost, memo, n-1), dp(cost, memo, n-2))
  return dp(cost, memo, n);
};
