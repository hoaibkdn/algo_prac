'''
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

2: abc
3: def
4: ghi
5: jkl
6: mno
7: pqrs
8: tuv
9: wxyz

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Example 2:
Input: digits = ""
Output: []

Example 3:
Input: digits = "2"
Output: ["a","b","c"]

Constraints:
0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].

https://leetcode.com/problems/letter-combinations-of-a-phone-number/
'''

from typing import List

class Solution:
    def loopLetters(self, idx, digits, letters, tempC, result):
        if idx == len(digits): # chieu cao
            result.append(''.join(tempC))
            return
        for c in letters[digits[idx]]: # so nhanh, => time complexity: so nhanh mu voi chieu cao 
            tempC.append(c)
            self.loopLetters(idx + 1, digits, letters, tempC, result)
            tempC.pop()

    def letterCombinations(self, digits: str) -> List[str]:
        if not len(digits):
            return []
        letters = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz"
        }
        result = []
        tempC = []
        self.loopLetters(0, digits, letters, tempC, result)
        return result

s = Solution()
print(s.letterCombinations("23"))
print(s.letterCombinations(""))
print(s.letterCombinations("2"))