/*
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:
Input: nums = [1,3,5,6], target = 7
Output: 4

Constraints:

1 <= nums.length <= 10^4
-10^4 <= nums[i] <= 10^4
nums contains distinct values sorted in ascending order.
-10^4 <= target <= 10^4

https://leetcode.com/problems/search-insert-position/description

*/

var searchInsert = function(nums, target) {
  var check = function(start, end) {
    if (start >= end) return start
    
    let midIdx = Math.floor((start + end) / 2)
    if(nums[midIdx] === target) return midIdx

    if (nums[midIdx] > target) {
      return check(start, midIdx - 1)
    } else {
      return check(midIdx + 1, end)
    }
  }
  // [0, n)
  // [0, n-1]
  return check(0, nums.length)
};

var searchInsert = function(nums, target) {
  // [l, r], not [l, r)
  let start = 0, end = nums.length - 1;

  // 1. chia khong gian mau thanh 2 phan 0 va 1
  // 2. tao ham de ket qua nam o ranh gioi 01
  // 3. chat nhi phan sao cho no tien ve ranh gioi

  //  s                    e
  //  0000000001111111111111
  //          es
  //  0000000000000000000000
  //                       es
  //  1111111111111111111111
  // es

  //           0 1 2 3 4
  //          [1,3,5,6]
  // t = 4    [0,0,1,1]     theory: f(nums[mid] > target)
  // t = 5    [0,0,1,1]     theory: f(nums[mid] >= target)
  //             e s
  
  while (start <= end) {
    let midIdx = Math.floor((start + end) / 2)
    
    if (nums[midIdx] >= target) {
      end = midIdx - 1;
    } else {
      start = midIdx + 1;
    }
  }

  // end < start (end + 1 == start)
  return start;
}

// console.log(searchInsert([1,3,5,6], 5))
// console.log(searchInsert([1,3,5,6], 2))
// console.log(searchInsert([1,3,5,6], 7))
// console.log(searchInsert([1,3,5,6], 0))

/*
Given a non-decreasing array nums, and a target number, find the first / last index of that target number. If there is no such number, return -1
nums = [1, 1, 4, 5, 7, 7, 7, 8, 9, 9, 9, 9]

First
- target = 6 => -1
- target = 7 => 4
- target = 8 => 7
- target = 9 => 8

Last
- target = 6 => -1
- target = 7 => 6
- target = 8 => 7
- target = 9 => 11
*/

var searchFirst = function(nums, target) {
  // 1. chia khong gian mau thanh 2 phan 0 va 1
  //       [1,1,4,5,7,7,7,8,9,9,9,9]
  // t = 7 [0,0,0,0,1,1,1,1,1,1,1,1]
  //              e s
  // t = 6 [0,0,0,0,1,1,1,1,1,1,1,1]
  //              e s
  // t =10 [0,0,0,0,0,0,0,0,0,0,0,0]
  //                              e s
  
  // 2. tao ham de ket qua nam o ranh gioi 01
  // f(nums[mid] >= target) = 1
  
  // 3. chat nhi phan sao cho no tien ve ranh gioi
  let s = 0, e = nums.length - 1
  while(s <= e) {
    let mid = Math.floor((s + e) / 2)

    console.log(s, e, mid)
    if(nums[mid] >= target) {
      e = mid - 1
    } else {
      s = mid + 1
    }
  }

  console.log(e, s)

  if(s == nums.length || nums[s] !== target) return -1
  
  return s
}

// console.log(searchFirst([1,1,4,5,7,7,7,8,9,9,9,9], 7))
// console.log(searchFirst([1,1,4,5,7,7,7,8,9,9,9,9], 6))
// console.log(searchFirst([1,1,4,5,7,7,7,8,9,9,9,9], 10))

var searchLast = function(nums, target) {
  // 1. chia khong gian mau thanh 2 phan 0 va 1
  //       [1,1,4,5,7,7,7,8,9,9,9,9]
  // t = 7 [0,0,0,0,0,0,0,1,1,1,1,1]
  
  // 2. tao ham de ket qua nam o ranh gioi 01
  // f(nums[mid] > target) = 1
  
  // 3. chat nhi phan sao cho no tien ve ranh gioi

  let s = 0, e = nums.length - 1
  while(s <= e) {
    let mid = Math.floor((s + e) / 2)

    console.log(s, e, mid)
    if(nums[mid] > target) {
      e = mid - 1
    } else {
      s = mid + 1
    }
  }
  if(e == -1 || nums[e] !== target) return -1
  return e
}

console.log(searchLast([1,1,4,5,7,7,7,8,9,9,9,9], 7))
console.log(searchLast([1,1,4,5,7,7,7,8,9,9,9,9], 8))
console.log(searchLast([1,1,4,5,7,7,7,8,9,9,9,9], 9))
console.log(searchLast([1,1,4,5,7,7,7,8,9,9,9,9], 0))
console.log(searchLast([1,1,4,5,7,7,7,8,9,9,9,9], 6))
console.log(searchLast([1,1,4,5,7,7,7,8,9,9,9,9], 10))

// https://leetcode.com/problems/search-a-2d-matrix/description/
/*
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true

[   0  1  2  3    4  5  6  7    8  9 10 11
  [ 1, 3, 5, 7],[10,11,16,20],[23,30,34,60]
]

n = 3, m = 4
m numbers each row
- 4 numbers first row
- 4 numbers second row
- 4 numbers third row
pos = 6 => i = floor(pos/m) , j = pos % m

r = i, c = j
[  e s
  [0,1,1,1],
  [1,1,1,1],
  [1,1,1,1]
]

f(mid[i][j] >= target) = 1
[]

*/
var searchMatrix = function(matrix, target) {
  let s = 0, e = matrix.length * matrix[0].length - 1
  while(s <= e) {
    let mid = Math.floor((s + e) / 2)
    const {i, j} = transform(mid, matrix[0].length)
    if(matrix[i][j] >= target) {
      e = mid - 1
    } else {
      s = mid + 1
    }
  }
  if(s == matrix.length * matrix[0].length) return false
  const {i,j} = transform(s, matrix[0].length)
  return matrix[i][j] === target
};

var transform = function(pos, m) {
  return {
    i: Math.floor(pos / m),
    j: pos % m
  }
}