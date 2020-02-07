import React from 'react';
import { Link } from 'react-router-dom';

// Constants
import { FOOTER_LINKS } from '../../constants';

// Components
import SocialMediaLinks from '../SocialMediaLinks';

// CSS
import './index.scss';

function FooterPrimary() {
  return (
    <div className="footer-primary">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <span className="footer-primary__headline h4">
              Über
            </span>
            <hr className="footer-primary__separator" />
            <ul className="footer-primary__ul">
              <li className="footer-primary__li">
                <Link key="sneaker-reporter" className="footer-primary__link" to={'/magazin/sneaker-reporter'}>Sneaker-Reporter</Link>
              </li>
              {Object.keys(FOOTER_LINKS.about).map(slug => (
                <li key={slug} className="footer-primary__li">
                  <Link key={`link to ${slug}`} className="footer-primary__link" to={`/${slug}`}>{FOOTER_LINKS.about[slug]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-6 col-md-3">
            <span className="footer-primary__headline h4">
                Rechtliches
            </span>
            <hr className="footer-primary__separator" />
            <ul className="footer-primary__ul">
              {Object.keys(FOOTER_LINKS.legal).map(slug => (
                <li key={slug} className="footer-primary__li">
                  <Link key={`link to ${slug}`} className="footer-primary__link" to={`/${slug}`}>{FOOTER_LINKS.legal[slug]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-6 col-md-3">
            <span className="footer-primary__headline h4">
              Countries
            </span>
            <hr className="footer-primary__separator" />
            <ul className="footer-primary__ul">
              {Object.keys(FOOTER_LINKS.branch).map(text => (
                <li key={text} className="footer-primary__li">
                  <a key={`link to ${text}`} className="footer-primary__link" target="_blank" rel="noopener noreferrer" href={FOOTER_LINKS.branch[text]}>{text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-6 col-md-3">
            <span className="footer-primary__headline h4">
              Social Media
            </span>
            <hr className="footer-primary__separator" />
            <SocialMediaLinks className="footer-primary__social-media-links" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterPrimary;
