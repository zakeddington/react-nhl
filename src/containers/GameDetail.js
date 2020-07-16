import React, { Component } from 'react';
import { SiteContent } from '../globalStyles/Layout/Layout';
import GameHeader from '../components/GameDetail/GameHeader/GameHeader';
import GameIntro from '../components/GameDetail/GameIntro/GameIntro';
import ScoreBoard from '../components/GameDetail/ScoreBoard/ScoreBoard';
import Stars from '../components/GameDetail/Stars/Stars';
import PeriodSummary from '../components/GameDetail/PeriodSummary/PeriodSummary';
import BoxscoreTeams from '../components/GameDetail/BoxscoreTeams/BoxscoreTeams';
import BoxscorePlayersByTeam from '../components/GameDetail/BoxscorePlayers/BoxscorePlayersByTeam';
import Tabs from '../components/Shared/Tabs/Tabs';
import Tab from '../components/Shared/Tabs/Tab';

import GameDetailService from '../services/GameDetail/GameDetailService';
import { GameDetailInitialState } from '../services/GameDetail/GameDetailService';

import { ScoreBoardStarsContainer } from '../components/GameDetail/ScoreBoard/ScoreBoardStyled';

class GameDetail extends Component {
	state = {
		...GameDetailInitialState,

		dataGameHeader: {
			awayTeam: {},
			homeTeam: {},
		},
		dataScoreBoard: {
			awayTeam: {},
			homeTeam: {},
			periodGoals: [],
		},
		dataStars: [],
		dataPeriodSummary: [],
		dataBoxscoreTeams: [],
		dataBoxscorePlayers: [],
		dataGameContent: {
			intro: {},
			videos: [],
		},

		isGameHeaderError: false,
		isScoreBoardError: false,
		isStarsError: false,
		isPeriodSummaryError: false,
		isBoxscoreTeamsError: false,
		isBoxscorePlayersError: false,
		isGameContentError: false,
	};

	fetchGameDetail(gameId) {
		return (async () => {
			try {
				const data = await GameDetailService.getGameData(gameId);

				let isPreview = data.isPreview;
				let gameDate = data.gameDate;
				let gameStatus = data.gameStatus;

				let {
					dataGameHeader,
					dataScoreBoard,
					dataStars,
					dataPeriodSummary,
					dataBoxscoreTeams,
					dataBoxscorePlayers,
					isGameHeaderError,
					isScoreBoardError,
					isStarsError,
					isPeriodSummaryError,
					isBoxscoreTeamsError,
					isBoxscorePlayersError,
				} = this.state;

				try {
					dataGameHeader = await GameDetailService.processGameHeaderData(data);
				} catch (error) {
					console.error(error);
					isGameHeaderError = true;
				}

				try {
					dataScoreBoard = await GameDetailService.processScoreBoardData(data);
				} catch (error) {
					console.error(error);
					isScoreBoardError = true;
				}

				try {
					dataStars = await GameDetailService.processStarsData(data);
				} catch (error) {
					console.error(error);
					isStarsError = true;
				}

				try {
					dataPeriodSummary = await GameDetailService.processPeriodSummaryData(data);
				} catch (error) {
					console.error(error);
					isPeriodSummaryError = true;
				}

				try {
					dataBoxscoreTeams = await GameDetailService.processBoxscoreTeamsData(data);
				} catch (error) {
					console.error(error);
					isBoxscoreTeamsError = true;
				}

				try {
					dataBoxscorePlayers = await GameDetailService.processBoxscorePlayersData(data);
				} catch (error) {
					console.error(error);
					isBoxscorePlayersError = true;
				}

				this.setState({
					showLoader: false,
					isPreview,
					gameDate,
					gameStatus,
					dataGameHeader,
					dataScoreBoard,
					dataStars,
					dataPeriodSummary,
					dataBoxscoreTeams,
					dataBoxscorePlayers,
					isGameHeaderError,
					isScoreBoardError,
					isStarsError,
					isPeriodSummaryError,
					isBoxscoreTeamsError,
					isBoxscorePlayersError,
				});

			} catch (error) {
				console.error(error);
				this.setState({
					showLoader: false,
				});
			}
		})();
	}

	fetchGameContent(gameId) {
		return (async () => {
			try {
				const data = await GameDetailService.getGameContent(gameId);

				let {
					dataGameContent,
					isGameContentError,
				} = this.state;

				try {
					dataGameContent = await GameDetailService.processGameContent(data);
				} catch (error) {
					console.error(error);
					isGameContentError = true;
				}

				this.setState({
					showGameContentLoader: false,
					dataGameContent,
					isGameContentError,
				});

			} catch (error) {
				console.error(error);
				this.setState({
					showGameContentLoader: false,
				});
			}
		})();
	}

	componentDidMount() {
		let path = this.props.location.pathname;
		let gameId = path.match(/([^/]*)\/*$/)[1];

		this.fetchGameDetail(gameId);
		this.fetchGameContent(gameId);
	}

	render() {
		const {
			showLoader,
			showGameContentLoader,
			isPreview,
			gameDate,
			gameStatus,
			dataGameHeader,
			dataScoreBoard,
			dataStars,
			dataPeriodSummary,
			dataBoxscoreTeams,
			dataBoxscorePlayers,
			dataGameContent,
			isGameContentError,
			isGameHeaderError,
			isScoreBoardError,
			isStarsError,
			isPeriodSummaryError,
			isBoxscoreTeamsError,
			isBoxscorePlayersError,
		} = this.state;

		return (
			<SiteContent>
				<GameHeader
					showLoader={showLoader}
					showNoResults={isGameHeaderError}
					isPreview={isPreview}
					gameDate={gameDate}
					gameStatus={gameStatus}
					awayTeam={dataGameHeader.awayTeam}
					homeTeam={dataGameHeader.homeTeam} />

				<GameIntro
					showLoader={showGameContentLoader}
					showNoResults={isGameContentError}
					intro={dataGameContent.intro}
					videos={dataGameContent.videos} />

				<ScoreBoardStarsContainer>
					<ScoreBoard
						showLoader={showLoader}
						showNoResults={isScoreBoardError}
						isPreview={isPreview}
						gameStatus={gameStatus}
						awayTeam={dataScoreBoard.awayTeam}
						homeTeam={dataScoreBoard.homeTeam}
						periodGoals={dataScoreBoard.periodGoals} />

					<Stars
						showLoader={showLoader}
						showNoResults={isStarsError}
						isPreview={isPreview}
						stars={dataStars} />
				</ScoreBoardStarsContainer>
				{
					!isPreview &&
					<Tabs>
						<Tab id="tab-period-summary" tabTitle="Period Summary">
							<PeriodSummary
								showLoader={showLoader}
								showNoResults={isPeriodSummaryError}
								periodSummary={dataPeriodSummary} />
						</Tab>
						<Tab id="tab-boxscore" tabTitle="Boxscore">
							<BoxscoreTeams
								showLoader={showLoader}
								showNoResults={isBoxscoreTeamsError}
								boxscoreTeams={dataBoxscoreTeams} />
							<BoxscorePlayersByTeam
								showLoader={showLoader}
								showNoResults={isBoxscorePlayersError}
								boxscorePlayersByTeam={dataBoxscorePlayers} />
						</Tab>
					</Tabs>
				}
			</SiteContent>
		);
	}
}

export default GameDetail;
