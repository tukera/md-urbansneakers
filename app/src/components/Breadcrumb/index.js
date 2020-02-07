/**
 * Breadcrumb component accepts an array as a path property and renders correct breadcrumb markup.
 * Path property is an array of objects with 'title' and 'path' properties.
 *
 * An object { title: 'Magazines', path: 'magazines' } will be rendered
 * as a link to 'magazines' with a 'Magazines' text.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _capitalize from 'lodash/capitalize';
import classNames from 'classnames';

export default function Breadcrumb({ path }) {
  return (
    <ol className="breadcrumb">
      <li key="home-page" className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      {
        path.map((pathItem, index) => (
          <li key={index.toString()} className={classNames('breadcrumb-item', { active: index === path.length - 1 })}>
            {
              index === path.length - 1 ?
                _capitalize(pathItem.text) :
                <Link to={pathItem.link || pathItem.text}>{_capitalize(pathItem.text)}</Link>
            }
          </li>
        ))
      }
    </ol>
  );
}

Breadcrumb.propTypes = {
  path: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string,
    }),
  ),
};
