import React, { Component } from 'react';
import CONSTANTS from '../../../config/Constants';
import PlayerDetailService from '../../../services/PlayerDetail/PlayerDetailService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import PlayerPhoto from '../PlayerPhoto/PlayerPhoto';
import Tabs from '../Tabs/Tabs';
import Tab from '../Tabs/Tab';
import './ModalPlayerDetailContent.scss';

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
				this.setState({
					data: CONSTANTS.NO_DATA,
				})
			}

		} catch (error) {
			console.error(error);
			this.setState({
				data: CONSTANTS.NO_DATA,
			})
		}
	}

	renderSeasonGoalieStats() {
		const { data } = this.state;
		return (
			<div key="player-detail-goalie-stats-season" className="stats-table player-stats">
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
						data.seasonStats.map((season) => {
							return (
								<tr key={`player-detail-goalie-stats-season-${season.season}-${season.team.abbreviation}`} className={season.rowClass}>
									<td className="text-left">{season.season}</td>
									<td className="text-left">{season.team.abbreviation}</td>
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
						data.seasonStats.map((season) => {
							return (
								<tr key={`player-detail-goalie-stats-playoff-${season.season}-${season.team.abbreviation}`} className={season.rowClass}>
									<td className="text-left">{season.season}</td>
									<td className="text-left">{season.team.abbreviation}</td>
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
						data.playoffStats.map((season) => {
							return (
								<tr key={`player-detail-goalie-stats-playoff-${season.season}-${season.team.abbreviation}`} className={season.rowClass}>
									<td className="text-left">{season.season}</td>
									<td className="text-left">{season.team.abbreviation}</td>
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
						data.playoffStats.map((season) => {
							return (
								<tr key={`player-detail-skater-stats-playoff-${season.season}-${season.team.abbreviation}`} className={season.rowClass}>
									<td className="text-left">{season.season}</td>
									<td className="text-left">{season.team.abbreviation}</td>
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
				<ErrorMessage errorMsg="No regular season stats available." />
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
				<ErrorMessage errorMsg="No playoff stats available." />
			)
		}
	}

	renderContent() {
		const { data } = this.state;

		console.log(data);

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
		return (
			<div className="modal--content">
				<ErrorMessage errorMsg="No player details available." />
			</div>
		);
	}

	renderLoading() {
		return (
			<div className="modal--content">
				<Loader />
			</div>
		);
	}

	render() {
		const { data } = this.state;

		if (data.length || Object.keys(data).length) {
			if (data.showNoResults) {
				return this.renderNoContent();
			}
			return this.renderContent();
		}

		return this.renderLoading();
	}
}

export default ModalPlayerDetailContent;
