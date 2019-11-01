// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/game-detail/actions';
import * as reducer from '../store/game-detail/reducer';
import GameHeader from '../components/game-detail/game-header/game-header';
import GameIntro from '../components/game-detail/game-intro/game-intro';
import Scoreboard from '../components/game-detail/scoreboard/scoreboard';
import Stars from '../components/game-detail/stars/stars';
import PeriodSummary from '../components/game-detail/period-summary/period-summary';
import GameStats from '../components/game-detail/game-stats/game-stats';
import TeamStats from '../components/game-detail/team-stats/team-stats';
import Icon from '../components/shared/icon/icon';
import Tabs from '../components/shared/tabs/tabs';
import Tab from '../components/shared/tabs/tab';

class GameDetail extends Component {

	componentDidMount() {
		let path = this.props.location.pathname;
		let gameId = path.match(/([^/]*)\/*$/)[1];

		this.props.dispatch(actions.fetchGameDetail(gameId));
		this.props.dispatch(actions.fetchGameContent(gameId));
	}

	render() {
		return (
			<div className="site-content container">
				<GameHeader gameDetail={this.props.gameDetail} />
				<GameIntro gameContent={this.props.gameContent} />
				<div className="scoreboard-stars">
					<Scoreboard gameDetail={this.props.gameDetail} />
					<Stars gameDetail={this.props.gameDetail} />
				</div>
				<Tabs>
					<Tab id="tab-period-summary" tabTitle="Period Summary">
						<PeriodSummary periodSummary={this.props.periodSummary} />
					</Tab>
					<Tab id="tab-team-stats" tabTitle="Team Stats">
						<GameStats gameDetail={this.props.gameDetail} />
						<TeamStats teamStats={this.props.teamStats} />
					</Tab>
				</Tabs>
			</div>
		);
	}
}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
	const gameDetail = reducer.getGameDetail(state);
	const gameContent = reducer.getGameContent(state);
	const periodSummary = reducer.getPeriodSummary(state);
	const teamStats = reducer.getTeamStats(state);
	return {
		gameDetail,
		gameContent,
		periodSummary,
		teamStats,
	};
}

export default connect(mapStateToProps)(GameDetail);
