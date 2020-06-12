import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Shared/Modal/Modal';
import PlayerDetail from '../../../containers/PlayerDetail';
import './PlayerStats.scss';

function renderGoalieStats(data) {
	return (
		<tr key={data.id}>
			<td className="stats-table--pinned stats-table--jersey">{data.number}</td>
			<td className="stats-table--pinned stats-table--name text-left">
				<Modal content={<PlayerDetail playerId={data.id} />} modalClass="player-detail">
					{data.name}
					<span className="offscreen">Open player details for {data.name} in modal window</span>
				</Modal>, {data.pos}</td>
			<td className="stats-table--spacer">{data.shots - data.saves}</td>
			<td>{data.shots}</td>
			<td>{data.saves}</td>
			<td>{data.savePercent}</td>
			<td>{data.evenSaves} - {data.evenShotsAgainst}</td>
			<td>{data.powerPlaySaves} - {data.powerPlayShotsAgainst}</td>
			<td>{data.shortHandedSaves} - {data.shortHandedShotsAgainst}</td>
			<td>{data.pim}</td>
			<td>{data.timeOnIce}</td>
		</tr>
	);
}

function PlayerStatsGoalies(props) {
	const {
		position,
		playerStats,
	} = props;

	return (
		<div className="stats-table player-stats goalie-stats">
			<table>
				<thead>
				<tr>
					<th className="stats-table--pinned stats-table--jersey">&nbsp;</th>
					<th className="stats-table--pinned stats-table--name text-left">{position}</th>
					<th className="stats-table--spacer"><span className="tooltip">GA <span className="tooltip-content">Goals Against</span></span></th>
					<th><span className="tooltip">SA <span className="tooltip-content">Shots Against</span></span></th>
					<th><span className="tooltip">SV <span className="tooltip-content">Saves</span></span></th>
					<th><span className="tooltip">SV% <span className="tooltip-content">Save Percentage</span></span></th>
					<th><span className="tooltip">EV <span className="tooltip-content">Even Strength Saves-Shots</span></span></th>
					<th><span className="tooltip">PP <span className="tooltip-content">Power Play Saves-Shots</span></span></th>
					<th><span className="tooltip">SH <span className="tooltip-content">Shorthanded Saves-Shots</span></span></th>
					<th><span className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></span></th>
					<th><span className="tooltip">TOI <span className="tooltip-content">Total On Ice Time</span></span></th>
				</tr>
				</thead>
				<tbody>
				{
					playerStats.map((player) => {
						return (renderGoalieStats(player))
					})
				}
				</tbody>
			</table>
		</div>
	)
}

PlayerStatsGoalies.propTypes = {
	position: PropTypes.string,
	playerStats: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		number: PropTypes.string,
		pos: PropTypes.string,
		shots: PropTypes.number,
		saves: PropTypes.number,
		savePercent: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		evenSaves: PropTypes.number,
		evenShotsAgainst: PropTypes.number,
		powerPlaySaves: PropTypes.number,
		powerPlayShotsAgainst: PropTypes.number,
		shortHandedSaves: PropTypes.number,
		shortHandedShotsAgainst: PropTypes.number,
		pim: PropTypes.number,
		timeOnIce: PropTypes.string,
	})),
}

export default PlayerStatsGoalies;
