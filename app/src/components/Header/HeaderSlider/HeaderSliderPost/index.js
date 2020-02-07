import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Helpers
import truncate from '../../../../helpers/Truncate';
import Image from '../../../../helpers/Image';

// Components
import DangerousHtml from '../../../../core/components/DangerousHtml';
import PostCard from '../../../../components/PostCard';

// CSS
import './index.scss';

export default function HeaderSliderPost(props) {
  return (
    <div className="header-slider-post">
      <div className="header-slider-post__image-wrapper">
        <Image className="header-slider-post__image" fit="crop" src={props.slide.img} width="1920" height="500" alt={props.slide.title} />
      </div>
      <div className="header-slider-post__content-wrapper">
        <div className="container">
          <DangerousHtml className="h1" html={truncate(props.slide.title, 35)} />
          <hr className="header-slider-post__separator" />
          <DangerousHtml className="header-slider-post__excerpt" html={truncate(props.slide.excerpt, 120)} />
        </div>
      </div>
      <div className="header-slider-post__button-wrapper">
        <Link to={props.slide.link} className="header-slider-post__button btn btn-outline-primary hvr-sweep-to-right">
          read article
        </Link>
      </div>
    </div>
  );
}

HeaderSliderPost.propTypes = {
  slide: PropTypes.shape(PostCard.propTypes),
};
