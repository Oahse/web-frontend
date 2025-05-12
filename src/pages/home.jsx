import { useState } from 'react'

import slidegrocery1 from '@/assets/images/slider/slide-gocery1.jpg'
import slidegrocery2 from '@/assets/images/slider/slide-gocery2.jpg'
import slidegrocery3 from '@/assets/images/slider/slide-gocery3.jpg'
import grocery1 from '@/assets/images/products/grocery-1.jpg';
import grocery2 from '@/assets/images/products/grocery-2.jpg';
import grocery3 from '@/assets/images/products/grocery-3.jpg';
import grocery4 from '@/assets/images/products/grocery-4.jpg';
import grocery5 from '@/assets/images/products/grocery-5.jpg';
import grocery6 from '@/assets/images/products/grocery-6.jpg';
import vegetable from "@/assets/images/collections/vegetable.png"
import dairy from "@/assets/images/collections/dairy.png"
import packageFoods from "@/assets/images/collections/package-foods.png";
import beverage from "@/assets/images/collections/beverage.png";
import meat from "@/assets/images/collections/meat.png";
import fruit from "@/assets/images/collections/fruit.png";
import imgGrocery1 from '@/assets/images/collections/img-w-text-grocery1.jpg';
import imgGrocery2 from '@/assets/images/collections/img-w-text-grocery2.jpg';
import imgGrocery3 from '@/assets/images/collections/img-w-text-grocery3.jpg';
import groceryBanner from '@/assets/images/collections/banner-collection-grocery.jpg';
import groceryBanner2 from '@/assets/images/collections/banner-collection-grocery2.jpg';
import img1 from '@/assets/images/products/vegetable1.jpg';
import img2 from '@/assets/images/products/vegetable2.jpg';

import Footer from '@/components/footer'
import Tab from '@/components/tab'
import Icon from '@/components/Button/Icon'
import Grid from '@/components/grid'
import Card from '@/components/card/ProductCard'
import Scroller from '@/components/scroller'
import useDeviceType from '@/hooks/useDeviceType'; // Assuming this hook exists
import BannerCard from '@/components/card/BannerCard'
import Loader from '@/components/loader'
import Extras from '@/components/extra'
import Header from '@/components/toolbar/header'
import TopHeader from '@/components/toolbar/topHeader'
import Carousel from '@/components/carousel'
// import "./App.css";


