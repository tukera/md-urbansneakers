import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';
import striptags from 'striptags';
import _get from 'lodash/get';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectProps } from 'relpers';
import { propTypes } from '../../actions/decorators';

import * as SneakersActionCreators from '../../actions/sneakers';
import * as TaxonomiesActionCreators from '../../actions/taxonomies';
import * as LabelsActionCreators from '../../actions/labels';

// Components
import SneakersFilter from '../../components/SneakersFilter';
import SneakerCard from '../../components/SneakerCard';
import Breadcrumb from '../../components/Breadcrumb';
import Loader from '../../components/Loader';
import Seo from '../../components/Seo';

import './index.scss';

@propTypes({
  sneakers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]),
  sneakersActions: PropTypes.shape({
    fetchSneakers: PropTypes.func.isRequired,
    fetchSneakersIfNeeded: PropTypes.func.isRequired,
  }).isRequired,
  taxonomiesActions: PropTypes.shape({
    fetchTaxonomiesIfNeeded: PropTypes.func.isRequired,
  }).isRequired,
  hideBreadcrumb: PropTypes.bool,
})

class SneakersIndex extends React.Component {
  @injectProps
  componentDidMount({ sneakersActions, taxonomiesActions, labelsActions }) {
    sneakersActions.fetchSneakersIfNeeded();
    taxonomiesActions.fetchTaxonomiesIfNeeded();
    labelsActions.fetchLabelsIfNeeded();
  }

  @injectProps
  componentDidUpdate({ sneakers, sneakersActions }) {
    if (sneakers[sneakers.prefix].needRefresh) {
      sneakersActions.fetchSneakersIfNeeded();
    }
  }

  /* eslint-disable class-methods-use-this */
  @injectProps
  getPagination({ sneakers, sneakersActions }) {
    return (sneakers[sneakers.prefix].currentPage < sneakers[sneakers.prefix].totalPages) ? (
      <div className="col-md-12">
        <div className="sneakers-index__button-wrapper">
          <Button
            onClick={() => {
              sneakersActions.fetchSneakers(
                sneakers[sneakers.prefix].itemsPerPage,
                sneakers[sneakers.prefix].currentPage + 1,
                sneakers.prefix,
              );
            }}
            className="btn btn-outline-primary hvr-sweep-to-right"
          >
            LOAD MORE
          </Button>
        </div>
      </div>
    ) : null;
  }

  @injectProps
  render({ path, hideBreadcrumb, sneakers, selectedFilters }) {
    const crumbPath = path || { text: 'Sneakers', link: '/sneakers' };
    const lastSneaker = sneakers[sneakers.prefix].items[0] || undefined;
    return (
      <div className="sneakers-index">
        { !hideBreadcrumb &&
          <Breadcrumb path={[crumbPath]} />
        }
        <Seo
          title={(lastSneaker) ? (lastSneaker.seo.title || decode(lastSneaker.title.rendered)) : 'Urban Sneackers'}
          description={(lastSneaker) ? (lastSneaker.seo.description || decode(striptags(lastSneaker.excerpt.rendered))) : 'Urban Sneackers'}
          image={_get(lastSneaker, 'acf.variant.0.gallery.0.url', false)}
        />
        <div className="row">
          <div className="col-md-3 hidden-sm-down">
            <SneakersFilter />
          </div>
          <div className="col-md-9">
            <div className="row">
              {(sneakers[sneakers.prefix].items.length === 0 &&
                sneakers[sneakers.prefix].isFetching) ?
                  <Loader /> : sneakers[sneakers.prefix].items.map(sneaker => (
                    <div className="col-sm-6 col-md-4" key={`sneaker-card-${sneaker.id}`}>
                      <SneakerCard className="sneakers-index__sneaker-card" filteredColors={selectedFilters.colors || null} sneaker={sneaker} index />
                    </div>
                  ))}
              {this.getPagination()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedFilters: state.taxonomies.selectedFilters,
    taxonomies: state.taxonomies.taxonomies,
    sneakers: state.sneakers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sneakersActions: bindActionCreators(SneakersActionCreators, dispatch),
    taxonomiesActions: bindActionCreators(TaxonomiesActionCreators, dispatch),
    labelsActions: bindActionCreators(LabelsActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SneakersIndex);
