import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { TooltipProps } from '../types';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

const PopOver = ({ season }: TooltipProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Button
        className='popover-button'
        aria-describedby={id}
        variant='contained'
        onClick={handleClick}
      >
        {season.name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          className='popover-content'
          style={{
            maxWidth: '500px',
            display: 'flex',
            height: 'auto',
            alignItems: 'center',
            justifyItems: 'center',
            backgroundColor: 'snow',
            gap: '15px',
            textAlign: 'justify',
            padding: '0 15px 0 5px',
          }}
        >
          <img
            src={
              season.poster_path
                ? `https://image.tmdb.org/t/p/w185${season.poster_path}`
                : 'https://demofree.sirv.com/nope-not-here.jpg'
            }
            alt={season.poster_path && season.name}
            width={185}
            height={264}
          />
          <div>
            <p>
              <b>{season.name}</b>
              {`: ${season.episode_count} episodes`}
            </p>
            {season.overview && (
              <p>
                <b>Overview: </b>
                {`${season.overview}`}
              </p>
            )}
            {season.air_date && (
              <p>
                <b>Air date: </b>
                {`${season.air_date}`}
              </p>
            )}
          </div>
        </Box>
      </Popover>
    </Box>
  );
};

export default PopOver;
