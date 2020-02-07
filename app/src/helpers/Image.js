import React from 'react';
import PropTypes from 'prop-types';
import Imgix from 'react-imgix';
import MobileDetect from 'mobile-detect';

// Constants
import { Placeholder } from '../components/Icons';

export default function Image(props) {
  const md = new MobileDetect(window.navigator.userAgent);
  return (props.src && props.src !== '') ? (
    <Imgix
      fit="clamp"
      imgProps={props.alt && { alt: props.alt }}
      generateSrcSet={(!md.mobile() && !md.tablet())}
      {...props}
    />
  ) : (
    <Placeholder {...props} />
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
