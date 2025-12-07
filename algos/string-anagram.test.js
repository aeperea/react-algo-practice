import {describe, it, expect} from 'vitest'
import {isStringAnagramSort, isStringAnagramHash} from './string-anagram.js'

describe('String Anagram Functions', () => {
  describe('isStringAnagramSort', () => {
    it('returns true for empty strings', () => {
      expect(isStringAnagramSort('', '')).toBe(true)
    })

    it('returns true for identical strings', () => {
      expect(isStringAnagramSort('abc', 'abc')).toBe(true)
    })

    it('returns true for anagrams', () => {
      expect(isStringAnagramSort('listen', 'silent')).toBe(true)
      expect(isStringAnagramSort('evil', 'live')).toBe(true)
      expect(isStringAnagramSort('abc', 'bca')).toBe(true)
    })

    it('returns false for different lengths', () => {
      expect(isStringAnagramSort('abc', 'ab')).toBe(false)
      expect(isStringAnagramSort('hello', 'hell')).toBe(false)
    })

    it('returns false for non-anagrams', () => {
      expect(isStringAnagramSort('hello', 'world')).toBe(false)
      expect(isStringAnagramSort('abc', 'def')).toBe(false)
    })

    it('handles single character', () => {
      expect(isStringAnagramSort('a', 'a')).toBe(true)
      expect(isStringAnagramSort('a', 'b')).toBe(false)
    })

    it('handles repeated characters', () => {
      expect(isStringAnagramSort('aab', 'aba')).toBe(true)
      expect(isStringAnagramSort('aaa', 'aab')).toBe(false)
    })

    it('handles large strings', () => {
      const str1 = 'abcdefghijklmnopqrstuvwxyz'
      const str2 = 'zyxwvutsrqponmlkjihgfedcba'
      expect(isStringAnagramSort(str1, str2)).toBe(true)
    })

    it('does not mutate input strings', () => {
      const str1 = 'listen'
      const str2 = 'silent'
      const copy1 = str1
      const copy2 = str2
      isStringAnagramSort(str1, str2)
      expect(str1).toBe(copy1)
      expect(str2).toBe(copy2)
    })
  })

  describe('isStringAnagramHash', () => {
    it('returns true for empty strings', () => {
      expect(isStringAnagramHash('', '')).toBe(true)
    })

    it('returns true for identical strings', () => {
      expect(isStringAnagramHash('abc', 'abc')).toBe(true)
    })

    it('returns true for anagrams', () => {
      expect(isStringAnagramHash('listen', 'silent')).toBe(true)
      expect(isStringAnagramHash('evil', 'live')).toBe(true)
      expect(isStringAnagramHash('abc', 'bca')).toBe(true)
    })

    it('returns false for different lengths', () => {
      expect(isStringAnagramHash('abc', 'ab')).toBe(false)
      expect(isStringAnagramHash('hello', 'hell')).toBe(false)
    })

    it('returns false for non-anagrams', () => {
      expect(isStringAnagramHash('hello', 'world')).toBe(false)
      expect(isStringAnagramHash('abc', 'def')).toBe(false)
    })

    it('handles single character', () => {
      expect(isStringAnagramHash('a', 'a')).toBe(true)
      expect(isStringAnagramHash('a', 'b')).toBe(false)
    })

    it('handles repeated characters', () => {
      expect(isStringAnagramHash('aab', 'aba')).toBe(true)
      expect(isStringAnagramHash('aaa', 'aab')).toBe(false)
    })

    it('handles large strings', () => {
      const str1 = 'abcdefghijklmnopqrstuvwxyz'
      const str2 = 'zyxwvutsrqponmlkjihgfedcba'
      expect(isStringAnagramHash(str1, str2)).toBe(true)
    })

    it('handles all same character', () => {
      expect(isStringAnagramHash('aaaa', 'aaaa')).toBe(true)
      expect(isStringAnagramHash('aaaa', 'aaab')).toBe(false)
    })
  })

  describe('Both functions consistency', () => {
    it('both return same result for various inputs', () => {
      const testCases = [
        ['', ''],
        ['a', 'a'],
        ['ab', 'ba'],
        ['listen', 'silent'],
        ['abc', 'def'],
        ['aaa', 'aab'],
      ]

      testCases.forEach(([str1, str2]) => {
        expect(isStringAnagramSort(str1, str2)).toBe(isStringAnagramHash(str1, str2))
      })
    })
  })
})
