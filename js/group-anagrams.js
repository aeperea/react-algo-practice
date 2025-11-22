export default function groupAnagrams(strs) {
  // intput: ["eat","tea","tan","ate","nat","bat"]
  // output: [["eat","tea","ate"],["tan","nat"],["bat"]]

  const map = new Map();

  for (const s of strs) {
    const key = s.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(s);
  }

  return Array.from(map.values());
}
