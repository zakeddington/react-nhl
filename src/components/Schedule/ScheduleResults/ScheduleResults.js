import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Icon from '../../Shared/Icon/Icon';
import './ScheduleResults.scss';

function renderContent(data) {
	const dates = data.map((date) => {
		let games = date.games.map((game) => {
			let classGameStatus = '';

			if (game.gameStatus.includes("Final")) {
				if (game.homeTeam.score > game.awayTeam.score) {
					classGameStatus = 'is-home-winner';
				} else {
					classGameStatus = 'is-away-winner';
				}
			} else if (game.gameStatus === "Preview") {
				classGameStatus = 'is-preview';
			}

			return (
				<li key={game.id} className={classGameStatus}>
					<Link to={`${CONSTANTS.routePaths.game}${game.id}`}>
						<div className="schedule-results--game-status">
							<span className="schedule-results--status">{game.gameStatus}</span>
							<span className="schedule-results--broadcasts">{game.broadcasts}</span>
						</div>
						<div className="schedule-results--team away">
							<Icon iconId={`${game.awayTeam.id}`} iconType={CONSTANTS.iconType.logo} />
							<span className="schedule-results--name">{game.awayTeam.name}
								<span className="schedule-results--record">({game.awayTeam.record})</span>
								</span>
							<span className="schedule-results--score">{game.awayTeam.score}</span>
						</div>
						<div className="schedule-results--team home">
							<Icon iconId={`${game.homeTeam.id}`} iconType={CONSTANTS.iconType.logo} />
							<span className="schedule-results--name">{game.homeTeam.name}
								<span className="schedule-results--record">({game.homeTeam.record})</span>
								</span>
							<span className="schedule-results--score">{game.homeTeam.score}</span>
						</div>
					</Link>
				</li>
			)
		});

		return (
			<div key={date.gameDate} className="schedule-results--group">
				<h2>{date.gameDate}</h2>
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
	const {
		showLoader,
		showError,
		results,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showError) {
			content = <ErrorMessage errorMsg="Something went terribly wrong, and it's probably your fault." errorClass="text-center" />;
		} else if (results.length) {
			content = renderContent(results);
		} else {
			content = <ErrorMessage errorMsg="There are no games scheduled on this date." errorClass="text-center" />;
		}
	}

	return (
		<>
			{content}
		</>
	)
}

ScheduleResults.propTypes = {
	showLoader: PropTypes.bool,
	showError: PropTypes.bool,
	results: PropTypes.arrayOf(PropTypes.shape({
		gameDate: PropTypes.string,
		games: PropTypes.arrayOf(PropTypes.shape({
			broadcasts: PropTypes.string,
			gameStatus: PropTypes.string,
			id: PropTypes.number,
			awayTeam: PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				record: PropTypes.string,
				score: PropTypes.number,
			}),
			homeTeam: PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				record: PropTypes.string,
				score: PropTypes.number,
			}),
		})),
	})),
}

export default ScheduleResults;
