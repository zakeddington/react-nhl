
function GetShootoutPlays(data) {
	const playsByPeriod = data.liveData.plays.playsByPeriod;
	const playIds = playsByPeriod[4].plays;
	const allPlays = data.liveData.plays.allPlays;
	const shootoutPlays = [];

	playIds.forEach((id) => {
		let curPlay = allPlays[id];
		let curShooter;

		if (curPlay.players) {
			const shootingTeamId = curPlay.team.id;
			let isGoal = false;
			let shotResult = '';

			switch (curPlay.result.event) {
				case 'Goal':
					isGoal = true;
					shotResult = 'Goal';
					break;
				case 'Shot':
					shotResult = 'Save';
					break;
				case 'Missed Shot':
					shotResult = 'Miss';
					break;
				default:
					break;
			}

			curPlay.players.forEach((player) => {
				if (player.playerType === 'Scorer' || player.playerType === 'Shooter') {
					curShooter = {
						id: player.player.id,
						name: player.player.fullName,
						desc: curPlay.result.secondaryType,
					}
				}
			});

			let playDetail = {
				shooter: curShooter,
				isGoal,
				shotResult,
				teamId: shootingTeamId,
			};

			shootoutPlays.push(playDetail);
		}
	});

	return shootoutPlays;
}

export default GetShootoutPlays;
