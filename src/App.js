import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ScheduleRoute, GameRoute, PlayerRoute } from './config/RoutePaths';
import { ThemeContext, InitialContext } from './config/ThemeContext';
import { TeamMap } from './config/TeamMap';
import breakpointChange from './utilities/BreakpointChange';
import Header from './components/Global/GlobalHeader';
import Schedule from './containers/Schedule';
import GameDetail from './containers/GameDetail';
import PlayerDetail from './containers/PlayerDetail';

class App extends Component {
	constructor(props) {
		super(props);

		this.storageKey = 'nhlThemeId';
		let storageThemeId = parseInt(localStorage.getItem(this.storageKey), 10);
		let initialState = {
			...InitialContext
		};

		if (storageThemeId) {
			initialState = this.getThemeValues(storageThemeId);
		}

		this.state = {
			...initialState,
			updateTheme: (teamId) => this.onThemeClick(teamId),
		}

		breakpointChange();
	}

	getThemeValues(teamId) {
		let theme = TeamMap.find(team => team.id === teamId);
		return {
			selectedThemeId: teamId,
			selectedThemeName: theme.teamName,
			selectedThemeClass: theme.teamClass,
		}
	}

	onThemeClick(teamId = InitialContext.selectedThemeId) {
		let newTheme = this.getThemeValues(teamId);

		localStorage.setItem(this.storageKey, `${newTheme.selectedThemeId}`);

		this.setState({
			...newTheme,
		});
	}

	render() {
		const { selectedThemeId, selectedThemeClass } = this.state;

		return (
			<ThemeContext.Provider value={this.state}>
				<div className={`app ${selectedThemeClass}`}>
					<Header key="global-header" themeId={selectedThemeId} />
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
			</ThemeContext.Provider>
		);
	}
}

export default App;
