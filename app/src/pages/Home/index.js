import React from 'react';
import PropTypes from 'prop-types';

import SneakerCard from '../../components/SneakerCard';
import TopBrands from '../../components/TopBrands';

import './index.scss';

export default class Home extends React.Component {
  getPagination() {
    return (this.props.currentPage < this.props.totalPages) ? (
      <button onClick={this.props.onClick} className="home__button btn btn-outline-primary hvr-sweep-to-right">
        load more
      </button>
    ) : null;
  }

  renderSneakers = (sneakers) => {
    const renderedSneakers = [];
    for (let i = 0; i < sneakers.length; i++) {
      if (i % 6 === 5 || i % 6 === 0) {
        renderedSneakers.push(
          <div key={sneakers[i].id} className="home__large-sneaker-wrapper">
            <SneakerCard className="home__sneaker-card" sneaker={sneakers[i]} isHome />
          </div>,
        );
      } else {
        renderedSneakers.push(
          <div key={sneakers[i].id} className="home__small-sneaker-wrapper">
            <SneakerCard className="home__sneaker-card" sneaker={sneakers[i]} isHome />
            <SneakerCard className="home__sneaker-card" sneaker={sneakers[++i]} isHome />
          </div>,
        );
      }
    }
    return renderedSneakers;
  };

  render() {
    return (
      <div className="home">
        <TopBrands topBrands={this.props.topBrands} className="home__top-brands" />
        <div className="home__title h2">
          trending sneakers
        </div>
        <hr className="home__separator" />
        <div className="home__sneakers-wrapper">
          { this.renderSneakers(this.props.sneakers) }
        </div>
        {this.getPagination()}
      </div>
    );
  }
}

Home.propTypes = {
  topBrands: PropTypes.arrayOf(PropTypes.shape({})),
  sneakers: PropTypes.arrayOf(PropTypes.shape({})),
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onClick: PropTypes.func,
};
