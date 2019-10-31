import React, { Component } from 'react';
import CONSTANTS from '../../../config/Constants';
import StandingsService from '../../../services/StandingsService';
import Loader from '../loader/loader';
import ErrorMessage from '../error/error-message';
import Icon from '../icon/icon';
import Tabs from '../tabs/tabs';
import Tab from '../tabs/tab';
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

	renderTable(group) {
		return (
			<div key={group.name} className="stats-table standings--group">
				<table>
					<thead>
					<tr>
						<th className="text-left" colSpan="2">{group.name}</th>
						<th className="tooltip">GP <span className="tooltip-content">Games Played</span></th>
						<th className="tooltip">W <span className="tooltip-content">Wins (2pts)</span></th>
						<th className="tooltip">L <span className="tooltip-content">Losses (0pts)</span></th>
						<th className="tooltip">OT <span className="tooltip-content">Overtime/Shootout Loss (1pt)</span></th>
						<th className="tooltip">PTS <span className="tooltip-content">Points</span></th>
					</tr>
					</thead>
					<tbody>
					{
						group.teams.map((team) => {
							return (
								<tr key={team.name}>
									<td>{team.rank}</td>
									<td className="standings--team text-left">
										<Icon iconId={team.id} iconType={CONSTANTS.iconType.logo} />
										<span className="standings--team-name">{team.name}</span>
									</td>
									<td>{team.games}</td>
									<td>{team.wins}</td>
									<td>{team.losses}</td>
									<td>{team.ot}</td>
									<td>{team.points}</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</div>
		)
	}

	renderDivisionStandings() {
		const { division } = this.state.data;

		return division.map((conference) => {
			return (
				<div key={`division-standings-${conference.name}`} className="standings--conference">
					<h2>{conference.name}</h2>
					{
						conference.division.map((division) => {
							return this.renderTable(division);
						})
					}
				</div>
			)
		})
	}

	renderConferenceStandings() {
		const { conference } = this.state.data;

		return conference.map((conference) => {
			return (
				<div key={`conference-standings-${conference.name}`} className="standings--conference">
					<h2>{conference.name}</h2>
					{
						this.renderTable(conference)
					}
				</div>
			)
		})
	}

	renderLeagueStandings() {
		const { league } = this.state.data;

		return league.map((league) => {
			return (
				<div key={`league-standings-${league.name}`} className="standings--league">
					<h2>{league.name}</h2>
					{
						this.renderTable(league)
					}
				</div>
			)
		})
	}

	renderContent() {
		const { data } = this.state;

		console.log('drawer content', data);

		return (
			<div className="drawer--content standings">
				<Tabs key="tabs-standings" tabsClass="standings--tabs">
					<Tab key="tab-division-standings" id="tab-division-standings" tabTitle="Division">
						{ this.renderDivisionStandings() }
					</Tab>
					<Tab key="tab-conference-standings" id="tab-conference-standings" tabTitle="Conference">
						{ this.renderConferenceStandings() }
					</Tab>
					<Tab key="tab-league-standings" id="tab-league-standings" tabTitle="League">
						{ this.renderLeagueStandings() }
					</Tab>
				</Tabs>
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
