'''
Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Example 1:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Example 2:
Input: nums = [0,1]
Output: [[0,1],[1,0]]

Example 3:
Input: nums = [1]
Output: [[1]]

Constraints:
1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.

https://leetcode.com/problems/permutations/

[1 0 0 0 1]
[1 2 3 4 5]
1 2 3 4 5 -> 1 5 3 4 2 -> 1 5 4 2 3

combine(idx, nums, result, temp, markedArr)
'''

class Solution:
    def combine(self, idx, nums, result, temp, markedArray): 
        if len(temp) == len(nums):
            result.append(temp.copy())
            return
        for i in range(len(markedArray)):
            if not markedArray[i]:
                temp.append(nums[i])
                markedArray[i] = 1
                self.combine(idx + 1, nums, result, temp, markedArray)
                del temp[-1]
                markedArray[i] = 0
            
        
    def permute(self, nums):
        result = []
        temp = []
        markedArr = [0] * len(nums)
        self.combine(0, nums, result, temp, markedArr)
        return result

s = Solution()
print(s.permute([1,2,3]))