import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

const SneakerMaterial = ({ materials }) => (
  <div className="material">
    <div className="material__title h2">materials</div>
    <ul className="list-unstyled">
      {
        materials && materials.map(material => (
          <li key={material.id}>
            <div className="material__label h3">{material.name}</div>
          </li>
        ))
      }
    </ul>
  </div>
);

SneakerMaterial.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

export default SneakerMaterial;
