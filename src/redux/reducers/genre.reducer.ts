import { Reducer } from 'redux';
import { INITIAL_STATE } from '..';
import { ActionType } from '../types_redux';

const genreReducer: Reducer = (state = INITIAL_STATE.genres, action) => {
  switch (action.type) {
    case ActionType.GET_GENRE:
      return { ...state, genres: action.payload };
    case ActionType.CLEAR_SELECT:
      return { ...state, genres: action.payload };
    default:
      return state;
  }
};

export default genreReducer;
