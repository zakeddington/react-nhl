
function GetFaceOffPercent(wins, total) {
	if (total) {
		return Math.round((wins / total) * 100);
	}
	return '-';
}

function GetSavePercent(saves, shots) {
	if (shots) {
		return Math.round((saves / shots) * 1000) / 1000;
	}
	return '-';
}

function GetPlayerStatsByPosition(players) {
	const playerStatsByPosition = [];
	const forwards = [];
	const defense = [];
	const goalies = [];

	Object.keys(players).forEach((key) => {
		const player = players[key];

		if (Object.keys(player.stats).length) {
			let playerData = {
				id: player.person.id,
				number: player.jerseyNumber,
				name: player.person.fullName,
				pos: player.position.abbreviation,
			};

			switch (player.position.code) {
				case 'D':
					let defenseStats = Object.assign(playerData, player.stats.skaterStats);
					defenseStats.faceOffPercent = GetFaceOffPercent(defenseStats.faceOffWins, defenseStats.faceoffTaken);
					defense.push(defenseStats);
					break;
				case 'G':
					let goalieStats = Object.assign(playerData, player.stats.goalieStats);
					goalieStats.savePercent = GetSavePercent(goalieStats.saves, goalieStats.shots);
					goalies.push(goalieStats);
					break;
				default:
					let forwardStats = Object.assign(playerData, player.stats.skaterStats);
					forwardStats.faceOffPercent = GetFaceOffPercent(forwardStats.faceOffWins, forwardStats.faceoffTaken);
					forwards.push(forwardStats);
					break;
			}
		}
	});

	if (!forwards.length && !defense.length && !goalies.length) {
		return null;
	}

	forwards.sort((a, b) => a.number - b.number);
	defense.sort((a, b) => a.number - b.number);
	goalies.sort((a, b) => a.number - b.number);

	playerStatsByPosition.push({
		position: 'Forwards',
		playerStats: forwards,
	});

	playerStatsByPosition.push({
		position: 'Defense',
		playerStats: defense,
	});

	playerStatsByPosition.push({
		position: 'Goalies',
		playerStats: goalies,
	});

	return playerStatsByPosition;
}

export default GetPlayerStatsByPosition;
