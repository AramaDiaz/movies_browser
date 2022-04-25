import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SpinnerProps } from '../types';

const Spinner = ({loaded}: SpinnerProps) => {

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      {loaded === false && <CircularProgress />}
    </Box>
  );
};

export default Spinner;