// if you want to use array
const productsCategories = [
  {
    id: 'meat',
    name: 'Meat',
    href: '#meat',
    active: true,
    products: [
      { name: 'Beef Steak', price: '$15.00', images: [img1, img2] },
      { name: 'Chicken Breast', price: '$12.50', images: [img1, img2] },
      { name: 'Lamb Chops', price: '$18.75', images: [img1, img2] },
      { name: 'Turkey Legs', price: '$10.80', images: [img1, img2] },
      { name: 'Pork Ribs', price: '$14.60', images: [img1, img2] },
      { name: 'Sausages', price: '$9.50', images: [img1, img2] },
      { name: 'Ground Beef', price: '$11.20', images: [img1, img2] },
      { name: 'Duck Breast', price: '$16.30', images: [img1, img2] }
    ]
  },
  {
    id: 'oils',
    name: 'Oils',
    href: '#oils',
    active: false,
    products: [
      { name: 'Olive Oil', price: '$9.99', images: [img1, img2] },
      { name: 'Sunflower Oil', price: '$7.50', images: [img1, img2] },
      { name: 'Coconut Oil', price: '$8.25', images: [img1, img2] },
      { name: 'Avocado Oil', price: '$10.60', images: [img1, img2] },
      { name: 'Canola Oil', price: '$6.40', images: [img1, img2] },
      { name: 'Peanut Oil', price: '$7.80', images: [img1, img2] },
      { name: 'Sesame Oil', price: '$9.10', images: [img1, img2] },
      { name: 'Grapeseed Oil', price: '$8.75', images: [img1, img2] }
    ]
  },
  {
    id: 'fruits',
    name: 'Fruits',
    href: '#fruits',
    active: false,
    products: [
      { name: 'Bananas', price: '$4.20', images: [img1, img2] },
      { name: 'Apples', price: '$5.00', images: [img1, img2] },
      { name: 'Mangoes', price: '$6.30', images: [img1, img2] },
      { name: 'Grapes', price: '$4.50', images: [img1, img2] },
      { name: 'Oranges', price: '$3.90', images: [img1, img2] },
      { name: 'Strawberries', price: '$5.75', images: [img1, img2] },
      { name: 'Pineapple', price: '$3.80', images: [img1, img2] },
      { name: 'Blueberries', price: '$6.10', images: [img1, img2] }
    ]
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    href: '#tomatoes',
    active: false,
    products: [
      { name: 'Cherry Tomatoes', price: '$3.10', images: [img1, img2] },
      { name: 'Plum Tomatoes', price: '$3.90', images: [img1, img2] },
      { name: 'Heirloom Tomatoes', price: '$4.70', images: [img1, img2] },
      { name: 'Roma Tomatoes', price: '$2.80', images: [img1, img2] },
      { name: 'Grape Tomatoes', price: '$3.60', images: [img1, img2] },
      { name: 'Green Tomatoes', price: '$4.20', images: [img1, img2] },
      { name: 'Beefsteak Tomatoes', price: '$4.95', images: [img1, img2] },
      { name: 'Campari Tomatoes', price: '$4.35', images: [img1, img2] }
    ]
  },
  {
    id: 'soup',
    name: 'Soup',
    href: '#soup',
    active: false,
    products: [
      { name: 'Pumpkin Soup', price: '$5.50', images: [img1, img2] },
      { name: 'Tomato Basil Soup', price: '$4.80', images: [img1, img2] },
      { name: 'Chicken Noodle Soup', price: '$6.00', images: [img1, img2] },
      { name: 'Beef Barley Soup', price: '$6.90', images: [img1, img2] },
      { name: 'Vegetable Soup', price: '$5.20', images: [img1, img2] },
      { name: 'Lentil Soup', price: '$4.60', images: [img1, img2] },
      { name: 'Clam Chowder', price: '$7.10', images: [img1, img2] },
      { name: 'Minestrone Soup', price: '$5.85', images: [img1, img2] }
    ]
  },
  {
    id: 'dairy',
    name: 'Dairy',
    href: '#dairy',
    active: false,
    products: [
      { name: 'Milk', price: '$2.99', images: [img1, img2] },
      { name: 'Cheese', price: '$4.75', images: [img1, img2] },
      { name: 'Yogurt', price: '$3.60', images: [img1, img2] },
      { name: 'Butter', price: '$3.20', images: [img1, img2] },
      { name: 'Cream Cheese', price: '$2.80', images: [img1, img2] },
      { name: 'Sour Cream', price: '$2.95', images: [img1, img2] },
      { name: 'Whipping Cream', price: '$4.50', images: [img1, img2] },
      { name: 'Cottage Cheese', price: '$3.40', images: [img1, img2] }
    ]
  },
  {
    id: 'grains',
    name: 'Grains',
    href: '#grains',
    active: false,
    products: [
      { name: 'Rice', price: '$1.50/lb', images: [img1, img2] },
      { name: 'Quinoa', price: '$3.90', images: [img1, img2] },
      { name: 'Oats', price: '$2.20', images: [img1, img2] },
      { name: 'Barley', price: '$1.95', images: [img1, img2] },
      { name: 'Cornmeal', price: '$2.50', images: [img1, img2] },
      { name: 'Wheat Flour', price: '$1.80', images: [img1, img2] },
      { name: 'Millet', price: '$2.75', images: [img1, img2] },
      { name: 'Couscous', price: '$3.10', images: [img1, img2] }
    ]
  },
  {
    id: 'shop-all',
    name: 'Shop all',
    href: 'shop-collection-sub.html',
    active: false,
    icon: true,
    products: [] // Or aggregate all products here if needed
  }
];

