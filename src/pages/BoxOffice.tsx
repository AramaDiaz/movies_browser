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
  const { movies, loaded, genres, total_pages } = useSelector(
    (state: State) => state.movies
  );
  const gensArr: string[] = useSelector((state: State) => state.genres.genres);

  useEffect(() => {
    dispatch(getBoxOffice(pageNo));
  }, [dispatch, pageNo]);

  useEffect(() => {
    if (gensArr.length !== 0) {
      dispatch(sortMovies(gensArr, movies, genres));
    } else {
      dispatch(getBoxOffice(pageNo));
    }
  }, [dispatch, gensArr, pageNo]);

  return (
    <div className='main-compartiment'>
      {loaded ? (
        <>
          <Grid container id='card-container'>
            {movies.length === 0 ? (
              <NoResults />
            ) : (
              movies.map((entry: Movie) => {
                return (
                  <MovieItem
                    path={'/box_office'}
                    key={entry.id}
                    entry={entry}
                  />
                );
              })
            )}
          </Grid>
          <Outlet />
          <AppPagination total_pages={total_pages} />
        </>
      ) : (
        <Spinner loading={loaded} />
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  movies: state.movies.movies,
  loaded: state.movies.loaded,
  genres: state.genres.genres,
});

export default connect(mapStateToProps, { getBoxOffice })(BoxOffice);
