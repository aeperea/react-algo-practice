function getMergedSessions(sessions) {
  // only unique user ids
  const allUserIds = [...new Set(sessions.map((session) => session.user))];
  return allUserIds.reduce((accumulator, currentValue) => {
    const filteredSessions = sessions.filter(
      (session) => session.user === currentValue,
    );
    const totalDuration = filteredSessions.reduce(
      (acc2, current2) => (current2.duration += acc2),
      0,
    );
    const totalEquipment = [
      ...new Set(
        filteredSessions.reduce(
          (acc3, current3) => [...acc3, ...current3.equipment],
          [],
        ),
      ),
    ].sort();

    return [
      ...accumulator,
      {
        user: currentValue,
        duration: totalDuration,
        equipment: totalEquipment,
      },
    ];
  }, []);
}

/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @param {{user?: number, minDuration?: number, equipment?: Array<string>, merge?: boolean}} [options]
 * @return {Array}
 */
export default function selectData(sessions, options) {
  if (!options) return sessions;
  const optionsKeys = Object.keys(options);
  let filteredSessions = sessions;
  if (optionsKeys.includes("merge") && options["merge"] === true) {
    // do merge rows for the sessions data
    const mergedSessions = getMergedSessions(sessions);
    return selectData(mergedSessions, {...options, merge: false});
  }

  if (optionsKeys.includes("minDuration") && options["minDuration"] > 0) {
    filteredSessions = filteredSessions.filter(
      (session) => session.duration >= options["minDuration"],
    );
  }

  if (optionsKeys.includes("user") && options["user"] !== null) {
    filteredSessions = filteredSessions.filter(
      (session) => session.user === options["user"],
    );
  }

  if (optionsKeys.includes("equipment") && options["equipment"] && options["equipment"].length !== 0) {
    filteredSessions = filteredSessions.filter((session) =>
      session.equipment.some((item) => options["equipment"].includes(item)),
    );
  }

  return filteredSessions;
}
