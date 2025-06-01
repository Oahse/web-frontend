import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useDeviceType from '@/hooks/useDeviceType';

const Scroller3 = ({ items = [], showsidescrollers=false,activeItem=0, className='',id=null, pagination = true }) => {
  const { isMobile,isTablet, isDesktop} = useDeviceType();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(activeItem);
  
  // Function to go to the previous item
  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(items.length - 1); // Loop back to the last item
    }
  };

  // Function to go to the next item
  const goNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to the first item
    }
  };

    const containerRef = useRef(null);
    // const [activePage, setActivePage] = useState(0);
  
    const slidesPerView = isDesktop ? 5 : isTablet ? 3 : items.length;
    // const totalPages = Math.ceil(items.length / slidesPerView);
  
    // Scroll to a specific "page" (group of items)
    const scrollToPage = (index) => {
      
      setCurrentIndex(index);
      // onItemChange(index);
    };
  
    // Set active page based on scroll
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
  
      
    }, [slidesPerView ]);
  

  return (
    <>
      {(isDesktop && showsidescrollers) && <div className="scroller-wrapper">
        <div
          ref={containerRef}
          className="scroller-container"
          style={{
            display: 'flex',
            maxHeight: '850px',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollSnapType: `vertical mandatory`,
            gap: '15px',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            transition: 'opacity 0.3s, transform 3.3s',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              data-color={item?.color || index}
              onClick={() => scrollToPage(index)}
              style={{
                flex: `0 0 calc(100% / ${slidesPerView})`,
                scrollSnapAlign: 'start',
                marginBottom: '10px',
                cursor: 'pointer',
                width: '80px',
                height: '120px',
                transition: 'opacity 0.3s, transform 3.3s',
              }}
              className={`scroller-item ${
                index === currentIndex ? 'scroller-item-active' : ''
              }`}
              aria-label={`${index + 1} / ${items.length}`}
            >
              <div className="item">
                <img
                  className="lazyload"
                  data-src={item?.image|| item?.src || item}
                  src={item?.image || item?.src || item}
                  alt="img-product"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>}
      <div ref={swiperRef} id={id} dir="ltr" className={`swiper tf-single-slide ${className}`}>
        <div className="swiper-wrapper">
          <div className="swiper-slide" data-color={items[currentIndex]?.color} >
            <div className="item">
              <img
                className='lazyload'
                src={items[currentIndex]?.image || items[currentIndex]?.src || items[currentIndex]|| ''}
                data-src={items[currentIndex]?.image || items[currentIndex]?.src || items[currentIndex] || ''}
                alt={items[currentIndex]?.name || items[currentIndex]?.alt || `Item ${currentIndex + 1}`}
              />
            </div>
          </div>
        </div>
        {pagination && (
          <>
            <div
              className="swiper-button-prev button-style-arrow single-slide-prev"
              onClick={goPrev}
            ></div>
            <div
              className="swiper-button-next button-style-arrow single-slide-next"
              onClick={goNext}
            ></div>
          </>
        )}
      </div>
      {(!isDesktop && showsidescrollers) && <div className="scroller-wrapper">
      <div
        ref={containerRef}
        className="scroller-container"
        style={{
          display: 'flex',
          maxWidth: '500px',
          flexDirection: 'row',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: `horizontal mandatory`,
          gap: '15px',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            data-color={item?.color || index}
            onClick={() => scrollToPage(index)}
            style={{
              flex: `0 0 calc(100% / 4.5)`,
              scrollSnapAlign: 'start',
              marginBottom: '10px',
              cursor: 'pointer',
              width: '80px',
              maxHeight: '150px',
            }}
            className={`scroller-item ${
              index === currentIndex ? 'scroller-item-active' : ''
            }`}
            aria-label={`${index + 1} / ${items.length}`}
          >
            <div className="item">
              <img
                className="lazyload"
                data-src={item?.image || item}
                src={item?.image || item}
                alt="img-product"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>}
    </>
  );
};

Scroller3.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
  itemsPerView: PropTypes.number,
  pagination: PropTypes.bool,
};

export default Scroller3;
