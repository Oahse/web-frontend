import PropTypes from 'prop-types';

const Section = ({ title = '', items = [] }) => {
  return (
    <section className="flat-spacing-30 flat-control-sw">
      <div className="container">
        {title && <div className="flat-title flex-row justify-content-between px-0">
          <span className="title fw-6 wow fadeInUp" data-wow-delay="0s">{title}</span>
          <div className="box-sw-navigation">
            <div className="sw-dots style-2 medium sw-pagination-recent justify-content-center"></div>
          </div>
        </div>}
        
        <div dir="ltr" className="swiper tf-sw-recent wow fadeInUp" data-preview="6" data-tablet="3" data-mobile="2"
          data-space-lg="30" data-space-md="30" data-space="15" data-pagination="2" data-pagination-md="3"
          data-pagination-lg="3">
          <div className="swiper-wrapper">
            {items.map((item, index) => (
              <div key={index} className="swiper-slide">
                <div className="collection-item-circle has-bg has-bg-2 hover-img">
                  <a href="shop-default.html" className="collection-image img-style">
                    <img className="lazyload" data-src={item.img} alt="collection-img" src={item.img} />
                  </a>
                  <div className="collection-content text-center">
                    <a href="shop-default.html" className="link title fw-5">{item.name}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  )
};

export default Section;
