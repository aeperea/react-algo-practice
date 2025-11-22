import {describe, it, expect} from 'vitest';
import groupAnagrams from './group-anagrams.js';

describe('groupAnagrams', () => {
  function normalize(groups) {
    return groups
      .map(g => g.slice().sort())
      .sort((a, b) => (a[0] || '').localeCompare(b[0] || ''));
  }

  it('returns empty array for empty input', () => {
    expect(groupAnagrams([])).toEqual([]);
  });

  it('groups anagrams correctly', () => {
    const input = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const expected = [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']];
    expect(normalize(groupAnagrams(input))).toEqual(normalize(expected));
  });

  it('handles duplicates', () => {
    const input = ['a', 'b', 'a'];
    const expected = [['a', 'a'], ['b']];
    expect(normalize(groupAnagrams(input))).toEqual(normalize(expected));
  });

  it('does not mutate the input array', () => {
    const input = ['ab', 'ba'];
    const copy = [...input];
    groupAnagrams(input);
    expect(input).toEqual(copy);
  });

  it('handles a single word', () => {
    expect(normalize(groupAnagrams(['abc']))).toEqual(normalize([['abc']]));
  });
});