function Home() {
  const { isMobile} = useDeviceType();
  const [loading, setLoading] = useState(false);
  const slides = [
    {
      img: slidegrocery1,
      headingone: "Don’t miss amazing",
      headingtwo: "grocery deals",
      body: "Save up to 30% off on your first order",
      btntext: "Shop collection"
    },
    {
      img: slidegrocery2,
      headingone: "Sweet Crunchy",
      headingtwo: "Salad",
      body: "Fresh and delicious options for you",
      btntext: "Explore Now"
    },
    {
      img: slidegrocery3,
      headingone: "Black Seedless",
      headingtwo: "Grapes",
      body: "Enjoy juicy grapes at a sweet price",
      btntext: "Buy Today"
    }
  ];
  const categories = [
    {
      img: vegetable,
      name: "Vegetables"
    },
    {
      img: dairy,
      name: "Best Deals"
    },
    {
      img: packageFoods,
      name: "Package Foods"
    },
    {
      img: beverage,
      name: "Beverages"
    },
    {
      img: meat,
      name: "Meat"
    },
    {
      img: fruit,
      name: "Fruit"
    },
    {
      img: packageFoods,
      name: "Mixed Food"
    }
  ];
  const banners = [
    {
      img: groceryBanner,
      subheading: 'Fresh & Organic',
      headingOne: 'Grocery Items',
      headingTwo: 'Delivered To You',
      btnText: 'Shop Now'
    },
    {
      img: groceryBanner2,
      subheading: 'Top Quality',
      headingOne: 'Fresh Meat',
      headingTwo: 'For Every Taste',
      btnText: 'Order Today'
    }
  ];
  
  return (
    <div  className="preload-wrapper color-primary-8 color-main-text-2 bg-white" >
        <a href="javascript:void(0);" id="toggle-rtl" className="tf-btn animate-hover-btn btn-fill">RTL</a>
        {loading && 
        <Loader />}
        <div id="wrapper">
            <TopHeader/>
            <Header/>
            <Carousel items={slides} />
            
            <section className="flat-spacing-30 flat-control-sw">
                <div className="container">
                    <div className="flat-title flex-row justify-content-between px-0">
                        <span className="title fw-6 wow fadeInUp" data-wow-delay="0s">Featured Categories</span>
                        <div className="box-sw-navigation">
                            <div className="sw-dots style-2 medium sw-pagination-recent justify-content-center"></div>
                        </div>
                    </div>
                    <Scroller items={categories}/>

                    
                    {/* <div dir="ltr" className="swiper tf-sw-recent wow fadeInUp" data-preview="6" data-tablet="3" data-mobile="2"
                        data-space-lg="30" data-space-md="30" data-space="15" data-pagination="2" data-pagination-md="3"
                        data-pagination-lg="3">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="collection-item-circle has-bg has-bg-2 hover-img">
                                    <a href="shop-default.html" className="collection-image img-style">
                                        <img className="lazyload" data-src="images/collections/vegetable.png"
                                            alt="collection-img" src="images/collections/vegetable.png"/>
                                    </a>
                                    <div className="collection-content text-center">
                                        <a href="shop-default.html" className="link title fw-5">Vegetables</a>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="collection-item-circle has-bg has-bg-2 hover-img">
                                    <a href="shop-default.html" className="collection-image img-style">
                                        <img className="lazyload" data-src="images/collections/dairy.png" alt="collection-img"
                                            src="images/collections/dairy.png"/>
                                    </a>
                                    <div className="collection-content text-center">
                                        <a href="shop-default.html" className="link title fw-5">Best Deals</a>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="collection-item-circle has-bg has-bg-2 hover-img">
                                    <a href="shop-default.html" className="collection-image img-style">
                                        <img className="lazyload" data-src="images/collections/package-foods.png"
                                            alt="collection-img" src="images/collections/package-foods.png"/>
                                    </a>
                                    <div className="collection-content text-center">
                                        <a href="shop-default.html" className="link title fw-5">Package Foods</a>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="collection-item-circle has-bg has-bg-2 hover-img">
                                    <a href="shop-default.html" className="collection-image img-style">
                                        <img className="lazyload" data-src="images/collections/beverage.png"
                                            alt="collection-img" src="images/collections/beverage.png"/>
                                    </a>
                                    <div className="collection-content text-center">
                                        <a href="shop-default.html" className="link title fw-5">Beverages</a>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="collection-item-circle has-bg has-bg-2 hover-img">
                                    <a href="shop-default.html" className="collection-image img-style">
                                        <img className="lazyload" data-src="images/collections/meat.png" alt="collection-img"
                                            src="images/collections/meat.png"/>
                                    </a>
                                    <div className="collection-content text-center">
                                        <a href="shop-default.html" className="link title fw-5">Meat</a>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="collection-item-circle has-bg has-bg-2 hover-img">
                                    <a href="shop-default.html" className="collection-image img-style">
                                        <img className="lazyload" data-src="images/collections/fruit.png" alt="collection-img"
                                            src="images/collections/fruit.png"/>
                                    </a>
                                    <div className="collection-content text-center">
                                        <a href="shop-default.html" className="link title fw-5">Fruit</a>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="collection-item-circle has-bg has-bg-2 hover-img">
                                    <a href="shop-collection-sub.html" className="collection-image img-style">
                                        <img className="lazyload" data-src="images/collections/package-foods.png"
                                            alt="collection-img" src="images/collections/package-foods.png"/>
                                    </a>
                                    <div className="collection-content text-center">
                                        <a href="shop-collection-sub.html" className="link title fw-5">Mixed food</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>
            <section className="flat-spacing-13 pt_0">
                <div className="container">
                    
                    <div dir="ltr" className="swiper tf-sw-collection" data-preview="2" data-tablet="2" data-mobile="1.2"
                        data-space-lg="30" data-space-md="30" data-space="15" data-loop="false" data-auto-play="false">
                        {isMobile?
                          <Scroller 
                            items={banners}
                            child = 'banner'
                            itemsPerView= {1} 
                            pagination={false}
                          />
                        :
                        <div className="tf-grid-layout tf-col-1 xl-col-2">
                            {banners.map((banner, index) =>(
                              <div key={index} className="swiper-slide">
                                <BannerCard img={banner.img} subheading={banner.subheading} headingOne={banner.headingOne} headingTwo={banner.headingTwo} btnText={banner.btnText} />
                            </div>
                            ))}
                        </div>}
                    </div>
                    
                </div>
            </section>
            <section className="flat-spacing-8">
                <div className="container">
                    <div className="flat-title flex-row justify-content-center px-0">
                        <span className="title fw-6 wow fadeInUp" data-wow-delay="0s">Deals Of The Day</span>
                    </div>
                    <div dir="ltr" className="swiper tf-sw-product-sell" data-preview="3" data-tablet="3" data-mobile="1"
                        data-space-lg="30" data-space-md="15" data-pagination="1" data-pagination-md="3"
                        data-pagination-lg="3">
                        <div className="tf-grid-layout tf-col-1 xl-col-3">
                            <div className="swiper-slide" lazy="true">
                                <div className="card-product style-8 border-0 bg_grey-14 lg">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src={grocery1}
                                                src={grocery1} alt="image-product"/>
                                            <img className="lazyload img-hover" data-src={grocery2}
                                                src={grocery2} alt="image-product"/>
                                        </a>
                                        <div className="list-product-btn absolute-2">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <Icon icon={'icon-bag'}></Icon>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            
                                            <a href="javascript:void(0);"
                                                className="box-icon bg_white wishlist btn-icon-action">
                                                <Icon icon={'icon-heart'}></Icon>
                                                <span className="tooltip">Add to Wishlist</span>
                                                <Icon icon={'icon-delete'}></Icon>
                                            </a>
                                            <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                className="box-icon bg_white compare btn-icon-action">
                                                <Icon icon={'icon-compare'}></Icon>
                                                <span className="tooltip">Add to Compare</span>
                                                <Icon icon={'icon-check'}></Icon>
                                            </a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon bg_white quickview tf-btn-loading">
                                                <Icon icon={'icon-view'}></Icon>
                                                <span className="tooltip">Quick View</span>
                                            </a>
                                        </div>
                                        <div className="on-sale-wrap text-end">
                                            <div className="on-sale-item">-31%</div>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="product-detail.html" className="title link fw-6">Berry World Strawberries</a>
                                        <span className="price"><span className="old-price text_primary">$40.25</span> <span
                                                className="new-price">$30.25</span></span>
                                        <div className="pr-stock">
                                            <div className="pr-stock-status d-flex justify-content-between align-items-center">
                                                <div className="pr-stock-available">
                                                    <span className="pr-stock-label fs-12 fw-6">Available: </span>
                                                    <span className="pr-stock-value fs-12 fw-6">23 </span>
                                                </div>
                                                <div className="pr-stock-sold">
                                                    <span className="pr-stock-label fs-12 fw-6">Sold: </span>
                                                    <span className="pr-stock-value fs-12 fw-6">80 </span>
                                                </div>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{width: "23%"}}
                                                    aria-valuenow="23" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="count-down">
                                            <div className="tf-countdown-v2">
                                                <div className="js-countdown" data-timer="8007500"
                                                    data-labels="Days,Hours,Mins,Secs"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide" lazy="true">
                                <div className="card-product style-8 border-0 bg_grey-14 lg">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src={grocery3}
                                                src={grocery3} alt="image-product"/>
                                            <img className="lazyload img-hover" data-src={grocery4}
                                                src={grocery4} alt="image-product"/>
                                        </a>
                                        <div className="list-product-btn absolute-2">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <Icon icon={'icon-bag'}></Icon>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            
                                            <a href="javascript:void(0);"
                                                className="box-icon bg_white wishlist btn-icon-action">
                                                <Icon icon={'icon-heart'}></Icon>
                                                <span className="tooltip">Add to Wishlist</span>
                                                <Icon icon={'icon-delete'}></Icon>
                                            </a>
                                            <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                className="box-icon bg_white compare btn-icon-action">
                                                <Icon icon={'icon-compare'}></Icon>
                                                <span className="tooltip">Add to Compare</span>
                                                <Icon icon={'icon-check'}></Icon>
                                            </a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon bg_white quickview tf-btn-loading">
                                                <Icon icon={'icon-view'}></Icon>
                                                <span className="tooltip">Quick View</span>
                                            </a>
                                        </div>
                                        <div className="on-sale-wrap text-end">
                                            <div className="on-sale-item">-31%</div>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="product-detail.html" className="title link fw-6">M&S Roast Lamb Dinner</a>
                                        <span className="price"><span className="old-price text_primary">$4.70</span> <span
                                                className="new-price">$3.70</span></span>
                                        <div className="pr-stock">
                                            <div className="pr-stock-status d-flex justify-content-between align-items-center">
                                                <div className="pr-stock-available">
                                                    <span className="pr-stock-label fs-12 fw-6">Available: </span>
                                                    <span className="pr-stock-value fs-12 fw-6">5 </span>
                                                </div>
                                                <div className="pr-stock-sold">
                                                    <span className="pr-stock-label fs-12 fw-6">Sold: </span>
                                                    <span className="pr-stock-value fs-12 fw-6">105 </span>
                                                </div>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{width: "5%"}}
                                                    aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="count-down">
                                            <div className="tf-countdown-v2">
                                                <div className="js-countdown" data-timer="8007500"
                                                    data-labels="Days,Hours,Mins,Secs"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide" lazy="true">
                                <div className="card-product style-8 border-0 bg_grey-14 lg">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                            <img className="lazyload img-product" data-src={grocery5}
                                                src={grocery5} alt="image-product"/>
                                            <img className="lazyload img-hover" data-src={grocery6}
                                                src={grocery6} alt="image-product"/>
                                        </a>
                                        <div className="list-product-btn absolute-2">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon bg_white quick-add tf-btn-loading">
                                                <Icon icon={'icon-bag'}></Icon>
                                                <span className="tooltip">Quick Add</span>
                                            </a>
                                            
                                            <a href="javascript:void(0);"
                                                className="box-icon bg_white wishlist btn-icon-action">
                                                <Icon icon={'icon-heart'}></Icon>
                                                <span className="tooltip">Add to Wishlist</span>
                                                <Icon icon={'icon-delete'}></Icon>
                                            </a>
                                            <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                className="box-icon bg_white compare btn-icon-action">
                                                <Icon icon={'icon-compare'}></Icon>
                                                <span className="tooltip">Add to Compare</span>
                                                <Icon icon={'icon-check'}></Icon>
                                            </a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon bg_white quickview tf-btn-loading">
                                                <Icon icon={'icon-view'}></Icon>
                                                <span className="tooltip">Quick View</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-product-info">
                                        <a href="product-detail.html" className="title link fw-6">Brown Rice Drink</a>
                                        <span className="price text_primary">$1.76</span>
                                        <div className="pr-stock">
                                            <div className="pr-stock-status d-flex justify-content-between align-items-center">
                                                <div className="pr-stock-available">
                                                    <span className="pr-stock-label fs-12 fw-6">Available: </span>
                                                    <span className="pr-stock-value fs-12 fw-6">82 </span>
                                                </div>
                                                <div className="pr-stock-sold">
                                                    <span className="pr-stock-label fs-12 fw-6">Sold: </span>
                                                    <span className="pr-stock-value fs-12 fw-6">40 </span>
                                                </div>
                                            </div>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{width: "82%"}}
                                                    aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                        <div className="count-down">
                                            <div className="tf-countdown-v2">
                                                <div className="js-countdown" data-timer="8007500"
                                                    data-labels="Days,Hours,Mins,Secs"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="sw-dots style-2 sw-pagination-product justify-content-center"></div>
                    </div>
                </div>
            </section>
            <section className="flat-spacing-5 pt_0">
                <div className="container">
                    <Tab 
                    title={'Popular products'} 
                    tab_list={productsCategories} 
                    active={0}
                    content={productsCategories.map((tab,tabIndex)=>(
                    <div key={`tab-${tabIndex}`} className={(0===tabIndex || tab.active === true)?'tab-pane active show':'tab-pane '} id={tab.id} role="tabpanel">
                        <Grid className="tf-col-2 xl-col-4">
                            {tab.products.map((product, productIndex) => (
                                <Card key={productIndex} wrapper={
                                    <>
                                        <a href="product-detail.html" className="product-img">
                            {product.images.map((image, productImageIndex)=>(
                                <img key={`product-image-${productImageIndex}`} className={`lazyload ${productImageIndex>0?'img-product':'img-hover'}`} data-src={image}
                                src={image} alt="image-product"/>
                            ))}
                                        </a>
                                        <div className="list-product-btn absolute-2">
                                            <a href="javascript:void(0);"
                                                className="box-icon bg_white wishlist btn-icon-action">
                                                <Icon icon={'icon-heart'}></Icon>
                                                <span className="tooltip">Add to Wishlist</span>
                                                <Icon icon={'icon-delete'}></Icon>
                                            </a>
                                            <a href="#compare" data-bs-toggle="offcanvas" aria-controls="offcanvasLeft"
                                                className="box-icon bg_white compare btn-icon-action">
                                                <Icon icon={'icon-compare'}></Icon>
                                                <span className="tooltip">Add to Compare</span>
                                                <Icon icon={'icon-check'}></Icon>
                                            </a>
                                            <a href="#quick_view" data-bs-toggle="modal"
                                                className="box-icon bg_white quickview tf-btn-loading">
                                                <Icon icon={'icon-view'}></Icon>
                                                <span className="tooltip">Quick View</span>
                                            </a>
                                            
                                        </div>
                                    </>}
                                    info={
                                    <>
                                        <div className="inner-info">
                                            <a href="product-detail.html" className="title link fw-6">{product.name}</a>
                                            <span className="price fw-6">{product.price}</span>
                                        </div>
                                        <div className="list-product-btn">
                                            <a href="#quick_add" data-bs-toggle="modal"
                                                className="box-icon quick-add tf-btn-loading">
                                                <Icon icon={'icon-bag'}></Icon>
                                                <span className="tooltip">Add to cart</span>
                                            </a>
                                        </div>
                                    </>}
                                />
                                
                            ))}
                        </Grid>
                    </div>
                ))} />
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="bg-yellow-10 radius-20 flat-wrap-iconbox">
                        <div className="flat-title lg">
                            <p className="sub-title fw-6">WHAT IS PLANTBELLY?</p>
                            <span className="title fw-6 text-center">Plant-based groceries, delivered.</span>
                        </div>
                        <div className="flat-iconbox-v3 lg">
                            <div className="wrap-carousel wrap-mobile">
                                <div dir="ltr" className="swiper tf-sw-mobile" data-preview="1" data-space="15">
                                    <div className="swiper-wrapper wrap-iconbox lg">
                                        <div className="swiper-slide">
                                            <div className="tf-icon-box text-center">
                                                <div className="icon">
                                                    <i className="icon-plant"></i>
                                                </div>
                                                <div className="content">
                                                    <div className="title">Plant-Based</div>
                                                    <p>Shop everyday staples, small-batch finds, and <br/> community
                                                        favorites. From meat and seafood alternatives to snacks and candy -
                                                        we’ve got your fridge, freezer and pantry covered.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="tf-icon-box text-center">
                                                <div className="icon">
                                                    <i className="icon-deliciousness"></i>
                                                </div>
                                                <div className="content">
                                                    <div className="title">Deliciousness</div>
                                                    <p>Crafted with precision and excellence, our activewear is meticulously
                                                        engineered using premium materials to ensure unmatched comfort and
                                                        durability.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="tf-icon-box text-center">
                                                <div className="icon">
                                                    <i className="icon-door"></i>
                                                </div>
                                                <div className="content">
                                                    <div className="title">To your door</div>
                                                    <p>Designed for every body and anyone, our activewear embraces diversity
                                                        with a wide range of sizes and shapes, celebrating the beauty of
                                                        individuality.</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="sw-dots style-2 sw-pagination-product justify-content-center swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"><span className="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 1"></span><span className="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex="0" role="button" aria-label="Go to slide 2" aria-current="true"></span><span className="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 3"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flat-spacing-12">
                <div className="container">
                    <div className="tf-grid-layout md-col-2 tf-img-with-text img-text-3 img-text-3-style-2">
                        <div className="tf-image wow fadeInUp" data-wow-delay="0s">
                            <div className="grid-img-group">
                                <div className="box-img item-1 hover-img tf-image-wrap">
                                    <div className="img-style">
                                        <img className="lazyload" data-src={imgGrocery1}
                                            src={imgGrocery1} alt="img-slider"/>
                                    </div>
                                </div>
                                <div className="box-img item-2 hover-img tf-image-wrap">
                                    <div className="img-style">
                                        <img className="lazyload" data-src={imgGrocery2}
                                            src={imgGrocery2} alt="img-slider"/>
                                    </div>
                                </div>
                                <div className="box-img item-3 hover-img tf-image-wrap">
                                    <div className="img-style">
                                        <img className="lazyload" data-src={imgGrocery3}
                                            src={imgGrocery3} alt="img-slider"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tf-content-wrap wow fadeInUp" data-wow-delay="0s">
                            <p className="subheading text-uppercase fw-7">PERFECT GIFT FOR YOU</p>
                            <h2 className="heading fade-item fade-item-1 fw-6">Ecomus Subscription</h2>
                            <p className="desc fade-item fade-item-2">Delivered every month! Perfect for your favorite vegan or
                                anyone you want <br/> to introduce to the best better-for-you foods out there.</p>
                            <a href="shop-default.html"
                                className="tf-btn btn-fill animate-hover-btn btn-icon radius-60"><span>Shop collection</span><i
                                    className="icon icon-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
        <Extras />
        
      </div>
  )

}

export default Home;