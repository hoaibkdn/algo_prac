/**
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve
 * keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and
 * spellchecker.
 *
 * Implement the Trie class:
 *
 * Trie(): Initializes the trie object.
 * void insert(String word): Inserts the string word into the trie.
 * boolean search(String word): Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
 * boolean startsWith(String prefix): Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 *
 *
 * Example 1:
 * Input
 * ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * Output
 * [null, null, true, false, true, null, true]
 *
 * Explanation
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // return True
 * trie.search("app");     // return False
 * trie.startsWith("app"); // return True
 * trie.insert("app");
 * trie.search("app");     // return True
 *
 * Constraints:
 * 1 <= word.length, prefix.length <= 2000
 * word and prefix consist only of lowercase English letters.
 * At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.
 *
 * https://leetcode.com/problems/implement-trie-prefix-tree
 *
 * ap -> node2
 *
 * root children {'a': node1}, sumEnd = 3
 * |
 * (a)
 * |
 * node1 children {'p': node2}, sumEnd = 3
 * |
 * (p)
 * |
 * node2 children {'p': node3}, sumEnd = 2, isEnd = false
 * |
 * (p)
 * |
 * node3: children {'l': node4}, isEnd = true, sumEnd = 2
 * |
 * (l)
 * |
 * node4: children {'e': node5}, sumEnd = 1
 * |
 * (e)
 * |
 * node5: children {}, isEnd = true, sumEnd = 1
 *
 * node1
 * --------
 * school: 6
 * secret: 5
 * shit: 3
 * sweep: 2
 * space: 1
 *
 * node2
 * ----------
 * nanny: 8
 * ...
 *
 * root -> node1
 *      -> node2
 *
 * root
 * ---------
 * nanny: 8
 * school: 6
 * secret: 5
 * shit: 3
 * sweep: 2
 *
 * @format
 */

var TrieNode = function () {
  this.children = {}; // { 'a': Trie(), 'c': Trie() }
  this.isEnd = false;
};

var Trie = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  // app
  let curNode = this.root;
  for (let i = 0; i < word.length; i++) {
    const w = word.charAt(i);
    if (!curNode.children[w]) {
      curNode.children[w] = new TrieNode();
    }
    curNode = curNode.children[w];
  }
  curNode.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let curNode = this.root;
  for (let i = 0; i < word.length; i++) {
    const w = word.charAt(i);
    if (!curNode.children[w]) {
      return false;
    }
    curNode = curNode.children[w];
  }
  return curNode.isEnd;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let curNode = this.root;
  for (let i = 0; i < prefix.length; i++) {
    const w = prefix.charAt(i);
    if (!curNode.children[w]) {
      return false;
    }
    curNode = curNode.children[w];
  }
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

/*
Design a data structure that supports adding new words and finding if a string matches any previously 
added string.

Implement the WordDictionary class:

- WordDictionary(): Initializes the object.
- void addWord(word): Adds word to the data structure, it can be matched later.
- bool search(word): Returns true if there is any string in the data structure that matches word or 
false otherwise. word may contain dots '.' where dots can be matched with any letter.


Example:

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True


Constraints:
1 <= word.length <= 25
word in addWord consists of lowercase English letters.
word in search consist of '.' or lowercase English letters.
There will be at most 2 dots in word for search queries.
At most 10^4 calls will be made to addWord and search.

https://leetcode.com/problems/design-add-and-search-words-data-structure/
*/

var TrieNode = function () {
  this.children = {};
  this.isEnd = false;
};
var WordDictionary = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let curNode = this.root;
  for (let i = 0; i < word.length; i++) {
    const w = word.charAt(i);
    if (!curNode.children[w]) {
      curNode.children[w] = new TrieNode();
    }
    curNode = curNode.children[w];
  }
  curNode.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  function searchWord(i, curNode) {
    if (i === word.length) {
      return curNode.isEnd;
    }
    const w = word.charAt(i);
    if (w === '.') {
      const allChildrenKeys = Object.keys(curNode.children);
      for (let j = 0; j < allChildrenKeys.length; j++) {
        if (searchWord(i + 1, curNode.children[allChildrenKeys[j]])) {
          return true;
        }
      }
      return false;
    } else if (curNode.children[w]) {
      return searchWord(i + 1, curNode.children[w]);
    }
    return false;
  }
  return searchWord(0, this.root);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
