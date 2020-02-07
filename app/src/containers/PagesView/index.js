import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pagesActions from '../../actions/pages';

import PagesView from '../../pages/PagesView';

function mapStateToProps(state) {
  return {
    loadedItems: state.pages.loadedItems,
    isFetching: state.pages.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pagesActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PagesView);
