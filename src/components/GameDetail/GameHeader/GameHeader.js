import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../Shared/Loader/Loader';
import Icon from '../../Shared/Icon/Icon';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import './GameHeader.scss';

function GameHeader(props) {
	const {
		showLoader,
		showNoResults,
		isPreview,
		gameDate,
		gameStatus,
		awayTeam,
		homeTeam
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No game details available."/>;
		} else {
			content =
				<>
					<h1 className="offscreen">{gameDate} : {awayTeam.name} {awayTeam.score} - {homeTeam.name} {homeTeam.score}</h1>
					<div className="col game-header-date-info">
						<span className="game-header-date">{gameDate}</span>
						<span className="game-header-time">{gameStatus}</span>
					</div>
					<div className="col game-header-team away">
						<Icon iconId={awayTeam.id} iconType={CONSTANTS.iconType.logo}/>
						<div className="game-header-team-info">
							<span className="game-header-city">{awayTeam.city}</span>
							<span className="game-header-name">{awayTeam.name}</span>
							{/*<span className="game-header-record">{awayRecord}</span>*/}
						</div>
						{
							!isPreview &&
							<div className="game-header-score">{awayTeam.score}</div>
						}
					</div>
					<div className="col game-header-team home">
						<Icon iconId={homeTeam.id} iconType={CONSTANTS.iconType.logo}/>
						<div className="game-header-team-info">
							<span className="game-header-city">{homeTeam.city}</span>
							<span className="game-header-name">{homeTeam.name}</span>
							{/*<span className="game-header-record">{homeRecord}</span>*/}
						</div>
						{
							!isPreview &&
							<div className="game-header-score">{homeTeam.score}</div>
						}
					</div>
				</>;
		}
	}

	return (
		<header className="game-header">
			{content}
		</header>
	)
}

GameHeader.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	isPreview: PropTypes.bool,
	gameDate: PropTypes.string,
	gameStatus: PropTypes.string,
	awayTeam: PropTypes.shape({
		id: PropTypes.number,
		city: PropTypes.string,
		name: PropTypes.string,
		score: PropTypes.number,
	}),
	homeTeam: PropTypes.shape({
		id: PropTypes.number,
		city: PropTypes.string,
		name: PropTypes.string,
		score: PropTypes.number,
	}),
}

export default GameHeader;
