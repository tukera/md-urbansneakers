import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export default function Seo({ title, description, url, siteName, image, robots, pageCode }) {
  return (pageCode === 404) ? (
    <Helmet>
      <meta name="description" content="Seite nicht gefunden!" />
      <title>Seite nicht gefunden!</title>
    </Helmet>
  ) : (
    <Helmet>
      {(title) && [(<title key={title}>{title}</title>), (<meta key={`meta ${title}`} property="og:title" content={title} />)]}
      {(description) && [(<meta property="og:description" content={description} />), (<meta name="description" content={description} />)]}
      {(image) && <meta property="og:image" content={image} />}
      <meta property="og:site_name" content={siteName || window.location.hostname} />
      <meta property="og:url" content={url || window.location.href} />
      {(robots) && <meta name="robots" content={robots} />}
    </Helmet>
  );
}

Seo.propTypes = {
  pageCode: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  siteName: PropTypes.string,
  image: PropTypes.string,
  robots: PropTypes.string,
};
