/** @format */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/*
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3
    3(3) chieu cao cua cay co root la node hien tai
   / \
 9(1) 20(2)
     /  \
  15(1)  17(1)

Example 2:
Input: root = [1,null,2]
Output: 2
     1
      \
       2
       
https://leetcode.com/problems/maximum-depth-of-binary-tree/
*/

var getMaxDepth = function (nodes, res, count) {
  if (!nodes) {
    if (count > res.max) {
      res.max = count;
    }
    return;
  }
  getMaxDepth(nodes.left, res, count + 1);
  getMaxDepth(nodes.right, res, count + 1);
};

var getMaxDepth2 = function (nodes, count) {
  if (!nodes) {
    return count;
  }
  const depLeft = getMaxDepth2(nodes.left, count + 1);
  const depRight = getMaxDepth2(nodes.right, count + 1);
  return Math.max(depLeft, depRight);
};

var maxDepth = function (root) {
  // res = {max: 0}
  // getMaxDepth(root, res, 0) // 0: phai di ra ngoai cay
  // return res.max
  // return getMaxDepth2(root, 0) // 0: phai di ra ngoai cay
  if (!root) {
    return 0;
  }
  const depLeft = maxDepth(root.left) + 1;
  const depRight = maxDepth(root.right) + 1;
  return Math.max(depLeft, depRight);
};

let node15 = new TreeNode(15);
let node17 = new TreeNode(17);
let node9 = new TreeNode(9);
let node20 = new TreeNode(20, node15, node17);
let node3 = new TreeNode(3, node9, node20);

console.log(maxDepth(node3));

let node2 = new TreeNode(2);
let node1 = new TreeNode(null, node2);
console.log(maxDepth(node1));
