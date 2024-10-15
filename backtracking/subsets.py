'''
https://leetcode.com/problems/subsets/
[1,2,3,4]
[] [1] [1,2] [1,3] [1,4] [1,2,3] [1,2,4] [1,2,3,4] [2] [2,3] [2,4] [2,3,4] [3] [3,4] [4]
'''

class Solution:
    def loopCombine(self, idx, nums, result, temp):
        if idx >= len(nums):
            result.append(temp.copy())
            return
        
        # luon co 2 options: chon hoac k chon
        # do phuc tap = so nhanh la 2 (tuc chon hay k chon) mu voi chieu sau la n
        # O(2^n)
        
        # not choose
        self.loopCombine(idx + 1, nums, result, temp)
        
        # choose
        temp.append(nums[idx])
        self.loopCombine(idx + 1, nums, result, temp)
        del temp[-1]
        
    def subsets(self, nums: List[int]) -> List[List[int]]:
        result = []
        temp = []
        self.loopCombine(0, nums, result, temp)
        return result
     
    def subsets2(self, nums: List[int]) -> List[List[int]]:
      result = [[]]
        for x in nums:
            temp = []
            p = []
            for y in result:
                p = y.copy()
                p.append(x)
                temp.append(p)
            result.extend(temp)   
    
    def subsets3(self, nums: List[int]) -> List[List[int]]:
        # 0 1 2 3 4
        # 0 1 0 0 0 = 2^1
        # 1 0 1 0 0 = 2^0 + 2^2 = 5
        # 0 0 0 0 0
        # 1 2 3 4 5
        n = len(nums)
        result = []
        for mask in range(2**n):
            temp = []
            for i in range(n):
                if mask & 2**i:
                    temp.append(nums[i])
            result.append(temp)
        return result          