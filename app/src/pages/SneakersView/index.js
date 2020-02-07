import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';
import striptags from 'striptags';
import _get from 'lodash/get';
import { injectProps } from 'relpers';
import { propTypes } from '../../actions/decorators';

// Components
import Breadcrumb from '../../components/Breadcrumb';
import SneakerGallery from '../../components/Sneaker/SneakerGallery';
import Sneaker from '../../components/Sneaker';
import Loader from '../../components/Loader';
import Seo from '../../components/Seo';

// CSS
import './index.scss';

@propTypes({
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.oneOfType([PropTypes.number, PropTypes.string.isRequired]),
      color: PropTypes.oneOfType([PropTypes.number, PropTypes.string.isRequired]),
    }).isRequired,
  }).isRequired,
  loadedSneakers: PropTypes.shape({}),
  itemsLoading: PropTypes.shape({}),
  sneakersErrorMessages: PropTypes.shape({}),
  fetchSneakerIfNeeded: PropTypes.func.isRequired,
  fetchTaxonomiesIfNeeded: PropTypes.func.isRequired,
  fetchLabelsIfNeeded: PropTypes.func.isRequired,
  merchants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })),
  materials: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })),
  styles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  })),
  labels: PropTypes.shape({}),
})

class SneakersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: props.match.params.slug,
      tag: '',
    };

    this.updateTag = this.updateTag.bind(this);
  }

  @injectProps
  componentDidMount({ fetchSneakerIfNeeded, fetchTaxonomiesIfNeeded, fetchLabelsIfNeeded }) {
    fetchSneakerIfNeeded(this.state.slug);
    fetchTaxonomiesIfNeeded();
    fetchLabelsIfNeeded();
  }

  componentWillReceiveProps(nextProps) {
    this.handleNewSlug(nextProps);
  }

  @injectProps
  handleNewSlug({ loadedSneakers, fetchSneakerIfNeeded }, props) {
    if (props.match.params.slug === this.state.slug) {
      return;
    }

    this.setState({
      slug: props.match.params.slug,
    });

    if (loadedSneakers && !loadedSneakers[props.match.params.slug]) {
      fetchSneakerIfNeeded(props.match.params.slug);
    }
  }

  updateTag(tag) {
    this.setState({
      tag,
    });
  }

  @injectProps
  render({ match, loadedSneakers, itemsLoading,
           sneakersErrorMessages, merchants, materials, styles }) {
    let selectedColorId = match.params.color || 0;

    const sneaker = loadedSneakers[this.state.slug];
    if (sneaker && !sneaker.acf.variant[selectedColorId]) selectedColorId = 0;

    const selectedVariant = sneaker ? sneaker.acf.variant[selectedColorId] : null;

    const sneakerMaterials = materials && sneaker &&
      sneaker.materials.map(material => materials.find(mt => mt.id === material));
    const sneakerStyles = sneaker && styles &&
        sneaker.styles.map(style => styles.find(st => st.id === style));

    return (sneaker) ? (
      <div className="sneakers-view">
        <Seo
          title={sneaker.seo.title || decode(sneaker.title.rendered)}
          description={sneaker.seo.description || decode(striptags(sneaker.excerpt.rendered))}
          image={_get(selectedVariant, 'gallery.0.url', false)}
        />
        <Breadcrumb
          path={[
            { text: 'Sneakers', link: '/sneakers' },
            { text: decode(sneaker.title.rendered) },
          ]}
        />
        { sneaker && (
          <div className="row">
            <div className="col-md-8">
              { selectedVariant.gallery && selectedVariant.gallery.length > 0 && (
                <SneakerGallery
                  tag={this.state.tag}
                  items={selectedVariant.gallery}
                />
              )}
            </div>
            <div className="col-md-4 sneakers-view__sidebar">
              <Sneaker
                key={sneaker.id.toString()}
                slug={sneaker.slug}
                variants={sneaker.acf.variant}
                title={sneaker.title.rendered}
                excerpt={sneaker.excerpt.rendered}
                selectedVariantIndex={selectedColorId}
                materials={sneakerMaterials}
                merchants={merchants}
                styles={sneakerStyles}
                currentTag={this.state.tag}
                updateTag={this.updateTag}
              />
            </div>
          </div>
        )}
      </div>
    ) : (
      <div>
        { !itemsLoading[this.state.slug]
        && sneakersErrorMessages[this.state.slug] ? (
          <p>
            Oops, etwas ist schief gelaufen!
            Error: {sneakersErrorMessages[this.state.slug]}
            <Seo pageCode={404} />
          </p>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

SneakersView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.oneOfType([PropTypes.number, PropTypes.string.isRequired]),
    }).isRequired,
  }).isRequired,
};

export default SneakersView;
