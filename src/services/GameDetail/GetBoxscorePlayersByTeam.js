import GetBoxscorePlayersByPosition from './GetBoxscorePlayersByPosition';

function GetBoxscorePlayersByTeam(team = {}, players = {}) {
	const boxscorePlayersByPosition = GetBoxscorePlayersByPosition(players);

	return {
		id: team.id,
		name: team.name,
		boxscorePlayersByPosition,
	};
}

export default GetBoxscorePlayersByTeam;
