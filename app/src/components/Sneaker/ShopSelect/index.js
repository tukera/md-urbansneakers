import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _get from 'lodash/get';
import classNames from 'classnames';

import Image from '../../../helpers/Image';
import './index.scss';

function getShopLogo(merchantMeta) {
  const logo = (<Image
    className="shop-select__option-image img-fluid"
    src={_get(merchantMeta, 'acf.Logo.url', false)}
    width="200" height="120" alt={merchantMeta.name}
  />);
  const link = _get(merchantMeta, 'acf.Link', false);
  return (link) ? (<a rel="noopener noreferrer" target="_blank" href={link}>
    {logo}
  </a>) : logo;
}

export default function ShopSelect({ shops, merchants, onSelect, originalPrice }) {
  return (
    <Select
      clearable={false}
      placeholder="Other Shops"
      className="shop-select"
      name="form-field-name"
      searchable={false}
      options={shops}
      optionRenderer={(option) => {
        const selectedMerchantMeta = merchants &&
          merchants
            .find(mt => mt.slug === option.merchant_name.slug);
        return (
          <div className="shop-select__option">
            <div className="shop-select__option-data">
              {getShopLogo(selectedMerchantMeta)}
              <span className="shop-select__option-name">{option.merchant_name.name}</span>
            </div>
            <div className="shop-select__option-prices">
              {
                originalPrice !== option.price && (
                  <span
                    className={classNames('shop-select__option-original-price',
                      { 'shop-select__option-original-price_line-through': option.price })}
                  >
                    {originalPrice}€
                  </span>
                )
              }
              {
                option.price && (
                  <span className="shop-select__option-price">{option.price}€</span>
                )
              }
            </div>
          </div>
        );
      }}
      onChange={(data) => {
        shops.forEach((shop, index) => {
          if (shop.merchant_name.slug === data.merchant_name.slug) onSelect(index);
        });
      }}
    />
  );
}

ShopSelect.propTypes = {
  shops: PropTypes.arrayOf(PropTypes.shape({})),
  merchants: PropTypes.arrayOf(PropTypes.shape({})),
  onSelect: PropTypes.func.isRequired,
  originalPrice: PropTypes.string,
};
