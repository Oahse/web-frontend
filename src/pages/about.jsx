import { useEffect, useRef, useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import Extras from '@/components/extra';
// Imported images
import banner1 from '@/assets/images/slider/about-banner-01.jpg';
import collection1 from '@/assets/images/collections/collection-69.jpg';
import collection2 from '@/assets/images/collections/collection-71.jpg';
import collection3 from '@/assets/images/collections/collection-70.jpg';
import quote from '@/assets/images/item/quote.svg';
import tets3 from '@/assets/images/item/tets3.jpg';
import tets4 from '@/assets/images/item/tets4.jpg';
import gallery1 from '@/assets/images/shop/gallery/gallery-7.jpg';
import gallery2 from '@/assets/images/shop/gallery/gallery-3.jpg';
import gallery3 from '@/assets/images/shop/gallery/gallery-5.jpg';
import gallery4 from '@/assets/images/shop/gallery/gallery-8.jpg';
import gallery5 from '@/assets/images/shop/gallery/gallery-6.jpg';
import Scroller2 from "@/components/scroller2";
import shirt2 from '@/assets/images/products/light-green-2.jpg';
import shorts1 from '@/assets/images/products/black-1.jpg';
import shorts2 from '@/assets/images/products/black-2.jpg';
import { Link } from 'react-router-dom';

const infoSlides = [
    {
      icon: 'icon-materials',
      title: 'High-Quality Materials',
      description:
        'Crafted with precision and excellence, our activewear is meticulously engineered using premium materials to ensure unmatched comfort and durability.'
    },
    {
      icon: 'icon-design',
      title: 'Laconic Design',
      description:
        'Simplicity refined. Our activewear embodies the essence of minimalistic design, delivering effortless style that speaks volumes.'
    },
    {
      icon: 'icon-sizes',
      title: 'Various Sizes',
      description:
        'Designed for every body and anyone, our activewear embraces diversity with a wide range of sizes and shapes,celebrating the beauty of individuality.'
    }
  ];
const items =[
    {
        id: 101,
        name: "Classic Watch",
        color: "black",
        images: [
            shirt2,
        ],
        price: 150,
        currency: "$",
    },
    {
        id: 102,
        name: "Leather Wallet",
        color: "brown",
        images: [
            shorts1,
        ],
        price: 45,
        currency: "$",
    },
    {
        id: 103,
        name: "Sunglasses",
        color: "black",
        images: [
            shorts2,
        ],
        price: 90,
        currency: "$",
    },
    {
        id: 104,
        name: "Leather Wallet",
        color: "brown",
        images: [
            shorts1,
        ],
        price: 45,
        currency: "$",
    },
    {
        id: 105,
        name: "Sunglasses",
        color: "black",
        images: [
            shorts2,
        ],
        price: 90,
        currency: "$",
    }
            // Add more products as needed
]
const About =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
    const [shopGram, setShopGram] = useState(items || null);
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
    
      if (!shopGram) return null;
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                {/* <!-- Slider --> */}
                <section className="tf-slideshow about-us-page position-relative">
                    <div className="banner-wrapper">
                        <img className="lazyload" src={banner1}
                            data-src={banner1} alt="image-collection"/>
                        <div className="box-content text-center">
                            <div className="container">
                                <div className="text text-white">Empowering women to achieve <br className="d-xl-block d-none"/> fitness
                                    goals with style</div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- /Slider --> */}
                {/* <!-- flat-title --> */}
                <section className="flat-spacing-9">
                    <div className="container">
                        <div className="flat-title my-0">
                            <span className="title">We are Banwe</span>
                            <p className="sub-title text_black-2">
                                Welcome to our classic women's clothing store, where we believe <br className="d-xl-block d-none"/>
                                that timeless style never goes out of fashion. Our collection features classic <br
                                    className="d-xl-block d-none"/>
                                pieces that are both stylish and versatile, perfect for building a <br
                                    className="d-xl-block d-none"/>
                                wardrobe that will last for years.
                            </p>
                        </div>
                    </div>
                </section>
                {/* <!-- /flat-title --> */}
                <div className="container">
                    <div className="line"></div>
                </div>
                {/* <!-- image-text --> */}
                <section className="flat-spacing-23 flat-image-text-section">
                    <div className="container">
                        <div className="tf-grid-layout md-col-2 tf-img-with-text style-4">
                            <div className="tf-image-wrap">
                                <img className="lazyload w-100" data-src={collection1}
                                    src={collection1} alt="collection-img"/>
                            </div>
                            <div className="tf-content-wrap px-0 d-flex justify-content-center w-100">
                                <div>
                                    <div className="heading">Established - 1995</div>
                                    <div className="text">
                                        Banwe was founded in 1995 by Jane Smith, a fashion lover with a <br
                                            className="d-xl-block d-none"/>
                                        passion for timeless style. Jane had always been drawn to classic <br
                                            className="d-xl-block d-none"/>
                                        pieces that could be worn season after season, and she believed that <br
                                            className="d-xl-block d-none"/>
                                        there was a gap in the market for a store that focused solely on classic <br
                                            className="d-xl-block d-none"/>
                                        women's clothing. She opened the first store in a small town in New <br
                                            className="d-xl-block d-none"/>
                                        England, where it quickly became a local favorite.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flat-spacing-15">
                    <div className="container">
                        <div className="tf-grid-layout md-col-2 tf-img-with-text style-4">
                            <div className="tf-content-wrap px-0 d-flex justify-content-center w-100">
                                <div>
                                    <div className="heading">Our mission</div>
                                    <div className="text">
                                        Our mission is to empower people through sustainable fashion. <br
                                            className="d-xl-block d-none"/>
                                        We want everyone to look and feel good, while also doing our part to <br
                                            className="d-xl-block d-none"/>
                                        help the environment.We believe that fashion should be stylish, <br
                                            className="d-xl-block d-none"/>
                                        affordable and accessible to everyone. Body positivity and inclusivity <br
                                            className="d-xl-block d-none"/>
                                        are values that are at the heart of our brand.
                                    </div>
                                </div>
                            </div>
                            <div className="grid-img-group">
                                <div className="tf-image-wrap box-img item-1">
                                    <div className="img-style">
                                        <img className="lazyload" src={collection2}
                                            data-src={collection2} alt="img-slider"/>
                                    </div>
                                </div>
                                <div className="tf-image-wrap box-img item-2">
                                    <div className="img-style">
                                        <img className="lazyload" src={collection3}
                                            data-src={collection3} alt="img-slider"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- /image-text --> */}
                {/* <!-- iconbox --> */}
                <section>
                    <div className="container">
                        <div className="bg_grey-2 radius-10 flat-wrap-iconbox">
                            <div className="flat-title lg">
                                <span className="title fw-5">Quality is our priority</span>
                                <div>
                                    <p className="sub-title text_black-2">Our talented stylists have put together outfits that are
                                        perfect for the season.</p>
                                    <p className="sub-title text_black-2">They've variety of ways to inspire your next
                                        fashion-forward look.</p>
                                </div>
                            </div>
                            <div className="flat-iconbox-v3 lg">
                                <div className="wrap-carousel wrap-mobile">
                                    <Scroller2 items={infoSlides} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- /iconbox --> */}
                {/* <!-- Testimonial --> */}
                <section className="flat-testimonial-v2 flat-spacing-24">
                    <div className="container">
                        <div className="wrapper-thumbs-testimonial-v2 flat-thumbs-testimonial">
                            <div className="box-left">
                                <div dir="ltr" className="swiper tf-sw-tes-2" data-preview="1" data-space-lg="40"
                                    data-space-md="30">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="testimonial-item lg lg-2">
                                                <h4 className="mb_40">Our customer’s reviews</h4>
                                                <div className="icon">
                                                    <img className="lazyload" data-src={quote} alt=""
                                                        src={quote}/>
                                                </div>
                                                <div className="rating">
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                </div>
                                                <p className="text">
                                                    "I have been shopping with this web fashion site for over a year now and I
                                                    can confidently say it is the best online fashion site out there.The
                                                    shipping is always fast and the customer service team is friendly and
                                                    helpful. I highly recommend this site to anyone looking for affordable
                                                    clothing."
                                                </p>
                                                <div className="author box-author">
                                                    <div className="box-img d-md-none rounded-0">
                                                        <img className="lazyload img-product" data-src={tets3}
                                                            src={tets3} alt="image-product"/>
                                                    </div>
                                                    <div className="content">
                                                        <div className="name">Robert smith</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="testimonial-item lg lg-2">
                                                <h4 className="mb_40">Our customer’s reviews</h4>
                                                <div className="icon">
                                                    <img className="lazyload" data-src={quote} alt=""
                                                        src={quote}/>
                                                </div>
                                                <div className="rating">
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                    <i className="icon-star"></i>
                                                </div>
                                                <p className="text">
                                                    "I have been shopping with this web fashion site for over a year now and I
                                                    can confidently say it is the best online fashion site out there.The
                                                    shipping is always fast and the customer service team is friendly and
                                                    helpful. I highly recommend this site to anyone looking for affordable
                                                    clothing."
                                                </p>
                                                <div className="author box-author">
                                                    <div className="box-img d-md-none rounded-0">
                                                        <img className="lazyload img-product" data-src={tets4}
                                                            src={tets4} alt="image-product"/>
                                                    </div>
                                                    <div className="content">
                                                        <div className="name">Jenifer Unix</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-md-flex d-none box-sw-navigation">
                                    <div className="nav-sw nav-next-slider nav-next-tes-2"><span
                                            className="icon icon-arrow-left"></span></div>
                                    <div className="nav-sw nav-prev-slider nav-prev-tes-2"><span
                                            className="icon icon-arrow-right"></span></div>
                                </div>
                                <div className="d-md-none sw-dots style-2 sw-pagination-tes-2"></div>
                            </div>
                            <div className="box-right">
                                <div dir="ltr" className="swiper tf-thumb-tes" data-preview="1" data-space="30">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="img-sw-thumb">
                                                <img className="lazyload img-product" data-src={tets3}
                                                    src={tets3}alt="image-product"/>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="img-sw-thumb">
                                                <img className="lazyload img-product" data-src={tets4}
                                                    src={tets4} alt="image-product"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- /Testimonial --> */}
                <div className="container">
                    <div className="line"></div>
                </div>
                {/* <!-- Shop Gram --> */}
                <section className="flat-spacing-1">
                    <div className="container">
                        <div className="flat-title">
                            <span className="title">Shop Gram</span>
                            <p className="sub-title">Inspire and let yourself be inspired, from one unique fashion to another.</p>
                        </div>
                        <div className="wrap-shop-gram">
                            <div className="scroller-wrapper tf-sw-shop-gallery" data-preview="5" data-tablet="3" data-mobile="2"
                                data-space-lg="7" data-space-md="7" >
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
                                    {shopGram?.map((product, idx) => (
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
                                            <div className="gallery-item hover-img">
                                            <div className="img-style">
                                                <img className="lazyload img-hover" data-src={product?.images[0]}
                                                    src={product?.images[0]} alt="image-gallery"/>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                    ))}
                                </div>
                            </div> 
                        </div>
                    </div>
                </section>
                {/* <!-- /Shop Gram --> */}

                <Footer />
            </div>
            <Extras categories={categories} />
        </div>
    )
}
export default About;