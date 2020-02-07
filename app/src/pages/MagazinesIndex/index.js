import React from 'react';
import PropTypes from 'prop-types';
import striptags from 'striptags';
import { decode } from 'he';
import { injectProps } from 'relpers';

// Components
import PostCard from '../../components/PostCard';
import Loader from '../../components/Loader';
import Seo from '../../components/Seo';

// CSS
import './index.scss';

export default class PostsIndex extends React.Component {
  @injectProps
  componentDidMount({ actions }) {
    actions.fetchPostsIfNeeded();
  }

  /* eslint-disable class-methods-use-this */
  @injectProps
  getPagination({ currentPage, totalPages, itemsPerPage, actions }) {
    return (currentPage < totalPages) ? (
      <div className="magazines-index__button-wrapper">
        <button
          onClick={() => {
            actions.fetchPosts(itemsPerPage, currentPage + 1);
          }}
          className="btn btn-outline-primary hvr-sweep-to-right"
        >
          Load More
        </button>
      </div>
    ) : null;
  }

  @injectProps
  render({ needRefresh, actions, magazines }) {
    if (needRefresh) {
      actions.fetchPostsIfNeeded();
    }
    return (
      <div className="magazines-index">
        {(!magazines || magazines.length === 0) ? (
          <Loader />
        ) : (
          <div className="row">
            <Seo
              title={magazines[0].seo.title || decode(magazines[0].title)}
              description={magazines[0].seo.description || decode(striptags(magazines[0].excerpt))}
              image={magazines[0].img || false}
            />
            {magazines.map(post => (
              <div key={post.id} className="col-sm-6 col-md-4">
                <PostCard className="magazines-index__post-card" post={post} />
              </div>
            ))}
          </div>
        )}
        {this.getPagination()}
      </div>
    );
  }
}

PostsIndex.propTypes = {
  actions: PropTypes.shape({
    fetchPostsIfNeeded: PropTypes.func,
    fetchPosts: PropTypes.func,
  }),
  magazines: PropTypes.arrayOf(PropTypes.shape({})),
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  needRefresh: PropTypes.bool,
};
