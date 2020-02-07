import React from 'react';

// Helpers
import classNames from 'classnames';

// Components
import SneakerCard from '../../components/SneakerCard';

// CSS
import './index.scss';

const SneakerRelated = ({ className, title, linkTitle }) => (
  <div className={classNames('sneaker-related', className)}>
    <div className="sneaker-related__heading">
      <div className="sneaker-related__title h2">{title}</div>
      <a className="sneaker-related__link" href="magazines/view">
        {linkTitle}
      </a>
    </div>
    <div className="row">
      <div className="col-sm-6 col-md-3">
        <SneakerCard className="sneaker-related__sneaker-card" />
      </div>
      <div className="col-sm-6 col-md-3">
        <SneakerCard className="sneaker-related__sneaker-card" />
      </div>
      <div className="col-sm-6 col-md-3">
        <SneakerCard className="sneaker-related__sneaker-card" />
      </div>
      <div className="col-sm-6 col-md-3">
        <SneakerCard className="sneaker-related__sneaker-card" />
      </div>
    </div>
  </div>
);

SneakerRelated.propTypes = {
  className: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  linkTitle: React.PropTypes.string.isRequired,
};

export default SneakerRelated;
