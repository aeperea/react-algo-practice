import {describe, it, expect} from 'vitest';
import parenthesisParsing from './parenthesis-parsing.js';

describe('parenthesisParsing', () => {
  it('returns false for empty string', () => {
    expect(parenthesisParsing('')).toBe(false)
  });

  it('returns true for strings with parentheses that are immediately closing', () => {
    expect(parenthesisParsing('()')).toBe(true)
    expect(parenthesisParsing('[]')).toBe(true)
    expect(parenthesisParsing('{}')).toBe(true)
    expect(parenthesisParsing('()[]{}')).toBe(true)
    expect(parenthesisParsing('([{}])')).toBe(true)
  });

  it('return false for strings not the correct parenthesis match', () => {
    expect(parenthesisParsing('([)]')).toBe(false);
    expect(parenthesisParsing(']][[')).toBe(false);
    expect(parenthesisParsing('()([(]))')).toBe(false);
    expect(parenthesisParsing('[(]{()])')).toBe(false);
  });

  it('returns false for strings with characters that are not parenthesis', () => {
    expect(parenthesisParsing('abc')).toBe(false)
    expect(parenthesisParsing('123')).toBe(false)
    expect(parenthesisParsing('a1b2c3')).toBe(false)
    expect(parenthesisParsing('a()1b2c3')).toBe(false)
  });
});
