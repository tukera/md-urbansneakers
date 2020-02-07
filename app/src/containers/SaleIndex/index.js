import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { bindActionCreators, compose } from 'redux';
import * as labelsActions from '../../actions/labels';
import { selectFilter, clearAll } from '../../actions/filters';
import { setCurrentPrefix } from '../../actions/sneakers';

import SaleIndex from '../../pages/SaleIndex';

function mapStateToProps(state) {
  return {
    loadedItems: state.labels.labels,
    isFailed: state.labels.isFailed,
    isFetching: state.labels.isFetching,
    selectedFilters: state.taxonomies.selectedFilters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...labelsActions,
      selectFilter,
      clearAll,
      setCurrentPrefix,
    }, dispatch),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.actions.setCurrentPrefix('sale');
    },
  }),
)(SaleIndex);
