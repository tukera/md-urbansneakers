import _get from 'lodash/get';

export default function FilterColor(sneaker, colors) {
  if (sneaker.acf.variant.length === 1) {
    _get(sneaker, 'acf.variant.0');
  }
  const results = [];

  colors.forEach((color) => {
    sneaker.acf.variant.forEach((variant) => {
      if (variant.color && variant.color.find(item => item.term_id === color)) {
        results.push(variant);
      }
    });
  });

  return results[0] || _get(sneaker, 'acf.variant.0');
}
