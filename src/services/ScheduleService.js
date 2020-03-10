// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import CONSTANTS from '../config/Constants';
import API from './API';
import UTILS from './Utils';

class ScheduleService {

	async getScheduleGames(dateFrom, dateTo, params) {
		const data = await API.getSchedule(dateFrom, dateTo, params);
		const {dates} = data;
		let results = [];

		dates.forEach((date) => {
			let curDate = new Date(date.date.replace(/-/g, '/'));

			let curResults = {
				date: curDate.toLocaleDateString(CONSTANTS.lang, CONSTANTS.dateOptions),
				games: []
			};

			date.games.forEach((game) => {
				const startTime = new Date(game.gameDate).toLocaleTimeString(CONSTANTS.lang, CONSTANTS.timeOptions);
				const gameStatus = UTILS.getGameStatus(game.linescore);
				const awayOTL = game.teams.away.leagueRecord.ot ? `-${game.teams.away.leagueRecord.ot}` : '';
				const homeOTL = game.teams.home.leagueRecord.ot ? `-${game.teams.home.leagueRecord.ot}` : '';
				let curStatus = '';
				let broadcasts = [];
				let awayScore = '';
				let homeScore = '';

				if (gameStatus.length) {
					curStatus = gameStatus;
					awayScore = game.teams.away.score;
					homeScore = game.teams.home.score;
				} else {
					curStatus = startTime;
				}

				if (game.broadcasts) {
					game.broadcasts.forEach((network) => {
						broadcasts.push(network.name);
					});
				}

				let gameDetail = {
					id: game.gamePk,
					gameStatus: curStatus,
					broadcasts: broadcasts.join(', '),
					teams: {
						away: {
							id: game.teams.away.team.id,
							name: game.teams.away.team.name,
							score: awayScore,
							record: `${game.teams.away.leagueRecord.wins}-${game.teams.away.leagueRecord.losses}${awayOTL}`,
						},
						home: {
							id: game.teams.home.team.id,
							name: game.teams.home.team.name,
							score: homeScore,
							record: `${game.teams.home.leagueRecord.wins}-${game.teams.home.leagueRecord.losses}${homeOTL}`,
						}
					}
				};

				curResults.games.push(gameDetail);
			});

			results.push(curResults);
		});

		// console.log('ScheduleService results', results);

		if (!dates) {
			// throw new Error(`ScheduleService getScheduleGames failed, dates not returned`);
			return CONSTANTS.noData;
		}

		return results;
	}
}

export default new ScheduleService();
