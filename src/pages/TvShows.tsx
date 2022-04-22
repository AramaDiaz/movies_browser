import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import getDataTv, {
  showsGenres,
  sortTvShows,
} from '../redux/actions/tvShows.actions';
import { State } from '../redux/reducers/root-reducer';
import { Genre, TvShow } from '../types';
import { Grid } from '@mui/material';
import TvItem from '../components/TvItem';
import getTvShow from '../redux/actions/tvShow.actions';
import NoResults from '../components/NoResults';
import AppPagination from '../components/AppPagination';

const TvShows = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get('page') || '1');

  const dispatch = useDispatch();

  const tvShowsList: TvShow[] = useSelector(
    (state: State) => state.tvShows.tvShows
  );
  const loaded: boolean = useSelector((state: State) => state.tvShows.loaded);
  const search: string = useSelector((state: State) => state.search.searchTerm);
  const gensArr: string[] = useSelector((state: State) => state.genres.genres);
  const showsTypes: Genre[] = useSelector(
    (state: State) => state.tvShows.genres.genres
  );
  const page: number = useSelector((state: State) => state.tvShows.page);
  const total_pages: number = useSelector(
    (state: State) => state.tvShows.total_pages
  );

  useEffect(() => {
    if (page !== 1 && search !== undefined) {
      dispatch(getDataTv(search, 1));
    }
    dispatch(getDataTv(search, pageNo));
    dispatch(showsGenres());
  }, [dispatch, search, pageNo]);

  useEffect(() => {
    if (gensArr.length !== 0) {
      dispatch(sortTvShows(gensArr, tvShowsList, showsTypes));
    } else {
      dispatch(getDataTv(search, pageNo));
    }
  }, [dispatch, gensArr, pageNo]);

  return (
    <div className='main-compartiment'>
      {loaded ? (
        <Grid container id='card-container'>
          {tvShowsList.length === 0 ? (
            <NoResults />
          ) : (
            tvShowsList.map((entry: TvShow) => {
              return (
                <TvItem
                  key={entry.id}
                  entry={entry}
                  path={'/tv_shows'}
                  pageNo={page}
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
  tvShows: state.tvShows.tvShows,
  search: state.search.searchTerm,
  loaded: state.tvShows.loaded,
  genres: state.genres.genres,
  showsGenres: state.tvShows.genres,
  page: state.tvShows.page,
  total_pages: state.tvShows.total_pages,
});

export default connect(mapStateToProps, {
  getDataTv,
  getTvShow,
  showsGenres,
  sortTvShows,
})(TvShows);
