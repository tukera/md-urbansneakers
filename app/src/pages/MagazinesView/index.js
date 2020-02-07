import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { decode } from 'he';
import { injectProps } from 'relpers';
import striptags from 'striptags';

// Components
import DangerousHtml from '../../core/components/DangerousHtml';
import SocialMediaLinks from '../../components/SocialMediaLinks';
import SidebarBlock from '../../components/SidebarBlock';
import PostCardSidebar from '../../components/PostCardSidebar';
import Loader from '../../components/Loader';
import Seo from '../../components/Seo';

// CSS
import './index.scss';

export default class PostsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: props.match.params.slug,
    };
  }

  @injectProps
  componentDidMount({ loadedItems, sidebarPosts, actions }) {
    if (loadedItems && !loadedItems[this.state.slug]) {
      actions.fetchPost(this.state.slug);
    }

    if (sidebarPosts.length === 0) {
      actions.fetchPostsIfNeeded();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleNewSlug(nextProps);
  }

  @injectProps
  handleNewSlug({ loadedItems, actions }, props) {
    if (props.match.params.slug === this.state.slug) {
      return;
    }

    this.setState({
      slug: props.match.params.slug,
    });

    if (loadedItems && !loadedItems[props.match.params.slug]) {
      actions.fetchPost(props.match.params.slug);
    }
  }

  @injectProps
  render({ loadedItems, sidebarPosts, errorMessages }) {
    const post = loadedItems[this.state.slug] || undefined;
    return (post) ? (
      <div className="magazines-view">
        <Seo
          title={post.seo.title || decode(post.title)}
          description={post.seo.description || decode(striptags(post.excerpt))}
          image={post.img || false}
        />
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/magazin">Magazin</Link>
          </li>
          <li className="breadcrumb-item active">
            {decode(post.title)}
          </li>
        </ol>
        <div className="row">
          <div className="col-md-8">
            <DangerousHtml tagName="h1" className="magazines-view__headline" html={post.title} />
            <SocialMediaLinks share link={window.location.href} className="magazines-view__social-media-links" />
            <div className="magazines-view__meta">
              <span className="magazines-view__published">
                {`${moment(post.date).locale('de').format('MMMM DD, YYYY')} by: `}
              </span>
              <span className="magazines-view__publisher">
                {post.authorName || post.authorSlug}
              </span>
            </div>
            <hr className="magazines-view__separator" />
            <DangerousHtml className="magazines-view__wysiwyg-wrapper" html={post.content} />
            <div className="magazines-index__related-brands">
              { post.tags && (
                post.tags.map(tag => (
                  <span key={tag.id} className="badge badge-primary magazines-view__badge">{tag.name}</span>
                ))
              )}
              { post.brands.length > 0 && (
                post.brands.map(brand => (
                  <span key={brand.id} className="badge badge-primary magazines-view__badge">{brand.name}</span>
                ))
              )}
            </div>
          </div>
          <div className="col-md-4">
            <SidebarBlock title="Popular articles">
              {sidebarPosts.map(postSidebar => (
                <PostCardSidebar
                  key={postSidebar.id}
                  post={postSidebar}
                  onSidebar
                  image={postSidebar.img}
                />
              ))}
            </SidebarBlock>
          </div>
        </div>
      </div>
    ) : (
      <div>
        { errorMessages[this.state.slug] ? (
          <p>
            Oops, etwas ist schief gelaufen!
            Error: {errorMessages[this.state.slug]}
            <Seo pageCode={404} />
          </p>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

PostsView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
