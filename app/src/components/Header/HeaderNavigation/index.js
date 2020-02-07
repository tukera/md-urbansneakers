import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';


import SocialMediaLinks from '../../SocialMediaLinks';
import { Logo, CloseIcon, SearchIcon, MenuIcon } from '../../../components/Icons';
import HeaderSearchForm from '../HeaderSearchForm';
import HeaderSearchFormMobile from '../HeaderSearchFormMobile';

// CSS
import './index.scss';

class HeaderNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
      searchIsOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isTablet && !nextProps.isMobile) {
      this.toggleNoScroll('remove');
      this.setState({
        menuIsOpen: false,
        searchIsOpen: false,
      });
    }
  }

  toggleMenu = () => {
    if (this.state.menuIsOpen) {
      this.toggleNoScroll('remove');
    } else {
      this.toggleNoScroll('add');
    }
    this.setState(prevState => ({
      menuIsOpen: !prevState.menuIsOpen,
    }));
  };

  openMobileSearch = () => {
    this.toggleNoScroll('add');
    this.setState({
      searchIsOpen: true,
    });
  };

  closeMobileSearch = () => {
    this.toggleNoScroll('remove');
    this.setState({
      searchIsOpen: false,
    });
  };

  toggleNoScroll = (noScroll) => {
    if (noScroll === 'add') {
      document.body.classList.add('no-scroll');
    } else if (noScroll === 'remove') {
      document.body.classList.remove('no-scroll');
    }
  };

  render() {
    return (
      <div className={classNames('header-navigation', { 'header-navigation_is-open': this.state.menuIsOpen }, { 'header-navigation_is-home': this.props.isHome })}>
        { this.state.searchIsOpen &&
          <HeaderSearchFormMobile closeMobileSearch={this.closeMobileSearch} />
        }
        <div className="container" >
          <SocialMediaLinks className="header-navigation__social-media-links hidden-md-down" light={this.props.isHome} />
          <div className={classNames('header-navigation__wrapper')}>
            <div className="header-navigation__mobile-headline" >
              <NavLink to="/">
                <Logo className="header-navigation__logo" onClick={this.state.menuIsOpen && this.toggleMenu} />
              </NavLink>
              <div className="header-navigation__nav-mobile hidden-lg-up">
                { !this.props.isHome &&
                  <button onClick={this.openMobileSearch} className="header-navigation__search-button">
                    <SearchIcon />
                  </button>
                }
                <button onClick={this.toggleMenu} className="header-navigation__menu-button" >
                  { this.state.menuIsOpen ? (
                    <CloseIcon className="header-navigation__close-menu-icon" />
                  ) : (
                    <MenuIcon className="header-navigation__menu-icon" />
                  )}
                </button>
              </div>
            </div>
            <div className="header-navigation__nav">
              <div className="header-navigation__link-wrapper">
                <NavLink className="header-navigation__link h4" activeClassName="header-navigation__link_is-active" to="/sneakers" onClick={this.toggleMenu}>
                  Sneakers
                </NavLink>
                <NavLink className="header-navigation__link h4" activeClassName="header-navigation__link_is-active" to="/sale" onClick={this.toggleMenu}>
                  Sale
                </NavLink>
                <NavLink className="header-navigation__link h4" activeClassName="header-navigation__link_is-active" to="/magazin" onClick={this.toggleMenu}>
                  Magazin
                </NavLink>
                <NavLink className="header-navigation__link h4" activeClassName="header-navigation__link_is-active" to="/brands" onClick={this.toggleMenu}>
                  Brands & Shops
                </NavLink>
              </div>
              { !this.props.isHome &&
                <div className="header-navigation__search-form hidden-md-down">
                  <HeaderSearchForm transparent />
                </div>
              }
              { this.state.menuIsOpen &&
                <div className="header-navigation__mobile-social-media-links-wrapper hidden-lg-up">
                  <SocialMediaLinks light large />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
HeaderNavigation.propTypes = {
  isHome: PropTypes.bool,
  isMobile: PropTypes.bool,
  isTablet: PropTypes.bool,
};

export default HeaderNavigation;
