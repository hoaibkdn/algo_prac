'''
Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

You may return the answer in any order.

 

Example 1:

Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.
Example 2:

Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.
'''

class Solution:
    def loopCombine(self, idx, n, k, temp, result, start):
        if idx > k:
            result.append(temp.copy())
            return
        for i in range(start, n + 1): # 1 -> 5
            temp.append(i)
            self.loopCombine(idx + 1, n, k, temp, result, i + 1)
            del temp[-1]

    def loopCombine3(self, idx, n, k, temp, result, start):
        if idx > k:
            result.append(temp.copy())
            return
        
        if start > n:
            return
        
        # not choose start
        self.loopCombine3(idx, n, k, temp, result, start + 1)
        
        # choose start
        temp.append(start)
        self.loopCombine3(idx + 1, n, k, temp, result, start + 1)
        del temp[-1]

    def loopCombine2(self, idx, n, k, temp, result):
        if len(temp) == k:
            result.append(temp.copy())
            return
        
        if idx == n+1:
            return

        # not choose idx
        self.loopCombine2(idx + 1, n, k, temp, result)

        # choose idx
        temp.append(idx)
        self.loopCombine2(idx + 1, n, k, temp, result)
        del temp[-1]

    def combine(self, n: int, k: int) -> List[List[int]]:
        result = []
        temp = []
        # self.loopCombine3(1, n, k, temp, result, 1)
        self.loopCombine2(1, n, k, temp, result)
        # self.loopCombine(1, n, k, temp, result, 1)
        return result
         