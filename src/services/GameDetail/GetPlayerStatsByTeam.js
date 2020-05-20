import GetPlayerStatsByPosition from './GetPlayerStatsByPosition';
import {PlayerStatsByTeamBaseInitialState} from './GameDetailInitialState';

function GetPlayerStatsByTeam(team = {}, players = {}) {
	const positionStats = GetPlayerStatsByPosition(players);

	return Object.assign({}, PlayerStatsByTeamBaseInitialState, {
		id: team.id,
		name: team.name,
		playerStatsByPosition: positionStats,
	});
}

export default GetPlayerStatsByTeam;
