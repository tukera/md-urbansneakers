import React, { PropTypes } from 'react';
import Slider from 'react-slick';

// Helpers
import Arrow from '../../helpers/Arrow';

// Components
import SneakerCard from '../../components/SneakerCard';
import PostCard from '../../components/PostCard';

// CSS
import './index.scss';

function FooterSecondary({ showPosts, showSneakers, latestPosts, latestSneakers }) {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 3,
    speed: 250,
    infinite: true,
    prevArrow: <Arrow direction="footer-secondary__arrow-prev" color="white" />,
    nextArrow: <Arrow direction="footer-secondary__arrow-next" color="white" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 496,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="footer-secondary">
      <div className="container">
        <h2 className="footer-secondary__headline">
          { showPosts &&
            'Latest Posts'
          }
          { showSneakers &&
            'Latest Sneakers'
          }
        </h2>
        <hr className="footer-secondary__separator" />
        <div className="footer-secondary__carousel">
          { showPosts && latestPosts.length > 0 && (
            <Slider {...settings}>
              {
                latestPosts.map(post => (
                  <div key={post.id} className="footer-secondary__slide"><PostCard post={post} light onSlider /></div>
                ))
              }
            </Slider>
          )}
          { showSneakers && latestSneakers.length > 0 && (
            <Slider {...settings}>
              {
                latestSneakers.map(sneaker => (
                  <div key={sneaker.id} className="footer-secondary__slide"><SneakerCard sneaker={sneaker} light /></div>
                ))
              }
            </Slider>
          )}
        </div>
        <div className="footer-secondary__button-wrapper">
          { showPosts &&
            <a className="btn btn-outline-secondary hvr-sweep-to-right" href="/magazin">More Posts</a>
          }
          { showSneakers &&
            <a className="btn btn-outline-secondary hvr-sweep-to-right" href="/sneakers">More Sneakers</a>
          }
        </div>
      </div>
    </div>
  );
}

FooterSecondary.propTypes = {
  showPosts: PropTypes.bool,
  showSneakers: PropTypes.bool,
  latestPosts: PropTypes.arrayOf(PropTypes.shape({})),
  latestSneakers: PropTypes.arrayOf(PropTypes.shape({})),
};

export default FooterSecondary;
