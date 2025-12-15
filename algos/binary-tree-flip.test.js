import {describe, it, expect} from 'vitest'
import binaryTreeFlip from './binary-tree-flip.js'
import binaryTreeEqual from './binary-tree-equal.js'

const node = (val, left = null, right = null) => ({val, left, right})

describe('binaryTreeFlip', () => {
  it('returns null for empty tree', () => {
    expect(binaryTreeFlip(null)).toBe(null)
  })

  it('returns the same single node when there are no children', () => {
    const root = node(1)
    const flipped = binaryTreeFlip(root)
    expect(flipped).toBe(root)
    expect(binaryTreeEqual(flipped, node(1))).toBe(true)
  })

  it('swaps left and right children on a simple tree', () => {
    const root = node(1, node(2), node(3))
    const expected = node(1, node(3), node(2))

    const flipped = binaryTreeFlip(root)
    expect(flipped).toBe(root)
    expect(binaryTreeEqual(flipped, expected)).toBe(true)
  })

  it('recursively flips deeper trees', () => {
    const root = node(1, node(2, node(4), node(5)), node(3, null, node(6)))
    const expected = node(1, node(3, node(6), null), node(2, node(5), node(4)))

    binaryTreeFlip(root)
    expect(binaryTreeEqual(root, expected)).toBe(true)
  })

  it('double flip restores the original structure', () => {
    const original = node(1, node(2, node(4), null), node(3, node(5), node(6)))
    const root = node(1, node(2, node(4), null), node(3, node(5), node(6)))

    binaryTreeFlip(root)
    binaryTreeFlip(root)

    expect(binaryTreeEqual(root, original)).toBe(true)
  })
})
