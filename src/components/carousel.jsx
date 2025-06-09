import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
// import 'swiper/swiper-bundle.css';  // Make sure to import Swiper's styles

const Carousel = ({ items = [], pagination = true }) => {
  const swiperRef = useRef(null);  // Swiper container reference
  const paginationRef = useRef(null);  // Custom pagination container reference
  const swiperInstance = useRef(null); // Swiper instance reference
  const [activeIndex, setActiveIndex] = useState(0); // Manage active pagination index

  useEffect(() => {
    swiperInstance.current = new Swiper(swiperRef.current, {
      loop: true,
      spaceBetween: 0,
      autoplay: {
        delay: 2000,
      },
      speed: 1500,
      pagination: {
        el: paginationRef.current,
        clickable: true,
      },
    });

    // Handle slide change events to update the active bullet
    swiperInstance.current.on('slideChange', () => {
      setActiveIndex(swiperInstance.current.realIndex); // Update active index on slide change
    });

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(); // Destroy swiper instance on component unmount
      }
    };
  }, [pagination]);

  // Function to dynamically generate pagination bullets
  const generatePaginationBullets = () => {
    return items.map((_, index) => (
      <span
        key={index}
        className={`swiper-pagination-bullet ${activeIndex === index ? 'swiper-pagination-bullet-active' : ''}`}
        role="button"
        aria-label={`Go to slide ${index + 1}`}
        tabindex="0"
        onClick={() => swiperInstance.current.slideTo(index)} // Move swiper to the corresponding slide on click
      ></span>
    ));
  };

  return (
    <div className="tf-slideshow slider-effect-fade slider-grocery position-relative flat-spacing-25 pb_0">
      <div className="container">
        <div
          ref={swiperRef} // Swiper container ref
          dir='ltr'
          className="swiper tf-sw-slideshow radius-20"
        >
          <div className="swiper-wrapper">
            {items.map((item, index) => (
              <div key={index} className="swiper-slide" data-lazy="true">
                <div className="wrap-slider">
                  <img
                    className="lazyload"
                    data-src={item?.img || item.images[0]}
                    src={item?.img || item.images[0]}
                    alt={`hp-slideshow-0${index}`}
                    style={{maxHeight:'600px'}}
                  />
                  <div className="box-content">
                    <div className="container">
                      <h2 className="fade-item fade-item-2 fw-6 heading">
                        {item?.headingone || item?.name?.trim().split(" ").slice(0, -1).join(" ")}
                        <br />
                        {item?.headingtwo || item?.name?.trim().split(" ").pop()}
                      </h2>
                      <p className="fade-item fade-item-1 fw-6 d-block">{item?.body || item?.description?.desc}</p>
                      <div className="fade-item fade-item-3">
                        <Link
                          to={item.link || `/products/${item?.id}`}
                          state={{ product: item }}
                          className="tf-btn btn-fill animate-hover-btn btn-xl radius-60"
                        >
                          <span>{item.btntext || `Buy Now`}</span>
                          <i className="icon icon-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pagination && (
            <div className="wrap-pagination" ref={paginationRef}>
              <div className="container">
                <div className="sw-dots sw-pagination-slider justify-content-xl-start justify-content-center">
                  {generatePaginationBullets()} {/* Dynamically generated pagination bullets */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      headingone: PropTypes.string,
      headingtwo: PropTypes.string,
      body: PropTypes.string,
      btntext: PropTypes.string,
    })
  ),
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  pagination: PropTypes.bool,
};

export default Carousel;
