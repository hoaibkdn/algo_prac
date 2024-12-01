/**
 * [
 * [0, 0, 1, 0, 0, 0]
 * [0, 0, 0, 1, 1, 1]
 * [0, 0, 0, 1, 1*, 1] // size x size x-1
 * [0, 0, 1, 1, 1, 1]
 * ]
 * https://leetcode.com/problems/maximal-square/description/
 *
 * Observations:
 * - We don't care about 0s, only 1s
 * - dp[i][j] =
 *     + 0 when a[i][j] = 0
 *     + size of the largest square of 1s, with bottom-right corner at (i, j)
 *
 * - dp[i][j] is size of largest square of 1s, with bottom-right corner at (i,j)
 * - dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 when a[i][j] = 1
 *     otherwise: a[i][j] = 0 => dp[i][j] = 0
 * base: dp[i][j] = 0 : i = -1 or j = -1
 * result: max(dp[i][j]) (i = 0...n-1, j = 0...m-1)
 *
 * 1 1 1 1
 * 1 1 1 1
 * 1 1 1 1
 * 1 1 1 1* <- (i, j)
 *
 *
 * bottom up: tinh gia tri cua nhung cai truoc de tinh ra duoc gia tri hien tai
 * top down: di tu ket qua ve lai base de tinh gia tri hien tai
 * x x x x x
 * x x 0 0 x
 * x x x x x
 * 0 x x x x
 * x x x 3 3
 * 0 x x 3 ?
 *
 * @format
 */

var dp = function (matrix, memo, i, j) {
  if (i === -1 || j === -1) return 0;
  if (matrix[i][j] === '0') return 0;
  if (memo[i][j] !== undefined) return memo[i][j];
  memo[i][j] =
    Math.min(
      dp(matrix, memo, i - 1, j),
      dp(matrix, memo, i - 1, j - 1),
      dp(matrix, memo, i, j - 1)
    ) + 1;
  return memo[i][j];
};

var maximalSquare = function (matrix) {
  const n = matrix.length,
    m = matrix[0].length;
  const memo = Array(n);
  for (let i = 0; i < n; i++) {
    memo[i] = Array(m);
  }
  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      res = Math.max(dp(matrix, memo, i, j), res);
    }
  }
  return res * res;
};

const matrix = [
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0'],
];
console.log(maximalSquare(matrix));
