/**
 * https://leetcode.com/problems/longest-common-subsequence/description/
 *
 * Given two strings text1 and text2, return the length of their longest common subsequence. If there is no
 * common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters (can be
 * none) deleted without changing the relative order of the remaining characters.
 *
 * For example, "ace" is a subsequence of "abcde".
 * A common subsequence of two strings is a subsequence that is common to both strings.
 *
 * Example 1:
 * Input: text1 = "abcde", text2 = "ace"
 * Output: 3
 * Explanation: The longest common subsequence is "ace" and its length is 3.
 *
 * Example 2:
 * Input: text1 = "abc", text2 = "abc"
 * Output: 3
 * Explanation: The longest common subsequence is "abc" and its length is 3.
 *
 * Example 3:
 * Input: text1 = "abc", text2 = "def"
 * Output: 0
 * Explanation: There is no such common subsequence, so the result is 0.
 *
 * Constraints:
 * 1 <= text1.length, text2.length <= 1000
 * text1 and text2 consist of only lowercase English characters.
 *
 * Observations:
 * - text1 = ".....x"
 * - text2 = ".....y"
 * - Let result be result(text1, text2)
 * - We have 2 cases:
 *     + x == y -> result(text1, text2) = result(text1-1, text2-1) + 1
 *     + x != y -> max(
 *         + result(text1-1, text2)
 *         + result(text1, text2-1) )
 * - result(s, 0) = result(0, s) = 0
 * - return: result(text1, text2)
 *
 * @format
 */

var dp = function (text1, text2, memo, i, j) {
  if (i === -1 || j === -1) return 0;
  if (memo[i][j] !== undefined) return memo[i][j];

  if (text1.charAt(i) === text2.charAt(j)) {
    memo[i][j] = dp(text1, text2, memo, i - 1, j - 1) + 1;
  } else {
    memo[i][j] = Math.max(
      dp(text1, text2, memo, i - 1, j),
      dp(text1, text2, memo, i, j - 1)
    );
  }
  return memo[i][j];
};

var longestCommonSubsequence2 = function (text1, text2) {
  const memo = Array(text1.length);
  for (let i = 0; i < text1.length; i++) {
    memo[i] = Array(text2.length);
  }
  return dp(text1, text2, memo, text1.length - 1, text2.length - 1);
};

var longestCommonSubsequence = function (text1, text2) {
  const memo = Array(text1.length + 1);
  for (let i = 0; i <= text1.length; i++) {
    memo[i] = Array(text2.length + 1);
  }
  for (let i = 0; i <= text1.length; i++) {
    memo[i][0] = 0;
  }
  for (let j = 0; j <= text2.length; j++) {
    memo[0][j] = 0;
  }
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
        memo[i][j] = memo[i - 1][j - 1] + 1;
      } else {
        memo[i][j] = Math.max(memo[i - 1][j], memo[i][j - 1]);
      }
    }
  }

  return memo[text1.length][text2.length];
};
console.log(longestCommonSubsequence('abcde', 'ace'));
console.log(longestCommonSubsequence('abcde', 'c'));
console.log(longestCommonSubsequence('abc', 'def'));
