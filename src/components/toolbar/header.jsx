import React from 'react';

import logo from '@/assets/images/logo/banwe_logo_text_green.png';
import Search from '@/components/form/search';
import searchImg1 from '@/assets/images/item/search-grocey1.jpg';
import searchImg2 from '@/assets/images/item/search-grocey2.jpg';
import searchImg3 from '@/assets/images/item/search-grocey3.jpg';
import searchImg4 from '@/assets/images/item/search-grocey4.jpg';
import searchImg5 from '@/assets/images/item/search-grocey5.jpg';
import { Link } from 'react-router-dom';

const Header =()=>{
    const searchResults = [
        {
          img: searchImg1,
          name: "Berry World Blueberries",
          price: "$4.00"
        },
        {
          img: searchImg2,
          name: "Berry World Strawberries",
          price: {
            old: "$40.25",
            new: "$30.25"
          }
        },
        {
          img: searchImg3,
          name: "Fish Said Fred Sea Bass Fillets",
          price: "$6.00"
        },
        {
          img: searchImg4,
          name: "M&S Full-Bodied Greek Kalamata Olives",
          price: "$7.00"
        },
        {
          img: searchImg5,
          name: "M&S Roast Lamb Dinner",
          price: {
            old: "$4.70",
            new: "$3.70"
          }
        }
      ];
    
    const handleSearch = (e) => {
        console.log("Search submitted:", e.target[0].value);
    };
    
    const handleButtonClick = () => {
        console.log("Search icon/button clicked");
    };
      
      
    return(
        <header id="header" className="header-default header-style-2 header-style-4">
              <div className="main-header line">
                  <div className="container">
                      <div className="row wrapper-header align-items-center">
                          <div className="col-md-4 col-3 tf-lg-hidden">
                              <a href="#mobileMenu" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16"
                                      fill="none">
                                      <path
                                          d="M2.00056 2.28571H16.8577C17.1608 2.28571 17.4515 2.16531 17.6658 1.95098C17.8802 1.73665 18.0006 1.44596 18.0006 1.14286C18.0006 0.839753 17.8802 0.549063 17.6658 0.334735C17.4515 0.120408 17.1608 0 16.8577 0H2.00056C1.69745 0 1.40676 0.120408 1.19244 0.334735C0.978109 0.549063 0.857702 0.839753 0.857702 1.14286C0.857702 1.44596 0.978109 1.73665 1.19244 1.95098C1.40676 2.16531 1.69745 2.28571 2.00056 2.28571ZM0.857702 8C0.857702 7.6969 0.978109 7.40621 1.19244 7.19188C1.40676 6.97755 1.69745 6.85714 2.00056 6.85714H22.572C22.8751 6.85714 23.1658 6.97755 23.3801 7.19188C23.5944 7.40621 23.7148 7.6969 23.7148 8C23.7148 8.30311 23.5944 8.59379 23.3801 8.80812C23.1658 9.02245 22.8751 9.14286 22.572 9.14286H2.00056C1.69745 9.14286 1.40676 9.02245 1.19244 8.80812C0.978109 8.59379 0.857702 8.30311 0.857702 8ZM0.857702 14.8571C0.857702 14.554 0.978109 14.2633 1.19244 14.049C1.40676 13.8347 1.69745 13.7143 2.00056 13.7143H12.2863C12.5894 13.7143 12.8801 13.8347 13.0944 14.049C13.3087 14.2633 13.4291 14.554 13.4291 14.8571C13.4291 15.1602 13.3087 15.4509 13.0944 15.6653C12.8801 15.8796 12.5894 16 12.2863 16H2.00056C1.69745 16 1.40676 15.8796 1.19244 15.6653C0.978109 15.4509 0.857702 15.1602 0.857702 14.8571Z"
                                          fill="currentColor"></path>
                                  </svg>
                              </a>
                          </div>
                          <div className="col-md-4 col-6">
                              <a href="index-2.html" className="logo-header">
                                  <img src={logo} alt="logo" className="logo"/>
                              </a>
                          </div>
                          <div className="col-md-4 col-6 tf-md-hidden">
                            <Search
                                results={searchResults}
                                onSearch={handleSearch}
                                onButtonClick={handleButtonClick}
                                className="custom-header-search"
                                placeholder="Search for fresh groceries..."
                            />
                          </div>
                          <div className="col-md-4 col-3">
                              <ul className="nav-icon d-flex justify-content-end align-items-center gap-20">
                                  <li className="nav-search"><a href="#canvasSearch" data-bs-toggle="offcanvas"
                                          aria-controls="offcanvasLeft" className="nav-icon-item"><i
                                              className="icon icon-search"></i></a></li>
                                    <li className="nav-account cart-lg"><Link to="/admin/"
                                          className="text-decoratio-none nav-icon-item align-items-center gap-10"><i
                                              className="icon icon-account"></i> <span className="text">Admin</span></Link></li>
                                  <li className="nav-account"><a href="#login" data-bs-toggle="modal"
                                          className="nav-icon-item align-items-center gap-10"><i
                                              className="icon icon-account"></i> <span className="text">Login</span></a></li>
                                  <li className="nav-compare"><a href="compare.html"
                                          className="nav-icon-item align-items-center gap-10"><i
                                              className="icon icon-compare"></i><span className="text">Compare</span></a></li>
                                  <li className="nav-wishlist"><a href="wishlist.html"
                                          className="nav-icon-item  align-items-center gap-10"><i
                                              className="icon icon-heart"></i><span className="text">Wishlist</span></a></li>
                                  <li className="nav-cart cart-lg"><a href="#shoppingCart" data-bs-toggle="modal"
                                          className="nav-icon-item"><i className="icon icon-bag"></i><span
                                              className="count-box">6</span></a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="header-bottom line tf-md-hidden">
                  <div className="container">
                      <div className="wrapper-header d-flex justify-content-between align-items-center">
                          <div className="box-left">
                              <div className="tf-list-categories">
                                  <a href="#" className="categories-title">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                                          fill="none">
                                          <path
                                              d="M4.83416 0H1.61897C0.726277 0 0 0.726277 0 1.61897V4.83416C0 5.72685 0.726277 6.45312 1.61897 6.45312H4.83416C5.72685 6.45312 6.45312 5.72685 6.45312 4.83416V1.61897C6.45312 0.726277 5.72685 0 4.83416 0ZM5.35938 4.83416C5.35938 5.12375 5.12375 5.35938 4.83416 5.35938H1.61897C1.32937 5.35938 1.09375 5.12375 1.09375 4.83416V1.61897C1.09375 1.32937 1.32937 1.09375 1.61897 1.09375H4.83416C5.12375 1.09375 5.35938 1.32937 5.35938 1.61897V4.83416ZM12.3594 0H9.1875C8.28286 0 7.54688 0.735984 7.54688 1.64062V4.8125C7.54688 5.71714 8.28286 6.45312 9.1875 6.45312H12.3594C13.264 6.45312 14 5.71714 14 4.8125V1.64062C14 0.735984 13.264 0 12.3594 0ZM12.9062 4.8125C12.9062 5.11405 12.6609 5.35938 12.3594 5.35938H9.1875C8.88595 5.35938 8.64062 5.11405 8.64062 4.8125V1.64062C8.64062 1.33908 8.88595 1.09375 9.1875 1.09375H12.3594C12.6609 1.09375 12.9062 1.33908 12.9062 1.64062V4.8125ZM4.83416 7.54688H1.61897C0.726277 7.54688 0 8.27315 0 9.16584V12.381C0 13.2737 0.726277 14 1.61897 14H4.83416C5.72685 14 6.45312 13.2737 6.45312 12.381V9.16584C6.45312 8.27315 5.72685 7.54688 4.83416 7.54688ZM5.35938 12.381C5.35938 12.6706 5.12375 12.9062 4.83416 12.9062H1.61897C1.32937 12.9062 1.09375 12.6706 1.09375 12.381V9.16584C1.09375 8.87625 1.32937 8.64062 1.61897 8.64062H4.83416C5.12375 8.64062 5.35938 8.87625 5.35938 9.16584V12.381ZM12.3594 7.54688H9.1875C8.28286 7.54688 7.54688 8.28286 7.54688 9.1875V12.3594C7.54688 13.264 8.28286 14 9.1875 14H12.3594C13.264 14 14 13.264 14 12.3594V9.1875C14 8.28286 13.264 7.54688 12.3594 7.54688ZM12.9062 12.3594C12.9062 12.6609 12.6609 12.9062 12.3594 12.9062H9.1875C8.88595 12.9062 8.64062 12.6609 8.64062 12.3594V9.1875C8.64062 8.88595 8.88595 8.64062 9.1875 8.64062H12.3594C12.6609 8.64062 12.9062 8.88595 12.9062 9.1875V12.3594Z"
                                              fill="currentColor"></path>
                                      </svg>
                                      Browse All Categories
                                  </a>
                                  <div className="list-categories-inner toolbar-shop-mobile">
                                      <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                                          <li className="nav-mb-item">
                                              <a href="shop-default.html" className="tf-category-link mb-menu-link">
                                                  <div className="image">
                                                      <img src="images/shop/cate/cate1.jpg" alt=""/>
                                                  </div>
                                                  <span className="link">Accessories</span>
                                              </a>
                                          </li>
                                          <li className="nav-mb-item">
                                              <a href="shop-default.html" className="tf-category-link mb-menu-link">
                                                  <div className="image">
                                                      <img src="images/shop/cate/cate2.jpg" alt=""/>
                                                  </div>
                                                  <span className="link">Dog</span>
                                              </a>
                                          </li>
                                          <li className="nav-mb-item">
                                              <a href="shop-default.html" className="tf-category-link mb-menu-link">
                                                  <div className="image">
                                                      <img src="images/shop/cate/cate3.jpg" alt=""/>
                                                  </div>
                                                  <span className="link">Grocery</span>
                                              </a>
                                          </li>
                                          <li className="nav-mb-item">
                                              <a href="shop-default.html" className="tf-category-link mb-menu-link">
                                                  <div className="image">
                                                      <img src="images/shop/cate/cate4.png" alt=""/>
                                                  </div>
                                                  <span className="link">Handbag</span>
                                              </a>
                                          </li>
                                          <li className="nav-mb-item">
                                              <a href="#cate-menu-one"
                                                  className="tf-category-link has-children collapsed mb-menu-link"
                                                  data-bs-toggle="collapse" aria-expanded="true"
                                                  aria-controls="cate-menu-one">
                                                  <div className="image">
                                                      <img src="images/shop/cate/cate5.jpg" alt=""/>
                                                  </div>
                                                  <span className="link">Fashion</span>
                                                  <span className="btn-open-sub"></span>
                                              </a>
                                              <div id="cate-menu-one" className="collapse list-cate">
                                                  <ul className="sub-nav-menu" id="cate-menu-navigation">
                                                      <li>
                                                          <a href="#cate-shop-one"
                                                              className="tf-category-link has-children sub-nav-link collapsed"
                                                              data-bs-toggle="collapse" aria-expanded="true"
                                                              aria-controls="cate-shop-one">
                                                              <div className="image">
                                                                  <img src="images/shop/cate/cate6.jpg" alt=""/>
                                                              </div>
                                                              <span>Mens</span>
                                                              <span className="btn-open-sub"></span>
                                                          </a>
                                                          <div id="cate-shop-one" className="collapse">
                                                              <ul className="sub-nav-menu sub-menu-level-2">
                                                                  <li>
                                                                      <a href="shop-default.html"
                                                                          className="tf-category-link sub-nav-link">
                                                                          <div className="image">
                                                                              <img src="images/shop/cate/cate1.jpg"
                                                                                  alt=""/>
                                                                          </div>
                                                                          <span>Accessories</span>
                                                                      </a>
                                                                  </li>
                                                                  <li>
                                                                      <a href="shop-default.html"
                                                                          className="tf-category-link sub-nav-link">
                                                                          <div className="image">
                                                                              <img src="images/shop/cate/cate8.jpg"
                                                                                  alt=""/>
                                                                          </div>
                                                                          <span>Shoes</span>
                                                                      </a>
                                                                  </li>
                                                              </ul>
                                                          </div>
                                                      </li>
                                                      <li>
                                                          <a href="#cate-shop-two"
                                                              className="tf-category-link has-children sub-nav-link collapsed"
                                                              data-bs-toggle="collapse" aria-expanded="true"
                                                              aria-controls="cate-shop-two">
                                                              <div className="image">
                                                                  <img src="images/shop/cate/cate9.jpg" alt=""/>
                                                              </div>
                                                              <span>Womens</span>
                                                              <span className="btn-open-sub"></span>
                                                          </a>
                                                          <div id="cate-shop-two" className="collapse">
                                                              <ul className="sub-nav-menu sub-menu-level-2">
                                                                  <li>
                                                                      <a href="shop-default.html"
                                                                          className="tf-category-link sub-nav-link">
                                                                          <div className="image">
                                                                              <img src="images/shop/cate/cate4.png"
                                                                                  alt=""/>
                                                                          </div>
                                                                          <span>Handbag</span>
                                                                      </a>
                                                                  </li>
                                                                  <li>
                                                                      <a href="shop-default.html"
                                                                          className="tf-category-link sub-nav-link">
                                                                          <div className="image">
                                                                              <img src="images/shop/cate/cate7.jpg"
                                                                                  alt=""/>
                                                                          </div>
                                                                          <span>Tee</span>
                                                                      </a>
                                                                  </li>
                                                              </ul>
                                                          </div>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </li>
                                          <li className="nav-mb-item">
                                              <a href="#cate-menu-two"
                                                  className="tf-category-link has-children collapsed mb-menu-link"
                                                  data-bs-toggle="collapse" aria-expanded="true"
                                                  aria-controls="cate-menu-two">
                                                  <div className="image">
                                                      <img src="images/shop/cate/cate6.jpg" alt=""/>
                                                  </div>
                                                  <span className="link">Men</span>
                                                  <span className="btn-open-sub"></span>
                                              </a>
                                              <div id="cate-menu-two" className="collapse list-cate">
                                                  <ul className="sub-nav-menu" id="cate-menu-navigation1">
                                                      <li>
                                                          <a href="shop-default.html"
                                                              className="tf-category-link sub-nav-link">
                                                              <div className="image">
                                                                  <img src="images/shop/cate/cate1.jpg" alt=""/>
                                                              </div>
                                                              <span>Accessories</span>
                                                          </a>
                                                      </li>
                                                      <li>
                                                          <a href="shop-default.html"
                                                              className="tf-category-link sub-nav-link">
                                                              <div className="image">
                                                                  <img src="images/shop/cate/cate8.jpg" alt=""/>
                                                              </div>
                                                              <span>Shoes</span>
                                                          </a>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </li>
                                          <li className="nav-mb-item">
                                              <a href="shop-default.html" className="tf-category-link mb-menu-link">
                                                  <div className="image">
                                                      <img src="images/shop/cate/cate7.jpg" alt=""/>
                                                  </div>
                                                  <span className="link">Tee</span>
                                              </a>
                                          </li>
                                          <li className="nav-mb-item">
                                              <a href="shop-default.html" className="tf-category-link mb-menu-link">
                                                  <div className="image">
                                                      <img src="images/shop/cate/cate8.jpg" alt=""/>
                                                  </div>
                                                  <span className="link">Shoes</span>
                                              </a>
                                          </li>
                                          <li className="nav-mb-item">
                                              <a href="#cate-menu-three"
                                                  className="tf-category-link has-children collapsed mb-menu-link"
                                                  data-bs-toggle="collapse" aria-expanded="true"
                                                  aria-controls="cate-menu-three">
                                                  <div className="image">
                                                      <img src="images/shop/cate/cate9.jpg" alt=""/>
                                                  </div>
                                                  <span className="link">Women</span>
                                                  <span className="btn-open-sub"></span>
                                              </a>
                                              <div id="cate-menu-three" className="collapse list-cate">
                                                  <ul className="sub-nav-menu" id="cate-menu-navigation2">
                                                      <li>
                                                          <a href="shop-default.html"
                                                              className="tf-category-link sub-nav-link">
                                                              <div className="image">
                                                                  <img src="images/shop/cate/cate4.png" alt=""/>
                                                              </div>
                                                              <span>Handbag</span>
                                                          </a>
                                                      </li>
                                                      <li>
                                                          <a href="shop-default.html"
                                                              className="tf-category-link sub-nav-link">
                                                              <div className="image">
                                                                  <img src="images/shop/cate/cate7.jpg" alt=""/>
                                                              </div>
                                                              <span>Tee</span>
                                                          </a>
                                                      </li>
                                                  </ul>
                                              </div>
                                          </li>
                                      </ul>
                                      <div className="categories-bottom">
                                          <a href="shop-collection-sub.html"
                                              className="tf-btn btn-line collection-other-link"><span>View all
                                                  collection</span><i className="icon icon-arrow1-top-left"></i></a>
                                      </div>
                                  </div>
                              </div>
                              <nav className="box-navigation text-center">
                                  <ul className="box-nav-ul d-flex align-items-center justify-content-center gap-30">
                                      <li className="menu-item">
                                          <a href="#" className="item-link">Home<i className="icon icon-arrow-down"></i></a>
                                          <div className="sub-menu mega-menu">
                                              <div className="container">
                                                  <div className="row-demo">
                                                      <div className="demo-item">
                                                          <a href="index-2.html">
                                                              <div className="demo-image position-relative">
                                                                  <img className="lazyload" data-src="images/demo/home-01.jpg"
                                                                      src="images/demo/home-01.jpg" alt="home-01"/>
                                                                  <div className="demo-label">
                                                                      <span className="demo-new">New</span>
                                                                      <span>Trend</span>
                                                                  </div>
                                                              </div>
                                                              <span className="demo-name">Home Fashion 01</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item">
                                                          <a href="home-multi-brand.html">
                                                              <div className="demo-image position-relative">
                                                                  <img className="lazyload"
                                                                      data-src="images/demo/home-multi-brand.jpg"
                                                                      src="images/demo/home-multi-brand.jpg"
                                                                      alt="home-multi-brand"/>
                                                                  <div className="demo-label">
                                                                      <span className="demo-new">New</span>
                                                                      <span className="demo-hot">Hot</span>
                                                                  </div>
                                                              </div>
                                                              <span className="demo-name">Home Multi Brand</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item">
                                                          <a href="home-02.html">
                                                              <div className="demo-image position-relative">
                                                                  <img className="lazyload" data-src="images/demo/home-02.jpg"
                                                                      src="images/demo/home-02.jpg" alt="home-02"/>
                                                                  <div className="demo-label">
                                                                      <span className="demo-hot">Hot</span>
                                                                  </div>
                                                              </div>
                                                              <span className="demo-name">Home Fashion 02</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item">
                                                          <a href="home-03.html">
                                                              <div className="demo-image">
                                                                  <img className="lazyload" data-src="images/demo/home-03.jpg"
                                                                      src="images/demo/home-03.jpg" alt="home-03"/>
                                                              </div>
                                                              <span className="demo-name">Home Fashion 03</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item">
                                                          <a href="home-04.html">
                                                              <div className="demo-image">
                                                                  <img className="lazyload" data-src="images/demo/home-04.jpg"
                                                                      src="images/demo/home-04.jpg" alt="home-04"/>
                                                              </div>
                                                              <span className="demo-name">Home Fashion 04</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item">
                                                          <a href="home-05.html">
                                                              <div className="demo-image">
                                                                  <img className="lazyload" data-src="images/demo/home-05.jpg"
                                                                      src="images/demo/home-05.jpg" alt="home-05"/>
                                                              </div>
                                                              <span className="demo-name">Home Fashion 05</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item">
                                                          <a href="home-06.html">
                                                              <div className="demo-image position-relative">
                                                                  <img className="lazyload" data-src="images/demo/home-06.jpg"
                                                                      src="images/demo/home-06.jpg" alt="home-06"/>
                                                              </div>
                                                              <span className="demo-name">Home Fashion 06</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item position-relative">
                                                          <a href="home-drinkwear.html">
                                                              <div className="demo-image">
                                                                  <img className="lazyload"
                                                                      data-src="images/demo/home-drinkwear.png"
                                                                      src="images/demo/home-drinkwear.png"
                                                                      alt="home-personalized-pod"/>
                                                                  <div className="demo-label">
                                                                      <span className="demo-new">New</span>
                                                                  </div>
                                                              </div>
                                                              <span className="demo-name">Home Drinkwear</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item position-relative">
                                                          <a href="home-supplement.html">
                                                              <div className="demo-image">
                                                                  <img className="lazyload"
                                                                      data-src="images/demo/home-supplement.png"
                                                                      src="images/demo/home-supplement.png"
                                                                      alt="home-personalized-pod"/>
                                                                  <div className="demo-label">
                                                                      <span className="demo-new">New</span>
                                                                  </div>
                                                              </div>
                                                              <span className="demo-name">Home Supplement</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item">
                                                          <a href="home-personalized-pod.html">
                                                              <div className="demo-image">
                                                                  <img className="lazyload"
                                                                      data-src="images/demo/home-personalized-pod.jpg"
                                                                      src="images/demo/home-personalized-pod.jpg"
                                                                      alt="home-personalized-pod"/>
                                                              </div>
                                                              <span className="demo-name">Home Personalized Pod</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item">
                                                          <a href="home-pickleball.html">
                                                              <div className="demo-image">
                                                                  <img className="lazyload"
                                                                      data-src="images/demo/home-pickleball.png"
                                                                      src="images/demo/home-pickleball.png"
                                                                      alt="home-pickleball"/>
                                                              </div>
                                                              <span className="demo-name">Home Pickleball</span>
                                                          </a>
                                                      </div>
                                                      <div className="demo-item">
                                                          <a href="home-ceramic.html">
                                                              <div className="demo-image">
                                                                  <img className="lazyload"
                                                                      data-src="images/demo/home-ceramic.png"
                                                                      src="images/demo/home-ceramic.png" alt="home-ceramic"/>
                                                              </div>
                                                              <span className="demo-name">Home Ceramic</span>
                                                          </a>
                                                      </div>
                                                  </div>
                                                  <div className="text-center view-all-demo">
                                                      <a href="#modalDemo" data-bs-toggle="modal"
                                                          className="tf-btn btn-xl btn-fill radius-3 animate-hover-btn fw-6"><span>View
                                                              all demos (48+)</span><i
                                                              className="icon icon-arrow-right"></i></a>
                                                  </div>
                                              </div>
                                          </div>
                                      </li>
                                      <li className="menu-item">
                                          <a href="#" className="item-link">Shop<i className="icon icon-arrow-down"></i></a>
                                          <div className="sub-menu mega-menu">
                                              <div className="container">
                                                  <div className="row">
                                                      <div className="col-lg-2">
                                                          <div className="mega-menu-item">
                                                              <div className="menu-heading">Shop layouts</div>
                                                              <ul className="menu-list">
                                                                  <li><a href="shop-default.html"
                                                                          className="menu-link-text link">Default</a></li>
                                                                  <li><a href="shop-left-sidebar.html"
                                                                          className="menu-link-text link">Left sidebar</a>
                                                                  </li>
                                                                  <li><a href="shop-right-sidebar.html"
                                                                          className="menu-link-text link">Right sidebar</a>
                                                                  </li>
                                                                  <li><a href="shop-fullwidth.html"
                                                                          className="menu-link-text link">Fullwidth</a></li>
                                                                  <li><a href="shop-collection-sub.html"
                                                                          className="menu-link-text link">Sub collection</a>
                                                                  </li>
                                                                  <li><a href="shop-collection-list.html"
                                                                          className="menu-link-text link">Collections list</a>
                                                                  </li>
                                                              </ul>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-2">
                                                          <div className="mega-menu-item">
                                                              <div className="menu-heading">Features</div>
                                                              <ul className="menu-list">
                                                                  <li><a href="shop-link.html"
                                                                          className="menu-link-text link">Pagination links</a>
                                                                  </li>
                                                                  <li><a href="shop-loadmore.html"
                                                                          className="menu-link-text link">Pagination
                                                                          loadmore</a></li>
                                                                  <li><a href="shop-infinite-scrolling.html"
                                                                          className="menu-link-text link">Pagination infinite
                                                                          scrolling</a></li>
                                                                  <li><a href="shop-filter-sidebar.html"
                                                                          className="menu-link-text link">Filter sidebar</a>
                                                                  </li>
                                                                  <li><a href="shop-filter-hidden.html"
                                                                          className="menu-link-text link">Filter hidden</a>
                                                                  </li>
                                                              </ul>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-2">
                                                          <div className="mega-menu-item">
                                                              <div className="menu-heading">Product styles</div>
                                                              <ul className="menu-list">

                                                                  <li><a href="product-style-01.html"
                                                                          className="menu-link-text link">Product style 01</a>
                                                                  </li>
                                                                  <li><a href="product-style-02.html"
                                                                          className="menu-link-text link">Product style 02</a>
                                                                  </li>
                                                                  <li><a href="product-style-03.html"
                                                                          className="menu-link-text link">Product style 03</a>
                                                                  </li>
                                                                  <li><a href="product-style-04.html"
                                                                          className="menu-link-text link">Product style 04</a>
                                                                  </li>
                                                                  <li><a href="product-style-05.html"
                                                                          className="menu-link-text link">Product style 05</a>
                                                                  </li>
                                                                  <li><a href="product-style-06.html"
                                                                          className="menu-link-text link">Product style 06</a>
                                                                  </li>
                                                                  <li><a href="product-style-07.html"
                                                                          className="menu-link-text link">Product style 07</a>
                                                                  </li>
                                                              </ul>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-3">
                                                          <div className="collection-item hover-img">
                                                              <div className="collection-inner">
                                                                  <a href="shop-men.html"
                                                                      className="collection-image img-style">
                                                                      <img className="lazyload"
                                                                          data-src="images/collections/collection-1.jpg"
                                                                          src="images/collections/collection-1.jpg"
                                                                          alt="collection-demo-1"/>
                                                                  </a>
                                                                  <div className="collection-content">
                                                                      <a href="shop-men.html"
                                                                          className="tf-btn hover-icon btn-xl collection-title fs-16"><span>Men</span><i
                                                                              className="icon icon-arrow1-top-left"></i></a>

                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-3">
                                                          <div className="collection-item hover-img">
                                                              <div className="collection-inner">
                                                                  <a href="shop-women.html"
                                                                      className="collection-image img-style">
                                                                      <img className="lazyload"
                                                                          data-src="images/collections/collection-2.jpg"
                                                                          src="images/collections/collection-2.jpg"
                                                                          alt="collection-demo-1"/>
                                                                  </a>
                                                                  <div className="collection-content">
                                                                      <a href="shop-women.html"
                                                                          className="tf-btn btn-xl collection-title fs-16 hover-icon"><span>Women</span><i
                                                                              className="icon icon-arrow1-top-left"></i></a>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </li>
                                      <li className="menu-item">
                                          <a href="#" className="item-link">Products<i className="icon icon-arrow-down"></i></a>
                                          <div className="sub-menu mega-menu">
                                              <div className="container">
                                                  <div className="row">
                                                      <div className="col-lg-2">
                                                          <div className="mega-menu-item">
                                                              <div className="menu-heading">Product layouts</div>
                                                              <ul className="menu-list">
                                                                  <li><a href="product-detail.html"
                                                                          className="menu-link-text link">Product default</a>
                                                                  </li>
                                                                  <li><a href="product-grid-1.html"
                                                                          className="menu-link-text link">Product grid 1</a>
                                                                  </li>
                                                                  <li><a href="product-grid-2.html"
                                                                          className="menu-link-text link">Product grid 2</a>
                                                                  </li>
                                                                  <li><a href="product-stacked.html"
                                                                          className="menu-link-text link">Product stacked</a>
                                                                  </li>
                                                                  <li><a href="product-right-thumbnails.html"
                                                                          className="menu-link-text link">Product right
                                                                          thumbnails</a></li>
                                                                  <li><a href="product-bottom-thumbnails.html"
                                                                          className="menu-link-text link">Product bottom
                                                                          thumbnails</a></li>
                                                                  <li><a href="product-drawer-sidebar.html"
                                                                          className="menu-link-text link">Product drawer
                                                                          sidebar</a></li>
                                                                  <li><a href="product-description-accordion.html"
                                                                          className="menu-link-text link">Product description
                                                                          accordion</a></li>
                                                                  <li><a href="product-description-list.html"
                                                                          className="menu-link-text link">Product description
                                                                          list</a></li>
                                                                  <li><a href="product-description-vertical.html"
                                                                          className="menu-link-text link">Product description
                                                                          vertical</a></li>
                                                              </ul>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-2">
                                                          <div className="mega-menu-item">
                                                              <div className="menu-heading">Product details</div>
                                                              <ul className="menu-list">
                                                                  <li><a href="product-inner-zoom.html"
                                                                          className="menu-link-text link">Product inner
                                                                          zoom</a></li>
                                                                  <li><a href="product-zoom-magnifier.html"
                                                                          className="menu-link-text link">Product zoom
                                                                          magnifier</a></li>
                                                                  <li><a href="product-no-zoom.html"
                                                                          className="menu-link-text link">Product no zoom</a>
                                                                  </li>
                                                                  <li><a href="product-photoswipe-popup.html"
                                                                          className="menu-link-text link">Product photoswipe
                                                                          popup</a></li>
                                                                  <li><a href="product-zoom-popup.html"
                                                                          className="menu-link-text link">Product external
                                                                          zoom and photoswipe popup</a></li>
                                                                  <li><a href="product-video.html"
                                                                          className="menu-link-text link">Product video</a>
                                                                  </li>
                                                                  <li><a href="product-3d.html"
                                                                          className="menu-link-text link">Product 3D, AR
                                                                          models</a></li>
                                                                  <li><a href="product-options-customizer.html"
                                                                          className="menu-link-text link">Product options &
                                                                          customizer</a></li>
                                                                  <li><a href="product-advanced-types.html"
                                                                          className="menu-link-text link">Advanced product
                                                                          types</a></li>
                                                                  <li><a href="product-giftcard.html"
                                                                          className="menu-link-text link">Recipient
                                                                          information form for gift card products</a></li>
                                                              </ul>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-2">
                                                          <div className="mega-menu-item">
                                                              <div className="menu-heading">Product swatchs</div>
                                                              <ul className="menu-list">
                                                                  <li><a href="product-color-swatch.html"
                                                                          className="menu-link-text link">Product color
                                                                          swatch</a></li>
                                                                  <li><a href="product-rectangle.html"
                                                                          className="menu-link-text link">Product
                                                                          rectangle</a></li>
                                                                  <li><a href="product-rectangle-color.html"
                                                                          className="menu-link-text link">Product rectangle
                                                                          color</a></li>
                                                                  <li><a href="product-swatch-image.html"
                                                                          className="menu-link-text link">Product swatch
                                                                          image</a></li>
                                                                  <li><a href="product-swatch-image-rounded.html"
                                                                          className="menu-link-text link">Product swatch image
                                                                          rounded</a></li>
                                                                  <li><a href="product-swatch-dropdown.html"
                                                                          className="menu-link-text link">Product swatch
                                                                          dropdown</a></li>
                                                                  <li><a href="product-swatch-dropdown-color.html"
                                                                          className="menu-link-text link">Product swatch
                                                                          dropdown color</a></li>
                                                              </ul>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-2">
                                                          <div className="mega-menu-item">
                                                              <div className="menu-heading">Product features</div>
                                                              <ul className="menu-list">
                                                                  <li><a href="product-frequently-bought-together.html"
                                                                          className="menu-link-text link">Frequently bought
                                                                          together</a></li>
                                                                  <li><a href="product-frequently-bought-together-2.html"
                                                                          className="menu-link-text link">Frequently bought
                                                                          together 2</a></li>
                                                                  <li><a href="product-upsell-features.html"
                                                                          className="menu-link-text link">Product upsell
                                                                          features</a></li>
                                                                  <li><a href="product-pre-orders.html"
                                                                          className="menu-link-text link">Product
                                                                          pre-orders</a></li>
                                                                  <li><a href="product-notification.html"
                                                                          className="menu-link-text link">Back in stock
                                                                          notification</a></li>
                                                                  <li><a href="product-pickup.html"
                                                                          className="menu-link-text link">Product pickup</a>
                                                                  </li>
                                                                  <li><a href="product-images-grouped.html"
                                                                          className="menu-link-text link">Variant images
                                                                          grouped</a></li>
                                                                  <li><a href="product-complimentary.html"
                                                                          className="menu-link-text link">Complimentary
                                                                          products</a></li>
                                                                  <li><a href="product-quick-order-list.html"
                                                                          className="menu-link-text link position-relative">Quick
                                                                          order list<div className="demo-label"><span
                                                                                  className="demo-new">New</span></div></a>
                                                                  </li>
                                                                  <li><a href="product-detail-volume-discount.html"
                                                                          className="menu-link-text link position-relative">Volume
                                                                          Discount<div className="demo-label"><span
                                                                                  className="demo-new">New</span></div></a>
                                                                  </li>
                                                                  <li><a href="product-detail-volume-discount-grid.html"
                                                                          className="menu-link-text link position-relative">Volume
                                                                          Discount Grid<div className="demo-label"><span
                                                                                  className="demo-new">New</span></div></a>
                                                                  </li>
                                                                  <li><a href="product-detail-buyx-gety.html"
                                                                          className="menu-link-text link position-relative">Buy
                                                                          X Get Y<div className="demo-label"><span
                                                                                  className="demo-new">New</span></div></a>
                                                                  </li>
                                                              </ul>
                                                          </div>
                                                      </div>
                                                      <div className="col-lg-4">
                                                          <div className="menu-heading">Best seller</div>
                                                          <div className="hover-sw-nav hover-sw-2">
                                                              <div dir="ltr" className="swiper tf-product-header">
                                                                  <div className="swiper-wrapper">
                                                                      <div className="swiper-slide" lazy="true">
                                                                          <div className="card-product">
                                                                              <div className="card-product-wrapper">
                                                                                  <a href="#" className="product-img">
                                                                                      <img className="lazyload img-product"
                                                                                          data-src="images/products/orange-1.jpg"
                                                                                          src="images/products/orange-1.jpg"
                                                                                          alt="image-product"/>
                                                                                      <img className="lazyload img-hover"
                                                                                          data-src="images/products/white-1.jpg"
                                                                                          src="images/products/white-1.jpg"
                                                                                          alt="image-product"/>
                                                                                  </a>
                                                                                  <div
                                                                                      className="list-product-btn absolute-2">
                                                                                      <a href="#quick_add"
                                                                                          data-bs-toggle="modal"
                                                                                          className="box-icon bg_white quick-add tf-btn-loading">
                                                                                          <span
                                                                                              className="icon icon-bag"></span>
                                                                                          <span className="tooltip">Quick
                                                                                              Add</span>
                                                                                      </a>
                                                                                      <a href="javascript:void(0);"
                                                                                          className="box-icon bg_white wishlist btn-icon-action">
                                                                                          <span
                                                                                              className="icon icon-heart"></span>
                                                                                          <span className="tooltip">Add to
                                                                                              Wishlist</span>
                                                                                          <span
                                                                                              className="icon icon-delete"></span>
                                                                                      </a>
                                                                                      <a href="#compare"
                                                                                          data-bs-toggle="offcanvas"
                                                                                          aria-controls="offcanvasLeft"
                                                                                          className="box-icon bg_white compare btn-icon-action">
                                                                                          <span
                                                                                              className="icon icon-compare"></span>
                                                                                          <span className="tooltip">Add to
                                                                                              Compare</span>
                                                                                          <span
                                                                                              className="icon icon-check"></span>
                                                                                      </a>
                                                                                      <a href="#quick_view"
                                                                                          data-bs-toggle="modal"
                                                                                          className="box-icon bg_white quickview tf-btn-loading">
                                                                                          <span
                                                                                              className="icon icon-view"></span>
                                                                                          <span className="tooltip">Quick
                                                                                              View</span>
                                                                                      </a>
                                                                                  </div>
                                                                              </div>
                                                                              <div className="card-product-info">
                                                                                  <a href="#" className="title link">Ribbed
                                                                                      Tank Top</a>
                                                                                  <span className="price">$16.95</span>
                                                                                  <ul className="list-color-product">
                                                                                      <li
                                                                                          className="list-color-item color-swatch active">
                                                                                          <span
                                                                                              className="tooltip">Orange</span>
                                                                                          <span
                                                                                              className="swatch-value bg_orange-3"></span>
                                                                                          <img className="lazyload"
                                                                                              data-src="images/products/orange-1.jpg"
                                                                                              src="images/products/orange-1.jpg"
                                                                                              alt="image-product"/>
                                                                                      </li>
                                                                                      <li
                                                                                          className="list-color-item color-swatch">
                                                                                          <span
                                                                                              className="tooltip">Black</span>
                                                                                          <span
                                                                                              className="swatch-value bg_dark"></span>
                                                                                          <img className="lazyload"
                                                                                              data-src="images/products/black-1.jpg"
                                                                                              src="images/products/black-1.jpg"
                                                                                              alt="image-product"/>
                                                                                      </li>
                                                                                      <li
                                                                                          className="list-color-item color-swatch">
                                                                                          <span
                                                                                              className="tooltip">White</span>
                                                                                          <span
                                                                                              className="swatch-value bg_white"></span>
                                                                                          <img className="lazyload"
                                                                                              data-src="images/products/white-1.jpg"
                                                                                              src="images/products/white-1.jpg"
                                                                                              alt="image-product"/>
                                                                                      </li>
                                                                                  </ul>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                      <div className="swiper-slide" lazy="true">
                                                                          <div className="card-product">
                                                                              <div className="card-product-wrapper">
                                                                                  <div className="product-img">
                                                                                      <img className="lazyload img-product"
                                                                                          data-src="images/products/white-3.jpg"
                                                                                          src="images/products/white-3.jpg"
                                                                                          alt="image-product"/>
                                                                                      <img className="lazyload img-hover"
                                                                                          data-src="images/products/white-4.jpg"
                                                                                          src="images/products/white-4.jpg"
                                                                                          alt="image-product"/>
                                                                                  </div>
                                                                                  <div
                                                                                      className="list-product-btn absolute-2">
                                                                                      <a href="#shoppingCart"
                                                                                          data-bs-toggle="modal"
                                                                                          className="box-icon bg_white quick-add tf-btn-loading">
                                                                                          <span
                                                                                              className="icon icon-bag"></span>
                                                                                          <span className="tooltip">Add to
                                                                                              cart</span>
                                                                                      </a>
                                                                                      <a href="javascript:void(0);"
                                                                                          className="box-icon bg_white wishlist btn-icon-action">
                                                                                          <span
                                                                                              className="icon icon-heart"></span>
                                                                                          <span className="tooltip">Add to
                                                                                              Wishlist</span>
                                                                                          <span
                                                                                              className="icon icon-delete"></span>
                                                                                      </a>
                                                                                      <a href="#compare"
                                                                                          data-bs-toggle="offcanvas"
                                                                                          aria-controls="offcanvasLeft"
                                                                                          className="box-icon bg_white compare btn-icon-action">
                                                                                          <span
                                                                                              className="icon icon-compare"></span>
                                                                                          <span className="tooltip">Add to
                                                                                              Compare</span>
                                                                                          <span
                                                                                              className="icon icon-check"></span>
                                                                                      </a>
                                                                                      <a href="#quick_view"
                                                                                          data-bs-toggle="modal"
                                                                                          className="box-icon bg_white quickview tf-btn-loading">
                                                                                          <span
                                                                                              className="icon icon-view"></span>
                                                                                          <span className="tooltip">Quick
                                                                                              View</span>
                                                                                      </a>
                                                                                  </div>
                                                                              </div>
                                                                              <div className="card-product-info">
                                                                                  <a href="#" className="title link">Oversized
                                                                                      Printed T-shirt</a>
                                                                                  <span className="price">$10.00</span>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                      <div className="swiper-slide" lazy="true">
                                                                          <div className="card-product">
                                                                              <div className="card-product-wrapper">
                                                                                  <div className="product-img">
                                                                                      <img className="lazyload img-product"
                                                                                          data-src="images/products/white-2.jpg"
                                                                                          src="images/products/white-2.jpg"
                                                                                          alt="image-product"/>
                                                                                      <img className="lazyload img-hover"
                                                                                          data-src="images/products/pink-1.jpg"
                                                                                          src="images/products/pink-1.jpg"
                                                                                          alt="image-product"/>
                                                                                  </div>
                                                                                  <div className="list-product-btn">
                                                                                      <a href="#quick_add"
                                                                                          data-bs-toggle="modal"
                                                                                          className="box-icon bg_white quick-add tf-btn-loading">
                                                                                          <span
                                                                                              className="icon icon-bag"></span>
                                                                                          <span className="tooltip">Quick
                                                                                              Add</span>
                                                                                      </a>
                                                                                      <a href="javascript:void(0);"
                                                                                          className="box-icon bg_white wishlist btn-icon-action">
                                                                                          <span
                                                                                              className="icon icon-heart"></span>
                                                                                          <span className="tooltip">Add to
                                                                                              Wishlist</span>
                                                                                          <span
                                                                                              className="icon icon-delete"></span>
                                                                                      </a>
                                                                                      <a href="#compare"
                                                                                          data-bs-toggle="offcanvas"
                                                                                          aria-controls="offcanvasLeft"
                                                                                          className="box-icon bg_white compare btn-icon-action">
                                                                                          <span
                                                                                              className="icon icon-compare"></span>
                                                                                          <span className="tooltip">Add to
                                                                                              Compare</span>
                                                                                          <span
                                                                                              className="icon icon-check"></span>
                                                                                      </a>
                                                                                      <a href="#quick_view"
                                                                                          data-bs-toggle="modal"
                                                                                          className="box-icon bg_white quickview tf-btn-loading">
                                                                                          <span
                                                                                              className="icon icon-view"></span>
                                                                                          <span className="tooltip">Quick
                                                                                              View</span>
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
                                                                                  <a href="#" className="title">Oversized
                                                                                      Printed T-shirt</a>
                                                                                  <span className="price">$16.95</span>
                                                                                  <ul className="list-color-product">
                                                                                      <li
                                                                                          className="list-color-item color-swatch active">
                                                                                          <span
                                                                                              className="tooltip">White</span>
                                                                                          <span
                                                                                              className="swatch-value bg_white"></span>
                                                                                          <img className="lazyload"
                                                                                              data-src="images/products/white-2.jpg"
                                                                                              src="images/products/white-2.jpg"
                                                                                              alt="image-product"/>
                                                                                      </li>
                                                                                      <li
                                                                                          className="list-color-item color-swatch">
                                                                                          <span
                                                                                              className="tooltip">Pink</span>
                                                                                          <span
                                                                                              className="swatch-value bg_purple"></span>
                                                                                          <img className="lazyload"
                                                                                              data-src="images/products/pink-1.jpg"
                                                                                              src="images/products/pink-1.jpg"
                                                                                              alt="image-product"/>
                                                                                      </li>
                                                                                      <li
                                                                                          className="list-color-item color-swatch">
                                                                                          <span
                                                                                              className="tooltip">Black</span>
                                                                                          <span
                                                                                              className="swatch-value bg_dark"></span>
                                                                                          <img className="lazyload"
                                                                                              data-src="images/products/black-2.jpg"
                                                                                              src="images/products/black-2.jpg"
                                                                                              alt="image-product"/>
                                                                                      </li>
                                                                                  </ul>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                      <div className="swiper-slide" lazy="true">
                                                                          <div className="card-product">
                                                                              <div className="card-product-wrapper">
                                                                                  <div className="product-img">
                                                                                      <img className="lazyload img-product"
                                                                                          data-src="images/products/brown-2.jpg"
                                                                                          src="images/products/brown-2.jpg"
                                                                                          alt="image-product"/>
                                                                                      <img className="lazyload img-hover"
                                                                                          data-src="images/products/brown-3.jpg"
                                                                                          src="images/products/brown-3.jpg"
                                                                                          alt="image-product"/>
                                                                                  </div>
                                                                                  <div className="size-list">
                                                                                      <span>S</span>
                                                                                      <span>M</span>
                                                                                      <span>L</span>
                                                                                      <span>XL</span>
                                                                                  </div>
                                                                                  <div className="list-product-btn">
                                                                                      <a href="#quick_add"
                                                                                          data-bs-toggle="modal"
                                                                                          className="box-icon bg_white quick-add tf-btn-loading">
                                                                                          <span
                                                                                              className="icon icon-bag"></span>
                                                                                          <span className="tooltip">Quick
                                                                                              Add</span>
                                                                                      </a>
                                                                                      <a href="javascript:void(0);"
                                                                                          className="box-icon bg_white wishlist btn-icon-action">
                                                                                          <span
                                                                                              className="icon icon-heart"></span>
                                                                                          <span className="tooltip">Add to
                                                                                              Wishlist</span>
                                                                                          <span
                                                                                              className="icon icon-delete"></span>
                                                                                      </a>
                                                                                      <a href="#compare"
                                                                                          data-bs-toggle="offcanvas"
                                                                                          aria-controls="offcanvasLeft"
                                                                                          className="box-icon bg_white compare btn-icon-action">
                                                                                          <span
                                                                                              className="icon icon-compare"></span>
                                                                                          <span className="tooltip">Add to
                                                                                              Compare</span>
                                                                                          <span
                                                                                              className="icon icon-check"></span>
                                                                                      </a>
                                                                                      <a href="#quick_view"
                                                                                          data-bs-toggle="modal"
                                                                                          className="box-icon bg_white quickview tf-btn-loading">
                                                                                          <span
                                                                                              className="icon icon-view"></span>
                                                                                          <span className="tooltip">Quick
                                                                                              View</span>
                                                                                      </a>
                                                                                  </div>
                                                                              </div>
                                                                              <div className="card-product-info">
                                                                                  <a href="#" className="title link">V-neck
                                                                                      linen T-shirt</a>
                                                                                  <span className="price">$114.95</span>
                                                                                  <ul className="list-color-product">
                                                                                      <li
                                                                                          className="list-color-item color-swatch active">
                                                                                          <span
                                                                                              className="tooltip">Brown</span>
                                                                                          <span
                                                                                              className="swatch-value bg_brown"></span>
                                                                                          <img className="lazyload"
                                                                                              data-src="images/products/brown-2.jpg"
                                                                                              src="images/products/brown-2.jpg"
                                                                                              alt="image-product"/>
                                                                                      </li>
                                                                                      <li
                                                                                          className="list-color-item color-swatch">
                                                                                          <span
                                                                                              className="tooltip">White</span>
                                                                                          <span
                                                                                              className="swatch-value bg_white"></span>
                                                                                          <img className="lazyload"
                                                                                              data-src="images/products/white-5.jpg"
                                                                                              src="images/products/white-5.jpg"
                                                                                              alt="image-product"/>
                                                                                      </li>
                                                                                  </ul>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              <div
                                                                  className="nav-sw nav-next-slider nav-next-product-header box-icon w_46 round">
                                                                  <span className="icon icon-arrow-left"></span>
                                                              </div>
                                                              <div
                                                                  className="nav-sw nav-prev-slider nav-prev-product-header box-icon w_46 round">
                                                                  <span className="icon icon-arrow-right"></span>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </li>
                                      <li className="menu-item position-relative">
                                          <a href="#" className="item-link">Pages<i className="icon icon-arrow-down"></i></a>
                                          <div className="sub-menu submenu-default">
                                              <ul className="menu-list">
                                                  <li>
                                                      <a href="about-us.html"
                                                          className="menu-link-text link text_black-2">About us</a>
                                                  </li>
                                                  <li className="menu-item-2">
                                                      <a href="#" className="menu-link-text link text_black-2">Brands</a>
                                                      <div className="sub-menu submenu-default">
                                                          <ul className="menu-list">
                                                              <li>
                                                                  <a href="brands.html"
                                                                      className="menu-link-text link text_black-2 position-relative">Brands
                                                                      <div className="demo-label"><span
                                                                              className="demo-new">New</span></div>
                                                                  </a>
                                                              </li>
                                                              <li><a href="brands-v2.html"
                                                                      className="menu-link-text link text_black-2">Brand
                                                                      V2</a></li>
                                                          </ul>
                                                      </div>
                                                  </li>
                                                  <li className="menu-item-2">
                                                      <a href="#" className="menu-link-text link text_black-2">Contact</a>
                                                      <div className="sub-menu submenu-default">
                                                          <ul className="menu-list">
                                                              <li><a href="contact-1.html"
                                                                      className="menu-link-text link text_black-2">Contact
                                                                      1</a></li>
                                                              <li><a href="contact-2.html"
                                                                      className="menu-link-text link text_black-2">Contact
                                                                      2</a></li>
                                                          </ul>
                                                      </div>
                                                  </li>
                                                  <li className="menu-item-2">
                                                      <a href="#" className="menu-link-text link text_black-2">FAQ</a>
                                                      <div className="sub-menu submenu-default">
                                                          <ul className="menu-list">
                                                              <li><a href="faq-1.html"
                                                                      className="menu-link-text link text_black-2">FAQ 01</a>
                                                              </li>
                                                              <li><a href="faq-2.html"
                                                                      className="menu-link-text link text_black-2">FAQ 02</a>
                                                              </li>
                                                          </ul>
                                                      </div>
                                                  </li>
                                                  <li className="menu-item-2">
                                                      <a href="#" className="menu-link-text link text_black-2">Store</a>
                                                      <div className="sub-menu submenu-default">
                                                          <ul className="menu-list">
                                                              <li><a href="our-store.html"
                                                                      className="menu-link-text link text_black-2">Our
                                                                      store</a></li>
                                                              <li><a href="store-locations.html"
                                                                      className="menu-link-text link text_black-2">Store
                                                                      locator</a></li>
                                                          </ul>
                                                      </div>
                                                  </li>
                                                  <li><a href="timeline.html"
                                                          className="menu-link-text link text_black-2 position-relative">Timeline
                                                          <div className="demo-label"><span className="demo-new">New</span></div>
                                                      </a></li>
                                                  <li><a href="view-cart.html"
                                                          className="menu-link-text link text_black-2 position-relative">View
                                                          cart</a></li>
                                                  <li><a href="checkout.html"
                                                          className="menu-link-text link text_black-2 position-relative">Check
                                                          out</a></li>
                                                  <li className="menu-item-2">
                                                      <a href="#" className="menu-link-text link text_black-2">Payment</a>
                                                      <div className="sub-menu submenu-default">
                                                          <ul className="menu-list">
                                                              <li><a href="payment-confirmation.html"
                                                                      className="menu-link-text link text_black-2">Payment
                                                                      Confirmation</a></li>
                                                              <li><a href="payment-failure.html"
                                                                      className="menu-link-text link text_black-2">Payment
                                                                      Failure</a></li>
                                                          </ul>
                                                      </div>
                                                  </li>
                                                  <li className="menu-item-2">
                                                      <a href="#" className="menu-link-text link text_black-2">My account</a>
                                                      <div className="sub-menu submenu-default">
                                                          <ul className="menu-list">
                                                              <li><a href="my-account.html"
                                                                      className="menu-link-text link text_black-2">My
                                                                      account</a></li>
                                                              <li><a href="my-account-orders.html"
                                                                      className="menu-link-text link text_black-2">My
                                                                      order</a></li>
                                                              <li><a href="my-account-orders-details.html"
                                                                      className="menu-link-text link text_black-2">My order
                                                                      details</a></li>
                                                              <li><a href="my-account-address.html"
                                                                      className="menu-link-text link text_black-2">My
                                                                      address</a></li>
                                                              <li><a href="my-account-edit.html"
                                                                      className="menu-link-text link text_black-2">My account
                                                                      details</a></li>
                                                              <li><a href="my-account-wishlist.html"
                                                                      className="menu-link-text link text_black-2">My
                                                                      wishlist</a></li>
                                                          </ul>
                                                      </div>
                                                  </li>
                                                  <li><a href="invoice.html"
                                                          className="menu-link-text link text_black-2 position-relative">Invoice</a>
                                                  </li>
                                                  <li><a href="404.html"
                                                          className="menu-link-text link text_black-2 position-relative">404</a>
                                                  </li>

                                              </ul>
                                          </div>
                                      </li>
                                      <li className="menu-item position-relative">
                                          <a href="#" className="item-link">Blog<i className="icon icon-arrow-down"></i></a>
                                          <div className="sub-menu submenu-default">
                                              <ul className="menu-list">
                                                  <li><a href="blog-grid.html"
                                                          className="menu-link-text link text_black-2">Grid layout</a></li>
                                                  <li><a href="blog-sidebar-left.html"
                                                          className="menu-link-text link text_black-2">Left sidebar</a></li>
                                                  <li><a href="blog-sidebar-right.html"
                                                          className="menu-link-text link text_black-2">Right sidebar</a></li>
                                                  <li><a href="blog-list.html"
                                                          className="menu-link-text link text_black-2">Blog list</a></li>
                                                  <li><a href="blog-detail.html"
                                                          className="menu-link-text link text_black-2">Single Post</a></li>
                                              </ul>
                                          </div>
                                      </li>
                                      <li className="menu-item"><a
                                              href="https://themeforest.net/item/ecomus-ultimate-html5-template/53417990?s_rank=3"
                                              className="item-link">Buy now</a></li>
                                  </ul>
                              </nav>
                          </div>
                          <div className="box-right">
                              <div className="icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"
                                      fill="none">
                                      <path fillRule="evenodd" clipRule="evenodd"
                                          d="M2.21989 13.7008C2.19942 13.7199 2.18295 13.743 2.17143 13.7685C2.1599 13.7941 2.15354 13.8217 2.15272 13.8497V18.5857C2.15272 19.4124 2.83298 20.0926 3.65962 20.0926H5.5256C5.64874 20.0926 5.74087 20.0005 5.74087 19.8774V13.8497C5.73977 13.793 5.71674 13.7389 5.6766 13.6987C5.63647 13.6586 5.58235 13.6356 5.5256 13.6345H2.36799C2.3118 13.6361 2.25855 13.66 2.21989 13.7008ZM0 13.8497C0.00339224 13.2228 0.253966 12.6224 0.697317 12.1791C1.14067 11.7357 1.74101 11.4851 2.36799 11.4817H5.5256C6.15335 11.4827 6.75513 11.7324 7.19902 12.1763C7.64291 12.6202 7.89268 13.222 7.89359 13.8497V19.8774C7.89428 20.1885 7.83349 20.4967 7.71473 20.7844C7.59597 21.072 7.42157 21.3333 7.20154 21.5533C6.98152 21.7733 6.7202 21.9477 6.4326 22.0665C6.14499 22.1852 5.83676 22.246 5.5256 22.2453H3.65962C1.64468 22.2453 0 20.6007 0 18.5857V13.8497Z"
                                          fill="#253D4E"></path>
                                      <path fillRule="evenodd" clipRule="evenodd"
                                          d="M13.9927 2.15272C12.8144 2.1517 11.6476 2.38302 10.5588 2.83344C9.47008 3.28386 8.48083 3.94455 7.64769 4.77769C6.81455 5.61083 6.15387 6.60007 5.70345 7.68882C5.25303 8.77756 5.02171 9.94444 5.02273 11.1227V12.5719C5.02273 12.8574 4.90933 13.1311 4.70747 13.333C4.50561 13.5348 4.23184 13.6482 3.94637 13.6482C3.6609 13.6482 3.38712 13.5348 3.18527 13.333C2.98341 13.1311 2.87001 12.8574 2.87001 12.5719V11.1227C2.87001 4.97451 7.84451 0 13.9927 0C20.1409 0 25.1154 4.97451 25.1154 11.1227V12.5581C25.1154 12.8436 25.002 13.1174 24.8001 13.3192C24.5982 13.5211 24.3245 13.6345 24.039 13.6345C23.7535 13.6345 23.4798 13.5211 23.2779 13.3192C23.076 13.1174 22.9626 12.8436 22.9626 12.5581V11.1227C22.9626 6.16281 18.9525 2.15272 13.9927 2.15272ZM24.107 20.1133C24.2457 20.1411 24.3775 20.1959 24.495 20.2746C24.6124 20.3534 24.7132 20.4545 24.7916 20.5722C24.87 20.6899 24.9244 20.8219 24.9517 20.9607C24.979 21.0994 24.9788 21.2422 24.9509 21.3808C24.1914 25.1601 20.859 28 16.8627 28H15.4281C15.1426 28 14.8689 27.8866 14.667 27.6847C14.4652 27.4829 14.3518 27.2091 14.3518 26.9236C14.3518 26.6382 14.4652 26.3644 14.667 26.1625C14.8689 25.9607 15.1426 25.8473 15.4281 25.8473H16.8627C18.2705 25.8473 19.635 25.3603 20.7245 24.4688C21.8141 23.5773 22.5617 22.3362 22.8404 20.9563C22.8967 20.6766 23.0617 20.4307 23.2992 20.2726C23.5367 20.1146 23.8273 20.0572 24.107 20.1133Z"
                                          fill="#253D4E"></path>
                                      <path fillRule="evenodd" clipRule="evenodd"
                                          d="M22.3117 13.7008C22.2912 13.7199 22.2747 13.743 22.2632 13.7685C22.2517 13.7941 22.2453 13.8217 22.2445 13.8497V19.8774C22.2445 19.9936 22.3444 20.0926 22.4598 20.0926H24.2543C25.124 20.0926 25.8326 19.3831 25.8326 18.5134V13.8497C25.8315 13.793 25.8085 13.7389 25.7684 13.6987C25.7282 13.6586 25.6741 13.6356 25.6174 13.6345H22.4598C22.4036 13.6361 22.3503 13.66 22.3117 13.7008ZM20.0918 13.8497C20.0952 13.2228 20.3457 12.6224 20.7891 12.1791C21.2324 11.7357 21.8328 11.4851 22.4598 11.4817H25.6174C26.2451 11.4827 26.8469 11.7324 27.2908 12.1763C27.7347 12.6202 27.9845 13.222 27.9854 13.8497V18.5134C27.9847 19.5028 27.5914 20.4515 26.8918 21.1512C26.1923 21.8509 25.2437 22.2444 24.2543 22.2453H22.4598C21.832 22.2444 21.2302 21.9947 20.7863 21.5508C20.3425 21.1069 20.0927 20.5051 20.0918 19.8774V13.8497Z"
                                          fill="#253D4E"></path>
                                  </svg>
                              </div>
                              <div className="number d-grid">
                                  <a href="tel:1900100888" className="phone">1900100888</a>
                                  <span className="fw-5 text">Support Center</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </header>
    )
}
export default Header;