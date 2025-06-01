import useDeviceType from '@/hooks/useDeviceType'
import React, { useEffect, useState } from "react";
import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import BreadCrumbs from '@/components/breadcrumbs';
import Extras from '@/components/extra'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CountDownTimer from '@/components/countdown';
import Scroller3 from '@/components/scroller3'
import Scroller from '@/components/scroller'
import paypal from '@/assets/images/payments/paypal.png';
import beige1 from '@/assets/images/shop/products/hmgoepprod31.jpg';
import beige2 from '@/assets/images/shop/products/hmgoepprod.jpg';
import beige3 from '@/assets/images/shop/products/hmgoepprod2.jpg';
import beige4 from '@/assets/images/shop/products/hmgoepprod3.jpg';
import beige5 from '@/assets/images/shop/products/hmgoepprod4.jpg';
import beige6 from '@/assets/images/shop/products/hmgoepprod5.jpg';

import black1 from '@/assets/images/shop/products/hmgoepprod6.jpg';
import black2 from '@/assets/images/shop/products/hmgoepprod7.jpg';
import black3 from '@/assets/images/shop/products/hmgoepprod8.jpg';
import black4 from '@/assets/images/shop/products/hmgoepprod9.jpg';

import blue1 from '@/assets/images/shop/products/hmgoepprod10.jpg';
import blue2 from '@/assets/images/shop/products/hmgoepprod11.jpg';
import blue3 from '@/assets/images/shop/products/hmgoepprod12.jpg';
import blue4 from '@/assets/images/shop/products/hmgoepprod13.jpg';

import white1 from '@/assets/images/shop/products/hmgoepprod14.jpg';
import white2 from '@/assets/images/shop/products/hmgoepprod15.jpg';
import white3 from '@/assets/images/shop/products/hmgoepprod16.jpg';
import white4 from '@/assets/images/shop/products/hmgoepprod17.jpg';
import orange1 from '@/assets/images/products/orange-1.jpg';
import hoodie1 from '@/assets/images/products/brown.jpg';
import hoodie2 from '@/assets/images/products/purple.jpg';
import jeans1 from '@/assets/images/products/green.jpg';
import jeans2 from '@/assets/images/products/white-2.jpg';
import sneakers1 from '@/assets/images/products/white-3.jpg';
import sneakers2 from '@/assets/images/products/white-4.jpg';
import dress1 from '@/assets/images/products/white-2.jpg';
import dress2 from '@/assets/images/products/pink-1.jpg';
import jacket1 from '@/assets/images/products/brown-2.jpg';
import jacket2 from '@/assets/images/products/brown-3.jpg';
import shirt1 from '@/assets/images/products/light-green-1.jpg';
import shirt2 from '@/assets/images/products/light-green-2.jpg';
import shorts1 from '@/assets/images/products/black-1.jpg';
import shorts2 from '@/assets/images/products/black-2.jpg';
import cap1 from '@/assets/images/products/white-8.jpg';
import cap2 from '@/assets/images/products/black-6.jpg';
import bag1 from '@/assets/images/products/black-4.jpg';
import bag2 from '@/assets/images/products/black-8.jpg';
import pink1 from '@/assets/images/products/pink-1.jpg';
import brown2 from '@/assets/images/products/brown-2.jpg';
import QuantitySelector from '@/components/quantityselector';
import { fetchProduct,fetchRelatedProducts } from '@/services/api/products';
import VariantPicker from '@/components/variantpicker';
// import currencies from '@/constants/currencies';
import { ToastContainer, notify } from '@/services/notifications/ui';
import Tab2 from '@/components/tab2';

