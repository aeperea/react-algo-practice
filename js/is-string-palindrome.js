export default function isStringPalindrome(str) {
  const cleanString = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  let j = cleanString.length - 1;
  const midIndex = Math.ceil(cleanString.length/2);
  for(let i = 0; i < midIndex; i++) {
    if (cleanString[i] !== cleanString[j]) {
      return false;
    }
    j--;
  }
  return true;
}

function isStringPalindromeTwo(str) {
  const cleanString = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const reversedString = cleanString.split('').reverse().join('');
  return cleanString === reversedString;
}
