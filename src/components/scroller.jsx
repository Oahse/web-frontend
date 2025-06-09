import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from 'react';
import { Pagination } from 'swiper/modules';
import useDeviceType from '@/hooks/useDeviceType';
import PropTypes from 'prop-types';
import CategoryCard from '@/components/card/CategoryCard';
import BannerCard from '@/components/card/BannerCard';

const Scroller = ({ items = [], child, itemsPerView, pagination =true,isMobile=null,direction="horizontal"}) => {
  const { isTablet, isDesktop } = useDeviceType();
  const swiperRef = useRef(null);
  const paginationRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slidesPerView = itemsPerView || isDesktop ? 5 : isTablet ? 3 : 2;
  const totalPages = Math.ceil(items.length / slidesPerView);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;

    const onSlideChange = () => {
      const currentIndex = Math.ceil(swiperInstance.activeIndex / slidesPerView);
      setActiveIndex(currentIndex);
    };

    swiperInstance?.on('slideChange', onSlideChange);
    return () => swiperInstance?.off('slideChange', onSlideChange);
  }, [slidesPerView]);

  const generatePaginationBullets = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <span
        key={index}
        className={`swiper-pagination-bullet ${activeIndex === index ? 'swiper-pagination-bullet-active' : ''}`}
        role="button"
        aria-label={`Go to page ${index + 1}`}
        tabIndex="0"
        onClick={() => swiperRef.current.swiper.slideTo(index * slidesPerView)}
      ></span>
    ));
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={slidesPerView}
        spaceBetween={15}
        autoplay={{ delay: 2000 }}
        speed={1500}
        lazy={true}
        direction={direction}
        modules={[Pagination]}
        className="tf-sw-mobile"
        pagination={false}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} style={{minWidth:`100${child?'%':'px'}`}}>
            {child === 'banner'?<BannerCard {...item} />:<CategoryCard {...item} isMobile={isMobile}/>}
            
          </SwiperSlide>
        ))}
      </Swiper>

      {(!isDesktop && pagination) && (
        <div className="box-sw-navigation scroller-pagination" ref={paginationRef}>
          <div className="sw-dots style-2 medium sw-pagination-recent justify-content-center swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
            {generatePaginationBullets()}
          </div>
        </div>
      )}
    </>
  );
};

Scroller.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  SlideWidget: PropTypes.elementType.isRequired,
};

export default Scroller;
