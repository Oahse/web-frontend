import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ image = null, name = null, className = '',isMobile=null, ...props }) => {
    return (
      <div
        className={`collection-item-circle has-bg has-bg-2 hover-img ${className}`}
        {...props}
      >
        <a href="shop-default.html" className="collection-image img-style">
          <img className="lazyload" data-src={image} alt="collection-img" src={image} style={{minWidth:'70px',height:`${isMobile?'100px':'100px'}`}} />
        </a>
        <div className="collection-content text-center">
          <Link to="/products" className="link title fw-5">{name}</Link>
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
