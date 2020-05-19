import React, { Component } from 'react';
import CONSTANTS from '../config/Constants';
import GameHeader from '../components/GameDetail/GameHeader/GameHeader';
import GameIntro from '../components/GameDetail/GameIntro/GameIntro';
import ScoreBoard from '../components/GameDetail/ScoreBoard/ScoreBoard';
import Stars from '../components/GameDetail/Stars/Stars';
import PeriodSummary from '../components/GameDetail/PeriodSummary/PeriodSummary';
import GameStats from '../components/GameDetail/GameStats/GameStats';
import PlayerStats from '../components/GameDetail/PlayerStats/PlayerStats';
import Tabs from '../components/Shared/Tabs/Tabs';
import Tab from '../components/Shared/Tabs/Tab';
import {
	GameDetailInitialState,
	GameHeaderInitialState,
	ScoreBoardInitialState,
	StarsInitialState,
	PeriodSummaryInitialState,
	GameStatsInitialState,
	PlayerStatsInitialState,
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
		periodSummaryData: PeriodSummaryInitialState,
		periodSummaryError: false,
		gameStatsData: GameStatsInitialState,
		gameStatsError: false,
		playerStatsData: PlayerStatsInitialState,
		playerStatsError: false,

		gameContent: null,
		gameContentError: false,
	};

	fetchGameDetail(gameId) {
		return (async () => {
			try {
				const data = await GameDetailService.getGameData(gameId);

				let isPreview = data.isPreview;
				let gameDate = data.gameDate;
				let gameStatus = data.gameStatus;

				let {
					gameHeaderData,
					gameHeaderError,
					scoreBoardData,
					scoreBoardError,
					starsData,
					starsError,
					periodSummaryData,
					periodSummaryError,
					gameStatsData,
					gameStatsError,
					playerStatsData,
					playerStatsError,
				} = this.state;

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
					periodSummaryData = await GameDetailService.processPeriodSummary(data);
				} catch (error) {
					console.error(error);
					periodSummaryError = true;
				}

				try {
					gameStatsData = await GameDetailService.processGameStatsData(data);
				} catch (error) {
					console.error(error);
					gameStatsError = true;
				}

				try {
					playerStatsData = await GameDetailService.processPlayerStats(data);
				} catch (error) {
					console.error(error);
					playerStatsError = true;
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
					periodSummaryData,
					periodSummaryError,
					gameStatsData,
					gameStatsError,
					playerStatsData,
					playerStatsError,
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
			periodSummaryData, periodSummaryError,
			gameStatsData, gameStatsError,
			playerStatsData, playerStatsError,
			gameContent,
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
						<Tab id="tab-player-stats" tabTitle="Team Stats">
							<GameStats
								showLoader={showLoader}
								showNoResults={gameStatsError}
								gameStats={gameStatsData.gameStats} />

							<PlayerStats
								showLoader={showLoader}
								showNoResults={playerStatsError}
								playerStats={playerStatsData.playerStats} />
						</Tab>
					</Tabs>
				}
			</div>
		);
	}
}

export default GameDetail;
