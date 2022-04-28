import React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Genres from './Genres';
import { NavLink } from 'react-router-dom';
import { clearSearch } from '../redux/actions/search.actions';
import { connect, useDispatch } from 'react-redux';
import { State } from '../redux/reducers/root-reducer';
import { clearSelect } from '../redux/actions/genre.actions';

const Navigation = () => {
  const dispatch = useDispatch();

  const handleChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // dispatch(clearSearch());
    dispatch(clearSelect());
  };

  return (
    <Drawer
      className='drawer'
      sx={{
        zIndex: 0,
        opacity: '0.8',
      }}
      open={true}
      variant='persistent'
      anchor='left'
    >
      <Toolbar />
      <NavLink to='/' className='pick' onClick={handleChange}>
        <InboxIcon />
        <span className='category'>Movies</span>
      </NavLink>
      <NavLink to='/tv_shows' className='pick' onClick={handleChange}>
        <LiveTvIcon />
        <span className='category'>TV Shows</span>
      </NavLink>
      <Toolbar />
      <NavLink to='/in_theaters' className='pick' onClick={handleChange}>
        <TheaterComedyIcon />
        <span className='category'>In Theaters</span>
      </NavLink>
      <NavLink to='/upcoming' className='pick' onClick={handleChange}>
        <UpcomingIcon />
        <span className='category'>Coming Soon</span>
      </NavLink>
      <NavLink to='/box_office' className='pick' onClick={handleChange}>
        <LocalActivityIcon />
        <span className='category'>Box Office</span>
      </NavLink>
      <Divider />
      <Divider />
      <Genres />
    </Drawer>
  );
};

const mapStateToProps = (state: State) => ({
  searchTerm: state.search.searchTerm,
});

export default connect(mapStateToProps, { clearSearch, clearSelect })(
  Navigation
);
