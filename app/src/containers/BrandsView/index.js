import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { bindActionCreators, compose } from 'redux';
import * as brandsActions from '../../actions/brands';
import { selectFilter, clearAll } from '../../actions/filters';
import { clearSneakers, setCurrentPrefix } from '../../actions/sneakers';

import BrandsView from '../../pages/BrandsView';

function mapStateToProps(state) {
  return {
    loadedItems: state.brands.loadedItems,
    isFailed: state.brands.isFailed,
    isFetching: state.brands.isFetching,
    selectedFilters: state.taxonomies.selectedFilters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...brandsActions,
      selectFilter,
      clearAll,
      clearSneakers,
      setCurrentPrefix,
    }, dispatch),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.actions.setCurrentPrefix('brand');
      this.props.actions.fetchBrands();
    },
  }),
)(BrandsView);
