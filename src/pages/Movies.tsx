import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../redux/reducers/root-reducer';
import { Movie } from '../types';
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

  const { movies, loaded, genres, total_pages } = useSelector(
    (state: State) => state.movies
  );
  const search: string = useSelector((state: State) => state.search.searchTerm);
  const gensArr: string[] = useSelector((state: State) => state.genres.genres);

  useEffect(() => {
    dispatch(moviesGenres());
  }, []);

  useEffect(() => {
    dispatch(getData(search, pageNo));
    // search && pageNo !== 1 && navigate('/');
  }, [dispatch, search, pageNo]);

  useEffect(() => {
    if (gensArr.length !== 0) {
      dispatch(sortMovies(gensArr, movies, genres));
    } else {
      dispatch(getData(search, pageNo));
    }
  }, [dispatch, gensArr, search]);

  return (
    <div className='main-compartiment'>
      {loaded ? (
        <Grid id='card-container' container>
          {movies.length === 0 ? (
            <NoResults />
          ) : (
            movies.map((entry: Movie) => {
              return (
                <MovieItem path={`/movies`} key={entry.id} entry={entry} />
              );
            })
          )}
        </Grid>
      ) : (
        <Spinner loaded={loaded} />
      )}
      <Outlet />
      <AppPagination total_pages={total_pages} />
    </div>
  );
};

export default connect(null, {
  getData,
  getMovie,
  moviesGenres,
  sortMovies,
})(Movies);
