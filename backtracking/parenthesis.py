'''
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

States:
- idx:
- sum

Exit cases:
- idx == 2n:
    - sum == 0
- sum < 0

Branches:
- choose ( : temp.append("(") sum++
- choose ) : temp.append(")") sum--


()(())(())
))((())

((()))
((()(

A

(A)
AA

(A
A)

Example 1:
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

Example 2:
Input: n = 1
Output: ["()"]

Constraints:

1 <= n <= 8

https://leetcode.com/problems/generate-parentheses
'''

class Solution:
    def loopParenthesis(self, idx, n, sum, temp, result):
        if idx >= 2*n:
            if sum == 0:
                result.append(''.join(temp))
            return
        if sum < 0:
            return
        
        temp.append('(')
        self.loopParenthesis(idx + 1, n, sum + 1, temp, result)
        temp.pop()
        
        temp.append(')')
        self.loopParenthesis(idx + 1, n, sum - 1, temp, result)
        temp.pop()
        
    def generateParenthesis(self, n):
        result = []
        self.loopParenthesis(0, n, 0, [], result)
        return result
    
s = Solution()
print(s.generateParenthesis(3))
