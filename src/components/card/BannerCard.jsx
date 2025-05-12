import React from 'react';
import PropTypes from 'prop-types';

const BannerCard = ({ img,subheading, headingOne, headingTwo, btnText }) => {
  return (
    <div className="collection-item-v4 hover-img">
      <a href="product-detail.html" className="collection-inner">
        <div className="collection-image radius-10 img-style">
          <img
            className="lazyload"
            data-src={img}
            src={img}
            alt="collection-img"
          />
        </div>
        <div className="collection-content text-start">
          <div className="bottom wow fadeInUp" data-wow-delay="0s">
            <p className={`subheading fs-14 fw-7 `}>{subheading}</p>
            <h5 className={`heading fw-6 `}>
              {headingOne} <br /> {headingTwo}
            </h5>
            <button className="tf-btn style-3 btn-color-5 radius-60 animate-hover-btn">
              {btnText}
            </button>
          </div>
        </div>
      </a>
    </div>
  );
};

BannerCard.propTypes = {
  img: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  headingOne: PropTypes.string,
  headingTwo: PropTypes.string,
  btnText: PropTypes.string,
};

export default BannerCard;
