import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import HeaderNavigation from './HeaderNavigation';
import HeaderSlider from './HeaderSlider';
import HeaderHome from './HeaderHome';
import PostCard from '../../components/PostCard';

// CSS
import './index.scss';

/* eslint-disable max-len */
export default function Header({ isMagazine, isHome, isMobile, isTablet, latestPosts, latestSneakers }) {
  return (
    /* eslint-disable quote-props */
    <div className="header">
      <div className={classNames('header__navigation', { 'header__navigation_posts': isMagazine })}>
        <HeaderNavigation isHome={isHome} isMobile={isMobile} isTablet={isTablet} />
      </div>
      { isMagazine && latestPosts && latestPosts.length > 0 &&
        <HeaderSlider slides={latestPosts} />
      }
      { isHome &&
        <HeaderHome latestSneakers={latestSneakers} />
      }
    </div>
  );
}

Header.propTypes = {
  isMagazine: PropTypes.bool,
  isHome: PropTypes.bool,
  isMobile: PropTypes.bool,
  isTablet: PropTypes.bool,
  latestPosts: PropTypes.arrayOf(PropTypes.shape(PostCard.propTypes)),
  latestSneakers: PropTypes.arrayOf(PropTypes.shape({})),
};
