import React from 'react';
import PropTypes from 'prop-types';

import SneakerCard from '../../../SneakerCard';

import './index.scss';

export default function HeaderHomeLatestSneakers({ latestSneakers }) {
  return (
    <div className="header-home-latest-sneakers">
      { latestSneakers.map(sneaker => (
        <SneakerCard key={sneaker.id} sneaker={sneaker} isHeader />
      ))}
    </div>
  );
}

HeaderHomeLatestSneakers.propTypes = {
  latestSneakers: PropTypes.arrayOf(PropTypes.shape({ })),
};
