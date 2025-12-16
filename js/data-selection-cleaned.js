function mergeSessions(sessions) {
  const byUser = new Map()

  for (const session of sessions) {
    const existing = byUser.get(session.user)
    if (!existing) {
      byUser.set(session.user, {
        user: session.user,
        duration: session.duration,
        equipment: new Set(session.equipment),
      })
    } else {
      existing.duration += session.duration
      session.equipment.forEach((item) => existing.equipment.add(item))
    }
  }

  return Array.from(byUser.values()).map((entry) => ({
    user: entry.user,
    duration: entry.duration,
    equipment: Array.from(entry.equipment),
  }))
}

/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @param {{user?: number, minDuration?: number, equipment?: Array<string>, merge?: boolean}} [options]
 * @return {Array}
 */
export default function selectDataCleaned(sessions, options) {
  const {merge = false, minDuration, user, equipment = []} = options ?? {}

  if (merge) {
    return selectDataCleaned(mergeSessions(sessions), {...options, merge: false})
  }

  let filtered = sessions

  if (Number.isFinite(minDuration) && minDuration > 0) {
    filtered = filtered.filter((session) => session.duration >= minDuration)
  }

  if (user !== undefined && user !== null) {
    filtered = filtered.filter((session) => session.user === user)
  }

  if (equipment.length) {
    const equipmentSet = new Set(equipment)
    filtered = filtered.filter((session) =>
      session.equipment.some((item) => equipmentSet.has(item)),
    )
  }

  return filtered
}
