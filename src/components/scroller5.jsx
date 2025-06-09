import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Scroller5 = ({ items = [], itemsPerView = 1, pagination = true, direction = "horizontal", onChange }) => {
  const containerRef = useRef(null);
  const paginationRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(items[0] || null);

  useEffect(() => {
    setActiveItem(items[activeIndex] || null);
  }, [activeIndex, items]);

  const handleIncrease = () => {
    setActiveIndex(prev => {
      const next = Math.min(prev + 1, items.length - 1);
      if (onChange) onChange(next);
      return next;
    });
  };

  const handleDecrease = () => {
    setActiveIndex(prev => {
      const next = Math.max(prev - 1, 0);
      if (onChange) onChange(next);
      return next;
    });
  };

  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  if (!activeItem) return null;

  return (
    <div className="wrap-carousel" ref={containerRef}>
      <div
        dir="ltr"
        className="swiper tf-sw-testimonial"
        data-preview="3"
        data-tablet="2"
        data-mobile="1"
        data-space-lg="30"
        data-space-md="15"
      >
        <div className="swiper-wrapper">
          <div className="swiper-slide" style={{ minWidth: '100%' }}>
            <div className="testimonial-item style-column">
              {activeItem.rating && (
                <div className="rating">
                    {Array.from({ length: activeItem.rating }, (_, idx) => (
                        <i key={idx} className="icon-star"></i>
                    ))}
                </div>
              )}
              <div className="heading">{activeItem.header}</div>
              <div className="text">“ {activeItem.description} ”</div>
              <div className="author">
                <div className="name"><img className="lazyload mx-2 rounded"
                                data-src={activeItem.image}
                                src={activeItem.image}
                                alt={activeItem.name} width={50} height={50}/>{activeItem.name}</div>
                <div className="metas">{activeItem.metas}</div>
              </div>

              {/* <div className="scroller-wrapper" >
                <div
                  className="scroller-container"
                  ref={scrollRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory',
                    gap: '15px',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                    maxWidth: '100%',
                    }}
                >
                  {activeItem.products?.map((product, idx) => (
                    <div
                      key={idx}
                      data-color={product.color}
                      style={{
                        flex: '0 0 250px',
                        scrollSnapAlign: 'start',
                        marginBottom: '10px',
                        cursor: 'pointer',
                        }}
                      className="scroller-item"
                      aria-label={`${idx + 1} / ${items.length}`}
                    >
                      <div className="item">
                        <div className="product">
                          <div className="image">
                            <a href="product-detail.html">
                              <img
                                className="lazyload"
                                data-src={product.images[0]}
                                src={product.images[0]}
                                alt={product.name}
                              />
                            </a>
                          </div>
                          <div className="content-wrap">
                            <div className="product-title">
                              <span>{product.name}</span>
                            </div>
                            <div className="price">
                              {product.currency}
                              {product.price}
                            </div>
                          </div>
                          <Link to={`/products/${product.id}`} state={{ product }} className="">
                            <i className="icon-arrow1-top-left"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                
                
              </div> */}
              
              
            </div>
          </div>
        </div>
      </div>

      {pagination && (
        <>
          <div
            className="nav-sw nav-next-slider nav-next-testimonial lg"
            onClick={handleIncrease}
          >
            <span className="icon icon-arrow-left"></span>
          </div>
          <div
            className="nav-sw nav-prev-slider nav-prev-testimonial lg"
            onClick={handleDecrease}
          >
            <span className="icon icon-arrow-right"></span>
          </div>
        </>
      )}
    </div>
  );
};

Scroller5.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      description: PropTypes.string,
      rating: PropTypes.number, // you expect an array before, but your code uses length, so number fits better
      name: PropTypes.string,
      metas: PropTypes.string,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          name: PropTypes.string,
          color: PropTypes.string,
          images: PropTypes.arrayOf(PropTypes.string),
          price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          currency: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  itemsPerView: PropTypes.number,
  pagination: PropTypes.bool,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  onChange: PropTypes.func,
};

export default Scroller5;
