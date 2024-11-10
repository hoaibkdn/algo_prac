/** @format */
/*
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a 
sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:
- Every adjacent pair of words differs by a single letter.
- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
- sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in 
the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

6: [0]
hot: [dot, lot]
dot: [hot, dog, lot]
dog: [dot, log, cog]
cog: [dog, log]

bfs: q[6], dist[6] = 0, dist[i] = inf
while(q) {
    cur = q.pop()
    if(dist[i] === inf) {
        q.push(i)
        dist[i] = dist[cur] + 1
    }
}
if(dist[endWordIdx] === inf) return 0
return dist[endWordIdx]

Example 1:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.

Example 2:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

Constraints:
1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the words in wordList are unique.

https://leetcode.com/problems/word-ladder/
*/

var isTransformable = function (w1, w2) {
  let countErr = 0;
  for (let i = 0; i < w1.length; i++) {
    if (w1.charAt(i) !== w2.charAt(i)) {
      countErr++;
    }
    if (countErr >= 2) {
      return false;
    }
  }
  return countErr === 1;
};
var convertWordList = function (beginWord, endWord, wordList) {
  const objWords = {};
  const idxBegin = wordList.indexOf(beginWord);
  if (idxBegin < 0) wordList.push(beginWord);
  for (let i = 0; i < wordList.length; i++) {
    if (!objWords[i]) objWords[i] = [];
    for (let j = 0; j < wordList.length; j++) {
      if (i !== j && isTransformable(wordList[i], wordList[j])) {
        objWords[i].push(j);
      }
    }
  }
  return objWords;
};
const MAX_VAL = 1000000;
var bfs = function (beginWord, endWord, wordList, objWords) {
  const queue = [];
  const dist = Array(wordList.length).fill(MAX_VAL);
  const idxBegin = wordList.indexOf(beginWord);
  const idxEnd = wordList.indexOf(endWord);
  queue.push(idxBegin);
  dist[idxBegin] = 1;
  while (queue.length) {
    const cur = queue.shift();
    const allMatched = objWords[cur];
    for (let k = 0; k < allMatched.length; k++) {
      // so canh cua 1 dinh, toi da co n*n canh: so dinh + n*n canh
      if (dist[allMatched[k]] === MAX_VAL) {
        queue.push(allMatched[k]);
        dist[allMatched[k]] = dist[cur] + 1;
      }
    }
  }
  if (dist[idxEnd] === MAX_VAL) return 0;
  return dist[idxEnd];
};

var ladderLength = function (beginWord, endWord, wordList) {
  if (wordList.indexOf(endWord) < 0) return 0;
  const objWords = convertWordList(beginWord, endWord, wordList); // O(n^2 * m)
  return bfs(beginWord, endWord, wordList, objWords);
}; // O(n^2 * m)
