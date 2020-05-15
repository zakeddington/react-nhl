
const Utils = {

	getGameStatus(linescoreData) {
		let data = linescoreData;
		let curPeriod = data.currentPeriod;
		let curPeriodName = data.currentPeriodOrdinal;
		let curTime = data.currentPeriodTimeRemaining;
		let curStatus = '';

		if (curPeriod > 0) {
			if (curTime !== 'Final') {
				curStatus = `${curPeriodName} | ${curTime}`;
			} else {
				if (curPeriod === 3) {
					curStatus = `${curTime}`;
				} else {
					curStatus = `${curTime}/${curPeriodName}`;
				}
			}
		}

		return curStatus;
	},

	getPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals) {
		let periods = [];
		let periodsTotal = ['T', awayScore, homeScore];

		if (periodGoals.length) {
			periodGoals.forEach((period) => {
				let curPeriod = [];
				let periodName = period.ordinalNum;
				let awayGoals = period.away.goals;
				let homeGoals = period.home.goals;

				if (periodName === 'OT') {
					if (awayGoals + homeGoals <= 0) {
						curPeriod.push('SO');
						curPeriod.push(shootoutGoals.away.scores);
						curPeriod.push(shootoutGoals.home.scores);
					} else {
						curPeriod.push(periodName);
						curPeriod.push(awayGoals);
						curPeriod.push(homeGoals);
					}
				} else {
					curPeriod.push(periodName);
					curPeriod.push(awayGoals);
					curPeriod.push(homeGoals);
				}

				periods.push(curPeriod);
			});

			periods.push(periodsTotal);
		}

		return periods;
	},

	getStarStats(star, boxscoreTeams) {
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
	},

	getTeamGameStats(team = {}, boxscore = {}) {
		return {
			id: team.id,
			name: team.teamName,
			shots: boxscore.shots,
			faceOffWinPercentage: boxscore.faceOffWinPercentage,
			powerPlayGoals: boxscore.powerPlayGoals,
			powerPlayOpportunities: boxscore.powerPlayOpportunities,
			pim: boxscore.pim,
			hits: boxscore.hits,
			blocked: boxscore.blocked,
			giveaways: boxscore.giveaways,
			takeaways: boxscore.takeaways,
		}
	}
};


export default Utils;
