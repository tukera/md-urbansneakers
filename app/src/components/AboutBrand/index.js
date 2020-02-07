import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Image from '../../helpers/Image';

import './index.scss';

export default function AboutBrand({ brand, excerpt, image, className }) {
  return (
    <div className={classNames('about-brand', className)}>
      <div className="about-brand__meta">
        <div className="about-brand__brand h2">
          {brand}
        </div>
        <hr className="about-brand__separator" />
        <div className="about-brand__excerpt hidden-sm-down">
          {excerpt}
        </div>
      </div>
      <div className={(image !== '') ? 'about-brand__image-wrapper hidden-sm-down' : 'about-brand__placeholder-wrapper'}>
        <Image
          className={(image !== '') ? 'about-brand__image img-fluid' : 'about-brand__placeholder'}
          src={image} width="585" height="170" alt={brand}
        />
      </div>
    </div>
  );
}

AboutBrand.propTypes = {
  brand: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
};
