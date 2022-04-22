import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { connect, useDispatch } from 'react-redux';
import { setCurrentSearch } from '../redux/actions/search.actions';
import { bindActionCreators } from 'redux';
import getData from '../redux/actions/movies.actions';
import { State } from '../redux/reducers/root-reducer';
import { InputBase } from '@mui/material';

const Search = () => {
  // const [text, setText] = useState<string>('');

  const dispatch = useDispatch();
  bindActionCreators(setCurrentSearch, dispatch);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setText(e.target.value);
  };
  const getSearchTerm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      dispatch(setCurrentSearch(e.currentTarget.value));
      // setText('');
    }
  };

  return (
    <div className='search-bar'>
      <div className='search-icon'>
        <SearchIcon fontSize='large' />
      </div>
      <InputBase
        className='search-field'
        type='search'
        placeholder='Search for a movie, TV series…'
        onKeyDown={getSearchTerm}
        // value={text}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  search: state.search.searchTerm,
});

export default connect(mapStateToProps, {
  setCurrentSearch,
  getData,
})(Search);
