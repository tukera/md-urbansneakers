import React, { PropTypes } from 'react';

// Constants
import { CarouselArrow, SpinningIcon } from '../components/Icons';

export default function Arrow({ direction, onClick, color }) {
  return (
    <div className={direction} onClick={onClick}>
      <CarouselArrow stroke={color} />
      <SpinningIcon stroke={color} />
    </div>
  );
}

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

Arrow.defaultProps = {
  color: 'black',
};
