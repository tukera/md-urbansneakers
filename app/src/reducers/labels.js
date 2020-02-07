import {
  RECEIVE_LABELS,
} from '../actions/labels';

const labelsObject = {};

export default function labels(state = { labels: [] }, action) {
  switch (action.type) {
    case RECEIVE_LABELS:
      Object.keys(action.labels).map((i) => { // eslint-disable-line array-callback-return
        if (action.labels[i].slug) {
          labelsObject[action.labels[i].slug] = action.labels[i];
        }
      });
      return Object.assign({}, state, {
        labels: labelsObject,
      });
    default:
      return state;
  }
}
