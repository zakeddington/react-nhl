const API_BASE_URL = 'https://statsapi.web.nhl.com/api/v1/';

class API {
	getSchedule(strStart, strEnd, arrParams) {
		return new Promise((resolve, reject) => {
			try {
				let url = `${API_BASE_URL}schedule`;
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

	getGame(gameId) {
		return new Promise((resolve, reject) => {
			try {
				let url = `${API_BASE_URL}game/${gameId}/feed/live`;
				resolve(this.getData(url));
			} catch(e) {
				reject(e);
			}
		});
	}

	getGameContent(gameId) {
		return new Promise((resolve, reject) => {
			try {
				let url = `${API_BASE_URL}game/${gameId}/content`;
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

		const data = await response.json();

		return data;
	}
}

export default new API();
