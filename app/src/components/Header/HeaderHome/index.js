import React from 'react';
import PropTypes from 'prop-types';

import HeaderHomeLatestSneakers from './HeaderHomeLatestSneakers';
import HeaderSearchForm from '../HeaderSearchForm';

import { DEFAULT_BACKGROUND } from '../../../constants/index';

import './index.scss';

export default function HeaderHome({ latestSneakers }) {
  return (
    <div className="header-home">
      <div className="header-home__image-wrapper ">
        <img className="header-home__image" src={DEFAULT_BACKGROUND} alt="background" />
      </div>
      <div className="container">
        <div className="header-home__content">
          <div className="h1 header-home__title">find your dream kicks!</div>
          <hr className="header-home__separator" />
          <div className="header-home__excerpt">
            Deine Sneaker Community mit den besten Online Shops
            und News passend zu Deinen sneaky needs
          </div>
          <div className="header-home__search-form-wrapper">
            <HeaderSearchForm transparent whiteBorder textCenter isHome />
          </div>
        </div>
        <div className="header-home__latest-sneakers">
          { latestSneakers && latestSneakers.length > 0 &&
            <HeaderHomeLatestSneakers latestSneakers={latestSneakers} />
          }
        </div>
      </div>
    </div>
  );
}

HeaderHome.propTypes = {
  latestSneakers: PropTypes.arrayOf(PropTypes.object),
};
