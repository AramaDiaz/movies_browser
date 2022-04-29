import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { connect, useDispatch } from 'react-redux';
import { clearSearch, setCurrentSearch } from '../redux/actions/search.actions';
import { bindActionCreators } from 'redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const [text, setText] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const dispatch = useDispatch();
  bindActionCreators(setCurrentSearch, dispatch);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setText('');
    dispatch(clearSearch());
    if (location === '/tv_shows') {
      navigate('/tv_shows');
    } else navigate('/');
  };
  const getSearchTerm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      dispatch(setCurrentSearch(e.currentTarget.value));
      if (location === '/tv_shows') {
        navigate('/tv_shows');
      } else navigate('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <div className='search-bar'>
      <div className='search-icon'>
        <SearchIcon fontSize='large' />
      </div>
      <div className='input-field'>
        <input
          className='search-field'
          type='text'
          placeholder='Search for a movie, TV series…'
          onKeyDown={getSearchTerm}
          onChange={handleChange}
          value={text}
          autoFocus
        />
        <button className='x-button' onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default connect(null, {
  setCurrentSearch,
  clearSearch,
})(Search);
