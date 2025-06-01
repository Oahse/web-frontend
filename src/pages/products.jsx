import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import Extras from '@/components/extra'
import useDeviceType from '@/hooks/useDeviceType'
import { useEffect, useState } from "react";
// 📦 Import product images
import orange1 from '@/assets/images/products/orange-1.jpg';
import white1 from '@/assets/images/products/white-1.jpg';
import black1 from '@/assets/images/products/black-1.jpg';
import hoodie1 from '@/assets/images/products/brown.jpg';
import hoodie2 from '@/assets/images/products/purple.jpg';
import jeans1 from '@/assets/images/products/green.jpg';
import jeans2 from '@/assets/images/products/white-2.jpg';
import sneakers1 from '@/assets/images/products/white-3.jpg';
import sneakers2 from '@/assets/images/products/white-4.jpg';
import pink1 from '@/assets/images/products/pink-1.jpg';
import brown2 from '@/assets/images/products/brown-2.jpg';
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
import Pagination from "@/components/pagination";
import { Link } from "react-router-dom";
import BreadCrumbs from '@/components/breadcrumbs';
import FilterAndSort from "@/components/filterandsort";
import currencies from "@/constants/currencies";

const products = [
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


 
const Products = ({ categories = [] }) => {
    const { isMobile, isTablet, isDesktop } = useDeviceType();
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [paginatedProducts, setPaginatedProducts] = useState(filteredProducts||[]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleFilter = (items) => {
        console.log(items,'----');
        setFilteredProducts(items);
        setPaginatedProducts(items);
        
    };

    const handlePageChange = ({ page, currentItems }) => {
        setPaginatedProducts(currentItems);
    };

    const getDiscountPrice = (price, discount) => {
        return (price - (price * (discount / 100))).toFixed(2);
    };

    const isDiscountActive = (product) => {
        if (!product.discountStartDate) return false;
        return new Date(product.discountStartDate) <= new Date();
    };

    const filters = {
        name: "Tank",
        brands: ["Ecomus",'FlexiFit','BasicThreads','PackRight','CapFlex','TrailFit','SmartLine','UrbanRide','SunBreeze','StepUp','CozyWear','DenimMax'],
        categories: categories,
        availabilities: [
          "In stock",
          // "Out of stock",
          "Limited stock",
          "Pre-order",
          // "Discontinued"
        ],
        colors: [{ id: "beige", label: "Beige", count: 3, bgClass: "bg_beige" },
          { id: "black", label: "Black", count: 18, bgClass: "bg_dark" },
          { id: "blue", label: "Blue", count: 3, bgClass: "bg_blue-2" },
          { id: "brown", label: "Brown", count: 3, bgClass: "bg_brown" },
          { id: "cream", label: "Cream", count: 1, bgClass: "bg_cream" },],
        sizes: [
          { label: "XS", size: "10" },
          { label: "S", size: "12" },
          { label: "M", size: "14" },
          { label: "L", size: "16" },
          { label: "XL", size: "18" },
          { label: "2XL", size: "20" },
          { label: "3XL", size: "22" }
        ],
        price: [10, 100],
        currency: Object.entries(currencies).map(([key, value]) => ({
          label: key,
          sortValue: value
        })),
        ratings: [5, 4, 3, 2, 1],
        shippings: [
            { id: "freeShipping", label: "Free Shipping" },
            { id: "fastDelivery", label: "Fast Delivery" },
            { id: "normalDelivery", label: "Normal Delivery" },
        ],
        conditions: ["New", "Used", "Refurbished"],
        discounts: [10,20,30,50],
        discountStartDateRange: ["2025-05-01", "2025-05-20"]
    };

    const sortingList = [
        { label: "Featured", sortValue: "featured" },
        { label: "Best selling", sortValue: "best-selling" },
        { label: "Alphabetically, A-Z", sortValue: "a-z" },
        { label: "Alphabetically, Z-A", sortValue: "z-a" },
        { label: "Price, low to high", sortValue: "price-low-high" },
        { label: "Price, high to low", sortValue: "price-high-low" },
        { label: "Date, old to new", sortValue: "date-old-new" },
        { label: "Date, new to old", sortValue: "date-new-old" },
    ];

    return (
        <div className="preload-wrapper color-primary-8 color-main-text-2">
            {loading && <Loader />}
            <div id="wrapper">
                <TopHeader />
                <Header />
                <div className="tf-page-title">
                    <div className="container-full">
                        <div className="heading text-center"> Products Results</div>
                        <BreadCrumbs
                              dir='center'
                              links={[
                                  { name: 'Home', href: '/' },
                                  { name: 'Products' }
                              ]}
                              // prev={{ href: `/products/${product?.id}`, tooltip: 'Previous Product' }}
                              // next={{ href: `/products/${product?.id}`, tooltip: 'Next Product' }}
                              // back={{ href: '/products', tooltip: 'Back to Products' }}
                          />
                        {/* <p className="text-center text-2 text_black-2 mt_5">Shop through our latest selections</p> */}
                    </div>
                </div>

                <section className="flat-spacing-2">
                    <div className="container">
                        <FilterAndSort
                            items={products}
                            filterslist={filters}
                            sortinglist={sortingList}
                            onFilterSort={(items)=>handleFilter(items)}
                        />

                        <div className="wrapper-control-shop gridLayout-wrapper">
                            <div className="meta-filter-shop">
                                <div id="product-count-grid" className="count-text"></div>
                                <div id="product-count-list" className="count-text"></div>
                                <div id="applied-filters"></div>
                                <button id="remove-all" className="remove-all-filters" style={{ display: "none" }}>
                                    Remove All <i className="icon icon-close"></i>
                                </button>
                            </div>

                            <div className={`tf-grid-layout wrapper-shop ${isDesktop && 'tf-col-5'} ${isTablet && 'tf-col-3'} ${isMobile && 'tf-col-2'}`} id="gridLayout">
                                {paginatedProducts.length >0 ? <>
                                  {
                                    paginatedProducts?.map((product, index) => (
                                      <div key={product?.id} className="card-product grid" data-availability={product?.availability} data-brand={product?.brand}>
                                          <div className="card-product-wrapper">
                                              <Link to={`/products/${product.id}`} state={{ product }} className="product-img">
                                                  <img data-src={product?.images[0]} className=" lazyload img-product" src={product?.images[0]} alt={product?.name} />
                                                  <img className="lazyload img-hover" data-src={product?.images[1]} src={product?.images[1]} alt={`${product?.name} hover`} />
                                              </Link>
                                              <div className="list-product-btn absolute-2">
                                                  <a href="#quick_add" data-bs-toggle="modal" onClick={() => setSelectedProduct(product)} className="box-icon bg_white quick-add tf-btn-loading">
                                                      <span className="icon icon-bag"></span>
                                                      <span className="tooltip">Quick Add</span>
                                                  </a>
                                                  <a href="#quick_add" data-bs-toggle="modal" onClick={() => setSelectedProduct(product)} className="box-icon bg_white wishlist btn-icon-action">
                                                      <span className="icon icon-heart"></span>
                                                      <span className="tooltip">Add to Wishlist</span>
                                                      <span className="icon icon-delete"></span>
                                                  </a>
                                                  <a href="#quick_view" data-bs-toggle="modal" onClick={() => setSelectedProduct(product)} className="box-icon bg_white quickview tf-btn-loading">
                                                      <span className="icon icon-view"></span>
                                                      <span className="tooltip">Quick View</span>
                                                  </a>
                                              </div>
                                          </div>
  
                                          <div className="card-product-info">
                                              <Link to={`/products/${product.id}`} state={{ previousproduct: paginatedProducts[index - 1], product, nextproduct: paginatedProducts[index + 1] }} className="title link">
                                                  {product?.name} (<small><strong>{product?.brand}</strong></small>)
                                              </Link>
  
                                              {isDiscountActive(product) && product.discount ? (
                                                  <span className="price current-price">
                                                      <div className="d-flex justify-content-between align-items-start flex-wrap">
                                                          <small className="text-success">{product.currency}{getDiscountPrice(product.price, product.discount)}</small>
                                                          <span className="d-flex gap-2 mx-2">
                                                              {product?.sizes.map((size) => {
                                                                  const uniqueId = `${product?.id}-${size?.id}`;
                                                                  return (
                                                                      <label key={uniqueId} className="style-text small" htmlFor={uniqueId}>
                                                                          <p className="mb-0">{size.label}</p>
                                                                      </label>
                                                                  );
                                                              })}
                                                          </span>
                                                      </div>
                                                      <div className="small mt-1">
                                                          <span style={{ textDecoration: 'line-through', textDecorationThickness: '0.1px', fontWeight: 'lighter' }}>
                                                              {product.currency}{product.price}
                                                          </span>
                                                          <span className="ms-2 small text-danger">{product.discount}% OFF</span>
                                                      </div>
                                                  </span>
                                              ) : (
                                                  <span className="price current-price">
                                                      <div className="d-flex justify-content-between align-items-start flex-wrap">
                                                          <small>{product.currency}{product.price}</small>
                                                          <span className="d-flex gap-2 mx-2">
                                                              {product.sizes.map((size) => {
                                                                  const uniqueId = `${product.id}-${size.id}`;
                                                                  return (
                                                                      <label key={uniqueId} className="style-text small" htmlFor={uniqueId}>
                                                                          <p className="mb-0">{size.label}</p>
                                                                      </label>
                                                                  );
                                                              })}
                                                          </span>
                                                      </div>
                                                  </span>
                                              )}
                                          </div>
                                      </div>
                                  ))
                                  }
                                </>: <span className="d-flex justify-content-center align-items-center">No Items Found</span>}
                            </div>

                            <Pagination items={filteredProducts} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </section>

                <Footer />
                <Extras selectedProduct={selectedProduct} />
            </div>
        </div>
    );
};

export default Products;