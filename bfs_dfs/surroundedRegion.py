def beautyPrint(board):
    for x in board:
        print(x)

class Solution:
    roundP = [[0, 1], [1, 0], [-1, 0], [0, -1]] 
    def isBorder(self, x, y, board):
        if x == 0 or y == 0 or x == (len(board) - 1) or y == (len(board[0]) - 1):
            return True
        return False
    
    def bfs2(self, i, j, visited, board):
        queue = []
        valid = []
        isValidPath = True
        
        # proceed when (i, j) = O and not on border
        if not self.isBorder(i, j, board) and not visited[i][j] and board[i][j] == 'O':
            valid.append([i, j])
            queue.append([i, j])
            visited[i][j] = 1

        while queue:
            cell = queue.pop()
            for k in self.roundP:
                nextX = cell[0] + k[0]
                nextY = cell[1] + k[1]
                if nextX < 0 or nextY < 0 or nextX >= len(board) or nextY >= len(board[0]):
                    continue
                if self.isBorder(nextX, nextY, board) and board[nextX][nextY] == 'O':
                    visited[nextX][nextY] = 1
                    isValidPath = False
                    
                if not self.isBorder(nextX, nextY, board) and not visited[nextX][nextY] and board[nextX][nextY] == 'O':
                    queue.append([nextX, nextY])
                    visited[nextX][nextY] = 1
                    valid.append([nextX, nextY])
                    continue
                

        if isValidPath:
            return valid
        return []

    def bfs(self, i, j, board):
        queue = []
        if board[i][j] == 'O':
            board[i][j] = 'Y'
            queue.append([i, j])
        while queue:
            cell = queue.pop()
            for k in self.roundP:
                nextX = cell[0] + k[0]
                nextY = cell[1] + k[1]
                if nextX < 0 or nextY < 0 or nextX >= len(board) or nextY >= len(board[0]):
                    continue
                if board[nextX][nextY] == 'O':
                    board[nextX][nextY] = 'Y'
                    queue.append([nextX, nextY])
        
            
    def solve2(self, board):
        visited = [[0 for col in range(len(board[0]))] for row in range(len(board))]
        arrValid = []
        for i in range(len(board)):
            for j in range(len(board[0])):
                res = self.bfs2(i, j, visited, board)
                arrValid += res
        
        for p in arrValid:
            board[p[0]][p[1]] = 'X'

            
    def solve(self, board):
        # [0, j], [i, 0], [n-1, j], [i, m-1]
        for i in range(len(board)):
            for j in range(len(board[0])):
                if self.isBorder(i, j, board):
                    self.bfs(i, j, board)
                    
        for i in range(len(board)):
            for j in range(len(board[0])):
                if board[i][j] == 'Y':
                    board[i][j] = 'O'
                elif board[i][j] == 'O':
                    board[i][j] = 'X'
                    
s = Solution()

board = [
    ["X","O","X","O","O","O","O"],
    ["X","O","X","O","O","O","O"],
    ["X","O","X","X","X","X","O"],
    ["X","X","X","O","X","O","X"],
    ["O","X","X","O","X","O","O"],
    ["O","O","X","X","X","O","O"],
    ["O","X","O","O","O","O","O"]
]


# DPT bfs: so canh + m x n => 4 canh
# do co visited => xet only m x n node
s.solve(board)
beautyPrint(board)