import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState, useEffect } from 'react';
import { Pagination } from 'swiper/modules';
import useDeviceType from '@/hooks/useDeviceType';
import PropTypes from 'prop-types';

const Scroller2 = ({ items = [], itemsPerView, pagination =true}) => {
  const { isMobile } = useDeviceType();
  const swiperRef = useRef(null);
  const paginationRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slidesPerView = !isMobile ? 3 : itemsPerView || 1;
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
        modules={[Pagination]}
        className="mySwiper"
        pagination={false}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-slide" key={index}>
                <div className="tf-icon-box text-center">
                <div className="icon">
                    <i className={item.icon}></i>
                </div>
                <div className="content">
                    <div className="title">{item.title}</div>
                    <p className="text_black-2">{item.description}</p>
                </div>
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {pagination && (
        <div className="box-sw-navigation scroller-pagination" ref={paginationRef}>
          <div className="sw-dots style-2 medium sw-pagination-recent justify-content-center swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
            {generatePaginationBullets()}
          </div>
        </div>
      )}
    </>
  );
};

Scroller2.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  SlideWidget: PropTypes.elementType.isRequired,
};

export default Scroller2;
