import React from 'react';
import PropTypes from 'prop-types';

import '../index.scss';

function SneakerCardMeta({ brand, title, price, originalPrice, featuredPost = false }) {
  const sale = (price > 0) && (parseFloat(price) < parseFloat(originalPrice));

  return (!featuredPost) ? (
    <div className="sneaker-card__meta">
      <div className="sneaker-card__brand">{brand}</div>
      { sale ? (
        <div className="sneaker-card__original-price">{originalPrice ? `${originalPrice}€` : ''}</div>
        ) : (
          <div className="sneaker-card__text">{originalPrice ? 'ab' : ''}</div>
        )
      }
      <div className="sneaker-card__name">{title}</div>
      <div className="sneaker-card__pricing">
        { sale &&
          <div className="sneaker-card__text sneaker-card__text_second-row sneaker-card__sale-text">{price && 'ab'}</div>
        }
        <div className="sneaker-card__price">{price || originalPrice}{(price || originalPrice) && '€'}</div>
      </div>
    </div>
  ) : (
    <div className="sneaker-card__meta">
      <div className="sneaker-card__featured-post">{title}</div>
    </div>
  );
}

SneakerCardMeta.propTypes = {
  brand: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  originalPrice: PropTypes.string.isRequired,
  featuredPost: PropTypes.bool,
};

export default SneakerCardMeta;
