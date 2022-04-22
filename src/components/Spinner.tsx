import React from 'react';
import { connect, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { State } from '../redux/reducers/root-reducer';

const Spinner = () => {
  const spinner = useSelector((state: State) => state.movies.loaded);
  console.log(spinner);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',

        // margin: 'auto auto',
      }}
    >
      {spinner === false && <CircularProgress />}
    </Box>
  );
};

const mapStateToProps = (state: State) => ({
  loaded: state.movies.loaded,
});

export default connect(mapStateToProps)(Spinner);
