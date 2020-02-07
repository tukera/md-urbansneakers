import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { FOOTER_LINKS } from './constants';

import Header from './containers/Header';
import FooterSecondary from './containers/FooterSecondary';
import FooterPrimary from './components/FooterPrimary';
import Home from './containers/Home';
import BrandsIndex from './containers/BrandsIndex';
import BrandsView from './containers/BrandsView';
import SneakersView from './containers/SneakersView';
import Error from './pages/error';
import MagazinesIndex from './containers/MagazinesIndex';
import MagazinesView from './containers/MagazinesView';
import PagesView from './containers/PagesView';
import SneakersIndex from './containers/SneakersIndex';
import SaleIndex from './containers/SaleIndex';
import Seo from './components/Seo';
import ScrollToTop from './components/ScrollToTop';

// Helpers
import tracker from './helpers/Tracker';

class App extends React.Component {

  render() {
    return (
      <div ref={(node) => { (this.root = node); }}>
        <Seo
          title="Urbansneakers - For Sneaker-Lover"
        />
        <BrowserRouter>
          <ScrollToTop>
            <main>
              <Switch>
                <Route exact path="/magazin" component={() => (<Header isMagazine />)} />
                <Route exact path="/" component={() => (<Header isHome />)} />
                <Route component={Header} />
              </Switch>
              <div className="container">
                <Switch>
                  {Object.keys(FOOTER_LINKS.about).map(slug => (
                    <Route key={slug} exact path={`/${slug}`} component={() => (<PagesView key={`pages view ${slug}`} slug={slug} />)} />
                  ))}
                  {Object.keys(FOOTER_LINKS.legal).map(slug => (
                    <Route key={slug} exact path={`/${slug}`} component={() => (<PagesView key={`pages view ${slug}`} slug={slug} />)} />
                  ))}
                  <Route exact path="/" component={Home} />
                  <Route exact path="/sneakers" component={SneakersIndex} />
                  <Route exact path="/sneakers/:slug" component={SneakersView} />
                  <Route exact path="/sneakers/:slug/:color" component={SneakersView} />
                  <Route exact path="/sale" component={SaleIndex} />
                  <Route exact path="/magazin" component={MagazinesIndex} />
                  <Route exact path="/magazin/:slug" component={MagazinesView} />
                  <Route exact path="/brands" component={BrandsIndex} />
                  <Route exact path="/brands/:slug" component={BrandsView} />
                  <Route component={Error} />
                </Switch>
              </div>
              <Switch>
                <Route exact path="/" component={() => (<FooterSecondary showPosts />)} />
                <Route exact path="/sneakers" component={() => (<FooterSecondary showPosts />)} />
                <Route exact path="/sneakers/:slug" component={() => (<FooterSecondary showPosts />)} />
                <Route exact path="/magazin" component={() => (<FooterSecondary showSneakers />)} />
                <Route exact path="/magazin/:slug" component={() => (<FooterSecondary showPosts />)} />
              </Switch>
              <Route key="footer" component={tracker(FooterPrimary)} />
            </main>
          </ScrollToTop>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
