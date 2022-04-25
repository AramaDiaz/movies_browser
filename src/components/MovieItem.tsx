import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { MovieItemProps } from "../types";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const MovieItem = ({ entry, path }: MovieItemProps) => {
  const { poster_path, id, title, release_date, vote_average } = entry;
  const base_url = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {poster_path ? (
        <Grid item sm={2.4} sx={{ padding: "0.5rem" }}>
          <Link
            to={`${path}/movie/${id}-${title
              .replaceAll(" ", "_")
              .toLocaleLowerCase()}`}
          >
            <Card className="movie-list">
              <CardMedia
                className="image"
                component="img"
                alt={title}
                image={
                  poster_path === null
                    ? `https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg`
                    : `${base_url + poster_path}`
                }
              />

              <div className="footer">
                <div className="bottom-left">
                  {release_date?.substring(0, 4)}
                </div>
                <div className="bottom-right">
                  <Rating max={1} defaultValue={10} sx={{ fontSize: "1rem" }} />
                  <span className="rating">{vote_average}</span>
                </div>
              </div>
            </Card>
          </Link>
          {/* {poster_path === null && ( */}
          {/* <div */}
          {/* style={{ marginTop: '1rem', fontSize: '2rem', fontWeight: '600' }} */}
          {/* > */}
          {/* {title} {'   '} */}
          {/* {release_date.substring(0, 4)} */}
          {/* </div> */}
          {/* )} */}
        </Grid>
      ) : (
        <div style={{ display: "hidden" }} />
      )}
    </>
  );
};

export default MovieItem;
