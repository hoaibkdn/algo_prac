'''
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into 
a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

i: 0->i: true && i->n: true => true
segmented()

leetcode
f[i..j]

l         x   x
...|...|...|...
dp[x]: x is the index of the word that string[x->n] belongs to the dict
dp[x] = dp[n-x] + dp[x->n]

s = "catsandog", wordDict = ["cats","dog","sand","and","cat", "catsa", "ndog"]

 t          t
[apple] [pen] [apple]
catsandog
catsan dog => catsan
catsand og => catsand

dp[i] = s[0..i] can be segmented into dictionary words
=> s[n-1]

catsandog
1. cats andog => and og => og
2. cat sandog => sand og => og

Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Example 2:
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat", og]
Output: false

Constraints:
1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.

https://leetcode.com/problems/word-break/
'''

class Solution:
    def check(self, s, wordDict, i, memo):
        if i < 0:
            return True
        if memo[i] != -1:
            return memo[i]
        memo[i] = False
        for w in wordDict:
            lIdx = i - len(w) + 1
            if lIdx < 0:
                continue
            subS = s[lIdx: i + 1]
            if subS == w:
                if self.check(s, wordDict, lIdx - 1, memo):
                    memo[i] = True
                    break
        return memo[i]
        
    def wordBreak2(self, s, wordDict):
        memo = [-1 for i in range(len(s))]
        return self.check(s, wordDict, len(s) - 1, {})
    
    def wordBreak(self, s, wordDict):
        # self.check(s, wordDict, lIdx - 1, memo) == memo[lIdx-1]
        memo = [False for i in range(len(s))]
        # catsandog
        #    
        # memo = [0, 0, 1, 1, 0, 0, 1, 0, 0]
        for i in range(len(s)):
            # s[0..i] = catsand
            for w in wordDict:
                lIdx = i - len(w) + 1
                if lIdx < 0:
                    continue
                subS = s[lIdx:i + 1]
                if subS == w:
                    if lIdx - 1 < 0 or memo[lIdx - 1]: 
                        memo[i] = True
                        break            
        return memo[len(s) - 1] # s[0..n-1]
# top -> down: kq -> co ban
# bottom -> up: co ban -> kq

s = Solution()
print(s.wordBreak("leetcode", ["leet","code"]))
print(s.wordBreak("applepenapple", ["apple","pen"]))
print(s.wordBreak("catsandog", ["cats","dog","sand","and","cat"]))