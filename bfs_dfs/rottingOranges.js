/**
 * You are given an m x n grid where each cell can have one of three values:
 *
 * 0 representing an empty cell,
 * 1 representing a fresh orange, or
 * 2 representing a rotten orange.
 * Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes
 * rotten.
 *
 * Return the minimum number of minutes that must elapse until no cell has a fresh orange.
 * If this is impossible, return -1.
 *
 * bfs
 * Example 1:
 * Input: grid = [
 *                 [2,1,1],
 *                 [1,1,0],
 *                 [0,1,1]
 *             ]
 * Output: 4
 *
 * Minute 0
 * [2,1,1],
 * [1,1,0],
 * [0,1,1]
 *
 * Minute 1
 * [2,2,1],
 * [2,1,0],
 * [0,1,1]
 *
 * Minute 2
 * [2,2,2],
 * [2,2,0],
 * [0,1,1]
 *
 * Minute 3
 * [2,2,2],
 * [2,2,0],
 * [0,2,1]
 *
 * Minute 4
 * [2,2,2],
 * [2,2,0],
 * [0,2,2]
 *
 * Example 2:
 * Input: grid = [
 *     [2,1,1],
 *     [0,1,1],
 *     [1,0,1]
 * ]
 * Output: -1
 * Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because
 * rotting only happens 4-directionally.
 *
 * Example 3:
 * Input: grid = [[0,2]]
 * Output: 0
 * Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 *
 * Constraints:
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * grid[i][j] is 0, 1, or 2.
 *
 * 2 1 1 2
 * 0 1 1 0
 * 0 1 1 0
 *
 * https://leetcode.com/problems/rotting-oranges/
 *
 * @format
 */

var adj = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
var bfs = function (grid, visited) {
  const queue = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
        visited[i][j] = 0;
      }
    }
  }

  while (queue.length) {
    const cur = queue.shift();
    for (let k = 0; k < adj.length; k++) {
      const nextX = adj[k][0] + cur[0];
      const nextY = adj[k][1] + cur[1];
      if (
        nextX < 0 ||
        nextY < 0 ||
        nextX >= grid.length ||
        nextY >= grid[0].length
      ) {
        continue;
      }
      if (visited[nextX][nextY] === -1 && grid[nextX][nextY] === 1) {
        queue.push([nextX, nextY]);
        visited[nextX][nextY] = visited[cur[0]][cur[1]] + 1;
      }
    }
  }
  let minutes = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== 0) {
        if (visited[i][j] === -1) return -1;
        minutes = Math.max(minutes, visited[i][j]);
      }
    }
  }
  return minutes;
};

var orangesRotting = function (grid) {
  const visited = Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
    visited[i] = Array(grid[0].length).fill(-1);
  }

  return bfs(grid, visited);
};

console.log('orangesRotting:');
console.log(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ])
);
console.log(
  orangesRotting([
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1],
  ])
);
console.log(orangesRotting([[0, 2]]));

// https://leetcode.com/problems/edit-distance/description/
