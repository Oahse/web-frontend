import { useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import AccountSideBar from './accountsidebar';
import Extras from '@/components/extra';
import BreadCrumbs from '@/components/breadcrumbs';
const AccountWishlist =({categories=[]})=>{
    const [loading, setLoading] = useState(false);
      
    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="heading text-center">Wishlist</div>
                        <BreadCrumbs
                            dir='center'
                            links={[
                                { name: 'Home', href: '/' },
                                { name: 'Account', href: '/account' },
                                { name: 'WishList' }
                            ]}
                            // prev={{ href: `/products/${product?.id}`, tooltip: 'Previous Product' }}
                            // next={{ href: `/products/${product?.id}`, tooltip: 'Next Product' }}
                            // back={{ href: '/products', tooltip: 'Back to Products' }}
                        />
                    </div>
                </div>

                <section className="flat-spacing-11">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <AccountSideBar active={4}/>
                            </div>
                            <div className="col-lg-9">
                                <div className="my-account-content account-wishlist">
                                    <div className="grid-layout wrapper-shop" data-grid="grid-3">
                                        {/* <!-- card product 1 --> */}
                                        <div className="card-product">
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
                                        {/* <!-- card product 2 --> */}
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
                                                <div className="countdown-box">
                                                    <div className="js-countdown" data-timer="1007500" data-labels="d :,h :,m :,s">
                                                    </div>
                                                </div>
                                                <div className="on-sale-wrap text-end">
                                                    <div className="on-sale-item">-33%</div>
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
                                        {/* <!-- card product 3 --> */}
                                        <div className="card-product">
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
                                                <a href="product-detail.html" className="title link">Oversized Printed T-shirt</a>
                                                <span className="price">$10.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="btn-sidebar-account">
                    <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount" aria-controls="offcanvas"><i
                            className="icon icon-sidebar-2"></i></button>
                </div>
                <Footer />
            </div>
            
            <Extras categories={categories}  active={4}/>
        </div>
    )
}
export default AccountWishlist;