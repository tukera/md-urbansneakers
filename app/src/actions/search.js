import _get from 'lodash/get';
import _capitalize from 'lodash/capitalize';
import { decode } from 'he';

import { wpapi } from '../constants';

export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
export const MAYBE_UPDATE_SUGGESTIONS = 'MAYBE_UPDATE_SUGGESTIONS';
export const LOAD_SUGGESTIONS_BEGIN = 'LOAD_SUGGESTIONS_BEGIN';
export const LOAD_SUGGESTIONS_FAIL = 'LOAD_SUGGESTIONS_FAIL';

function loadSuggestionFail(error) {
  return {
    type: LOAD_SUGGESTIONS_FAIL,
    error,
  };
}

function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN,
  };
}

function maybeUpdateSuggestions(suggestions, value) {
  return {
    type: MAYBE_UPDATE_SUGGESTIONS,
    suggestions,
    value,
  };
}

export function updateInputValue(value) {
  return {
    type: UPDATE_INPUT_VALUE,
    value,
  };
}

export function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS,
  };
}

function getSuggestions(value) {
  const searchRequests = ['brands', 'sneakers', 'magazines'].map(key => new Promise((resolve, reject) => {
    wpapi[key]()
      .search(value)
      .perPage(3).page(1)
      .embed()
      .get((err, data) => {
        if (err) {
          reject(err);
        } else {
          const total = _get(data, '_paging.total', 0);
          if (data._paging) delete data._paging;
          resolve({ key, total, data });
        }
      });
  }));

  return Promise.all(searchRequests)
    .then(response => (
      response
        .filter(dataItem => !!dataItem.total)
        .map(dataItem => ({
          key: dataItem.key,
          title: _capitalize(dataItem.key),
          total: dataItem.total,
          results: dataItem.data.map(dataEntry => ({
            id: dataEntry.id,
            name: dataEntry.name || decode(dataEntry.title.rendered),
            link: `/${(dataItem.key === 'magazines') ? 'magazin' : dataItem.key}/${dataEntry.slug}`,
            img: dataItem.key === 'brands' ?
              _get(dataEntry, 'acf.Logo.url') :
              _get(dataEntry, ['_embedded', 'wp:featuredmedia', '0', 'source_url']),
          })),
        }))
    ))
    .catch(err => loadSuggestionFail(err));
}

export function loadSuggestions(value) {
  return (dispatch) => {
    dispatch(loadSuggestionsBegin());

    getSuggestions(value).then((result) => {
      dispatch(maybeUpdateSuggestions(result, value));
    });
  };
}
