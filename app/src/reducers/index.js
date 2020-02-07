import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';

import brands from './brands';
import runtime from './runtime';
import magazines from './magazines';
import tags from './tags';
import taxonomies from './taxonomies';
import sneakers from './sneakers';
import filters from './filters';
import search from './search';
import pages from './pages';
import labels from './labels';

/* eslint-disable no-param-reassign */
export default combineReducers({
  browser: createResponsiveStateReducer(
    {
      xs: 495,
      sm: 767,
      md: 1023,
      lg: 1439,
    },
    {
      infinity: 'xl',
      extraFields: ({ greaterThan, lessThan, is }) => ({
        mobile: lessThan.sm || is.sm,
        tablet: (lessThan.md || is.md) && greaterThan.sm,
      }),
    },
  ),
  brands,
  runtime,
  magazines,
  tags,
  taxonomies,
  sneakers,
  filters,
  search,
  pages,
  labels,
});
