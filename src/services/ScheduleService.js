import { Language, DateOptions, TimeOptions } from '../config/Dates';
import API from './API';
import GetGameStatus from './GameDetail/GetGameStatus';


class ScheduleService {

	async getScheduleGames(dateFrom, dateTo, params) {
		const data = await API.getSchedule(dateFrom, dateTo, params);
		const { dates } = data;
		let results = [];

		dates.forEach((date) => {
			let curDate = new Date(date.date.replace(/-/g, '/'));

			let curResults = {
				gameDate: curDate.toLocaleDateString(Language, DateOptions),
				games: []
			};

			date.games.forEach((game) => {
				const startTime = new Date(game.gameDate).toLocaleTimeString(Language, TimeOptions);
				const startStatus = game.status.detailedState;
				const gameStatus = GetGameStatus(game.linescore);
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
				} else if (startStatus === 'Postponed') {
					curStatus = 'PPD';
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
					awayTeam: {
						id: game.teams.away.team.id,
						name: game.teams.away.team.name,
						score: awayScore,
						record: `${game.teams.away.leagueRecord.wins}-${game.teams.away.leagueRecord.losses}${awayOTL}`,
					},
					homeTeam: {
						id: game.teams.home.team.id,
						name: game.teams.home.team.name,
						score: homeScore,
						record: `${game.teams.home.leagueRecord.wins}-${game.teams.home.leagueRecord.losses}${homeOTL}`,
					}
				};

				curResults.games.push(gameDetail);
			});

			results.push(curResults);
		});

		return results;
	}
}

export default new ScheduleService();