const relatedproducts = [
    {
      id: 1,
      name: 'Ribbed Tank Top',
      price: 16.95,
      currency: '$',
      discount: 20,
      discountStartDate: '2025-05-18T08:00:00Z',
      availability: 'In stock',
      brand: 'Ecomus',
      category: 'Fibers',  // tank top - fibers (like cotton/wool)
      images: [orange1, black1, white1, white1],
      colors: [
        { name: 'Orange', swatch: 'bg_orange-3', image: orange1 },
        { name: 'Black', swatch: 'bg_dark', image: black1 },
        { name: 'White', swatch: 'bg_white', image: white1 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
        { label: 'M', id: 'values-m', price: 9 },
        { label: 'XL', id: 'values-xl', price: 12 },
      ],
      rating: 4,
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 49.99,
      currency: '£',
      discount: 15,
      discountStartDate: '2025-05-15T12:30:00Z',
      availability: 'Limited stock',
      brand: 'DenimMax',
      category: 'Fibers',  // denim = fiber-based fabric
      images: [jeans1, jeans2, black1, white1],
      colors: [
        { name: 'Blue', swatch: 'bg_blue', image: jeans1 },
        { name: 'Black', swatch: 'bg_dark', image: black1 },
      ],
      sizes: [
        { label: 'M', id: 'values-m', price: 9 },
      ],
      rating: 4,
    },
    {
      id: 3,
      name: 'Cotton Hoodie',
      price: 39.5,
      currency: '€',
      discount: 10,
      discountStartDate: '2025-05-10T14:00:00Z',
      availability: 'Out of stock',
      brand: 'CozyWear',
      category: 'Fibers',
      images: [hoodie1, hoodie2, black1, white1],
      colors: [
        { name: 'Grey', swatch: 'bg_grey', image: hoodie1 },
        { name: 'Navy', swatch: 'bg_navy', image: hoodie2 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
      ],
      rating: 3,
    },
    {
      id: 4,
      name: 'Chunky Sneakers',
      price: 74.0,
      currency: '$',
      discount: 30,
      discountStartDate: '2025-05-17T09:15:00Z',
      availability: 'Pre-order',
      brand: 'StepUp',
      category: 'Nuts, Flowers & Beverages',  // shoes, let's loosely associate here
      images: [sneakers1, sneakers2, black1, white1],
      colors: [
        { name: 'White', swatch: 'bg_white', image: sneakers1 },
        { name: 'Black', swatch: 'bg_dark', image: black1 },
        { name: 'Beige', swatch: 'bg_beige', image: sneakers2 },
      ],
      sizes: [
        { label: 'L', id: 'values-l', price: 10 },
      ],
      rating: 5,
    },
    {
      id: 5,
      name: 'Floral Summer Dress',
      price: 29.99,
      currency: '€',
      discount: 25,
      discountStartDate: '2025-05-14T10:45:00Z',
      availability: 'In stock',
      brand: 'SunBreeze',
      category: 'Fibers',
      images: [dress1, dress2, white1, pink1],
      colors: [
        { name: 'Floral Red', swatch: 'bg_red', image: dress1 },
        { name: 'Light Blue', swatch: 'bg_lightblue', image: dress2 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
        { label: 'M', id: 'values-m', price: 9 },
        { label: 'L', id: 'values-l', price: 10 },
        { label: 'XL', id: 'values-xl', price: 12 },
      ],
      rating: 1,
    },
    {
      id: 6,
      name: 'Leather Jacket',
      price: 119.99,
      currency: '£',
      discount: 35,
      discountStartDate: '2025-05-13T16:00:00Z',
      availability: 'Limited stock',
      brand: 'UrbanRide',
      category: 'Meat, Fish & Sweeteners',  // leather comes from animals
      images: [jacket1, jacket2, brown2, black1],
      colors: [
        { name: 'Black', swatch: 'bg_dark', image: black1 },
        { name: 'Brown', swatch: 'bg_brown', image: jacket2 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
        { label: 'M', id: 'values-m', price: 9 },
        { label: 'L', id: 'values-l', price: 10 },
        { label: 'XL', id: 'values-xl', price: 12 },
      ],
      rating: 2,
    },
    {
      id: 7,
      name: 'Striped Shirt',
      price: 24.5,
      currency: '$',
      discount: 18,
      discountStartDate: '2025-05-11T08:30:00Z',
      availability: 'In stock',
      brand: 'SmartLine',
      category: 'Fibers',
      images: [shirt1, shirt2, black1, white1],
      colors: [
        { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
        { name: 'Grey', swatch: 'bg_grey', image: shirt2 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
        { label: 'M', id: 'values-m', price: 9 },
        { label: 'L', id: 'values-l', price: 10 },
        { label: 'XL', id: 'values-xl', price: 12 },
      ],
      rating: 4,
    },
    {
      id: 8,
      name: 'Cargo Shorts',
      price: 27.5,
      currency: '€',
      discount: 22,
      discountStartDate: '2025-05-16T11:20:00Z',
      availability: 'Discontinued',
      brand: 'TrailFit',
      category: 'Fibers',
      images: [shorts1, shorts2, black1, white1],
      colors: [
        { name: 'Olive', swatch: 'bg_olive', image: shorts1 },
        { name: 'Khaki', swatch: 'bg_khaki', image: shorts2 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
        { label: 'M', id: 'values-m', price: 9 },
        { label: 'L', id: 'values-l', price: 10 },
        { label: 'XL', id: 'values-xl', price: 12 },
      ],
      rating: 5,
    },
    {
      id: 9,
      name: 'Casual Baseball Cap',
      price: 14.95,
      currency: '$',
      discount: 12,
      discountStartDate: '2025-05-18T07:00:00Z',
      availability: 'In stock',
      brand: 'CapFlex',
      category: 'Fibers',
      images: [cap1, cap2, black1, white1],
      colors: [
        { name: 'Black', swatch: 'bg_dark', image: black1 },
        { name: 'Red', swatch: 'bg_red', image: cap2 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
        { label: 'M', id: 'values-m', price: 9 },
        { label: 'L', id: 'values-l', price: 10 },
        { label: 'XL', id: 'values-xl', price: 12 },
      ],
      rating: 3,
    },
    {
      id: 10,
      name: 'Canvas Backpack',
      price: 38.0,
      currency: '£',
      discount: 28,
      discountStartDate: '2025-05-12T13:00:00Z',
      availability: 'In stock',
      brand: 'PackRight',
      category: 'Fibers',
      images: [bag1, bag2, black1, white1],
      colors: [
        { name: 'Navy', swatch: 'bg_navy', image: bag1 },
        { name: 'Beige', swatch: 'bg_beige', image: bag2 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
        { label: 'M', id: 'values-m', price: 9 },
        { label: 'L', id: 'values-l', price: 10 },
        { label: 'XL', id: 'values-xl', price: 12 },
      ],
      rating: 4,
    },
    {
      id: 11,
      name: 'Classic White Tee',
      price: 12.99,
      currency: '$',
      discount: 10,
      discountStartDate: '2025-05-13T10:00:00Z',
      availability: 'Limited stock',
      brand: 'BasicThreads',
      category: 'Fibers',
      images: [white1, black1, orange1, white1],
      colors: [
        { name: 'White', swatch: 'bg_white', image: white1 },
        { name: 'Black', swatch: 'bg_dark', image: black1 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
        { label: 'M', id: 'values-m', price: 9 },
        { label: 'L', id: 'values-l', price: 10 },
        { label: 'XL', id: 'values-xl', price: 12 },
      ],
      rating: 4,
    },
    {
      id: 12,
      name: 'Activewear Tights',
      price: 32.5,
      currency: '€',
      discount: 20,
      discountStartDate: '2025-05-15T14:15:00Z',
      availability: 'In stock',
      brand: 'FlexiFit',
      category: 'Fibers',
      images: [hoodie2, hoodie1, black1, white1],
      colors: [
        { name: 'Grey', swatch: 'bg_grey', image: hoodie2 },
        { name: 'Maroon', swatch: 'bg_maroon', image: hoodie1 },
      ],
      sizes: [
        { label: 'S', id: 'values-s', price: 0 },
        { label: 'M', id: 'values-m', price: 9 },
        { label: 'L', id: 'values-l', price: 10 },
        { label: 'XL', id: 'values-xl', price: 12 },
      ],
      rating: 5,
    },
  ];
const ProductDetails = () =>{
    const { isMobile, isTablet, isDesktop } = useDeviceType();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Destructure the product from the location state
    const { product:currentproduct} = location?.state || {}; // Default to empty object if state is undefined
    
    // const { country } = useCountryByLocation();
    // console.log(country,'=====country')
    const [loading, setLoading] = useState(false);
    const [relatedProductsLoading, setRelatedProductsLoading] = useState(false);
    const [product, setProduct] = useState(currentproduct||{});
    const [relatedProducts, setRelatedProducts] = useState(relatedproducts || []);

    const [quantity, setQuantity] = useState(1);
    
    
    const addToCart = (product, amount) => {
        // notify(`${amount} ${product?.name} has been added to cart`)
        notify({ text: `${amount} ${product?.name} has been added to cart`, type: 'success' });
        console.log(amount, product?.name,'has been added to cart')
    };
    const addToWishList = (product, amount) => {
        notify({ text: `${amount} ${product?.name} has been added to wishlist`, type: 'success' });
        console.log(amount, product?.name,'has been added to wishlist')
    };
    const buyNow =(product, amount)=>{
        navigate('/account/orders/checkout', { state: { product, amount } })
    }
      
    const getDiscountPrice = (price, discount) => {
        return (price-(price * (discount / 100))).toFixed(2);
    };
    const handleSetCurrentProduct =(product)=>{
        
        setProduct(product);
        // Assuming your product has an id or slug to put in the URL
        const productIdOrSlug = product.id || product.slug || product.name.toLowerCase().replace(/\s+/g, '-');

        // Change the URL without reloading the page
        navigate(`/products/${productIdOrSlug}`, { replace: false });
    }
    
    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const result = await fetchProduct({ id: currentproduct?.id });
            if (result.data){
                setProduct(result.data);
            }else{
                setProduct(currentproduct);
            }
            setLoading(false);
        };
    
        if (currentproduct?.id) {
          loadProduct();
        }
      }, [currentproduct]);
      useEffect(() => {
        const loadRelatedProducts = async () => {
          setRelatedProductsLoading(true);
          const result = await fetchRelatedProducts({ id: product?.id });
          if (result.data) {
            setRelatedProducts(result.data);
          }
          setRelatedProductsLoading(false);
        };
      
        if (product?.id) {
          loadRelatedProducts();
        }
      }, [product]);
      

    return(
        <div  className="preload-wrapper color-primary-8 color-main-text-2" >
            
            {loading && <Loader />} 
            
            <div id="wrapper">
                <TopHeader/>
                <Header/>
                <BreadCrumbs
                    links={[
                        { name: 'Home', href: '/' },
                        { name: 'Products', href: '/products' },
                        { name: product?.name }
                    ]}
                    // prev={{ href: `/products/${product?.id}`, tooltip: 'Previous Product' }}
                    // next={{ href: `/products/${product?.id}`, tooltip: 'Next Product' }}
                    back={{ href: '/products', tooltip: 'Back to Products' }}
                />
                <section className="flat-spacing-4 pt_0">
                    <div className="tf-main-product">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="tf-product-media-wrap sticky-top">
                                        <div className="thumbs-slider">
                                            <Scroller3
                                                className='tf-product-media-main'
                                                showsidescrollers={true}
                                                id="gallery-swiper-started"
                                                // activeItem={activeItem}
                                                items={product?.images} itemsPerView={1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tf-product-info-wrap position-relative">
                                        <div className="tf-zoom-main"></div>
                                        <div className="tf-product-info-list other-image-zoom">
                                            <div className="tf-product-info-title">
                                                <h5>{product?.name}</h5>
                                            </div>
                                            <div className="tf-product-info-badges">
                                                <div className="badges">Best seller</div>
                                                <div className="product-status-content">
                                                    <i className="icon-lightning"></i>
                                                    <p className="fw-6">Selling fast! 56 people have this in their carts.</p>
                                                </div>
                                            </div>
                                            {(product?.discountStartDate && product?.discount) ?
                                                <div className="tf-product-info-price">
                                                    <div className="price-on-sale">{product?.currency}{getDiscountPrice(product?.  price, product?.discount)}</div>
                                                    <div className="compare-at-price">{product?.currency}{product?.price}</div>
                                                    <div className="badges-on-sale"><span>{product?.discount}</span>% OFF</div>
                                                </div>:
                                                <div className="tf-product-info-price">
                                                    <div className="price-on-sale">{product?.currency}{product?.price}</div>
                                                </div>
                                            }
                                            
                                            <div className="tf-product-info-liveview">
                                                <div className="liveview-count">20</div>
                                                <p className="fw-6">People are viewing this right now</p>
                                            </div>
                                            {(product?.discountStartDate && product?.discount) && <div className="tf-product-info-countdown">
                                                <div className="countdown-wrap">
                                                    <div className="countdown-title">
                                                        <i className="icon-time tf-ani-tada"></i>
                                                        <p>HURRY UP! SALE ENDS IN:</p>
                                                    </div>
                                                    <div className="tf-countdown style-1">
                                                        <CountDownTimer starttime={new Date(product?.discountStartDate).getTime()}/>
                                                    </div>
                                                </div>
                                            </div>}
                                            
                                            <div className="tf-product-info-variant-picker">
                                                
                                                <div className="variant-picker-item">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="variant-picker-label">
                                                            Size: <span className="fw-6 variant-picker-label-value">S</span>
                                                        </div>
                                                        <a href="#find_size" data-bs-toggle="modal" className="find-size fw-6">Find
                                                            your size</a>
                                                    </div>
                                                    <VariantPicker sizes={product?.sizes}/>
                                                </div>
                                            </div>
                                            <div className="tf-product-info-quantity">
                                                <div className="quantity-title fw-6">Quantity</div>
                                                <QuantitySelector onChange={setQuantity}/>
                                            </div>
                                            <div className="tf-product-info-buy-button">
                                                <form className="">
                                                    <a href="javascript:void(0);"
                                                        onClick={()=>addToCart(product, quantity)}
                                                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn btn-add-to-cart"><span>Add
                                                            to cart -&nbsp;</span><span
                                                            className="tf-qty-price total-price">{product?.currency}{(getDiscountPrice(product?.price, product?.discount) * quantity).toFixed(2)}</span></a>
                                                    <a href="javascript:void(0);"
                                                        onClick={()=>addToWishList(product, quantity)}
                                                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action">
                                                        <span className="icon icon-heart"></span>
                                                        <span className="tooltip">Add to Wishlist</span>
                                                        <span className="icon icon-delete"></span>
                                                    </a>
                                                    
                                                    <div className="w-100">
                                                        <a href="javascript:void(0);" onClick={()=>buyNow(product, quantity)} className="btns-full">Buy with <img src={paypal} alt="paypal"/></a>
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
                                        <img className="lazyloaded" data-src={product?.image} alt=""
                                            src={product?.image}/>
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
                                <Tab2 product={product}/>
                            </div>
                        </div>
                    </div>
                </section>

                {relatedProductsLoading ? 
                <Loader />
                :
                <section className="flat-spacing-1 pt_0">
                    <div className="container">
                        <div className="flat-title">
                            <span className="title">People Also Bought</span>
                        </div>
                        <div className="hover-sw-nav hover-sw-2">
                            <div dir="ltr" className="swiper tf-sw-product-sell wrap-sw-over" data-preview="4" data-tablet="3"
                                data-mobile="2" data-space-lg="30" data-space-md="15" data-pagination="2" data-pagination-md="3"
                                data-pagination-lg="3">
                                <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
                                    {relatedProducts?.map((relatedproduct, index) =>(
                                        <div key={index} className="swiper-slide" lazy="true">
                                            <div className="card-product">
                                                <div className="card-product-wrapper">
                                                    <a href="javascript:void(0);" onClick={()=>handleSetCurrentProduct(relatedproduct)}  className="product-img">
                                                        <img className="lazyload img-product" data-src={relatedproduct?.images[0]}
                                                            src={relatedproduct?.images[0]} alt="image-product"/>
                                                        <img className="lazyload img-hover" data-src={relatedproduct?.images[1]}
                                                            src={relatedproduct?.images[1]} alt="image-product"/>
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
                                                        
                                                        <a href="#quick_view" data-bs-toggle="modal"
                                                            className="box-icon bg_white quickview tf-btn-loading">
                                                            <span className="icon icon-view"></span>
                                                            <span className="tooltip">Quick View</span>
                                                        </a>
                                                    </div>
                                                    <div className="size-list">
                                                        {relatedproduct?.sizes?.map((size, index)=>(
                                                            <span key={index}>{size.label}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="card-product-info">
                                                    <a href="javascript:void(0);" onClick={()=>handleSetCurrentProduct(relatedproduct)}  className="title link">{relatedproduct?.name}</a>
                                                    {(product?.discountStartDate && product?.discount) ?
                                                        <span className="price">
                                                            <span className=" text-success">{relatedproduct?.currency}{getDiscountPrice(relatedproduct?. price, relatedproduct?.discount)}</span>
                                                            <span className="small mt-1 ms-2 ">
                                                                <span style={{ textDecoration: 'line-through', textDecorationThickness: '0.1px', fontWeight: 'lighter' }}>
                                                                    {relatedproduct.currency}{relatedproduct.price}
                                                                </span>
                                                                <span className="ms-2 small text-danger ">{relatedproduct.discount}% OFF</span>
                                                            </span>
                                                        </span>:
                                                        <span className="price">
                                                            <span className="small mt-1 ms-2 ">
                                                            {relatedproduct.currency}{relatedproduct.price}
                                                            </span>
                                                        </span>
                                                    }
                                                    
                                                    
                                                    <ul className="list-color-product">
                                                        {relatedProducts?.colors?.map((color,index)=>(
                                                            <li key={index} className="list-color-item color-swatch active">
                                                                <span className="tooltip">{color?.name}</span>
                                                                <span className={`swatch-value ${color?.swatch}`}></span>
                                                                <img className="lazyload" data-src={color?.image}
                                                                    src={color?.image} alt="image-product"/>
                                                            </li>
                                                        ))}
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* <div dir="ltr" className="swiper tf-sw-product-sell wrap-sw-over" data-preview="4" data-tablet="3"
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
                            <div className="sw-dots style-2 sw-pagination-product justify-content-center"></div> */}
                        </div>
                    </div>
                </section>
                }                                                    
                

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
            
            {/* <!-- modal ask_question --> */}
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
            
            <Extras product={product} amount={quantity} />
        </div>
        )
    }
export default ProductDetails;