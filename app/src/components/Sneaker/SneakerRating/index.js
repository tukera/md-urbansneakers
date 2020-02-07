import React from 'react';

// Helpers
import classNames from 'classnames';
import Rating from 'react-rating';

// CSS
import './index.scss';

const SneakerRating = ({ className }) => (
  <div className={classNames('sneaker-rating', className)}>
    <Rating
      empty="fa fa-star sneaker-rating_is-outlined sneaker-rating__icon"
      full="fa fa-star sneaker-rating_is-filled sneaker-rating__icon"
    />
  </div>
);

SneakerRating.propTypes = {
  className: React.PropTypes.string.isRequired,
};

export default SneakerRating;
