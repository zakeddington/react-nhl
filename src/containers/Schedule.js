import React, { Component } from 'react';
import moment from 'moment';
import ScheduleService from '../services/ScheduleService';
import CONSTANTS from '../config/Constants';
import ScheduleNav from '../components/schedule/schedule-nav/schedule-nav';
import ScheduleResults from '../components/schedule/schedule-results/schedule-results';

class Schedule extends Component {

	state = {
		games: [],
		startDateObj: this.getStartDateObj(),
		isLoading: true,
	};

	componentDidMount() {
		const {startDateObj} = this.state;
		this.fetchScheduleGames(startDateObj, startDateObj);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const curRoute = this.props.location.pathname;
		const prevRoute = prevProps.location.pathname;

		if (curRoute !== prevRoute) {
			const startDateObj = this.getStartDateObj();
			this.fetchScheduleGames(startDateObj, startDateObj);
		}
	}

	getStartDateObj() {
		let dateFormat = CONSTANTS.momentOptions.apiFormat;
		let startDate = moment(new Date(), dateFormat);
		let pathname = window.location.pathname;

		// create moment obj from date string in url if it exists
		if (pathname.indexOf(CONSTANTS.routePaths.schedule) !== -1) {
			let date = pathname.replace(CONSTANTS.routePaths.schedule, '');
			startDate = moment(date, dateFormat);
		}
		return startDate;
	}

	fetchScheduleGames(objDateFrom, objDateTo) {
		this.setState({
			startDateObj: objDateFrom,
			isLoading: true,
		});

		return (async () => {
			let games;

			try {
				const params = [
					'schedule.linescore'
				];
				const dateFormat = CONSTANTS.momentOptions.apiFormat;
				const dateFrom = objDateFrom.format(dateFormat);
				const dateTo = objDateTo.format(dateFormat);
				const data = await ScheduleService.getScheduleGames(dateFrom, dateTo, params);

				if (data.length) {
					games = data;
				} else {
					games = CONSTANTS.NO_DATA;
				}
			} catch (error) {
				console.error(error);
				games = CONSTANTS.NO_DATA;
			}

			this.setState({
				games,
				isLoading: false,
			})
		})();
	}

	render() {
		const { games, startDateObj, isLoading } = this.state;

		return (
			<div className="site-content container">
				<ScheduleNav
					history={this.props.history}
					startDate={startDateObj}
					scheduleIsLoading={isLoading}
				/>
				<h1>Scores</h1>
				<ScheduleResults games={games} scheduleIsLoading={isLoading} />
			</div>
		);
	}
}

export default Schedule;
