
function GetStatsGoalie(data) {
	return {
		evenSaves: Number(data.evenSaves) || 0,
		evenShots: Number(data.evenShots) || 0,
		evenStrengthSavePercentage: Number(data.evenStrengthSavePercentage) || 0,
		games: Number(data.games) || 0,
		gamesStarted: Number(data.gamesStarted) || 0,
		goalAgainstAverage: Number(data.goalAgainstAverage) || 0,
		goalsAgainst: Number(data.goalsAgainst) || 0,
		losses: Number(data.losses) || 0,
		ot: Number(data.ot) || 0,
		powerPlaySavePercentage: Number(data.powerPlaySavePercentage) || 0,
		powerPlaySaves: Number(data.powerPlaySaves) || 0,
		powerPlayShots: Number(data.powerPlayShots) || 0,
		savePercentage: Number(data.savePercentage) || 0,
		saves: Number(data.saves) || 0,
		shortHandedSavePercentage: Number(data.shortHandedSavePercentage) || 0,
		shortHandedSaves: Number(data.shortHandedSaves) || 0,
		shortHandedShots: Number(data.shortHandedShots) || 0,
		shotsAgainst: Number(data.shotsAgainst) || 0,
		shutouts: Number(data.shutouts) || 0,
		ties: Number(data.ties) || 0,
		timeOnIce: `${data.timeOnIce}`,
		wins: Number(data.wins) || 0,
	}
}

export default GetStatsGoalie;
