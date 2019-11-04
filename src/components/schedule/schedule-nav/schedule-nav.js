import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CONSTANTS from '../../../config/Constants';
import EVENTS from '../../../config/Events';
import Icon from '../../shared/icon/icon';
import './datepicker.scss';
import './schedule-nav.scss';

class DatepickerTrigger extends Component {
	render () {
		return (
			<button className="datepicker-trigger" onClick={() => this.props.onClick()} value={this.props.value}>
				<Icon iconId="calendar" />
				<span className="offscreen">Select a date from calendar</span>
			</button>
		)
	}
}

class ScheduleNav extends Component {
	state = {
		selectedDate: this.props.scheduleStartDate,
		navDates: [],
	};

	numSideDays = CONSTANTS.isMobileView ? 1 : 3;

	componentDidMount() {
		this.setNavDates();
		window.addEventListener(EVENTS.BREAKPOINT_CHANGE, () => this.onBreakpointChange());
	}

	onBreakpointChange() {
		this.numSideDays = CONSTANTS.isMobileView ? 1 : 3;
		this.setNavDates();
	}

	// updateSelectedDate = false (only update the nav items, we are coming from nav arrows)
	setNavDates(centerDate = this.state.selectedDate, updateSelectedDate = true) {
		const { numSideDays } = this;

		let navDates = [{
			day: centerDate,
			isActive: updateSelectedDate,
		}];

		for (let i = 0; i < numSideDays; i++) {
			navDates.unshift({
				day: centerDate.clone().subtract(i + 1, 'days'),
				isActive: false,
			})
		}

		for (let i = 0; i < numSideDays; i++) {
			navDates.push({
				day: centerDate.clone().add(i + 1, 'days'),
				isActive: false,
			})
		}

		if (updateSelectedDate) {
			this.setState({
				selectedDate: centerDate,
				navDates,
			});
		} else {
			// check if any date is active from previous state of nav (date matches current results displayed)
			navDates.forEach((date) => {
				const curDate = date.day.format(CONSTANTS.momentOptions.displayFormat);
				const selectedDate = this.state.selectedDate.format(CONSTANTS.momentOptions.displayFormat);
				if (curDate === selectedDate) {
					date.isActive = true;
				}
			});

			this.setState({
				navDates,
			});
		}
	}

	onNavClick(e, dateObj) {
		if (this.props.scheduleIsLoading) {
			e.preventDefault();
		} else {
			let curDateObj = dateObj;
			let curNavDates = this.state.navDates;
			let urlDate = curDateObj.day.format(CONSTANTS.momentOptions.apiFormat);

      curNavDates.forEach((navDate) => {
				navDate.isActive = curDateObj.day === navDate.day;
			});

			this.setState({
				selectedDate: curDateObj.day,
				navDates: curNavDates
			});

			this.props.fetchGames(urlDate, urlDate);
		}
	}

	onNavArrowClick(direction) {
		const { numSideDays } = this;
		const { navDates } = this.state;
		const curStartDate = navDates[0].day;
		const curEndDate = navDates[navDates.length - 1].day;
		let newDate;

		if (direction === 'prev') {
			newDate = curStartDate.clone().subtract(numSideDays + 1, 'days');
		} else {
			newDate = curEndDate.clone().add(numSideDays + 1, 'days');
		}

		this.setNavDates(newDate, false);
	}

	onDatePickerChange(dateStr) {
		let dateObj = moment(dateStr);
		this.fetchNewDates(dateObj);
	}

	fetchNewDates(dateObj) {
		let urlDate = dateObj.format(CONSTANTS.momentOptions.apiFormat);

		this.props.history.push(`${CONSTANTS.routePaths.schedule}${urlDate}`);

		this.setNavDates(dateObj);
		this.props.fetchGames(urlDate, urlDate);
	}

	createNavDays(dateObj/*, arrow = ''*/) {
		let displayDay = dateObj.day.format(CONSTANTS.momentOptions.displayFormat);
		let urlDate = dateObj.day.format(CONSTANTS.momentOptions.apiFormat);
		let activeClass = dateObj.isActive ? 'is-active' : '';

		return (
			<Link to={`${CONSTANTS.routePaths.schedule}${urlDate}`} className={`schedule-nav--link ${activeClass}`}
						onClick={(e) => this.onNavClick(e, dateObj)}>
				{displayDay}
			</Link>
		)
	}

	render() {
		let navDates = this.state.navDates;

		return (
			<div className="schedule-nav">
				<DatePicker
					customInput={<DatepickerTrigger />}
					selected={this.state.selectedDate.toDate()}
					onChange={(dateStr) => this.onDatePickerChange(dateStr)}
					todayButton="Today" />
				<ul className="schedule-nav--items">
					<li className="schedule-nav--item schedule-nav--prev">
						<button className="schedule-nav--link" title="Previous week" onClick={() => this.onNavArrowClick('prev')}>
							<Icon iconId="arrow-left" />
							<span className="offscreen">previous week</span>
						</button>
					</li>
					{
						navDates.map((navDate) => {
							return (
								<li key={navDate.day} className="schedule-nav--item">
									{this.createNavDays(navDate)}
								</li>
							);
						})
					}
					<li className="schedule-nav--item schedule-nav--next">
						<button className="schedule-nav--link" title="Next week" onClick={() => this.onNavArrowClick('next')}>
							<Icon iconId="arrow-right" />
							<span className="offscreen">next week</span>
						</button>
					</li>
				</ul>
			</div>
		)
	}
}

export default ScheduleNav;
