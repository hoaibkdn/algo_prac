class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

console.log("abc")

/* Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

"figma" => true
"google" => false

*/

// ffigma -> { f: 2 } -> false 
// Time: O(n)
// Space: O(alphabet of s)

function hasAllUniqueCharacters(s) {
  const obj = {}
  for(let i = 0; i < s.length; i++) {
    if(obj[s.charAt(i)]) {
      return false
    }
    obj[s.charAt(i)] = 1
  }
  return true
}


var sortAlphabets = function(text) {
    return text.split('').sort();
};

function main(s) {
  const sortedSArr = sortAlphabets(s)
  for(let i = 0; i < sortedSArr.length - 1; i++) {
    if(sortedSArr[i] === sortedSArr[i + 1]) {
      return false
    }
  }
  return true
}

// console.log(hasAllUniqueCharacters('figma'))
// console.log(hasAllUniqueCharacters('figmaf'))

// console.log(main('figma'))
// console.log(main('figmaf'))



/*
Given two strings, write a method to decide if one is a permutation of the other.

"figma", "afgim" => true
"google", "glgoee" => false

Time: O(m + n) -> O(n)
Space: O(alphabet of s and t)
*/


/*One Away: There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.

EXAMPLE 
pale, ple -> true 
pales, pale -> true 
pale, bale -> true 
pale, bake -> false

https://leetcode.com/problems/one-edit-distance/

S = first string, T = second string

figma, figlma => true
figma, figmat => true

- insert (S,T)
  * length(S) + 1 = length(T)
  * loop T (i : 0 -> len(T) - 1), j = 0, result = true
    - j == len(S) return true
    - T(i) === S(j) j++ continue
    - (T(i) !== S(j) & i - j > 1) return false
  return true

- remove: insert(T,S)
- replace: len(S) = len(T)
  * unmatch = false
  * loop(s)
    - S[i] !== T[i]
      if (unmatch === true) return false
      unmatch = true
  return true

Time: O(n)
Space: O(1)
*/

function isInsert(s, t) {
  const lenS = s.length
  const lenT = t.length
  if(lenS + 1 !== lenT) {
    return false
  }
  // let unmatch = false
  let j = 0; // len S
  for(let i = 0; i < lenT; i++) {
    if(i === lenT - 1) return true;
    if(t.charAt(i) === s.charAt(j)) {
      j++;
      continue;
    }
    if(t.charAt(i) !== s.charAt(j)) {
      console.log({
        ti: t.charAt(i), 
        i,
        si: s.charAt(j),
        // unmatch
      })
      if(i - j > 1) return false
      // unmatch = true
    }
  }
  return true
}

function isReplaced(s, t) {
  const lenS = s.length
  const lenT = t.length
  if(lenS !== lenT) return false
  let unmatch = false

  for(let i = 0; i < lenS; i++) {
    if(s.charAt(i) !== t.charAt(i)) {
      if(unmatch) return false
      unmatch = true
    }
  }
  return true
}

function isEditedString(s, t) {
  return isInsert(s,t) || isInsert(t,s) || isReplaced(s,t)
  // return isInsert(t,s)
}

console.log(isEditedString("pale", "plee2"))
// console.log(isEditedString("pales", "pale"))

/*
  a[0..n-1] // 1, -1

  sum[i] = prefix sum of a[0] to a[i]

  sum[j..i] = 0
  => sum[i] - sum[j-1] = 0
  => sum[i] = sum[j-1]

  for i: 0 -> n-1 {
    we have x = sum[i], find previous sum[j] (sum[j] == x, j < i)
  }
         j     i
  [0, 1, 2, 3, 4, 5, 6]

            i       
   0  0  0  1  1  0  1  0  1 1  0  0  1
  -1 -1 -1  1  1 -1  1 -1  1 1 -1 -1  1
0 -1 -2 -3 -2 -1 -2 -1 -2 -1 0 -1 -2 -1

  
*/


/*
Problem 2:
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]

Input: nums = [2,0,2,1,1,0]
numsObj = {
  0: 2,
  1: 2,
  2: 2
}
for (0 -> n-1)
  nums[0] = 0
  nums[1] = 0
  nums[2] = 1
  nums[3] = 1.      
        i         j 
nums = [2,0,2,1,1,0]
count1 = 0

https://leetcode.com/problems/letter-combinations-of-a-phone-number/
*/

var sortColors = function(nums) {
  let nextZeroIdx = 0
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] === 0) {
      swap(nums, i, nextZeroIdx)
      nextZeroIdx++
    }
  }

  for(let i = nextZeroIdx; i < nums.length; i++) {
    if(nums[i] === 1) {
      swap(nums, i, nextZeroIdx)
      nextZeroIdx++
    }
  }

  return nums
};

var swap = function(nums, i, j) {
  const temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}

// console.log(sortColors([2,0,2,1,1,0]))
// console.log(sortColors([2,0,1]))

