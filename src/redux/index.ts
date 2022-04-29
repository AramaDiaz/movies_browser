import { Details, TvShowDetails } from '../types';
import { State } from './types_redux';

export const INITIAL_STATE: State = {
  search: {
    searchTerm: '',
  },
  genres: {
    genres: [],
  },
  movies: {
    movies: [],
    loaded: false,
    genres: [],
    page: 0,
    total_pages: 0,
  },
  movie: {
    movie: {} as Details,
    fetched: false,
  },
  tvShows: {
    tvShows: [],
    loaded: false,
    genres: [],
    page: 0,
    total_pages: 0,
  },
  tvShow: {
    tvShow: {} as TvShowDetails,
    fetched: false,
  },
};
