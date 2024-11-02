'''
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 to k steps. 

In how many distinct ways can you climb to the top?

Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

f(n) = Number of ways to climb from step 0 to step n

.....n-1 1
+
.....n-2 2

f(0) = 1
f(n) = f(n-1) + f(n-2)

f(3) = 2 + 1
f(4) = 3 + 2 = 5


Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

f(n) = f(n-1) + ...+ f(n-k)
k = 10, n = 7
f(n) = f(n-1) + ...+ f(n-n)

Constraints:
1 <= n <= 45

https://leetcode.com/problems/climbing-stairs/
'''

class Solution:
    def retreiveSteps(self, n, memo, k):
        if n <= 1:
            return 1
        if n in memo: 
            return memo[n]
        
        memo[n] = 0
        x = k if k <= n else  n
        while x > 0:   
            memo[n] += self.retreiveSteps(n - x, memo, k)
            x -= 1
        return memo[n]
    
    def climbStairs(self, n, k):
        memo = {}
        return self.retreiveSteps(n, memo, k)
    
s = Solution()
print(s.climbStairs(3, 2))
print(s.climbStairs(10, 11))