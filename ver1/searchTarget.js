/*
Problem 1:
Given a date string in the form Day Month Year, where:

Day is in the set {"1st", "2nd", "3rd", "4th", ..., "30th", "31st"}.
Month is in the set {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}.
Year is in the range [1900, 2100].
Convert the date string to the format YYYY-MM-DD, where:

YYYY denotes the 4 digit year.
MM denotes the 2 digit month.
DD denotes the 2 digit day.
 
Example 1:
Input: date = "20th Oct 2052"
Output: "2052-10-20"

Example 2:
Input: date = "6th Jun 1933"
Output: "1933-06-06"

Example 3:
Input: date = "26th May 1960"
Output: "1960-05-26"

const dateArr = date.split(' ') 
const mothObj = { 'Jan': "01", "Feb": "02",... }
getDate('1st') {
  return number of Date -> 01
}
*/
// https://leetcode.com/problems/reformat-date
var getDate = function (d) {
  let date = ''
  for (let i = 0; i < d.length - 2; i++) {
    date += d.charAt(i)
  }
  return date.length === 1 ? '0'+date : date
}

var convertDate = function(s) {
  const dateArr = s.split(' ') // O(s length)
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const date = getDate(dateArr[0])
  const hashMonth = month.reduce((objMonth, m, index) => {
    objMonth[m] = index < 9 ? '0' + (index + 1) : index + 1
    return objMonth
  }, {})
  const convertedMonth = hashMonth[dateArr[1]]
  return `${dateArr[2]}-${convertedMonth}-${date}`
}

// console.log(convertDate("26th May 1960"))
// console.log(convertDate("6th Jun 1933"))
// console.log(convertDate("20th Oct 2052"))

/*
Problem 2:
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:
Input: nums = [1,3,5,6], target = 7
Output: 4

loop i=0 -> n - 1 (n = nums.length)
  nums[i] >= target -> return i

return n
----
middleIdx = (high + low)/2
result = middleIdx
nums[middleIdx] === target -> return middleIdx
nums[middleIdx] > target -> target should belong to nums[0...middleIdx - 1]
nums[middleIdx] < target-> target should belong to nums[middleIdx + 1...n]

target = 8
1 2 3 4 5 10 11 12 13
0 0 0 0 0 1  1  1  1

0 0 0 0 0 0 0 0 0 
1 1 1 1 1 1 1 1 1

left <= right
1: nums[middleIdx] > target -> [left, middleIdx - 1], store middleIdx as result
0: nums[middleIdx] < target -> [middleIdx + 1, right]

left = n => return left
else return result
https://leetcode.com/problems/search-insert-position

exit low > high (low = high + 1)
*/
var getTargetIndex = function(nums, target) {
  let low = 0, high = nums.length - 1
  // while(low <= high) {
  //   const midIdx = Math.floor((high + low) / 2)  
  //   if(nums[midIdx] === target) return midIdx
  //   if(nums[midIdx] > target) {
  //     high = midIdx - 1
  //   } else {
  //     low = midIdx + 1
  //   }
  // }
  // return low
  return recursiveTargetIndex(nums, low, high, target)
}

var recursiveTargetIndex = function(nums, low, high, target) {
  if (low > high) return low

  const midIdx = Math.floor((high + low) / 2)
  if (nums[midIdx] === target) return midIdx
  if (nums[midIdx] > target) {
    return recursiveTargetIndex(nums, low, midIdx - 1, target)  
  } else {
    return recursiveTargetIndex(nums, midIdx + 1, high, target)  
  }
}

console.log(getTargetIndex([1, 2, 3, 4, 5, 10, 11, 12, 13], 8))
console.log(getTargetIndex([1,3,5,6], 2))
console.log(getTargetIndex([1,3,5,6, 8], 9))


/*
Problem 3:
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

 
Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:
Input: prices = [7,2,6,4,3,1]  -> max([i+1-> n]) = max(i+1, max(i+2, n))
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.



sellDay > buyDay & sellDay - buyDay = max
~ sellDay -> max i+x (x >= 1)
~ buyDay -> min -> i




price[j] - price[i] = max ( j > i)


max = 0
loop [i = 0..n-1] (n = prices.length)
  buyDay = prices[i] < buyDay ? prices[i] : buyDay -> 
  if(sellDay.dayIdx >)
  sellDay 

https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
*/

var maximumProfit = function(prices) {
  const pricesLen = prices.length
  let maxProfit = 0, curMax = 0
  for(let i = pricesLen - 1; i >= 0; i--) {
    if(i < pricesLen - 1) {
      curMax = Math.max(curMax,  prices[i + 1]) // 
      maxProfit = Math.max(curMax - prices[i], maxProfit)
    }
  }
  return maxProfit
}

