import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { decode } from 'he';
import _get from 'lodash/get';
import { injectProps } from 'relpers';

// Helpers
import Image from '../../helpers/Image';

// Components
import DangerousHtml from '../../core/components/DangerousHtml';
import SneakerColors from './SneakerColors';
import SneakerMaterial from './SneakerMaterial';
import SocialMediaLinks from '../SocialMediaLinks';
import ShopSelect from './ShopSelect';
import Loader from '../Loader';

import { Female, Male, Child } from '../Icons';

// CSS
import './index.scss';

class Sneaker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMerchantIndex: 0,
    };
  }

  /* eslint-disable class-methods-use-this */
  getShopLogo(merchantMeta) {
    const logo = (<Image
      className="sneaker__shop-logo-image img-fluid"
      src={_get(merchantMeta, 'acf.Logo.url', false)}
      width="200" height="120" alt={merchantMeta.name}
    />);
    const link = _get(merchantMeta, 'acf.Link', false);
    return (link) ? (<a rel="noopener noreferrer" target="_blank" href={link}>
      {logo}
    </a>) : logo;
  }

  /* eslint-disable max-len */
  @injectProps
  render({ slug, title, excerpt, variants, materials,
           selectedVariantIndex, merchants, styles, currentTag, updateTag }) {
    const allMerchants = variants[selectedVariantIndex].merchant;
    const selectedMerchant = variants[selectedVariantIndex]
                                  .merchant[this.state.selectedMerchantIndex];
    const selectedMerchantMeta = merchants &&
                                  merchants
                                    .find(mt => mt.slug === selectedMerchant.merchant_name.slug);
    const stylesString = styles && styles.reduce((i, r) => `${i}${i && ', '}${r.name}`, '');

    const labelsArray = selectedMerchant.label;
    let newTag = '';
    if (labelsArray.length === 1) newTag = labelsArray[0].slug;
    if (labelsArray.length === 2) newTag = 'sale';
    if (currentTag !== newTag) updateTag(newTag);

    const activeGenderIconColor = '#000000';
    const disabledGenderIconColor = '#C8C8C8';

    return (selectedMerchant && selectedMerchantMeta) ? (
      <div className="sneaker">
        <div className="hidden-md-up">
          {(variants[selectedVariantIndex].color_description) ?
            <div className="sneaker__color-description">
              {variants[selectedVariantIndex].color_description}
            </div> : null }
          <SneakerColors
            slug={slug}
            colors={
              variants.map((variant, index) =>
                ({ id: index, image: _get(variant, 'gallery.0.url', '') }))
            }
            selectedId={selectedVariantIndex}
          />
        </div>
        <div className="sneaker__title h1">{decode(title)}</div>
        <hr className="sneaker__separator sneaker__separator-short" />
        <div className="sneaker__excerpt h2">{stylesString}</div>
        <div className="sneaker__gender">
          <Male fill={selectedMerchant.gender.indexOf('men') > -1 ? activeGenderIconColor : disabledGenderIconColor} />
          <Female fill={selectedMerchant.gender.indexOf('women') > -1 ? activeGenderIconColor : disabledGenderIconColor} />
          <Child fill={selectedMerchant.gender.indexOf('kids') > -1 ? activeGenderIconColor : disabledGenderIconColor} />
        </div>
        <div className="sneaker__content">
          <DangerousHtml html={excerpt} />
        </div>
        <div className="hidden-sm-down">
          {(variants[selectedVariantIndex].color_description) ?
            <div className="sneaker__color-description">
              {variants[selectedVariantIndex].color_description}
            </div> : null }
          <SneakerColors
            slug={slug}
            colors={
              variants.map((variant, index) =>
                ({ id: index, image: _get(variant, 'gallery.0.url', '') }))
            }
            selectedId={selectedVariantIndex}
          />
        </div>
        <hr className="sneaker__separator" />
        <div className="sneaker__shop">
          <div className="row">
            <div className="col-4  sneaker__shop-logo">
              <div className="sneaker__shop-logo-wrapper">
                {this.getShopLogo(selectedMerchantMeta)}
              </div>
            </div>
            <div className="col-8">
              {((parseInt(selectedMerchant.price, 10) > 0) && (parseInt(variants[selectedVariantIndex].original_price, 10) > parseInt(selectedMerchant.price, 10))) && (
                <div className="sneaker__price sneaker__price-old">
                  {variants[selectedVariantIndex].original_price}€
                </div>
              )}
              <div className="sneaker__price">{selectedMerchant.price || variants[selectedVariantIndex].original_price}€</div>
              <div className="sneaker__button-shop-conatiner">
                <Link className="btn btn-primary sneaker__button-shop hvr-sweep-to-right" to={`http://visit.digidip.net/visit?pid=804&url=${encodeURI(selectedMerchant.affiliate_link)}`} target="_blank">to the shop</Link>
              </div>
            </div>
          </div>
          { allMerchants.length > 1 && (
            <ShopSelect
              originalPrice={variants[selectedVariantIndex].original_price}
              onSelect={index => this.setState({ selectedMerchantIndex: index })}
              shops={allMerchants}
              merchants={merchants}
              selectedIndex={this.state.selectedMerchantIndex}
            />
          )}
        </div>
        {(materials.length > 0) ? [(<hr key="separator" className="sneaker__separator" />),
            (<SneakerMaterial
              key="sneakerMaterial"
              materials={materials}
            />)] : null }
        <hr className="sneaker__separator" />
        <div className="sneaker__social-media-links">
          <div className="sneaker__social-media-links-title h2">share</div>
          <SocialMediaLinks share className="sneaker__social-media-links-icons" link={`${window.location.origin}/sneakers/${slug}`} />
        </div>
        <hr className="sneaker__separator" />
      </div>
    ) : (
      <Loader />
    );
  }
}

Sneaker.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  variants: PropTypes.arrayOf(PropTypes.shape({
    original_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    merchant: PropTypes.arrayOf(PropTypes.shape({
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })).isRequired,
  })),
  materials: PropTypes.arrayOf(PropTypes.shape({})),
  selectedVariantIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  merchants: PropTypes.arrayOf(PropTypes.shape({})),
  styles: PropTypes.arrayOf(PropTypes.shape({})),
  currentTag: PropTypes.string,
  updateTag: PropTypes.func.isRequired,
};

export default Sneaker;
