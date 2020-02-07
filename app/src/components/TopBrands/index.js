import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _get from 'lodash/get';

// Components
import Loader from '../Loader';

import './index.scss';

// Helpers
import Image from '../../helpers/Image';

export default function TopBrands({ className, topBrands }) {
  return (topBrands) ? (
    <div className={classNames(className, 'top-brands')}>{
      topBrands.map(brand => (
        <div key={brand.id} className="top-brands__logo-wrapper">
          <Link to={`brands/${brand.slug}`} title={brand.name || ''} >
            <Image
              className="top-brands__logo img-fluid"
              src={_get(brand, 'acf.Logo.url', '')}
              fit="fillmax"
              width="81"
              height="55"
              alt={brand.name || brand.slug}
            />
          </Link>
        </div>
      ))
    }</div>
  ) : (<Loader />);
}

TopBrands.propTypes = {
  topBrands: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string.isRequired,
};
