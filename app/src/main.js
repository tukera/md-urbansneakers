import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { attach } from 'fastclick';
import { Provider } from 'react-redux';
import App from './App';

import configureStore from './store/configureStore';

const store = configureStore();

function renderComponent(component) {
  render(<Provider store={store}>{component}</Provider>, document.getElementById('app-container'));
}

document.addEventListener('DOMContentLoaded', () => {
  renderComponent(<App />);
});

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
attach(document.body);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line global-require
    renderComponent(<NextApp />);
  });
}
