import moment from 'moment';
import CONSTANTS from '../config/Constants';

const API_STATS_URL = 'https://statsapi.web.nhl.com/api/v1/';

class API {
	getSchedule(strStart, strEnd, arrParams) {
		return new Promise((resolve, reject) => {
			try {
				let url = `${API_STATS_URL}schedule`;
				let params = '';

				if (arrParams) {
					params = `&${this.getQueryParams(arrParams)}`;
				}

				url += `?startDate=${strStart}&endDate=${strEnd}${params}`;

				resolve(this.getData(url));
			} catch(e) {
				reject(e);
			}
		});
	}

	getStandings() {
		return new Promise((resolve, reject) => {
			try {
				let url = `${API_STATS_URL}standings`;
				resolve(this.getData(url));
			} catch(e) {
				reject(e);
			}
		});
	}

	getWildcardStandings() {
		const startDate = moment().format(CONSTANTS.momentOptions.apiFormat);
		return new Promise((resolve, reject) => {
			try {
				let url = `${API_STATS_URL}standings/wildCardWithLeaders?date=${startDate}`;
				resolve(this.getData(url));
			} catch(e) {
				reject(e);
			}
		});
	}

	getGame(gameId) {
		return new Promise((resolve, reject) => {
			try {
				let url = `${API_STATS_URL}game/${gameId}/feed/live`;
				resolve(this.getData(url));
			} catch(e) {
				reject(e);
			}
		});
	}

	getGameContent(gameId) {
		return new Promise((resolve, reject) => {
			try {
				let url = `${API_STATS_URL}game/${gameId}/content`;
				resolve(this.getData(url));
			} catch(e) {
				reject(e);
			}
		});
	}

	getPlayerDetail(playerId) {
		return new Promise((resolve, reject) => {
			try {
				const url = `${API_STATS_URL}people/${playerId}?expand=person.stats&stats=yearByYear,careerRegularSeason,yearByYearPlayoffs,careerPlayoffs&expand=stats.team&site=en_nhl`;
				resolve(this.getData(url));
			} catch(e) {
				reject(e);
			}
		});
	}

	getQueryParams(arrParams) {
		let params = arrParams;
		let strParams = 'expand=';

		if (params.length) {
			strParams += params.join(',');
			return strParams;
		}

	}

	async getData(url) {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`NHLService getAllGames failed, HTTP status ${response.status}`);
		}

		return await response.json();
	}
}

export default new API();
