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
			const data = await GameDetailService.getGameData(gameId);

			try {
        const gameDetail = await GameDetailService.processGameData(data);
        dispatch({ type: types.GAME_DETAIL_FETCHED, gameDetail });
      } catch (error) {
			  console.error(error);
        dispatch({ type: types.GAME_DETAIL_FAILED });
      }

			try {
				const periodSummary = await GameDetailService.processPeriodSummary(data);
				dispatch({ type: types.PERIOD_SUMMARY_FETCHED, periodSummary });
			} catch (error) {
				console.error(error);
				dispatch({ type: types.PERIOD_SUMMARY_FAILED });
			}

			try {
				const teamStats = await GameDetailService.processTeamStats(data);
				dispatch({ type: types.TEAM_STATS_FETCHED, teamStats });
			} catch (error) {
				console.error(error);
				dispatch({ type: types.TEAM_STATS_FAILED });
			}

		} catch (error) {
      dispatch({ type: types.GAME_DETAIL_FAILED });
			dispatch({ type: types.PERIOD_SUMMARY_FAILED });
      dispatch({ type: types.TEAM_STATS_FAILED });
			console.error(error);
		}
	};
}

export function fetchGameContent(gameId) {
	return async(dispatch, getState) => {
		try {
			const data = await GameDetailService.getGameContent(gameId);

      try {
        const gameContent = await GameDetailService.processGameContent(data);
        dispatch({ type: types.GAME_CONTENT_FETCHED, gameContent });
      } catch (error) {
        console.error(error);
        dispatch({ type: types.GAME_CONTENT_FAILED });
      }

		} catch (error) {
			dispatch({ type: types.GAME_CONTENT_FAILED });
			console.error(error);
		}
	};
}
