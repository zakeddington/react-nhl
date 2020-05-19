import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Icon from '../../Shared/Icon/Icon';
import './TeamStats.scss';

function renderTeamStatsRow(stats) {
	return (
		<tr key={stats.name}>
			<td className="stats-table--pinned team-stats--team">
				<Icon iconId={stats.id} iconType={CONSTANTS.iconType.logo}/>
				<span className="team-stats--team-name">{stats.name}</span>
			</td>
			<td className="stats-table--spacer">{stats.shots}</td>
			<td>{stats.faceOffWinPercentage}</td>
			<td>{stats.powerPlayGoals}/{stats.powerPlayOpportunities}</td>
			<td>{stats.pim}</td>
			<td>{stats.hits}</td>
			<td>{stats.blocked}</td>
			<td>{stats.giveaways}</td>
			<td>{stats.takeaways}</td>
		</tr>
	)
}

function renderContent(data) {
	return (
		<div className="stats-table team-stats">
			<table>
				<thead>
				<tr>
					<th className="stats-table--pinned">&nbsp;</th>
					<th className="stats-table--spacer"><span className="tooltip">SOG <span className="tooltip-content">Shots on Goal</span></span>
					</th>
					<th><span className="tooltip">FO% <span className="tooltip-content">Faceoff Win Percentage</span></span>
					</th>
					<th><span className="tooltip">PP <span
						className="tooltip-content">Power Play Goals/Opportunities</span></span></th>
					<th><span className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></span></th>
					<th><span className="tooltip">HT <span className="tooltip-content">Hits</span></span></th>
					<th><span className="tooltip">BS <span className="tooltip-content">Blocked Shots</span></span></th>
					<th><span className="tooltip">GV <span className="tooltip-content">Giveaways</span></span></th>
					<th><span className="tooltip">TK <span className="tooltip-content">Takeaways</span></span></th>
				</tr>
				</thead>
				<tbody>
				{
					data.map((team) => {
						return renderTeamStatsRow(team);
					})
				}
				</tbody>
			</table>
		</div>
	)
}

function TeamStats(props) {
	const {
		showLoader,
		showNoResults,
		teamStats,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No game stats available."/>;
		} else {
			content = renderContent(teamStats);
		}
	}

	return (
		<>
		{content}
		</>
	)
}

TeamStats.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	gameStatus: PropTypes.string,
	teamStats: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		shots: PropTypes.number,
		faceOffWinPercentage: PropTypes.string,
		powerPlayGoals: PropTypes.number,
		powerPlayOpportunities: PropTypes.number,
		pim: PropTypes.number,
		hits: PropTypes.number,
		blocked: PropTypes.number,
		giveaways: PropTypes.number,
		takeaways: PropTypes.number,
	})),
}

export default TeamStats;
