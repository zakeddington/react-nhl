import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ScheduleRoute, GameRoute, PlayerRoute } from './config/RoutePaths';
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
					<Route exact path={`${ScheduleRoute}:id`} component={Schedule} />
					<Route path={`${GameRoute}:id`} component={GameDetail} />
					<Route path={`${PlayerRoute}:id`} render={(props) => {
						return <PlayerDetail playerId={props.match.params.id} isFullPage={true} {...props} />
					}} />
					<Redirect to="/" />
				</Switch>
			</div>
		);
	}
}

export default App;
