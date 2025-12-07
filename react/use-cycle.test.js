import {describe, it, expect} from 'vitest'
import {renderHook, act} from '@testing-library/react'
import useCycle from './use-cycle.js'

describe('useCycle', () => {
  it('return values', () => {
    const modes = ['low', 'medium', 'high']
    const {result} = renderHook(() => useCycle(...modes))

    expect(result.current[0]).toBe(modes[0])
    expect(typeof result.current[1]).toBe('function')
  })

  it('cycle', () => {
    const modes = ['low', 'medium', 'high']
    const {result} = renderHook(() => useCycle(...modes))

    act(() => {
      result.current[1]()
    })

    expect(result.current[0]).toBe(modes[1])
  })

  it('cycle should reset to first element', () => {
    const modes = ['low', 'medium', 'high']
    const {result} = renderHook(() => useCycle(...modes))

    act(() => {
      result.current[1]()
      result.current[1]()
      result.current[1]()
    })

    expect(result.current[0]).toBe(modes[0])
  })
})
