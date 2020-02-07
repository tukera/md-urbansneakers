import {
  REQUEST_TAXONOMIES,
  RECEIVE_TAXONOMIES,
  RECEIVE_TAXONOMY,
  RECEIVE_TAXONOMIES_DATA,
} from '../actions/taxonomies';

import {
  SELECT_FILTER,
  CLEAR_ALL_BY_KEY,
  CLEAR_ALL,
} from '../actions/filters';

const defaultState = {
  taxonomiesLoading: false,
  taxonomiesList: {},
  taxonomies: {},
  selectedFilters: {},
};

export default function taxonomies(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_TAXONOMIES:
      return Object.assign({}, state, {
        taxonomiesLoading: true,
      });
    case RECEIVE_TAXONOMIES:
      return Object.assign({}, state, {
        taxonomiesList: action.taxonomies,
        taxonomiesLoading: false,
      });
    case RECEIVE_TAXONOMIES_DATA:
      return Object.assign({}, state, {
        taxonomies: action.taxonomiesData,
      });
    case RECEIVE_TAXONOMY:
      return Object.assign({}, state, {
        taxonomies: Object.assign({}, state.taxonomies, {
          [action.name]: [
            ...(state.taxonomies[action.name] || []),
            ...action.data,
          ],
        }),
      });
    case SELECT_FILTER: {
      const index = (state.selectedFilters[action.filterkey] || []).indexOf(action.valueId);

      return Object.assign({}, state, {
        selectedFilters: Object.assign({}, state.selectedFilters, {
          [action.filterkey]: index >= 0
            ? [
              ...state.selectedFilters[action.filterkey].slice(0, index),
              ...state.selectedFilters[action.filterkey].slice(index + 1),
            ] : [...(state.selectedFilters[action.filterkey] || []), action.valueId],
        }),
      });
    }
    case CLEAR_ALL_BY_KEY:
      return Object.assign({}, state, {
        selectedFilters: Object.assign({}, state.selectedFilters, {
          [action.key]: [],
        }),
      });
    case CLEAR_ALL:
      return Object.assign({}, state, {
        selectedFilters: {},
      });
    default:
      return state;
  }
}
