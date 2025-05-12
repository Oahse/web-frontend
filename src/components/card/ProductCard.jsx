import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ wrapper = null, info = null }) => {
  return (
    <div className="card-product style-9">
      <div className="card-product-wrapper">
        {wrapper}
      </div>
      <div className="card-product-info">
        {info}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  wrapper: PropTypes.node,
  info: PropTypes.node
};

export default ProductCard;
