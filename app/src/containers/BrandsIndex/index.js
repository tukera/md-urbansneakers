import { connect } from 'react-redux';
import { lifecycle, withHandlers } from 'recompose';
import { bindActionCreators, compose } from 'redux';
import { fetchBrands, selectChar } from '../../actions/brands';
import { setCurrentPrefix } from '../../actions/sneakers';

import BrandsIndex from '../../pages/BrandsIndex';

function mapStateToProps(state) {
  return {
    isMobile: state.browser.mobile,
    chars: state.brands.chars,
    brands: state.brands.brands,
    selectedChar: state.brands.selectedChar,
    topBrands: state.brands.topBrands,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setCurrentPrefix, fetchBrands, selectChar }, dispatch),
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
  withHandlers({
    onClick: props => (event) => {
      props.actions.selectChar(event.target.innerHTML);
    },
  }),
)(BrandsIndex);
