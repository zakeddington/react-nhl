import React from 'react';
import PropTypes from 'prop-types';
import { IconType } from '../../../config/ImageIconConfig';
import { GameRoute } from '../../../config/RoutePaths';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Icon from '../../Shared/Icon/Icon';
import {
	ScheduleGames,
	Game,
	GameLink,
	Header,
	HeaderStatus,
	HeaderBroadcasts,
	Team,
	TeamName,
	TeamRecord,
	TeamScore,
} from './ScheduleResultsStyled';
import { H2 } from '../../../globalStyles/Typography/Typography';
import { ALIGN_CENTER } from '../../../globalStyles/Utilities/Modifiers';

function renderContent(data) {
	const dates = data.map((date) => {
		let games = date.games.map((game) => {
			let isPreview = game.gameStatus === "Preview";
			let isFinal = false;
			let isAwayWinner = false;
			let isHomeWinner = false;

			if (game.gameStatus.includes("Final")) {
				isFinal = true;
				if (game.homeTeam.score > game.awayTeam.score) {
					isHomeWinner = true;
				} else {
					isAwayWinner = true;
				}
			}

			return (
				<Game key={game.id}>
					<GameLink to={`${GameRoute}${game.id}`}>
						<Header>
							<HeaderStatus>{game.gameStatus}</HeaderStatus>
							<HeaderBroadcasts>{game.broadcasts}</HeaderBroadcasts>
						</Header>
						<Team $isFinal={isFinal} $isWinner={isAwayWinner}>
							<Icon iconId={`${game.awayTeam.id}`} iconType={IconType.logo} />
							<TeamName>{game.awayTeam.name}
								<TeamRecord>({game.awayTeam.record})</TeamRecord>
							</TeamName>
							{
								!isPreview &&
								<TeamScore>{game.awayTeam.score}</TeamScore>
							}
						</Team>
						<Team $isFinal={isFinal} $isWinner={isHomeWinner}>
							<Icon iconId={`${game.homeTeam.id}`} iconType={IconType.logo} />
							<TeamName>{game.homeTeam.name}
								<TeamRecord>({game.homeTeam.record})</TeamRecord>
							</TeamName>
							{
								!isPreview &&
								<TeamScore>{game.homeTeam.score}</TeamScore>
							}
						</Team>
					</GameLink>
				</Game>
			)
		});

		return (
			<div key={date.gameDate}>
				<H2>{date.gameDate}</H2>
				<ScheduleGames>
					{games}
				</ScheduleGames>
			</div>
		)
	});

	return (
		<>
			{dates}
		</>
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
			content = <ErrorMessage errorMsg="Something went terribly wrong, and it's probably your fault." modifiers={[ALIGN_CENTER]} />;
		} else if (results.length) {
			content = renderContent(results);
		} else {
			content = <ErrorMessage errorMsg="There are no games scheduled on this date." modifiers={[ALIGN_CENTER]} />;
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
