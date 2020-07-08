import React from 'react';
import PropTypes from 'prop-types';
import { IconType } from '../../../config/ImageIconConfig';
import Loader from '../../Shared/Loader/Loader';
import Icon from '../../Shared/Icon/Icon';
import { HeaderTitle } from '../../../globalStyles/Typography/Typography';
import {
	StyledScoreBoard,
	ScoreBoardResults,
	ScoreBoardTeams,
	ScoreBoardItem,
	ScoreBoardItemText,
	ScoreBoardPeriods,
} from './ScoreBoardStyle';

function getPeriodGoals(data) {
	const goals = data.map((goal) => {
		return (
			<ScoreBoardItem key={Math.random()}>
				<ScoreBoardItemText>{goal}</ScoreBoardItemText>
			</ScoreBoardItem>
		)
	});

	return (
		<>
			{goals}
		</>
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
		<StyledScoreBoard>
			<HeaderTitle>{gameStatus}</HeaderTitle>
			<ScoreBoardResults>
				<ScoreBoardTeams>
					<ScoreBoardItem>
						<ScoreBoardItemText>&nbsp;</ScoreBoardItemText>
					</ScoreBoardItem>
					<ScoreBoardItem>
						<Icon iconId={`${awayTeam.id}`} iconType={IconType.logo}/>
						<ScoreBoardItemText>{awayTeam.name}</ScoreBoardItemText>
					</ScoreBoardItem>
					<ScoreBoardItem>
						<Icon iconId={`${homeTeam.id}`} iconType={IconType.logo}/>
						<ScoreBoardItemText>{homeTeam.name}</ScoreBoardItemText>
					</ScoreBoardItem>
				</ScoreBoardTeams>
				{
					periodGoals.map((periods) => {
						return (
							<ScoreBoardPeriods key={Math.random()}>
								{getPeriodGoals(periods)}
							</ScoreBoardPeriods>
						)
					})
				}
			</ScoreBoardResults>
		</StyledScoreBoard>
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
