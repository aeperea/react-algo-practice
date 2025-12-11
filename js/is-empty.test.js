import {describe, it, expect} from 'vitest'
import isEmpty from './is-empty';

describe('isEmpty', () => {
  it('empty values', () => {
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(1)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty(/x/)).toBe(true);
    expect(isEmpty(Symbol('x'))).toBe(true);
  });

  describe('strings', () => {
    it('empty string', () => {
      expect(isEmpty('')).toBe(true);
    });

    it('non-empty string', () => {
      expect(isEmpty('a')).toBe(false);
    });
  });

  describe('objects', () => {
    it('empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('non-empty object', () => {
      expect(isEmpty({a: 0})).toBe(false);
    });

    it('object that has a `length` property', () => {
      expect(isEmpty({length: 0})).toBe(false);
    });

    it('objects with negative lengths', function () {
      function Foo() {}
      Foo.prototype.length = -1;

      expect(isEmpty(new (Foo)())).toBe(true);
    });

    it('non-number lengths', function () {
      expect(isEmpty({length: '0'})).toBe(false);
    });
  });

  describe('maps', function () {
    it('empty map', () => {
      const map = new Map();
      expect(isEmpty(map)).toBe(true);
    });

    it('non-empty map', () => {
      const map = new Map([['a', 1]]);
      expect(isEmpty(map)).toBe(false);
    });
  });

  describe('sets', function () {
    it('empty set', () => {
      const set = new Set();
      expect(isEmpty(set)).toBe(true);
    });

    it('non-empty set', () => {
      const set = new Set([1]);
      expect(isEmpty(set)).toBe(false);
    });
  });

  describe('arrays', () => {
    it('empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('non-empty array', () => {
      expect(isEmpty([1])).toBe(false);
    });
  });
});
