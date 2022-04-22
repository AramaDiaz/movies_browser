import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { clearSelect } from '../redux/actions/genre.actions';

const NoResults = () => {
  const dispatch = useDispatch();
  return (
    <div className='no_results'>
      <h1>No results found</h1>
      <button onClick={() => dispatch(clearSelect())}>Go back</button>
    </div>
  );
};

export default connect(null, { clearSelect })(NoResults);
