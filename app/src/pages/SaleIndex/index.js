import React from 'react';
import PropTypes from 'prop-types';
import { injectProps } from 'relpers';
import { propTypes } from '../../actions/decorators';

// Components
import SneakersIndex from '../SneakersIndex';
import Loader from '../../components/Loader';
import Seo from '../../components/Seo';

@propTypes({
  actions: PropTypes.func,
  loadedItems: PropTypes.arrayOf({}),
  selectedFilters: PropTypes.shape({}),
})

export default class SaleIndex extends React.Component {
  @injectProps
  componentDidMount({ actions, loadedItems }) {
    actions.clearAll(false);
    if (loadedItems && !loadedItems.sale) {
      actions.fetchLabelsIfNeeded();
    }
  }

  @injectProps
  componentWillUnmount({ actions }) {
    actions.clearAll(false);
  }

  /* eslint-disable class-methods-use-this */
  @injectProps
  getSneakers(selectedFilters) {
    return (
      (Object.keys(selectedFilters).length === 0) ?
        null : (<SneakersIndex path={{ text: 'Sale', link: '/sale' }} />));
  }

  @injectProps
  render({ loadedItems, selectedFilters, actions }) {
    const sale = loadedItems.sale || undefined;

    if (!sale) {
      return (
        <Loader />
      );
    }

    if (!sale.id) {
      return (
        <div>Error: {sale.message}</div>
      );
    }

    if (Object.keys(selectedFilters).length === 0) {
      actions.selectFilter('labels', sale.id, false);
    }

    return (
      <div className="sale-index" >
        <Seo title={'Sales Sneakers'} />
        {this.getSneakers(selectedFilters)}
      </div>
    );
  }
}
