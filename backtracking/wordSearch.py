'''
Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally 
or vertically neighboring. The same letter cell may not be used more than once.

state:
    i,j, board, idxW, visit
    
exit: 
   idxW === len(word)
   
   
   
branches:
- choose letter: i,j + ([1,0][0,1][-1,0][0,-1])
    i < n && j < m
    i >= 0 && j >= 0
    not visit[i][j]
    if letter === grid[i][j] idxW++, visit[i][j] = true
    
    
Example 1:
Input: board = [
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
], word = "ABCCED"
Output: true (0,0 -> 0,1 -> 0,2 -> 1,2 -> 2,2 -> 2,1) 

Example 2:
Input: board = [
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
], word = "SEE"
Output: true (1,3 -> 2,3 -> 2,2)

Example 3:
Input: board = [
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
], word = "ABCB"
Output: false
 
Constraints:
m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.

https://leetcode.com/problems/word-search
'''

loc = [[0,1], [1,0], [-1,0], [0,-1]]
class Solution2:
    def checkExisting(self, i, j, board, visit, word, indW):
        print(visit)
        if indW == len(word):
            return True
            
        for k in loc:
            x = k[0] + i
            y = k[1] + j
            if x < 0 or y < 0 or x >= len(board) or y >= len(board[0]): 
                continue
            if visit[x][y] == 0 and word[indW] == board[x][y]:
                visit[x][y] = 1
                res = self.checkExisting(x, y, board, visit, word, indW + 1)
                if res:
                    return True
                visit[x][y] = 0
            
        return False
            
    def exist(self, board, word):
        visit = [[0 for x in range(len(board[0]))] for y in range(len(board))] 
        for i in range(len(board)):
            for j in range(len(board[0])): 
                if board[i][j] == word[0]:
                    visit[i][j] = 1
                    res = self.checkExisting(i, j, board, visit, word, 1)
                    if res:
                        return True
                    visit[i][j] = 0
        return False
       
s2 = Solution2()
print(s2.exist([
    ["F","B","C","E"],
    ["S","B","C","S"],
    ["A","D","E","E"]
], "ABCCED"))