import {describe, it, expect} from 'vitest'
import size from './size.js'

describe('size', () => {
  it('null', () => {
    expect(size(null)).toBe(0)
  })

  it('undefined', () => {
    expect(size(undefined)).toBe(0)
  })

  it('arrays', () => {
    expect(size([])).toBe(0)
    expect(size([1])).toBe(1)
    expect(size([1, 2])).toBe(2)
    expect(size([1, 2, 3])).toBe(3)
  })

  it('objects', () => {
    expect(size({})).toBe(0)
    expect(size({a: 1})).toBe(1)
    expect(size({a: 1, b: 2})).toBe(2)
    expect(size({a: 1, b: 2, c: 3})).toBe(3)
  })

  it('strings', () => {
    expect(size('')).toBe(0)
    expect(size('a')).toBe(1)
    expect(size('ab')).toBe(2)
    expect(size('hello')).toBe(5)
  })

  it('sets', () => {
    expect(size(new Set([]))).toBe(0)
    expect(size(new Set([1]))).toBe(1)
    expect(size(new Set([1, 2]))).toBe(2)
    expect(size(new Set([1, 2, 3]))).toBe(3)
  })

  it('maps', () => {
    expect(size(new Map([]))).toBe(0)
    expect(size(new Map([[1, 2]]))).toBe(1)
    expect(
      size(
        new Map([
          [1, 2],
          [3, 4],
        ]),
      ),
    ).toBe(2)
    expect(
      size(
        new Map([
          [1, 2],
          [3, 4],
          [5, 6],
        ]),
      ),
    ).toBe(3)
  })

  it('unsupported', () => {
    expect(size(new Date())).toBe(0)
    expect(size(/hello/)).toBe(0)
  })
})
