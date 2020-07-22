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
import CreateTeamTheme from './globalStyles/Themes/TeamBrands/CreateTeamTheme';
import GlobalStyles from './globalStyles';

class App extends Component {
	constructor(props) {
		super(props);
		breakpointChange();

		this.state = {
			theme: Default,
			themeId: 0,
		}
	}

	onThemeClick(teamId) {
		let newTheme = Default;
		let newThemeId = 0;

		if (teamId) {
			newTheme = CreateTeamTheme(teamId);
			newThemeId = teamId;
		}

		this.setState({
			theme: newTheme,
			themeId: newThemeId,
		});
	}

	render() {
		const { theme, themeId } = this.state;

		return (
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<div className="app">
					<Header key="global-header" themeId={themeId} themeClickCallback={(teamId) => this.onThemeClick(teamId)} />
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
			</ThemeProvider>
		);
	}
}

export default App;
