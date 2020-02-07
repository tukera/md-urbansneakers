import { wpapi } from '../constants/';

export const REQUEST_BRANDS = 'REQUEST_BRANDS';
export const RECEIVE_BRANDS = 'RECEIVE_BRANDS';
export const FAIL_BRANDS = 'FAIL_BRANDS';
export const SELECT_CHAR = 'SELECT_CHAR';
export const RECEIVE_BRAND = 'RECEIVE_BRAND';

function requestBrands() {
  return {
    type: REQUEST_BRANDS,
  };
}

function receiveBrands(payload) {
  return {
    type: RECEIVE_BRANDS,
    payload,
  };
}

function failBrands(err) {
  return {
    type: FAIL_BRANDS,
    payload: err,
  };
}

export function selectChar(payload) {
  return {
    type: SELECT_CHAR,
    payload,
  };
}

function mapBrands(brands) {
  return brands.reduce((accumulator, brand) => {
    const matchLetter = brand.name.match(/^[a-z]/i);
    const matchNumber = brand.name.match(/^[0-9]/);
    if (matchLetter || matchNumber) {
      const char = matchLetter ? matchLetter[0].toUpperCase() : '#';
      return Object.assign({}, accumulator, {
        [char]: [
          ...accumulator[char] || [],
          {
            ...brand,
          },
        ],
      });
    }
    return accumulator;
  }, {})
  ;
}

function mapTopBrands(brands) {
  return brands.reduce((accumulator, brand) => {
    if (accumulator.length <= 7 && brand.acf.is_top) {
      accumulator.push({
        ...brand,
      });
    }
    return accumulator;
  }, [])
  ;
}

export function fetchBrands() {
  return (dispatch) => {
    dispatch(requestBrands());
    return wpapi.brands().perPage(100).embed().get((err, data) => {
      if (!err) {
        dispatch(receiveBrands({
          brands: mapBrands(data),
          topBrands: mapTopBrands(data),
        }));
      } else {
        dispatch(failBrands(err));
      }
    });
  };
}

function receiveBrand(data) {
  return {
    type: RECEIVE_BRAND,
    data,
  };
}

export function fetchBrand(slug) {
  return (dispatch) => {
    dispatch(requestBrands());
    return wpapi.brands().slug(slug).embed().get((err, data) => {
      if (data.length > 0) {
        dispatch(receiveBrand(data[0]));
      } else {
        dispatch(failBrands(err));
      }
    });
  };
}
