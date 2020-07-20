import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ScheduleRoute } from '../../../config/RoutePaths';
import { MomentOptions } from '../../../config/Dates';
import { isMobileBreakpoint } from '../../../config/Breakpoints';
import EVENTS from '../../../config/Events';
import Icon from '../../Shared/Icon/Icon';
import './DatePicker.scss';
import './ScheduleNav.scss';

function DatepickerTrigger(props) {
	return (
		<button className="datepicker-trigger" onClick={() => props.onClick()} value={props.value}>
			<Icon iconId="calendar"/>
			<span className="offscreen">Select a date from calendar</span>
		</button>
	)
}

class ScheduleNav extends Component {
	state = {
		objStartDate: this.props.startDate,
		arrDateObjs: [],
	};

	numSideDays = isMobileBreakpoint ? 1 : 3;
	isBreakpointChange = false;

	componentDidMount() {
		if (this.state.objStartDate) {
			this.setArrDateObjs();
		}
		window.addEventListener(EVENTS.BREAKPOINT_CHANGE, () => this.onBreakpointChange());
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const curDate = this.state.objStartDate;
		const prevDate = prevState.objStartDate;

		if (curDate && prevDate) {
			const curPropsDate = this.props.startDate;
			const prevPropsDate = prevProps.startDate;
			const curDateStr = curDate.format(MomentOptions.displayFormat);
			const prevDateStr = prevDate.format(MomentOptions.displayFormat);
			const curPropsDateStr = curPropsDate.format(MomentOptions.displayFormat);
			const prevPropsDateStr = prevPropsDate.format(MomentOptions.displayFormat);

			if (curDateStr !== prevDateStr) {
				this.setArrDateObjs(curDate, curPropsDate);
			} else if (curPropsDateStr !== prevPropsDateStr) {
				this.setArrDateObjs(curPropsDate, curPropsDate);
			}
		}
	}

	onBreakpointChange() {
		this.numSideDays = isMobileBreakpoint ? 1 : 3;
		this.isBreakpointChange = true;
		this.setArrDateObjs();
		this.isBreakpointChange = false;
	}

	setArrDateObjs(selectedDate = this.state.objStartDate, curResultsDate) {
		const { numSideDays, isBreakpointChange } = this;
		const curDates = this.state.arrDateObjs;
		let dateObjs = curDates;
		let createNewDates = true;

		// check if any date matches current results displayed
		curDates.forEach((date) => {
			const curDate = date.day.format(MomentOptions.displayFormat);
			const objStartDate = selectedDate.format(MomentOptions.displayFormat);

			if (curDate === objStartDate) {
				date.isActive = true;
				createNewDates = false;
			} else {
				date.isActive = false;
			}
		});

		// only create new dates array if it's not in the current one
		if (createNewDates || isBreakpointChange) {
			dateObjs = [{
				day: selectedDate,
				isActive: true,
			}];

			for (let i = 0; i < numSideDays; i++) {
				dateObjs.unshift({
					day: selectedDate.clone().subtract(i + 1, 'days'),
					isActive: false,
				});

				dateObjs.push({
					day: selectedDate.clone().add(i + 1, 'days'),
					isActive: false,
				});
			}

			// set active state on date that matches displayed results
			if (curResultsDate) {
				dateObjs.forEach((date) => {
					const curDate = date.day.format(MomentOptions.displayFormat);
					const resultsDate = curResultsDate.format(MomentOptions.displayFormat);

					date.isActive = (curDate === resultsDate);
				});
			}
		}

		this.setState({
			objStartDate: selectedDate,
			arrDateObjs: dateObjs,
		});
	}

	onNavClick(e, dateObj) {
		if (this.props.isScheduleLoading) {
			e.preventDefault();
		} else {
			let urlDate = dateObj.day.format(MomentOptions.apiFormat);
			this.props.history.push(`${ScheduleRoute}${urlDate}`);
		}
	}

	onNavArrowClick(direction) {
		const { numSideDays } = this;
		const { arrDateObjs } = this.state;
		const curStartDate = arrDateObjs[0].day;
		const curEndDate = arrDateObjs[arrDateObjs.length - 1].day;
		let newDate;

		if (direction === 'prev') {
			newDate = curStartDate.clone().subtract(numSideDays + 1, 'days');
		} else {
			newDate = curEndDate.clone().add(numSideDays + 1, 'days');
		}

		this.setState({
			objStartDate: newDate,
		})
	}

	onDatePickerChange(dateStr) {
		let dateObj = moment(dateStr);
		let urlDate = dateObj.format(MomentOptions.apiFormat);
		this.props.history.push(`${ScheduleRoute}${urlDate}`);
	}

	renderNav() {
		const { arrDateObjs } = this.state;
		const nav = [];

		if (!arrDateObjs.length) {
			return null;
		}

		arrDateObjs.forEach((navDate) => {
			let displayDay = navDate.day.format(MomentOptions.displayFormat);
			let urlDate = navDate.day.format(MomentOptions.apiFormat);
			let activeClass = navDate.isActive ? 'is-active' : '';

			nav.push(
				<li key={navDate.day} className="schedule-nav--item">
					<Link to={`${ScheduleRoute}${urlDate}`} className={`schedule-nav--link ${activeClass}`}
						onClick={(e) => this.onNavClick(e, navDate)}>
						{displayDay}
					</Link>
				</li>
			);
		});
		return (
			<>
				{nav}
			</>
		)
	}

	render() {
		const { objStartDate } = this.state;

		return (
			<div className="schedule-nav">
				<DatePicker
					customInput={DatepickerTrigger(this.props)}
					selected={objStartDate.toDate()}
					onChange={(dateStr) => this.onDatePickerChange(dateStr)}
					todayButton="Today"/>
				<ul className="schedule-nav--items">
					<li className="schedule-nav--item schedule-nav--prev">
						<button className="schedule-nav--link" title="Previous week" onClick={() => this.onNavArrowClick('prev')}>
							<Icon iconId="arrow-left"/>
							<span className="offscreen">previous week</span>
						</button>
					</li>
					{this.renderNav()}
					<li className="schedule-nav--item schedule-nav--next">
						<button className="schedule-nav--link" title="Next week" onClick={() => this.onNavArrowClick('next')}>
							<Icon iconId="arrow-right"/>
							<span className="offscreen">next week</span>
						</button>
					</li>
				</ul>
			</div>
		)
	}
}

ScheduleNav.propTypes = {
	history: PropTypes.object,
	isScheduleLoading: PropTypes.bool,
	startDate: PropTypes.object,
}

export default ScheduleNav;
