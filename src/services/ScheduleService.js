// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';
import CONSTANTS from '../config/Constants';
import API from './API';
import UTILS from './Utils';

class ScheduleService {

	async getScheduleGames(dateFrom, dateTo, params) {
		const data = await API.getSchedule(dateFrom, dateTo, params);
		const dates = _.get(data, 'dates');
		let results = [];

		_.forEach(dates, (date) => {
			let curDate = new Date(date.date.replace(/-/g, '/'));

			let curResults = {
				date: curDate.toLocaleDateString(CONSTANTS.lang, CONSTANTS.dateOptions),
				games: []
			};

			_.flatMapDeep(date.games, (game) => {
				let startTime = new Date(game.gameDate).toLocaleTimeString(CONSTANTS.lang, CONSTANTS.timeOptions);
				let gameStatus = UTILS.getGameStatus(game.linescore);
				let curStatus;
				let awayScore = '';
				let homeScore = '';
				let awayOTL = game.teams.away.leagueRecord.ot ? `-${game.teams.away.leagueRecord.ot}` : '';
				let homeOTL = game.teams.home.leagueRecord.ot ? `-${game.teams.home.leagueRecord.ot}` : '';

				if (gameStatus.length) {
					curStatus = gameStatus;
					awayScore = game.teams.away.score;
					homeScore = game.teams.home.score;
				} else {
					curStatus = startTime;
				}

				let gameDetail = {
					id: game.gamePk,
					gameStatus: curStatus,
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
				}

				curResults.games.push(gameDetail);
			});

			results.push(curResults);
		});

		console.log('ScheduleService results', results);

		if (!dates) {
			throw new Error(`ScheduleService getScheduleGames failed, dates not returned`);
		}

		return results;
	}
}

export default new ScheduleService();
