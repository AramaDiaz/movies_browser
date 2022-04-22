import { Dispatch } from 'redux';
import { ActionType, Search } from '../types_redux';

export const setCurrentSearch = (searchTerm: string) => {
  return (dispatch: Dispatch<Search>) => {
    dispatch({
      type: ActionType.SET_SEARCH_TERM,
      payload: searchTerm,
    });
    // console.log(searchTerm, "test pt redux");
  };
};

export const clearSearch = () => {
  return (dispatch: Dispatch<Search>) => {
    dispatch({
      type: ActionType.CLEAR_SEARCH,
    });
  };
};
