import { Reducer } from 'redux';
import { INITIAL_STATE } from '..';
import { ActionType } from '../types_redux';

const dataTvShowsReducer: Reducer = (state = INITIAL_STATE.tvShows, action) => {
  switch (action.type) {
    case ActionType.RECEIVED_TV:
      return {
        ...state,
        tvShows: action.payload.tvShows,
        loaded: action.payload.loaded,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case ActionType.TRENDING_TV:
      return {
        ...state,
        tvShows: action.payload.tvShows,
        loaded: action.payload.loaded,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case ActionType.SHOWS_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case ActionType.SORT_SHOWS:
      return { ...state, tvShows: action.payload };
    default:
      return state;
  }
};

export default dataTvShowsReducer;
