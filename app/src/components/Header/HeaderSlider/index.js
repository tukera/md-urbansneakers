import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

// Helpers
import Arrow from '../../../helpers/Arrow';

// Components
import HeaderSliderPost from './HeaderSliderPost';
import PostCard from '../../../components/PostCard';

// CSS
import './index.scss';

export default class HeaderSlider extends React.Component {

  constructor(props) {
    super(props);

    this.sliderSettings = {
      slidesToShow: 1,
      speed: 500,
      infinite: false,
      dots: true,
    };
  }

  previous = () => {
    this.slider.slickPrev();
  };

  next = () => {
    this.slider.slickNext();
  };

  render() {
    return (
      <div className="header-slider">
        <div className="container">
          <div className="header-slider__arrows-wrapper hidden-sm-down">
            <Arrow direction="header-slider__arrow-prev" onClick={this.previous} />
            <Arrow direction="header-slider__arrow-next" onClick={this.next} />
          </div>
        </div>
        { this.props.slides && this.props.slides.length > 0 && (
          <Slider ref={slider => (this.slider = slider)} {...this.sliderSettings}>
            {
              this.props.slides.map(slide => (
                <div key={slide.id}><HeaderSliderPost slide={slide} /></div>
              ))
            }
          </Slider>
        )}
      </div>
    );
  }
}

HeaderSlider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape(PostCard.propTypes)),
};
