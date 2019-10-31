// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import API from './API';

class StandingsService {

	async getStandingsData(playerId) {
		return await API.getStandings(playerId);
	}

	createTeamData(arrTeams) {
		const teams = [];

		arrTeams.forEach((team) => {
			teams.push({
				rank: team.divisionRank,
				name: team.team.name,
				games: team.gamesPlayed,
				wins: team.leagueRecord.wins,
				losses: team.leagueRecord.losses,
				ot: team.leagueRecord.ot,
				points: team.points,
			})
		});

		return teams;
	}

	async processStandingsData(data) {
		console.log('processStandingsData', data);
		let atl = [];
		let met = [];
		let cen = [];
		let pac = [];

		data.records.forEach((group) => {
			if (group.conference.name === 'Eastern') {
				if (group.division.name === 'Atlantic') {
					atl = this.createTeamData(group.teamRecords);
				} else if (group.division.name === 'Metropolitan') {
					met = this.createTeamData(group.teamRecords);
				}
			} else if (group.conference.name === 'Western') {
				if (group.division.name === 'Central') {
					cen = this.createTeamData(group.teamRecords);
				} else if (group.division.name === 'Pacific') {
					pac = this.createTeamData(group.teamRecords);
				}
			}
		});

		return [
			{
				name: 'Eastern',
				division: [
					{
						name: 'Atlantic',
						teams: atl,
					},
					{
						name: 'Metropolitan',
						teams: met,
					}
				]
			},
			{
				name: 'Western',
				division: [
					{
						name: 'Central',
						teams: cen,
					},
					{
						name: 'Pacific',
						teams: pac,
					}
				]
			}
		];

		// return data.records;
	}
}

export default new StandingsService();
