import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { bindActionCreators, compose } from 'redux';
import { setCurrentPrefix } from '../../actions/sneakers';

import SneakersIndex from '../../pages/SneakersIndex';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCurrentPrefix,
    }, dispatch),
  };
}

export default compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.actions.setCurrentPrefix('filter');
    },
  }),
)(SneakersIndex);
