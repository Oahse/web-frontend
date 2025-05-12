import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import useDeviceType from '@/hooks/useDeviceType'
import { useState } from "react";

const Products =()=>{
    const { isMobile} = useDeviceType();
    const [loading, setLoading] = useState(false);
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            <a href="javascript:void(0);" id="toggle-rtl" className="tf-btn animate-hover-btn btn-fill">RTL</a>
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="heading text-center"> Products Results</div>
                        <p className="text-center text-2 text_black-2 mt_5">Shop through our latest selection of Fashion</p>
                    </div>
                </div>
                {/* <!-- Section Product --> */}
                <section className="flat-spacing-2">
                    <div className="container">
                        <div className="tf-shop-control grid-3 align-items-center">
                            <div className="tf-control-filter">
                                <a href="#filterShop" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                    className="tf-btn-filter"><span className="icon icon-filter"></span><span
                                        className="text">Filter</span></a>
                            </div>
                            <ul className="tf-control-layout d-flex justify-content-center">
                                <li className="tf-view-layout-switch sw-layout-list list-layout" data-value-layout="list">
                                    <div className="item"><span className="icon icon-list"></span></div>
                                </li>
                                <li className="tf-view-layout-switch sw-layout-2" data-value-layout="tf-col-2">
                                    <div className="item"><span className="icon icon-grid-2"></span></div>
                                </li>
                                <li className="tf-view-layout-switch sw-layout-3" data-value-layout="tf-col-3">
                                    <div className="item"><span className="icon icon-grid-3"></span></div>
                                </li>
                                <li className="tf-view-layout-switch sw-layout-4 active" data-value-layout="tf-col-4">
                                    <div className="item"><span className="icon icon-grid-4"></span></div>
                                </li>
                                <li className="tf-view-layout-switch sw-layout-5" data-value-layout="tf-col-5">
                                    <div className="item"><span className="icon icon-grid-5"></span></div>
                                </li>
                                <li className="tf-view-layout-switch sw-layout-6" data-value-layout="tf-col-6">
                                    <div className="item"><span className="icon icon-grid-6"></span></div>
                                </li>
                            </ul>
                            <div className="tf-control-sorting d-flex justify-content-end">
                                <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                                    <div className="btn-select">
                                        <span className="text-sort-value">Featured</span>
                                        <span className="icon icon-arrow-down"></span>
                                    </div>
                                    <div className="dropdown-menu">
                                        <div className="select-item active">
                                            <span className="text-value-item">Featured</span>
                                        </div>
                                        <div className="select-item">
                                            <span className="text-value-item">Best selling</span>
                                        </div>
                                        <div className="select-item" data-sort-value="a-z">
                                            <span className="text-value-item">Alphabetically, A-Z</span>
                                        </div>
                                        <div className="select-item" data-sort-value="z-a">
                                            <span className="text-value-item">Alphabetically, Z-A</span>
                                        </div>
                                        <div className="select-item" data-sort-value="price-low-high">
                                            <span className="text-value-item">Price, low to high</span>
                                        </div>
                                        <div className="select-item" data-sort-value="price-high-low">
                                            <span className="text-value-item">Price, high to low</span>
                                        </div>
                                        <div className="select-item">
                                            <span className="text-value-item">Date, old to new</span>
                                        </div>
                                        <div className="select-item">
                                            <span className="text-value-item">Date, new to old</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrapper-control-shop">
                            <div className="meta-filter-shop">
                                <div id="product-count-grid" className="count-text"></div>
                                <div id="product-count-list" className="count-text"></div>
                                <div id="applied-filters"></div>
                                <button id="remove-all" className="remove-all-filters" style="display: none;">Remove All <i
                                        className="icon icon-close"></i></button>
                            </div>
                            <div className="tf-list-layout wrapper-shop" id="listLayout">
                                {/* <!-- card product 1 --> */}
                                <div className="card-product list-layout" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <a href="#" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/orange-1.jpg"
                                                src="images/products/orange-1.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/white-1.jpg"
                                                src="images/products/white-1.jpg" alt="image-product"/>
                                        </a>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="#" className="title link">Ribbed Tank Top</a>
                                        <span className="price current-price">$16.95</span>
                                        <p className="description">Button-up shirt sleeves and a relaxed silhouette. It’s tailored
                                            with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose —
                                            responsibly sourced wood-based fibres produced through a process that reduces...</p>
                                        <ul className="list-color-product">
                                            <li className="list-color-item hover-tooltip color-swatch active">
                                                <span className="tooltip tooltip-bottom">Orange</span>
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
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon quick-add style-3 hover-tooltip"><span
                                                    className="icon icon-bag"></span><span className="tooltip">Quick add</span></a>
                                            <a href="#" className="box-icon wishlist style-3 hover-tooltip"><span
                                                    className="icon icon-heart"></span> <span className="tooltip">Add to
                                                    Wishlist</span></a>
                                            <a href="#compare" data-bs-toggle="offcanvas"
                                                className="box-icon compare style-3 hover-tooltip"><span
                                                    className="icon icon-compare"></span> <span className="tooltip">Add to
                                                    Compare</span></a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon quickview style-3 hover-tooltip"><span
                                                    className="icon icon-view"></span><span className="tooltip">Quick view</span></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card product 2 --> */}
                                <div className="card-product list-layout" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <div className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/brown.jpg"
                                                src="images/products/brown.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/purple.jpg"
                                                src="images/products/purple.jpg" alt="image-product"/>
                                        </div>
                                        <div className="countdown-box">
                                            <div className="js-countdown" data-timer="1007500" data-labels="d :,h :,m :,s"></div>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="#" className="title link">Ribbed modal T-shirt</a>
                                        <span className="price current-price">$18.95</span>
                                        <p className="description">Button-up shirt sleeves and a relaxed silhouette. It’s tailored
                                            with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose —
                                            responsibly sourced wood-based fibres produced through a process that reduces...</p>
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
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal" className="box-icon quick-add style-3"><span
                                                    className="icon icon-bag"></span><span className="tooltip">Quick add</span></a>
                                            <a href="#" className="box-icon wishlist style-3"><span className="icon icon-heart"></span>
                                                <span className="tooltip">Add to Wishlist</span></a>
                                            <a href="#compare" data-bs-toggle="offcanvas" className="box-icon compare style-3"><span
                                                    className="icon icon-compare"></span> <span className="tooltip">Add to
                                                    Compare</span></a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon quickview style-3"><span className="icon icon-view"></span><span
                                                    className="tooltip">Quick view</span></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card product 3 --> */}
                                <div className="card-product list-layout" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <div className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/white-3.jpg"
                                                src="images/products/white-3.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/white-4.jpg"
                                                src="images/products/white-4.jpg" alt="image-product"/>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="#" className="title link">Oversized Printed T-shirt</a>
                                        <span className="price current-price">$10.00</span>
                                        <p className="description">Button-up shirt sleeves and a relaxed silhouette. It’s tailored
                                            with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose —
                                            responsibly sourced wood-based fibres produced through a process that reduces...</p>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal" className="box-icon quick-add style-3"><span
                                                    className="icon icon-bag"></span><span className="tooltip">Quick add</span></a>
                                            <a href="#" className="box-icon wishlist style-3"><span className="icon icon-heart"></span>
                                                <span className="tooltip">Add to Wishlist</span></a>
                                            <a href="#compare" data-bs-toggle="offcanvas" className="box-icon compare style-3"><span
                                                    className="icon icon-compare"></span> <span className="tooltip">Add to
                                                    Compare</span></a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon quickview style-3"><span className="icon icon-view"></span><span
                                                    className="tooltip">Quick view</span></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card product 4 --> */}
                                <div className="card-product list-layout" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <div className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/white-2.jpg"
                                                src="images/products/white-2.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/pink-1.jpg"
                                                src="images/products/pink-1.jpg" alt="image-product"/>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="#" className="title link">Oversized Printed T-shirt</a>
                                        <span className="price current-price">$16.95</span>
                                        <p className="description">Button-up shirt sleeves and a relaxed silhouette. It’s tailored
                                            with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose —
                                            responsibly sourced wood-based fibres produced through a process that reduces...</p>
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
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal" className="box-icon quick-add style-3"><span
                                                    className="icon icon-bag"></span><span className="tooltip">Quick add</span></a>
                                            <a href="#" className="box-icon wishlist style-3"><span className="icon icon-heart"></span>
                                                <span className="tooltip">Add to Wishlist</span></a>
                                            <a href="#compare" data-bs-toggle="offcanvas" className="box-icon compare style-3"><span
                                                    className="icon icon-compare"></span> <span className="tooltip">Add to
                                                    Compare</span></a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon quickview style-3"><span className="icon icon-view"></span><span
                                                    className="tooltip">Quick view</span></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card product 5 --> */}
                                <div className="card-product list-layout" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <div className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/brown-2.jpg"
                                                src="images/products/brown-2.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/brown-3.jpg"
                                                src="images/products/brown-3.jpg" alt="image-product"/>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="#" className="title link">V-neck linen T-shirt</a>
                                        <span className="price current-price">$114.95</span>
                                        <p className="description">Button-up shirt sleeves and a relaxed silhouette. It’s tailored
                                            with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose —
                                            responsibly sourced wood-based fibres produced through a process that reduces...</p>
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
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal" className="box-icon quick-add style-3"><span
                                                    className="icon icon-bag"></span><span className="tooltip">Quick add</span></a>
                                            <a href="#" className="box-icon wishlist style-3"><span className="icon icon-heart"></span>
                                                <span className="tooltip">Add to Wishlist</span></a>
                                            <a href="#compare" data-bs-toggle="offcanvas" className="box-icon compare style-3"><span
                                                    className="icon icon-compare"></span> <span className="tooltip">Add to
                                                    Compare</span></a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon quickview style-3"><span className="icon icon-view"></span><span
                                                    className="tooltip">Quick view</span></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card product 6 --> */}
                                <div className="card-product list-layout" data-availability="In stock" data-brand="M&H">
                                    <div className="card-product-wrapper">
                                        <div className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/light-green-1.jpg"
                                                src="images/products/light-green-1.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/light-green-2.jpg"
                                                src="images/products/light-green-2.jpg" alt="image-product"/>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="#" className="title link">Loose Fit Sweatshirt</a>
                                        <span className="price current-price">$10.00</span>
                                        <p className="description">Button-up shirt sleeves and a relaxed silhouette. It’s tailored
                                            with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose —
                                            responsibly sourced wood-based fibres produced through a process that reduces...</p>
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
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal" className="box-icon quick-add style-3"><span
                                                    className="icon icon-bag"></span><span className="tooltip">Quick add</span></a>
                                            <a href="#" className="box-icon wishlist style-3"><span className="icon icon-heart"></span>
                                                <span className="tooltip">Add to Wishlist</span></a>
                                            <a href="#compare" data-bs-toggle="offcanvas" className="box-icon compare style-3"><span
                                                    className="icon icon-compare"></span> <span className="tooltip">Add to
                                                    Compare</span></a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon quickview style-3"><span className="icon icon-view"></span><span
                                                    className="tooltip">Quick view</span></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card product 7 --> */}
                                <div className="card-product list-layout" data-availability="Out of stock" data-brand="M&H">
                                    <div className="card-product-wrapper">
                                        <div className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/black-4.jpg"
                                                src="images/products/black-4.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/black-5.jpg"
                                                src="images/products/black-5.jpg" alt="image-product"/>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="#" className="title link">Regular Fit Oxford Shirt</a>
                                        <span className="price current-price">$10.00</span>
                                        <p className="description">Button-up shirt sleeves and a relaxed silhouette. It’s tailored
                                            with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose —
                                            responsibly sourced wood-based fibres produced through a process that reduces...</p>
                                        <ul className="list-color-product">
                                            <li className="list-color-item color-swatch active">
                                                <span className="tooltip">Black</span>
                                                <span className="swatch-value bg_dark"></span>
                                                <img className="lazyload" data-src="images/products/black-4.jpg"
                                                    src="images/products/black-4.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Dark Blue</span>
                                                <span className="swatch-value bg_dark-blue"></span>
                                                <img className="lazyload" data-src="images/products/dark-blue-2.jpg"
                                                    src="images/products/dark-blue-2.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Beige</span>
                                                <span className="swatch-value bg_beige"></span>
                                                <img className="lazyload" data-src="images/products/beige.jpg"
                                                    src="images/products/beige.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Light Blue</span>
                                                <span className="swatch-value bg_light-blue"></span>
                                                <img className="lazyload" data-src="images/products/light-blue.jpg"
                                                    src="images/products/light-blue.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">White</span>
                                                <span className="swatch-value bg_white"></span>
                                                <img className="lazyload" data-src="images/products/white-7.jpg"
                                                    src="images/products/white-7.jpg" alt="image-product"/>
                                            </li>
                                        </ul>
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal" className="box-icon quick-add style-3"><span
                                                    className="icon icon-bag"></span><span className="tooltip">Quick add</span></a>
                                            <a href="#" className="box-icon wishlist style-3"><span className="icon icon-heart"></span>
                                                <span className="tooltip">Add to Wishlist</span></a>
                                            <a href="#compare" data-bs-toggle="offcanvas" className="box-icon compare style-3"><span
                                                    className="icon icon-compare"></span> <span className="tooltip">Add to
                                                    Compare</span></a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon quickview style-3"><span className="icon icon-view"></span><span
                                                    className="tooltip">Quick view</span></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card product 8 --> */}
                                <div className="card-product list-layout" data-availability="Out of stock" data-brand="M&H">
                                    <div className="card-product-wrapper">
                                        <div className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/white-8.jpg"
                                                src="images/products/white-8.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/black-6.jpg"
                                                src="images/products/black-6.jpg" alt="image-product"/>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="#" className="title link">Loose Fit Hoodie</a>
                                        <span className="price current-price">$9.95</span>
                                        <p className="description">Button-up shirt sleeves and a relaxed silhouette. It’s tailored
                                            with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose —
                                            responsibly sourced wood-based fibres produced through a process that reduces...</p>
                                        <ul className="list-color-product">
                                            <li className="list-color-item color-swatch active">
                                                <span className="tooltip">White</span>
                                                <span className="swatch-value bg_white"></span>
                                                <img className="lazyload" data-src="images/products/white-8.jpg"
                                                    src="images/products/white-8.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Black</span>
                                                <span className="swatch-value bg_dark"></span>
                                                <img className="lazyload" data-src="images/products/black-7.jpg"
                                                    src="images/products/black-7.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Blue</span>
                                                <span className="swatch-value bg_blue-2"></span>
                                                <img className="lazyload" data-src="images/products/blue-2.jpg"
                                                    src="images/products/blue-2.jpg" alt="image-product"/>
                                            </li>
                                        </ul>
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal" className="box-icon quick-add style-3"><span
                                                    className="icon icon-bag"></span><span className="tooltip">Quick add</span></a>
                                            <a href="#" className="box-icon wishlist style-3"><span className="icon icon-heart"></span>
                                                <span className="tooltip">Add to Wishlist</span></a>
                                            <a href="#compare" data-bs-toggle="offcanvas" className="box-icon compare style-3"><span
                                                    className="icon icon-compare"></span> <span className="tooltip">Add to
                                                    Compare</span></a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon quickview style-3"><span className="icon icon-view"></span><span
                                                    className="tooltip">Quick view</span></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- pagination --> */}
                                <ul className="wg-pagination tf-pagination-list justify-content-start">
                                    <li className="active">
                                        <a href="#" className="pagination-link">1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="pagination-link animate-hover-btn">2</a>
                                    </li>
                                    <li>
                                        <a href="#" className="pagination-link animate-hover-btn">3</a>
                                    </li>
                                    <li>
                                        <a href="#" className="pagination-link animate-hover-btn">
                                            <span className="icon icon-arrow-right"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="tf-grid-layout wrapper-shop tf-col-4" id="gridLayout">
                                {/* <!-- card product 1 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/orange-1.jpg"
                                                src="images/products/orange-1.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/white-1.jpg"
                                                src="images/products/white-1.jpg" alt="image-product"/>
                                        </a>
                                        <div className="list-product-btn absolute-2">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <span className="icon icon-bag"></span>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <a href="product-detail.html" className="title link">Ribbed Tank Top</a>
                                        <span className="price current-price">$16.95</span>
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
                                {/* <!-- card product 2 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="Ecomus">
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
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                        <div className="countdown-box">
                                            <div className="js-countdown" data-timer="1007500" data-labels="d :,h :,m :,s"></div>
                                        </div>
                                        <div className="on-sale-wrap text-end">
                                            <div className="on-sale-item">-33%</div>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="product-detail.html" className="title link">Ribbed modal T-shirt</a>
                                        <span className="price current-price">$18.95</span>
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
                                {/* <!-- card product 3 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/white-3.jpg"
                                                src="images/products/white-3.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/white-4.jpg"
                                                src="images/products/white-4.jpg" alt="image-product"/>
                                        </a>
                                        <div className="list-product-btn absolute-2">
                                            <a href="#shoppingCart" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <span className="icon icon-bag"></span>
                                                <span className="tooltip">Add to cart</span>
                                            </a>
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <a href="product-detail.html" className="title link">Oversized Printed T-shirt</a>
                                        <span className="price current-price">$10.00</span>
                                    </div>
                                </div>
                                {/* <!-- card product 4 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="Ecomus">
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
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="product-detail.html" className="title">Oversized Printed T-shirt</a>
                                        <span className="price current-price">$16.95</span>
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
                                {/* <!-- card product 5 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/brown-2.jpg"
                                                src="images/products/brown-2.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/brown-3.jpg"
                                                src="images/products/brown-3.jpg" alt="image-product"/>
                                        </a>
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <span className="icon icon-bag"></span>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <span className="price current-price">$114.95</span>
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
                                {/* <!-- card product 6 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/light-green-1.jpg"
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
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <span className="price current-price">$10.00</span>
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
                                {/* <!-- card product 7 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="Ecomus">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/black-4.jpg"
                                                src="images/products/black-4.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/black-5.jpg"
                                                src="images/products/black-5.jpg" alt="image-product"/>
                                        </a>
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <span className="icon icon-bag"></span>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <a href="product-detail.html" className="title link">Regular Fit Oxford Shirt</a>
                                        <span className="price current-price">$10.00</span>
                                        <ul className="list-color-product">
                                            <li className="list-color-item color-swatch active">
                                                <span className="tooltip">Black</span>
                                                <span className="swatch-value bg_dark"></span>
                                                <img className="lazyload" data-src="images/products/black-4.jpg"
                                                    src="images/products/black-4.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Dark Blue</span>
                                                <span className="swatch-value bg_dark-blue"></span>
                                                <img className="lazyload" data-src="images/products/dark-blue-2.jpg"
                                                    src="images/products/dark-blue-2.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Beige</span>
                                                <span className="swatch-value bg_beige"></span>
                                                <img className="lazyload" data-src="images/products/beige.jpg"
                                                    src="images/products/beige.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Light Blue</span>
                                                <span className="swatch-value bg_light-blue"></span>
                                                <img className="lazyload" data-src="images/products/light-blue.jpg"
                                                    src="images/products/light-blue.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">White</span>
                                                <span className="swatch-value bg_white"></span>
                                                <img className="lazyload" data-src="images/products/white-7.jpg"
                                                    src="images/products/white-7.jpg" alt="image-product"/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- card product 8 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="M&H">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/white-8.jpg"
                                                src="images/products/white-8.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/black-6.jpg"
                                                src="images/products/black-6.jpg" alt="image-product"/>
                                        </a>
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <span className="icon icon-bag"></span>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <a href="product-detail.html" className="title link">Loose Fit Hoodie</a>
                                        <span className="price current-price">$9.95</span>
                                        <ul className="list-color-product">
                                            <li className="list-color-item color-swatch active">
                                                <span className="tooltip">White</span>
                                                <span className="swatch-value bg_white"></span>
                                                <img className="lazyload" data-src="images/products/white-8.jpg"
                                                    src="images/products/white-8.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Black</span>
                                                <span className="swatch-value bg_dark"></span>
                                                <img className="lazyload" data-src="images/products/black-7.jpg"
                                                    src="images/products/black-7.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Blue</span>
                                                <span className="swatch-value bg_blue-2"></span>
                                                <img className="lazyload" data-src="images/products/blue-2.jpg"
                                                    src="images/products/blue-2.jpg" alt="image-product"/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- card product 9 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="M&H">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/brown-4.jpg"
                                                src="images/products/brown-4.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/black-8.jpg"
                                                src="images/products/black-8.jpg" alt="image-product"/>
                                        </a>
                                        <div className="size-list">
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                            <span className="size-item">XL</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <span className="icon icon-bag"></span>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <a href="product-detail.html" className="title link">Patterned scarf</a>
                                        <span className="price current-price">$14.95</span>
                                        <ul className="list-color-product">
                                            <li className="list-color-item color-swatch active">
                                                <span className="tooltip">Brown</span>
                                                <span className="swatch-value bg_brown"></span>
                                                <img className="lazyload" data-src="images/products/brown-4.jpg"
                                                    src="images/products/brown-4.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Black</span>
                                                <span className="swatch-value bg_dark"></span>
                                                <img className="lazyload" data-src="images/products/black-8.jpg"
                                                    src="images/products/black-8.jpg" alt="image-product"/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- card product 10 --> */}
                                <div className="card-product grid" data-availability="In stock" data-brand="M&H">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/black-9.jpg"
                                                src="images/products/black-9.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/black-10.jpg"
                                                src="images/products/black-10.jpg" alt="image-product"/>
                                        </a>
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <span className="icon icon-bag"></span>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <a href="product-detail.html" className="title link">Slim Fit Fine-knit Turtleneck
                                            Sweater</a>
                                        <span className="price current-price">$18.95</span>
                                        <ul className="list-color-product">
                                            <li className="list-color-item color-swatch active">
                                                <span className="tooltip">Black</span>
                                                <span className="swatch-value bg_dark"></span>
                                                <img className="lazyload" data-src="images/products/black-9.jpg"
                                                    src="images/products/black-9.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">White</span>
                                                <span className="swatch-value bg_white"></span>
                                                <img className="lazyload" data-src="images/products/white-9.jpg"
                                                    src="images/products/white-9.jpg" alt="image-product"/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- card product 11 --> */}
                                <div className="card-product grid" data-availability="Out of stock" data-brand="M&H">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/grey-2.jpg"
                                                src="images/products/grey-2.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/grey.jpg"
                                                src="images/products/grey.jpg" alt="image-product"/>
                                        </a>
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <span className="icon icon-bag"></span>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <a href="product-detail.html" className="title link">Slim Fit Fine-knit Turtleneck
                                            Sweater</a>
                                        <span className="price current-price">$18.95</span>
                                        <ul className="list-color-product">
                                            <li className="list-color-item color-swatch active">
                                                <span className="tooltip">Grey</span>
                                                <span className="swatch-value bg_grey"></span>
                                                <img className="lazyload" data-src="images/products/grey-2.jpg"
                                                    src="images/products/grey-2.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Pink</span>
                                                <span className="swatch-value bg_pink"></span>
                                                <img className="lazyload" data-src="images/products/pink-2.jpg"
                                                    src="images/products/pink-2.jpg" alt="image-product"/>
                                            </li>
                                            <li className="list-color-item color-swatch">
                                                <span className="tooltip">Light Pink</span>
                                                <span className="swatch-value bg_light-pink"></span>
                                                <img className="lazyload" data-src="images/products/light-pink.jpg"
                                                    src="images/products/light-pink.jpg" alt="image-product"/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!-- card product 12 --> */}
                                <div className="card-product grid" data-availability="Out of stock" data-brand="M&H">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src="images/products/black-11.jpg"
                                                src="images/products/black-11.jpg" alt="image-product"/>
                                            <img className="lazyload img-hover" data-src="images/products/black-12.jpg"
                                                src="images/products/black-12.jpg" alt="image-product"/>
                                        </a>
                                        <div className="size-list">
                                            <span className="size-item">S</span>
                                            <span className="size-item">M</span>
                                            <span className="size-item">L</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <span className="icon icon-bag"></span>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            <a href="javascript:void(0);" className="box-icon bg_white wishlist btn-icon-action">
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
                                        <a href="product-detail.html" className="title link">Slim Fit Fine-knit Turtleneck
                                            Sweater</a>
                                        <span className="price current-price">$18.95</span>

                                    </div>
                                </div>
                                {/* <!-- pagination --> */}
                                <ul className="wg-pagination tf-pagination-list">
                                    <li className="active">
                                        <a href="#" className="pagination-link">1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="pagination-link animate-hover-btn">2</a>
                                    </li>
                                    <li>
                                        <a href="#" className="pagination-link animate-hover-btn">3</a>
                                    </li>
                                    <li>
                                        <a href="#" className="pagination-link animate-hover-btn">4</a>
                                    </li>
                                    <li>
                                        <a href="#" className="pagination-link animate-hover-btn">
                                            <span className="icon icon-arrow-right"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>
                {/* <!-- /Section Product --> */}

                <Footer />
            </div>
            <Extras />
        </div>
    )
}
export default Products;