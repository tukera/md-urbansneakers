import _get from 'lodash/get';
import { wpapi } from '../constants';

export const REQUEST_MAGAZINES = 'REQUEST_MAGAZINES';
export const RECEIVE_MAGAZINES = 'RECEIVE_MAGAZINES';
export const RECEIVE_FEATURE_MAGAZINE = 'RECEIVE_FEATURE_MAGAZINE';
export const REFRESH_MAGAZINES = 'REFRESH_MAGAZINES';

export const REQUEST_MAGAZINE = 'REQUEST_MAGAZINE';
export const REQUEST_FEATURE_MAGAZINE = 'REQUEST_FEATURE_MAGAZINE';
export const RECEIVE_MAGAZINE = 'RECEIVE_MAGAZINE';
export const FAIL_MAGAZINE = 'FAIL_MAGAZINE';

export const REQUEST_MAGAZINE_LABELS = 'REQUEST_MAGAZINE_LABELS';
export const RECEIVE_MAGAZINE_LABELS = 'RECEIVE_MAGAZINE_LABELS';

export const UPDATE_ITEMS_PER_PAGE = 'UPDATE_ITEMS_PER_PAGE';

function requestPosts() {
  return {
    type: REQUEST_MAGAZINES,
  };
}

function requestFeaturePost() {
  return {
    type: REQUEST_FEATURE_MAGAZINE,
  };
}

function receivePosts(data, currentPage, paging) {
  return {
    type: RECEIVE_MAGAZINES,
    magazines: data,
    currentPage,
    paging,
  };
}

function receiveRefreshedPosts(data, currentPage) {
  return {
    type: REFRESH_MAGAZINES,
    magazines: data,
    currentPage,
  };
}

function formatPost(post) {
  return ({
    id: post.id,
    slug: post.slug,
    seo: post.seo,
    link: `/magazin/${post.slug}`,
    img: _get(post, '_embedded.wp:featuredmedia.0.source_url', ''),
    badge: _get(post, '_embedded.wp:term.0.0.name', 'News'),
    date: post.date,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    tags: _get(post, '_embedded.wp:term.1', []),
    brands: _get(post, 'acf.brands', []),
    authorName: _get(post, '_embedded.author.0.name', false),
    authorSlug: _get(post, '_embedded.author.0.slug', false),
  });
}

function formatPosts(magazines) {
  return magazines.map(post => formatPost(post));
}

export function fetchPosts(itemsPerPage = 12, currentPage = 1) {
  return (dispatch) => {
    dispatch(requestPosts());
    return wpapi.magazines().perPage(itemsPerPage).page(currentPage).embed()
      .get((err, data) => {
        if (err) {
          // TODO: dispatch error
        }
        dispatch(receivePosts(formatPosts(data), currentPage, data._paging));
      });
  };
}

function requestPost(slug) {
  return {
    type: REQUEST_MAGAZINE,
    slug,
  };
}

function receivePost(data) {
  return {
    type: RECEIVE_MAGAZINE,
    data,
  };
}

function failPost(slug, error) {
  return {
    type: FAIL_MAGAZINE,
    error,
    slug,
  };
}

export function fetchPost(slug) {
  return (dispatch) => {
    dispatch(requestPost(slug));
    return wpapi.magazines().slug(slug).embed().get((err, data) => {
      if (data.length > 0) {
        dispatch(receivePost(formatPost(data[0])));
      } else {
        dispatch(failPost(slug, err || 'Seite konnte nicht gefunden werden.'));
      }
    });
  };
}

export function updateItemsPerPage(itemsPerPage) {
  return {
    type: UPDATE_ITEMS_PER_PAGE,
    itemsPerPage,
  };
}

export function refreshPosts(itemsPerPage, currentPage) {
  return (dispatch) => {
    dispatch(requestPosts());
    return wpapi.magazines().perPage(itemsPerPage * currentPage).page(1).embed()
      .get((err, data) => {
        if (err) {
          // TODO: dispatch error
        }
        dispatch(receiveRefreshedPosts(formatPosts(data), currentPage));
      });
  };
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    const { magazines } = getState();
    if (magazines.needRefresh) {
      return dispatch(refreshPosts(magazines.itemsPerPage, magazines.currentPage));
    } else if (!magazines.items || magazines.items.length === 0) {
      return dispatch(fetchPosts());
    }
  };
}

function requestMagazineLabels() {
  return {
    type: REQUEST_MAGAZINE_LABELS,
  };
}

function receiveMagazineLabels(labels) {
  return {
    type: RECEIVE_MAGAZINE_LABELS,
    labels,
  };
}

function fetchMagazineLabels() {
  return (dispatch) => {
    dispatch(requestMagazineLabels());
    return wpapi.magazineLabels().perPage(100).get((err, data) => {
      if (!err) {
        dispatch(receiveMagazineLabels(data));
      }
    });
  };
}

function shouldFetchMagazineLabels(state) {
  const MagazineLabels = state.magazines.labels;
  return !!MagazineLabels;
}

export function fetchMagazineLabelsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMagazineLabels(getState())) {
      return dispatch(fetchMagazineLabels());
    }
  };
}

function receiveFeaturePost(data) {
  return {
    type: RECEIVE_FEATURE_MAGAZINE,
    data,
  };
}

export function fetchFeaturePost() {
  return (dispatch, getState) => {
    const featureId = _get(getState(), 'magazines.labels.featured.id', false);
    if (featureId) {
      dispatch(requestFeaturePost());
      return wpapi.magazines().param('post_labels', featureId).perPage(1).embed()
        .get((err, data) => {
          if (err) {
            // TODO: dispatch error
          }
          dispatch(receiveFeaturePost(data));
        });
    }
  };
}
