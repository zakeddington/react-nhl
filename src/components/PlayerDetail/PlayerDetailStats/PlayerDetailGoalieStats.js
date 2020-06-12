import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';

function renderGoalieStats(data, i) {
	return (
		<tr key={`player-detail-goalie-stats-${i}`} className={data.rowClass}>
			<td className="text-left">{data.season}</td>
			<td className="text-left">{data.team}</td>
			<td>{data.games}</td>
			<td>{data.gamesStarted}</td>
			<td>{data.wins}</td>
			<td>{data.losses}</td>
			<td>{data.ties}</td>
			<td>{data.ot}</td>
			<td>{data.shotsAgainst}</td>
			<td>{data.goalsAgainst}</td>
			<td>{data.goalAgainstAverage}</td>
			<td>{data.saves}</td>
			<td>{data.savePercentage}</td>
			<td>{data.shutouts}</td>
			<td>{data.timeOnIce}</td>
		</tr>
	);
}

function PlayerDetailGoalieStats(props) {
	const { statsBySeason } = props;

	if (!statsBySeason.length) {
		return (
			<ErrorMessage errorMsg="No stats available." />
		)
	}

	return (
		<div key="player-detail-goalie-stats" className="stats-table player-stats">
			<table>
				<thead>
				<tr>
					<th className="text-left">Season</th>
					<th className="text-left">Team</th>
					<th><span className="tooltip">GP <span className="tooltip-content">Games Played</span></span></th>
					<th><span className="tooltip">GS <span className="tooltip-content">Games Started</span></span></th>
					<th><span className="tooltip">W <span className="tooltip-content">Wins</span></span></th>
					<th><span className="tooltip">L <span className="tooltip-content">Losses</span></span></th>
					<th><span className="tooltip">T <span className="tooltip-content">Ties</span></span></th>
					<th><span className="tooltip">OT <span className="tooltip-content">Overtime Losses</span></span></th>
					<th><span className="tooltip">SA <span className="tooltip-content">Shots Against</span></span></th>
					<th><span className="tooltip">GA <span className="tooltip-content">Goals Against</span></span></th>
					<th><span className="tooltip">GAA <span className="tooltip-content">Goals Against Average</span></span></th>
					<th><span className="tooltip">SV <span className="tooltip-content">Saves</span></span></th>
					<th><span className="tooltip">SV% <span className="tooltip-content">Save Percentage</span></span></th>
					<th><span className="tooltip">SO <span className="tooltip-content">Shutouts</span></span></th>
					<th><span className="tooltip">MIN <span className="tooltip-content">Minutes</span></span></th>
				</tr>
				</thead>
				<tbody>
				{
					statsBySeason.map((season, i) => {
						return (renderGoalieStats(season, i))
					})
				}
				</tbody>
			</table>
		</div>
	)
}

PlayerDetailGoalieStats.propTypes = {
	statsBySeason: PropTypes.arrayOf(PropTypes.shape({
		evenSaves: PropTypes.number,
		evenShots: PropTypes.number,
		evenStrengthSavePercentage: PropTypes.number,
		games: PropTypes.number,
		gamesStarted: PropTypes.number,
		goalAgainstAverage: PropTypes.number,
		goalsAgainst: PropTypes.number,
		losses: PropTypes.number,
		ot: PropTypes.number,
		powerPlaySavePercentage: PropTypes.number,
		powerPlaySaves: PropTypes.number,
		powerPlayShots: PropTypes.number,
		rowClass: PropTypes.string,
		savePercentage: PropTypes.number,
		saves: PropTypes.number,
		season: PropTypes.string,
		shortHandedSavePercentage: PropTypes.number,
		shortHandedSaves: PropTypes.number,
		shortHandedShots: PropTypes.number,
		shotsAgainst: PropTypes.number,
		shutouts: PropTypes.number,
		team: PropTypes.string,
		ties: PropTypes.number,
		timeOnIce: PropTypes.string,
		wins: PropTypes.number,
	})),
}

export default PlayerDetailGoalieStats;
