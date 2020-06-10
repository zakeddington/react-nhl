import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../Shared/Loader/Loader';
import Icon from '../../Shared/Icon/Icon';
import './ScoreBoard.scss';

function getPeriodGoals(data) {
	const goals = data.map((goal) => {
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

function renderContent(props) {
	const {
		gameStatus,
		awayTeam,
		homeTeam,
		periodGoals,
	} = props;

	return (
		<div className="scoreboard">
			<h3 className="header-title">{gameStatus}</h3>
			<div className="scoreboard-results">
				<div className="scoreboard-teams">
					<div className="scoreboard-item">
						<span>&nbsp;</span>
					</div>
					<div className="scoreboard-item">
						<Icon iconId={`${awayTeam.id}`} iconType={CONSTANTS.iconType.logo}/>
						<span>{awayTeam.name}</span>
					</div>
					<div className="scoreboard-item">
						<Icon iconId={`${homeTeam.id}`} iconType={CONSTANTS.iconType.logo}/>
						<span>{homeTeam.name}</span>
					</div>
				</div>
				{
					periodGoals.map((periods) => {
						return (
							<div key={Math.random()} className="col scoreboard-periods">
								{getPeriodGoals(periods)}
							</div>
						)
					})
				}
			</div>
		</div>
	);
}

function ScoreBoard(props) {
	const {
		showLoader,
		showNoResults,
		isPreview,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults || isPreview) {
			content = '';
		} else {
			content = renderContent(props);
		}
	}

	return (
		<>
			{content}
		</>
	)
}

ScoreBoard.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	isPreview: PropTypes.bool,
	gameStatus: PropTypes.string,
	awayTeam: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),
	homeTeam: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),
	periodGoals: PropTypes.array,
}

export default ScoreBoard;
