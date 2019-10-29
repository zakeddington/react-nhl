import React, { Component } from 'react';
import PlayerDetailService from '../../../services/PlayerDetailService';
import Loader from '../loader/loader';
import PlayerPhoto from '../player-photo/player-photo';
import Tabs from '../tabs/tabs';
import Tab from '../tabs/tab';
import './modal-player-detail-content.scss';

class ModalPlayerDetailContent extends Component {

	state = {
		data: {},
	};

	componentDidMount() {
		return this.getData();
	}

	async getData() {
		try {
			const data = await PlayerDetailService.getPlayerData(this.props.contentId);

			try {
				const playerDetail = await PlayerDetailService.processPlayerData(data);
				this.setState({
					data: playerDetail,
				})
			} catch (error) {
				console.error(error);
			}

		} catch (error) {
			console.error(error);
		}
	}

	renderSeasonGoalieStats() {
		const { data } = this.state;
		return (
			<div key="player-detail-goalie-stats-season" className="stats-table player-stats">
				<table>
					<thead>
					<tr>
						<th className="stats-table--pinned text-left">Season</th>
						<th className="stats-table--spacer text-left">Team</th>
						<th className="tooltip">GP <span className="tooltip-content">Games Played</span></th>
						<th className="tooltip">GS <span className="tooltip-content">Games Started</span></th>
						<th className="tooltip">W <span className="tooltip-content">Wins</span></th>
						<th className="tooltip">L <span className="tooltip-content">Losses</span></th>
						<th className="tooltip">T <span className="tooltip-content">Ties</span></th>
						<th className="tooltip">OT <span className="tooltip-content">Overtime Losses</span></th>
						<th className="tooltip">SA <span className="tooltip-content">Shots Against</span></th>
						<th className="tooltip">GA <span className="tooltip-content">Goals Against</span></th>
						<th className="tooltip">GAA <span className="tooltip-content">Goals Against Average</span></th>
						<th className="tooltip">SV <span className="tooltip-content">Saves</span></th>
						<th className="tooltip">SV% <span className="tooltip-content">Save Percentage</span></th>
						<th className="tooltip">SO <span className="tooltip-content">Shutouts</span></th>
						<th className="tooltip">MIN <span className="tooltip-content">Minutes</span></th>
					</tr>
					</thead>
					<tbody>
					{
						data.seasonStats.map((season) => {
							return (
								<tr key={`player-detail-goalie-stats-season-${season.season}-${season.team.abbreviation}`}>
									<td className=" stats-table--pinned text-left">{season.season}</td>
									<td className=" stats-table--spacer text-left">{season.team.abbreviation}</td>
									<td>{season.stats.games}</td>
									<td>{season.stats.gamesStarted}</td>
									<td>{season.stats.wins}</td>
									<td>{season.stats.losses}</td>
									<td>{season.stats.ties}</td>
									<td>{season.stats.ot}</td>
									<td>{season.stats.shotsAgainst}</td>
									<td>{season.stats.goalsAgainst}</td>
									<td>{season.stats.goalAgainstAverage}</td>
									<td>{season.stats.saves}</td>
									<td>{season.stats.savePercentage}</td>
									<td>{season.stats.shutouts}</td>
									<td>{season.stats.timeOnIce}</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</div>
		)
	}

	renderSeasonSkaterStats() {
		const { data } = this.state;
		return (
			<div key="player-detail-skater-stats-season" className="stats-table player-stats">
				<table>
					<thead>
					<tr>
						<th className="stats-table--pinned text-left">Season</th>
						<th className="stats-table--spacer text-left">Team</th>
						<th className="tooltip">GP <span className="tooltip-content">Games Played</span></th>
						<th className="tooltip">G <span className="tooltip-content">Goals</span></th>
						<th className="tooltip">A <span className="tooltip-content">Assists</span></th>
						<th className="tooltip">P <span className="tooltip-content">Points</span></th>
						<th className="tooltip">+/- <span className="tooltip-content">Plus / Minus</span></th>
						<th className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></th>
						<th className="tooltip">PPG <span className="tooltip-content">Power Play Goals</span></th>
						<th className="tooltip">PPP <span className="tooltip-content">Power Play Points</span></th>
						<th className="tooltip">SHG <span className="tooltip-content">Shorthanded Goals</span></th>
						<th className="tooltip">SHP <span className="tooltip-content">Shorthanded Points</span></th>
						<th className="tooltip">GWG <span className="tooltip-content">Game Winning Goals</span></th>
						<th className="tooltip">OTG <span className="tooltip-content">Overtime Goals</span></th>
						<th className="tooltip">SOG <span className="tooltip-content">Shots on Goal</span></th>
						<th className="tooltip">S% <span className="tooltip-content">Shooting Percentage</span></th>
						<th className="tooltip">HT <span className="tooltip-content">Hits</span></th>
						<th className="tooltip">BS <span className="tooltip-content">Blocked Shots</span></th>
						<th className="tooltip">FO% <span className="tooltip-content">Faceoff Win Percentage</span></th>
					</tr>
					</thead>
					<tbody>
					{
						data.seasonStats.map((season) => {
							return (
								<tr key={`player-detail-goalie-stats-playoff-${season.season}-${season.team.abbreviation}`}>
									<td className="stats-table--pinned text-left">{season.season}</td>
									<td className="stats-table--spacer text-left">{season.team.abbreviation}</td>
									<td>{season.stats.games}</td>
									<td>{season.stats.goals}</td>
									<td>{season.stats.assists}</td>
									<td>{season.stats.goals + season.stats.assists}</td>
									<td>{season.stats.plusMinus}</td>
									<td>{season.stats.penaltyMinutes}</td>
									<td>{season.stats.powerPlayGoals}</td>
									<td>{season.stats.powerPlayPoints}</td>
									<td>{season.stats.shortHandedGoals}</td>
									<td>{season.stats.shortHandedPoints}</td>
									<td>{season.stats.gameWinningGoals}</td>
									<td>{season.stats.overTimeGoals}</td>
									<td>{season.stats.shots}</td>
									<td>{season.stats.shotPct}</td>
									<td>{season.stats.hits}</td>
									<td>{season.stats.blocked}</td>
									<td>{season.stats.faceOffPct}</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</div>
		)
	}

	renderPlayoffGoalieStats() {
		const { data } = this.state;
		return (
			<div key="player-detail-goalie-stats-playoff" className="stats-table player-stats">
				<table>
					<thead>
					<tr>
						<th className="stats-table--pinned text-left">Season</th>
						<th className="stats-table--spacer text-left">Team</th>
						<th className="tooltip">GP <span className="tooltip-content">Games Played</span></th>
						<th className="tooltip">GS <span className="tooltip-content">Games Started</span></th>
						<th className="tooltip">W <span className="tooltip-content">Wins</span></th>
						<th className="tooltip">L <span className="tooltip-content">Losses</span></th>
						<th className="tooltip">T <span className="tooltip-content">Ties</span></th>
						<th className="tooltip">OT <span className="tooltip-content">Overtime Losses</span></th>
						<th className="tooltip">SA <span className="tooltip-content">Shots Against</span></th>
						<th className="tooltip">GA <span className="tooltip-content">Goals Against</span></th>
						<th className="tooltip">GAA <span className="tooltip-content">Goals Against Average</span></th>
						<th className="tooltip">SV <span className="tooltip-content">Saves</span></th>
						<th className="tooltip">SV% <span className="tooltip-content">Save Percentage</span></th>
						<th className="tooltip">SO <span className="tooltip-content">Shutouts</span></th>
						<th className="tooltip">MIN <span className="tooltip-content">Minutes</span></th>
					</tr>
					</thead>
					<tbody>
					{
						data.playoffStats.map((season) => {
							return (
								<tr key={`player-detail-goalie-stats-playoff-${season.season}-${season.team.abbreviation}`}>
									<td className="stats-table--pinned text-left">{season.season}</td>
									<td className="stats-table--spacer text-left">{season.team.abbreviation}</td>
									<td>{season.stats.games}</td>
									<td>{season.stats.gamesStarted}</td>
									<td>{season.stats.wins}</td>
									<td>{season.stats.losses}</td>
									<td>{season.stats.ties}</td>
									<td>{season.stats.ot}</td>
									<td>{season.stats.shotsAgainst}</td>
									<td>{season.stats.goalsAgainst}</td>
									<td>{season.stats.goalAgainstAverage}</td>
									<td>{season.stats.saves}</td>
									<td>{season.stats.savePercentage}</td>
									<td>{season.stats.shutouts}</td>
									<td>{season.stats.timeOnIce}</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</div>
		)
	}

	renderPlayoffSkaterStats() {
		const { data } = this.state;
		return (
			<div key="player-detail-skater-stats-playoff" className="stats-table player-stats">
				<table>
					<thead>
					<tr>
						<th className="stats-table--pinned text-left">Season</th>
						<th className="stats-table--spacer text-left">Team</th>
						<th className="tooltip">GP <span className="tooltip-content">Games Played</span></th>
						<th className="tooltip">G <span className="tooltip-content">Goals</span></th>
						<th className="tooltip">A <span className="tooltip-content">Assists</span></th>
						<th className="tooltip">P <span className="tooltip-content">Points</span></th>
						<th className="tooltip">+/- <span className="tooltip-content">Plus / Minus</span></th>
						<th className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></th>
						<th className="tooltip">PPG <span className="tooltip-content">Power Play Goals</span></th>
						<th className="tooltip">PPP <span className="tooltip-content">Power Play Points</span></th>
						<th className="tooltip">SHG <span className="tooltip-content">Shorthanded Goals</span></th>
						<th className="tooltip">SHP <span className="tooltip-content">Shorthanded Points</span></th>
						<th className="tooltip">GWG <span className="tooltip-content">Game Winning Goals</span></th>
						<th className="tooltip">OTG <span className="tooltip-content">Overtime Goals</span></th>
						<th className="tooltip">SOG <span className="tooltip-content">Shots on Goal</span></th>
						<th className="tooltip">S% <span className="tooltip-content">Shooting Percentage</span></th>
						<th className="tooltip">HT <span className="tooltip-content">Hits</span></th>
						<th className="tooltip">BS <span className="tooltip-content">Blocked Shots</span></th>
						<th className="tooltip">FO% <span className="tooltip-content">Faceoff Win Percentage</span></th>
					</tr>
					</thead>
					<tbody>
					{
						data.playoffStats.map((season) => {
							return (
								<tr key={`player-detail-skater-stats-playoff-${season.season}-${season.team.abbreviation}`}>
									<td className="stats-table--pinned text-left">{season.season}</td>
									<td className="stats-table--spacer text-left">{season.team.abbreviation}</td>
									<td>{season.stats.games}</td>
									<td>{season.stats.goals}</td>
									<td>{season.stats.assists}</td>
									<td>{season.stats.goals + season.stats.assists}</td>
									<td>{season.stats.plusMinus}</td>
									<td>{season.stats.penaltyMinutes}</td>
									<td>{season.stats.powerPlayGoals}</td>
									<td>{season.stats.powerPlayPoints}</td>
									<td>{season.stats.shortHandedGoals}</td>
									<td>{season.stats.shortHandedPoints}</td>
									<td>{season.stats.gameWinningGoals}</td>
									<td>{season.stats.overTimeGoals}</td>
									<td>{season.stats.shots}</td>
									<td>{season.stats.shotPct}</td>
									<td>{season.stats.hits}</td>
									<td>{season.stats.blocked}</td>
									<td>{season.stats.faceOffPct}</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</div>
		)
	}

	getSeasonStats() {
		const { data } = this.state;

		if (data.seasonStats.length) {
			if (data.pos === 'G') {
				return (
					this.renderSeasonGoalieStats()
				)
			} else {
				return (
					this.renderSeasonSkaterStats()
				)
			}
		} else {
			return (
				<h2 className="error-msg">No regular season stats available.</h2>
			)
		}
	}

	getPlayoffStats() {
		const { data } = this.state;

		if (data.playoffStats.length) {
			if (data.pos === 'G') {
				return (
					this.renderPlayoffGoalieStats()
				)
			} else {
				return (
					this.renderPlayoffSkaterStats()
				)
			}
		} else {
			return (
				<h2 className="error-msg">No playoff stats available.</h2>
			)
		}
	}

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent() {
		const { data } = this.state;

		return (
			<div className="modal--content">
				<div className="player-detail--hero" style={{backgroundImage: 'url(' + data.hero + ')'}} />
				<div className="player-detail--bio">
					<PlayerPhoto playerId={data.id} />
					<div className="player-detail--bio-info">
						<div className="player-detail--bio-name">{data.name} #{data.number}</div>
						<div>
							<span className="player-detail--bio-stat">{data.pos} | {data.height} | {data.weight} lbs</span>
						</div>
						<div>
							<span className="player-detail--bio-stat">
								<span className="player-detail--bio-label">Shoots:</span> {data.shoots}
							</span>
						</div>
						<div>
							<span className="player-detail--bio-stat">
								<span className="player-detail--bio-label">Born:</span> {data.birthDate}
							</span>
							<span className="player-detail--bio-stat">
								<span className="player-detail--bio-label">Age:</span> {data.age}
							</span>
						</div>
						<div>
							<span className="player-detail--bio-stat">
								<span className="player-detail--bio-label">Birthplace:</span> {data.birthPlace}
							</span>
						</div>
					</div>
				</div>
				<Tabs key={`player-detail-tabs-${data.id}`}>
					<Tab tabTitle="Regular Season" id="player-detail-tabs-season">
						{ this.getSeasonStats() }
					</Tab>
					<Tab tabTitle="Playoffs" id="player-detail-tabs-playoff">
						{ this.getPlayoffStats() }
					</Tab>
				</Tabs>
			</div>
		);
	}

	renderNoContent() {
		return null;
	}

	render() {
		const { data } = this.state;

		if (data.length || Object.keys(data).length) {
			if (data.error) {
				return this.renderNoContent();
			}
			return this.renderContent();
		}

		return this.renderLoading();
	}
}

export default ModalPlayerDetailContent;
