
function GetTeams(arrTeams, rankProp, altRankProp) {
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

export default GetTeams;
