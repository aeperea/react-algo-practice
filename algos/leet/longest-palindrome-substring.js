// Given a string s, return the longest in s.

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

// Example 2:

// Input: s = "cbbd"
// Output: "bb"

const isPalindrome = (s) => {
  for (let i = 0; i < s.length/2; i++) {
    if (s[i] != s[s.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

function longestPalindromeSubstring(s) {
  const left = 0;
  const response = '';

  for (let right = 0; right < s.length; right++) {

  }


}

const s = 'babad';
console.log(longestPalindromeSubstring(s));
