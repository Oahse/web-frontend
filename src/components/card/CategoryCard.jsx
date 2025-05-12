import React from 'react';
import PropTypes from 'prop-types';

const CategoryCard = ({ img = null, name = null, className = '', ...props }) => {
    return (
      <div
        className={`collection-item-circle has-bg has-bg-2 hover-img ${className}`}
        {...props}
      >
        <a href="shop-default.html" className="collection-image img-style">
          <img className="lazyload" data-src={img} alt="collection-img" src={img} />
        </a>
        <div className="collection-content text-center">
          <a href="shop-default.html" className="link title fw-5">{name}</a>
        </div>
      </div>
    );
  };
  

CategoryCard.propTypes = {
  wrapper: PropTypes.node,
  info: PropTypes.node,
  className:PropTypes.node,
};

export default CategoryCard;
