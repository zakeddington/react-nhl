import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import { ScheduleRoute, GameRoute, PlayerRoute } from './config/RoutePaths';
import breakpointChange from './utilities/BreakpointChange';
import Header from './components/Header/Header';
import Schedule from './containers/Schedule';
import GameDetail from './containers/GameDetail';
import PlayerDetail from './containers/PlayerDetail';
import Default from './globalStyles/Themes/Default/DefaultTheme';
import TeamBrands from './globalStyles/Themes/TeamBrands/TeamBrands';
import CreateTeamTheme from './globalStyles/Themes/TeamBrands/CreateTeamTheme';
import ThemeContext from './globalStyles/Themes/ThemeContext';
import GlobalStyles from './globalStyles';

class App extends Component {

	state = {
		selectedTheme: Default,
		selectedThemeId: 0,
		themes: {},
		updateTheme: (teamId) => this.onThemeClick(teamId),
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
		});
	}

	onThemeClick(teamId) {
		const { themes } = this.state;
		let newTheme = Default;
		let newThemeId = 0;

		if (teamId) {
			newTheme = themes[teamId];
			newThemeId = teamId;
		}

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
