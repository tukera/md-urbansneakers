import React from 'react';
import PropTypes from 'prop-types';

export default function DangerousHtml({ className, html, tagName }) {
  const innerHtml = {
    __html: html,
  };

  return React.createElement(tagName, {
    className,
    dangerouslySetInnerHTML: innerHtml,
  });
}

DangerousHtml.propTypes = {
  className: PropTypes.string,
  html: PropTypes.node.isRequired,
  tagName: PropTypes.string,
};

DangerousHtml.defaultProps = {
  tagName: 'div',
};
