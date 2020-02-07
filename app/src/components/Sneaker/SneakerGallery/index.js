import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Helpers
import Image from '../../../helpers/Image';

// CSS
import './index.scss';

class SneakerGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImageIndex: 0,
    };
  }

  changeSelectedImageIndex(index) {
    this.setState({
      selectedImageIndex: index,
    });
  }

  render() {
    return (
      <div className="sneaker-gallery">
        <div className="sneaker-gallery__list-wrapper">
          { this.props.items.slice(0, 5).map((item, index) => (
            <div className="sneaker-gallery__list-item" key={item.id}>
              <a
                className={classNames('sneaker-gallery__list-image-wrapper', { active: index === this.state.selectedImageIndex })}
                onClick={() => this.changeSelectedImageIndex(index)}
              >
                <Image
                  className="sneaker-gallery__list-image img-fluid"
                  src={item.url}
                  width="80" height="80"
                />
              </a>
            </div>
          ))}
        </div>
        <div className="sneaker-gallery__portrait">
          <Image
            className="sneaker-gallery__image img-fluid"
            src={this.props.items[this.state.selectedImageIndex].url}
            width="650" height="500"
          />
          { this.props.tag && <div className={`sneaker-gallery__image-tag sneaker-gallery__image-tag_${this.props.tag}`}>{this.props.tag}</div> }
        </div>
      </div>
    );
  }
}

SneakerGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  })),
  tag: PropTypes.string,
};

export default SneakerGallery;
