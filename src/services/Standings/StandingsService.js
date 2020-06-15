import API from '../API';
import GetTeams from './GetTeams';

class StandingsService {

	async getStandingsData() {
		const season = await API.getStandings();
		const wildcard = await API.getWildcardStandings();

		return {
			season,
			wildcard,
		};
	}

	async processDivisionStandings(data) {
		let atl = [];
		let met = [];
		let cen = [];
		let pac = [];

		data.season.records.forEach((group) => {
			if (group.conference.name === 'Eastern') {
				if (group.division.name === 'Atlantic') {
					atl = GetTeams(group.teamRecords, 'divisionRank');
				} else if (group.division.name === 'Metropolitan') {
					met = GetTeams(group.teamRecords, 'divisionRank');
				}
			} else if (group.conference.name === 'Western') {
				if (group.division.name === 'Central') {
					cen = GetTeams(group.teamRecords, 'divisionRank');
				} else if (group.division.name === 'Pacific') {
					pac = GetTeams(group.teamRecords, 'divisionRank');
				}
			}
		});

		return {
			standingsName: 'Division',
			standings: [
				{
					conferenceName: 'Eastern',
					divisions: [
						{
							divisionName: 'Atlantic',
							teams: atl,
						},
						{
							divisionName: 'Metropolitan',
							teams: met,
						}
					]
				},
				{
					conferenceName: 'Western',
					divisions: [
						{
							divisionName: 'Central',
							teams: cen,
						},
						{
							divisionName: 'Pacific',
							teams: pac,
						}
					]
				}
			]
		};
	}

	async processConferenceStandings(data) {
		let east = [];
		let west = [];

		data.season.records.forEach((group) => {
			if (group.conference.name === 'Eastern') {
				let eastTeams = GetTeams(group.teamRecords, 'conferenceRank');
				eastTeams.map((team) => {
					return east.push(team);
				})
			} else if (group.conference.name === 'Western') {
				let westTeams = GetTeams(group.teamRecords, 'conferenceRank');
				westTeams.map((team) => {
					return west.push(team);
				})
			}
		});

		east.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
		west.sort((a, b) => (a.rank > b.rank) ? 1 : -1);

		return {
			standingsName: 'Conference',
			standings: [
				{
					conferenceName: 'Eastern',
					divisions: [
						{
							divisionName: 'Eastern',
							teams: east,
						},
					]
				},
				{
					conferenceName: 'Western',
					divisions: [
						{
							divisionName: 'Western',
							teams: west,
						},
					]
				}
			]
		};
	}

	async processLeagueStandings(data) {
		let teams = [];

		data.season.records.forEach((group) => {
			let curTeams = GetTeams(group.teamRecords, 'leagueRank');
			curTeams.map((team) => {
				return teams.push(team);
			})
		});

		teams.sort((a, b) => (a.rank > b.rank) ? 1 : -1);

		return {
			standingsName: 'League',
			standings: [
				{
					conferenceName: 'League',
					divisions: [
						{
							divisionName: 'League',
							teams: teams,
						},
					]
				}
			]
		};
	}

	async processWildcardStandings(data) {
		let atl = [];
		let met = [];
		let cen = [];
		let pac = [];
		let wildEast = [];
		let wildWest = [];

		data.wildcard.records.forEach((group) => {
			if (group.conference.name === 'Eastern') {
				if (group.standingsType === 'wildCard') {
					wildEast = GetTeams(group.teamRecords, 'wildCardRank', 'divisionRank');
				} else {
					if (group.division.name === 'Atlantic') {
						atl = GetTeams(group.teamRecords, 'wildCardRank', 'divisionRank');
					} else if (group.division.name === 'Metropolitan') {
						met = GetTeams(group.teamRecords, 'wildCardRank', 'divisionRank');
					}
				}

			} else if (group.conference.name === 'Western') {
				if (group.standingsType === 'wildCard') {
					wildWest = GetTeams(group.teamRecords, 'wildCardRank', 'divisionRank');
				} else {
					if (group.division.name === 'Central') {
						cen = GetTeams(group.teamRecords, 'wildCardRank', 'divisionRank');
					} else if (group.division.name === 'Pacific') {
						pac = GetTeams(group.teamRecords, 'wildCardRank', 'divisionRank');
					}
				}
			}
		});

		return {
			standingsName: 'Wild Card',
			standings: [
				{
					conferenceName: 'Eastern',
					divisions: [
						{
							divisionName: 'Atlantic',
							teams: atl,
						},
						{
							divisionName: 'Metropolitan',
							teams: met,
						},
						{
							divisionName: 'Wild Card',
							teams: wildEast,
						}
					]
				},
				{
					conferenceName: 'Western',
					divisions: [
						{
							divisionName: 'Central',
							teams: cen,
						},
						{
							divisionName: 'Pacific',
							teams: pac,
						},
						{
							divisionName: 'Wild Card',
							teams: wildWest,
						}
					]
				}
			]
		};
	}
}

export default new StandingsService();
