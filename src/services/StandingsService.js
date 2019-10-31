// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import API from './API';

class StandingsService {

	async getStandingsData(playerId) {
		return await API.getStandings(playerId);
	}

	async processStandingsData(data) {
		// console.log('processStandingsData', data);

		return data.records;
	}
}

export default new StandingsService();
