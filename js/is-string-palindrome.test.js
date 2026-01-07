import {describe, it, expect} from 'vitest';
import isStringPalindrome from './is-string-palindrome.js';

describe('isStringPalindrome', () => {
  it('returns true for empty string', () => {
    expect(isStringPalindrome('')).toBe(true);
  });

  it('returns true for single character', () => {
    expect(isStringPalindrome('a')).toBe(true);
    expect(isStringPalindrome('Z')).toBe(true);
    expect(isStringPalindrome('5')).toBe(true);
  });

  it('returns true for simple palindromes', () => {
    expect(isStringPalindrome('aba')).toBe(true);
    expect(isStringPalindrome('racecar')).toBe(true);
    expect(isStringPalindrome('madam')).toBe(true);
  });

  it('returns false for non-palindromes', () => {
    expect(isStringPalindrome('hello')).toBe(false);
    expect(isStringPalindrome('world')).toBe(false);
    expect(isStringPalindrome('abc')).toBe(false);
  });

  it('handles case insensitivity', () => {
    expect(isStringPalindrome('Aba')).toBe(true);
    expect(isStringPalindrome('RaceCar')).toBe(true);
    expect(isStringPalindrome('MadAm')).toBe(true);
  });

  it('removes non-alphanumeric characters - example 1', () => {
    expect(isStringPalindrome('No \'x\' in Nixon')).toBe(true);
  });

  it('removes non-alphanumeric characters - example 2', () => {
    expect(isStringPalindrome('Was it a car or a cat I saw?')).toBe(true);
  });

  it('removes non-alphanumeric characters - example 3', () => {
    expect(isStringPalindrome('tab a cat')).toBe(false);
  });

  it('handles strings with only special characters', () => {
    expect(isStringPalindrome('!!!')).toBe(true);
    expect(isStringPalindrome('   ')).toBe(true);
    expect(isStringPalindrome('.,;')).toBe(true);
  });

  it('handles alphanumeric palindromes', () => {
    expect(isStringPalindrome('A1B2B1A')).toBe(true);
    expect(isStringPalindrome('1a2b2a1')).toBe(true);
  });

  it('handles mixed case with special characters', () => {
    expect(isStringPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    expect(isStringPalindrome('race a car')).toBe(false);
  });

  it('handles numeric palindromes', () => {
    expect(isStringPalindrome('12321')).toBe(true);
    expect(isStringPalindrome('12345')).toBe(false);
  });

  it('handles long palindromes', () => {
    const longPalindrome = 'a'.repeat(1000) + 'b' + 'a'.repeat(1000);
    expect(isStringPalindrome(longPalindrome)).toBe(true);
  });

  it('does not mutate input string', () => {
    const str = 'Hello, World!';
    const copy = str;
    isStringPalindrome(str);
    expect(str).toBe(copy);
  });
});
