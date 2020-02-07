import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Helpers
import Moment from 'react-moment';
import classNames from 'classnames';
import Image from '../../helpers/Image';

// Components
import DangerousHtml from '../../core/components/DangerousHtml';
import SocialMediaLinks from '../SocialMediaLinks';

// CSS
import './index.scss';

export default class PostCard extends React.Component {

  render() {
    const { post } = this.props;

    return post ? (
      <div className={classNames('post-card', { 'post-card_is-light': this.props.light }, this.props.className)}>
        <div className="post-card__image-wrapper" >
          <Link to={post.link}>
            <Image className="post-card__image img-fluid" src={post.img} fit="crop" width="384" height="235" alt={post.title} />
            <div className="post-card__image-overlay" />
          </Link >
          <SocialMediaLinks light vertical share className="post-card__social-media-links" link={`${window.location.origin}/${post.link}`} />
          <span className="post-card__badge">{post.badge}</span>
        </div>
        <div className="post-card__meta">
          <span className="post-card__published">
            <Moment format="DD. MMM YYYY">{post.date}</Moment>
          </span>
        </div>
        <Link className="post-card__link" to={post.link}>
          <DangerousHtml tagName="h3" className="post-card__title" html={post.title} />
        </Link>
        <hr className="post-card__separator" />
        <DangerousHtml className="post-card__excerpt" html={post.excerpt} />
      </div>
      ) : null;
  }
}

PostCard.propTypes = {
  post: PropTypes.shape({}),
  light: PropTypes.bool,
  className: PropTypes.string,
};
