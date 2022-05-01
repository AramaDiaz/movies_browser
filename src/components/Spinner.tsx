import React from 'react';
import Box from '@mui/material/Box';
import { SpinnerProps } from '../types';
import '../styles/Spinner.scss';

const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <Box>
      {loading && (
        <>
          <div className='loader loader-1'>
            <div className='loader-outter'></div>
            <div className='loader-inner'></div>
          </div>
        </>
      )}
    </Box>
  );
};

export default Spinner;
