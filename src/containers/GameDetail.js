import React, { Component } from 'react';
import GameHeader from '../components/GameDetail/GameHeader/GameHeader';
import GameIntro from '../components/GameDetail/GameIntro/GameIntro';
import ScoreBoard from '../components/GameDetail/ScoreBoard/ScoreBoard';
import Stars from '../components/GameDetail/Stars/Stars';
import PeriodSummary from '../components/GameDetail/PeriodSummary/PeriodSummary';
import TeamStats from '../components/GameDetail/TeamStats/TeamStats';
import PlayerStatsByTeam from '../components/GameDetail/PlayerStats/PlayerStatsByTeam';
import Tabs from '../components/Shared/Tabs/Tabs';
import Tab from '../components/Shared/Tabs/Tab';

import GameDetailService from '../services/GameDetail/GameDetailService';
import { GameDetailInitialState } from '../services/GameDetail/GameDetailService';

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
		dataTeamStats: [],
		dataPlayerStats: [],
		dataGameContent: {
			intro: {},
			videos: [],
		},

		isGameHeaderError: false,
		isScoreBoardError: false,
		isStarsError: false,
		isPeriodSummaryError: false,
		isTeamStatsError: false,
		isPlayerStatsError: false,
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
					dataTeamStats,
					dataPlayerStats,
					isGameHeaderError,
					isScoreBoardError,
					isStarsError,
					isPeriodSummaryError,
					isTeamStatsError,
					isPlayerStatsError,
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
					dataPeriodSummary = await GameDetailService.processPeriodSummary(data);
				} catch (error) {
					console.error(error);
					isPeriodSummaryError = true;
				}

				try {
					dataTeamStats = await GameDetailService.processTeamStatsData(data);
				} catch (error) {
					console.error(error);
					isTeamStatsError = true;
				}

				try {
					dataPlayerStats = await GameDetailService.processPlayerStats(data);
				} catch (error) {
					console.error(error);
					isPlayerStatsError = true;
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
					dataTeamStats,
					dataPlayerStats,
					isGameHeaderError,
					isScoreBoardError,
					isStarsError,
					isPeriodSummaryError,
					isTeamStatsError,
					isPlayerStatsError,
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
			dataTeamStats,
			dataPlayerStats,
			dataGameContent,
			isGameContentError,
			isGameHeaderError,
			isScoreBoardError,
			isStarsError,
			isPeriodSummaryError,
			isTeamStatsError,
			isPlayerStatsError,
		} = this.state;

		return (
			<div className="site-content container">
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

				<div className="scoreboard-stars">
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
				</div>
				{
					!isPreview &&
					<Tabs>
						<Tab id="tab-period-summary" tabTitle="Period Summary">
							<PeriodSummary
								showLoader={showLoader}
								showNoResults={isPeriodSummaryError}
								periodSummary={dataPeriodSummary} />
						</Tab>
						<Tab id="tab-player-stats" tabTitle="Team Stats">
							<TeamStats
								showLoader={showLoader}
								showNoResults={isTeamStatsError}
								teamStats={dataTeamStats} />

							<PlayerStatsByTeam
								showLoader={showLoader}
								showNoResults={isPlayerStatsError}
								playerStatsByTeam={dataPlayerStats} />
						</Tab>
					</Tabs>
				}
			</div>
		);
	}
}

export default GameDetail;
