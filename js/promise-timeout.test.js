import {describe, it, expect} from 'vitest'
import promiseTimeout from './promise-timeout.js'

describe('promiseTimeout', () => {
  it('returns a promise', () => {
    const promise = promiseTimeout(Promise.resolve(1), 100)
    expect(promise).toBeInstanceOf(Promise)
  })

  describe('settled', () => {
    describe('resolved', () => {
      it('immediately', async () => {
        const promise = promiseTimeout(Promise.resolve(42), 100)
        await expect(promise).resolves.toBe(42)
      })

      it('next tick', async () => {
        const promise = promiseTimeout(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(42)
            }, 0)
          }),
          100,
        )
        await expect(promise).resolves.toBe(42)
      })

      it('before timeout', async () => {
        const promise = promiseTimeout(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(42)
            }, 50)
          }),
          100,
        )
        await expect(promise).resolves.toBe(42)
      })
    })

    describe('rejected', () => {
      it('immediately', async () => {
        const promise = promiseTimeout(Promise.reject(42), 100)
        await expect(promise).rejects.toBe(42)
      })

      it('next tick', async () => {
        const promise = promiseTimeout(
          new Promise((_, reject) => {
            setTimeout(() => {
              reject(42)
            }, 0)
          }),
          100,
        )
        await expect(promise).rejects.toBe(42)
      })

      it('before timeout', async () => {
        const promise = promiseTimeout(
          new Promise((_, reject) => {
            setTimeout(() => {
              reject(42)
            }, 50)
          }),
          100,
        )
        await expect(promise).rejects.toBe(42)
      })
    })
  })

  describe('timeout', () => {
    it('immediate', async () => {
      const promise = promiseTimeout(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(42)
          }, 500)
        }),
        0,
      )

      await expect(promise).rejects.toBe('Promise timeout')
    })

    it('all immediate', async () => {
      const promise = promiseTimeout(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(42)
          }, 0)
        }),
        0,
      )
      await expect(promise).resolves.toBe(42)
    })

    it('non-immediate', async () => {
      const promise = promiseTimeout(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(42)
          }, 200)
        }),
        100,
      )
      await expect(promise).rejects.toBe('Promise timeout')
    })
  })
})
