
'''
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations 
of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the 
frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 
combinations for the given input.

idx, currSum,
| currSum += candidates[idx], idx
| currSum, idx+1
|-> currSum == target: return

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

Constraints:
1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40

https://leetcode.com/problems/combination-sum/
'''

class Solution2:
    def getCandidates(self, idx, candidates, result, temp, target, currSum):
        if idx == len(candidates):
            if currSum == target:
                result.append(temp.copy())
            return
        
        if currSum > target:
            return
        # choose
        temp.append(candidates[idx])
        self.getCandidates(idx, candidates, result, temp, target, currSum + candidates[idx])
        del temp[-1]
        
        # not choose
        self.getCandidates(idx + 1, candidates, result, temp, target, currSum)
        
    def combinationSum(self, candidates, target):
        result = []
        temp = []
        self.getCandidates(0, candidates, result, temp, target, 0)
        return result
    
s2 = Solution2()
print(s2.combinationSum([2,3,4,7], 7)) # 2^n
    
'''
https://leetcode.com/problems/combination-sum-ii/description/


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

Constraints:
1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
'''

class Solution3:
    def getCandidates(self, idx, candidates, result, temp, target, currSum):
        if idx == len(candidates):
            if currSum == target:
                result.append(temp.copy())
            return
        if currSum > target:
            return
            
        count = len(list(filter(lambda num: num == candidates[idx], candidates)))
        
        self.getCandidates(idx + count, candidates, result, temp, target, currSum)
        i = 0
        while(i < count):
            temp.append(candidates[idx])
            self.getCandidates(idx + count, candidates, result, temp, target, currSum + (candidates[idx] * (i + 1)))
            i += 1
        for i in range(count):
            temp.pop()
        

    def combinationSum2(self, candidates, target):
        result = []
        temp = []
        candidates.sort()
        self.getCandidates(0, candidates, result, temp, target, 0)
        return result
    
s3 = Solution3()

print(s3.combinationSum2([10,1,2,7,6,1,5], 8))
        