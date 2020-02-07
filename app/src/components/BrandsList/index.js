import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.scss';

export default function BrandsList({ brands, chars, className, isMobile, selectedChar }) {
  if (!brands[selectedChar]) {
    return null;
  }

  if (isMobile) {
    return (
      <div className={classNames(className, 'brands-list')}>
        <div className="brands-list__selected-char">{selectedChar}</div>
        <div className="brands-list__list-container-mobile">{
          brands[selectedChar].map(brand =>
            <div key={brand.id} className="brands-list__list-item-wrapper-mobile">
              <Link className="brands-list__list-item-mobile" to={`brands/${brand.slug}`}>{brand.name}</Link>
            </div>,
          )
        }</div>
      </div>
    );
  }
  return (
    <div className={classNames(className, 'brands-list')}>{
      chars.reduce((accumulator, char) => {
        if (brands[char]) {
          accumulator.push(
            <div key={char} id={char} className="brands-list__list-container-desktop">
              <div className="row">
                <div className="col-2">
                  <span className="brands-list__list-identifier">{char}</span>
                </div>
                <div className="col-10">
                  <div className="brands-list__list-desktop">
                    <div className="row">{
                      brands[char].map(brand => (
                        <div key={brand.id} className="col-3">
                          <div className="brands-list__list-item-wrapper-desktop">
                            <Link to={`brands/${brand.slug}`} className="brands-list__list-item-desktop">{brand.name}</Link>
                          </div>
                        </div>
                      ))
                    }</div>
                  </div>
                </div>
              </div>
            </div>,
            );
        }
        return accumulator;
      }, [])
    }</div>);
}

BrandsList.propTypes = {
  chars: PropTypes.arrayOf(PropTypes.string).isRequired,
  brands: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
      },
      ),
    ).isRequired,
  ).isRequired,
  isMobile: PropTypes.bool.isRequired,
  selectedChar: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
