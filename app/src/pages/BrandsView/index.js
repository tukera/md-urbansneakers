import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { injectProps } from 'relpers';
import { propTypes } from '../../actions/decorators';

// Components
import SneakersIndex from '../SneakersIndex';
import AboutBrand from '../../components/AboutBrand';
import Breadcrumb from '../../components/Breadcrumb';
import Loader from '../../components/Loader';

import './index.scss';

@propTypes({
  actions: PropTypes.func,
  loadedItems: PropTypes.arrayOf({}),
  selectedFilters: PropTypes.shape({}),
})

export default class BrandsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: props.match.params.slug,
    };
  }

  @injectProps
  componentDidMount({ actions, loadedItems }) {
    actions.clearSneakers('brand');
    actions.clearAll(false);
    if (loadedItems && !loadedItems[this.state.slug]) {
      actions.fetchBrand(this.state.slug);
    }
  }

  @injectProps
  componentWillReceiveProps(nextProps, { loadedItems, selectedFilters, actions }) {
    this.handleNewSlug(nextProps);

    const brand = loadedItems[this.state.slug];
    if (brand && Object.keys(selectedFilters).length === 0) {
      actions.selectFilter('brands', brand.id, false);
      this.setState({ brand });
    }
  }

  @injectProps
  componentWillUnmount({ actions }) {
    actions.clearAll(false);
  }

  /* eslint-disable class-methods-use-this */
  @injectProps
  getSneakers({ selectedFilters }) {
    return (
      (Object.keys(selectedFilters).length === 0) ?
        null : (<SneakersIndex hideBreadcrumb />));
  }

  @injectProps
  handleNewSlug({ loadedItems, actions }, props) {
    if (props.match.params.slug === this.state.slug) {
      return;
    }

    this.setState({
      slug: props.match.params.slug,
    });

    if (loadedItems && !loadedItems[props.match.params.slug]) {
      actions.fetchBrand(props.match.params.slug);
    }
  }

  render() {
    if (!this.state.brand) {
      return (
        <Loader />
      );
    }

    if (!this.state.brand.id) {
      return (
        <div>Error: {this.state.brand.message}</div>
      );
    }

    return (
      <div className="brands-view" >
        <Breadcrumb
          path={[
            { text: 'Brands', link: '/brands' },
            { text: this.state.brand.name },
          ]}
        />
        <AboutBrand
          brand={this.state.brand.name}
          excerpt={this.state.brand.description}
          image={_get(this.state.brand, 'acf.Logo.url', '')}
          className="brands-view__about-brand"
        />
        {this.getSneakers()}
      </div>
    );
  }

}

BrandsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
