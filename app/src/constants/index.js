/* eslint-disable global-require */
import WPAPI from 'wpapi';

export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';


export const MEDIA_BREAKPOINT = {
  MD: 768,
  LG: 992,
  XL: 1200,
};

export const DEFAULT_BACKGROUND = require('../../public/assets/backgrounds/header-home.png');

export const wpapi = new WPAPI({
  endpoint: process.env.API_URL,
});

wpapi.brands = wpapi.registerRoute('wp/v2', '/brands');
wpapi.magazines = wpapi.registerRoute('wp/v2', '/magazines');
wpapi.labels = wpapi.registerRoute('wp/v2', '/labels');
wpapi.sneakers = wpapi.registerRoute('wp/v2', '/sneakers');
wpapi.magazineLabels = wpapi.registerRoute('wp/v2', '/post_labels');

export const FOOTER_LINKS = {
  branch: {
    FR: 'https://urbansneakers.fr',
    IT: 'https://urbansneakers.shoes',
    PL: 'https://urbansneakers.pl',
    CH: 'https://urbansneakers.ch',
  },
  legal: {
    teilnahmebedingungen: 'Teilnahmebedingungen',
    impressum: 'Impressum',
    agb: 'AGBs & Datenschutzbestimmungen',
  },
  about: {
    'uber-uns': 'Über Uns',
    kooperationen: 'Kooperationen',
  },
};

export const EXCLUDED_FILTERS = [
  'adidas_adult',
  'adidas_kids',
  'kids',
  'men',
  'women',
  'tags',
  'categories',
  'labels',
  'post_labels',
];

export const SOCIAL_MEDIA = {
  share: {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
    twitter: 'http://twitter.com/home?status=',
    googlePlus: 'http://plus.google.com/share?url=',
  },
  like: {
    facebook: 'https://www.facebook.com/urbansneakers.io/',
    instagram: 'https://www.instagram.com/urbansneakers.io/',
  },
};
