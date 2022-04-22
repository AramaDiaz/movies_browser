import { combineReducers } from 'redux';
import genreReducer from './genre.reducer';
import searchReducer from './search.reducer';
import movieReducer from './movie.reducer';
import dataMoviesReducer from './movies.reducer';
import tvShowReducer from './tvShow.reducer';
import dataTvShowsReducer from './tvShows.reducer';

const rootReducer = combineReducers({
  search: searchReducer,
  genres: genreReducer,
  movies: dataMoviesReducer,
  tvShows: dataTvShowsReducer,
  movie: movieReducer,
  tvShow: tvShowReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
