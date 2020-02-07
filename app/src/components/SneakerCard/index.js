import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { decode } from 'he';

import classNames from 'classnames';
import _get from 'lodash/get';

import SneakerCardMeta from './SneakerCardMeta';

// Helpers
import Image from '../../helpers/Image';
import getLabel from '../../helpers/GetLabel';
import filterColor from '../../helpers/FilterColor';

// Styles
import './index.scss';

function SneakerCard({ sneaker, light, className, isHeader, isHome, labels, filteredColors }) {
  const baseLink = (sneaker.type === 'sneaker') ? `/sneakers/${sneaker.slug}` : `/magazin/${sneaker.slug}`;
  let selectedVariant = {};
  let colorSlug = {};
  if (sneaker.type === 'sneaker') {
    selectedVariant = (filteredColors && filteredColors.length > 0) ? filterColor(sneaker, filteredColors) : _get(sneaker, 'acf.variant.0');
    colorSlug = (sneaker.acf.variant.indexOf(selectedVariant) > 0) ? `/${sneaker.acf.variant.indexOf(selectedVariant)}` : '';
  }
  const link = (sneaker.type === 'sneaker') ? `${baseLink}${colorSlug}` : baseLink;

  let tag = '';
  if (sneaker) {
    tag = getLabel(labels, sneaker.labels);
  }

  let width = isHeader ? '150' : '430';
  width = isHome ? '616' : width;
  let height = isHeader ? '180' : '520';
  height = isHome ? '420' : height;

  return (
    <div className={classNames('sneaker-card', { 'sneaker-card_is-light': light }, { 'sneaker-card_on-header': isHeader }, className)} >
      <div className="sneaker-card__wrapper">
        <Link to={link} >
          <div className="sneaker-card__image-wrapper">
            <Image
              className="sneaker-card__image img-fluid"
              src={sneaker.type === 'sneaker' ? _get(selectedVariant, 'gallery.0.url', false) : _get(sneaker, '_embedded.wp:featuredmedia.0.source_url', false)}
              width={width}
              height={height}
              alt={decode(_get(sneaker, 'title.rendered', 'title'))}
            />
            { tag !== '' &&
              <div className={`sneaker-card__tag sneaker-card__tag_${tag}`}>{tag}</div>
            }
          </div>
        </Link>
        <Link to={link} >
          <SneakerCardMeta
            brand={sneaker.type === 'sneaker' ? decode(_get(sneaker, '_embedded.wp:term.8.0.name', 'brand')) : false}
            title={decode(_get(sneaker, 'title.rendered', 'title'))}
            price={sneaker.type === 'sneaker' ? _get(selectedVariant, 'merchant.0.price', '-.--') : false}
            originalPrice={sneaker.type === 'sneaker' ? _get(selectedVariant, 'original_price', '-.--') : false}
            featuredPost={sneaker.type === 'magazin'}
          />
        </Link>
      </div>
    </div>
  );
}

SneakerCard.propTypes = {
  sneaker: PropTypes.shape({}).isRequired,
  filteredColors: PropTypes.arrayOf(PropTypes.number),
  light: PropTypes.bool,
  className: PropTypes.string,
  isHeader: PropTypes.bool,
  isHome: PropTypes.bool,
  labels: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

function mapStateToProps(state) {
  return {
    labels: state.labels.labels,
  };
}

export default connect(mapStateToProps)(SneakerCard);
