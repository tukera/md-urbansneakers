import { wpapi } from '../constants';

export const REQUEST_TAGS = 'REQUEST_TAGS';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';

function requestTags() {
  return {
    type: REQUEST_TAGS,
  };
}

function receiveTags(tags) {
  return {
    type: RECEIVE_TAGS,
    tags,
  };
}

function fetchTags() {
  return (dispatch) => {
    dispatch(requestTags());
    return wpapi.tags().perPage(100).get((err, data) => {
      if (!err) {
        dispatch(receiveTags(data));
      }
    });
  };
}

function shouldFetchTags(state) {
  const tags = state.tags;
  return !!tags;
}

export function fetchTagsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTags(getState())) {
      return dispatch(fetchTags());
    }
  };
}
