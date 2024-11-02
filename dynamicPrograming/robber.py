'''
You are a professional robber planning to rob houses along a street. Each house has a certain amount 
of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses 
have security systems connected and it will automatically contact the police if two adjacent houses 
were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount 
of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

max[i] = max amount of money you can rob without alerting the police in the segment [1..i]
max[0] = 0
max[1] = nums[1]
:i -> max[i] = Max(max[i-1], max[i-2] + nums[i])




Example 2:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
 
Constraints:
1 <= nums.length <= 100
0 <= nums[i] <= 400

https://leetcode.com/problems/house-robber/
'''
class Solution2:
    def robRetrieve(self, n, nums, memo):
        if n == 0:
            return 0
        if n == 1:
            return nums[0]
        if n in memo:
            return memo[n]
        memo[n] = max(self.robRetrieve(n-1, nums, memo), self.robRetrieve(n-2, nums, memo) + nums[n-1])
        return memo[n]
    
    def rob(self, nums):
        memo = {} 
        return self.robRetrieve(len(nums), nums, memo)

        
s2 = Solution2()
print(s2.rob([1,2,3,1]))
print(s2.rob([2,7,9,3,1]))
print(s2.rob([2000,7,9,3000,1]))