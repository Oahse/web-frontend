import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import BreadCrumbs from '@/components/breadcrumbs';

const ProductDetails = () =>{
    const { isMobile} = useDeviceType();
    const [loading, setLoading] = useState(false);
        return(
            <div  className="preload-wrapper color-primary-8 color-main-text-2" >
                <a href="javascript:void(0);" id="toggle-rtl" className="tf-btn animate-hover-btn btn-fill">RTL</a>
                
                {loading && <Loader />} 
                
                <div id="wrapper">
                    <TopHeader/>
                    <Header/>
                    <BreadCrumbs
                        links={[
                            { name: 'Home', href: '/' },
                            { name: 'Women', href: '/women' },
                            { name: 'Cotton jersey top' }
                        ]}
                        prev={{ href: '/product/prev', tooltip: 'Previous Product' }}
                        next={{ href: '/product/next', tooltip: 'Next Product' }}
                        back={{ href: '/women', tooltip: 'Back to Women' }}
                    />
                    <section className="flat-spacing-4 pt_0">
                        <div className="tf-main-product section-image-zoom">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="tf-product-media-wrap sticky-top">
                                            <div className="thumbs-slider">
                                                <div dir="ltr" className="swiper tf-product-media-thumbs other-image-zoom"
                                                    data-direction="vertical">
                                                    <div className="swiper-wrapper stagger-wrap">
                                                        {/* <!-- beige --> */}
                                                        <div className="swiper-slide stagger-item" data-color="beige">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod31.jpg"
                                                                    src="images/shop/products/hmgoepprod31.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="beige">
                                                            <div className="item">
                                                                <img className="lazyload" data-src="images/shop/products/hmgoepprod.jpg"
                                                                    src="images/shop/products/hmgoepprod.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="beige">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod2.jpg"
                                                                    src="images/shop/products/hmgoepprod2.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="beige">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod3.jpg"
                                                                    src="images/shop/products/hmgoepprod3.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="beige">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod4.jpg"
                                                                    src="images/shop/products/hmgoepprod4.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="beige">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod5.jpg"
                                                                    src="images/shop/products/hmgoepprod5.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        {/* <!-- black --> */}
                                                        <div className="swiper-slide stagger-item" data-color="black">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod6.jpg"
                                                                    src="images/shop/products/hmgoepprod6.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="black">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod7.jpg"
                                                                    src="images/shop/products/hmgoepprod7.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="black">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod8.jpg"
                                                                    src="images/shop/products/hmgoepprod8.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="black">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod9.jpg"
                                                                    src="images/shop/products/hmgoepprod9.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        {/* <!-- blue --> */}
                                                        <div className="swiper-slide stagger-item" data-color="blue">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod10.jpg"
                                                                    src="images/shop/products/hmgoepprod10.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="blue">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod11.jpg"
                                                                    src="images/shop/products/hmgoepprod11.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="blue">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod12.jpg"
                                                                    src="images/shop/products/hmgoepprod12.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="blue">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod13.jpg"
                                                                    src="images/shop/products/hmgoepprod13.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        {/* <!-- white --> */}
                                                        <div className="swiper-slide stagger-item" data-color="white">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod14.jpg"
                                                                    src="images/shop/products/hmgoepprod14.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="white">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod15.jpg"
                                                                    src="images/shop/products/hmgoepprod15.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="white">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod16.jpg"
                                                                    src="images/shop/products/hmgoepprod16.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide stagger-item" data-color="white">
                                                            <div className="item">
                                                                <img className="lazyload"
                                                                    data-src="images/shop/products/hmgoepprod17.jpg"
                                                                    src="images/shop/products/hmgoepprod17.jpg" alt="img-product"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div dir="ltr" className="swiper tf-product-media-main" id="gallery-swiper-started">
                                                    <div className="swiper-wrapper">
                                                        {/* <!-- beige --> */}
                                                        <div className="swiper-slide" data-color="beige">
                                                            <a href="images/shop/products/p-d1.png" target="_blank" className="item"
                                                                data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod31.jpg"
                                                                    data-src="images/shop/products/hmgoepprod31.jpg"
                                                                    src="images/shop/products/hmgoepprod31.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="beige">
                                                            <a href="images/shop/products/hmgoepprod.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod.jpg"
                                                                    data-src="images/shop/products/hmgoepprod.jpg"
                                                                    src="images/shop/products/hmgoepprod.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="beige">
                                                            <a href="images/shop/products/hmgoepprod2.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod2.jpg"
                                                                    data-src="images/shop/products/hmgoepprod2.jpg"
                                                                    src="images/shop/products/hmgoepprod2.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="beige">
                                                            <a href="images/shop/products/hmgoepprod3.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod3.jpg"
                                                                    data-src="images/shop/products/hmgoepprod3.jpg"
                                                                    src="images/shop/products/hmgoepprod3.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="beige">
                                                            <a href="images/shop/products/hmgoepprod4.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod4.jpg"
                                                                    data-src="images/shop/products/hmgoepprod4.jpg"
                                                                    src="images/shop/products/hmgoepprod4.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="beige">
                                                            <a href="images/shop/products/hmgoepprod5.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod5.jpg"
                                                                    data-src="images/shop/products/hmgoepprod5.jpg"
                                                                    src="images/shop/products/hmgoepprod5.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        {/* <!-- black --> */}
                                                        <div className="swiper-slide" data-color="black">
                                                            <a href="images/shop/products/hmgoepprod6.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod6.jpg"
                                                                    data-src="images/shop/products/hmgoepprod6.jpg"
                                                                    src="images/shop/products/hmgoepprod6.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="black">
                                                            <a href="images/shop/products/hmgoepprod7.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod7.jpg"
                                                                    data-src="images/shop/products/hmgoepprod7.jpg"
                                                                    src="images/shop/products/hmgoepprod7.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="black">
                                                            <a href="images/shop/products/hmgoepprod8.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod8.jpg"
                                                                    data-src="images/shop/products/hmgoepprod8.jpg"
                                                                    src="images/shop/products/hmgoepprod8.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="black">
                                                            <a href="images/shop/products/hmgoepprod9.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod9.jpg"
                                                                    data-src="images/shop/products/hmgoepprod9.jpg"
                                                                    src="images/shop/products/hmgoepprod9.jpg" alt=""/>
                                                            </a>
                                                        </div>
                                                        {/* <!-- blue --> */}
                                                        <div className="swiper-slide" data-color="blue">
                                                            <a href="images/shop/products/hmgoepprod10.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod10.jpg"
                                                                    data-src="images/shop/products/hmgoepprod10.jpg"
                                                                    src="images/shop/products/hmgoepprod10.jpg" alt="img-product"/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="blue">
                                                            <a href="images/shop/products/hmgoepprod11.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod11.jpg"
                                                                    data-src="images/shop/products/hmgoepprod11.jpg"
                                                                    src="images/shop/products/hmgoepprod11.jpg" alt="img-product"/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="blue">
                                                            <a href="images/shop/products/hmgoepprod12.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod12.jpg"
                                                                    data-src="images/shop/products/hmgoepprod12.jpg"
                                                                    src="images/shop/products/hmgoepprod12.jpg" alt="img-product"/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="blue">
                                                            <a href="images/shop/products/hmgoepprod13.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod13.jpg"
                                                                    data-src="images/shop/products/hmgoepprod13.jpg"
                                                                    src="images/shop/products/hmgoepprod13.jpg" alt="img-product"/>
                                                            </a>
                                                        </div>
                                                        {/* <!-- white --> */}
                                                        <div className="swiper-slide" data-color="white">
                                                            <a href="images/shop/products/hmgoepprod14.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod14.jpg"
                                                                    data-src="images/shop/products/hmgoepprod14.jpg"
                                                                    src="images/shop/products/hmgoepprod14.jpg" alt="img-product"/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="white">
                                                            <a href="images/shop/products/hmgoepprod15.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod15.jpg"
                                                                    data-src="images/shop/products/hmgoepprod15.jpg"
                                                                    src="images/shop/products/hmgoepprod15.jpg" alt="img-product"/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="white">
                                                            <a href="images/shop/products/hmgoepprod16.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod16.jpg"
                                                                    data-src="images/shop/products/hmgoepprod16.jpg"
                                                                    src="images/shop/products/hmgoepprod16.jpg" alt="img-product"/>
                                                            </a>
                                                        </div>
                                                        <div className="swiper-slide" data-color="white">
                                                            <a href="images/shop/products/hmgoepprod17.jpg" target="_blank"
                                                                className="item" data-pswp-width="770px" data-pswp-height="1075px">
                                                                <img className="tf-image-zoom lazyload"
                                                                    data-zoom="images/shop/products/hmgoepprod17.jpg"
                                                                    data-src="images/shop/products/hmgoepprod17.jpg"
                                                                    src="images/shop/products/hmgoepprod17.jpg" alt="img-product"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="swiper-button-next button-style-arrow thumbs-next"></div>
                                                    <div className="swiper-button-prev button-style-arrow thumbs-prev"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="tf-product-info-wrap position-relative">
                                            <div className="tf-zoom-main"></div>
                                            <div className="tf-product-info-list other-image-zoom">
                                                <div className="tf-product-info-title">
                                                    <h5>Cotton jersey top</h5>
                                                </div>
                                                <div className="tf-product-info-badges">
                                                    <div className="badges">Best seller</div>
                                                    <div className="product-status-content">
                                                        <i className="icon-lightning"></i>
                                                        <p className="fw-6">Selling fast! 56 people have this in their carts.</p>
                                                    </div>
                                                </div>
                                                <div className="tf-product-info-price">
                                                    <div className="price-on-sale">$8.00</div>
                                                    <div className="compare-at-price">$30.00</div>
                                                    <div className="badges-on-sale"><span>20</span>% OFF</div>
                                                </div>
                                                <div className="tf-product-info-liveview">
                                                    <div className="liveview-count">20</div>
                                                    <p className="fw-6">People are viewing this right now</p>
                                                </div>
                                                <div className="tf-product-info-countdown">
                                                    <div className="countdown-wrap">
                                                        <div className="countdown-title">
                                                            <i className="icon-time tf-ani-tada"></i>
                                                            <p>HURRY UP! SALE ENDS IN:</p>
                                                        </div>
                                                        <div className="tf-countdown style-1">
                                                            <div className="js-countdown" data-timer="1007500"
                                                                data-labels="Days :,Hours :,Mins :,Secs"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tf-product-info-variant-picker">
                                                    <div className="variant-picker-item">
                                                        <div className="variant-picker-label">
                                                            Color: <span
                                                                className="fw-6 variant-picker-label-value value-currentColor">Beige</span>
                                                        </div>
                                                        <div className="variant-picker-values">
                                                            <input id="values-beige" type="radio" name="color1" checked/>
                                                            <label className="hover-tooltip radius-60 color-btn" for="values-beige"
                                                                data-color="beige" data-value="Beige">
                                                                <span className="btn-checkbox bg-color-beige"></span>
                                                                <span className="tooltip">Beige</span>
                                                            </label>
                                                            <input id="values-black" type="radio" name="color1"/>
                                                            <label className=" hover-tooltip radius-60 color-btn" data-price="9"
                                                                for="values-black" data-color="black" data-value="Black">
                                                                <span className="btn-checkbox bg-color-black"></span>
                                                                <span className="tooltip">Black</span>
                                                            </label>
                                                            <input id="values-blue" type="radio" name="color1"/>
                                                            <label className="hover-tooltip radius-60 color-btn" data-price="10"
                                                                for="values-blue" data-color="blue" data-value="Blue">
                                                                <span className="btn-checkbox bg-color-blue"></span>
                                                                <span className="tooltip">Blue</span>
                                                            </label>
                                                            <input id="values-white" type="radio" name="color1"/>
                                                            <label className="hover-tooltip radius-60 color-btn" data-price="12"
                                                                for="values-white" data-color="white" data-value="White">
                                                                <span className="btn-checkbox bg-color-white"></span>
                                                                <span className="tooltip">White</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="variant-picker-item">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="variant-picker-label">
                                                                Size: <span className="fw-6 variant-picker-label-value">S</span>
                                                            </div>
                                                            <a href="#find_size" data-bs-toggle="modal" className="find-size fw-6">Find
                                                                your size</a>
                                                        </div>
                                                        <div className="variant-picker-values">
                                                            <input type="radio" name="size1" id="values-s" checked/>
                                                            <label className="style-text size-btn" for="values-s" data-value="S">
                                                                <p>S</p>
                                                            </label>
                                                            <input type="radio" name="size1" id="values-m"/>
                                                            <label className="style-text size-btn" data-price="9" for="values-m"
                                                                data-value="M">
                                                                <P>M</P>
                                                            </label>
                                                            <input type="radio" name="size1" id="values-l"/>
                                                            <label className="style-text size-btn" data-price="10" for="values-l"
                                                                data-value="L">
                                                                <p>L</p>
                                                            </label>
                                                            <input type="radio" name="size1" id="values-xl"/>
                                                            <label className="style-text size-btn" data-price="12" for="values-xl"
                                                                data-value="XL">
                                                                <p>XL</p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tf-product-info-quantity">
                                                    <div className="quantity-title fw-6">Quantity</div>
                                                    <div className="wg-quantity">
                                                        <span className="btn-quantity btn-decrease">-</span>
                                                        <input type="text" className="quantity-product" name="number" value="1"/>
                                                        <span className="btn-quantity btn-increase">+</span>
                                                    </div>
                                                </div>
                                                <div className="tf-product-info-buy-button">
                                                    <form className="">
                                                        <a href="javascript:void(0);"
                                                            className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn btn-add-to-cart"><span>Add
                                                                to cart -&nbsp;</span><span
                                                                className="tf-qty-price total-price">$8.00</span></a>
                                                        <a href="javascript:void(0);"
                                                            className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="tf-product-btn-wishlist hover-tooltip box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <div className="w-100">
                                                            <a href="#" className="btns-full">Buy with <img
                                                                    src="images/payments/paypal.png" alt=""/></a>
                                                            <a href="#" className="payment-more-option">More payment options</a>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="tf-product-info-extra-link">
                                                    <a href="#compare_color" data-bs-toggle="modal" className="tf-product-extra-icon">
                                                        <div className="icon">
                                                            <img src="images/item/compare.svg" alt=""/>
                                                        </div>
                                                        <div className="text fw-6">Compare color</div>
                                                    </a>
                                                    <a href="#ask_question" data-bs-toggle="modal" className="tf-product-extra-icon">
                                                        <div className="icon">
                                                            <i className="icon-question"></i>
                                                        </div>
                                                        <div className="text fw-6">Ask a question</div>
                                                    </a>
                                                    <a href="#delivery_return" data-bs-toggle="modal" className="tf-product-extra-icon">
                                                        <div className="icon">
                                                            <svg className="d-inline-block" xmlns="http://www.w3.org/2000/svg"
                                                                width="22" height="18" viewBox="0 0 22 18" fill="currentColor">
                                                                <path
                                                                    d="M21.7872 10.4724C21.7872 9.73685 21.5432 9.00864 21.1002 8.4217L18.7221 5.27043C18.2421 4.63481 17.4804 4.25532 16.684 4.25532H14.9787V2.54885C14.9787 1.14111 13.8334 0 12.4255 0H9.95745V1.69779H12.4255C12.8948 1.69779 13.2766 2.07962 13.2766 2.54885V14.5957H8.15145C7.80021 13.6052 6.85421 12.8936 5.74468 12.8936C4.63515 12.8936 3.68915 13.6052 3.33792 14.5957H2.55319C2.08396 14.5957 1.70213 14.2139 1.70213 13.7447V2.54885C1.70213 2.07962 2.08396 1.69779 2.55319 1.69779H9.95745V0H2.55319C1.14528 0 0 1.14111 0 2.54885V13.7447C0 15.1526 1.14528 16.2979 2.55319 16.2979H3.33792C3.68915 17.2884 4.63515 18 5.74468 18C6.85421 18 7.80021 17.2884 8.15145 16.2979H13.423C13.7742 17.2884 14.7202 18 15.8297 18C16.9393 18 17.8853 17.2884 18.2365 16.2979H21.7872V10.4724ZM16.684 5.95745C16.9494 5.95745 17.2034 6.08396 17.3634 6.29574L19.5166 9.14894H14.9787V5.95745H16.684ZM5.74468 16.2979C5.27545 16.2979 4.89362 15.916 4.89362 15.4468C4.89362 14.9776 5.27545 14.5957 5.74468 14.5957C6.21392 14.5957 6.59575 14.9776 6.59575 15.4468C6.59575 15.916 6.21392 16.2979 5.74468 16.2979ZM15.8298 16.2979C15.3606 16.2979 14.9787 15.916 14.9787 15.4468C14.9787 14.9776 15.3606 14.5957 15.8298 14.5957C16.299 14.5957 16.6809 14.9776 16.6809 15.4468C16.6809 15.916 16.299 16.2979 15.8298 16.2979ZM18.2366 14.5957C17.8853 13.6052 16.9393 12.8936 15.8298 12.8936C15.5398 12.8935 15.252 12.943 14.9787 13.04V10.8511H20.0851V14.5957H18.2366Z">
                                                                </path>
                                                            </svg>
                                                        </div>
                                                        <div className="text fw-6">Delivery & Return</div>
                                                    </a>
                                                    <a href="#share_social" data-bs-toggle="modal" className="tf-product-extra-icon">
                                                        <div className="icon">
                                                            <i className="icon-share"></i>
                                                        </div>
                                                        <div className="text fw-6">Share</div>
                                                    </a>
                                                </div>
                                                <div className="tf-product-info-delivery-return">
                                                    <div className="row">
                                                        <div className="col-xl-6 col-12">
                                                            <div className="tf-product-delivery">
                                                                <div className="icon">
                                                                    <i className="icon-delivery-time"></i>
                                                                </div>
                                                                <p>Estimate delivery times: <span className="fw-7">12-26 days</span>
                                                                    (International), <span className="fw-7">3-6 days</span> (United
                                                                    States).</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-12">
                                                            <div className="tf-product-delivery mb-0">
                                                                <div className="icon">
                                                                    <i className="icon-return-order"></i>
                                                                </div>
                                                                <p>Return within <span className="fw-7">30 days</span> of purchase.
                                                                    Duties & taxes are non-refundable.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tf-product-info-trust-seal">
                                                    <div className="tf-product-trust-mess">
                                                        <i className="icon-safe"></i>
                                                        <p className="fw-6">Guarantee Safe <br/> Checkout</p>
                                                    </div>
                                                    <div className="tf-payment">
                                                        <img src="images/payments/visa.png" alt=""/>
                                                        <img src="images/payments/img-1.png" alt=""/>
                                                        <img src="images/payments/img-2.png" alt=""/>
                                                        <img src="images/payments/img-3.png" alt=""/>
                                                        <img src="images/payments/img-4.png" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tf-sticky-btn-atc">
                            <div className="container">
                                <div className="tf-height-observer w-100 d-flex align-items-center">
                                    <div className="tf-sticky-atc-product d-flex align-items-center">
                                        <div className="tf-sticky-atc-img">
                                            <img className="lazyloaded" data-src="images/shop/products/p-d1.png" alt=""
                                                src="images/shop/products/p-d1.png"/>
                                        </div>
                                        <div className="tf-sticky-atc-title fw-5 d-xl-block d-none">Cotton jersey top</div>
                                    </div>
                                    <div className="tf-sticky-atc-infos">
                                        <form className="">
                                            <div className="tf-sticky-atc-variant-price text-center">
                                                <select className="tf-select">
                                                    <option selected="selected">Beige / S - $8.00</option>
                                                    <option>Beige / M - $8.00</option>
                                                    <option>Beige / L - $8.00</option>
                                                    <option>Beige / XL - $8.00</option>
                                                    <option>Black / S - $8.00</option>
                                                    <option>Black / M - $8.00</option>
                                                    <option>Black / L - $8.00</option>
                                                    <option>Black / XL - $8.00</option>
                                                    <option>Blue / S - $8.00</option>
                                                    <option>Blue / M - $8.00</option>
                                                    <option>Blue / L - $8.00</option>
                                                    <option>Blue / XL - $8.00</option>
                                                    <option>White / S - $8.00</option>
                                                    <option>White / M - $8.00</option>
                                                    <option>White / L - $8.00</option>
                                                    <option>White / XL - $8.00</option>
                                                </select>
                                            </div>
                                            <div className="tf-sticky-atc-btns">
                                                <div className="tf-product-info-quantity">
                                                    <div className="wg-quantity">
                                                        <span className="btn-quantity minus-btn">-</span>
                                                        <input type="text" name="number" value="1"/>
                                                        <span className="btn-quantity plus-btn">+</span>
                                                    </div>
                                                </div>
                                                <a href="javascript:void(0);"
                                                    className="tf-btn btn-fill radius-3 justify-content-center fw-6 fs-14 flex-grow-1 animate-hover-btn btn-add-to-cart">
                                                        <span>Add</span>
                                                        to cart</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flat-spacing-17 pt_0">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="widget-tabs style-has-border">
                                        <ul className="widget-menu-tab">
                                            <li className="item-title active">
                                                <span className="inner">Description</span>
                                            </li>
                                            <li className="item-title">
                                                <span className="inner">Additional Information</span>
                                            </li>
                                            <li className="item-title">
                                                <span className="inner">Review</span>
                                            </li>
                                            <li className="item-title">
                                                <span className="inner">Shipping</span>
                                            </li>
                                            <li className="item-title">
                                                <span className="inner">Return Policies</span>
                                            </li>
                                        </ul>
                                        <div className="widget-content-tab">
                                            <div className="widget-content-inner active">
                                                <div className="">
                                                    <p className="mb_30">
                                                        Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey,
                                                        crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose —
                                                        responsibly
                                                        sourced wood-based
                                                        fibres produced through a process that reduces impact on forests,
                                                        biodiversity and
                                                        water supply.
                                                    </p>
                                                    <div className="tf-product-des-demo">
                                                        <div className="right">
                                                            <h3 className="fs-16 fw-5">Features</h3>
                                                            <ul>
                                                                <li>Front button placket</li>
                                                                <li> Adjustable sleeve tabs</li>
                                                                <li>Babaton embroidered crest at placket and hem</li>
                                                            </ul>
                                                            <h3 className="fs-16 fw-5">Materials Care</h3>
                                                            <ul className="mb-0">
                                                                <li>Content: 100% LENZING™ ECOVERO™ Viscose</li>
                                                                <li>Care: Hand wash</li>
                                                                <li>Imported</li>
                                                            </ul>
                                                        </div>
                                                        <div className="left">
                                                            <h3 className="fs-16 fw-5">Materials Care</h3>
                                                            <div className="d-flex gap-10 mb_15 align-items-center">
                                                                <div className="icon">
                                                                    <i className="icon-machine"></i>
                                                                </div>
                                                                <span>Machine wash max. 30ºC. Short spin.</span>
                                                            </div>
                                                            <div className="d-flex gap-10 mb_15 align-items-center">
                                                                <div className="icon">
                                                                    <i className="icon-iron"></i>
                                                                </div>
                                                                <span>Iron maximum 110ºC.</span>
                                                            </div>
                                                            <div className="d-flex gap-10 mb_15 align-items-center">
                                                                <div className="icon">
                                                                    <i className="icon-bleach"></i>
                                                                </div>
                                                                <span>Do not bleach/bleach.</span>
                                                            </div>
                                                            <div className="d-flex gap-10 mb_15 align-items-center">
                                                                <div className="icon">
                                                                    <i className="icon-dry-clean"></i>
                                                                </div>
                                                                <span>Do not dry clean.</span>
                                                            </div>
                                                            <div className="d-flex gap-10 align-items-center">
                                                                <div className="icon">
                                                                    <i className="icon-tumble-dry"></i>
                                                                </div>
                                                                <span>Tumble dry, medium hear.</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-content-inner">
                                                <table className="tf-pr-attrs">
                                                    <tbody>
                                                        <tr className="tf-attr-pa-color">
                                                            <th className="tf-attr-label">Color</th>
                                                            <td className="tf-attr-value">
                                                                <p>White, Pink, Black</p>
                                                            </td>
                                                        </tr>
                                                        <tr className="tf-attr-pa-size">
                                                            <th className="tf-attr-label">Size</th>
                                                            <td className="tf-attr-value">
                                                                <p>S, M, L, XL</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="widget-content-inner">
                                                <div className="tab-reviews write-cancel-review-wrap">
                                                    <div className="tab-reviews-heading">
                                                        <div className="top">
                                                            <div className="text-center">
                                                                <h1 className="number fw-6">4.8</h1>
                                                                <div className="list-star">
                                                                    <i className="icon icon-star"></i>
                                                                    <i className="icon icon-star"></i>
                                                                    <i className="icon icon-star"></i>
                                                                    <i className="icon icon-star"></i>
                                                                    <i className="icon icon-star"></i>
                                                                </div>
                                                                <p>(168 Ratings)</p>
                                                            </div>
                                                            <div className="rating-score">
                                                                <div className="item">
                                                                    <div className="number-1 text-caption-1">5</div>
                                                                    <i className="icon icon-star"></i>
                                                                    <div className="line-bg">
                                                                        <div style="width: 94.67%;"></div>
                                                                    </div>
                                                                    <div className="number-2 text-caption-1">59</div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="number-1 text-caption-1">4</div>
                                                                    <i className="icon icon-star"></i>
                                                                    <div className="line-bg">
                                                                        <div style="width: 60%;"></div>
                                                                    </div>
                                                                    <div className="number-2 text-caption-1">46</div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="number-1 text-caption-1">3</div>
                                                                    <i className="icon icon-star"></i>
                                                                    <div className="line-bg">
                                                                        <div style="width: 0%;"></div>
                                                                    </div>
                                                                    <div className="number-2 text-caption-1">0</div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="number-1 text-caption-1">2</div>
                                                                    <i className="icon icon-star"></i>
                                                                    <div className="line-bg">
                                                                        <div style="width: 0%;"></div>
                                                                    </div>
                                                                    <div className="number-2 text-caption-1">0</div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="number-1 text-caption-1">1</div>
                                                                    <i className="icon icon-star"></i>
                                                                    <div className="line-bg">
                                                                        <div style="width: 0%;"></div>
                                                                    </div>
                                                                    <div className="number-2 text-caption-1">0</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div
                                                                className="tf-btn btn-outline-dark fw-6 btn-comment-review btn-cancel-review">
                                                                Cancel Review</div>
                                                            <div
                                                                className="tf-btn btn-outline-dark fw-6 btn-comment-review btn-write-review">
                                                                Write a review</div>
                                                        </div>
                                                    </div>
                                                    <div className="reply-comment cancel-review-wrap">
                                                        <div
                                                            className="d-flex mb_24 gap-20 align-items-center justify-content-between flex-wrap">
                                                            <h5 className="">03 Comments</h5>
                                                            <div className="d-flex align-items-center gap-12">
                                                                <div className="text-caption-1">Sort by:</div>
                                                                <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                                                                    <div className="btn-select">
                                                                        <span className="text-sort-value">Most Recent</span>
                                                                        <span className="icon icon-arrow-down"></span>
                                                                    </div>
                                                                    <div className="dropdown-menu">
                                                                        <div className="select-item active">
                                                                            <span className="text-value-item">Most Recent</span>
                                                                        </div>
                                                                        <div className="select-item">
                                                                            <span className="text-value-item">Oldest</span>
                                                                        </div>
                                                                        <div className="select-item">
                                                                            <span className="text-value-item">Most Popular</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="reply-comment-wrap">
                                                            <div className="reply-comment-item">
                                                                <div className="user">
                                                                    <div className="image">
                                                                        <img src="images/collections/collection-circle-9.jpg"
                                                                            alt=""/>
                                                                    </div>
                                                                    <div>
                                                                        <h6>
                                                                            <a href="#" className="link">Superb quality apparel that
                                                                                exceeds expectations</a>
                                                                        </h6>
                                                                        <div className="day text_black-2">1 days ago</div>
                                                                    </div>
                                                                </div>
                                                                <p className="text_black-2">Great theme - we were looking for a theme
                                                                    with lots of built in features and flexibility and this was
                                                                    perfect. We expected to need to employ a developer to add a few
                                                                    finishing touches. But we actually managed to do everything
                                                                    ourselves. We did have one small query and the support given was
                                                                    swift and helpful.</p>
                                                            </div>
                                                            <div className="reply-comment-item type-reply">
                                                                <div className="user">
                                                                    <div className="image">
                                                                        <img src="images/collections/collection-circle-10.jpg"
                                                                            alt=""/>
                                                                    </div>
                                                                    <div>
                                                                        <h6>
                                                                            <a href="#" className="link">Reply from Modave</a>
                                                                        </h6>
                                                                        <div className="day text_black-2">1 days ago</div>
                                                                    </div>
                                                                </div>
                                                                <p className="text_black-2">We love to hear it! Part of what we love
                                                                    most about Modave is how much it empowers store owners like
                                                                    yourself to build a beautiful website without having to hire a
                                                                    developer :) Thank you for this fantastic review!</p>
                                                            </div>
                                                            <div className="reply-comment-item">
                                                                <div className="user">
                                                                    <div className="image">
                                                                        <img src="images/collections/collection-circle-9.jpg"
                                                                            alt=""/>
                                                                    </div>
                                                                    <div>
                                                                        <h6>
                                                                            <a href="#" className="link">Superb quality apparel that
                                                                                exceeds expectations</a>
                                                                        </h6>
                                                                        <div className="day text_black-2">1 days ago </div>
                                                                    </div>
                                                                </div>
                                                                <p className="text_black-2">Great theme - we were looking for a theme
                                                                    with lots of built in features and flexibility and this was
                                                                    perfect. We expected to need to employ a developer to add a few
                                                                    finishing touches. But we actually managed to do everything
                                                                    ourselves. We did have one small query and the support given was
                                                                    swift and helpful.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <form className="form-write-review write-review-wrap">
                                                        <div className="heading">
                                                            <h5>Write a review:</h5>
                                                            <div className="list-rating-check">
                                                                <input type="radio" id="star5" name="rate" value="5" />
                                                                <label for="star5" title="text"></label>
                                                                <input type="radio" id="star4" name="rate" value="4" />
                                                                <label for="star4" title="text"></label>
                                                                <input type="radio" id="star3" name="rate" value="3" />
                                                                <label for="star3" title="text"></label>
                                                                <input type="radio" id="star2" name="rate" value="2" />
                                                                <label for="star2" title="text"></label>
                                                                <input type="radio" id="star1" name="rate" value="1" />
                                                                <label for="star1" title="text"></label>
                                                            </div>
                                                        </div>
                                                        <div className="form-content">
                                                            <fieldset className="box-field">
                                                                <label className="label">Review Title</label>
                                                                <input type="text" placeholder="Give your review a title"
                                                                    name="text" tabindex="2" value="" aria-required="true"
                                                                    required=""/>
                                                            </fieldset>
                                                            <fieldset className="box-field">
                                                                <label className="label">Review</label>
                                                                <textarea rows="4" placeholder="Write your comment here"
                                                                    tabindex="2" aria-required="true" required=""></textarea>
                                                            </fieldset>
                                                            <div className="box-field group-2">
                                                                <fieldset>
                                                                    <input type="text" placeholder="You Name (Public)" name="text"
                                                                        tabindex="2" value="" aria-required="true" required=""/>
                                                                </fieldset>
                                                                <fieldset>
                                                                    <input type="email" placeholder="Your email (private)"
                                                                        name="email" tabindex="2" value="" aria-required="true"
                                                                        required=""/>
                                                                </fieldset>
                                                            </div>
                                                            <div className="box-check">
                                                                <input type="checkbox" name="availability" className="tf-check"
                                                                    id="check1"/>
                                                                <label className="text_black-2" for="check1">Save my name, email, and
                                                                    website in this browser for the next time I comment.</label>
                                                            </div>
                                                        </div>
                                                        <div className="button-submit">
                                                            <button className="tf-btn btn-fill animate-hover-btn" type="submit">Submit
                                                                Reviews</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="widget-content-inner">
                                                <div className="tf-page-privacy-policy">
                                                    <div className="title">The Company Private Limited Policy</div>
                                                    <p>The Company Private Limited and each of their respective subsidiary, parent
                                                        and affiliated companies is deemed to operate this Website (“we” or “us”)
                                                        recognizes that you care how information about you is used and shared. We
                                                        have created this Privacy Policy to inform you what information we collect
                                                        on the Website, how we use your information and the choices you have about
                                                        the way your information is collected and used. Please read this Privacy
                                                        Policy carefully. Your use of the Website indicates that you have read and
                                                        accepted our privacy practices, as outlined in this Privacy Policy.</p>
                                                    <p>Please be advised that the practices described in this Privacy Policy apply
                                                        to information gathered by us or our subsidiaries, affiliates or agents: (i)
                                                        through this Website, (ii) where applicable, through our Customer Service
                                                        Department in connection with this Website, (iii) through information
                                                        provided to us in our free standing retail stores, and (iv) through
                                                        information provided to us in conjunction with marketing promotions and
                                                        sweepstakes.</p>
                                                    <p>We are not responsible for the content or privacy practices on any websites.
                                                    </p>
                                                    <p>We reserve the right, in our sole discretion, to modify, update, add to,
                                                        discontinue, remove or otherwise change any portion of this Privacy Policy,
                                                        in whole or in part, at any time. When we amend this Privacy Policy, we will
                                                        revise the “last updated” date located at the top of this Privacy Policy.
                                                    </p>
                                                    <p>If you provide information to us or access or use the Website in any way
                                                        after this Privacy Policy has been changed, you will be deemed to have
                                                        unconditionally consented and agreed to such changes. The most current
                                                        version of this Privacy Policy will be available on the Website and will
                                                        supersede all previous versions of this Privacy Policy.</p>
                                                    <p>If you have any questions regarding this Privacy Policy, you should contact
                                                        our Customer Service Department by email at marketing@company.com</p>
                                                </div>
                                            </div>
                                            <div className="widget-content-inner">
                                                <ul className="d-flex justify-content-center mb_18">
                                                    <li className="">
                                                        <svg viewBox="0 0 40 40" width="35px" height="35px" color="#222"
                                                            margin="5px">
                                                            <path fill="currentColor"
                                                                d="M8.7 30.7h22.7c.3 0 .6-.2.7-.6l4-25.3c-.1-.4-.3-.7-.7-.8s-.7.2-.8.6L34 8.9l-3-1.1c-2.4-.9-5.1-.5-7.2 1-2.3 1.6-5.3 1.6-7.6 0-2.1-1.5-4.8-1.9-7.2-1L6 8.9l-.7-4.3c0-.4-.4-.7-.7-.6-.4.1-.6.4-.6.8l4 25.3c.1.3.3.6.7.6zm.8-21.6c2-.7 4.2-.4 6 .8 1.4 1 3 1.5 4.6 1.5s3.2-.5 4.6-1.5c1.7-1.2 4-1.6 6-.8l3.3 1.2-3 19.1H9.2l-3-19.1 3.3-1.2zM32 32H8c-.4 0-.7.3-.7.7s.3.7.7.7h24c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zm0 2.7H8c-.4 0-.7.3-.7.7s.3.6.7.6h24c.4 0 .7-.3.7-.7s-.3-.6-.7-.6zm-17.9-8.9c-1 0-1.8-.3-2.4-.6l.1-2.1c.6.4 1.4.6 2 .6.8 0 1.2-.4 1.2-1.3s-.4-1.3-1.3-1.3h-1.3l.2-1.9h1.1c.6 0 1-.3 1-1.3 0-.8-.4-1.2-1.1-1.2s-1.2.2-1.9.4l-.2-1.9c.7-.4 1.5-.6 2.3-.6 2 0 3 1.3 3 2.9 0 1.2-.4 1.9-1.1 2.3 1 .4 1.3 1.4 1.3 2.5.3 1.8-.6 3.5-2.9 3.5zm4-5.5c0-3.9 1.2-5.5 3.2-5.5s3.2 1.6 3.2 5.5-1.2 5.5-3.2 5.5-3.2-1.6-3.2-5.5zm4.1 0c0-2-.1-3.5-.9-3.5s-1 1.5-1 3.5.1 3.5 1 3.5c.8 0 .9-1.5.9-3.5zm4.5-1.4c-.9 0-1.5-.8-1.5-2.1s.6-2.1 1.5-2.1 1.5.8 1.5 2.1-.5 2.1-1.5 2.1zm0-.8c.4 0 .7-.5.7-1.2s-.2-1.2-.7-1.2-.7.5-.7 1.2.3 1.2.7 1.2z">
                                                            </path>
                                                        </svg>
                                                    </li>
                                                    <li className="">
                                                        <svg viewBox="0 0 40 40" width="35px" height="35px" color="#222"
                                                            margin="5px">
                                                            <path fill="currentColor"
                                                                d="M36.7 31.1l-2.8-1.3-4.7-9.1 7.5-3.5c.4-.2.6-.6.4-1s-.6-.5-1-.4l-7.5 3.5-7.8-15c-.3-.5-1.1-.5-1.4 0l-7.8 15L4 15.9c-.4-.2-.8 0-1 .4s0 .8.4 1l7.5 3.5-4.7 9.1-2.8 1.3c-.4.2-.6.6-.4 1 .1.3.4.4.7.4.1 0 .2 0 .3-.1l1-.4-1.5 2.8c-.1.2-.1.5 0 .8.1.2.4.3.7.3h31.7c.3 0 .5-.1.7-.4.1-.2.1-.5 0-.8L35.1 32l1 .4c.1 0 .2.1.3.1.3 0 .6-.2.7-.4.1-.3 0-.8-.4-1zm-5.1-2.3l-9.8-4.6 6-2.8 3.8 7.4zM20 6.4L27.1 20 20 23.3 12.9 20 20 6.4zm-7.8 15l6 2.8-9.8 4.6 3.8-7.4zm22.4 13.1H5.4L7.2 31 20 25l12.8 6 1.8 3.5z">
                                                            </path>
                                                        </svg>
                                                    </li>
                                                    <li className="">
                                                        <svg viewBox="0 0 40 40" width="35px" height="35px" color="#222"
                                                            margin="5px">
                                                            <path fill="currentColor"
                                                                d="M5.9 5.9v28.2h28.2V5.9H5.9zM19.1 20l-8.3 8.3c-2-2.2-3.2-5.1-3.2-8.3s1.2-6.1 3.2-8.3l8.3 8.3zm-7.4-9.3c2.2-2 5.1-3.2 8.3-3.2s6.1 1.2 8.3 3.2L20 19.1l-8.3-8.4zM20 20.9l8.3 8.3c-2.2 2-5.1 3.2-8.3 3.2s-6.1-1.2-8.3-3.2l8.3-8.3zm.9-.9l8.3-8.3c2 2.2 3.2 5.1 3.2 8.3s-1.2 6.1-3.2 8.3L20.9 20zm8.4-10.2c-1.2-1.1-2.6-2-4.1-2.6h6.6l-2.5 2.6zm-18.6 0L8.2 7.2h6.6c-1.5.6-2.9 1.5-4.1 2.6zm-.9.9c-1.1 1.2-2 2.6-2.6 4.1V8.2l2.6 2.5zM7.2 25.2c.6 1.5 1.5 2.9 2.6 4.1l-2.6 2.6v-6.7zm3.5 5c1.2 1.1 2.6 2 4.1 2.6H8.2l2.5-2.6zm18.6 0l2.6 2.6h-6.6c1.4-.6 2.8-1.5 4-2.6zm.9-.9c1.1-1.2 2-2.6 2.6-4.1v6.6l-2.6-2.5zm2.6-14.5c-.6-1.5-1.5-2.9-2.6-4.1l2.6-2.6v6.7z">
                                                            </path>
                                                        </svg>
                                                    </li>
                                                    <li className="">
                                                        <svg viewBox="0 0 40 40" width="35px" height="35px" color="#222"
                                                            margin="5px">
                                                            <path fill="currentColor"
                                                                d="M35.1 33.6L33.2 6.2c0-.4-.3-.7-.7-.7H13.9c-.4 0-.7.3-.7.7s.3.7.7.7h18l.7 10.5H20.8c-8.8.2-15.9 7.5-15.9 16.4 0 .4.3.7.7.7h28.9c.2 0 .4-.1.5-.2s.2-.3.2-.5v-.2h-.1zm-28.8-.5C6.7 25.3 13 19 20.8 18.9h11.9l1 14.2H6.3zm11.2-6.8c0 1.2-1 2.1-2.1 2.1s-2.1-1-2.1-2.1 1-2.1 2.1-2.1 2.1 1 2.1 2.1zm6.3 0c0 1.2-1 2.1-2.1 2.1-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1z">
                                                            </path>
                                                        </svg>
                                                    </li>
                                                    <li className="">
                                                        <svg viewBox="0 0 40 40" width="35px" height="35px" color="#222"
                                                            margin="5px">
                                                            <path fill="currentColor"
                                                                d="M20 33.8c7.6 0 13.8-6.2 13.8-13.8S27.6 6.2 20 6.2 6.2 12.4 6.2 20 12.4 33.8 20 33.8zm0-26.3c6.9 0 12.5 5.6 12.5 12.5S26.9 32.5 20 32.5 7.5 26.9 7.5 20 13.1 7.5 20 7.5zm-.4 15h.5c1.8 0 3-1.1 3-3.7 0-2.2-1.1-3.6-3.1-3.6h-2.6v10.6h2.2v-3.3zm0-5.2h.4c.6 0 .9.5.9 1.7 0 1.1-.3 1.7-.9 1.7h-.4v-3.4z">
                                                            </path>
                                                        </svg>
                                                    </li>
                                                    <li className="">
                                                        <svg viewBox="0 0 40 40" width="35px" height="35px" color="#222"
                                                            margin="5px">
                                                            <path fill="currentColor"
                                                                d="M30.2 29.3c2.2-2.5 3.6-5.7 3.6-9.3s-1.4-6.8-3.6-9.3l3.6-3.6c.3-.3.3-.7 0-.9-.3-.3-.7-.3-.9 0l-3.6 3.6c-2.5-2.2-5.7-3.6-9.3-3.6s-6.8 1.4-9.3 3.6L7.1 6.2c-.3-.3-.7-.3-.9 0-.3.3-.3.7 0 .9l3.6 3.6c-2.2 2.5-3.6 5.7-3.6 9.3s1.4 6.8 3.6 9.3l-3.6 3.6c-.3.3-.3.7 0 .9.1.1.3.2.5.2s.3-.1.5-.2l3.6-3.6c2.5 2.2 5.7 3.6 9.3 3.6s6.8-1.4 9.3-3.6l3.6 3.6c.1.1.3.2.5.2s.3-.1.5-.2c.3-.3.3-.7 0-.9l-3.8-3.6z">
                                                            </path>
                                                        </svg>
                                                    </li>
                                                    <li className="">
                                                        <svg viewBox="0 0 40 40" width="35px" height="35px" color="#222"
                                                            margin="5px">
                                                            <path fill="currentColor"
                                                                d="M34.1 34.1H5.9V5.9h28.2v28.2zM7.2 32.8h25.6V7.2H7.2v25.6zm13.5-18.3a.68.68 0 0 0-.7-.7.68.68 0 0 0-.7.7v10.9a.68.68 0 0 0 .7.7.68.68 0 0 0 .7-.7V14.5z">
                                                            </path>
                                                        </svg>
                                                    </li>
                                                </ul>
                                                <p className="text-center text-paragraph">LT01: 70% wool, 15% polyester, 10% polyamide,
                                                    5% acrylic 900 Grms/mt</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flat-spacing-1 pt_0">
                        <div className="container">
                            <div className="flat-title">
                                <span className="title">People Also Bought</span>
                            </div>
                            <div className="hover-sw-nav hover-sw-2">
                                <div dir="ltr" className="swiper tf-sw-product-sell wrap-sw-over" data-preview="4" data-tablet="3"
                                    data-mobile="2" data-space-lg="30" data-space-md="15" data-pagination="2" data-pagination-md="3"
                                    data-pagination-lg="3">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/orange-1.jpg"
                                                            src="images/products/orange-1.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/white-1.jpg"
                                                            src="images/products/white-1.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                    <div className="size-list">
                                                        <span>S</span>
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">Ribbed Tank Top</a>
                                                    <span className="price">$16.95</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">Orange</span>
                                                            <span className="swatch-value bg_orange-3"></span>
                                                            <img className="lazyload" data-src="images/products/orange-1.jpg"
                                                                src="images/products/orange-1.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Black</span>
                                                            <span className="swatch-value bg_dark"></span>
                                                            <img className="lazyload" data-src="images/products/black-1.jpg"
                                                                src="images/products/black-1.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">White</span>
                                                            <span className="swatch-value bg_white"></span>
                                                            <img className="lazyload" data-src="images/products/white-1.jpg"
                                                                src="images/products/white-1.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/brown.jpg"
                                                            src="images/products/brown.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/purple.jpg"
                                                            src="images/products/purple.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                    <div className="size-list">
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                    <div className="on-sale-wrap">
                                                        <div className="on-sale-item">-33%</div>
                                                    </div>
                                                    <div className="countdown-box">
                                                        <div className="js-countdown" data-timer="1007500" data-labels="d :,h :,m :,s">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">Ribbed modal T-shirt</a>
                                                    <span className="price">From $18.95</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">Brown</span>
                                                            <span className="swatch-value bg_brown"></span>
                                                            <img className="lazyload" data-src="images/products/brown.jpg"
                                                                src="images/products/brown.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Light Purple</span>
                                                            <span className="swatch-value bg_purple"></span>
                                                            <img className="lazyload" data-src="images/products/purple.jpg"
                                                                src="images/products/purple.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Light Green</span>
                                                            <span className="swatch-value bg_light-green"></span>
                                                            <img className="lazyload" data-src="images/products/green.jpg"
                                                                src="images/products/green.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/white-3.jpg"
                                                            src="images/products/white-3.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/white-4.jpg"
                                                            src="images/products/white-4.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn">
                                                        <a href="#shoppingCart" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Add to cart</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                    <div className="size-list">
                                                        <span>S</span>
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">Oversized Printed T-shirt</a>
                                                    <span className="price">$10.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/white-2.jpg"
                                                            src="images/products/white-2.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/pink-1.jpg"
                                                            src="images/products/pink-1.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                    <div className="size-list">
                                                        <span>S</span>
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title">Oversized Printed T-shirt</a>
                                                    <span className="price">$16.95</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">White</span>
                                                            <span className="swatch-value bg_white"></span>
                                                            <img className="lazyload" data-src="images/products/white-2.jpg"
                                                                src="images/products/white-2.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Pink</span>
                                                            <span className="swatch-value bg_purple"></span>
                                                            <img className="lazyload" data-src="images/products/pink-1.jpg"
                                                                src="images/products/pink-1.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Black</span>
                                                            <span className="swatch-value bg_dark"></span>
                                                            <img className="lazyload" data-src="images/products/black-2.jpg"
                                                                src="images/products/black-2.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/brown-2.jpg"
                                                            src="images/products/brown-2.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/brown-3.jpg"
                                                            src="images/products/brown-3.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="size-list">
                                                        <span>S</span>
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                    <div className="list-product-btn">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">V-neck linen T-shirt</a>
                                                    <span className="price">$114.95</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">Brown</span>
                                                            <span className="swatch-value bg_brown"></span>
                                                            <img className="lazyload" data-src="images/products/brown-2.jpg"
                                                                src="images/products/brown-2.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">White</span>
                                                            <span className="swatch-value bg_white"></span>
                                                            <img className="lazyload" data-src="images/products/white-5.jpg"
                                                                src="images/products/white-5.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product"
                                                            data-src="images/products/light-green-1.jpg"
                                                            src="images/products/light-green-1.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/light-green-2.jpg"
                                                            src="images/products/light-green-2.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn absolute-2">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">Loose Fit Sweatshirt</a>
                                                    <span className="price">$10.00</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">Light Green</span>
                                                            <span className="swatch-value bg_light-green"></span>
                                                            <img className="lazyload" data-src="images/products/light-green-1.jpg"
                                                                src="images/products/light-green-1.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Black</span>
                                                            <span className="swatch-value bg_dark"></span>
                                                            <img className="lazyload" data-src="images/products/black-3.jpg"
                                                                src="images/products/black-3.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Blue</span>
                                                            <span className="swatch-value bg_blue-2"></span>
                                                            <img className="lazyload" data-src="images/products/blue.jpg"
                                                                src="images/products/blue.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Dark Blue</span>
                                                            <span className="swatch-value bg_dark-blue"></span>
                                                            <img className="lazyload" data-src="images/products/dark-blue.jpg"
                                                                src="images/products/dark-blue.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">White</span>
                                                            <span className="swatch-value bg_white"></span>
                                                            <img className="lazyload" data-src="images/products/white-6.jpg"
                                                                src="images/products/white-6.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Light Grey</span>
                                                            <span className="swatch-value bg_light-grey"></span>
                                                            <img className="lazyload" data-src="images/products/light-grey.jpg"
                                                                src="images/products/light-grey.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="nav-sw nav-next-slider nav-next-product box-icon w_46 round"><span
                                        className="icon icon-arrow-left"></span></div>
                                <div className="nav-sw nav-prev-slider nav-prev-product box-icon w_46 round"><span
                                        className="icon icon-arrow-right"></span></div>
                                <div className="sw-dots style-2 sw-pagination-product justify-content-center"></div>
                            </div>
                        </div>
                    </section>

                    <section className="flat-spacing-4 pt_0">
                        <div className="container">
                            <div className="flat-title">
                                <span className="title">Recently Viewed</span>
                            </div>
                            <div className="hover-sw-nav hover-sw-2">
                                <div dir="ltr" className="swiper tf-sw-recent wrap-sw-over" data-preview="4" data-tablet="3"
                                    data-mobile="2" data-space-lg="30" data-space-md="30" data-space="15" data-pagination="1"
                                    data-pagination-md="1" data-pagination-lg="1">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product"
                                                            data-src="images/products/light-green-1.jpg"
                                                            src="images/products/light-green-1.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/light-green-2.jpg"
                                                            src="images/products/light-green-2.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn absolute-2">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">Loose Fit Sweatshirt</a>
                                                    <span className="price">$10.00</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">Light Green</span>
                                                            <span className="swatch-value bg_light-green"></span>
                                                            <img className="lazyload" data-src="images/products/light-green-1.jpg"
                                                                src="images/products/light-green-1.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Black</span>
                                                            <span className="swatch-value bg_dark"></span>
                                                            <img className="lazyload" data-src="images/products/black-3.jpg"
                                                                src="images/products/black-3.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Blue</span>
                                                            <span className="swatch-value bg_blue-2"></span>
                                                            <img className="lazyload" data-src="images/products/blue.jpg"
                                                                src="images/products/blue.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Dark Blue</span>
                                                            <span className="swatch-value bg_dark-blue"></span>
                                                            <img className="lazyload" data-src="images/products/dark-blue.jpg"
                                                                src="images/products/dark-blue.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">White</span>
                                                            <span className="swatch-value bg_white"></span>
                                                            <img className="lazyload" data-src="images/products/white-6.jpg"
                                                                src="images/products/white-6.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Light Grey</span>
                                                            <span className="swatch-value bg_light-grey"></span>
                                                            <img className="lazyload" data-src="images/products/light-grey.jpg"
                                                                src="images/products/light-grey.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/brown-2.jpg"
                                                            src="images/products/brown-2.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/brown-3.jpg"
                                                            src="images/products/brown-3.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="size-list">
                                                        <span>S</span>
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                    <div className="list-product-btn">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">V-neck linen T-shirt</a>
                                                    <span className="price">$114.95</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">Brown</span>
                                                            <span className="swatch-value bg_brown"></span>
                                                            <img className="lazyload" data-src="images/products/brown-2.jpg"
                                                                src="images/products/brown-2.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">White</span>
                                                            <span className="swatch-value bg_white"></span>
                                                            <img className="lazyload" data-src="images/products/white-5.jpg"
                                                                src="images/products/white-5.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/white-2.jpg"
                                                            src="images/products/white-2.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/pink-1.jpg"
                                                            src="images/products/pink-1.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                    <div className="size-list">
                                                        <span>S</span>
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title">Oversized Printed T-shirt</a>
                                                    <span className="price">$16.95</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">White</span>
                                                            <span className="swatch-value bg_white"></span>
                                                            <img className="lazyload" data-src="images/products/white-2.jpg"
                                                                src="images/products/white-2.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Pink</span>
                                                            <span className="swatch-value bg_purple"></span>
                                                            <img className="lazyload" data-src="images/products/pink-1.jpg"
                                                                src="images/products/pink-1.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Black</span>
                                                            <span className="swatch-value bg_dark"></span>
                                                            <img className="lazyload" data-src="images/products/black-2.jpg"
                                                                src="images/products/black-2.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/white-3.jpg"
                                                            src="images/products/white-3.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/white-4.jpg"
                                                            src="images/products/white-4.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn">
                                                        <a href="#shoppingCart" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Add to cart</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                    <div className="size-list">
                                                        <span>S</span>
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">Oversized Printed T-shirt</a>
                                                    <span className="price">$10.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/brown.jpg"
                                                            src="images/products/brown.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/purple.jpg"
                                                            src="images/products/purple.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                    <div className="size-list">
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                    <div className="on-sale-wrap">
                                                        <div className="on-sale-item">-33%</div>
                                                    </div>
                                                    <div className="countdown-box">
                                                        <div className="js-countdown" data-timer="1007500" data-labels="d :,h :,m :,s">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">Ribbed modal T-shirt</a>
                                                    <span className="price">From $18.95</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">Brown</span>
                                                            <span className="swatch-value bg_brown"></span>
                                                            <img className="lazyload" data-src="images/products/brown.jpg"
                                                                src="images/products/brown.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Light Purple</span>
                                                            <span className="swatch-value bg_purple"></span>
                                                            <img className="lazyload" data-src="images/products/purple.jpg"
                                                                src="images/products/purple.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Light Green</span>
                                                            <span className="swatch-value bg_light-green"></span>
                                                            <img className="lazyload" data-src="images/products/green.jpg"
                                                                src="images/products/green.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="product-detail.html" className="product-img">
                                                        <img className="lazyload img-product" data-src="images/products/orange-1.jpg"
                                                            src="images/products/orange-1.jpg" alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src="images/products/white-1.jpg"
                                                            src="images/products/white-1.jpg" alt="image-product"/>
                                                    </a>
                                                    <div className="list-product-btn">
                                                        <a href="#quick_add" data-bs-toggle="modal"
                                                            className="box-icon bg_white quick-add tf-btn-loading">
                                                            <span className="icon icon-bag"></span>
                                                            <span className="tooltip">Quick Add</span>
                                                        </a>
                                                        <a href="javascript:void(0);"
                                                            className="box-icon bg_white wishlist btn-icon-action">
                                                            <span className="icon icon-heart"></span>
                                                            <span className="tooltip">Add to Wishlist</span>
                                                            <span className="icon icon-delete"></span>
                                                        </a>
                                                        <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                            className="box-icon bg_white compare btn-icon-action">
                                                            <span className="icon icon-compare"></span>
                                                            <span className="tooltip">Add to Compare</span>
                                                            <span className="icon icon-check"></span>
                                                        </a>
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                    <div className="size-list">
                                                        <span>S</span>
                                                        <span>M</span>
                                                        <span>L</span>
                                                        <span>XL</span>
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="product-detail.html" className="title link">Ribbed Tank Top</a>
                                                    <span className="price">$16.95</span>
                                                    <ul className="list-color-product">
                                                        <li className="list-color-item color-swatch active">
                                                            <span className="tooltip">Orange</span>
                                                            <span className="swatch-value bg_orange-3"></span>
                                                            <img className="lazyload" data-src="images/products/orange-1.jpg"
                                                                src="images/products/orange-1.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">Black</span>
                                                            <span className="swatch-value bg_dark"></span>
                                                            <img className="lazyload" data-src="images/products/black-1.jpg"
                                                                src="images/products/black-1.jpg" alt="image-product"/>
                                                        </li>
                                                        <li className="list-color-item color-swatch">
                                                            <span className="tooltip">White</span>
                                                            <span className="swatch-value bg_white"></span>
                                                            <img className="lazyload" data-src="images/products/white-1.jpg"
                                                                src="images/products/white-1.jpg" alt="image-product"/>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="nav-sw nav-next-slider nav-next-recent box-icon w_46 round"><span
                                        className="icon icon-arrow-left"></span></div>
                                <div className="nav-sw nav-prev-slider nav-prev-recent box-icon w_46 round"><span
                                        className="icon icon-arrow-right"></span></div>
                                <div className="sw-dots style-2 sw-pagination-recent justify-content-center"></div>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
                {/* <!-- modal compare_color --> */}
                <div className="modal fade modalDemo tf-product-modal modal-part-content" id="compare_color">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="header">
                                <div className="demo-title">Compare color</div>
                                <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                            </div>
                            <div className="tf-compare-color-wrapp">
                                <div className="tf-compare-color-grid">
                                    {[{
                                        id: 1,
                                        img: "images/shop/products/hmgoepprod2.jpg",
                                        color: "beige",
                                        label: "Beige"
                                    }, {
                                        id: 2,
                                        img: "images/shop/products/hmgoepprod12.jpg",
                                        color: "blue",
                                        label: "Blue"
                                    }, {
                                        id: 3,
                                        img: "images/shop/products/hmgoepprod7.jpg",
                                        color: "black",
                                        label: "Black"
                                    }, {
                                        id: 4,
                                        img: "images/shop/products/hmgoepprod14.jpg",
                                        color: "white",
                                        label: "White"
                                    }].map(({ id, img, color, label }) => (
                                        <React.Fragment key={id}>
                                            <input type="checkbox" className="sr-only" id={`remove-compare-color-${color}-${id}`} />
                                            <div className="tf-compare-color-item">
                                                <div className="tf-compare-color-top">
                                                    <label htmlFor={`remove-compare-color-${color}-${id}`} className="tf-compare-color-remove">Remove</label>
                                                    <img className="lazyload" data-src={img} src={img} alt={`img-${label}`} />
                                                </div>
                                                <div className="tf-compare-color-bottom">
                                                    <div className="tf-compare-color-color">
                                                        <span className={`tf-color-list-color bg-color-${color}`}></span>
                                                        <span>{label}</span>
                                                    </div>
                                                    <form>
                                                        <select className="tf-select" name="id">
                                                            <option value="46633906045232">S - $8.00</option>
                                                            <option value="47256262738224">M - $8.00</option>
                                                            <option value="47256262770992">L - $8.00</option>
                                                            <option value="47256262803760">XL - $8.00</option>
                                                        </select>
                                                        <a href="javascript:void(0);" className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn btn btn-add-to-cart">
                                                            <span>Add to cart</span>
                                                        </a>
                                                    </form>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /modal compare_color -->

                <!-- modal ask_question --> */}
                <div className="modal modalCentered fade modalDemo tf-product-modal modal-part-content" id="ask_question">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="header">
                                <div className="demo-title">Ask a question</div>
                                <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                            </div>
                            <div className="overflow-y-auto">
                                    <form>
                                        <fieldset>
                                            <label>Name *</label>
                                            <input type="text" name="name" required />
                                        </fieldset>
                                        <fieldset>
                                            <label>Email *</label>
                                            <input type="email" name="email" required />
                                        </fieldset>
                                        <fieldset>
                                            <label>Phone number</label>
                                            <input type="number" name="phone" />
                                        </fieldset>
                                        <fieldset>
                                            <label>Message</label>
                                            <textarea name="message" rows="4" required></textarea>
                                        </fieldset>
                                        <button type="submit" className="tf-btn w-100 btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn">
                                            <span>Send</span>
                                        </button>
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /modal ask_question -->

                <!-- modal delivery_return --> */}
                <div className="modal modalCentered fade modalDemo tf-product-modal modal-part-content" id="delivery_return">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="header">
                                <div className="demo-title">Shipping & Delivery</div>
                                <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                            </div>
                            <div className="overflow-y-auto">
                                <div className="tf-product-popup-delivery">
                                    <div className="title">Delivery</div>
                                    <p className="text-paragraph">All orders shipped with UPS Express.</p>
                                    <p className="text-paragraph">Always free shipping for orders over US $250.</p>
                                    <p className="text-paragraph">All orders are shipped with a UPS tracking number.</p>
                                </div>
                                <div className="tf-product-popup-delivery">
                                    <div className="title">Returns</div>
                                    <p className="text-paragraph">Items returned within 14 days in like-new condition are eligible for full refund or store credit.</p>
                                    <p className="text-paragraph">Refunds go to the original form of payment.</p>
                                    <p className="text-paragraph">Customer pays return shipping. Original shipping fees are non-refundable.</p>
                                    <p className="text-paragraph">Sale items are final purchase.</p>
                                </div>
                                <div className="tf-product-popup-delivery">
                                    <div className="title">Help</div>
                                    <p className="text-paragraph">Need help? Reach out any time.</p>
                                    <p className="text-paragraph">Email: <a href="mailto:contact@domain.com">contact@domain.com</a></p>
                                    <p className="text-paragraph mb-0">Phone: +1 (23) 456 789</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /modal delivery_return -->
                <!-- modal share social --> */}
                <div className="modal modalCentered fade modalDemo tf-product-modal modal-part-content" id="share_social">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="header">
                                <div className="demo-title">Share</div>
                                <span className="icon-close icon-close-popup" data-bs-dismiss="modal"></span>
                            </div>
                            <div className="overflow-y-auto">
                                <ul className="tf-social-icon d-flex gap-10">
                                    <li><a href="#" className="box-icon social-facebook bg_line"><i className="icon icon-fb"></i></a></li>
                                    <li><a href="#" className="box-icon social-twiter bg_line"><i className="icon icon-Icon-x"></i></a></li>
                                    <li><a href="#" className="box-icon social-instagram bg_line"><i className="icon icon-instagram"></i></a></li>
                                    <li><a href="#" className="box-icon social-tiktok bg_line"><i className="icon icon-tiktok"></i></a></li>
                                    <li><a href="#" className="box-icon social-pinterest bg_line"><i className="icon icon-pinterest-1"></i></a></li>
                                </ul>
                                <form className="form-share">
                                    <fieldset>
                                        <input type="text" value="https://themesflat.co/html/ecomus/" readOnly />
                                    </fieldset>
                                    <div className="button-submit">
                                        <button type="button" className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn">Copy</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /modal share social --> */}
                
                <Extras />
            </div>
            )
        }
export default ProductDetails;