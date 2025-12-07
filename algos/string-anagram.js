// Given two strings str1 and str2, determine if str2 is an anagram of str1 and return true if it is, and false otherwise.

// An anagram is a word or phrase formed by rearranging the letters of another word or phrase, using all the original letters exactly once. For example, the words listen and silent are anagrams because they use the same letters with the same frequency, but in a different order.

// easy solution with sort O(n log n)
export function isStringAnagramSort(str1, str2) {
  if (str1.length !== str2.length) return false;
  return str1.split('').sort().join('') === str2.split('').sort().join('')
}

// more detail solution O(n)
export function isStringAnagramHash(str1, str2) {
  if (str1.length !== str2.length) return false;
  const table = new Array(26).fill(0);

  // getting a frequency array for all chars in str1
  for (let i = 0; i < str1.length; i++) {
    table[str1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }

  // now we do the same for st2, but we do a --, if any elements hit negative values
  // it means that char is not present in str1
  for (let i = 0; i < str2.length; i++) {
    table[str2.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    if (table[str2.charCodeAt(i) - 'a'.charCodeAt(0)] < 0) {
      return false;
    }
  }
  return true;
}
