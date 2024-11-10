/**
 * Given the head of a linked list, rotate the list to the right by k places.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [4,5,1,2,3]
 *
 * Example 2:
 * Input: head = [0,1,2], k = 4
 * Output: [2,0,1]
 *
 * Constraints:
 * The number of nodes in the list is in the range [0, 500].
 * -100 <= Node.val <= 100
 * 0 <= k <= 2 * 10^9
 *    1 2 3 4
 *   [1,2,3,4,5]
 *
 * https://leetcode.com/problems/rotate-list/
 *
 * @format
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

//         x y t
// head = [1,2,3,4,5]
var reverseLinkedList = function (head) {
  if (!head || !head.next) return head;
  let x = head,
    y = x.next;
  x.next = null;
  while (y) {
    let temp = y.next;
    y.next = x;
    x = y;
    y = temp;
  }
  return x;
};

var beautyPrint = function (head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  console.log(...arr);
};

var test3 = [
  new ListNode(1),
  new ListNode(2),
  new ListNode(3),
  new ListNode(4),
  new ListNode(5),
];
for (let i = 0; i < test3.length - 1; i++) {
  test3[i].next = test3[i + 1];
}
beautyPrint(reverseLinkedList(test3[0]));
