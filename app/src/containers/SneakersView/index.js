import { connect } from 'react-redux';
import { fetchSneakerIfNeeded } from '../../actions/sneakers';
import { fetchTaxonomiesIfNeeded } from '../../actions/taxonomies';
import { fetchLabelsIfNeeded } from '../../actions/labels';

import SneakersView from '../../pages/SneakersView';

function mapStateToProps(state) {
  return {
    loadedSneakers: state.sneakers.loadedItems,
    itemsLoading: state.sneakers.itemsLoading,
    sneakersErrorMessages: state.sneakers.sneakersErrorMessages,
    merchants: state.taxonomies.taxonomies.merchants,
    materials: state.taxonomies.taxonomies.materials,
    styles: state.taxonomies.taxonomies.styles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSneakerIfNeeded: slug => dispatch(fetchSneakerIfNeeded(slug)),
    fetchTaxonomiesIfNeeded: () => dispatch(fetchTaxonomiesIfNeeded()),
    fetchLabelsIfNeeded: () => dispatch(fetchLabelsIfNeeded()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SneakersView);
