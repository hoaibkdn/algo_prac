/**
 * Given a string s, find the number of palindromic substrings in that string
 * A palindromic string is a string that is the same as its reverse.
 *
 * Example 1:
 * Input: s = "abbaca"
 * Output: 9 (a, b, b, a, c, a, aca, bb, abba)
 *
 * Example 2:
 * Input: s = ""
 * Output: 0
 *
 * 0 <= s.length <= 5000
 * s contains lowercase English letters only
 * https://leetcode.com/problems/palindromic-substrings/
 *
 * @format
 */

var isPalindrom = function (s, l, r, memo) {
  if (l === r || l > r) {
    return true;
  }
  if (memo[l][r] !== null) return memo[l][r];
  memo[l][r] = false;
  if (s.charAt(l) === s.charAt(r)) {
    // // so trang thai * transition, khi chay tu l -> r
    memo[l][r] = isPalindrom(s, l + 1, r - 1, memo);
  }
  return memo[l][r];
};

var countPalin2 = function (s) {
  const memo = Array(s.length)
    .fill()
    .map(() => Array(s.length).fill(null));
  let count = 0;
  //    for(let i = 0; i < s.length; i++) { // so trang thai * transition
  //        for(let j = i; j < s.length; j++) {
  //            count += isPalindrom(s, i, j, memo) //
  //        }
  //    }

  for (let l = s.length - 1; l >= 0; l--) {
    // for nguoc voi de quy
    // l depends on l + 1 => for tu s.length -> 0
    // r depends on r - 1 => for toi tu l => s.length

    for (let r = l; r < s.length; r++) {
      if (l === r) {
        memo[l][r] = true;
      } else if (s.charAt(l) === s.charAt(r)) {
        if (l + 1 === r) {
          memo[l][r] = true;
        } else {
          memo[l][r] = memo[l + 1][r - 1];
        }
      }
      count += memo[l][r];
    }
  }
  return count;
};

var countPalin = function (s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    let l = i,
      r = i;
    while (l >= 0 && r < s.length && s.charAt(l) == s.charAt(r)) {
      count += 1;
      l--;
      r++;
    }
  }
  for (let i = 0; i < s.length - 1; i++) {
    let l = i,
      r = i + 1;
    while (l >= 0 && r < s.length && s.charAt(l) == s.charAt(r)) {
      count += 1;
      l--;
      r++;
    }
  }
  return count;
};

// Time complexity: O(n^2)

console.log('countPalin ', countPalin('abbaca'));
console.log('countPalin ', countPalin(''));
console.log('countPalin ', countPalin('aaabb'));
