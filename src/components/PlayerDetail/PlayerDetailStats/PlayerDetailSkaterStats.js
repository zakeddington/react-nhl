import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';

function renderSkaterStats(data, i) {
	return (
		<tr key={`player-detail-skater-stats-${i}`} className={data.rowClass}>
			<td className="text-left">{data.season}</td>
			<td className="text-left">{data.team}</td>
			<td>{data.games}</td>
			<td>{data.goals}</td>
			<td>{data.assists}</td>
			<td>{data.points}</td>
			<td>{data.plusMinus}</td>
			<td>{data.penaltyMinutes}</td>
			<td>{data.powerPlayGoals}</td>
			<td>{data.powerPlayPoints}</td>
			<td>{data.shortHandedGoals}</td>
			<td>{data.shortHandedPoints}</td>
			<td>{data.gameWinningGoals}</td>
			<td>{data.overTimeGoals}</td>
			<td>{data.shots}</td>
			<td>{data.shotPct}</td>
			<td>{data.hits}</td>
			<td>{data.blocked}</td>
			<td>{data.faceOffPct}</td>
		</tr>
	);
}

function PlayerDetailSkaterStats(props) {
	const { statsBySeason } = props;

	if (!statsBySeason.length) {
		return (
			<ErrorMessage errorMsg="No stats available." />
		)
	}

	return (
		<div key="player-detail-skater-stats" className="stats-table">
			<table>
				<thead>
					<tr>
						<th className="text-left">Season</th>
						<th className="text-left">Team</th>
						<th><span className="tooltip">GP <span className="tooltip-content">Games Played</span></span></th>
						<th><span className="tooltip">G <span className="tooltip-content">Goals</span></span></th>
						<th><span className="tooltip">A <span className="tooltip-content">Assists</span></span></th>
						<th><span className="tooltip">P <span className="tooltip-content">Points</span></span></th>
						<th><span className="tooltip">+/- <span className="tooltip-content">Plus / Minus</span></span></th>
						<th><span className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></span></th>
						<th><span className="tooltip">PPG <span className="tooltip-content">Power Play Goals</span></span></th>
						<th><span className="tooltip">PPP <span className="tooltip-content">Power Play Points</span></span></th>
						<th><span className="tooltip">SHG <span className="tooltip-content">Shorthanded Goals</span></span></th>
						<th><span className="tooltip">SHP <span className="tooltip-content">Shorthanded Points</span></span></th>
						<th><span className="tooltip">GWG <span className="tooltip-content">Game Winning Goals</span></span></th>
						<th><span className="tooltip">OTG <span className="tooltip-content">Overtime Goals</span></span></th>
						<th><span className="tooltip">SOG <span className="tooltip-content">Shots on Goal</span></span></th>
						<th><span className="tooltip">S% <span className="tooltip-content">Shooting Percentage</span></span></th>
						<th><span className="tooltip">HT <span className="tooltip-content">Hits</span></span></th>
						<th><span className="tooltip">BS <span className="tooltip-content">Blocked Shots</span></span></th>
						<th><span className="tooltip">FO% <span className="tooltip-content">Faceoff Win Percentage</span></span></th>
					</tr>
				</thead>
				<tbody>
				{
					statsBySeason.map((season, i) => {
						return (renderSkaterStats(season, i))
					})
				}
				</tbody>
			</table>
		</div>
	)
}

PlayerDetailSkaterStats.propTypes = {
	statsBySeason: PropTypes.arrayOf(PropTypes.shape({
		assists: PropTypes.number,
		blocked: PropTypes.number,
		evenTimeOnIce: PropTypes.string,
		faceOffPct: PropTypes.number,
		gameWinningGoals: PropTypes.number,
		games: PropTypes.number,
		goals: PropTypes.number,
		hits: PropTypes.number,
		overTimeGoals: PropTypes.number,
		penaltyMinutes: PropTypes.string,
		pim: PropTypes.number,
		plusMinus: PropTypes.number,
		points: PropTypes.number,
		powerPlayGoals: PropTypes.number,
		powerPlayPoints: PropTypes.number,
		powerPlayTimeOnIce: PropTypes.string,
		rowClass: PropTypes.string,
		season: PropTypes.string,
		shifts: PropTypes.number,
		shortHandedGoals: PropTypes.number,
		shortHandedPoints: PropTypes.number,
		shortHandedTimeOnIce: PropTypes.string,
		shotPct: PropTypes.number,
		shots: PropTypes.number,
		team: PropTypes.string,
		timeOnIce: PropTypes.string,
	})),
}

export default PlayerDetailSkaterStats;
