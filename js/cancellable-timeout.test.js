import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import setCancellableTimeout from './cancellable-timeout.js'

describe('setCancellableTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('calls the callback after the given delay', () => {
    const fn = vi.fn()
    const cancel = setCancellableTimeout(fn, 100, 'x')
    expect(typeof cancel).toBe('function')
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('x')
  })

  it('cancel prevents the callback from being invoked', () => {
    const fn = vi.fn()
    const cancel = setCancellableTimeout(fn, 50)
    cancel()
    vi.advanceTimersByTime(100)
    expect(fn).not.toHaveBeenCalled()
  })

  it('cancel is safe to call multiple times and after execution', () => {
    const fn = vi.fn()
    const cancel = setCancellableTimeout(fn, 10)
    vi.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(1)
    // calling cancel after the timeout should not throw and shouldn't call again
    expect(() => cancel()).not.toThrow()
    vi.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('forwards extra arguments to the callback', () => {
    const fn = vi.fn()
    setCancellableTimeout(fn, 20, 1, 2, 3)
    vi.advanceTimersByTime(20)
    expect(fn).toHaveBeenCalledWith(1, 2, 3)
  })
})
