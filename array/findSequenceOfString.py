'''
https://leetcode.com/problems/find-the-sequence-of-strings-appeared-on-the-screen/

You are given a string target.

Alice is going to type target on her computer using a special keyboard that has only two keys:

Key 1 appends the character "a" to the string on the screen.
Key 2 changes the last character of the string on the screen to its next character in the English alphabet. For example, "c" changes to "d" and "z" changes to "a".
Note that initially there is an empty string "" on the screen, so she can only press key 1.

Return a list of all strings that appear on the screen as Alice types target, in the order they appear, using the minimum key presses.

 

Example 1:

Input: target = "abc"

Output: ["a","aa","ab","aba","abb","abc"]

Explanation:

The sequence of key presses done by Alice are:

Press key 1, and the string on the screen becomes "a".
Press key 1, and the string on the screen becomes "aa".
Press key 2, and the string on the screen becomes "ab".
Press key 1, and the string on the screen becomes "aba".
Press key 2, and the string on the screen becomes "abb".
Press key 2, and the string on the screen becomes "abc".
Example 2:

Input: target = "he"

Output: ["a","b","c","d","e","f","g","h","ha","hb","hc","hd","he"]
'''

alp = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
class Solution:
    def stringSequence(self, target: str) -> List[str]:
        if not target:
            return []
        res = []
        temp = 'a'
        i = 0
        while temp != target: 
            if temp[i] != target[i]:
                res.append(temp)
                lastChIdx =  alp.index(temp[i])
                temp = temp[0:len(temp) - 1]
                temp += alp[lastChIdx + 1]
            else:
                res.append(temp)
                i += 1
                temp += 'a'

        res.append(target)
        return res
