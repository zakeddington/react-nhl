import React, { Component } from 'react';
import GameHeader from '../components/game-detail/game-header/game-header';
import GameIntro from '../components/game-detail/game-intro/game-intro';
import Scoreboard from '../components/game-detail/scoreboard/scoreboard';
import Stars from '../components/game-detail/stars/stars';
import PeriodSummary from '../components/game-detail/period-summary/period-summary';
import GameStats from '../components/game-detail/game-stats/game-stats';
import TeamStats from '../components/game-detail/team-stats/team-stats';
import Tabs from '../components/shared/tabs/tabs';
import Tab from '../components/shared/tabs/tab';
import GameDetailService from "../services/GameDetailService";
import CONSTANTS from "../config/Constants";

class GameDetail extends Component {

	state = {
		gameDetail: null,
		gameContent: null,
		periodSummary: null,
		teamStats: null,
	};

	fetchGameDetail(gameId) {
		return (async () => {
			try {
				const data = await GameDetailService.getGameData(gameId);
				let newGameDetail;
				let newPeriodSummary;
				let newTeamStats;

				try {
					newGameDetail = await GameDetailService.processGameData(data);
				} catch (error) {
					console.error(error);
					newGameDetail = CONSTANTS.NO_DATA;
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
					gameDetail: newGameDetail,
					periodSummary: newPeriodSummary,
					teamStats: newTeamStats,
				});

			} catch (error) {
				console.error(error);
				this.setState({
					gameDetail: CONSTANTS.NO_DATA,
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
		const { gameDetail, gameContent, periodSummary, teamStats } = this.state;

		return (
			<div className="site-content container">
				<GameHeader data={gameDetail} />

				<GameIntro gameContent={gameContent} />
				<div className="scoreboard-stars">
					<Scoreboard gameDetail={gameDetail} />
					<Stars gameDetail={gameDetail} />
				</div>
				<Tabs>
					<Tab id="tab-period-summary" tabTitle="Period Summary">
						<PeriodSummary periodSummary={periodSummary} />
					</Tab>
					<Tab id="tab-team-stats" tabTitle="Team Stats">
						<GameStats gameDetail={gameDetail} />
						<TeamStats teamStats={teamStats} />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default GameDetail;
