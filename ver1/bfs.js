/*
You are given an m x n grid rooms initialized with these three possible values.

-1 A wall or an obstacle.
0 A gate.
INF Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

Example 1:
Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

Example 2:
Input: rooms = [[-1]]
Output: [[-1]]

Constraints:

m == rooms.length
n == rooms[i].length
1 <= m, n <= 250
rooms[i][j] is -1, 0, or 231 - 1.
*/

var getEmptyRooms = function(rooms) {
  // const queue = []
  // console.log(rooms)
  const roomRows = rooms.length, roomCols = rooms[0].length
  for(let i = 0; i < roomRows; i++) {
    for(let j = 0; j < roomCols; j++) {
      if(rooms[i][j] > 0) {
        // queue.push(roomRows[i][j])
        search(rooms, i, j)
        // emptyRooms.push 
      }
    }
  }
}

const adj = [[1, 0], [0, 1], [-1, 0], [0, -1]]

var search = function(rooms, row, col) {
  const queue = []
  const roomRows = rooms.length, roomCols = rooms[0].length
  const grid = Array.from(Array(roomRows), () => new Array(roomCols).fill(-1))
  queue.push([row, col])
  grid[row][col] = 0
  let minDist = 2147483647
  
  while(queue.length) {
    const cur = queue.shift()

    // Temple
    if (rooms[cur[0]][cur[1]] == 0) {
      minDist = Math.min(minDist, grid[cur[0]][cur[1]])
    }
    
    for (let i = 0; i < 4; i++) {
      var nextX = cur[0] + adj[i][0]
      var nextY = cur[1] + adj[i][1]
      if (nextX < 0 || nextX >= roomRows || nextY < 0 || nextY >= roomCols || rooms[nextX][nextY] === -1) continue

      // not visited
      if (grid[nextX][nextY] == -1) {
        grid[nextX][nextY] = grid[cur[0]][cur[1]] + 1
        queue.push([nextX, nextY])
      }
    }
  }

  rooms[row][col] = minDist
}

var wallsAndGates = function(rooms) {
  getEmptyRooms(rooms)
  return rooms
};

// console.log(wallsAndGates([[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]))

// console.log(wallsAndGates([[-1]]))

var wallsAndGates2 = function(rooms) {
  const roomRows = rooms.length, roomCols = rooms[0].length
  const visited = Array.from(Array(roomRows), () => new Array(roomCols).fill(-1))
  const queue = []
  for(let i = 0; i < roomRows; i++) {
    for(let j = 0; j < roomCols; j++) {
      // Temple
      if(rooms[i][j] === 0) {
        queue.push([i, j])
        visited[i][j] = 0
      }
    }
  }
  searchFromTemple(rooms, queue, visited)
  return rooms
};

// var searchFromTemple = function(rooms, queue) {
//   const roomRows = rooms.length, roomCols = rooms[0].length
//   while(queue.length) {
//     const curTemple = queue.shift()
//     for(let i = 0; i < 4; i++) {
//       const nextX = curTemple[0] + adj[i][0]
//       const nextY = curTemple[1] + adj[i][1]
//       if(nextX < 0 || nextX >= roomRows || nextY < 0 || nextY >= roomCols || rooms[nextX][nextY] === -1) continue
      
//       if(rooms[nextX][nextY] === 2147483647) {
//         rooms[nextX][nextY] = rooms[curTemple[0]][curTemple[1]] + 1
//         queue.push([nextX, nextY])
//       }
//     }
//   }
// }

var searchFromTemple = function(rooms, queue, visited) {
  const roomRows = rooms.length, roomCols = rooms[0].length
  while(queue.length) {
    const curTemple = queue.shift()
    for(let i = 0; i < 4; i++) {
      const nextX = curTemple[0] + adj[i][0]
      const nextY = curTemple[1] + adj[i][1]
      if(nextX < 0 || nextX >= roomRows || nextY < 0 || nextY >= roomCols || rooms[nextX][nextY] === -1) continue
      
      if(visited[nextX][nextY] < 0) {
        visited[nextX][nextY] = visited[curTemple[0]][curTemple[1]] + 1
        rooms[nextX][nextY] = rooms[nextX][nextY] === 0 ? rooms[nextX][nextY] : visited[nextX][nextY]
        queue.push([nextX, nextY])
      }
    }
  }
}

// console.log(wallsAndGates2([[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]))

// console.log(wallsAndGates2([[-1]]))

console.log(wallsAndGates2([[-1,2147483647,0,2147483647,-1,2147483647,-1,-1,-1,0,0,2147483647,-1,0,0,0,0,0,-1,0,0,2147483647,0,2147483647,2147483647,-1,2147483647,-1,2147483647,-1,-1,-1,0]]))

// [[-1,2147483647,0,2147483647,-1,2147483647,-1,-1,-1,0,0,2147483647,-1,0,0,0,0,0,-1,0,0,2147483647,0,2147483647,2147483647,-1,2147483647,-1,2147483647,-1,-1,-1,0]]

/*
[
  [
            -1,          1,          0,  1,
            -1, 2147483647,         -1, -1,
            -1,          0,          0,  1,
            -1,          0,          0,  0,
             0,          0,         -1,  0,
             0,          1,          0,  1,
             2,         -1, 2147483647, -1,
    2147483647,         -1,         -1, -1,
             0
  ]
]
*/

