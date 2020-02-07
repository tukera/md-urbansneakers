import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from '../../actions/magazines';

import PostsIndex from '../../pages/MagazinesIndex';

function mapStateToProps(state) {
  return {
    magazines: state.magazines.items,
    itemsPerPage: state.magazines.itemsPerPage,
    currentPage: state.magazines.currentPage,
    totalPages: state.magazines.totalPages,
    needRefresh: state.magazines.needRefresh,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsIndex);
