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

import imgGrocery1 from '@/assets/images/collections/img-w-text-grocery1.jpg';
import imgGrocery2 from '@/assets/images/collections/img-w-text-grocery2.jpg';
import imgGrocery3 from '@/assets/images/collections/img-w-text-grocery3.jpg';
import groceryBanner from '@/assets/images/collections/palmoilnuts.jpg';
import groceryBanner2 from '@/assets/images/collections/whitebgmeatfish.jpg';
import img1 from '@/assets/images/products/vegetable1.jpg';
import img2 from '@/assets/images/products/vegetable2.jpg';
import cerealImage from '@/assets/images/collections/cereals.jpg';
import legumesImage from '@/assets/images/collections/legumes.jpg';
import fruitsVegImage from "@/assets/images/collections/vegetable.png"
import oilseedsImage from '@/assets/images/collections/oilseeds.jpg';
import fibersImage from '@/assets/images/collections/fibres.webp';
import spicesHerbsImage from '@/assets/images/collections/spicesherbs.jpg';
import meatFishSweetenersImage from "@/assets/images/collections/meat.jpg";
import nutsFlowersBeveragesImage from '@/assets/images/collections/nuts.jpg';
import brandsImage from '@/assets/images/logo/banwe_logo_green.png';
import brand1Image from '@/assets/images/brand/asos.png';
import brand2Image from '@/assets/images/brand/asos.png';
import brand3Image from '@/assets/images/brand/asos.png';
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
import CountDownTimer from '@/components/countdown';
import Scroller2 from '@/components/scroller2';
import { Link } from 'react-router-dom';
// import "./App.css";


