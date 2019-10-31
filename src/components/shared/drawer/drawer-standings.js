import React, { Component } from 'react';
import CONSTANTS from '../../../config/Constants';
import StandingsService from '../../../services/StandingsService';
import Loader from '../loader/loader';
import ErrorMessage from '../error/error-message';
import './drawer-standings.scss';

class DrawerStandings extends Component {

	state = {
		data: [],
	};

	componentDidMount() {
		return this.getData();
	}

	async getData() {
		try {
			const data = await StandingsService.getStandingsData();
			console.log('DrawerStandings getData', data);

			try {
				const standings = await StandingsService.processStandingsData(data);
				console.log('DrawerStandings standings', standings);
				this.setState({
					data: standings,
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

	renderDivisionStandings() {
		const { data } = this.state;

		return data.map((group) => {
			return (
				<div key={group.division.name} className="stats-table standings">
					<table>
						<thead>
						<tr>
							<th className="text-left" colSpan="2">{group.division.name}</th>
							<th className="tooltip">GP <span className="tooltip-content">Games Played</span></th>
							<th className="tooltip">W <span className="tooltip-content">Wins (2pts)</span></th>
							<th className="tooltip">L <span className="tooltip-content">Losses (0pts)</span></th>
							<th className="tooltip">OT <span className="tooltip-content">Overtime/Shootout Loss (1pt)</span></th>
							<th className="tooltip">PTS <span className="tooltip-content">Points</span></th>
						</tr>
						</thead>
						<tbody>
						{
							group.teamRecords.map((team) => {
								return (
									<tr key={team.team.name}>
										<td>{team.divisionRank}</td>
										<td className="standings--team-name text-left">{team.team.name}</td>
										<td>{team.gamesPlayed}</td>
										<td>{team.leagueRecord.wins}</td>
										<td>{team.leagueRecord.losses}</td>
										<td>{team.leagueRecord.ot}</td>
										<td>{team.points}</td>
									</tr>
								)
							})
						}
						</tbody>
					</table>
				</div>
			)
		})
	}

	renderContent() {
		const { data } = this.state;

		console.log('drawer content', data);

		return (
			<div className="drawer--content">
				{ this.renderDivisionStandings() }
			</div>
		);
	}

	renderNoContent() {
		return (
			<div className="drawer--content">
				<ErrorMessage errorMsg="No standings available." />
			</div>
		);
	}

	renderLoading() {
		return (
			<div className="drawer--content">
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

export default DrawerStandings;
