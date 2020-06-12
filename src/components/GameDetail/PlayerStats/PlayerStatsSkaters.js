import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Shared/Modal/Modal';
import PlayerDetail from '../../../containers/PlayerDetail';
import './PlayerStats.scss';

function renderSkaterStats(data) {
	return (
		<tr key={data.id}>
			<td className="stats-table--pinned stats-table--jersey">{data.number}</td>
			<td className="stats-table--pinned text-left stats-table--name">
				<Modal content={<PlayerDetail playerId={data.id} />} modalClass="player-detail">
					{data.name}
					<span className="offscreen">Open player details for {data.name} in modal window</span>
				</Modal>, {data.pos}</td>
			<td className="stats-table--spacer">{data.goals}</td>
			<td>{data.assists}</td>
			<td>{data.goals + data.assists}</td>
			<td>{data.plusMinus}</td>
			<td>{data.penaltyMinutes}</td>
			<td>{data.shots}</td>
			<td>{data.hits}</td>
			<td>{data.blocked}</td>
			<td>{data.giveaways}</td>
			<td>{data.takeaways}</td>
			<td>{data.faceOffWins}</td>
			<td>{data.faceoffTaken}</td>
			<td>{data.faceOffPercent}</td>
			<td>{data.timeOnIce}</td>
			<td>{data.powerPlayTimeOnIce}</td>
		</tr>
	);
}

function PlayerStatsSkaters(props) {
	const {
		position,
		playerStats,
	} = props;

	return (
		<div className="stats-table player-stats">
			<table>
				<thead>
				<tr>
					<th className="stats-table--pinned stats-table--jersey">&nbsp;</th>
					<th className="stats-table--pinned stats-table--name text-left">{position}</th>
					<th className="stats-table--spacer"><span className="tooltip">G <span className="tooltip-content">Goals</span></span></th>
					<th><span className="tooltip">A <span className="tooltip-content">Assists</span></span></th>
					<th><span className="tooltip">P <span className="tooltip-content">Points</span></span></th>
					<th><span className="tooltip">+/- <span className="tooltip-content">Plus / Minus</span></span></th>
					<th><span className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></span></th>
					<th><span className="tooltip">SOG <span className="tooltip-content">Shots on Goal</span></span></th>
					<th><span className="tooltip">HT <span className="tooltip-content">Hits</span></span></th>
					<th><span className="tooltip">BS <span className="tooltip-content">Blocked Shots</span></span></th>
					<th><span className="tooltip">GV <span className="tooltip-content">Giveaways</span></span></th>
					<th><span className="tooltip">TK <span className="tooltip-content">Takeaways</span></span></th>
					<th><span className="tooltip">FW <span className="tooltip-content">Faceoff Win</span></span></th>
					<th><span className="tooltip">FL <span className="tooltip-content">Faceoff Loss</span></span></th>
					<th><span className="tooltip">FO% <span className="tooltip-content">Faceoff Win Percentage</span></span></th>
					<th><span className="tooltip">TOI <span className="tooltip-content">Total On Ice Time</span></span></th>
					<th><span className="tooltip">PP TOI <span className="tooltip-content">Power Play Total On Ice Time</span></span></th>
				</tr>
				</thead>
				<tbody>
				{
					playerStats.map((player) => {
						return (renderSkaterStats(player))
					})
				}
				</tbody>
			</table>
		</div>
	)
}

PlayerStatsSkaters.propTypes = {
	position: PropTypes.string,
	playerStats: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		number: PropTypes.string,
		pos: PropTypes.string,
		assists: PropTypes.number,
		blocked: PropTypes.number,
		evenTimeOnIce: PropTypes.string,
		faceOffPercent: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		faceOffWins: PropTypes.number,
		faceoffTaken: PropTypes.number,
		giveaways: PropTypes.number,
		goals: PropTypes.number,
		hits: PropTypes.number,
		penaltyMinutes: PropTypes.number,
		plusMinus: PropTypes.number,
		powerPlayAssists: PropTypes.number,
		powerPlayGoals: PropTypes.number,
		powerPlayTimeOnIce: PropTypes.string,
		shortHandedAssists: PropTypes.number,
		shortHandedGoals: PropTypes.number,
		shortHandedTimeOnIce: PropTypes.string,
		shots: PropTypes.number,
		takeaways: PropTypes.number,
		timeOnIce: PropTypes.string,
	})),
}

export default PlayerStatsSkaters;
