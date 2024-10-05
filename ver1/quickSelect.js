/*
https://leetcode.com/problems/kth-largest-element-in-an-array/
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

You must solve it in O(n) time complexity.

 

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
 

Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104
*/

function swap(nums, left, right) {
   const a = nums[left]
   nums[left] = nums[right]
   nums[right] = a
}

function partition (nums, left, right) {
    const pivot = nums[Math.floor((left + right) / 2)]
    while (left <= right) {
        while (nums[left] < pivot) {
            left++
        }
        while (nums[right] > pivot) {
            right--
        }
        if (left <= right) {
            swap(nums, left, right)
            left++
            right--
        }
    }
    return left
}

//  nums = [3,2,3,1,2,4], k = 3
// pivot =3, [2,2,1,3,] index = 

function quickSelect(nums, low, high, k) {
    if(low === high) return nums[low]
    const index = partition(nums, low, high)
    const left = high - index + 1 < k ? low : index
    const right = high - index + 1 < k ? index - 1 : high
    const newK = high - index + 1 < k ? k-(high - index + 1): k
    return quickSelect(nums, left, right, newK)
}

var findKthLargest = function(nums, k) {
    const len = nums.length
    return quickSelect(nums, 0, len-1, k)
};