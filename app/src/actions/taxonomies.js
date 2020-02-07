import { wpapi, EXCLUDED_FILTERS } from '../constants';

export const REQUEST_TAXONOMIES = 'REQUEST_TAXONOMIES';
export const RECEIVE_TAXONOMIES = 'RECEIVE_TAXONOMIES';
export const RECEIVE_TAXONOMIES_DATA = 'RECEIVE_TAXONOMIES_DATA';
export const RECEIVE_TAXONOMY = 'RECEIVE_TAXONOMY';

function requestTaxonomies() {
  return {
    type: REQUEST_TAXONOMIES,
  };
}

function receiveTaxonomies(taxonomies) {
  return {
    type: RECEIVE_TAXONOMIES,
    taxonomies,
  };
}

function receiveTaxonomiesData(taxonomiesData) {
  return {
    type: RECEIVE_TAXONOMIES_DATA,
    taxonomiesData,
  };
}

function receiveTaxonomy(taxonomyName, taxonomyData) {
  return {
    type: RECEIVE_TAXONOMY,
    name: taxonomyName,
    data: taxonomyData,
  };
}

function fetchTaxonomy(dispatch, taxonomyName, page = 1, perPage = 100) {
  return new Promise((resolve) => {
    wpapi[taxonomyName]().page(page).perPage(perPage).embed()
      .then((data) => {
        const paging = data._paging;
        delete data._paging;

        if (paging && parseInt(paging.totalPages, 10) > page) {
          fetchTaxonomy(dispatch, taxonomyName, page + 1, perPage)
            .then((taxonomyObject) => {
              dispatch(receiveTaxonomy(taxonomyObject.name, taxonomyObject.data));
            });
        }
        resolve({ name: taxonomyName, data });
      });
  });
}

function fetchTaxonomies() {
  return (dispatch) => {
    dispatch(requestTaxonomies());
    wpapi.taxonomies().then((taxonomies) => {
      const mappedTaxonomies = {};
      Object.keys(taxonomies).forEach((key) => {
        mappedTaxonomies[taxonomies[key].rest_base] = taxonomies[key];
      });
      dispatch(receiveTaxonomies(mappedTaxonomies));

      Object.keys(mappedTaxonomies).forEach((key) => {
        wpapi[key] = wpapi.registerRoute('wp/v2', `/${key}`);
      });

      const promises = Object.keys(mappedTaxonomies)
        .filter(key => (EXCLUDED_FILTERS.indexOf(key) < 0))
        .map(key => fetchTaxonomy(dispatch, key));

      Promise.all(promises).then((data) => {
        const taxonomiesData = data.reduce((allTaxonomies, taxonomyItem) => {
          // eslint-disable-next-line no-param-reassign
          allTaxonomies[taxonomyItem.name] = taxonomyItem.data;
          return allTaxonomies;
        }, {});
        dispatch(receiveTaxonomiesData(taxonomiesData));
      });
    });
  };
}

function shouldFetchTaxonomies(state) {
  const taxonomies = state.taxonomies;
  return !!taxonomies;
}

export function fetchTaxonomiesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTaxonomies(getState())) {
      return dispatch(fetchTaxonomies());
    }
  };
}
