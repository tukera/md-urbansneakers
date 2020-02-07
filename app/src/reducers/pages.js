import {
  REQUEST_PAGE, RECEIVE_PAGE, FAIL_FETCHING_PAGE,
} from '../actions/pages';

const defaultState = {
  isFetching: false,
  loadedItems: [],
};

export default function pages(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_PAGE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_PAGE: {
      return Object.assign({}, state, {
        loadedItems: {
          ...state.loadedItems,
          [action.data.slug || action.pageName]: action.data,
        },
        isFetching: false,
      });
    }
    case FAIL_FETCHING_PAGE:
      return Object.assign({}, state, {
        isFetching: false,
        loadedItems: {
          ...state.loadedItems,
          [action.slug]: {
            isFailed: true,
          },
        },
      });
    default:
      return state;
  }
}
