import { Reducer } from 'redux';
import { INITIAL_STATE } from '..';
import { ActionType } from '../types_redux';

const tvShowReducer: Reducer = (state = INITIAL_STATE.tvShow, action) => {
  switch (action.type) {
    case ActionType.GOT_TV:
      return {
        ...state,
        tvShow: action.payload.tvShow,
        fetched: action.payload.fetched,
      };

    default:
      return state;
  }
};

export default tvShowReducer;
