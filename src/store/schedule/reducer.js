// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import * as types from './actionTypes';
import immutable from 'seamless-immutable';
import moment from 'moment';
import CONSTANTS from '../../config/Constants';

const initialState = immutable({
	scheduleGames: [],
	scheduleStartDate: null,
	scheduleIsLoading: true,
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.SCHEDULE_GAMES_FETCHING:
			return state.merge({
				scheduleIsLoading: true,
			});
		case types.SCHEDULE_GAMES_FETCHED:
			return state.merge({
				scheduleGames: action.scheduleGames,
				scheduleIsLoading: false,
			});
		default:
			return state;
	}
}

// selectors

export function getScheduleGames(state) {
	return state.schedule.scheduleGames;
}

export function getScheduleStartDate(state) {
	let dateFormat = CONSTANTS.momentOptions.apiFormat;
	let startDate = moment();
	let pathname = window.location.pathname;

	if (pathname.indexOf(CONSTANTS.routePaths.schedule) !== -1) {
		let date = pathname.replace(CONSTANTS.routePaths.schedule, '');
		startDate = moment(date, dateFormat);
	}
	return startDate;
}

export function getScheduleLoadingState(state) {
	return state.schedule.scheduleIsLoading;
}
