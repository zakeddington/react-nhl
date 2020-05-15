
function GetPenaltyPlays(periodPlays, allPlays, penaltyIds, periods) {
	penaltyIds.forEach((id) => {
		const curPlay = allPlays[id];
		const curPeriodIndex = curPlay.about.period - 1;
		const penaltyTeamId = curPlay.team.id;
		let curPenaltyOn = {};

		if (curPeriodIndex < periods.length) {
			curPlay.players.forEach((player) => {
				if (player.playerType === 'PenaltyOn') {
					curPenaltyOn = {
						id: player.player.id,
						name: player.player.fullName,
					}
				}
			});

			const playDetail = {
				time: curPlay.about.periodTime,
				teamId: penaltyTeamId,
				penaltyOn: curPenaltyOn,
				penaltyType: curPlay.result.secondaryType,
				penaltyMin: curPlay.result.penaltyMinutes,
			};

			periodPlays[curPeriodIndex].penalties.push(playDetail);
		}
	});

	return periodPlays;
}

export default GetPenaltyPlays;

