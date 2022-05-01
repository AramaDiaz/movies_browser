import { Reducer } from 'redux';
import { INITIAL_STATE } from '..';
import { ActionType } from '../types_redux';

const movieReducer: Reducer = (state = INITIAL_STATE.movie, action) => {
  switch (action.type) {
    case ActionType.GOT_MOVIE:
      return {
        ...state,
        movie: action.payload.movie,
        fetched: action.payload.fetched,
      };
    default:
      return state;
  }
};

export default movieReducer;
