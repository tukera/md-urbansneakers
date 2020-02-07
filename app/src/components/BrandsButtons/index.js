import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

export default function BrandsButtons({ brands, chars, className, isMobile, onClick }) {
  const defaultBtn = 'brands-buttons__char-button';
  return (
    <div className={classNames(className, 'brands-buttons')}>
      {chars.map((char) => {
        const enabled = brands[char];

        const properties = {
          key: char,
          className: classNames(defaultBtn, !enabled ? `${defaultBtn}_disabled` : null),
          disabled: true,
        };
        if (enabled) {
          Object.assign(properties, {
            onClick: isMobile ? onClick : () => { location.hash = char; },
            disabled: false,
          });
        }
        return React.createElement('button', properties, char);
      })}
    </div>
  );
}

BrandsButtons.propTypes = {
  brands: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      },
      ),
    ).isRequired,
  ).isRequired,
  chars: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMobile: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
