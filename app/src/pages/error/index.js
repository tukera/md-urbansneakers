import React from 'react';
import { Link } from 'react-router-dom';

import Seo from '../../components/Seo';
import { DEFAULT_BACKGROUND } from '../../constants';

import './index.scss';

const ErrorPage = () => (
  <div className="error-page">
    <Seo pageCode={404} />
    <div className="error-page__image-wrapper ">
      <img className="error-page__image img-fluid" src={DEFAULT_BACKGROUND} alt="background" />
    </div>
    <div className="error-page__content">
      <div className="error-page__title h1">error 404</div>
      <hr className="error-page__separator" />
      <div>
        We are sorry but the page you are looking for does not exist
        or an another error occurred.
      </div>
      <div>
        Go back to the <Link className="error-page__link" to="/">homepage</Link> to choose a new direction.
      </div>
    </div>
  </div>
);

export default ErrorPage;
