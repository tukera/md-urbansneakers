import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default function SocialLinks({ invert, links }) {
  return (
    <div className="social-links">
      {
        /* eslint-disable jsx-a11y/anchor-has-content */
        links && Object.keys(links).map(siteName => (
          <a
            key={`${siteName}-social-link`}
            href={links[siteName]}
            rel="noopener noreferrer"
            target="_blank"
            className={`social-links__image social-links__image_${siteName} ${invert ? 'social-links__image_invert' : ''}`}
          />
        ))
      }
    </div>
  );
}

SocialLinks.propTypes = {
  invert: PropTypes.bool,
  links: PropTypes.shape({
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    pinterest: PropTypes.string,
    twitter: PropTypes.string,
    mail: PropTypes.string,
    whatsapp: PropTypes.string,
    googleplus: PropTypes.string,
  }),
};
