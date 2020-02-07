import React from 'react';
import PropTypes from 'prop-types';

// CSS
import './index.scss';

const SidebarBlock = ({ title, children }) => (
  <div className="sidebar-block hidden-sm-down">
    <div className="sidebar-block__headline h2">
      {title}
    </div>
    <hr className="sidebar-block__separator" />
    <div className="sidebar-block__content">
      {children}
    </div>
  </div>
);

SidebarBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SidebarBlock;
