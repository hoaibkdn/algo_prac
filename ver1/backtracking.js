/*
Given a string s, return the maximum number of unique substrings that the given string can be split into.

You can split string s into any list of non-empty substrings, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are unique.

A substring is a contiguous sequence of characters within a string.

Example 1:
Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.

a b ab c cc
ab abc cc
1 2 => ab
  3 6 => abcc
    6

Example 2:
Input: s = "aba"
Output: 2
Explanation: One way to split maximally is ['a', 'ba'].

Example 3:
Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.

Constraints: 1 <= n <= 16
*/


// abac 
var backtracking = function(s, left, myStorage, res, level) {
  if (left == s.length) {
    // console.log(level + "", myStorage)
    // if (myStorage.size === 11) {
    //   console.log(level + "", myStorage)
    // }
    res['res'] = Math.max(res['res'], myStorage.size)
    return
  }

  for (let i = left; i < s.length; i++) { // i = 0
    const smallString = s.slice(left, i + 1) // a
    // console.log(level + ' smallString ', smallString)
    // console.log(level + '', myStorage)
    if (myStorage.has(smallString)) continue
    myStorage.add(smallString)
    backtracking(s, i+1, myStorage, res, level + "  ")
    myStorage.delete(smallString)
  }
}

var maxUniqueSplit = function(s) {
  // state (left, hash)
  let res = {'res': 0}
  const myStorage = new Set()
  backtracking(s, 0, myStorage, res, '')
  return res['res']
};

// console.log(maxUniqueSplit("ababccc"))
// console.log(maxUniqueSplit("abac"))
// console.log(maxUniqueSplit("wwwzfvedwfvhsww"))
// console.log(maxUniqueSplit("aa"))




/* 
https://leetcode.com/problems/combination-sum/

Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

Example 1:
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

Example 2:
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]

Example 3:
Input: candidates = [2], target = 1
Output: []

1. start from one node
2. state = (i, target)
3. last state: i = n or target = 0
4. so nhanh' con (vd: chon hay khong chon => 2 nhanh')
5. dpt = O(so nhanh max tren cay ^ chieu cao max cua cay) = O(2^target)

*/

var combinationSum = function(candidates, target) {
  const res = [], cur = []
  backtracking(0, target, cur, res, candidates, '')
  return res
};

var backtracking = function(idx, target, cur, res, candidates, level) {
  console.log(level, idx, target, cur)
  if(target === 0) {
    res.push([...cur])
    return
  }
  if(idx === candidates.length) return

  if(candidates[idx] <= target) {
    cur.push(candidates[idx])
    backtracking(idx, target - candidates[idx], cur, res, candidates, level + "  ")
    cur.pop()
  }

  backtracking(idx+1, target, cur, res, candidates, level + "  ")
}

console.log(combinationSum([2,5], 5))
// console.log(combinationSum([2,3,6,7], 7))
// console.log(combinationSum([2,3,5], 8))
// console.log(combinationSum([2], 1))

/*
Problem 1: https://leetcode.com/problems/generate-parentheses/

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

Example 2:
Input: n = 1
Output: ["()"]

"(()))"
"(()())"
1. open == close => n = 2k
2. voi moi i, num open >= num close
3. voi moi i, num open va num close <= n

((()))
backTracking(str, n, res, numOpen, numClose) {
  if(numOpen + numClose === n * 2) {
    res.push(str)
    return
  }

  if(numOpen > numClose) {
    backTracking(str + ')', n, res, numOpen, numClose + 1)
  }
  if(numOpen < n) {
    backTracking(str + '(', n, res, numOpen + 1, numClose)
  } 
}
*/

var generateParenthesis = function(n) {
  const res = [], cur = { text: '' }
  backTracking(cur, n, res, 0, 0)
  return res
};

function backTracking(cur, n, res, numOpen, numClose) {
  if(numOpen + numClose === n * 2) {
    res.push(cur.text)
    return
  }

  if(numOpen > numClose) {
    cur.text += ')'
    backTracking(cur, n, res, numOpen, numClose + 1)
    cur.text = cur.text.substring(0, cur.text.length - 1)
  }
  if(numOpen < n) {
    cur.text += '('
    backTracking(cur, n, res, numOpen + 1, numClose)
    cur.text = cur.text.substring(0, cur.text.length - 1)
  } 
}
// https://leetcode.com/tag/backtracking/
console.log(generateParenthesis(3))

/*
Problem 2:
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
  [1,1,6],
  [1,2,5],
  [1,7],
  [2,6]
]

Example 2:
Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
  [1,2,2],
  [5]
]

[1,2,2,2,5]
{
1: 1
2: 3
5: 1
}

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30

*/

var combinationSum2 = function(candidates, target) {
  const res = [], cur = [], curSum = 0
  const sortedCan = candidates.sort((a, b) => a - b)
  backtracking(sortedCan, 0, res, target, cur, curSum) 
  return res
}

