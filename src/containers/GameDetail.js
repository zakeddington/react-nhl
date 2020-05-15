import React, { Component } from 'react';
import CONSTANTS from '../config/Constants';
import GameHeader from '../components/GameDetail/GameHeader/GameHeader';
import GameIntro from '../components/GameDetail/GameIntro/GameIntro';
import ScoreBoard from '../components/GameDetail/ScoreBoard/ScoreBoard';
import Stars from '../components/GameDetail/Stars/Stars';
import PeriodSummary from '../components/GameDetail/PeriodSummary/PeriodSummary';
import GameStats from '../components/GameDetail/GameStats/GameStats';
import TeamStats from '../components/GameDetail/TeamStats/TeamStats';
import Tabs from '../components/Shared/Tabs/Tabs';
import Tab from '../components/Shared/Tabs/Tab';
import {
	GameDetailInitialState,
	GameHeaderInitialState,
	ScoreBoardInitialState,
	StarsInitialState,
	GameStatsInitialState,
	PeriodSummaryInitialState,
} from '../services/GameDetail/GameDetailInitialState';
import GameDetailService from '../services/GameDetail/GameDetailService';

class GameDetail extends Component {

	state = {
		...GameDetailInitialState,

		gameHeaderData: GameHeaderInitialState,
		gameHeaderError: false,
		scoreBoardData: ScoreBoardInitialState,
		scoreBoardError: false,
		starsData: StarsInitialState,
		starsError: false,
		gameStatsData: GameStatsInitialState,
		gameStatsError: false,
		periodSummaryData: PeriodSummaryInitialState,
		periodSummaryError: false,

		gameContent: null,
		gameContentError: false,
		newTeamStats: null,
	};

	fetchGameDetail(gameId) {
		return (async () => {
			try {
				const data = await GameDetailService.getGameData(gameId);

				let isPreview = data.isPreview;
				let gameDate = data.gameDate;
				let gameStatus = data.gameStatus;

				let gameHeaderData;
				let gameHeaderError = this.state.gameHeaderError;
				let scoreBoardData;
				let scoreBoardError = this.state.scoreBoardError;
				let starsData;
				let starsError = this.state.scoreBoardError;
				let gameStatsData;
				let gameStatsError = this.state.gameStatsError;
				let periodSummaryData;
				let periodSummaryError = this.state.periodSummaryError;

				let newTeamStats;

				try {
					gameHeaderData = await GameDetailService.processGameHeaderData(data);
				} catch (error) {
					console.error(error);
					gameHeaderError = true;
				}

				try {
					scoreBoardData = await GameDetailService.processScoreBoardData(data);
				} catch (error) {
					console.error(error);
					scoreBoardError = true;
				}

				try {
					starsData = await GameDetailService.processStarsData(data);
				} catch (error) {
					console.error(error);
					starsError = true;
				}

				try {
					gameStatsData = await GameDetailService.processGameStatsData(data);
				} catch (error) {
					console.error(error);
					gameStatsError = true;
				}

				try {
					periodSummaryData = await GameDetailService.processPeriodSummary(data);
				} catch (error) {
					console.error(error);
					periodSummaryError = true;
				}

				try {
					newTeamStats = await GameDetailService.processTeamStats(data);
				} catch (error) {
					console.error(error);
					newTeamStats = CONSTANTS.NO_DATA;
				}

				this.setState({
					showLoader: false,
					isPreview,
					gameDate,
					gameStatus,
					gameHeaderData,
					gameHeaderError,
					scoreBoardData,
					scoreBoardError,
					starsData,
					starsError,
					gameStatsData,
					gameStatsError,
					periodSummaryData,
					periodSummaryError,
					teamStats: newTeamStats,
				});

			} catch (error) {
				console.error(error);
				this.setState({
					showLoader: false,
					teamStats: CONSTANTS.NO_DATA,
				});
			}
		})();
	}

	fetchGameContent(gameId) {
		return (async () => {
			try {
				const data = await GameDetailService.getGameContent(gameId);
				let newGameContent;

				try {
					newGameContent = await GameDetailService.processGameContent(data);
				} catch (error) {
					console.error(error);
					newGameContent = CONSTANTS.NO_DATA;
				}

				this.setState({
					gameContent: newGameContent,
				});

			} catch (error) {
				console.error(error);
				this.setState({
					gameContent: CONSTANTS.NO_DATA,
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
			showLoader, isPreview, gameDate, gameStatus,
			gameHeaderData, gameHeaderError,
			scoreBoardData, scoreBoardError,
			starsData, starsError,
			gameStatsData, gameStatsError,
			periodSummaryData, periodSummaryError,
			gameContent,
			teamStats
		} = this.state;

		return (
			<div className="site-content container">
				<GameHeader
					showLoader={showLoader}
					showNoResults={gameHeaderError}
					isPreview={isPreview}
					gameDate={gameDate}
					gameStatus={gameStatus}
					awayTeam={gameHeaderData.awayTeam}
					homeTeam={gameHeaderData.homeTeam} />

				<GameIntro gameContent={gameContent} />
				<div className="scoreboard-stars">
					<ScoreBoard
						showLoader={showLoader}
						showNoResults={scoreBoardError}
						isPreview={isPreview}
						gameStatus={gameStatus}
						awayTeam={scoreBoardData.awayTeam}
						homeTeam={scoreBoardData.homeTeam}
						periodGoals={scoreBoardData.periodGoals} />

					<Stars
						showLoader={showLoader}
						showNoResults={starsError}
						isPreview={isPreview}
						stars={starsData.stars} />
				</div>
				{
					!isPreview &&
					<Tabs>
						<Tab id="tab-period-summary" tabTitle="Period Summary">
							<PeriodSummary
								showLoader={showLoader}
								showNoResults={periodSummaryError}
								periodSummary={periodSummaryData.periodSummary} />
						</Tab>
						<Tab id="tab-team-stats" tabTitle="Team Stats">
							<GameStats
								showLoader={showLoader}
								showNoResults={gameStatsError}
								gameStats={gameStatsData.gameStats} />

							<TeamStats teamStats={teamStats} />
						</Tab>
					</Tabs>
				}
			</div>
		);
	}
}

export default GameDetail;
