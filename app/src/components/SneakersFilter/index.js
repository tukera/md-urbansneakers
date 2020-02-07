import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CheckboxFilter from '../CheckboxFilter';
import Loader from '../Loader';

import * as FiltersActionCreators from '../../actions/filters';

import './index.scss';

function SneakersFilter({ filters, selectedFilters, filterActions }) {
  return (Object.keys(filters).length !== 0) ? (
    <section className="sneakers-filter">
      <div className="sneakers-filter__header">
        <div className="sneakers-filter__header-title h3">Filter By</div>
        <button className="sneakers-filter__clear-button btn-text-primary" onClick={filterActions.clearAll}>clear all</button>
      </div>
      <hr className="sneakers-filter__separator" />
      {
        Object.keys(filters).map((key) => {
          const filterArray = filters[key];
          return (
            <CheckboxFilter
              key={key}
              onSelect={selected => filterActions.selectFilter(key, selected.id)}
              title={key}
              selectedIds={selectedFilters[key]}
              clearAll={() => filterActions.clearAllByKey(key)}
              fields={filterArray.map(data => ({
                id: data.id,
                value: data.name,
              }))}
            />
          );
        })
      }
    </section>
  ) : (<Loader className="sneakers-filter__loader" />);
}

SneakersFilter.propTypes = {
  filters: PropTypes.shape({}),
  selectedFilters: PropTypes.shape({}),
  filterActions: PropTypes.shape({
    selectFilter: PropTypes.func.isRequired,
    clearAllByKey: PropTypes.func.isRequired,
    clearAll: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    filters: state.taxonomies.taxonomies,
    selectedFilters: state.taxonomies.selectedFilters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterActions: bindActionCreators(FiltersActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SneakersFilter);
