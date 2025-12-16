import {describe, it, expect} from 'vitest'
import selectData from './data-selection.js'

const makeSessions = () => [
  {user: 8, duration: 50, equipment: ['bench']},
  {user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell']},
  {user: 1, duration: 10, equipment: ['barbell']},
  {user: 7, duration: 100, equipment: ['bike', 'kettlebell']},
  {user: 7, duration: 200, equipment: ['bike']},
  {user: 2, duration: 200, equipment: ['treadmill']},
  {user: 2, duration: 200, equipment: ['bike']},
]

const expectUnorderedMatch = (actual, expected) => {
  expect(actual).toEqual(expect.arrayContaining(expected))
  expect(actual).toHaveLength(expected.length)
}

describe('selectData', () => {
  it('returns all sessions when no options are provided', () => {
    const sessions = makeSessions()
    expectUnorderedMatch(selectData(sessions), [
      {user: 8, duration: 50, equipment: ['bench']},
      {user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell']},
      {user: 1, duration: 10, equipment: ['barbell']},
      {user: 7, duration: 100, equipment: ['bike', 'kettlebell']},
      {user: 7, duration: 200, equipment: ['bike']},
      {user: 2, duration: 200, equipment: ['treadmill']},
      {user: 2, duration: 200, equipment: ['bike']},
    ])
  })

  it('filters by user', () => {
    const sessions = makeSessions()
    expectUnorderedMatch(selectData(sessions, {user: 2}), [
      {user: 2, duration: 200, equipment: ['treadmill']},
      {user: 2, duration: 200, equipment: ['bike']},
    ])
  })

  it('filters by minimum duration', () => {
    const sessions = makeSessions()
    expectUnorderedMatch(selectData(sessions, {minDuration: 200}), [
      {user: 7, duration: 200, equipment: ['bike']},
      {user: 2, duration: 200, equipment: ['treadmill']},
      {user: 2, duration: 200, equipment: ['bike']},
    ])
  })

  it('returns empty array when minimum duration is too high', () => {
    const sessions = makeSessions()
    expect(selectData(sessions, {minDuration: 400})).toEqual([])
  })

  it('filters by equipment list (any match)', () => {
    const sessions = makeSessions()
    expectUnorderedMatch(selectData(sessions, {equipment: ['bike', 'dumbbell']}), [
      {user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell']},
      {user: 7, duration: 100, equipment: ['bike', 'kettlebell']},
      {user: 7, duration: 200, equipment: ['bike']},
      {user: 2, duration: 200, equipment: ['bike']},
    ])
  })

  it('merges sessions by user when merge option is true', () => {
    const sessions = makeSessions()
    expectUnorderedMatch(selectData(sessions, {merge: true}), [
      {user: 8, duration: 50, equipment: ['bench']},
      {user: 1, duration: 10, equipment: ['barbell']},
      {user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell']},
      {user: 2, duration: 400, equipment: ['bike', 'treadmill']},
    ])
  })

  it('applies minimum duration after merging', () => {
    const sessions = makeSessions()
    expectUnorderedMatch(selectData(sessions, {merge: true, minDuration: 400}), [
      {user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell']},
      {user: 2, duration: 400, equipment: ['bike', 'treadmill']},
    ])
  })
})
