import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../redux/reducers/root-reducer';
import { Genre, Movie } from '../types';
import { connect, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { Outlet, useLocation } from 'react-router-dom';
import getData, {
  moviesGenres,
  sortMovies,
} from '../redux/actions/movies.actions';
import getMovie from '../redux/actions/movie.actions';
import { Grid } from '@mui/material';
import MovieItem from '../components/MovieItem';
import NoResults from '../components/NoResults';
import AppPagination from '../components/AppPagination';

const Movies = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get('page') || '1');

  const dispatch = useDispatch();

  const moviesList: Movie[] = useSelector(
    (state: State) => state.movies.movies
  );
  const loaded: boolean = useSelector((state: State) => state.movies.loaded);
  const search: string = useSelector((state: State) => state.search.searchTerm);
  const gensArr: string[] = useSelector((state: State) => state.genres.genres);
  const moviesTypes: Genre[] = useSelector(
    (state: State) => state.movies.genres
  );
  const page: number = useSelector((state: State) => state.movies.page);
  const total_pages: number = useSelector(
    (state: State) => state.movies.total_pages
  );

  useEffect(() => {
    if (page !== 1 && search !== undefined) {
      dispatch(getData(search, 1));
    }
    dispatch(getData(search, pageNo));
    dispatch(moviesGenres());
  }, [dispatch, search, pageNo]);

  useEffect(() => {
    if (gensArr.length !== 0) {
      dispatch(sortMovies(gensArr, moviesList, moviesTypes));
    } else {
      dispatch(getData(search, pageNo));
    }
  }, [dispatch, gensArr, search, pageNo]);

  return (
    <div className='main-compartiment'>
      {loaded ? (
        <Grid container id='card-container'>
          {moviesList.length === 0 ? (
            <NoResults />
          ) : (
            moviesList.map((entry: Movie) => {
              return (
                <MovieItem
                  path={`/movies`}
                  pageNo={page}
                  key={entry.id}
                  entry={entry}
                />
              );
            })
          )}
        </Grid>
      ) : (
        <Spinner />
      )}
      <Outlet />
      <AppPagination pageNo={page} total_pages={total_pages} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  movies: state.movies.movies,
  search: state.search.searchTerm,
  loaded: state.movies.loaded,
  genres: state.genres.genres,
  moviesTypes: state.movies.genres,
  page: state.movies.page,
  total_pages: state.movies.total_pages,
});

export default connect(mapStateToProps, {
  getData,
  getMovie,
  moviesGenres,
  sortMovies,
})(Movies);