// if you want to use array
const productsCategories = [
  {
    id: 'meat',
    name: 'Meat',
    href: '#meat',
    active: true,
    products: [
      { name: 'Beef Steak', price: '$15.00', images: [meatFishSweetenersImage, img2] },
      { name: 'Chicken Breast', price: '$12.50', images: [img1, meatFishSweetenersImage] },
      { name: 'Lamb Chops', price: '$18.75', images: [groceryBanner2, img2] },
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

function Home({categories=[]}) {
  const { isMobile} = useDeviceType();
  const [loading, setLoading] = useState(false);
  const slides = [
    {
      img: slidegrocery1,
      headingone: "Don’t miss amazing",
      headingtwo: "grocery deals",
      body: "Save up to 30% off on your first order",
      btntext: "Shop Categories"
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
  // const categories = [
  //     { name: 'Cereal Crops', image: cerealImage },
  //     { 
  //       name: 'Brands', 
  //       image: brandsImage, 
  //       items: [
  //         { name: 'Brand1', image: brand1Image },
  //         { name: 'Brand2', image: brand2Image },
  //         { name: 'Brand3', image: brand3Image }
  //       ] 
  //     },
  //     { name: 'Legumes', image: legumesImage },
  //     { name: 'Fruits & Vegetables', image: fruitsVegImage },
  //     { name: 'Oilseeds', image: oilseedsImage },
  //     { name: 'Fibers', image: fibersImage },
  //     { name: 'Spices and Herbs', image: spicesHerbsImage },
  //     { name: 'Meat, Fish & Sweeteners', image: meatFishSweetenersImage },
  //     { name: 'Nuts, Flowers & Beverages', image: nutsFlowersBeveragesImage }
  //   ];
    
  const banners = [
    {
      img: groceryBanner,
      subheading: 'Fresh & Organic',
      headingOne: 'Boom! Items',
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
  const dealsoftheday = [
    {
      id: 1,
      name: "Organic Mangoes",
      oldPrice: 15.99,
      newPrice: 10.99,
      available: 35,
      sold: 65,
      timer: 7200000,
      image: grocery1,
      hoverImage: grocery2,
      discount: "-31%",
    },
    {
      id: 2,
      name: "Grass-Fed Beef Steaks",
      oldPrice: 25.00,
      newPrice: 18.75,
      available: 12,
      sold: 88,
      timer: 8000000,
      image: grocery3,
      hoverImage: grocery4,
      discount: "-25%",
    },
    {
      id: 3,
      name: "Quinoa & Chia Granola",
      oldPrice: 9.50,
      newPrice: 6.65,
      available: 40,
      sold: 60,
      timer: 6000000,
      image: grocery5,
      hoverImage: grocery6,
      discount: "-30%",
    },
    {
      id: 4,
      name: "Cold-Pressed Olive Oil",
      oldPrice: 20.00,
      newPrice: 14.00,
      available: 28,
      sold: 72,
      timer: 900,
      image: grocery4,
      hoverImage: grocery5,
      discount: "-30%",
    }
  ];
  const infoSlides = [
    {
      icon: 'icon-plant',
      title: 'Plant-Based',
      description:
        'Shop everyday staples, small-batch finds, and community favorites. From meat and seafood alternatives to snacks and candy — we’ve got your fridge, freezer, and pantry covered.'
    },
    {
      icon: 'icon-deliciousness',
      title: 'Deliciousness',
      description:
        'Taste perfection in every bite. From gourmet staples to artisanal treats, our selection promises flavors that satisfy every craving.'
    },
    {
      icon: 'icon-door',
      title: 'To Your Door',
      description:
        'Convenient, fast, and reliable. Enjoy a seamless grocery experience with doorstep delivery that fits your lifestyle.'
    }
  ];
  
  
  return (
    <div  className="preload-wrapper color-primary-8 color-main-text-2 bg-white" >
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
                    <Scroller items={categories} isMobile={isMobile}/>
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
                            pagination={true}
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
                        <span className="title fw-6 wow fadeInUp" data-wow-delay="0s">Top Deals Of The Day</span>
                    </div>
                    <div dir="ltr" className="swiper tf-sw-product-sell" data-preview="3" data-tablet="3" data-mobile="1"
                        data-space-lg="30" data-space-md="15" data-pagination="1" data-pagination-md="3"
                        data-pagination-lg="3">
                        <div className="tf-grid-layout tf-col-2 xl-col-4">
                            {dealsoftheday.map((deal, index) => (
                                <div key={index} className="swiper-slide" lazy="true">
                                    <div className="card-product style-8 border-0 bg_grey-14 lg">
                                    <div className="card-product-wrapper">
                                        <a href="product-detail.html" className="product-img">
                                        <img
                                            className="lazyload img-product"
                                            data-src={deal.image}
                                            src={deal.image}
                                            alt={deal.name}
                                        />
                                        <img
                                            className="lazyload img-hover"
                                            data-src={deal.hoverImage}
                                            src={deal.hoverImage}
                                            alt={`${deal.name} hover`}
                                        />
                                        </a>
                                        <div className="list-product-btn absolute-3">
                                        <a
                                            href="#quick_add"
                                            data-bs-toggle="modal"
                                            className="box-icon bg_white quick-add tf-btn-loading"
                                        >
                                            <Icon icon={'icon-bag'} />
                                            <span className="tooltip">Add to Cart</span>
                                        </a>
                                        <a
                                            href="javascript:void(0);"
                                            className="box-icon bg_white wishlist btn-icon-action"
                                        >
                                            <Icon icon={'icon-heart'} />
                                            <span className="tooltip">Add to Wishlist</span>
                                            <Icon icon={'icon-delete'} />
                                        </a>
                                        <a
                                            href="#quick_view"
                                            data-bs-toggle="modal"
                                            className="box-icon bg_white quickview tf-btn-loading"
                                        >
                                            <Icon icon={'icon-view'} />
                                            <span className="tooltip">Quick View</span>
                                        </a>
                                        </div>
                                        <div className="on-sale-wrap text-end">
                                        <div className="on-sale-item">{deal.discount}</div>
                                        </div>
                                    </div>

                                    <div className="card-product-info">
                                        <a href="product-detail.html" className="title link fw-6">
                                        {deal.name}
                                        </a>
                                        <span className="price">
                                        <span className="old-price text_primary">${deal.oldPrice}</span>
                                        <span className="new-price">${deal.newPrice}</span>
                                        </span>

                                        <div className="pr-stock">
                                          <div className="pr-stock-status d-flex justify-content-between align-items-center">
                                              <div className="pr-stock-available">
                                              <span className="pr-stock-label fs-12 fw-6">Available: </span>
                                              <span className="pr-stock-value fs-12 fw-6">{deal.available}</span>
                                              </div>
                                              <div className="pr-stock-sold">
                                              <span className="pr-stock-label fs-12 fw-6">Sold: </span>
                                              <span className="pr-stock-value fs-12 fw-6">{deal.sold}</span>
                                              </div>
                                          </div>
                                          <div className="progress">
                                              <div
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{ width: `${deal.available}%` }}
                                              aria-valuenow={deal.available}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              ></div>
                                          </div>
                                        </div>

                                        <div className="count-down">
                                            <div className="tf-countdown-v2">
                                                <CountDownTimer timer={deal.timer} />
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                                            src={image} alt="image-product" style={{minWidth:'70px',height:`200px`}}/>
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
                                                                <Icon icon={'icon-bag'}></Icon>
                                                                <span className="tooltip">Add to Cart</span>
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
                                ))} 
                    />
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
                                <Scroller2 items={infoSlides} />
                                
                                
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
                            <h2 className="heading fade-item fade-item-1 fw-6">Banwe Subscription</h2>
                            <p className="desc fade-item fade-item-2">Delivered every month! Perfect for your favorite vegan or
                                anyone you want <br/> to introduce to the best better-for-you foods out there.</p>
                            <Link to="/products"
                                className="tf-btn btn-fill animate-hover-btn btn-icon radius-60"><span>Shop Categories</span><i
                                    className="icon icon-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
        <Extras categories={categories}/>
        
      </div>
  )

}

export default Home;