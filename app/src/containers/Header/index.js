import { connect } from 'react-redux';

import Header from '../../components/Header';

function mapStateToProps(state) {
  let sneakers = state.sneakers.default.items.slice(0, 5);
  if (state.magazines.featurePost.length > 0) {
    sneakers = [state.magazines.featurePost[0], ...state.sneakers.default.items.slice(0, 4)];
  }
  return {
    latestPosts: state.magazines.items.slice(0, 4),
    latestSneakers: sneakers,
    isTablet: state.browser.tablet,
    isMobile: state.browser.mobile,
  };
}

export default connect(
  mapStateToProps,
)(Header);