/*
const adj = [[1, 0], [0, 1], [-1, 0], [0, -1]]

var wallsAndGates = function(rooms) {
  const roomRows = rooms.length, roomCols = rooms[0].length
  const visited = Array.from(Array(roomRows), () => new Array(roomCols).fill(0))
  const queue = []
  for(let i = 0; i < roomRows; i++) {
    for(let j = 0; j < roomCols; j++) {
      // Temple
      if(rooms[i][j] === 0) {
        queue.push([i, j])
      }
    }
  }
  searchFromTemple(rooms, queue, visited)
  return rooms
};

var searchFromTemple = function(rooms, queue) {
  const roomRows = rooms.length, roomCols = rooms[0].length
  while(queue.length) {
    const curTemple = queue.shift()
    for(let i = 0; i < 4; i++) {
      const nextX = curTemple[0] + adj[i][0]
      const nextY = curTemple[1] + adj[i][1]
      if(nextX < 0 || nextX >= roomRows || nextY < 0 || nextY >= roomCols || rooms[nextX][nextY] === -1) continue
      
      if(rooms[nextX][nextY] === 2147483647) {
        rooms[nextX][nextY] = rooms[curTemple[0]][curTemple[1]] + 1
        queue.push([nextX, nextY])
      }
    }
  }
}
*/

/*
Problem 1:
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

[
  ["x","x","0","0","0"],
  ["x","x","0","0","0"],
  ["0","0","x","0","0"],
  ["0","0","0","x","x"]
]
https://leetcode.com/problems/number-of-islands
*/

var numIslands = function(grid) {
  const rows = grid.length, cols = grid[0].length  
  let res = 0
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if(grid[i][j] === "1") {
        dfs(grid, i, j) 
        res++
      }
    }
  }
  return res
};
var adj = [[0, 1], [1, 0], [0, -1], [-1, 0]]

var dfs = function(grid, i, j) {
  const rows = grid.length, cols = grid[0].length
  grid[i][j] = 'x'
  for(let k = 0; k < 4; k++) {
    const nextX = i + adj[k][0]
    const nextY = j + adj[k][1]
    if(nextX < 0 || nextX >= rows || nextY >= cols || nextY < 0) continue
    if(grid[nextX][nextY] === "1") {
      dfs(grid, nextX, nextY)
    }
  }
}

var bfs = function(grid, i, j) {
  const rows = grid.length, cols = grid[0].length
  const queue = []
  queue.push([i,j])
  grid[i][j] = 'x'
  while(queue.length) {
    const cur = queue.shift()
    for(let k = 0; k < 4; k++) {
      const nextX = cur[0] + adj[k][0]
      const nextY = cur[1] + adj[k][1]
      if(nextX < 0 || nextX >= rows || nextY >= cols || nextY < 0) continue
      
      if(grid[nextX][nextY] === "1") {
        grid[nextX][nextY] = 'x'
        queue.push([nextX, nextY])
      }
    }  
  }
}

// console.log(numIslands([
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]))
// console.log(numIslands([
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]))

/*
https://leetcode.com/problems/rotting-oranges/

grid = [[2,1,1],[1,1,0],[0,1,1]]
*/

var orangesRotting = function(grid) {
  const queue = []
  const rows = grid.length, cols = grid[0].length
  const visited = Array.from(Array(rows), () => new Array(cols).fill(-1))
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if(grid[i][j] === 2) {
        visited[i][j] = 0
        queue.push([i, j])
      }
    }
  }
  bfsOrange(grid, queue, visited)

  let res = 0;
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if(grid[i][j] > 0) {
        if (visited[i][j] === -1) {
          return -1
        }
        res = Math.max(res, visited[i][j])
      }
    }
  }
  return res
};

var bfsOrange = function(grid, queue, visited) {
  const rows = grid.length, cols = grid[0].length
  while(queue.length) {
    const cur = queue.shift()
    for(let i = 0; i < 4; i++) {
      const nextX = cur[0] + adj[i][0]
      const nextY = cur[1] + adj[i][1]
      if(nextX < 0 || nextX >= rows || nextY < 0 || nextY >= cols) continue
      
      if(grid[nextX][nextY] === 1 && visited[nextX][nextY] === -1) {
        visited[nextX][nextY] = visited[cur[0]][cur[1]] + 1
        queue.push([nextX, nextY])
      }
    }
  }
}

console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]))
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]))
console.log(orangesRotting([[0,2]]))


var uniquePaths = function(m, n) {
  const grid = Array.from(Array(m), () => new Array(n).fill(0))
  const queue = [[0,0]]
  grid[0][0] = 1
  bfs(grid, queue, m, n)
  return grid[m-1][n-1]
};

const adj = [[0, 1], [1, 0]]
var bfs = function(grid, queue, m, n, obstacleGrid) {
  while(queue.length) {
    const cur = queue.shift()
    for(let i = 0; i < 2; i++) {
      const nextX = cur[0] + adj[i][0]
      const nextY = cur[1] + adj[i][1]
      if(nextX < 0 || nextX >= m || nextY < 0 || nextY >= n) continue
      if(obstacleGrid[nextX][nextY]) continue
      if(grid[nextX][nextY] === 0) {
        queue.push([nextX, nextY])  
      }
      grid[nextX][nextY] += grid[cur[0]][cur[1]]
    }
  }
}

var uniquePathsWithObstacles = function(obstacleGrid) {
  if(obstacleGrid[0][0] === 1) return 0
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  const grid = Array.from(Array(m), () => new Array(n).fill(0))
  const queue = [[0,0]]
  grid[0][0] = 1
  bfs(grid, queue, m, n, obstacleGrid)
  return grid[m-1][n-1]
};

// console.log(uniquePaths(3, 7))
console.log(uniquePathsWithObstacles([[0,0,0],[0,1,0],[0,0,0]]))
console.log(uniquePathsWithObstacles([[0,1],[0,0]]))