// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import API from './API';

class StandingsService {

	async getStandingsData(playerId) {
		return await API.getStandings(playerId);
	}

	createTeamData(arrTeams, rankProp) {
		const teams = [];

		arrTeams.forEach((team) => {
			teams.push({
				id: team.team.id,
				rank: parseInt(team[rankProp], 10),
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

	createDivisionStandings(data) {
		let atl = [];
		let met = [];
		let cen = [];
		let pac = [];

		data.records.forEach((group) => {
			if (group.conference.name === 'Eastern') {
				if (group.division.name === 'Atlantic') {
					atl = this.createTeamData(group.teamRecords, 'divisionRank');
				} else if (group.division.name === 'Metropolitan') {
					met = this.createTeamData(group.teamRecords, 'divisionRank');
				}
			} else if (group.conference.name === 'Western') {
				if (group.division.name === 'Central') {
					cen = this.createTeamData(group.teamRecords, 'divisionRank');
				} else if (group.division.name === 'Pacific') {
					pac = this.createTeamData(group.teamRecords, 'divisionRank');
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
	}

	createConferenceStandings(data) {
		let east = [];
		let west = [];

		data.records.forEach((group) => {
			if (group.conference.name === 'Eastern') {
				let eastTeams = this.createTeamData(group.teamRecords, 'conferenceRank');
				eastTeams.map((team) => {
					return east.push(team);
				})
			} else if (group.conference.name === 'Western') {
				let westTeams = this.createTeamData(group.teamRecords, 'conferenceRank');
				westTeams.map((team) => {
					return west.push(team);
				})
			}
		});

		east.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
		west.sort((a, b) => (a.rank > b.rank) ? 1 : -1);

		return [
			{
				name: 'Eastern',
				teams: east,
			},
			{
				name: 'Western',
				teams: west,
			}
		];
	}

	createLeagueStandings(data) {
		let teams = [];

		data.records.forEach((group) => {
			let curTeams = this.createTeamData(group.teamRecords, 'leagueRank');
			curTeams.map((team) => {
				return teams.push(team);
			})
		});

		teams.sort((a, b) => (a.rank > b.rank) ? 1 : -1);

		return [
			{
				name: 'League',
				teams,
			}
		];
	}

	async processStandingsData(data) {
		console.log('processStandingsData', data);
		return {
			division: this.createDivisionStandings(data),
			conference: this.createConferenceStandings(data),
			league: this.createLeagueStandings(data),
		}

		// return data.records;
	}
}

export default new StandingsService();
