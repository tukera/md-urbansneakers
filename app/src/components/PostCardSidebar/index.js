import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectProps } from 'relpers';
import { decode } from 'he';

// Helpers
import Image from '../../helpers/Image';

// Components
import DangerousHtml from '../../core/components/DangerousHtml';

// CSS
import './index.scss';

export default class PostCardSidebar extends React.Component {

  @injectProps
  render({ post, image }) {
    return post ? (
      <div className="post-card-sidebar">
        <Link className="post-card-sidebar__image-wrapper" to={`${post.link}`}>
          <Image
            className="post-card-sidebar__image"
            src={image}
            alt={post.title}
            width="95" height="75"
          />
        </Link>
        <div className="post-card-sidebar__body">
          <div className="post-card-sidebar__meta">
            {post.badge}
          </div>
          <div className="post-card-sidebar__title h4">
            <Link className="post-card-sidebar__link" to={`${post.link}`}>
              {decode(post.title)}
            </Link>
          </div>
          <DangerousHtml
            className="post-card-sidebar__excerpt"
            html={post.excerpt}
          />
        </div>
      </div>
    ) : null;
  }
}

PostCardSidebar.propTypes = {
  post: PropTypes.shape({}).isRequired,
  onSidebar: PropTypes.bool,
  image: PropTypes.string.isRequired,
};
