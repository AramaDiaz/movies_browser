import { Dispatch } from 'redux';
import { ActionType, GetMovie } from '../types_redux';

const getMovie = (id: string) => (dispatch: Dispatch<GetMovie>) => {
  fetch(
    `${process.env.REACT_APP_TMDB_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=credits`
  )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      dispatch({
        type: ActionType.GOT_MOVIE,
        payload: {
          movie: res,
          fetched: true,
        },
      });
      // console.log('10. received ', res);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

export default getMovie;
