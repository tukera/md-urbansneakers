import { wpapi } from '../constants';

export const REQUEST_SNEAKERS = 'REQUEST_SNEAKERS';
export const RECEIVE_SNEAKERS = 'RECEIVE_SNEAKERS';
export const REFRESH_SNEAKERS = 'REFRESH_SNEAKERS';

export const REQUEST_SNEAKER = 'REQUEST_SNEAKER';
export const RECEIVE_SNEAKER = 'RECEIVE_SNEAKER';
export const FAIL_SNEAKER = 'FAIL_SNEAKER';

export const UPDATE_ITEMS_PER_PAGE = 'UPDATE_ITEMS_PER_PAGE';
export const UPDATE_SNEAKERS_PREFIX = 'UPDATE_SNEAKERS_PREFIX';
export const CLEAR_SNEAKERS = 'CLEAR_SNEAKERS';

function requestSneakers() {
  return {
    type: REQUEST_SNEAKERS,
  };
}

function receiveSneakers(data, currentPage) {
  return {
    type: RECEIVE_SNEAKERS,
    sneakers: data,
    currentPage,
  };
}

function receiveRefreshedSneakers(data, currentPage) {
  return {
    type: REFRESH_SNEAKERS,
    sneakers: data,
    currentPage,
  };
}

export function fetchSneakers(itemsPerPage = 12, currentPage = 1) {
  return (dispatch, getState) => {
    dispatch(requestSneakers());
    const currentState = getState();
    const sneakersRequest = wpapi.sneakers();

    Object.keys(currentState.taxonomies.selectedFilters).forEach((key) => {
      sneakersRequest.param(key, currentState.taxonomies.selectedFilters[key]);
    });

    return sneakersRequest.perPage(itemsPerPage).page(currentPage).embed()
      .get((err, data) => {
        if (err) {
          // TODO: dispatch error
        }
        dispatch(receiveSneakers(data, currentPage));
      });
  };
}

function requestSneaker(slug) {
  return {
    type: REQUEST_SNEAKER,
    slug,
  };
}

function receiveSneaker(data) {
  return {
    type: RECEIVE_SNEAKER,
    data,
  };
}

function failSneaker(slug, error) {
  return {
    type: FAIL_SNEAKER,
    error,
    slug,
  };
}

export function fetchSneaker(slug) {
  return (dispatch) => {
    dispatch(requestSneaker(slug));
    return wpapi.sneakers().slug(slug).embed().get((err, data) => {
      if (data.length > 0) {
        dispatch(receiveSneaker(data[0]));
      } else {
        dispatch(failSneaker(slug, err || 'Seite konnte nicht gefunden werden.'));
      }
    });
  };
}

export function fetchSneakerIfNeeded(slug) {
  return (dispatch, getState) => {
    const { loadedItems } = getState().sneakers;
    if (!loadedItems[slug]) {
      return dispatch(fetchSneaker(slug));
    }
  };
}

export function updateItemsPerPage(itemsPerPage) {
  return {
    type: UPDATE_ITEMS_PER_PAGE,
    itemsPerPage,
  };
}

export function refreshSneakers(itemsPerPage, currentPage) {
  return (dispatch, getState) => {
    dispatch(requestSneakers());
    const currentState = getState();
    const sneakersRequest = wpapi.sneakers();

    Object.keys(currentState.taxonomies.selectedFilters).forEach((key) => {
      sneakersRequest.param(key, currentState.taxonomies.selectedFilters[key]);
    });

    return sneakersRequest.perPage(itemsPerPage).page(currentPage).embed()
      .get((err, data) => {
        if (err) {
          // TODO: dispatch error
        }
        dispatch(receiveRefreshedSneakers(data, currentPage));
      });
  };
}

export function fetchSneakersIfNeeded() {
  return (dispatch, getState) => {
    const { sneakers } = getState();
    if (sneakers[sneakers.prefix].needRefresh) {
      return dispatch(
        refreshSneakers(
          sneakers[sneakers.prefix].itemsPerPage,
          sneakers[sneakers.prefix].currentPage,
        ),
      );
    } else if (!sneakers[sneakers.prefix].items || sneakers[sneakers.prefix].items.length === 0) {
      return dispatch(fetchSneakers());
    }
  };
}

export function clearSneakers() {
  return {
    type: CLEAR_SNEAKERS,
  };
}

export function setCurrentPrefix(prefix) {
  return {
    type: (prefix) ? UPDATE_SNEAKERS_PREFIX : 'IGNORE_ACTION',
    prefix,
  };
}
