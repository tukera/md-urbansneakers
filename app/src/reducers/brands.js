import {
  REQUEST_BRANDS, RECEIVE_BRANDS, FAIL_BRANDS, SELECT_CHAR,
  RECEIVE_BRAND,
} from '../actions/brands';

const defaultState = {
  isFetching: false,
  hasError: false,
  chars: [...'#ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
  brands: {},
  selectedChar: '',
  topBrands: [],
  loadedItems: [],
};

export default function brands(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_BRANDS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_BRANDS:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: false,
        brands: action.payload.brands,
        selectedChar: state.chars.find(char => action.payload.brands[char]),
        topBrands: action.payload.topBrands,
      });
    case FAIL_BRANDS:
      return Object.assign({}, state, {
        isFetching: false,
        hasError: true,
      });
    case SELECT_CHAR:
      return Object.assign({}, state, {
        selectedChar: action.payload,
      });
    case RECEIVE_BRAND: {
      return Object.assign({}, state, {
        loadedItems: {
          ...state.loadedItems,
          [action.data.slug || action.slug]: action.data,
        },
        isFetching: false,
      });
    }
    default:
      return state;
  }
}
