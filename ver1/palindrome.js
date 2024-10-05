 /*
https://leetcode.com/problems/valid-palindrome-ii
Problem 1: Given a string s, return true if the s can be palindrome after deleting at most one character from it.

Example 1:
  Input: s = "aba"
  Output: true

Example 2:
  Input: s = "abaabca" => aaabca, abaaba
  Output: true
  Explanation: You could delete the character 'c'.

Example 3:
  Input: s = "abc"
  Output: false

  n = s.length ~ 10^3
  
  i = 0, j = n - 1  
  // s[i] === s[j] -> j >= i => true
  s[i] !== s[j] -> sub1, sub2
  isPalindrome(sub1)
  isPalindrome(sub2)
*/

var isAlmostPalindrome = function(s) {
  const lenS = s.length
  let i = 0, j = lenS - 1
  while (i < j) {
    if (s.charAt(i) === s.charAt(j)) {
      i++
      j--
    } else {
      const sub1 = s.slice(0, i) + s.slice(i + 1, lenS)
      const sub2 = s.slice(0, j) + s.slice(j + 1, lenS)
      return isPalindrome(sub1) || isPalindrome(sub2)
    }
  }
  return true
}

var isPalindrome = function(sub) {
  const lenSub = sub.length
  let i = 0, j = lenSub - 1
  while (i < j) {
    if (sub.charAt(i) === sub.charAt(j)) {
      i++
      j--
    } else {
      return false
    }
  }
  return true
}

// console.log(isAlmostPalindrome('abaabca'))
// console.log(isAlmostPalindrome('abbcca'))
// console.log(isAlmostPalindrome('aa'))

/*
Problem 2:
Given a string s, return the longest palindromic substring in s.

Example 1:
  Input: s = "babad"  -? 
  Output: "bab"
  Explanation: "aba" is also a valid answer.

Example 2:
  Input: s = "cbbd" 
  Output: "bb"

abcdcba -> sub1 = bc, sub2 = dcba 

sub[i...j] palindrome max = 
n = s.length
maxLengthPalindrome = ''
let initIdx = 0
while(initIdx < n)
  loop i = initIdx -> n - 1 
    sub1 = s[initIdx...i]`
    if(isPalindrome(sub1)) maxLengthPalindrome = sub1.length > maxLengthPalindrome : sub1 : maxLengthPalindrome
  initIdx++ 

return maxLengthPalindrome

xau 5 palin khi
  - xau 3 palin
  - dau cuoi giong nhau
xau n palin khi?
  - xau n-2 palin
  - dau cuoi giong nhau
TH co ban? n = [1, 2]
len = n => xau co ban = n + n-1 = 2n - 1
moi xau co ban toa ra O(n) => dpt = (2n-1) * O(n) = O(n^2)

cbabc
a => bab => cbabc => stop => +3
ab => ignore

abaccebfa
a b a c c e b f a
ab ba ac cc ce eb bf fa

a => bac => ignore
b => aba => stop
cc => acce => stop 
https://leetcode.com/problems/longest-palindromic-substring/
*/

var longestPalindrome = function(s) {
  const lenS = s.length
  let maxLeft = 0, maxRight = -1

  function extendStr(left, right) {
    while (s.charAt(left) === s.charAt(right)) {
      if (maxRight - maxLeft + 1 < right - left + 1) {
        maxLeft = left
        maxRight = right
      } 
      left--;
      right++
      if (left < 0 || right >= lenS) break
    }
  }

  for (let i = 0; i < lenS; i++) {
    let left = i, right = i
    extendStr(left, right)
  }

  for (let i = 0; i < lenS - 1; i++) {
    let left = i, right = i+1 
    extendStr(left, right)
  }
  return s.slice(maxLeft, maxRight + 1)
}

console.log(longestPalindrome('abaccebfa'))
console.log(longestPalindrome('babad'))
console.log(longestPalindrome('cbbd'))
console.log(longestPalindrome('cbabc'))