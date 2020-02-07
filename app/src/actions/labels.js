import { wpapi } from '../constants';

export const REQUEST_LABELS = 'REQUEST_LABELS';
export const RECEIVE_LABELS = 'RECEIVE_LABELS';

function requestLabels() {
  return {
    type: REQUEST_LABELS,
  };
}

function receiveLabels(labels) {
  return {
    type: RECEIVE_LABELS,
    labels,
  };
}

function fetchLabels() {
  return (dispatch) => {
    dispatch(requestLabels());
    return wpapi.labels().perPage(100).get((err, data) => {
      if (!err) {
        dispatch(receiveLabels(data));
      }
    });
  };
}

function shouldFetchLabels(state) {
  const labels = state.labels;
  return !!labels;
}

export function fetchLabelsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchLabels(getState())) {
      return dispatch(fetchLabels());
    }
  };
}
