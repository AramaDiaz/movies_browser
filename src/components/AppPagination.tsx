import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { PaginationProps } from '../types';
import { clearSelect } from '../redux/actions/genre.actions';
import { useDispatch } from 'react-redux';
import '../styles/Pagination.scss';

const AppPagination = ({ total_pages }: PaginationProps) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get('page') || '1');

  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    dispatch(clearSelect());
  };

  return (
    <Pagination
      className='pagination'
      page={pageNo}
      count={total_pages}
      renderItem={(item) => (
        <PaginationItem
          className='pagination-item'
          component={Link}
          to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
          onClick={handleClick}
        />
      )}
    />
  );
};

export default AppPagination;
