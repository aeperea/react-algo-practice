import {describe, it, expect} from 'vitest'
import totalSawtoothSubarrays from './total-sawtooth-subarrays.js'

describe('totalSawtoothSubarrays', () => {
  it('returns 0 for empty array', () => {
    expect(totalSawtoothSubarrays([])).toBe(0)
  })

  it('counts single element arrays as 1', () => {
    expect(totalSawtoothSubarrays([7])).toBe(1)
  })

  it('counts all subarrays for a fully alternating array', () => {
    // n = 4 -> total subarrays = 4*5/2 = 10
    expect(totalSawtoothSubarrays([1, 2, 1, 2])).toBe(10)
    expect(totalSawtoothSubarrays([0, 1, 0, -1])).toBe(10) // includes zero & negative odd
  })

  it('handles small mixed examples correctly', () => {
    expect(totalSawtoothSubarrays([1, 2, 3])).toBe(6) // all subarrays alternate
    expect(totalSawtoothSubarrays([1, 1])).toBe(2) // middle pair breaks alternation
    expect(totalSawtoothSubarrays([1, 1, 2])).toBe(4) // computed expected
  })

  it('handles a large alternating array (100 elements)', () => {
    const n = 100;
    const arr = Array.from({length: n}, (_, i) => (i % 2 === 0 ? 1 : 2));
    // fully alternating => all subarrays are sawtooth: n * (n + 1) / 2
    expect(totalSawtoothSubarrays(arr)).toBe((n * (n + 1)) / 2);
  })

  it('does not mutate the input array', () => {
    const arr = [1, 2, 1, 2]
    const copy = arr.slice()
    totalSawtoothSubarrays(arr)
    expect(arr).toEqual(copy)
  })
})
