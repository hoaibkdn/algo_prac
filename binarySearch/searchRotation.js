/**
 * There is an integer array nums sorted in ascending order (with distinct values).
 *
 * Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting
 * array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated
 * at pivot index 3 and become [4,5,6,7,0,1,2].
 *
 * Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Example 1:
 * Input: nums = [4,5,6,7,0,1,2], target = 0
 * Output: 4
 *
 * Example 2:
 * Input: nums = [4,5,6,7,0,1,2], target = 3
 * Output: -1
 *
 * Example 3:
 * Input: nums = [1], target = 0
 * Output: -1
 *
 * Constraints:
 * 1 <= nums.length <= 5000
 * -10^4 <= nums[i] <= 10^4
 * All values of nums are unique.
 * nums is an ascending array that is possibly rotated.
 * -10^4 <= target <= 10^4
 *
 * https://leetcode.com/problems/search-in-rotated-sorted-array/
 *
 * @format
 */

/*
Plan:
1/ find the index with lowest value: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
-  [4,5,6,7,0,1,2]
   [0,0,0,0,1,1,1]
-  f(nums[mid] < nums[0]) = 1
-  s
2/ 2 segments: s -> n-1, 0 -> e
- if target < nums[0] => find in [s, n-1]
- otherwise => find in [0, e]
3/ binary search on the chosen segment
-  [1 2 3 4 5 6 7] target = 5
*/

var binarySearch = function (nums) {
  let s = 0,
    e = nums.length - 1;
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    if (nums[mid] < nums[0]) {
      e = mid - 1;
    } else {
      s = mid + 1;
    }
  }
  return s;
};

var binarySearch2 = function (nums, target) {
  let s = 0,
    e = nums.length - 1;
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    if (nums[mid] >= target) {
      e = mid - 1;
    } else {
      s = mid + 1;
    }
  }
  if (nums[s] === target) return s;
  return -1;
};

var search = function (nums, target) {
  const s = binarySearch(nums);
  if (target < nums[0]) {
    const idx = binarySearch2(nums.slice(s, nums.length), target);
    if (idx >= 0) return idx + s;
    return idx;
  }
  return binarySearch2(nums.slice(0, s), target);
};

// console.log(search([4,5,6,7,0,1,2], 0))
// console.log(search([4,5,6,7,0,1,2], 2))
// console.log(search([4,5,6,7,0,1,2], 3))
// console.log(search([4,5,6,7,0,1,2], 8))
// console.log(search([4,5,6,7,0,1,2], 5))
// console.log(search([4,5,6,7], 7))
// console.log(search([4,5,6,7], 2))
