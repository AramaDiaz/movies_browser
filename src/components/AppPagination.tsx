import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { PaginationProps } from '../types';

const AppPagination = ({ total_pages }: PaginationProps) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get('page') || '1');
  return (
    <Pagination
      page={pageNo}
      count={total_pages}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
          // to={`${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default AppPagination;
