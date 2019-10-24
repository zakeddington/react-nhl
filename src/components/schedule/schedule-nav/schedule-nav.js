import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CONSTANTS from '../../../config/Constants';
import Icon from '../../shared/icon/icon';
import './schedule-nav.scss';

class DatepickerTrigger extends Component {
	render () {
		return (
			<button className="datepicker-trigger" onClick={() => this.props.onClick()} value={this.props.value}>
				<Icon iconId="calendar" />
			</button>
		)
	}
}

class ScheduleNav extends Component {
	componentWillMount() {
		this.setNavDates(this.props.scheduleStartDate);
	}

	setNavDates(dateObj) {
		const curDay = dateObj;

		let navDates = [
			{
				day: curDay.clone().subtract(3, 'days'),
				isActive: false,
			},
			{
				day: curDay.clone().subtract(2, 'days'),
				isActive: false,
			},
			{
				day: curDay.clone().subtract(1, 'days'),
				isActive: false,
			},
			{
				day: curDay,
				isActive: true,
			},
			{
				day: curDay.clone().add(1, 'days'),
				isActive: false,
			},
			{
				day: curDay.clone().add(2, 'days'),
				isActive: false,
			},
			{
				day: curDay.clone().add(3, 'days'),
				isActive: false,
			}
		];

		this.setState({
			selectedDate: curDay,
			navDates: navDates
		});
	}

	onNavClick(e, dateObj) {
		if (this.props.scheduleIsLoading) {
			e.preventDefault();
		} else {
			let curDateObj = dateObj;
			let curNavDates = this.state.navDates;
			let urlDate = curDateObj.day.format(CONSTANTS.momentOptions.apiFormat);

      curNavDates.forEach((navDate) => {
				if (curDateObj.day === navDate.day) {
					navDate.isActive = true;
				} else {
					navDate.isActive = false;
				}
			});

			this.setState({
				selectedDate: curDateObj.day,
				navDates: curNavDates
			});

			this.props.fetchGames(urlDate, urlDate);
		}
	}

	onDatePickerChange(dateStr) {
		let dateObj = moment(dateStr);
		let urlDate = dateObj.format(CONSTANTS.momentOptions.apiFormat);

		this.props.history.push(`${CONSTANTS.routePaths.schedule}${urlDate}`);

		this.setNavDates(dateObj);
		this.props.fetchGames(urlDate, urlDate);
	}

	createNavDays(dateObj) {
		let displayDay = dateObj.day.format(CONSTANTS.momentOptions.displayFormat);
		let urlDate = dateObj.day.format(CONSTANTS.momentOptions.apiFormat);
		let activeClass = dateObj.isActive ? 'is-active' : '';

		return (
			<Link to={`${CONSTANTS.routePaths.schedule}${urlDate}`} className={`schedule-nav-item ${activeClass}`} onClick={(e) => this.onNavClick(e, dateObj)}>
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
				<ul className="schedule-nav-items">
					{
						navDates.map((navDate) => {
							return (
								<li key={navDate.day}>
									{this.createNavDays(navDate)}
								</li>
							);
						})
					}
				</ul>
			</div>
		)
	}
}

export default ScheduleNav;
