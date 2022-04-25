import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import getDataTv, {
  showsGenres,
  sortTvShows,
} from "../redux/actions/tvShows.actions";
import { State } from "../redux/reducers/root-reducer";
import { TvShow } from "../types";
import { Grid } from "@mui/material";
import TvItem from "../components/TvItem";
import getTvShow from "../redux/actions/tvShow.actions";
import NoResults from "../components/NoResults";
import AppPagination from "../components/AppPagination";

const TvShows = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get("page") || "1");

  const dispatch = useDispatch();

  const { tvShows, loaded, genres, page, total_pages } = useSelector(
    (state: State) => state.tvShows
  );
  const search: string = useSelector((state: State) => state.search.searchTerm);
  const gensArr: string[] = useSelector((state: State) => state.genres.genres);

  useEffect(() => {
    dispatch(getDataTv(search, pageNo));
    dispatch(showsGenres());
  }, [dispatch, search, pageNo]);

  useEffect(() => {
    if (gensArr.length !== 0) {
      dispatch(sortTvShows(gensArr, tvShows, genres));
    } else {
      dispatch(getDataTv(search, pageNo));
    }
  }, [dispatch, gensArr]);

  return (
    <div className="main-compartiment">
      {loaded ? (
        <Grid container id="card-container">
          {tvShows.length === 0 ? (
            <NoResults />
          ) : (
            tvShows.map((entry: TvShow) => {
              return (
                <TvItem
                  key={entry.id}
                  entry={entry}
                  path={"/tv_shows"}
                  pageNo={page}
                />
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
  getDataTv,
  getTvShow,
  showsGenres,
  sortTvShows,
})(TvShows);
