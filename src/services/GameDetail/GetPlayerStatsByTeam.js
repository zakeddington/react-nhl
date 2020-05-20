import GetPlayerStatsByPosition from './GetPlayerStatsByPosition';

function GetPlayerStatsByTeam(team = {}, players = {}) {
	const positionStats = GetPlayerStatsByPosition(players);

	return {
		id: team.id,
		name: team.name,
		playerStatsByPosition: positionStats,
	};
}

export default GetPlayerStatsByTeam;
