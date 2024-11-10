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

var rotateRight = function (head, k) {
  if (!head) return head;
  let turtle = head,
    temp = head;
  let hare = head,
    count = 0;

  while (temp) {
    temp = temp.next;
    count++;
  }
  if (k % count === 0) return head;

  let c = 0;
  // find hare has the distance with turtle = k
  while (c < k % count && hare) {
    hare = hare.next;
    c++;
  }

  // move both hare and turtle until hare.next = null
  // -> turtle.next = kth item should rotate
  while (hare.next) {
    hare = hare.next;
    turtle = turtle.next;
  }

  // the returning head must be turtle.next, and we
  // need to connect last element (which is hare) to head
  // remember to break connection between turtle and turtle.next
  hare.next = head;
  const newHead = turtle.next;
  turtle.next = null;

  return newHead;
};

var beautyPrint = function (head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  console.log(...arr);
};

var test1 = [
  new ListNode(1),
  new ListNode(2),
  new ListNode(3),
  new ListNode(4),
  new ListNode(5),
];
for (let i = 0; i < test1.length - 1; i++) {
  test1[i].next = test1[i + 1];
}
beautyPrint(rotateRight(test1[0], 2));

var test2 = [new ListNode(0), new ListNode(1), new ListNode(2)];
for (let i = 0; i < test2.length - 1; i++) {
  test2[i].next = test2[i + 1];
}
beautyPrint(rotateRight(test2[0], 4));
