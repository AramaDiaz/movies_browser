import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Search from './Search';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import { State } from '../redux/reducers/root-reducer';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <AppBar
        position='fixed'
        sx={{
          width: '100%',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#03045e',
        }}
      >
        <Toolbar>
          <Typography variant='h4' noWrap component='div'>
            Movies always for you
          </Typography>
        </Toolbar>
        <Search />
      </AppBar>
      <Navigation />
    </Box>
  );
};

const mapStateToProps = (state: State) => ({
  searchTerm: state.search.searchTerm,
});

export default connect(mapStateToProps, null)(Header);
