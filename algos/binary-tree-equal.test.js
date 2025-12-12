import {describe, it, expect} from 'vitest'
import binaryTreeEqual from './binary-tree-equal.js'

const node = (val, left = null, right = null) => ({val, left, right})

describe('binaryTreeEqual', () => {
  it('returns true when both trees are empty', () => {
    expect(binaryTreeEqual(null, null)).toBe(true)
  })

  it('returns false when one tree is empty', () => {
    expect(binaryTreeEqual(node(1), null)).toBe(false)
    expect(binaryTreeEqual(null, node(1))).toBe(false)
  })

  it('handles single-node trees', () => {
    expect(binaryTreeEqual(node(5), node(5))).toBe(true)
    expect(binaryTreeEqual(node(5), node(6))).toBe(false)
  })

  it('returns true for matching multi-level trees', () => {
    const a = node(1, node(2, node(4), node(5)), node(3, node(6), node(7)))
    const b = node(1, node(2, node(4), node(5)), node(3, node(6), node(7)))
    expect(binaryTreeEqual(a, b)).toBe(true)
  })

  it('returns false when structure differs even with same values', () => {
    const a = node(1, node(2, node(4)), node(3))
    const b = node(1, node(2, null, node(4)), node(3))
    expect(binaryTreeEqual(a, b)).toBe(false)
  })

  it('returns false when a deep node value differs', () => {
    const a = node(1, node(2, node(4), node(5)), node(3))
    const b = node(1, node(2, node(4), node(6)), node(3))
    expect(binaryTreeEqual(a, b)).toBe(false)
  })

  it('detects swapped children as different trees', () => {
    const a = node(1, node(2), node(3))
    const b = node(1, node(3), node(2))
    expect(binaryTreeEqual(a, b)).toBe(false)
  })
})
