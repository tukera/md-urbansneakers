import { wpapi } from '../constants';

export const REQUEST_PAGE = 'REQUEST_PAGE';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const FAIL_FETCHING_PAGE = 'FAIL_FETCHING_PAGE';

function requestPage() {
  return {
    type: REQUEST_PAGE,
  };
}

function receivePage(data) {
  return {
    type: RECEIVE_PAGE,
    data,
  };
}

function failFetchingPage(slug, error) {
  return {
    type: FAIL_FETCHING_PAGE,
    data: error,
    slug,
  };
}

export function fetchPage(slug) {
  return (dispatch) => {
    dispatch(requestPage());
    return wpapi.pages().slug(slug).embed().get((err, data) => {
      if (data.length > 0) {
        dispatch(receivePage(data[0]));
      } else {
        dispatch(failFetchingPage(slug, err));
      }
    });
  };
}
