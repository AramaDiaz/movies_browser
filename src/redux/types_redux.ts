import { Details, Genre, Movie, TvShow, TvShowDetails } from '../types';

export type State = {
  searchTerm: string;
  genres: {
    genres: string[];
  };
  movies: {
    movies: Movie[];
    loaded: boolean;
    genres: Genre[];
    page: number;
    total_pages: number;
  };
  movie: {
    movie: Details;
    fetched: boolean;
  };
  tvShows: {
    tvShows: TvShow[];
    loaded: boolean;
    genres: Genre[];
    page: number;
    total_pages: number;
  };
  tvShow: {
    tvShow: TvShowDetails;
    fetched: boolean;
  };
};

export enum ActionType {
  SET_SEARCH_TERM = 'SET_SEARCH_TERM',
  GET_GENRE = 'GET_GENRE',
  LOADING = 'LOADING',
  RECEIVED = 'RECEIVED',
  RECEIVED_TV = 'RECEIVED_TV',
  GOT_MOVIE = 'GOT_MOVIE',
  GOT_TV = 'GOT_TV',
  TRENDING = 'TRENDING',
  TRENDING_TV = 'TRENDING_TV',
  UPCOMING = 'UPCOMING',
  NOW_PLAYING = 'NOW_PLAYING',
  BOX_OFFICE = 'BOX_OFFICE',
  CLEAR_SEARCH = 'CLEAR_SEARCH',
  MOVIES_GENRES = 'MOVIE_GENRES',
  SORT_MOVIES = 'SORT_MOVIES',
  SHOWS_GENRES = 'SHOWS_GENRES',
  SORT_SHOWS = 'SORT_SHOWS',
  CLEAR_SELECT = 'CLEAR_SELECT',
}

export interface SearchAction {
  type: ActionType.SET_SEARCH_TERM | ActionType.CLEAR_SEARCH;
  payload?: string;
}
export type Search = SearchAction;

export interface GenreAction {
  type: ActionType.GET_GENRE | ActionType.CLEAR_SELECT;
  payload: string[];
}
export type Genres = GenreAction;

export interface FetchMoviesAction {
  type:
    | ActionType.RECEIVED
    | ActionType.TRENDING
    | ActionType.UPCOMING
    | ActionType.NOW_PLAYING
    | ActionType.BOX_OFFICE;
  payload: {
    movies: Movie[];
    loaded: boolean;
  };
}
export type FetchMovies = FetchMoviesAction;

export interface FetchMoviesGenres {
  type: ActionType.MOVIES_GENRES;
  payload: {
    genres: Genre[];
  };
}
export type MoviesGenres = FetchMoviesGenres;

export interface FetchTvShowsAction {
  type: ActionType.RECEIVED_TV | ActionType.TRENDING_TV;
  payload: {
    tvShows: TvShow[];
    loaded: boolean;
  };
}
export type FetchTvShows = FetchTvShowsAction;

export interface FetchShowsGenres {
  type: ActionType.SHOWS_GENRES;
  payload: {
    genres: Genre[];
  };
}
export type ShowsGenres = FetchShowsGenres;

export interface GetMovieAction {
  type: ActionType.GOT_MOVIE;
  payload: {
    movie: Details;
    fetched: boolean;
  };
}
export type GetMovie = GetMovieAction;

export interface GetTvAction {
  type: ActionType.GOT_TV;
  payload: {
    tvShow: TvShow;
    fetched: boolean;
  };
}
export type GetTv = GetTvAction;

export interface SortMovieAction {
  type: ActionType.SORT_MOVIES;
  payload: Movie[];
}
export type SortMovie = SortMovieAction;

export interface SortShowsAction {
  type: ActionType.SORT_SHOWS;
  payload: TvShow[];
}

export type SortShows = SortShowsAction;
