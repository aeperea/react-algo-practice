import {describe, it, expect} from 'vitest'
import optimalStockTrading from './optimal-difference.js'

describe('optimalStockTrading', () => {
  it('returns 0 for empty array', () => {
    expect(optimalStockTrading([])).toBe(0)
  })

  it('returns 0 for single price', () => {
    expect(optimalStockTrading([5])).toBe(0)
  })

  it('returns 0 when prices only decrease', () => {
    expect(optimalStockTrading([10, 8, 6, 4, 2, 1])).toBe(0)
  })

  it('returns maximum profit for simple increasing prices', () => {
    expect(optimalStockTrading([1, 2, 3, 4, 5])).toBe(4)
  })

  it('finds best buy and sell days in mixed prices', () => {
    expect(optimalStockTrading([7, 1, 5, 3, 6, 4])).toBe(5) // buy at 1, sell at 6
  })

  it('handles example with profit at end', () => {
    expect(optimalStockTrading([2, 4, 1, 7, 5, 11])).toBe(10) // buy at 1, sell at 11
  })

  it('returns profit when best opportunity is early', () => {
    expect(optimalStockTrading([5, 10, 3, 2, 1])).toBe(5) // buy at 5, sell at 10
  })

  it('handles all same prices', () => {
    expect(optimalStockTrading([5, 5, 5, 5, 5])).toBe(0)
  })

  it('handles large array with many elements', () => {
    const prices = Array.from({length: 1000}, (_, i) => Math.sin(i) * 1000 + 5000)
    const result = optimalStockTrading(prices)
    expect(result).toBeGreaterThanOrEqual(0)
    expect(typeof result).toBe('number')
  })

  it('handles large array with 10000 elements', () => {
    const prices = Array.from({length: 10000}, (_, i) => i % 100)
    const result = optimalStockTrading(prices)
    expect(result).toBe(99) // best profit is buying at 0, selling at 99
  })

  it('handles large monotonically increasing array', () => {
    const prices = Array.from({length: 1000}, (_, i) => i)
    expect(optimalStockTrading(prices)).toBe(999) // buy at 0, sell at 999
  })

  it('handles large monotonically decreasing array', () => {
    const prices = Array.from({length: 1000}, (_, i) => 1000 - i)
    expect(optimalStockTrading(prices)).toBe(0)
  })

  it('handles array with negative prices (edge case)', () => {
    expect(optimalStockTrading([-5, -2, -8, -1])).toBe(7) // buy at -8, sell at -1
  })

  it('handles mixed positive and negative prices', () => {
    expect(optimalStockTrading([-10, 5, 15, -3, 20])).toBe(30) // buy at -10, sell at 20
  })

  it('does not mutate input array', () => {
    const prices = [7, 1, 5, 3, 6, 4]
    const copy = [...prices]
    optimalStockTrading(prices)
    expect(prices).toEqual(copy)
  })
})
