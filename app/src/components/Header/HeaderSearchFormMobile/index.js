import React from 'react';
import PropTypes from 'prop-types';

import HeaderSearchForm from '../HeaderSearchForm';

import './index.scss';

export default function HeaderSearchFormMobile({ closeMobileSearch }) {
  return (
    <div className="header-search-form-mobile">
      <div className="header-search-form-mobile__wrapper">
        <div className="container">
          <HeaderSearchForm isMobile closeMobileSearch={closeMobileSearch} />
        </div>
      </div>
    </div>
  );
}

HeaderSearchFormMobile.propTypes = {
  closeMobileSearch: PropTypes.func.isRequired,
};
