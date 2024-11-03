/**
 * Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder
 * is the inorder traversal of the same tree, construct and return the binary tree.
 *
 * Example 1:
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20,null,null,15,7]
 *
 * Example 2:
 * Input: preorder = [-1], inorder = [-1]
 * Output: [-1]
 *
 * Constraints:
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder and inorder consist of unique values.
 * Each value of inorder also appears in preorder.
 * preorder is guaranteed to be the preorder traversal of the tree.
 * inorder is guaranteed to be the inorder traversal of the tree.
 *
 *           3
 *          / \
 *         9   20
 *             / \
 *            15  7
 *
 * preOrder(root) = [root, preOrder(root.left), preOrder(root.right)]
 * inOrder(root) = [inOrder(root.left), root, inOrder(root.right)]
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * @format
 */

var buildTree2 = function (preorder, inorder) {
  if (!preorder.length) {
    return null;
  }
  const root = new TreeNode(preorder[0]);
  const rootIdxInOrder = inorder.indexOf(preorder[0]);
  const leftInOrder = inorder.slice(0, rootIdxInOrder);
  const rightInOrder = inorder.slice(rootIdxInOrder + 1);
  const leftPreOrder = preorder.slice(1, leftInOrder.length + 1);
  const rightPreOrder = preorder.slice(leftInOrder.length + 1);
  root.left = buildTree2(leftPreOrder, leftInOrder);
  root.right = buildTree2(rightPreOrder, rightInOrder);
  return root;
};

var buildTree = function (preorder, inorder) {
  let preorderIndex = 0;

  let mapping = new Map();
  for (let i = 0; i < inorder.length; i++) {
    mapping.set(inorder[i], i);
  }

  function build(start, end) {
    if (start > end) {
      return null;
    }

    let rootVal = preorder[preorderIndex];
    let root = new TreeNode(rootVal);
    let middle = mapping.get(rootVal);
    preorderIndex++;
    root.left = build(start, middle - 1);
    root.right = build(middle + 1, end);

    return root;
  }

  return build(0, preorder.length - 1);
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }

 * inorder = [inorder(root.left), root, inorder(root.right)]
   postorder = [postorder(root.left), postorder(root.right), root]
	 https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  let postIndex = postorder.length - 1;
  const mapping = {};
  for (let i = 0; i < inorder.length; i++) {
    mapping[inorder[i]] = i;
  }

  function build(start, end) {
    if (start > end) {
      return null;
    }
    const nodeVal = postorder[postIndex];
    const root = new TreeNode(nodeVal);
    let mid = mapping[nodeVal];
    postIndex--;
    root.right = build(mid + 1, end);
    root.left = build(start, mid - 1);

    return root;
  }
  return build(0, postIndex);
};

var buildTree2 = function (inorder, postorder) {
  if (!postorder.length) {
    return null;
  }
  const len = postorder.length;
  const root = new TreeNode(postorder[len - 1]);
  const rootIdxInOrder = inorder.indexOf(postorder[len - 1]);
  const leftInOrder = inorder.slice(0, rootIdxInOrder);
  const rightInOrder = inorder.slice(rootIdxInOrder + 1);
  const leftPostOrder = postorder.slice(0, leftInOrder.length);
  const rightPostOrder = postorder.slice(
    leftInOrder.length,
    postorder.length - 1
  );
  root.left = buildTree(leftInOrder, leftPostOrder);
  root.right = buildTree(rightInOrder, rightPostOrder);
  return root;
};
