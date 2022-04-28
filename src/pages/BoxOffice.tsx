import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import MovieItem from '../components/MovieItem';
import Spinner from '../components/Spinner';
import { Grid } from '@mui/material';
import { State } from '../redux/reducers/root-reducer';
import { Genre, Movie } from '../types';
import { getBoxOffice, sortMovies } from '../redux/actions/movies.actions';
import NoResults from '../components/NoResults';
import AppPagination from '../components/AppPagination';

const BoxOffice = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get('page') || '1');

  const dispatch = useDispatch();
  const moviesList: Movie[] = useSelector(
    (state: State) => state.movies.movies
  );
  const loaded: boolean = useSelector((state: State) => state.movies.loaded);
  const gensArr: string[] = useSelector((state: State) => state.genres.genres);
  const moviesTypes: Genre[] = useSelector(
    (state: State) => state.movies.genres
  );
  const page = useSelector((state: State) => state.movies.page);
  const total_pages: number = useSelector(
    (state: State) => state.movies.total_pages
  );

  useEffect(() => {
    dispatch(getBoxOffice(pageNo));
  }, [dispatch, pageNo]);

  useEffect(() => {
    if (gensArr.length !== 0) {
      dispatch(sortMovies(gensArr, moviesList, moviesTypes));
    } else {
      dispatch(getBoxOffice(pageNo));
    }
  }, [dispatch, gensArr, pageNo]);

  return (
    <div className='main-compartiment'>
      {loaded ? (
        <Grid container id='card-container'>
          {moviesList.length === 0 ? (
            <NoResults />
          ) : (
            moviesList.map((entry: Movie) => {
              return (
                <MovieItem path={'/box_office'} key={entry.id} entry={entry} />
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

const mapStateToProps = (state: State) => ({
  movies: state.movies.movies,
  loaded: state.movies.loaded,
  genres: state.genres.genres,
});

export default connect(mapStateToProps, { getBoxOffice })(BoxOffice);
