
function GetStatsSkater(data) {
	return {
		assists: Number(data.assists) || 0,
		blocked: Number(data.blocked) || 0,
		evenTimeOnIce: `${data.evenTimeOnIce}`,
		faceOffPct: Number(data.faceOffPct) || 0,
		gameWinningGoals: Number(data.gameWinningGoals) || 0,
		games: Number(data.games) || 0,
		goals: Number(data.goals) || 0,
		hits: Number(data.hits) || 0,
		overTimeGoals: Number(data.overTimeGoals) || 0,
		penaltyMinutes: `${data.penaltyMinutes}`,
		pim: Number(data.pim) || 0,
		plusMinus: Number(data.plusMinus) || 0,
		points: Number(data.points) || 0,
		powerPlayGoals: Number(data.powerPlayGoals) || 0,
		powerPlayPoints: Number(data.powerPlayPoints) || 0,
		powerPlayTimeOnIce: `${data.powerPlayTimeOnIce}`,
		shifts: Number(data.shifts) || 0,
		shortHandedGoals: Number(data.shortHandedGoals) || 0,
		shortHandedPoints: Number(data.shortHandedPoints) || 0,
		shortHandedTimeOnIce: `${data.shortHandedTimeOnIce}`,
		shotPct: Number(data.shotPct) || 0,
		shots: Number(data.shots) || 0,
		timeOnIce: `${data.timeOnIce}`,
	}
}

export default GetStatsSkater;
