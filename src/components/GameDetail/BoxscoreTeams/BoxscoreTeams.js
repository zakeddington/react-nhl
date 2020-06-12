import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Icon from '../../Shared/Icon/Icon';
import './BoxscoreTeams.scss';

function renderBoxscoreTeamRow(team) {
	return (
		<tr key={team.name}>
			<td className="stats-table--pinned boxscore-teams--team">
				<Icon iconId={`${team.id}`} iconType={CONSTANTS.iconType.logo}/>
				<span className="boxscore-teams--team-name">{team.name}</span>
			</td>
			<td className="stats-table--spacer">{team.shots}</td>
			<td>{team.faceOffWinPercentage}</td>
			<td>{team.powerPlayGoals}/{team.powerPlayOpportunities}</td>
			<td>{team.pim}</td>
			<td>{team.hits}</td>
			<td>{team.blocked}</td>
			<td>{team.giveaways}</td>
			<td>{team.takeaways}</td>
		</tr>
	)
}

function renderContent(data) {
	return (
		<div className="stats-table boxscore-teams">
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
						return renderBoxscoreTeamRow(team);
					})
				}
				</tbody>
			</table>
		</div>
	)
}

function BoxscoreTeams(props) {
	const {
		showLoader,
		showNoResults,
		boxscoreTeams,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No team boxscore available."/>;
		} else {
			content = renderContent(boxscoreTeams);
		}
	}

	return (
		<>
		{content}
		</>
	)
}

BoxscoreTeams.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	gameStatus: PropTypes.string,
	boxscoreTeams: PropTypes.arrayOf(PropTypes.shape({
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

export default BoxscoreTeams;
