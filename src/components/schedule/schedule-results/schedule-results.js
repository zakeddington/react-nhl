import React from 'react';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../shared/loader/loader';
import ErrorMessage from '../../shared/error/error-message';
import Icon from '../../shared/icon/icon';
import './schedule-results.scss';

function renderContent(data) {
	const dates = data.map((date) => {
		let games = date.games.map((game) => {
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
						<div className="schedule-results--game-status">
							<span className="schedule-results--status">{game.gameStatus}</span>
							<span className="schedule-results--broadcasts">{game.broadcasts}</span>
						</div>
						<div className="schedule-results--team away">
							<Icon iconId={game.teams.away.id} iconType={CONSTANTS.iconType.logo} />
							<span className="schedule-results--name">{game.teams.away.name}
								<span className="schedule-results--record">({game.teams.away.record})</span>
								</span>
							<span className="schedule-results--score">{game.teams.away.score}</span>
						</div>
						<div className="schedule-results--team home">
							<Icon iconId={game.teams.home.id} iconType={CONSTANTS.iconType.logo} />
							<span className="schedule-results--name">{game.teams.home.name}
								<span className="schedule-results--record">({game.teams.home.record})</span>
								</span>
							<span className="schedule-results--score">{game.teams.home.score}</span>
						</div>
					</a>
				</li>
			)
		});

		return (
			<div key={date.date} className="schedule-results--group">
				<h2>{date.date}</h2>
				<ul className="schedule-results--games">
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

function ScheduleResults(props) {
	const data = props.scheduleGames;
	let content;

	if (data.length || Object.keys(data).length) {
		if (data.showNoResults) {
			content = <ErrorMessage errorMsg="There are no games scheduled on this date." />;
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

export default ScheduleResults;
