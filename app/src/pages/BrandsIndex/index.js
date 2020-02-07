import React from 'react';

import TopBrands from '../../components/TopBrands';
import BrandsButtons from '../../components/BrandsButtons';
import BrandsList from '../../components/BrandsList';

import './index.scss';

function BrandsIndex(props) {
  return (
    <div className="brands-index" >
      <TopBrands {...props} className="brands-index__top-brands" />
      <BrandsButtons {...props} className="brands-index__brands-buttons" />
      <BrandsList {...props} className="brands-index__brands-list" />
    </div>
  );
}

export default BrandsIndex;
