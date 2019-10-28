import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/global/global-header';
import Schedule from './containers/Schedule';
import GameDetail from './containers/GameDetail';
import CONSTANTS from './config/Constants';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header/>
				<Switch>
					<Route exact path="/" component={Schedule} />
					<Route exact path={`${CONSTANTS.routePaths.schedule}:id`} component={Schedule} />
					<Route path={`${CONSTANTS.routePaths.game}:id`} component={GameDetail} />
					<Redirect to="/" />
				</Switch>
			</div>
		);
	}
}

// injects needed parts of the global state to the component through props
// in this case we pass everything
function mapStateToProps(state, ownProps) {
	return state;
}

// connect this component with the store
// and inject 'dispatch' store function through props
export default connect(mapStateToProps)(App);
