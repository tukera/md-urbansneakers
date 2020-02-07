import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// Helpers
import Image from '../../../helpers/Image';

// CSS
import './index.scss';

const SneakerColors = ({ slug, colors, selectedId }) => (
  <div className="sneaker-colors">
    { colors.map(color => (
      <Link
        key={color.id}
        className={classNames('sneaker-colors__image-wrapper', { active: color.id === parseInt(selectedId, 10) })}
        to={`/sneakers/${slug}/${color.id}`}
      >
        <Image
          className="sneaker-colors__image img-fluid"
          src={color.image}
          width="50" height="50" alt={slug}
        />
      </Link>
    ))}
  </div>
);

SneakerColors.propTypes = {
  slug: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
  })),
  selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default SneakerColors;
