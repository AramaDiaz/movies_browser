import { ActionType } from "../types_redux";
import { Reducer } from "redux";
import { INITIAL_STATE } from "..";

const searchReducer: Reducer = (
  state = INITIAL_STATE.search.searchTerm,
  action
) => {
  switch (action.type) {
    case ActionType.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
    case ActionType.CLEAR_SEARCH:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
