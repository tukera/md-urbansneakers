import { connect } from 'react-redux';
import { lifecycle, withHandlers } from 'recompose';
import { bindActionCreators, compose } from 'redux';
import _get from 'lodash/get';
import { fetchSneakers, fetchSneakersIfNeeded, setCurrentPrefix } from '../../actions/sneakers';
import { fetchFeaturePost, fetchMagazineLabelsIfNeeded } from '../../actions/magazines';
import { fetchBrands } from '../../actions/brands';
import { fetchLabelsIfNeeded } from '../../actions/labels';

import Home from '../../pages/Home';

function mapStateToProps(state) {
  return {
    sneakers: state.sneakers.default.items.slice(5, state.sneakers.default.items.length - 1),
    itemsPerPage: state.sneakers.default.itemsPerPage,
    currentPage: state.sneakers.default.currentPage,
    totalPages: state.sneakers.default.totalPages,
    needRefresh: state.sneakers.default.needRefresh,
    topBrands: state.brands.topBrands,
    magazines: state.magazines,
    featurePost: state.magazines.featurePost,
    feaurePostChecked: state.magazines.feaurePostChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCurrentPrefix,
      fetchSneakers,
      fetchSneakersIfNeeded,
      fetchBrands,
      fetchLabelsIfNeeded,
      fetchFeaturePost,
      fetchMagazineLabelsIfNeeded,
    }, dispatch),
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.actions.setCurrentPrefix('default');
    },
    componentDidMount() {
      this.props.actions.fetchBrands();
      this.props.actions.fetchSneakersIfNeeded();
      this.props.actions.fetchLabelsIfNeeded();
      this.props.actions.fetchMagazineLabelsIfNeeded();
    },
    componentDidUpdate() {
      if (this.props.needRefresh) {
        this.props.actions.fetchSneakersIfNeeded();
      }
      if (_get(this.props.magazines, 'labels.featured.id', false) && !this.props.feaurePostChecked) {
        this.props.actions.fetchFeaturePost();
      }
    },
  }),
  withHandlers({
    onClick: props => (event) => {
      event.preventDefault();
      props.actions.fetchSneakers(props.itemsPerPage, props.currentPage + 1);
    },
  }),
)(Home);
