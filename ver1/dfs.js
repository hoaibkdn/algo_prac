/*
       0 1 2 3 4 5 6 7
a   = [8,7,3,5,1,9,6,3]
res = [-,0,1,1,3,-,5,6]
      []
      [8]
      [8,7]
      [8,7,3]
      [8,7,5]
      [8,7,5,1]
      [9]
      [9,6]
stack = [x,y,z,e]
e

//https://leetcode.com/problems/is-graph-bipartite/

1     5
2     6
3     7
4     8



// 2 colors: 0, 1

dfs(u):
  for v in adj[u]:
    if col[v] == -1:
      if col[v] == 0:
        col[u] = 1
      else:
        col[u] = 0
      if not dfs(v):
        return false
    else:
      if col[v] == col[u]:
        return false
  return true
    

fill(col, -1)

for i: 0 -> n-1:
  if not visited[i]:
    color[i] = 0
    dfs(i)


graph = [[1,2,3],[0,2],[0,1,3],[0,2]]

*/

var isBipartite = function(graph) {
  const colors = new Array(graph.length) // [,,,,,,]
  for(let i = 0; i < graph.length; i++) {
    if(!colors[i]) {
      colors[i] = 1
      if(!coloring(graph, colors, i)) {
        console.log(colors)
        return false
      }
    }
  }
  return true
};

var coloring = function(graph, colors, curIdx) {
  const adj = graph[curIdx] 
  for(let i = 0; i < adj.length; i++) {
    if(!colors[adj[i]]) {
      colors[adj[i]] = -colors[curIdx]
      if(!coloring(graph, colors, adj[i])) return false
    } else {
      if(colors[adj[i]] === colors[curIdx]) return false
    }
  }
  return true
}


console.log(isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]]))
console.log(isBipartite([[1,3],[0,2],[1,3],[0,2]]))


/*        x
1 -> 2 -> 3 -> 4 -> 2
          ^         |
          |         |
          -----------
- found that there is a cycle
- how to find the intersection?

k node not in cycle -> n node in cycle

- khi turtle gap x (di k buoc), hare cach turtle k buoc
- moi khi turtle len 1 buoc, hare len 2 buoc, nghia la hare rut ngan khoang cach voi turtle 1 buoc => turtle di them n-k thi gap nhau
- turtle di duoc k + n-k = n buoc, gap nhau o node cach head n buoc
- cho 1 node temp o head, cho temp va turtle di cung toc do, khi temp di duoc k buoc, turtle cung di k buoc, ma n + k = so node tren list => temp va turtle se nam cung 1 diem, chinh la diem x
=> return x


*/



// var getClosestHigherPosition = function(nums) {
//   const res = [], cur = []
//   for(let i = 0; i < nums.length; i++) {
//     while(cur.length > 0 && nums[cur[cur.length - 1]] <= nums[i]) {
//       cur.pop()
//     }
//     // cur.push()
//     if (cur.length > 0) {
//       res.push(cur[cur.length - 1])
//     } else {
//       res.push(-1)
//     }
//     cur.push(i)
//   }
//   return res
// }

// console.log(getClosestHigherPosition([8,7,3,5,1,9,6,3]))

