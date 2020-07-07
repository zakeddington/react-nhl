import React from 'react';
import PropTypes from 'prop-types';
import { IconType } from '../../../config/ImageIconConfig';
import Loader from '../../Shared/Loader/Loader';
import Icon from '../../Shared/Icon/Icon';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import { Offscreen } from '../../../globalStyles/Utilities/Utilities';
import {
	StyledGameHeader,
	DateColumn,
	AwayTeamColumn,
	HomeTeamColumn,
	TeamInfo,
	TeamInfoCity,
	TeamInfoName,
	TeamScore,
} from './GameHeaderStyle';

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
					<Offscreen as="h1">{gameDate} : {awayTeam.name} {awayTeam.score} - {homeTeam.name} {homeTeam.score}</Offscreen>
					<DateColumn>
						<span className="game-header-date">{gameDate}</span>
						<span className="game-header-time">{gameStatus}</span>
					</DateColumn>
					<AwayTeamColumn>
						<Icon iconId={`${awayTeam.id}`} iconType={IconType.logo}/>
						<TeamInfo>
							<TeamInfoCity>{awayTeam.city}</TeamInfoCity>
							<TeamInfoName>{awayTeam.name}</TeamInfoName>
							{/*<span className="game-header-record">{awayRecord}</span>*/}
						</TeamInfo>
						{
							!isPreview &&
							<TeamScore>{awayTeam.score}</TeamScore>
						}
					</AwayTeamColumn>
					<HomeTeamColumn>
						<Icon iconId={`${homeTeam.id}`} iconType={IconType.logo}/>
						<TeamInfo>
							<TeamInfoCity>{homeTeam.city}</TeamInfoCity>
							<TeamInfoName>{homeTeam.name}</TeamInfoName>
							{/*<span className="game-header-record">{homeRecord}</span>*/}
						</TeamInfo>
						{
							!isPreview &&
							<TeamScore>{homeTeam.score}</TeamScore>
						}
					</HomeTeamColumn>
				</>;
		}
	}

	return (
		<StyledGameHeader>
			{content}
		</StyledGameHeader>
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
