/**
 * https://leetcode.com/problems/number-of-1-bits/description/
 *
 * Given a positive integer n, write a function that returns the number of
 * set bits in its binary representation (also known as the Hamming weight).
 *
 * Example 1:
 * Input: n = 11
 * Output: 3
 * Explanation: The input binary string 1011 has a total of three set bits.
 * 1011 = 2^0 + 2^1 + 2^3 = 1 + 2 + 8 = 11
 *
 * 11/2 = 5 d 1
 * 5/2 = 2 d 1
 * 2/2 = 1 d 0
 * 1/2 = 0 d 1
 *
 * Example 2:
 * Input: n = 128
 * Output: 1
 * Explanation: The input binary string 10000000 has a total of one set bit.
 *
 * Example 3:
 * Input: n = 2147483645
 * Output: 30
 * Explanation: The input binary string 1111111111111111111111111111101 has a total of thirty set bits.
 *
 * Constraints:
 * 1 <= n <= 2^31 - 1
 *
 * Follow up: If this function is called many times, how would you optimize it?
 *
 * 1111111111111111111111111011101 = x
 * 0000000000000000000000000100000
 * 0000000000000000000000000000000 = y
 *
 * // Phep đẩy bit, 1 đẩy 5 lan = 2^5
 * if (x & (1<<5)) {
 *     bit 5 is set
 * } else {
 *     bit 5 is not set
 * }
 *
 * @format
 */

var hammingWeight = function (n) {
  let count = 0;
  while (n > 0) {
    if (n % 2 === 1) {
      count++;
    }
    n = n >> 1;
  }
  return count;
};

console.log(hammingWeight(2147483645));

/*
1010000101 << 2 = 101000010100
1010000101 << 1 = 10100001010
1 << 5 = 100000
(x * 4) <<< (x << 2)

1010000101 >> 2 = 10100001
(x / 2) <<< (x >> 1)
*/

/*
Given two binary strings a and b, return their sum as a binary string.

Example 1:
Input: a = "11", b = "1"
Output: "100"

Example 2:
Input: a = "1010", b = "1011"
Output: "10101"

Constraints:
1 <= a.length, b.length <= 10^4
a and b consist only of '0' or '1' characters.
Each string does not contain leading zeros except for the zero itself.

https://leetcode.com/problems/add-binary/
*/

var addBinary = function (a, b) {
  let i = a.length - 1,
    j = b.length - 1;
  let sum = '',
    temp = 0;
  while (i >= 0 || j >= 0) {
    const numAI = Number(a.charAt(i)) ?? 0;
    const numBJ = Number(b.charAt(j)) ?? 0;
    let tempSum = numAI + numBJ + temp;
    sum = String(tempSum % 2) + sum;
    temp = tempSum >> 1;
    i--;
    j--;
  }
  if (temp > 0) sum = String(temp) + sum;
  return sum;
};
console.log(addBinary('11', '1'));
console.log(addBinary('1010', '1011'));

/*
Reverse bits of a given 32 bits unsigned integer. // unsigned la so k dau

Note:
Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output 
will be given as a signed integer type. They should not affect your implementation, as the integer's internal 
binary representation is the same, whether it is signed or unsigned.
In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2 above, 
the input represents the signed integer -3 and the output represents the signed integer -1073741825.

Example 1:
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, 
so return 964176192 which its binary representation is 00111001011110000010100101000000.

Example 2:
Input: n = 11111111111111111111111111111101
Output:    3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293,  
so return 3221225471 which its binary representation is 10111111111111111111111111111111.
 
Constraints:
The input must be a binary string of length 32

*/

var binaryRep = function (n) {
  let res = '';
  for (let i = 31; i >= 0; i--) {
    if (n & (1 << i)) {
      res += '1';
    } else {
      res += '0';
    }
  }
  console.log(res);
};

/*
11111111 = 2^9 - 1 = 511

00000000 = 0
00000001 = 1
...
01111111 = 255
10000000 = -256
10000001 = -255
...
11111101 = -3
11111110 = -2
11111111 = -1

11111101 = -3
11111110 = -2

-256 to 255

https://leetcode.com/problems/reverse-bits
*/

var reverseBits = function (n) {
  let bitsN = '';
  while (n > 0) {
    bitsN += String(n % 2); // n&1
    n = Math.floor(n / 2); // 0101
  }
  while (bitsN.length < 32) {
    bitsN += '0';
  }
  let i = 0,
    res = 0;
  while (i < bitsN.length) {
    res += Number(bitsN.charAt(i)) * Math.pow(2, 31 - i);
    i++;
  }
  return res;

  /*
    res = 0
    for (i = 0 -> 31) {
        if (bit[i] set) {
            res += 1<<(31-i)
        }
    }
    */
};
console.log(reverseBits(43261596));
console.log(reverseBits(4294967293));
let num = 43261596;
let bitN = num.toString(2);

console.log(bitN);
console.log(bitN.padStart(32, '0'));
