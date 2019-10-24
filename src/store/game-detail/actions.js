// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import * as types from './actionTypes';
import GameDetailService from '../../services/GameDetailService';

export function fetchGameDetail(gameId) {
	return async(dispatch, getState) => {
		try {
			const gameDetail = await GameDetailService.getGameDetail(gameId);

			// console.log('actions fetchGameDetail', gameDetail);

			dispatch({ type: types.GAME_DETAIL_FETCHED, gameDetail });
		} catch (error) {
			console.error(error);
		}
	};
}

export function fetchGameContent(gameId) {
	return async(dispatch, getState) => {
		try {
			const gameContent = await GameDetailService.getGameContent(gameId);

			// console.log('actions fetchGameContent', gameContent);

			dispatch({ type: types.GAME_CONTENT_FETCHED, gameContent });
		} catch (error) {
			dispatch({ type: types.GAME_CONTENT_FAILED });
			console.error(error);
		}
	};
}

export function fetchPeriodSummary(gameId) {
	return async(dispatch, getState) => {
		try {
			const periodSummary = await GameDetailService.getPeriodSummary(gameId);

			// console.log('actions fetchPeriodSummary', periodSummary);

			dispatch({ type: types.PERIOD_SUMMARY_FETCHED, periodSummary });
		} catch (error) {
			console.error(error);
		}
	};
}