// https://leetcode.com/problems/reverse-nodes-in-k-group/

/*
class Solution {
  void sortColors(vector<int>& nums) {
    // for all idx < p0 : nums[idx < p0] = 0
    // curr is an index of element under consideration
    int p0 = 0, curr = 0;
    // for all idx > p2 : nums[idx > p2] = 2
    int p2 = nums.size() - 1;

    while (curr <= p2) {
      if (nums[curr] == 0) {
        swap(nums[curr++], nums[p0++]);
      }
      else if (nums[curr] == 2) {
        swap(nums[curr], nums[p2--]);
      }
      else curr++;
    }
  }
};
*/



// https://leetcode.com/problems/merge-strings-alternately/description/
/**
 *You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return the merged string.

Example 1:

Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: The merged string will be merged as so:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r
* 
*/

var mergeAlternately = function(word1, word2) {
  let i = 0, j = 0, res = ""
  while (i < word1.length || j < word2.length) {
    res += word1.charAt(i)
    res += word2.charAt(j)
    i++;
    j++;
  }
  if (i < word1.length) {
    res += word1.substring(i)
  }
  if (j < word2.length) {
    res += word2.substring(j)
  }
  return res
};

// console.log(mergeAlternately("abc", "pqr"))
// console.log(mergeAlternately("ab", "pqrs"))
// console.log(mergeAlternately("abcd", "pq"))

// https://leetcode.com/problems/string-compression/description/

/*
Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:
- If the group's length is 1, append the character to s.
- Otherwise, append the character followed by the group's length.

The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.

Example 1:
- Input: chars = ["a","a","b","b","c","c","c"]
- Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
- Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".

Example 2:
- Input: chars = ["a"]
- Output: Return 1, and the first character of the input array should be: ["a"]
- Explanation: The only group is "a", which remains uncompressed since it's a single character.

Example 3:
- Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
- Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
- Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".

Constraints:
- 1 <= chars.length <= 2000
- chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.
*/


// ["a","b","b","b","b","b","b","b","b","b","b","b",12, "c", "c", "c", "4"]
// ["a","b","b","b","b","b","b","b","b","b","b","b","b", "c", "c", "c",]
// ["a","b","1","2","b","b","b","b","b","b","b","b","b"]
// ["a","b","1","2"]

var getLength = function(x) {
  // log(n)
  // O(log10(x))
  var n = 0
  while (x > 0) {
    n++;
    x /= 10;
  }
  return n;
};

var compress = function(chars) {
  let wIdx = 0
  let count = 1
  for (let i = 0; i < chars.length; i++) {
    if (i === chars.length - 1 || (chars[i] !== chars[i + 1])) {
      if(count === 1) {
        chars[wIdx] = chars[i]
        wIdx += 1
        continue
      }
      chars[wIdx] = chars[i]
      wIdx += 1
      var len = String(count).length; 
      for (var j = wIdx + len - 1; j >= wIdx; j--) {
        chars[j] = String(count % 10);
        count = Math.floor(count / 10);
      }
      wIdx += len;
      count = 1
    }
    else {
      count++
    }
  }
  console.log(chars)
  return wIdx
};

// console.log(compress(["a","a","b","b","c","c","c"]))
// console.log(compress(["a","b","b","b","b","b","b","b","b","b","b"]))
// console.log(compress(["a","b","b","b","b","b","b","b","b","b","b","b","b", "c"]))
// console.log(compress(["a"]))

// https://leetcode.com/problems/minimum-time-to-complete-all-tasks/description/
/*
[[2,3,1],[4,5,2],[1,5,2]]


  1 2 3 4 5
1   1 1
2       1 1
2 1 1 1 1 1
*/

/**
    1
  2   3

      5
  (4)   (5)   

         i  
  x[i-1]    x[n-i] => x[i-1] * x[n-i]

dp[i] = so cach xay cay co i thang
dp[1] = 1
dp[0] = 1

dp[i] = sum(dp[j] * dp[i-j-1]) (j: 0->i-1, root = j+1)

for (root: 1 -> i) {
  lef = root-1
  rig = i-root
  dp[i] += dp[lef] * dp[rig]
}

*/

var numTrees = function(n) {
  const memo = {}
  calTrees(n, memo)
  return memo[n]
};

var calTrees = function (i, memo) { // cal n lẫn cho mỗi i
  if(i <= 1) {
    memo[i] = 1
    return
  }
  memo[i] = 0 
  for(let root = 1; root <= i; root++) { // có n số i
    const left = root - 1
    const right = i - root
    if(!memo[left]) {
      calTrees(left, memo) // n
    }
    if(!memo[right]) {
      calTrees(right, memo) // n
    }
    memo[i] += (memo[left] * memo[right]) // n memo -> cal n
  }
}
// O(n^2): mỗi i -> cal memo (if) 1 lần

console.log(numTrees(1))
console.log(numTrees(2))
console.log(numTrees(3))
console.log(numTrees(5))