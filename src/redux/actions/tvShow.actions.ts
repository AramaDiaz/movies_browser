import { Dispatch } from 'redux';
import { ActionType, GetTv } from '../types_redux';

const getTvShow = (id: string) => (dispatch: Dispatch<GetTv>) => {
  fetch(
    `${process.env.REACT_APP_TMDB_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      dispatch({
        type: ActionType.GOT_TV,
        payload: {
          tvShow: res,
          fetched: true,
        },
      });
      // console.log('15. received ', res);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

export default getTvShow;
