import { Dispatch } from 'react';
import { ActionType, ResetPage } from '../types_redux';

export const resetPageNo = (search: string, page: number) => {
  return (dispatch: Dispatch<ResetPage>) => {
    if ((search !== undefined || '') && page !== 1)
      dispatch({
        type: ActionType.RESET_PAGE_NO,
        payload: { pageNo: 1 },
      });
    console.log(page, search, 'checking');
  };
};
