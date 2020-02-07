import {
  REQUEST_SNEAKERS, RECEIVE_SNEAKERS, REFRESH_SNEAKERS,
  RECEIVE_SNEAKER, FAIL_SNEAKER, REQUEST_SNEAKER,
  UPDATE_ITEMS_PER_PAGE, CLEAR_SNEAKERS, UPDATE_SNEAKERS_PREFIX,
} from '../actions/sneakers';

const defaultState = {
  isFetching: false,
  loadedItems: {},
  itemsLoading: {},
  sneakersErrorMessages: {},
  prefix: 'default',
  default: {
    items: [],
    total: 0,
    totalPages: 0,
    itemsPerPage: 12,
    currentPage: 0,
    needRefresh: false,
  },
  sale: {
    items: [],
    total: 0,
    totalPages: 0,
    itemsPerPage: 12,
    currentPage: 0,
    needRefresh: false,
  },
  filter: {
    items: [],
    total: 0,
    totalPages: 0,
    itemsPerPage: 12,
    currentPage: 0,
    needRefresh: false,
  },
  brand: {
    items: [],
    total: 0,
    totalPages: 0,
    itemsPerPage: 12,
    currentPage: 0,
    needRefresh: false,
  },
};

let tempPaging;
let needRefresh;

export default function sneakers(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_SNEAKERS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_SNEAKERS:
      tempPaging = action.sneakers._paging || {};
      needRefresh = !!(state[state.prefix].total && state[state.prefix].total !== 0
        && action.currentPage !== 1 && tempPaging.total
        && state[state.prefix].total !== parseInt(tempPaging.total, 10));
      return Object.assign({}, state, {
        isFetching: false,
        [state.prefix]: Object.assign({}, state[state.prefix], {
          items: (parseInt(action.currentPage, 10) === 1) ?
            action.sneakers : [...state[state.prefix].items, ...action.sneakers],
          total: parseInt(tempPaging.total, 10),
          currentPage: parseInt(action.currentPage, 10),
          totalPages: parseInt(tempPaging.totalPages, 10),
          needRefresh,
        }),
      });
    case REFRESH_SNEAKERS:
      return Object.assign({}, state, {
        isFetching: false,
        [state.prefix]: Object.assign({}, state[state.prefix], {
          items: action.sneakers,
          currentPage: action.currentPage,
          needRefresh: false,
        }),
      });
    case REQUEST_SNEAKER:
      return Object.assign({}, state, {
        itemsLoading: {
          ...state.itemsLoading,
          [action.slug]: true,
        },
      });
    case FAIL_SNEAKER:
      return Object.assign({}, state, {
        itemsLoading: {
          ...state.itemsLoading,
          [action.slug]: false,
        },
        sneakersErrorMessages: {
          ...state.sneakersErrorMessages,
          [action.slug]: action.error,
        },
      });
    case RECEIVE_SNEAKER: {
      return Object.assign({}, state, {
        loadedItems: {
          ...state.loadedItems,
          [action.data.slug || action.slug]: action.data,
        },
        itemsLoading: {
          ...state.itemsLoading,
          [action.data.slug || action.slug]: false,
        },
      });
    }
    case UPDATE_ITEMS_PER_PAGE:
      return Object.assign({}, state, {
        [state.prefix]: Object.assign({}, state[state.prefix], {
          itemsPerPage: action.itemsPerPage,
        }),
      });
    case CLEAR_SNEAKERS:
      return Object.assign({}, state, {
        [state.prefix]: Object.assign({}, state[state.prefix], {
          ...defaultState[state.prefix],
        }),
      });
    case UPDATE_SNEAKERS_PREFIX:
      return Object.assign({}, state, {
        prefix: action.prefix,
      });
    default:
      return state;
  }
}
