import API from './API';

class StandingsService {

	async getStandingsData() {
		const season = await API.getStandings();
		const wildcard = await API.getWildcardStandings();

		return {
			season,
			wildcard,
		};
	}

	createTeamData(arrTeams, rankProp, altRankProp) {
		const teams = [];

		arrTeams.forEach((team) => {
			let rank = parseInt(team[rankProp], 10);

			if (rank === 0) {
				rank = parseInt(team[altRankProp], 10);
			}

			teams.push({
				id: team.team.id,
				rank,
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

	createWildcardStandings(data) {
		let atl = [];
		let met = [];
		let cen = [];
		let pac = [];
		let wildEast = [];
		let wildWest = [];

		data.records.forEach((group) => {
			if (group.conference.name === 'Eastern') {
				if (group.standingsType === 'wildCard') {
					wildEast = this.createTeamData(group.teamRecords, 'wildCardRank', 'divisionRank');
				} else {
					if (group.division.name === 'Atlantic') {
						atl = this.createTeamData(group.teamRecords, 'wildCardRank', 'divisionRank');
					} else if (group.division.name === 'Metropolitan') {
						met = this.createTeamData(group.teamRecords, 'wildCardRank', 'divisionRank');
					}
				}

			} else if (group.conference.name === 'Western') {
				if (group.standingsType === 'wildCard') {
					wildWest = this.createTeamData(group.teamRecords, 'wildCardRank', 'divisionRank');
				} else {
					if (group.division.name === 'Central') {
						cen = this.createTeamData(group.teamRecords, 'wildCardRank', 'divisionRank');
					} else if (group.division.name === 'Pacific') {
						pac = this.createTeamData(group.teamRecords, 'wildCardRank', 'divisionRank');
					}
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
					},
					{
						name: 'Wild Card',
						teams: wildEast,
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
					},
					{
						name: 'Wild Card',
						teams: wildWest,
					}
				]
			}
		];
	}

	async processStandingsData(data) {
		// console.log('processStandingsData', data);
		return {
			division: this.createDivisionStandings(data.season),
			conference: this.createConferenceStandings(data.season),
			league: this.createLeagueStandings(data.season),
			wildcard: this.createWildcardStandings(data.wildcard),
		}

		// return data.records;
	}
}

export default new StandingsService();
