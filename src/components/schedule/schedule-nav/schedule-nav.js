import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CONSTANTS from '../../../config/Constants';
import EVENTS from '../../../config/Events';
import Icon from '../../shared/icon/icon';
import './datepicker.scss';
import './schedule-nav.scss';

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
		setActiveState: true,
	};

	numSideDays = CONSTANTS.isMobileView ? 1 : 3;

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
			const curDateStr = curDate.format(CONSTANTS.momentOptions.displayFormat);
			const prevDateStr = prevDate.format(CONSTANTS.momentOptions.displayFormat);
			const curPropsDateStr = curPropsDate.format(CONSTANTS.momentOptions.displayFormat);
			const prevPropsDateStr = prevPropsDate.format(CONSTANTS.momentOptions.displayFormat);

			if (curDateStr !== prevDateStr) {
				this.setArrDateObjs(curDate);
			} else if (curPropsDateStr !== prevPropsDateStr) {
				this.setArrDateObjs(curPropsDate);
			}
		}
	}

	onBreakpointChange() {
		this.numSideDays = CONSTANTS.isMobileView ? 1 : 3;
		this.setArrDateObjs();
	}

	setArrDateObjs(selectedDate = this.state.objStartDate) {
		const { numSideDays } = this;
		const { setActiveState } = this.state;
		const curDates = this.state.arrDateObjs;
		let dateObjs = curDates;
		let createNewDates = true;

		// console.log(selectedDate.format(CONSTANTS.momentOptions.displayFormat));
		// console.log('setActiveState', setActiveState);

		// check if any date matches current results displayed
		if (setActiveState) {
			curDates.forEach((date) => {
				const curDate = date.day.format(CONSTANTS.momentOptions.displayFormat);
				const objStartDate = selectedDate.format(CONSTANTS.momentOptions.displayFormat);

				if (curDate === objStartDate) {
					date.isActive = true;
					createNewDates = false;
				} else {
					date.isActive = false;
				}
			});
		}

		// only create new dates array if it's not in the current one
		if (createNewDates) {
			dateObjs = [{
				day: selectedDate,
				isActive: setActiveState,
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
		}

		this.setState({
			objStartDate: selectedDate,
			arrDateObjs: dateObjs,
			setActiveState: true,
		});
	}

	onNavClick(e, dateObj) {
		if (this.props.scheduleIsLoading) {
			e.preventDefault();
		} else {
			let urlDate = dateObj.day.format(CONSTANTS.momentOptions.apiFormat);
			this.props.history.push(`${CONSTANTS.routePaths.schedule}${urlDate}`);
		}
	}

	onNavArrowClick(direction) {
		const {numSideDays} = this;
		const {arrDateObjs} = this.state;
		const curStartDate = arrDateObjs[0].day;
		const curEndDate = arrDateObjs[arrDateObjs.length - 1].day;
		let newDate;

		if (direction === 'prev') {
			newDate = curStartDate.clone().subtract(numSideDays + 1, 'days');
		} else {
			newDate = curEndDate.clone().add(numSideDays + 1, 'days');
		}

		// this.setArrDateObjs(newDate, true);
		this.setState({
			objStartDate: newDate,
			setActiveState: false,
		})
	}

	onDatePickerChange(dateStr) {
		let dateObj = moment(dateStr);
		let urlDate = dateObj.format(CONSTANTS.momentOptions.apiFormat);
		this.props.history.push(`${CONSTANTS.routePaths.schedule}${urlDate}`);
	}

	renderNav() {
		const { arrDateObjs } = this.state;
		const nav = [];

		if (!arrDateObjs.length) {
			return null;
		}

		arrDateObjs.forEach((navDate) => {
			let displayDay = navDate.day.format(CONSTANTS.momentOptions.displayFormat);
			let urlDate = navDate.day.format(CONSTANTS.momentOptions.apiFormat);
			let activeClass = navDate.isActive ? 'is-active' : '';

			nav.push(
				<li key={navDate.day} className="schedule-nav--item">
					<Link to={`${CONSTANTS.routePaths.schedule}${urlDate}`} className={`schedule-nav--link ${activeClass}`}
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

export default ScheduleNav;
