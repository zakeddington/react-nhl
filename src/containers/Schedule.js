import React, { Component } from 'react';
import moment from 'moment';
import ScheduleService from '../services/ScheduleService';
import { ScheduleRoute } from '../config/RoutePaths';
import { MomentOptions } from '../config/Dates';
import ScheduleNav from '../components/Schedule/ScheduleNav/ScheduleNav';
import ScheduleResults from '../components/Schedule/ScheduleResults/ScheduleResults';

class Schedule extends Component {

	state = {
		dataScheduleResults: [],
		isScheduleResultsError: false,
		startDateObj: this.getStartDateObj(),
		isScheduleLoading: true,
	};

	componentDidMount() {
		const { startDateObj } = this.state;
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
		let dateFormat = MomentOptions.apiFormat;
		let startDate = moment(new Date(), dateFormat);
		let pathname = window.location.pathname;

		// create moment obj from date string in url if it exists
		if (pathname.indexOf(ScheduleRoute) !== -1) {
			let date = pathname.replace(ScheduleRoute, '');
			startDate = moment(date, dateFormat);
		}
		return startDate;
	}

	fetchScheduleGames(objDateFrom, objDateTo) {
		this.setState({
			startDateObj: objDateFrom,
			isScheduleLoading: true,
		});

		return (async () => {
			let dataScheduleResults = [];
			let isScheduleResultsError = false;

			try {
				const params = [
					'schedule.linescore'
				];
				const dateFormat = MomentOptions.apiFormat;
				const dateFrom = objDateFrom.format(dateFormat);
				const dateTo = objDateTo.format(dateFormat);
				const data = await ScheduleService.getScheduleGames(dateFrom, dateTo, params);

				if (data.length) {
					dataScheduleResults = data;
				}
			} catch (error) {
				console.error(error);
				isScheduleResultsError = true;
			}

			this.setState({
				dataScheduleResults,
				isScheduleResultsError,
				isScheduleLoading: false,
			})
		})();
	}

	render() {
		const {
			dataScheduleResults,
			isScheduleResultsError,
			startDateObj,
			isScheduleLoading
		} = this.state;

		return (
			<div className="site-content container">
				<ScheduleNav
					history={this.props.history}
					startDate={startDateObj}
					isScheduleLoading={isScheduleLoading}
				/>
				<h1>Scores</h1>
				<ScheduleResults
					results={dataScheduleResults}
					showError={isScheduleResultsError}
					showLoader={isScheduleLoading}
				/>
			</div>
		);
	}
}

export default Schedule;
