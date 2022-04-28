import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { connect, useDispatch, useSelector } from 'react-redux';
import { clearSearch, setCurrentSearch } from '../redux/actions/search.actions';
import { bindActionCreators } from 'redux';
import { resetPageNo } from '../redux/actions/page.actions';
import { State } from '../redux/reducers/root-reducer';

const Search = () => {
  const [text, setText] = useState<string>('');
  const page: number = useSelector((state: State) => state.page.pageNo);

  const dispatch = useDispatch();
  bindActionCreators(setCurrentSearch, dispatch);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setText('');
    dispatch(clearSearch());
    dispatch(resetPageNo(text, page));
  };
  const getSearchTerm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      dispatch(setCurrentSearch(e.currentTarget.value));
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
  resetPageNo,
})(Search);
