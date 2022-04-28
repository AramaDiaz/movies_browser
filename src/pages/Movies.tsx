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
import { Grid, ImageList } from '@mui/material';
import MovieItem from '../components/MovieItem';
import NoResults from '../components/NoResults';
import AppPagination from '../components/AppPagination';
import { clearSelect } from '../redux/actions/genre.actions';
import { resetPageNo } from '../redux/actions/page.actions';

const Movies = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get('page') || '1');

  const dispatch = useDispatch();

  const { movies, loaded, genres, page, total_pages } = useSelector(
    (state: State) => state.movies
  );
  const newPage = useSelector((state: State) => state.page.pageNo);
  const search: string = useSelector((state: State) => state.search.searchTerm);
  const gensArr: string[] = useSelector((state: State) => state.genres.genres);

  useEffect(() => {
    dispatch(moviesGenres());
  }, []);

  useEffect(() => {
    dispatch(getData(search, pageNo));
  }, [dispatch, search, pageNo]);

  useEffect(() => {
    if (gensArr.length !== 0) {
      dispatch(sortMovies(gensArr, movies, genres));
    } else {
      dispatch(getData(search, pageNo));
    }
  }, [dispatch, gensArr, search]);

  useEffect(() => {
    dispatch(clearSelect());
  }, [dispatch, pageNo]);

  // useEffect(() => {
  //   loaded && dispatch(resetPageNo(search, pageNo));
  //   dispatch(getData(search, newPage));
  // }, [dispatch, search]);

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
      <AppPagination pageNo={page} total_pages={total_pages} />
    </div>
  );
};

export default connect(null, {
  getData,
  getMovie,
  moviesGenres,
  sortMovies,
})(Movies);
