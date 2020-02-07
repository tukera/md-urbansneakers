import React from 'react';
import PropTypes from 'prop-types';

// Helpers
import classNames from 'classnames';

// CSS
import './index.scss';

const SneakerSizes = ({ className, sizes }) => (
  <div className={classNames('sneaker-sizes', className)}>
    <div className="sneaker-sizes__headline h2">
      sizes available
    </div>
    <div className="sneaker-sizes__values-container">
      { sizes.map(size => (
        <div className="sneaker-sizes__value">
          {size.name}
        </div>
      ))}
    </div>
  </div>
);

SneakerSizes.propTypes = {
  className: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf({
    slug: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mane: PropTypes.string.isRequired,
  }).isRequired,
};

SneakerSizes.defaultProps = {
  sizes: [],
};

export default SneakerSizes;
