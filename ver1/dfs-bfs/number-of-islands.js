/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/

/*
https://excalidraw.com/#room=41ec3d7f101ea236bbdc,SrVlmkn7y3bPhzKSVm6NTg
*/
var points = [[1, 0], [-1, 0], [0, 1], [0, -1]]
function dfs(i, j, visit, grid) {
  visit[i][j] = true
  for (let k = 0; k < 4; k++) {
    let x = i + points[k][0];
    let y = j + points[k][1];
    if (visit[x] && !visit[x][y] && grid[x] && grid[x][y] === '1') {
      dfs(x, y, visit, grid)
    }
  }
}

var numIslands = function(grid) {
  const visit = []
  for (let i = 0; i < grid.length; i++) {
    visit.push([])
    for (let j = 0; j < grid[0].length; j++) {
      visit[i].push(false)
    }
  }
  let count = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (!visit[i][j] && grid[i][j] === '1') {
        count++
        dfs(i, j, visit, grid)
      }
    }
  }
  console.log(count)
  return count
}

// numIslands([
//             ["1","1","1","1","0"],
//             ["1","1","0","1","0"],
//             ["1","1","0","0","0"],
//             ["0","0","0","0","1"]
//           ])

// numIslands([
//             ["1","1","0","0","0"],
//             ["1","1","0","0","0"],
//             ["0","0","1","0","0"],
//             ["0","0","0","1","1"]
//           ])
numIslands([
  ["0", "1", "0"],
  ["1", "0", "1"],
  ["0", "1", "0"],
])

function bfs(i, j, visit, grid) {
  const queue = []
  queue.push([i, j])
  visit[i][j] = true
  while (queue.length > 0) {
    const p = queue.shift()
    for (let k = 0; k < 4; k++) {
      let x = p[0] + points[k][0];
      let y = p[1] + points[k][1];
      if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) continue;
      if (!visit[x][y] && grid[x][y] === '1') {
        queue.push([x, y])
        visit[x][y] = true
      }
    }
  }
}

var numIslands2 = function(grid) {
  const visit = []
  for (let i = 0; i < grid.length; i++) {
    visit.push([])
    for (let j = 0; j < grid[0].length; j++) {
      visit[i].push(false)
    }
  }
  let count = 0
  // O(mn + 4mn)
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (!visit[i][j] && grid[i][j] === '1') {
        count++
        bfs(i, j, visit, grid)
      }
    }
  }
  console.log(count)
  return count
}

numIslands2([
  ["1", "1", "1", "1", "0"],
  ["1", "1", "0", "1", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "0", "0", "1"]
])

numIslands2([
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
])
numIslands2([
  ["0", "1", "0"],
  ["1", "0", "1"],
  ["0", "1", "0"],
])