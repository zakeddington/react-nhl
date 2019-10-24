import React, { Component } from 'react';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../shared/loader/loader';
import Icon from '../../shared/icon/icon';
import './scoreboard.scss';

class Scoreboard extends Component {

	getPeriodGoals(data) {
		let goals = data.map((goal) => {
			return (
				<div key={Math.random()} className="scoreboard-item">
					<span>{goal}</span>
				</div>
			)
		});

		return (
			<div>
				{goals}
			</div>
		)
	}

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		if (data.isPreview) {
			return null;
		}

		return (
			<div className="scoreboard">
				<h3 className="header-title">{data.gameStatus}</h3>
				<div className="scoreboard-results">
					<div className="scoreboard-teams">
						<div className="scoreboard-item">
							<span>&nbsp;</span>
						</div>
						<div className="scoreboard-item">
							<Icon iconId={data.teams.away.id} iconType={CONSTANTS.iconType.logo}/>
							<span>{data.teams.away.name}</span>
						</div>
						<div className="scoreboard-item">
							<Icon iconId={data.teams.home.id} iconType={CONSTANTS.iconType.logo}/>
							<span>{data.teams.home.name}</span>
						</div>
					</div>
					{
            data.periodGoals.map((periods) => {
							return (
								<div key={Math.random()} className="col scoreboard-periods">
									{this.getPeriodGoals(periods)}
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}

	render() {
		let data = this.props.gameDetail;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default Scoreboard;
