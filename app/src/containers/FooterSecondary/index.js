import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { bindActionCreators, compose } from 'redux';
import { fetchSneakersIfNeeded } from '../../actions/sneakers';
import { fetchPostsIfNeeded } from '../../actions/magazines';
import { fetchLabelsIfNeeded } from '../../actions/labels';

import FooterSecondary from '../../components/FooterSecondary';

function mapStateToProps(state) {
  return {
    latestPosts: state.magazines.items.slice(0, 8),
    latestSneakers: state.sneakers.default.items.slice(0, 8),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchSneakersIfNeeded,
        fetchPostsIfNeeded,
        fetchLabelsIfNeeded,
      },
      dispatch,
    ),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.actions.fetchSneakersIfNeeded();
      this.props.actions.fetchPostsIfNeeded();
      this.props.actions.fetchLabelsIfNeeded();
    },
  }),
)(FooterSecondary);
