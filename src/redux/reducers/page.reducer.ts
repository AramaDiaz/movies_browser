import { Reducer } from 'redux';
import { INITIAL_STATE } from '..';
import { ActionType } from '../types_redux';

const pageReducer: Reducer = (state = INITIAL_STATE.page, action) => {
  switch (action.type) {
    case ActionType.RESET_PAGE_NO:
      return {
        ...state,
        pageNo: action.payload.pageNo,
      };
    default:
      return state;
  }
};

export default pageReducer;
