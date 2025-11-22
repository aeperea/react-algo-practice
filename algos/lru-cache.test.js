import {describe, it, expect} from 'vitest'
import {LRUCache} from './lru-cache.js'

describe('LRUCache', () => {
  it('returns -1 for missing key', () => {
    const cache = new LRUCache(2)
    expect(cache.get('missing')).toBe(-1)
  })

  it('put and get basic functionality', () => {
    const cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    expect(cache.get(1)).toBe(1)
    expect(cache.get(2)).toBe(2)
  })

  it('evicts least recently used when capacity exceeded', () => {
    const cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    // access 1 to make it most recently used
    expect(cache.get(1)).toBe(1)
    // add third entry -> should evict key 2
    cache.put(3, 3)
    expect(cache.get(2)).toBe(-1)
    expect(cache.get(3)).toBe(3)
  })

  it('updates existing key and marks it recently used', () => {
    const cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    cache.put(1, 10) // update value and make 1 most recent
    cache.put(3, 3) // should evict 2
    expect(cache.get(2)).toBe(-1)
    expect(cache.get(1)).toBe(10)
    expect(cache.get(3)).toBe(3)
  })

  it('defaults to capacity 10 when no capacity provided', () => {
    const cache = new LRUCache()
    for (let i = 0; i < 10; i++) cache.put(i, i)
    // adding one more should evict key 0
    cache.put(10, 10)
    expect(cache.get(0)).toBe(-1)
    expect(cache.get(10)).toBe(10)
  })
})
