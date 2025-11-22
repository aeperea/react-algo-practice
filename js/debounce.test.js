import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest'
import debounce from './debounce.js'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('calls provided function after delay', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced('a')
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(99)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')
  })

  it('cancels previous pending call and only invokes last call', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced('first')
    debounced('second')
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('second')
  })

  it('preserves this context and forwards arguments', () => {
    const obj = {
      value: 7,
      calledWith: null,
      from: null,
      method: debounce(function (v) {
        this.calledWith = v
        this.from = this
      }, 50)
    }

    obj.method('payload')
    vi.advanceTimersByTime(50)

    expect(obj.calledWith).toBe('payload')
    expect(obj.from).toBe(obj)
  })

  it('works with zero delay (schedules via timers)', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 0)

    debounced('z')
    expect(fn).not.toHaveBeenCalled()

    vi.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('z')
  })
})
