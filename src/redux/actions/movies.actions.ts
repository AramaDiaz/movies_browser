import { Dispatch } from 'redux';
import { Genre, Movie } from '../../types';
import {
  ActionType,
  FetchMovies,
  MoviesGenres,
  SortMovie,
} from '../types_redux';

const getData =
  (searchTerm: string, pageNo: number) => (dispatch: Dispatch<FetchMovies>) => {
    if (searchTerm === undefined || '') {
      fetch(
        `${process.env.REACT_APP_TMDB_URL}/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNo}&include_adult=false`
      )
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          dispatch({
            type: ActionType.TRENDING,
            payload: {
              movies: resp.results,
              loaded: true,
              page: resp.page,
              total_pages: resp.total_pages,
            },
          });
          return resp.results;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetch(
        `${process.env.REACT_APP_TMDB_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&page=${pageNo}&include_adult=false`
      )
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          dispatch({
            type: ActionType.RECEIVED,
            payload: {
              movies: resp.results,
              loaded: true,
              page: resp.page,
              total_pages: resp.total_pages,
            },
          });
          // console.log(resp);
          return resp.results;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

export const getUpcoming =
  (pageNo: number) => (dispatch: Dispatch<FetchMovies>) => {
    fetch(
      `${process.env.REACT_APP_TMDB_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNo}`
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        dispatch({
          type: ActionType.UPCOMING,
          payload: {
            movies: resp.results,
            loaded: true,
            page: resp.page,
            total_pages: resp.total_pages,
          },
        });
        //   console.log(resp.results);
        return resp.results;
      })
      .catch((err) => {
        console.error(err);
      });
  };

export const getNowPlaying =
  (pageNo: number) => (dispatch: Dispatch<FetchMovies>) => {
    fetch(
      `${process.env.REACT_APP_TMDB_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNo}`
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        dispatch({
          type: ActionType.NOW_PLAYING,
          payload: {
            movies: resp.results,
            loaded: true,
            page: resp.page,
            total_pages: resp.total_pages,
          },
        });
        //   console.log(resp.results);
        return resp.results;
      })
      .catch((err) => {
        console.error(err);
      });
  };

export const getBoxOffice =
  (pageNo: number) => (dispatch: Dispatch<FetchMovies>) => {
    fetch(
      `${process.env.REACT_APP_TMDB_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNo}`
    )
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        dispatch({
          type: ActionType.BOX_OFFICE,
          payload: {
            movies: resp.results,
            loaded: true,
            page: resp.page,
            total_pages: resp.total_pages,
          },
        });
        // console.log(resp.results);
        return resp;
      })
      .catch((err) => {
        console.error(err);
      });
  };

export const moviesGenres = () => (dispatch: Dispatch<MoviesGenres>) => {
  fetch(
    `${process.env.REACT_APP_TMDB_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&language=en-US`
  )
    .then((response) => response.json())
    .then((res) => {
      dispatch({
        type: ActionType.MOVIES_GENRES,
        payload: res.genres,
      });
      // console.log('test for genres', res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sortMovies = (
  sortGenre: string[],
  moviesList: Movie[],
  moviesTypes: Genre[]
) => {
  const sortedMovies = moviesList.filter((entry: Movie) => {
    const genTitles = entry.genre_ids.map((id: number) => {
      return moviesTypes
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
  return (dispatch: Dispatch<SortMovie>) => {
    dispatch({
      type: ActionType.SORT_MOVIES,
      payload: sortedMovies,
    });
    // console.log(sortGenre, 'test pt redux', moviesList, sortedMovies);
  };
};

export default getData;
