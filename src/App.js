import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CONSTANTS from './config/Constants';
import breakpointChange from './utilities/BreakpointChange';
import Header from './components/Global/GlobalHeader';
import Schedule from './containers/Schedule';
import GameDetail from './containers/GameDetail';
import PlayerDetail from './containers/PlayerDetail';

class App extends Component {
	constructor(props) {
		super(props);
		breakpointChange();
	}

	render() {
		return (
			<div className="app">
				<Header key="global-header"/>
				<Switch>
					<Route exact path="/" component={Schedule} />
					<Route exact path={`${CONSTANTS.routePaths.schedule}:id`} component={Schedule} />
					<Route path={`${CONSTANTS.routePaths.game}:id`} component={GameDetail} />
					<Route path={`${CONSTANTS.routePaths.player}:id`} render={(props) => {
						return <PlayerDetail playerId={props.match.params.id} isFullPage={true} {...props} />
					}} />
					<Redirect to="/" />
				</Switch>
			</div>
		);
	}
}

export default App;
