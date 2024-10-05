/*
Problem: https://leetcode.com/problems/climbing-stairs/
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

var climbStairs = function(n) {
  countWays(n, {})
}

var countWays = function(n, memo) {
  if(n === 1) return 1
  if(n === 2) return 2

  if(!memo[n]) {
    memo[n] = countWays(n-1, memo) + countWays(n-2, memo)
  }
  return memo[n]
} 

n = 4
1+1+1+1
1+1+2
1+2+1
2+1+1
2+2 

1+1+1 = 3
1+2   = 3
2+1   = 3

1+1   = 2
2     = 2

loop: 1->n
  j = 

*/

var climbStairs = function(n) {
  return countWays(n, {})  
};

var countWays = function(n, memo) {
  if(n <= 2) return n
  if(!memo[n]) {
    memo[n] = countWays(n-1, memo) + countWays(n-2, memo)
  }
  return memo[n]
}

// console.log(climbStairs(4))

/*
Problem: https://leetcode.com/problems/decode-ways/
A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.

The test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

Example 2:
Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Example 3:
Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").

decode(n) = decode(n-1) + decode(n-2)
  n-1
    valid: s[n] != 0
  n-2
    valid: s[n-1..n] != 0x && s[n-1..n] <= 26

decode[i] = so cach decode xau [1..i]

decode[i] = decode[i-1] (neu xau 1 ok) + decode[i-2] (neu xau 2 ok)
i = 0: luon ok
i = 1: xet xau 1 ok
*/

var numDecodings = function(s) {
  return decode(s, s.length - 1, {})
};

var isValid = function(subS) {
  if(subS.length <= 1 && subS != '0') return true
  if(subS.length === 2 && (Number(subS) > 26) || subS.charAt(0) === '0') return false
  return true
}

var decode = function (s, i, memo) {
  if (i === -1) return 1
  if (i === 0) {
    return isValid(s.substring(0, i+1)) === true ? 1 : 0
  }
  if (memo[i] === undefined) {
    memo[i] = 0
    if (isValid(s.substring(i, i+1))) memo[i] += decode(s, i-1, memo)
    if (isValid(s.substring(i-1, i+1))) memo[i] += decode(s, i-2, memo)
  }
  return memo[i]
}
console.log(numDecodings("12"))
console.log(numDecodings("226"))
console.log(numDecodings("06"))
console.log(numDecodings("1"))



// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
// trace

function solution(S) {
    // write your code in JavaScript (Node.js 14)
    const s = " " + S
    const n = s.length
    const dp = Array(n)

    const trace = Array(n)
    for(let i = 0; i < n; i++) {
        dp[i] = Array(2)
        trace[i] = Array(2)
        for(let j = 0; j < 2; j++) {
            if(i === 0) {
                dp[i][j] = Array(2).fill(true)    
            } else {
                dp[i][j] = Array(2).fill(false)    
            }
            trace[i][j] = Array(2)
        }
    }

    for (let i = 0; i < n - 1; i++) {
        for(let j = 0; j < 2; j++) {
            for(let k = 0; k < 2; k++) {
                if(dp[i][j][k] === true) {
                    if (s.charAt(i+1) === '?') {
                        for (let num = 0; num < 2; num++) {
                            if (j == k && k == num) {
                                continue;
                            }
                            dp[i+1][k][num] = true;
                            trace[i+1][k][num] = [j, k]
                        }
                    } else {
                        let num = (s.charAt(i+1) === 'a' ? 0 : 1);
                        if (j == k && k == num) {
                            continue;
                        }
                        dp[i+1][k][num] = true;
                        trace[i+1][k][num] = [j, k]
                    }
                }
            }    
        }
    }

    let curState = [-1, -1];
    for(let j = 0; j < 2; j++) {
        for(let k = 0; k < 2; k++) {
            if (dp[n-1][j][k]) {
                curState = [j, k];
            }
        }
    }

    let res = ""
    let curIdx = n - 1
    while (curIdx >= 1) {
        let num = curState[1]
        res += (num === 0 ? 'a' : 'b');
        curState = trace[curIdx][curState[0]][curState[1]];
        curIdx--;
    }

    let reverted = res.split('').reverse()
    return reverted.join('')
}


































