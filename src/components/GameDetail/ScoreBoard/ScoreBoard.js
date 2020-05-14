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

function renderContent(data) {
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
	const data = props.gameDetail;
	let content;

	if (data) {
		if (data.showNoResults || data.isPreview) {
			content = '';
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

ScoreBoard.propTypes = {
	data: PropTypes.object,
}

export default ScoreBoard;
