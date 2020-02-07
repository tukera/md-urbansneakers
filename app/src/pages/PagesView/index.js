import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import striptags from 'striptags';
import { decode } from 'he';
import { injectProps } from 'relpers';
import { propTypes } from '../../actions/decorators';

// Components
import DangerousHtml from '../../core/components/DangerousHtml';
import Loader from '../../components/Loader';
import Seo from '../../components/Seo';

// CSS
import './index.scss';

@propTypes({
  actions: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  loadedItems: PropTypes.arrayOf({}),
})

export default class PagesView extends React.Component {
  @injectProps
  componentDidMount({ actions, loadedItems, slug }) {
    if (loadedItems && !loadedItems[slug]) {
      actions.fetchPage(slug);
    }
  }

  @injectProps
  render({ slug, loadedItems }) {
    const page = loadedItems[slug] || undefined;

    if (!page) {
      return (
        <Loader />
      );
    }

    if (loadedItems[slug].isFailed) {
      return (
        <div>
          Es wurde keine Seite unter dem Slug {slug} angelegt und veröffentlicht.
          <Seo pageCode={404} />
        </div>
      );
    }

    return (
      <div className="pages-view">
        <Seo
          title={page.seo.title || decode(page.title.rendered)}
          description={page.seo.description || decode(striptags(page.excerpt.rendered))}
          image={_get(page, '_embedded.wp:featuredmedia.0.source_url', false)}
        />
        <DangerousHtml className="pages-view__wysiwyg-wrapper" html={page.content.rendered} />
      </div>
    );
  }
}

PagesView.propTypes = {
  isFailed: PropTypes.bool,
  actions: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  loadedItems: PropTypes.arrayOf({}),
};
