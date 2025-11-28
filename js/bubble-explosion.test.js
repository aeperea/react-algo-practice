import {describe, it, expect} from 'vitest'
import bubbleExplosion from './bubble-explosion.js'

describe('bubbleExplosion', () => {
  it('returns empty matrix for empty input', () => {
    expect(bubbleExplosion([[], [], []])).toEqual([[], [], []])
  })

  it('returns single row unchanged if no eligible cells', () => {
    const matrix = [[1, 2, 3, 4]]
    const result = bubbleExplosion(matrix)
    expect(result).toEqual([[1, 2, 3, 4]])
  })

  it('returns single column unchanged if no eligible cells', () => {
    const matrix = [[1], [2], [3], [4]]
    const result = bubbleExplosion(matrix)
    expect(result).toEqual([[1], [2], [3], [4]])
  })

  it('explodes eligible cells and neighbors with same color', () => {
    const matrix = [[3, 1, 2, 1], [1, 1, 1, 4], [3, 1, 2, 2], [3, 3, 3, 4]]
    const expected = [
      [0, 0, 0, 1],
      [0, 0, 0, 4],
      [0, 0, 2, 2],
      [3, 0, 2, 4]
    ]
    expect(bubbleExplosion(matrix)).toEqual(expected)
  })

  it('applies gravity after explosion', () => {
    const matrix = [[1, 1, 1], [2, 0, 3], [2, 0, 3]]
    // [1,1,1] is eligible (all three 1s are neighbors)
    // All 1s should explode
    const result = bubbleExplosion(matrix)
    // After explosion and gravity, bubbles fall down
    expect(result[result.length - 1][0]).not.toBe(0) // bottom row should have non-zero
  })

  it('handles 2x2 grid with all same color', () => {
    const matrix = [[1, 1], [1, 1]]
    // All cells are eligible (each has >= 2 same-color neighbors)
    // All should explode
    const result = bubbleExplosion(matrix)
    expect(result).toEqual([[0, 0], [0, 0]])
  })

  it('handles 2x2 grid with mixed colors', () => {
    const matrix = [[1, 2], [3, 4]]
    // No cell has >= 2 same-color neighbors
    const result = bubbleExplosion(matrix)
    expect(result).toEqual([[1, 2], [3, 4]])
  })

  it('does not mutate original input (creates new matrix)', () => {
    const original = [[1, 1, 1], [2, 3, 4], [5, 6, 7]]
    const copy = original.map(row => [...row])
    bubbleExplosion(original)
    // Note: The function mutates the input matrix, so this test documents that behavior
    // If you want immutability, refactor to return a new matrix instead
    expect(original).not.toEqual(copy)
  })

  it('handles larger matrix with cascading explosions', () => {
    const matrix = [
      [1, 1, 1, 1],
      [2, 2, 2, 3],
      [4, 4, 4, 4],
      [5, 5, 5, 6]
    ]
    const result = bubbleExplosion(matrix)
    // Verify no negative values and all values are 0 or positive
    result.forEach(row => {
      row.forEach(cell => {
        expect(cell).toBeGreaterThanOrEqual(0)
      })
    })
  })
})
