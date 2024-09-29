/**
 * Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
 *
 * If target is not found in the array, return [-1, -1].
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Example 1:
 * Input: nums = [5,7,7,8,8,10], target = 8
 * Output: [3,4]
 *
 * Example 2:
 * Input: nums = [5,7,7,8,8,10], target = 6
 * Output: [-1,-1]
 *
 * Example 3:
 * Input: nums = [], target = 0
 * Output: [-1,-1]
 *
 * Constraints:
 *
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * nums is a non-decreasing array.
 * -10^9 <= target <= 10^9
 *
 * https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array
 *
 * - [5,7,7,8,8,10] t=8
 *   [0,0,0,1,1,1] - first f(nums[mid] >= t) = 1
 *   [0,0,0,0,0,1] - first f(nums[mid] > t) = 1
 *
 * @format
 */

const searchFirst = function (nums, target) {
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
const searchLast = function (nums, target) {
  let s = 0,
    e = nums.length - 1;
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    if (nums[mid] > target) {
      e = mid - 1;
    } else {
      s = mid + 1;
    }
  }
  if (nums[s - 1] === target) return s - 1;
  return -1;
};

var searchRange = function (nums, target) {
  const fIdx = searchFirst(nums, target);
  const lIdx = searchLast(nums, target);
  return [fIdx, lIdx];
};
console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
console.log(searchRange([5, 7, 7, 8, 8, 10], 6));
console.log(searchRange([5, 7, 7, 8, 8, 10], 4));

/*
A conveyor belt has packages that must be shipped from one port to another within `days` days.

The i-th package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor 
belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within 
`days` days.

Example 1:
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10
Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts 
like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.

Example 2:
Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4

Example 3:
Input: weights = [1,2,3,1,1], days = 4
Output: 3
Explanation:
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1

Constraints:
1 <= days <= weights.length <= 5 * 10^4
1 <= weights[i] <= 500

https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
*/

/*
1 2 3 4 5 6 7 8 9 10, days = 5
[1 2 3 4]
[5 6]
[7]
[8]
[9]

cap = 13

O(n * log(sum(weights)))

        e s
0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 cap = t

1/ binary
    2/ try
    f(check(capMid) <= days) = 1
        e = capMid - 1
*/
var check = function (cap, weights) {
  let curW = 0;
  let days = 0;
  for (let i = 0; i < weights.length; i++) {
    if (curW + weights[i] <= cap) {
      curW += weights[i];
    } else {
      if (weights[i] > cap) return 1000000000;
      curW = weights[i];
      days++;
    }
  }
  return days + 1;
};
var shipWithinDays = function (weights, days) {
  let s = 0,
    e = weights.reduce((total, ele) => total + ele, 0);
  while (s <= e) {
    const capMid = Math.floor((s + e) / 2);
    if (check(capMid, weights) <= days) {
      e = capMid - 1;
    } else {
      s = capMid + 1;
    }
  }
  return s;
};

console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3));
console.log(shipWithinDays([1, 2, 3, 1, 1], 4));
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2));
