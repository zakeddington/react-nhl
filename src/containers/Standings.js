import React, { Component } from 'react';
import StandingsService from '../services/Standings/StandingsService';
import Loader from '../components/Shared/Loader/Loader';
import ErrorMessage from '../components/Shared/ErrorMessage/ErrorMessage';
import Tabs from '../components/Shared/Tabs/Tabs';
import Tab from '../components/Shared/Tabs/Tab';
import StandingsTables from '../components/Standings/StandingsTables';

class Standings extends Component {

	state = {
		showLoader: true,

		dataDivisionStandings: null,
		dataConferenceStandings: null,
		dataLeagueStandings: null,
		dataWildcardStandings: null,

		isDivisionStandingsError: false,
		isConferenceStandingsError: false,
		isLeagueStandingsError: false,
		isWildcardStandingsError: false,
	};

	componentDidMount() {
		return this.fetchStandings();
	}

	async fetchStandings() {
		try {
			const data = await StandingsService.getStandingsData();

			let {
				dataDivisionStandings,
				dataConferenceStandings,
				dataLeagueStandings,
				dataWildcardStandings,
				isDivisionStandingsError,
				isConferenceStandingsError,
				isLeagueStandingsError,
				isWildcardStandingsError,
			} = this.state;

			try {
				dataDivisionStandings = await StandingsService.processDivisionStandings(data);
			} catch (error) {
				console.error(error);
				isDivisionStandingsError = true;
			}

			try {
				dataConferenceStandings = await StandingsService.processConferenceStandings(data);
			} catch (error) {
				console.error(error);
				isConferenceStandingsError = true;
			}

			try {
				dataLeagueStandings = await StandingsService.processLeagueStandings(data);
			} catch (error) {
				console.error(error);
				isLeagueStandingsError = true;
			}

			try {
				dataWildcardStandings = await StandingsService.processWildcardStandings(data);
			} catch (error) {
				console.error(error);
				isWildcardStandingsError = true;
			}

			this.setState({
				showLoader: false,
				dataDivisionStandings,
				dataConferenceStandings,
				dataLeagueStandings,
				dataWildcardStandings,
				isDivisionStandingsError,
				isConferenceStandingsError,
				isLeagueStandingsError,
				isWildcardStandingsError,
			});

		} catch (error) {
			console.error(error);
			this.setState({
				showLoader: false,
				isDivisionStandingsError: true,
				isConferenceStandingsError: true,
				isLeagueStandingsError: true,
				isWildcardStandingsError: true,
			})
		}
	}

	render() {
		const {
			showLoader,
			dataDivisionStandings,
			dataConferenceStandings,
			dataLeagueStandings,
			dataWildcardStandings,
			isDivisionStandingsError,
			isConferenceStandingsError,
			isLeagueStandingsError,
			isWildcardStandingsError,
		} = this.state;
		let content;

		if (isDivisionStandingsError && isConferenceStandingsError && isLeagueStandingsError && isWildcardStandingsError) {
			content = <ErrorMessage errorMsg="No standings available." errorClass="text-center" />;
		} else if (showLoader) {
			content = <Loader />;
		} else {
			content =
				<Tabs key="tabs-standings" tabsClass="tabs-small">
					{
						!isDivisionStandingsError &&
						<Tab id={`tab-${dataDivisionStandings.standingsName}-standings`} tabTitle={dataDivisionStandings.standingsName}>
							<StandingsTables
								standingsName={dataDivisionStandings.standingsName}
								standings={dataDivisionStandings.standings} />
						</Tab>
					}
					{
						!isConferenceStandingsError &&
						<Tab id={`tab-${dataConferenceStandings.standingsName}-standings`} tabTitle={dataConferenceStandings.standingsName}>
							<StandingsTables
								standingsName={dataConferenceStandings.standingsName}
								standings={dataConferenceStandings.standings} />
						</Tab>
					}
					{
						!isLeagueStandingsError &&
						<Tab id={`tab-${dataLeagueStandings.standingsName}-standings`} tabTitle={dataLeagueStandings.standingsName}>
							<StandingsTables
								standingsName={dataLeagueStandings.standingsName}
								standings={dataLeagueStandings.standings} />
						</Tab>
					}
					{
						!isWildcardStandingsError &&
						<Tab id={`tab-${dataWildcardStandings.standingsName}-standings`} tabTitle={dataWildcardStandings.standingsName}>
							<StandingsTables
								standingsName={dataWildcardStandings.standingsName}
								standings={dataWildcardStandings.standings} />
						</Tab>
					}
				</Tabs>;
		}

		return (
			<>
				{content}
			</>
		)
	}
}

export default Standings;
