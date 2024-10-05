class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/*
dup = {}
iterate through Link list -> next
*/

function printLL(head) {
  const arrLL = []
  while (head != null) {
    arrLL.push(head.value)
    head = head.next;
  }
  console.log(arrLL)
}

function LLFromArray(arr) {
  var head = new Node(0);
  var cur = head;
  for (let i = 0; i < arr.length; i++) {
    cur.next = new Node(arr[i])
    cur = cur.next;
  }
  return head.next;
}

function removeDup(head) {
  var cur = head
  const dupValue = {}
  while(cur && cur.next) {
    dupValue[cur.value] = 1
    if(cur.next && dupValue[cur.next.value]) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}

/*
1 3 4 1
{1: 1, }

prev = null
cur = head

iterate {
  if (cur.value is in dict) {
    prev.next = cur.next
  } else {
    put value into dict
    prev = cur
  }
  cur = cur.next
}
*/

/*
j         i
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> null

*/

function findkToLastElm(head, k) {
  let init = head
  let kNode = head
  let steps = k
  while(init && steps > 1) {
    init = init.next
    steps--
  }
  if(!init) return null
  while(init.next) {
    init = init.next
    kNode = kNode.next
  }
  return kNode
}

const head = LLFromArray([1, 2, 3, 4, 5, 6, 7, 8])
const res = findkToLastElm(head, 8)
// console.log(res)

/*
            x    y    z
  1 <- 2 <- 3    4 -> 5 -> 6 -> 7 -> 8 -> null
*/

/*
reverse LL
head: 1-> 2 -> 3
cur = Node(0)
cur.next = head


*/

function reverseLL(head) {
  if(!head || !head.next) return head
  let y = head
  let x = null, z = null
  while(y) {
    z = y.next
    y.next = x
    x = y
    y = z
  }
  return x
}
// [4,1,8,4,5] -> 4 -> 1 -> 8 -> 4 -> 5
// [5,6,1,8,4,5] -> 5 -> 6 -> 1 -> 8 -> 4 -> 5
printLL(reverseLL(head))

let x1 = new Node(4)
let x2 = new Node(1)
let x3 = new Node(8)
let x4 = new Node(4)
let x5 = new Node(5)
x1.next = x2
x2.next = x3
x3.next = x4
x4.next = x5

let y1 = new Node(5)
let y2 = new Node(6)
let y3 = new Node(1)
y1.next = y2
y2.next = y3
y3.next = x3

// console.log(solve(x1, y1))

/*

search(arr, k)
  - x | pivot | y // O(n)
8 | 1 | 4
k = 11
=> new K = 2 

Case 1: k <= x
  - search(x, k)
Case 2: k = x + 1
  - return pivot
Case 3: k > x + 1
  - search(y, k - (x+1)) // 
n * (1 + 1/2 + 1/4 + 1/8 ...) = 2n
 
*/

/*
1,2,3     = a[1..3]
  2,3,4   = a[2..4] = a[1...3] + a[4] - a[1]
a = [1,2,3,4,5,6,7,8]
k = 3
x = 6

a[]


a = [-1, 3, 5, 1, -4, 2]
l = [null, null, null, 3, 4, 3]

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

nums[1..2] = nums[1] + nums[2]
nums[1..3] = nums[1..2] + nums[3]
nums[1..n] = nums[1..n-1] + nums[n]

nums[2..n] = nums[2..n-1] + nums[n] = nums[1...n] - nums[1]
           = nums[1..n-1] + nums[n] - nums[1]
nums[i..j]
n = 8, nums[3..6] = nums[1..8] - nums[1..2] - nums[7..8]
                  = nums[1..6] - nums[1..2]
nums[i..j] = sum[j] - sum[i-1]
we want nums[i..j] max => (sum[j] - sum[i-1]) max
assume we fix j => sum[j] unchanges => sum[i-1] min

=> khi duyet den j, ta duy tri Min = sum[i] (i < j) nho nhat
=> co doan ket thuc o j ma lon nhat => sum[i..j] max

*/



/*
Problem 1:
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

l1 and l2 in the examples below are linked lists, not arrays

Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

remainder = carry
l1-> next + l2 -> next 

*/

function printLL(head) {
  const arrLL = []
  while (head != null) {
    arrLL.push(head.val)
    head = head.next;
  }
  console.log(arrLL)
}

function LLFromArray(arr) {
  var head = new ListNode(0);
  var cur = head;
  for (let i = 0; i < arr.length; i++) {
    cur.next = new ListNode(arr[i])
    cur = cur.next;
  }
  return head.next;
}

function ListNode (val, next) {
  this.val = val;
  this.next = next
}

// https://leetcode.com/problems/add-two-numbers
var addTwoNumbers = function(l1, l2) {
  let carry = 0
  var resL = new ListNode('res')
  const res = resL
  while(l1 && l2) {
    const sum = l1.val + l2.val + carry
    carry = Math.floor(sum / 10)
    resL.next = new ListNode(Math.floor(sum % 10))
    l1 = l1.next
    l2 = l2.next
    resL = resL.next
  }
  if(l2) l1 = l2
  while(l1) {
    const sum = l1.val + carry
    resL.next = new ListNode(Math.floor(sum % 10))
    carry = Math.floor(sum / 10)
    l1 = l1.next
    resL = resL.next
  }
  if(carry) {
    resL.next = new ListNode(carry)
  }
  return res.next
}

var reverseLL = function (l) {
  let x = l, z = l.next
  l.next = null
  while(z) {
    let y = z.next
    z.next = x
    x = z
    z = y
  }
  return x
}

/*
Example 1:
Input: l1 = [7,2,4,3], l2 = [5,6,4]
Output: [7,8,0,7]

Example 2:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [8,0,7]

Example 3:
Input: l1 = [0], l2 = [0]
Output: [0]
*/

// https://leetcode.com/problems/add-two-numbers-ii/
var addTwoNumbers2 = function(l1, l2) {
  let reversedL1 = reverseLL(l1)
  let reversedL2 = reverseLL(l2)
  return reverseLL(addTwoNumbers(reversedL1, reversedL2))
  
}


printLL(addTwoNumbers(LLFromArray([2,4,3]), LLFromArray([5,6,4])))
printLL(addTwoNumbers(LLFromArray([0]), LLFromArray([0])))
printLL(addTwoNumbers(LLFromArray([9,9,9,9,9,9,9]), LLFromArray([9,9,9,9])))

printLL(addTwoNumbers2(LLFromArray([2,4,3]), LLFromArray([5,6,4])))
printLL(addTwoNumbers2(LLFromArray([0]), LLFromArray([0])))
printLL(addTwoNumbers2(LLFromArray([7,2,4,3]), LLFromArray([5,6,4])))


// https://leetcode.com/problems/merge-k-sorted-lists/
/*
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:

Input: lists = [
  [1,4,5],
  [1,3,4],
  [2,6]
]
set = [3, 6, 4]
res = [1, 1, 2, ]
Output: [1,1,2,3,4,4,5,6]

1 2 3 4 5 6 7 8
 12  34  56  78
  1234    5678
    12345678

Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []

*/

function Node (val) {
  this.val = val;
  this.next = null
}

function LLFromArray(arr) {
  var head = new Node(0);
  var cur = head;
  for (let i = 0; i < arr.length; i++) {
    cur.next = new Node(arr[i])
    cur = cur.next;
  }
  return head.next;
}

var mergeKLists = function(lists) {
  if (lists.length == 0) {
    return null
  }
  const tempMergeList = []
  return mergeKSortedList(lists, tempMergeList)
};

var mergeKSortedList = function(lists, temp) {
  for(let i = 0; i < lists.length; i+=2) {
    if(lists[i+1]) {
      temp.push(mergeTwoList(lists[i], lists[i+1]))
    } else {
      temp.push(lists[i])
    }
  }
  if(temp.length > 1) {
    return mergeKSortedList(temp, [])
  }
  return temp[0]
}

var mergeTwoList = function(list1, list2) {
  if(!list1 || !list2) return list1 || list2 
  if(list1.val < list2.val) {
    list1.next = mergeTwoList(list1.next, list2)
    return list1
  } else {
    list2.next = mergeTwoList(list2.next, list1)
    return list2
  }
}

function printLL(head) {
  const arrLL = []
  while (head != null) {
    arrLL.push(head.val)
    head = head.next;
  }
  console.log(arrLL)
}
const list1 = new LLFromArray([1,4,5])
printLL(list1)
const list2 = new LLFromArray([1,3,4])
const list3 = new LLFromArray([2,6])
printLL(mergeKLists([list1, list2, list3]))