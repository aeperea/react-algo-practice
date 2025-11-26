import {describe, it, expect} from 'vitest'
import findDuplicates, {findDuplicatesTwo} from './find-duplicates.js'

describe('findDuplicates', () => {
  it('returns false for empty array', () => {
    expect(findDuplicates([])).toBe(false)
    expect(findDuplicatesTwo([])).toBe(false)
  })

  it('returns false when all values are unique', () => {
    expect(findDuplicates([1, 2, 3, 4, 5])).toBe(false)
    expect(findDuplicatesTwo([1, 2, 3, 4, 5])).toBe(false)
  })

  it('returns true when a duplicate exists', () => {
    const nums = [3, 2, 6, 5, 0, 3, 10, 3, 10, 5]
    expect(findDuplicates(nums)).toBe(true)
    expect(findDuplicatesTwo(nums)).toBe(true)
  })

  it('handles negatives and zero correctly', () => {
    expect(findDuplicates([0, -1, 2, -1])).toBe(true)
    expect(findDuplicatesTwo([0, -1, 2, -1])).toBe(true)
  })

  it('does not mutate the input array for findDuplicates', () => {
    const arr = [5, 3, 1, 4]
    const copy = arr.slice()
    findDuplicates(arr)
    expect(arr).toEqual(copy)
  })

  it('findDuplicatesTwo sorts in place (mutates input)', () => {
    const arr = [5, 3, 1, 4]
    const copy = arr.slice()
    // findDuplicatesTwo uses Array.prototype.sort() which mutates the array
    findDuplicatesTwo(arr)
    expect(arr).not.toEqual(copy)
  })
})
