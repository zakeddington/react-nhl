import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import { ScheduleRoute, GameRoute, PlayerRoute } from './config/RoutePaths';
import breakpointChange from './utilities/BreakpointChange';
import Header from './components/Header/Header';
import Schedule from './containers/Schedule';
import GameDetail from './containers/GameDetail';
import PlayerDetail from './containers/PlayerDetail';
import DefaultTheme from './globalStyles/Themes/Default/DefaultTheme';
import TeamBrands from './globalStyles/Themes/TeamBrands/TeamBrands';
import CreateTeamTheme from './globalStyles/Themes/TeamBrands/CreateTeamTheme';
import { InitialContext, ThemeContext } from './globalStyles/Themes/ThemeContext';
import GlobalStyles from './globalStyles';

class App extends Component {
	constructor(props) {
		super(props);

		this.storageKey = 'nhlThemeId';
		let storageThemeId = parseInt(localStorage.getItem(this.storageKey), 10);
		if (!storageThemeId) {
			storageThemeId = 0;
		}

		this.state = {
			...InitialContext,
			selectedThemeId: storageThemeId,
			updateTheme: (teamId) => this.onThemeClick(teamId),
		}
	}

	componentDidMount() {
		this.createThemes();
		breakpointChange();
	}

	createThemes() {
		const themes = {};

		TeamBrands.forEach((team) => {
			themes[team.id] = CreateTeamTheme(team.id);
		});

		this.setState({
			themes,
			selectedTheme: themes[this.state.selectedThemeId]
		});
	}

	onThemeClick(teamId) {
		const { themes } = this.state;
		let newTheme = DefaultTheme;
		let newThemeId = 0;

		if (teamId) {
			newTheme = themes[teamId];
			newThemeId = teamId;
		}

		localStorage.setItem(this.storageKey, `${newThemeId}`);

		this.setState({
			selectedTheme: newTheme,
			selectedThemeId: newThemeId,
		});
	}

	render() {
		const { selectedTheme, selectedThemeId } = this.state;

		return (
			<ThemeProvider theme={selectedTheme}>
				<ThemeContext.Provider value={this.state}>
					<GlobalStyles />
					<div className="app">
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
			</ThemeProvider>
		);
	}
}

export default App;
