import React, { Component } from 'react';
import GameHeader from '../components/GameDetail/GameHeader/GameHeader';
import GameIntro from '../components/GameDetail/GameIntro/GameIntro';
import ScoreBoard from '../components/GameDetail/ScoreBoard/ScoreBoard';
import Stars from '../components/GameDetail/Stars/Stars';
import PeriodSummary from '../components/GameDetail/PeriodSummary/PeriodSummary';
import GameStats from '../components/GameDetail/GameStats/GameStats';
import TeamStats from '../components/GameDetail/TeamStats/TeamStats';
import Tabs from '../components/Shared/Tabs/Tabs';
import Tab from '../components/Shared/Tabs/Tab';
import GameDetailService from "../services/GameDetailService";
import CONSTANTS from "../config/Constants";

class GameDetail extends Component {

	state = {
		showLoader: true,
		isPreview: true,
		gameDate: '',
		gameStatus: '',

		gameHeaderData: {},
		gameHeaderError: false,
		scoreBoardData: {},
		scoreBoardError: false,
		starsData: {},
		starsError: false,
		gameStatsData: {},
		gameStatsError: false,

		gameContent: null,
		gameContentError: false,
		periodSummary: null,
		periodSummaryError: false,
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

				let newPeriodSummary;
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
					newPeriodSummary = await GameDetailService.processPeriodSummary(data);
				} catch (error) {
					console.error(error);
					newPeriodSummary = CONSTANTS.NO_DATA;
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
					periodSummary: newPeriodSummary,
					teamStats: newTeamStats,
				});

			} catch (error) {
				console.error(error);
				this.setState({
					showLoader: false,
					periodSummary: CONSTANTS.NO_DATA,
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
			gameContent,
			periodSummary,
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
				<Tabs>
					<Tab id="tab-period-summary" tabTitle="Period Summary">
						<PeriodSummary periodSummary={periodSummary} />
					</Tab>
					<Tab id="tab-team-stats" tabTitle="Team Stats">
						<GameStats
							showLoader={showLoader}
							showNoResults={gameStatsError}
							isPreview={isPreview}
							gameStats={gameStatsData.gameStats} />

						<TeamStats teamStats={teamStats} />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default GameDetail;
