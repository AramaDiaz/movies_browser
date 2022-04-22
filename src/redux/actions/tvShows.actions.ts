import { Dispatch } from 'redux';
import { Genre, TvShow } from '../../types';
import {
  ActionType,
  FetchTvShows,
  ShowsGenres,
  SortShows,
} from '../types_redux';

const getDataTv =
  (searchTerm: string, pageNo: number) =>
  (dispatch: Dispatch<FetchTvShows>) => {
    if (searchTerm === undefined) {
      fetch(
        `${process.env.REACT_APP_TMDB_URL}/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}`
      )
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          dispatch({
            type: ActionType.TRENDING_TV,
            payload: {
              tvShows: resp.results,
              loaded: true,
              page: resp.page,
              total_pages: resp.total_pages,
            },
          });
          // console.log('7. received ', resp);
          return resp;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetch(
        `${process.env.REACT_APP_TMDB_URL}/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNo}&query=${searchTerm}&include_adult=false`
      )
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          dispatch({
            type: ActionType.RECEIVED_TV,
            payload: {
              tvShows: resp.results,
              loaded: true,
              page: resp.page,
              total_pages: resp.total_pages,
            },
          });
          console.log('7. received ', resp);
          return resp;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

export const showsGenres = () => (dispatch: Dispatch<ShowsGenres>) => {
  fetch(
    `${process.env.REACT_APP_TMDB_URL}/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  )
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: ActionType.SHOWS_GENRES,
        payload: {
          genres: res.genres,
        },
      });
      // console.log('test for genres', res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sortTvShows = (
  sortGenre: string[],
  tvShowsList: TvShow[],
  showsTypes: Genre[]
) => {
  const sortedShows = tvShowsList.filter((entry: TvShow) => {
    const genTitles = entry.genre_ids.map((id: number) => {
      return showsTypes
        .filter((gen: Genre) => {
          return id === gen.id && gen.name;
        })
        .map((genEntry) => genEntry.name)
        .join(', ')
        .toLocaleLowerCase();
    });
    // console.log(sortGenre, genTitles);
    const sort = sortGenre.map((gen: string) => {
      return genTitles.includes(gen);
    });
    // console.log(sort, 'check');
    return sort[sort.length - 1] && { ...entry };
  });
  return (dispatch: Dispatch<SortShows>) => {
    dispatch({
      type: ActionType.SORT_SHOWS,
      payload: sortedShows,
    });
  };
};

export default getDataTv;
