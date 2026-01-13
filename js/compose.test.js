import {describe, it, expect} from 'vitest'
import compose from './compose';

const identity = (x) => x;
const double = (x) => x * 2;
const square = (x) => x * x;

describe('compose', () => {
  it('returns a function', () => {
    const composed = compose(identity);
    expect(typeof composed).toBe('function');
  });

  it('no functions', () => {
    const composed = compose();
    expect(composed(42)).toBe(42);
  });

  describe('only one function', () => {
    it('identity', () => {
      const composed = compose(identity);
      expect(composed(42)).toBe(42);
    });

    it('double', () => {
      const composed = compose(double);
      expect(composed(42)).toBe(84);
    });
  });

  describe('two functions', () => {
    it('identity', () => {
      const composed = compose(identity, identity);
      expect(composed(42)).toBe(42);
    });

    it('mixture', () => {
      const composed = compose(square, double);
      expect(composed(4)).toBe(64);
    });
  });

  describe('multiple functions', () => {
    it('identity', () => {
      const composed = compose(identity, identity, identity);
      expect(composed(42)).toBe(42);
    });

    it('mixture', () => {
      const composed = compose(square, identity, square, double, identity);
      expect(composed(3)).toBe(1296);
    });
  });
});
