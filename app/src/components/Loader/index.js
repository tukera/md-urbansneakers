import React from 'react';
import PropTypes from 'prop-types';
import PulseLoader from 'halogen/PulseLoader';

// Helpers
import classNames from 'classnames';

import './index.scss';

export default function Loader({ className }) {
  return (
    <div className={classNames('text-center loader', className)}>
      <PulseLoader color="black" />
    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.string,
};
