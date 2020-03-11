import React from 'react';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../shared/loader/loader';
import ErrorMessage from '../../shared/error/error-message';
import Tabs from '../../shared/tabs/tabs';
import Tab from '../../shared/tabs/tab';
import Modal from '../../shared/modal/modal';
import ModalPlayerDetailContent from '../../shared/modal/modal-player-detail-content';
import './team-stats.scss';

function getSkaterStats(group, key) {
	// console.log('getSkaterStats group', group);
	const players = group.players.map((player) => {
		return (
			<tr key={player.id}>
				<td className="stats-table--pinned stats-table--jersey">{player.number}</td>
				<td className="stats-table--pinned text-left stats-table--name">
					<Modal content={<ModalPlayerDetailContent contentId={player.id}/>} modalClass="player-detail">
						{player.name}
						<span className="offscreen">Open player details for {player.name} in modal window</span>
					</Modal>, {player.pos}</td>
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
					<th className="stats-table--pinned stats-table--name text-left">{group.position}</th>
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
				{players}
				</tbody>
			</table>
		</div>
	)
}

function getGoalieStats(group, key) {
	// console.log('getGoalieStats group', group);
	const players = group.players.map((player) => {
		return (
			<tr key={player.id}>
				<td className="stats-table--pinned stats-table--jersey">{player.number}</td>
				<td className="stats-table--pinned stats-table--name text-left">
					<Modal content={<ModalPlayerDetailContent contentId={player.id}/>} modalClass="player-detail">
						{player.name}
						<span className="offscreen">Open player details for {player.name} in modal window</span>
					</Modal>, {player.pos}</td>
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
					<th className="stats-table--pinned stats-table--name text-left">{group.position}</th>
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
				{players}
				</tbody>
			</table>
		</div>
	)
}

function renderContent(data) {
	if (data.isPreview) {
		return null;
	}

	if (data.teams.length) {
		const teamStats = data.teams.map((team) => {
			const players = team.stats.map((group) => {
				const key = `${team.id}-${group.position}`;
				if (group.position === 'Goalies') {
					return getGoalieStats(group, key);
				} else {
					return getSkaterStats(group, key);
				}
			});

			return (
				<Tab key={team.id} id={`tab-team-stats-${team.id}`} tabTitle={team.name} iconId={team.id} iconType={CONSTANTS.iconType.logo}>
					{players}
				</Tab>
			)
		});

		return (
			<Tabs key="tabs-team-stats" tabsClass="team-stats--tabs">
				{teamStats}
			</Tabs>
		);
	}

	return null;
}

function TeamStats(props) {
	const data = props.teamStats;
	let content;

	if (data.length || Object.keys(data).length) {
		if (data.showNoResults || data.isPreview) {
			content = <ErrorMessage errorMsg="No team stats available."/>;
		} else {
			content = renderContent(data);
		}
	} else {
		content = <Loader/>;
	}

	return (
		<>
			{content}
		</>
	)
}

export default TeamStats;
