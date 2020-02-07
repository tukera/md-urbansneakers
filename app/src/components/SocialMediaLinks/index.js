import React from 'react';
import PropTypes from 'prop-types';

// Helpers
import classNames from 'classnames';

// CSS
import './index.scss';

import { SOCIAL_MEDIA } from '../../constants/';

/* eslint-disable max-len */
function SocialMediaLinks({ light, vertical, large, className, link = window.location.origin, share }) {
  return (
    <div className={classNames('social-media-links', { 'social-media-links_is-light': light, 'social-media-links_is-vertical': vertical, 'social-media-links_is-large': large }, className)}>
      <a className="social-media-links__link" target="_blank" rel="noopener noreferrer" href={share ? `${SOCIAL_MEDIA.share.facebook}${link}` : `${SOCIAL_MEDIA.like.facebook}`}>
        <i className="social-media-links__icon fa fa-facebook-f" />
      </a>
      { !share &&
        <a className="social-media-links__link" target="_blank" rel="noopener noreferrer" href={SOCIAL_MEDIA.like.instagram}>
          <i className="social-media-links__icon fa fa-instagram" />
        </a>
      }
      { share &&
        <a className="social-media-links__link" target="_blank" rel="noopener noreferrer" href={`${SOCIAL_MEDIA.share.twitter}${link}`}>
          <i className="social-media-links__icon fa fa-twitter" />
        </a>
      }
      { share &&
        <a className="social-media-links__link" target="_blank" rel="noopener noreferrer" href={`${SOCIAL_MEDIA.share.googlePlus}${link}`}>
          <i className="social-media-links__icon fa fa-google-plus" />
        </a>
      }
    </div>
  );
}

SocialMediaLinks.propTypes = {
  light: PropTypes.bool,
  vertical: PropTypes.bool,
  large: PropTypes.bool,
  className: PropTypes.string,
  link: PropTypes.string,
  share: PropTypes.bool,
};

export default SocialMediaLinks;