var backtracking = function(candidates, idx, res, target, cur, curSum) {
  if(curSum === target) {
    res.push([...cur])
    return
  }
  if(idx >= candidates.length || curSum > target) {
    return
  }

  let lastIdx = idx
  for(let i = idx; i < candidates.length; i++) {
    if(candidates[i] === candidates[idx]) {
      lastIdx = i
    } else {
      break
    }
  }

  // choose 0
  backtracking(candidates, lastIdx + 1, res, target, cur, curSum)
  
  for(let i = idx; i <= lastIdx; i++) {

    // push (idx - i + 1)
    for (let j = 0; j < idx - i + 1; j++) {
      cur.push(candidates[i])
    }
    
    backtracking(candidates, lastIdx + 1, res, target, cur, curSum + candidates[i] * (i - idx + 1)) 

    // pop (idx - i + 1)
    for (let j = 0; j < idx - i + 1; j++) {
      cur.pop()
    }
  }
}

console.log(combinationSum2([10,1,2,7,6,1,5], 8))
console.log(combinationSum2([2,5,2,1,2], 5))
// 0
// 5 5 5 5 5 7 7 7
// https://leetcode.com/problems/combination-sum-ii/
// https://leetcode.com/problems/count-primes

// -----------------------------------------------
/*
https://leetcode.com/problems/palindrome-partitioning/

Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

A palindrome string is a string that reads the same backward as forward.

Example 1:
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]

Example 2:
Input: s = "a"
Output: [["a"]]

Constraints:
- 1 <= s.length <= 16
- s contains only lowercase English letters.

isPalindrome(s, i, j, memo) {
  // O(len(x)) iteration
  if(i === j) return true
  if(i + 1 === j && s.charAt(i) === s.charAt(j)) return true
  if(memo[i][j] === undefined) {
    memo[i][j] = isPalindrome(s, i+1, j-1, memo) && s.charAt(i) === s.charAt(j)
  }
  return memo[i][j]
}

backtracking(s, idx, res, cur) {
  if(idx === s.length) {
    res.push(...cur)
    return
  }

  for(let i = idx; i < s.length; i++) {
    const subStr = s.slice(idx, i + 1) // s[idx, i] => s[idx + 1, i - 1] and s[idx] === s[i]
    if(isPalindrome(subStr) {
      cur.push(subStr)
      backtracking(s, i+1, res, cur)
      cur.pop()
    }
  }
  
}
*/

var partition = function(s) {
  const res = []
  const memo = Array.from(Array(s.length), () => new Array(s.length))
  backtracking(s, 0, res, [], memo)
  return res
};

var backtracking = function(s, idx, res, cur, memo) {
  if(idx === s.length) {
    res.push([...cur])
    return
  }

  for(let i = idx; i < s.length; i++) {
    const subStr = s.slice(idx, i + 1) // s[idx, i] => s[idx + 1, i - 1] and s[idx] === s[i]
    if(isPalindrome(s, idx, i, memo)) {
      cur.push(subStr)
      backtracking(s, i+1, res, cur, memo)
      cur.pop()
    }
  }
}

// Manacher O(n)
var isPalindrome = function(s, i, j, memo) {
  // O(len(x)) iteration
  if(i === j) return true
  if(i + 1 === j) {
    return s.charAt(i) === s.charAt(j)
  }
  if(memo[i][j] === undefined) {
    memo[i][j] = s.charAt(i) === s.charAt(j) && isPalindrome(s, i+1, j-1, memo)
  }
  return memo[i][j]
}

console.log(partition("aab"))
console.log(partition("a"))
console.log(partition("asdkasdk"))


/** 
https://leetcode.com/problems/restore-ip-addresses/

A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

isValid(part) {
  0 1 255 256 //
}

cur = [1, 0, 2, 255] -> res = [cur.join('.')]
backtracking()
cur = [1, 0, 22, 5] 

backtracking(s, idx, res, cur)

*/

var restoreIpAddresses = function(s) {
    const res = [], cur = []
    backtracking(s, 0, res, cur)
    return res
};

var isValidPartAddress = function(part) {
  // khong valid:
  // size > 3
  // size <= 3: n > 255 or (size > 1 and s[0] = 0)

  if(part.length > 1 && part.length <= 3 && part.charAt(0) !== '0') {
    return Number(part) <= 255
  }
  return part.length === 1
}

var backtracking = function(s, idx, res, cur) {
  if(idx === s.length) {
    if (cur.length === 4) {
      res.push([...cur].join('.'))
    }
    return 
  }

  // console.log(idx, res, cur)
  for(let i = idx; i < s.length; i++) {
    const part = s.substring(idx, i + 1)
    if(isValidPartAddress(part)) {
      cur.push(part)
      backtracking(s, i + 1, res, cur)
      cur.pop()
    } else {
      break
    }
  }
}

// console.log(isValidPartAddress('023'))
// console.log(restoreIpAddresses('25525511135'))
// console.log(restoreIpAddresses('0000'))
// console.log(restoreIpAddresses('101023'))

// O(3^len(s))