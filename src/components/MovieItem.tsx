import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { MovieItemProps } from '../types';
import { ImageListItemBar, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieItem = ({ entry, path }: MovieItemProps) => {
  const { poster_path, id, title, release_date, vote_average } = entry;
  const base_url = 'https://image.tmdb.org/t/p/w500';

  return (
    <>
      {poster_path ? (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2.4}
          sx={{ padding: '0.3rem' }}
        >
          <Link
            to={`${path}/movie/${id}-${title
              .replaceAll(' ', '_')
              .toLocaleLowerCase()}`}
          >
            <Card className='movie-list'>
              <CardMedia
                className='image'
                component='img'
                alt={title}
                image={
                  poster_path === null
                    ? `https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg`
                    : `${base_url + poster_path}`
                }
              />
              <ImageListItemBar
                title={release_date?.substring(0, 4)}
                actionIcon={
                  <div className='bottom-right'>
                    <Rating
                      max={1}
                      defaultValue={10}
                      sx={{ fontSize: '1rem', color: '#FFA500' }}
                    />
                    <span className='rating'>{vote_average}</span>
                  </div>
                }
              />
            </Card>
          </Link>
        </Grid>
      ) : (
        <div style={{ display: 'hidden' }} />
      )}
    </>
  );
};

export default MovieItem;
