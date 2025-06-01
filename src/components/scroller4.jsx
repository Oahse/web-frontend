import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useDeviceType from '@/hooks/useDeviceType';

const Scroller4 = ({
  items = [],
  itemsPerView = 2,
  pagination = true,
  direction = "horizontal",
  onItemChange = () => {},
}) => {
  const { isTablet, isDesktop } = useDeviceType();
  const containerRef = useRef(null);
  const [activePage, setActivePage] = useState(0);

  const slidesPerView = isDesktop ? 5 : isTablet ? 3 : itemsPerView;
  const totalPages = Math.ceil(items.length / slidesPerView);

  // Scroll to a specific "page" (group of items)
  const scrollToPage = (index) => {
    const container = containerRef.current;
    const child = container?.firstChild;
    if (!child) return;

    const itemSize =
      direction === 'horizontal' ? child.offsetWidth : child.offsetHeight;

    container.scrollTo({
      left: direction === 'horizontal' ? index * itemSize * slidesPerView : 0,
      top: direction === 'vertical' ? index * itemSize * slidesPerView : 0,
      behavior: 'smooth',
    });

    setActivePage(index);
    onItemChange(index);
  };

  // Set active page based on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollOffset =
        direction === 'horizontal' ? container.scrollLeft : container.scrollTop;
      const itemSize =
        direction === 'horizontal'
          ? container.firstChild?.offsetWidth
          : container.firstChild?.offsetHeight;

      const newIndex = Math.round(scrollOffset / (itemSize * slidesPerView));
      setActivePage(newIndex);
      onItemChange(newIndex);
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, [direction, slidesPerView, onItemChange]);

  return (
    <div className="scroller-wrapper">
      <div
        ref={containerRef}
        className="scroller-container"
        style={{
          display: 'flex',
          maxHeight: '500px',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          overflowX: direction === 'horizontal' ? 'auto' : 'hidden',
          overflowY: direction === 'vertical' ? 'auto' : 'hidden',
          scrollSnapType: `${direction} mandatory`,
          gap: '15px',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            data-color={item.color}
            onClick={() => scrollToPage(index)}
            style={{
              flex: `0 0 calc(100% / ${slidesPerView})`,
              scrollSnapAlign: 'start',
              transitionDelay: `${0.2 + (index + 1) * 0.1}s`,
              marginBottom: '10px',
              cursor: 'pointer',
              width: direction === 'horizontal' ? '100px' : '70px',
              height: direction === 'vertical' ? '100px' : 'auto',
            }}
            className={`scroller-item ${
              index === activePage ? 'scroller-item-active' : ''
            }`}
            aria-label={`${index + 1} / ${items.length}`}
          >
            <div className="item">
              <img
                className="lazyload"
                data-src={item.image}
                src={item.image}
                alt="img-product"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        ))}
      </div>

      {pagination && (
        <div className="scroller-pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index}
              className={`pagination-dot ${index === activePage ? 'active' : ''}`}
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Scroller4.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  itemsPerView: PropTypes.number,
  pagination: PropTypes.bool,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  onItemChange: PropTypes.func,
};

export default Scroller4;
