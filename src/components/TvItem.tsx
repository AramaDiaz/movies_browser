import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { TvItemProps } from '../types';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { State } from '../redux/reducers/root-reducer';
import { useSelector } from 'react-redux';

const TvItem = ({ entry, path }: TvItemProps) => {
  const { poster_path, id, name, first_air_date, vote_average } = entry;
  const base_url = 'https://image.tmdb.org/t/p/w500';
  const fetched: boolean = useSelector((state: State) => state.tvShows.loaded);
  return (
    <>
      {/* {poster_path ? ( */}
      {fetched && (
        <Grid item sm={2.4} sx={{ padding: '0.5rem' }}>
          <Link
            className='link'
            to={`${path}/tv_show/${id}-${name
              .replaceAll(' ', '_')
              .toLocaleLowerCase()}`}
          >
            <Card className='movie-list'>
              <CardMedia
                className='image'
                component='img'
                alt={name}
                image={
                  poster_path === null
                    ? `https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg`
                    : `${base_url + poster_path}`
                }
              />
              <div className='footer'>
                <div className='bottom-left'>
                  {first_air_date.substring(0, 4)}
                </div>
                <div className='bottom-right'>
                  <Rating max={1} defaultValue={10} sx={{ fontSize: '1rem' }} />
                  <span className='rating'>{vote_average}</span>
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
      )}
      {/* ) : (
        <div style={{ display: 'none' }} />
      )} */}
    </>
  );
};

export default TvItem;
