import { fetchSneakers } from './sneakers';

export const SELECT_FILTER = 'SELECT_FILTER';
export const CLEAR_ALL_BY_KEY = 'CLEAR_ALL_BY_KEY';
export const CLEAR_ALL = 'CLEAR_ALL';

function saveSelectedFilter(filterkey, valueId) {
  return {
    type: SELECT_FILTER,
    filterkey,
    valueId,
  };
}

function clearByKey(key) {
  return {
    type: CLEAR_ALL_BY_KEY,
    key,
  };
}

function clear() {
  return {
    type: CLEAR_ALL,
  };
}

export function selectFilter(filterkey, valueId, toFetch = true) {
  return (dispatch) => {
    dispatch(saveSelectedFilter(filterkey, valueId));
    if (toFetch) {
      dispatch(fetchSneakers());
    }
  };
}

export function clearAllByKey(key) {
  return (dispatch) => {
    dispatch(clearByKey(key));
    dispatch(fetchSneakers());
  };
}

export function clearAll(toFetch = true) {
  return (dispatch) => {
    dispatch(clear());
    if (toFetch) {
      dispatch(fetchSneakers());
    }
  };
}
