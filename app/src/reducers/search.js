import {
  UPDATE_INPUT_VALUE, CLEAR_SUGGESTIONS,
  LOAD_SUGGESTIONS_BEGIN, MAYBE_UPDATE_SUGGESTIONS,
  LOAD_SUGGESTIONS_FAIL,
} from '../actions/search';

const initialState = {
  value: '',
  suggestions: [],
  isLoading: false,
  isFailed: false,
};

export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return Object.assign({}, state, {
        value: action.value,
      });
    case CLEAR_SUGGESTIONS:
      return Object.assign({}, state, {
        suggestions: [],
      });
    case LOAD_SUGGESTIONS_BEGIN:
      return Object.assign({}, state, {
        isLoading: true,
        isFailed: false,
      });
    case LOAD_SUGGESTIONS_FAIL:
      return Object.assign({}, state, {
        isFailed: true,
        error: action.error,
      });
    case MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      return Object.assign({}, state, {
        isLoading: false,
      }, action.value === state.value ? {
        suggestions: action.suggestions,
      } : undefined);
    default:
      return state;
  }
}
