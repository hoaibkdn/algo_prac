'''
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously 
following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer 
is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.


Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
0    1    2     3
3 -> 2 -> 0 -> -4
     ^          |
     |          |
     ------------

Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

1 -> 2
^    |
|    |
------

Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.

1
 
Constraints:
The number of the nodes in the list is in the range [0, 10^4].
-10^5 <= Node.val <= 10^5
pos is -1 or a valid index in the linked-list.

https://leetcode.com/problems/linked-list-cycle/
'''

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head):
        turtle = head
        hare = head
        while hare.next and hare.next.next:
            hare = hare.next.next
            turtle = turtle.next
            if hare == turtle:
                return True
        return False

s = Solution()

list1 = [ListNode(3), ListNode(2), ListNode(0), ListNode(-4)]
list1[0].next = list1[1]
list1[1].next = list1[2]
list1[2].next = list1[3]
list1[3].next = list1[1]
print(s.hasCycle(list1[0]))

list2 = [ListNode(1), ListNode(2)]
list2[0].next = list2[1]
list2[1].next = list2[0]
print(s.hasCycle(list2[0]))

list3 = [ListNode(1)]
print(s.hasCycle(list3[0]))

'''
head
1 -> 2 -> 3 -> 4 -> 5
1 -> 2 -> 3 -> 4
'''

class Solution2:
    def getMiddleNode(self, head):
        if not head:
            return None
        
        turtle = head
        hare = head
        while hare.next and hare.next.next:
            turtle = turtle.next
            hare = hare.next.next
        return turtle

s = Solution2()

list1 = [ListNode(3), ListNode(2), ListNode(0), ListNode(-4)]
list1[0].next = list1[1]
list1[1].next = list1[2]
list1[2].next = list1[3]
print(s.getMiddleNode(list1[0]).val)

list2 = [ListNode(3), ListNode(2), ListNode(0), ListNode(-4), ListNode(7)]
list2[0].next = list2[1]
list2[1].next = list2[2]
list2[2].next = list2[3]
list2[3].next = list2[4]
print(s.getMiddleNode(list2[0]).val)

list3 = [ListNode(1)]
print(s.getMiddleNode(list3[0]).val)

'''
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together 
the nodes of the first two lists.

Return the head of the merged linked list. 

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:
Input: list1 = [], list2 = []
Output: []

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]

Constraints:
The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.

https://leetcode.com/problems/merge-two-sorted-lists
'''

class Solution3:
    def mergeTwoLists(self, list1, list2):
        if not list1 or not list2:
            return list1 if list1 else list2
        if list1.val < list2.val:
            list1.next = self.mergeTwoLists(list1.next, list2)
            return list1
        else:
            list2.next = self.mergeTwoLists(list1, list2.next)
            return list2

def beautyPrint(head):
    if head is None:
        return
    print(head.val)
    beautyPrint(head.next)
    
s = Solution3()
list1 = [ListNode(1), ListNode(2), ListNode(4)]
list2 = [ListNode(1), ListNode(3), ListNode(4)]
list1[0].next = list1[1]
list1[1].next = list1[2]
list2[0].next = list2[1]
list2[1].next = list2[2]
beautyPrint(s.mergeTwoLists(list1[0], list2[0]))


'''
1 -> 2 -> 3 -> 4 -> 5
x

https://leetcode.com/problems/remove-nth-node-from-end-of-list
'''

class Solution4:
    def deleteNode(self, head, x):
        dummy = ListNode(0)
        dummy.next = head
        
        i = 1
        copiedNodes = dummy
        while copiedNodes.next:   
            if i == x:     
                copiedNodes.next = copiedNodes.next.next
                break
            copiedNodes = copiedNodes.next
            i += 1
        return dummy.next

        
s = Solution4()
list1 = [ListNode(1), ListNode(2), ListNode(3), ListNode(4), ListNode(5), ListNode(6)]
list1[0].next = list1[1]
list1[1].next = list1[2]
list1[2].next = list1[3]
list1[3].next = list1[4]
list1[4].next = list1[5]
print()
beautyPrint(s.deleteNode(list1[0], 1))

        