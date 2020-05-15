
function GetStarStats(star, boxscoreTeams) {
	let stats;
	let starId = star.id;
	let starName = star.fullName;
	let playerKey = `ID${starId}`;
	let teamName;
	let position;
	let stat1;
	let stat2;

	let playerData = boxscoreTeams.away.players[playerKey];

	if (playerData) {
		teamName = boxscoreTeams.away.team.triCode;
	} else {
		playerData = boxscoreTeams.home.players[playerKey];
		teamName = boxscoreTeams.home.team.triCode;
	}

	position = playerData.position.code;

	if (position === 'G') {
		let savePercent = playerData.stats.goalieStats.savePercentage;

		savePercent = (savePercent / 100).toFixed(3);

		stat1 = `Saves: ${playerData.stats.goalieStats.saves}`;
		stat2 = `Save %: ${savePercent}`;
	} else {
		stat1 = `Goals: ${playerData.stats.skaterStats.goals}`;
		stat2 = `Assists: ${playerData.stats.skaterStats.assists}`;
	}


	stats = {
		id: starId,
		name: starName,
		stat1: stat1,
		stat2: stat2,
		teamName: teamName,
	};

	return stats;
}

export default GetStarStats;
