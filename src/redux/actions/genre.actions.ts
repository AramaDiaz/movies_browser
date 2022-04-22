import { Dispatch } from 'redux';
import { ActionType, Genres } from '../types_redux';

export const setGenres = (genres: string[]) => {
  return (dispatch: Dispatch<Genres>) => {
    dispatch({
      type: ActionType.GET_GENRE,
      payload: genres,
    });
    // console.log(genres, "test pt redux");
  };
};

export const clearSelect = () => {
  return (dispatch: Dispatch<Genres>) => {
    dispatch({
      type: ActionType.CLEAR_SELECT,
      payload: [],
    });
    // console.log('test');
  };
};
