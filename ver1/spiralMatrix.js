/*
https://leetcode.com/problems/spiral-matrix/
Given an m x n matrix, return all elements of the matrix in spiral order.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

1 2 3
4 5 6
7 8 9

Example 2:
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]

1  2  3  4 (i)
5  6  7  8
9  10 11 12

matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
newMatrix = [[6,7]]

m = row
n = col

leftTopRow = 0, leftTopCol = 0, rightBotRow = m-1, rightBotCol = n-1
matrix[0][0..n-1] + matrix[1...m-2][n-1] + matrix[m-1][n-1..0] + matrix[m-2...1][0]
*/

var spiralOrder = function(matrix) {
  let leftTopRow = 0, leftTopCol = 0
  let rightBotRow = matrix.length - 1, rightBotCol = matrix[0].length - 1
  const res = []
  var loopMatrix = function() {
    for(let i = leftTopCol; i <= rightBotCol - 1; i++) {
      res.push(matrix[leftTopRow][i])
    }
    for(let i = leftTopRow; i <= rightBotRow - 1; i++) {
      res.push(matrix[i][rightBotCol])
    }
    for(let i = rightBotCol; i > leftTopCol; i--) {
      res.push(matrix[rightBotRow][i])
    }  
    for(let i = rightBotRow; i > leftTopRow; i--) {
      res.push(matrix[i][leftTopCol])
    }
  }
  while(leftTopRow < rightBotRow && leftTopCol < rightBotCol) {
    loopMatrix()
    leftTopRow++
    leftTopCol++
    rightBotRow--
    rightBotCol--
  }
  // 1 2
  // = = 3x3
  // = > 3x9
  // > = 9x3
  // > > 2x2

  if(leftTopRow === rightBotRow) {
    for(let i = leftTopCol; i <= rightBotCol; i++) {
      res.push(matrix[leftTopRow][i])  
    }
  } else if (leftTopCol === rightBotCol) {
    for(let i = leftTopRow; i <= rightBotRow; i++) {
      res.push(matrix[i][leftTopCol])  
    }
  }
  
  return res
};

console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))
console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))

/*
https://leetcode.com/problems/spiral-matrix-ii/

Given a positive integer n, generate an n x n matrix filled with elements from 1 to n^2 in spiral order.

Example 1:
Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]

Example 2:
Input: n = 1
Output: [[1]]
*/

var generateMatrix = function(n) {
  const matrix = Array.from(Array(n), () => new Array(n));
  let leftTopRow = 0, leftTopCol = 0
  let rightBotRow = n - 1, rightBotCol = n - 1
  let curVal = 1
  var pushNumToMatrix = function() {
    for(let i = leftTopCol; i < rightBotCol; i++) {
      matrix[leftTopRow][i] = curVal
      curVal++
    }
    for(let i = leftTopRow; i < rightBotRow; i++) {
      matrix[i][rightBotCol] = curVal
      curVal++
    }
    for(let i = rightBotCol; i > leftTopCol; i--) {
      matrix[rightBotRow][i] = curVal
      curVal++
    }
    for(let i = rightBotRow; i > leftTopRow; i--) {
      matrix[i][leftTopCol] = curVal
      curVal++
    }
  }

  while(leftTopRow < rightBotRow) {
    pushNumToMatrix()
    leftTopRow++
    leftTopCol++
    rightBotRow--
    rightBotCol--
  }

  if(leftTopRow === rightBotRow) {
    for(let i = leftTopCol; i <= rightBotCol; i++ ) {
      matrix[leftTopRow][i] = curVal
      curVal++
    }
  } else if(leftTopCol === rightBotCol) {
    for(let i = leftTopRow; i <= rightBotRow; i++ ) {
      matrix[i][leftTopCol] = curVal
      curVal++
    }
  }
  return matrix
};

console.log(generateMatrix(3))
console.log(generateMatrix(4))