import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from '../../actions/magazines';

import PostsView from '../../pages/MagazinesView';

function mapStateToProps(state) {
  return {
    loadedItems: state.magazines.loadedItems,
    errorMessages: state.magazines.errorMessages,
    sidebarPosts: state.magazines.items.slice(0, 6),
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
)(PostsView);
