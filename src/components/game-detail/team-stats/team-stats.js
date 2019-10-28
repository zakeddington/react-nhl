import React, {Component} from 'react';
// import CONSTANTS from '../../../config/Constants';
import Loader from '../../shared/loader/loader';
// import Icon from '../../shared/icon/icon';
import Tabs from "../../shared/tabs/tabs";
import Tab from "../../shared/tabs/tab";
import './team-stats.scss';

class TeamStats extends Component {

	renderLoading() {
		return (
			<Loader />
		);
	}

	getSkaterStats(playersByPosition, key) {
		// console.log('getSkaterStats data', data);
		const players = playersByPosition.map((player) => {
			return (
				<tr key={player.id}>
					<td className="stats-table--pinned stats-table--jersey">{player.number}</td>
					<td className="stats-table--pinned text-left stats-table--name">{player.name}, {player.pos}</td>
					<td className="stats-table--spacer">{player.stats.goals}</td>
					<td>{player.stats.assists}</td>
					<td>{player.stats.goals + player.stats.assists}</td>
					<td>{player.stats.plusMinus}</td>
					<td>{player.stats.penaltyMinutes}</td>
					<td>{player.stats.shots}</td>
					<td>{player.stats.hits}</td>
					<td>{player.stats.blocked}</td>
					<td>{player.stats.giveaways}</td>
					<td>{player.stats.takeaways}</td>
					<td>{player.stats.faceOffWins}</td>
					<td>{player.stats.faceoffTaken}</td>
					<td>{player.stats.faceOffPercent}</td>
					<td>{player.stats.timeOnIce}</td>
					<td>{player.stats.powerPlayTimeOnIce}</td>
				</tr>
			)
		});

		return (
			<div key={key} className="stats-table team-stats">
				<table>
					<thead>
					<tr>
						<th className="stats-table--pinned stats-table--jersey">&nbsp;</th>
						<th className="stats-table--pinned stats-table--name text-left">{playersByPosition.position}</th>
						<th className="stats-table--spacer tooltip">G <span className="tooltip-content">Goals</span></th>
						<th className="tooltip">A <span className="tooltip-content">Assists</span></th>
						<th className="tooltip">P <span className="tooltip-content">Points</span></th>
						<th className="tooltip">+/- <span className="tooltip-content">Plus / Minus</span></th>
						<th className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></th>
						<th className="tooltip">SOG <span className="tooltip-content">Shots on Goal</span></th>
						<th className="tooltip">HT <span className="tooltip-content">Hits</span></th>
						<th className="tooltip">BS <span className="tooltip-content">Blocked Shots</span></th>
						<th className="tooltip">GV <span className="tooltip-content">Giveaways</span></th>
						<th className="tooltip">TK <span className="tooltip-content">Takeaways</span></th>
						<th className="tooltip">FW <span className="tooltip-content">Faceoff Win</span></th>
						<th className="tooltip">FL <span className="tooltip-content">Faceoff Loss</span></th>
						<th className="tooltip">FO% <span className="tooltip-content">Faceoff Win Percentage</span></th>
						<th className="tooltip">TOI <span className="tooltip-content">Total On Ice Time</span></th>
						<th className="tooltip">PP TOI <span className="tooltip-content">Power Play Total On Ice Time</span></th>
					</tr>
					</thead>
					<tbody>
						{players}
					</tbody>
				</table>
			</div>
		)
	}

	getGoalieStats(playersByPosition, key) {
		// console.log('getGoalieStats data', data);
		const players = playersByPosition.map((player) => {
			return (
				<tr key={player.id}>
					<td className="stats-table--pinned stats-table--jersey">{player.number}</td>
					<td className="stats-table--pinned stats-table--name text-left">{player.name}, {player.pos}</td>
					<td className="stats-table--spacer">{player.stats.shots - player.stats.saves}</td>
					<td>{player.stats.shots}</td>
					<td>{player.stats.saves}</td>
					<td>{player.stats.savePercent}</td>
					<td>{player.stats.evenSaves} - {player.stats.evenShotsAgainst}</td>
					<td>{player.stats.powerPlaySaves} - {player.stats.powerPlayShotsAgainst}</td>
					<td>{player.stats.shortHandedSaves} - {player.stats.shortHandedShotsAgainst}</td>
					<td>{player.stats.pim}</td>
					<td>{player.stats.timeOnIce}</td>
				</tr>
			)
		});

		return (
			<div key={key} className="stats-table team-stats goalie-stats">
				<table>
					<thead>
					<tr>
						<th className="stats-table--pinned stats-table--jersey">&nbsp;</th>
						<th className="stats-table--pinned stats-table--name text-left">{playersByPosition.position}</th>
						<th className="stats-table--spacer tooltip">GA <span className="tooltip-content">Goals Against</span></th>
						<th className="tooltip">SA <span className="tooltip-content">Shots Against</span></th>
						<th className="tooltip">SV <span className="tooltip-content">Saves</span></th>
						<th className="tooltip">SV% <span className="tooltip-content">Save Percentage</span></th>
						<th className="tooltip">EV <span className="tooltip-content">Even Strength Saves-Shots</span></th>
						<th className="tooltip">PP <span className="tooltip-content">Power Play Saves-Shots</span></th>
						<th className="tooltip">SH <span className="tooltip-content">Shorthanded Saves-Shots</span></th>
						<th className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></th>
						<th className="tooltip">TOI <span className="tooltip-content">Total On Ice Time</span></th>
					</tr>
					</thead>
					<tbody>
						{players}
					</tbody>
				</table>
			</div>
		)
	}

	renderContent(data) {
		if (data.isPreview) {
			return null;
		}

		if (data.teams.length) {
			const teamStats = data.teams.map((team) => {
				const players = team.stats.map((group) => {
					const key = `${team.id}-${group.position}`;
					if (group.position === 'Goalies') {
						return this.getGoalieStats(group.players, key);
					} else {
						return this.getSkaterStats(group.players, key);
					}
				});

				return (
					<Tab key={team.id} id={`tab-team-stats-${team.id}`} tabTitle={team.name}>
						{players}
					</Tab>
				)
			});

			return (
				<Tabs key="tabs-team-stats">
					{teamStats}
				</Tabs>
			);
		}

		return null;
	}

	renderNoContent() {
		return (
			<h2 className="error-msg">No team stats available.</h2>
		);
	}

	render() {
		let data = this.props.teamStats;

		if (data.length || Object.keys(data).length) {
			if (data.error) {
				return this.renderNoContent();
			}
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default TeamStats;
