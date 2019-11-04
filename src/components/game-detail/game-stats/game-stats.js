import React, { Component } from 'react';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../shared/loader/loader';
import ErrorMessage from '../../shared/error/error-message';
import Icon from '../../shared/icon/icon';
import './game-stats.scss';

class GameStats extends Component {

	getTeamStats(data, name) {
		let stats = data.teamStats.teamSkaterStats;
		let teamId = data.team.id;
    return (
			<tr key={data.team.name}>
				<td className="stats-table--pinned game-stats--team">
					<Icon iconId={teamId} iconType={CONSTANTS.iconType.logo} />
					<span className="game-stats--team-name">{name}</span>
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

	renderContent(data) {
		if (data.isPreview) {
			return null;
		}

		return (
			<div className="stats-table game-stats">
				<table>
					<thead>
						<tr>
							<th className="stats-table--pinned">&nbsp;</th>
							<th className="stats-table--spacer"><span className="tooltip">SOG <span className="tooltip-content">Shots on Goal</span></span></th>
							<th><span className="tooltip">FO% <span className="tooltip-content">Faceoff Win Percentage</span></span></th>
							<th><span className="tooltip">PP <span className="tooltip-content">Power Play Goals/Opportunities</span></span></th>
							<th><span className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></span></th>
							<th><span className="tooltip">HT <span className="tooltip-content">Hits</span></span></th>
							<th><span className="tooltip">BS <span className="tooltip-content">Blocked Shots</span></span></th>
							<th><span className="tooltip">GV <span className="tooltip-content">Giveaways</span></span></th>
							<th><span className="tooltip">TK <span className="tooltip-content">Takeaways</span></span></th>
						</tr>
					</thead>
					<tbody>
						{
							this.getTeamStats(data.boxscoreTeams.away, data.teams.away.name)
						}
						{
							this.getTeamStats(data.boxscoreTeams.home, data.teams.home.name)
						}
					</tbody>
				</table>
			</div>
		);
	}

  renderNoContent() {
    return (
			<ErrorMessage errorMsg="No game stats available." />
    );
  }

	renderLoading() {
		return (
			<Loader />
		);
	}

	render() {
		let data = this.props.gameDetail;

		if (data.length || Object.keys(data).length) {
			if (data.showNoResults || data.isPreview) {
        return this.renderNoContent();
      }
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default GameStats;
