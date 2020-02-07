import {
  REQUEST_MAGAZINES, RECEIVE_MAGAZINES, REFRESH_MAGAZINES,
  RECEIVE_MAGAZINE, RECEIVE_FEATURE_MAGAZINE, FAIL_MAGAZINE,
  UPDATE_ITEMS_PER_PAGE, RECEIVE_MAGAZINE_LABELS, REQUEST_FEATURE_MAGAZINE,
} from '../actions/magazines';

const defaultState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  loadedItems: [],
  total: 0,
  totalPages: 0,
  itemsPerPage: 12,
  currentPage: 0,
  needRefresh: false,
  errorMessages: {},
  feaurePostChecked: false,
  featurePost: [],
  labels: {},
};

let tempPaging;
let needRefresh;
const labelsObject = {};

export default function magazines(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_MAGAZINES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case REQUEST_FEATURE_MAGAZINE:
      return Object.assign({}, state, {
        feaurePostChecked: true,
      });
    case RECEIVE_MAGAZINES:
      tempPaging = action.paging || {};
      needRefresh = (state.total !== 0 && state.total !== tempPaging.total);
      return Object.assign({}, state, {
        isFetching: false,
        items: (action.currentPage === 1) ?
          action.magazines : [...state.items, ...action.magazines],
        total: parseInt(tempPaging.total, 10) || 0,
        currentPage: action.currentPage,
        totalPages: parseInt(tempPaging.totalPages, 10) || 0,
        needRefresh,
      });
    case REFRESH_MAGAZINES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.magazines,
        currentPage: action.currentPage,
        needRefresh: false,
      });
    case FAIL_MAGAZINE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessages: {
          ...state.errorMessages,
          [action.slug]: action.error,
        },
      });
    case RECEIVE_MAGAZINE: {
      const newLoadedItems = {
        ...state.loadedItems,
      };
      newLoadedItems[action.data.slug || action.slug] = action.data;
      return Object.assign({}, state, {
        loadedItems: newLoadedItems,
      });
    }
    case RECEIVE_FEATURE_MAGAZINE:
      return Object.assign({}, state, {
        featurePost: action.data,
      });
    case UPDATE_ITEMS_PER_PAGE:
      return Object.assign({}, state, {
        itemsPerPage: action.itemsPerPage,
      });
    case RECEIVE_MAGAZINE_LABELS:
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
