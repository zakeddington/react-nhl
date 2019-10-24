// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import * as types from './actionTypes';
import immutable from 'seamless-immutable';

const initialState = immutable({
	gameDetail: {},
	gameContent: {},
	periodSummary: {},
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.GAME_DETAIL_FETCHED:
			return state.merge({
				gameDetail: action.gameDetail
			});
		case types.GAME_CONTENT_FETCHED:
			return state.merge({
				gameContent: action.gameContent
			});
		case types.GAME_CONTENT_FAILED:
			return state.merge({
				gameContent: {error: true}
			});
		case types.PERIOD_SUMMARY_FETCHED:
			return state.merge({
				periodSummary: action.periodSummary
			});
		default:
			return state;
	}
}

// selectors

export function getGameDetail(state) {
	return state.game.gameDetail;
}

export function getGameContent(state) {
	return state.game.gameContent;
}

export function getPeriodSummary(state) {
	return state.game.periodSummary;
}
