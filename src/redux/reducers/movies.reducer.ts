import { Reducer } from 'redux';
import { INITIAL_STATE } from '..';
import { ActionType } from '../types_redux';

const dataMoviesReducer: Reducer = (state = INITIAL_STATE.movies, action) => {
  switch (action.type) {
    case ActionType.LOADING:
      return { ...state };
    case ActionType.RECEIVED:
      return {
        ...state,
        movies: action.payload.movies,
        loaded: action.payload.loaded,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case ActionType.TRENDING:
      return {
        ...state,
        movies: action.payload.movies,
        loaded: action.payload.loaded,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case ActionType.UPCOMING:
      return {
        ...state,
        movies: action.payload.movies,
        loaded: action.payload.loaded,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case ActionType.NOW_PLAYING:
      return {
        ...state,
        movies: action.payload.movies,
        loaded: action.payload.loaded,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case ActionType.BOX_OFFICE:
      return {
        ...state,
        movies: action.payload.movies,
        loaded: action.payload.loaded,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    case ActionType.MOVIES_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case ActionType.SORT_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};

export default dataMoviesReducer;
