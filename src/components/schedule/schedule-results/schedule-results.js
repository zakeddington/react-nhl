import React, { Component } from 'react';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../shared/loader/loader';
import Icon from '../../shared/icon/icon';
import './schedule-results.scss';

class ScheduleResults extends Component {

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderNoContent() {
		return (
			<h2>There are no games scheduled on this date.</h2>
		)
	}

	renderContent(data) {
		let dates = data.map((date) => {
			let games = date.games.map((game, i) => {
				let classGameStatus = '';

				if (game.gameStatus.includes("Final")) {
					if (game.teams.home.score > game.teams.away.score) {
						classGameStatus = 'is-home-winner';
					} else {
						classGameStatus = 'is-away-winner';
					}
				} else if (game.gameStatus === "Preview") {
					classGameStatus = 'is-preview';
				}

				return (
					<li key={game.id} className={classGameStatus}>
						<a href={`${CONSTANTS.routePaths.game}${game.id}`}>
							<div className="schedule-results-game-status">{game.gameStatus}</div>
							<div className="schedule-results-team away">
								<Icon iconId={game.teams.away.id} iconType={CONSTANTS.iconType.logo} />
								<span className="schedule-results-name">{game.teams.away.name}
									<span className="schedule-results-record">({game.teams.away.record})</span>
								</span>
								<span className="schedule-results-score">{game.teams.away.score}</span>
							</div>
							<div className="schedule-results-team home">
								<Icon iconId={game.teams.home.id} iconType={CONSTANTS.iconType.logo} />
								<span className="schedule-results-name">{game.teams.home.name}
									<span className="schedule-results-record">({game.teams.home.record})</span>
								</span>
								<span className="schedule-results-score">{game.teams.home.score}</span>
							</div>
						</a>
					</li>
				)
			});

			return (
				<div key={date.date} className="schedule-results-group">
					<h3>{date.date}</h3>
					<ul className="schedule-results-games">
						{games}
					</ul>
				</div>
			)
		});

		return (
			<div className="schedule-results">
				{dates}
			</div>
		);
	}

	render() {
		let data = this.props.scheduleGames;

		if (this.props.scheduleIsLoading) {
			return this.renderLoading();
		}

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderNoContent();
	}
}

export default ScheduleResults;
