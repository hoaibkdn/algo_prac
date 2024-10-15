'''
https://leetcode.com/problems/n-queens-ii/
'''
class Solution:
    def checkBoard(self, i, n, column, mainDia, subDia):
        if i == n:
            self.res += 1
            return
        
        '''
          0 1 2 3
        0 1 0 0 0
        1 0 1 0 0
        2 0 0 1 0
        3 0 0 0 1
            
            i-j
            0
          0   0
        0   0   0
          0   0   
            0

				duong cheo chinh, dung 1 map or Set de luu gia trij i-j
				moi duong cheo chinh se co gia tri i-j tai ca diem k doi
				vi vay luu gia tri (i-j) trong 1 map la dai dien cho luon 1 duong cheo
				se co 2n-1 duong cheo chinh va 2n-1 duong cheo phu
        [0,0 1,1 2,2 3,3]
        [0,1 1,2 2,3]
        
        i -> i+1
        j -> j+1
        => i-j
        
        duong cheo phu se co gia tri i+j k doi tren 1 truc duong
        [0,3 1,2 2,1 3,0]
        [1,3 2,2 3,1]
        
        i -> i+1
        j -> j-1
        => i+j
        
        column = [0 0 1 0]
        '''
        
        for j in range(n):
            sumMain = i-j
            sumSub = i+j
            if not column[j] and sumMain not in mainDia and sumSub not in subDia:
                column[j] = 1
                mainDia.add(sumMain)
                subDia.add(sumSub)
                self.checkBoard(i+1, n, column, mainDia, subDia)
                column[j] = 0
                mainDia.remove(sumMain)
                subDia.remove(sumSub)
            
    def totalNQueens(self, n: int) -> int:
        self.res = 0
        column = [0 for x in range(n)]
        mainDia = set()
        subDia = set()
        self.checkBoard(0, n, column, mainDia, subDia)
        return self.res

    
        