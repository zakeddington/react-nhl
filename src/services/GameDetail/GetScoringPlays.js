
function GetScoringPlays(periodPlays, allPlays, scoringIds, periods, awayTeam, homeTeam) {

	scoringIds.forEach((id) => {
		const curPlay = allPlays[id];
		const curPeriodIndex = curPlay.about.period - 1;
		const scoringTeamId = curPlay.team.id;
		let curScorer = {};
		let curAssists = [];

		if (curPeriodIndex < periods.length) {
			curPlay.players.forEach((player) => {
				if (player.playerType === 'Scorer') {
					curScorer = {
						id: player.player.id,
						name: player.player.fullName,
						total: player.seasonTotal,
						desc: curPlay.result.secondaryType,
					}
				}

				if (player.playerType === 'Assist') {
					curAssists.push({
						id: player.player.id,
						name: player.player.fullName,
						total: player.seasonTotal,
					})
				}
			});

			const playDetail = {
				time: curPlay.about.periodTime,
				isEmptyNet: curPlay.result.emptyNet,
				goalType: curPlay.result.strength.code,
				teamId: scoringTeamId,
				score: {
					away: {
						name: awayTeam.triCode,
						goals: curPlay.about.goals.away,
						isScoringTeam: scoringTeamId === awayTeam.id,
					},
					home: {
						name: homeTeam.triCode,
						goals: curPlay.about.goals.home,
						isScoringTeam: scoringTeamId === homeTeam.id,
					},
				},
				scorer: curScorer,
				assists: curAssists
			};

			periodPlays[curPeriodIndex].goals.push(playDetail);
		}
	});

	return periodPlays;
}

export default GetScoringPlays;
