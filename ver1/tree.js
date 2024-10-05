
/*
https://leetcode.com/problems/path-sum/

        1
    2      3  
  5   7   4  6

target = 9

  root->left, curSum, target => root->left == null : sum === target -> true
  root->right, curSum, target => root->left == null : sum === target -> true
*/

function TreeNode(val, left, right) {
 this.val = (val===undefined ? 0 : val)
 this.left = (left===undefined ? null : left)
 this.right = (right===undefined ? null : right)
}

/*
       1
    2
null  4
*/
var getSum = function(node, curSum, target) {
  if(!node.left && !node.right) return curSum === target
  if(node.left) {
    const res = getSum(node.left, curSum + node.left.val, target)  
    if(res) return res
  }
  if(node.right) { 
    return getSum(node.right, curSum + node.right.val, target)  
  }
  return false
}

var hasPathSum = function(root, targetSum) {
  if(!root) return false
  let curSum = root.val 
  return getSum(root, curSum, targetSum)  
};

// var node1 = new TreeNode(1)
// var node7 = new TreeNode(7)
// var node2 = new TreeNode(2)
// var node13 = new TreeNode(13)
// var node11 = new TreeNode(11, node7, node2)
// var node4 = new TreeNode(4, null, node1)
// var node42 = new TreeNode(4, node11)
// var node8 = new TreeNode(8, node13, node4)
// var node5 = new TreeNode(5, node42, node8)
// console.log(hasPathSum(node5, 22))


/*
https://leetcode.com/problems/sum-root-to-leaf-numbers/

*/

var calSum = function(root, curSum, res) {
  if(!root.left && !root.right) {
    res.sum += curSum
    return
  }
  if(root.left) {
    calSum(root.left, curSum * 10 + root.left.val, res)
  }
  if(root.right) {
    calSum(root.right, curSum * 10 + root.right.val, res)
  }
}

var sumNumbers = function(root) {
  if (!root) return 0
  let res = {sum: 0}, curSum = root.val
  calSum(root, curSum, res)
  return res.sum
};

var node3 = new TreeNode(3)
var node2 = new TreeNode(2)
var node1 = new TreeNode(1, node2, node3)
console.log(sumNumbers(node1))


var node25 = new TreeNode(5)
var node21 = new TreeNode(1)
var node20 = new TreeNode(0)
var node29 = new TreeNode(9, node25, node21)
var node24 = new TreeNode(4, node29, node20)
console.log(sumNumbers(node24))


// https://leetcode.com/problems/validate-binary-search-tree/
// https://leetcode.com/problems/first-bad-version/
// https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
// https://leetcode.com/problems/split-array-largest-sum/
// số nhanh nhiều nhất ^ độ sâu lớn nhất 

/*
Problem 1: 
Given the root of a binary tree with unique values and the values of two different nodes of the tree x and y, return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise.

Two nodes of a binary tree are cousins if they have the same depth with different parents.

Note that in a binary tree, the root node is at the depth 0, and children of each depth k node are at the depth k + 1.

Example 1:
Input: root = [1,2,3,4], x = 4, y = 3
Output: false
    1
   / \
  2   3
 /
4

Example 2:
Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
Output: true
    1
   / \
  2   3
   \   \
    4   5 -> cousin ~ (!isSibling, same depth )
     \   \
      7   6 -> cousin

Example 3:
Input: root = [1,2,3,null,4], x = 2, y = 3
Output: false
    1
   / \
  2   3
   \
    4

tree size <= 100
x != y, x and y are integers

!isSibling(a, b) && (level(a) === level(b))
  
level(root, a, l)
  if(!root) return null
  if(root.val === a) return l
  leftLev = level(root.left, a, l + 1)
  if(leftLev) return leftLev
  return level(root.right, a, l + 1)


isSibling(root, a, b)
  if(!root) return false
  const leftNode = root.left, rightNode = root.right
  if(leftNode & rightNode) {
    const isOk = (leftNode.val === a && rightNode.val === b) || (leftNode.val === b && rightNode.val === a)
    if(isOk) return isOk
  }
  return isSibling(leftNode, a, b) || isSibling(rightNode, a, b)
*/

var isCousins = function(root, x, y) {
  return level(root, x, 0) === level(root, y, 0) && !isSibling(root, x, y)
};

var level = function (root, x, l) {
  if(!root) return null
  if(root.val === x) return l
  let leftLev = null
  if(root.left) {
    leftLev = level(root.left, x, l + 1)
  }
  if(leftLev !== null) return leftLev
  return level(root.right, x, l + 1)
}

var isSibling = function(root, x, y) {
  if(!root) return false
  const leftNode = root.left, rightNode = root.right
  if(leftNode && rightNode) {
    const isOk = (leftNode.val === x && rightNode.val === y) || (leftNode.val === y && rightNode.val === x)
    if(isOk) return isOk
  }
  return isSibling(leftNode, x, y) || isSibling(rightNode, x, y)
}
// https://leetcode.com/problems/cousins-in-binary-tree

// class BinaryTree {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//     this.parent = null;
//   }
// }


function BinaryTree (val) {
  this.value = val;
  this.left = null;
  this.right = null;
  this.parent = null
}
function findSuccessor(node) {
  if(node.right) {
    let cur = node.right
    while (cur.left) {
      cur = cur.left
    }
    return cur
  }
  let p = node.parent
  while(p && p.right === node) {
    node = p
    p = p.parent
  }
  return p
}
// https://leetcode.com/problems/inorder-successor-in-bst/
const t1 = new BinaryTree(1)
const t2 = new BinaryTree(2)
const t7 = new BinaryTree(7)
const t5 = new BinaryTree(5)
const t6 = new BinaryTree(6)
const t4 = new BinaryTree(4)
const t3 = new BinaryTree(3)

t1.left = t2
t2.left = t5
t2.right = t7

// https://leetcode.com/problems/minimum-time-to-complete-all-tasks/description/
/*
[[2,3,1],[4,5,2],[1,5,2]]


  1 2 3 4 5
1   1 1
2       1 1
2 1 1 1 1 1
*/

/**
    1
  2   3

      5
  (4)   (5)   

         i  
  x[i-1]    x[n-i] => x[i-1] * x[n-i]

dp[i] = so cach xay cay co i thang
dp[1] = 1
dp[0] = 1

dp[i] = sum(dp[j] * dp[i-j-1]) (j: 0->i-1, root = j+1)

for (root: 1 -> i) {
  lef = root-1
  rig = i-root
  dp[i] += dp[lef] * dp[rig]
}

*/

var numTrees = function(n) {
  const memo = {}
  calTrees(n, memo)
  return memo[n]
};

var calTrees = function (i, memo) { // cal n lẫn cho mỗi i
  if(i <= 1) {
    memo[i] = 1
    return
  }
  memo[i] = 0 
  for(let root = 1; root <= i; root++) { // có n số i
    const left = root - 1
    const right = i - root
    if(!memo[left]) {
      calTrees(left, memo) // n
    }
    if(!memo[right]) {
      calTrees(right, memo) // n
    }
    memo[i] += (memo[left] * memo[right]) // n memo -> cal n
  }
}
// O(n^2): mỗi i -> cal memo (if) 1 lần

console.log(numTrees(1))
console.log(numTrees(2))
console.log(numTrees(3))
console.log(numTrees(5))