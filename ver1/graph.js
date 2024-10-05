// https://leetcode.com/problems/find-if-path-exists-in-graph/
// class Graph {
//   constructor(n, edges) {
//     this.nodes = edges.map(edge => new Node())
    
//   }
// }

// class Node { 
//   constructor() {
    
//     // this.adj = [] // 1,2
//   }
// }

var search = function(nodes, visited, current) {
  visited[current] = true // [true, true]
  for(let i = 0; i < nodes[current].length; i++)  {
    let adjNode = nodes[current][i]
    if(!visited[adjNode]) {
      search(nodes, visited, adjNode)
    }
  }
}



var validPath = function(n, edges, source, destination) {
  let nodes = Array.from(Array(n), () => []); // [[],[],,]
  let visited = Array.from(Array(n), () => false);
  for(let i = 0; i < edges.length; i++) {
    nodes[edges[i][0]].push(edges[i][1])
    nodes[edges[i][1]].push(edges[i][0])
  }
  search(nodes, visited, source)
  return visited[destination]
  
  // adj = adj.map(x => {
  //   if()
  // })
  /*
  0: 1, 2
  1: 0
  2: 0
  3: 4, 5
  4: 3, 5
  5: 3, 4
  */
};

// console.log(validPath(3, [[0,1],[1,2],[2,0]], 0, 2))
console.log(validPath(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 2, 4));