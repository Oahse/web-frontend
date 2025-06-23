import useAuth from '@/hooks/useAuth';
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
import Scroller5 from "@/components/scroller5";
import black1 from '@/assets/images/shop/products/hmgoepprod6.jpg';
import white1 from '@/assets/images/shop/products/hmgoepprod14.jpg';
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
import collection9 from '@/assets/images/collections/collection-circle-9.jpg';
import collection10 from '@/assets/images/collections/collection-circle-10.jpg';
import QuantitySelector from '@/components/quantityselector';
import { fetchProduct,fetchRelatedProducts } from '@/services/api/products';
import VariantPicker from '@/components/variantpicker';
// import currencies from '@/constants/currencies';

import Tab2 from '@/components/tab2';
import { handleAddToCart,handleAddToWishlist, getDiscount } from '@/services/helper';

import { paymentMethods } from '@/services/helper';
import paypal from '@/assets/images/payments/paypal.png';
// import visa from '@/assets/images/payments/visa.png';
import mastercard from '@/assets/images/payments/img-2.png';
// Add these imports for your other images:
import cash from '@/assets/images/payments/cash.jpg';
import applepay from '@/assets/images/payments/applepay.jpg';
import googlepay from '@/assets/images/payments/googlepay.png';
import amazonpay from '@/assets/images/payments/amazonpay.jpg';
import cryptocurrency from '@/assets/images/payments/cryptocurrency.webp';
import { fetchProductReviews } from '../services/api/products';
import useProductReview from '@/hooks/useProductReview';


const relatedproducts  = [
  {
    id: 1,
    name: 'Ribbed Tank Top',
    price: 16.95,
    currency: '$',
    salePrice: 10,
    discountEndDate: '2025-05-18T08:00:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 2,
    name: 'Slim Fit Jeans',
    price: 49.99,
    currency: '£',
    salePrice: 30,
    discountEndDate: '2025-05-15T12:30:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 3,
    name: 'Cotton Hoodie',
    price: 39.5,
    currency: '€',
    salePrice: 10,
    discountEndDate: '2025-05-10T14:00:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 4,
    name: 'Chunky Sneakers',
    price: 74.0,
    currency: '$',
    salePrice: 40,
    discountEndDate: '2025-05-17T09:15:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 5,
    name: 'Floral Summer Dress',
    price: 29.99,
    currency: '€',
    salePrice: 20,
    discountEndDate: '2025-05-14T10:45:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 6,
    name: 'Leather Jacket',
    price: 119.99,
    currency: '£',
    salePrice: 110,
    discountEndDate: '2025-05-13T16:00:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 7,
    name: 'Striped Shirt',
    price: 24.5,
    currency: '$',
    salePrice: 18,
    discountEndDate: '2025-05-11T08:30:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 8,
    name: 'Cargo Shorts',
    price: 27.5,
    salePrice: 10,
    currency: '€',
    discountEndDate: '2025-05-16T11:20:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 9,
    name: 'Casual Baseball Cap',
    price: 14.95,
    currency: '$',
    salePrice: 10,
    discountEndDate: '2025-05-18T07:00:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 10,
    name: 'Canvas Backpack',
    price: 38.0,
    currency: '£',
    salePrice: 30,
    discountEndDate: '2025-05-12T13:00:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 11,
    name: 'Classic White Tee',
    price: 12.99,
    currency: '$',
    salePrice: 10,
    discountEndDate: '2025-05-13T10:00:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
  {
    id: 12,
    name: 'Activewear Tights',
    price: 32.5,
    currency: '€',
    salePrice: 20,
    discountEndDate: '2025-05-15T14:15:00Z',
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
    description:{
      desc:'Button-up shirt sleeves and a relaxed silhouette. It’s tailored with drapey, crinkle-texture fabric that’s made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.',
      features:['Front button placket','Adjustable sleeve tabs','Babaton embroidered crest at placket and hem'],
      materialscareleft:[
        {
          name:'Content: 100% LENZING™ ECOVERO™ Viscose'
        },
        {
          name:'Care: Hand wash'
        },
        {
          name:'Imported'
        }

      ],
      materialscareright:[
        {
          icon:'icon-machine',
          name:'Machine wash max. 30ºC. Short spin.'
        },
        {
          icon:'icon-iron',
          name:'Iron maximum 110ºC.'
        },
        {
          icon:'icon-bleach',
          name:'Do not bleach/bleach.'
        },
        {
          icon:'icon-dry-clean',
          name:'Do not dry clean.'
        },
        {
          icon:'icon-tumble-dry',
          name:'Tumble dry, medium hear.'
        }

      ]
    },
    additionalinfo:[
      {
        label:'Color',
        value:'White, Pink, Black'
      },
      {
        label:'Size',
        value:'S, M, L, XL'
      }
    ],
    checkout:{
      title:{
        icon:'icon-safe',
        name:'Guarantee Safe Checkout'
      },
      methods:[
        {
          image:paypal,
          maxHeight:'18px',
          marginLeft:'2rem'
        },
        {
          image:mastercard,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:googlepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:applepay,
          maxHeight:'24px',
          marginLeft:'2rem'
        },
        {
          image:amazonpay,
          maxHeight:'24px',
          marginLeft:'2rem'
        }
      ]
    }
  },
];
const items = [
    {
        header: "Best Sellers",
        description: "Check out our most popular products.",
        rating: 5,  // e.g. 5 stars
        image: shirt2,
        name: "John Doe",
        metas: "Verified Buyer",
        products: [
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
        ],
    },
    {
        header: "New Arrivals",
        description: "Fresh styles just arrived.",
        rating: 4,  // 4 stars
        image: shirt2,
        name: "Jane Smith",
        metas: "Fashion Blogger",
        products: [
        {
            id: 201,
            name: "Sneakers",
            color: "white",
            images: [
                shirt2,
            ],
            price: 120,
            currency: "$",
        },
        {
            id: 202,
            name: "Backpack",
            color: "navy",
            images: [
                shirt2,
            ],
            price: 80,
            currency: "$",
        },
        {
            id: 203,
            name: "Beanie",
            color: "grey",
            images: [
                shirt2,
            ],
            price: 25,
            currency: "$",
        },
        ],
    },
    // More items (testimonial groups) as needed
];
const productreview ={
    avg:5,
    totalreviews:168, 
    totalcomments:3,
    ratings:[{
                name: 5,
                percentage:"94.67%",
                total:59,
            },{
                name: 4,
                percentage:"60%",
                total:46,
            },{
                name: 3,
                percentage:"0%",
                total:0,
            },{
                name: 2,
                percentage:"0%",
                total:0,
            },{
                name: 1,
                percentage:"0%",
                total:0,
            }
        ],
    comments:[
                {
                    user: {
                        name: "oscaroguledo",
                        image: collection9,
                    },
                    rating:2,
                    datetime: "2025-06-08T10:00:00Z",
                    text: `Great theme - we were looking for a theme with lots of built in features and flexibility and this was perfect. We expected to need to employ a developer to add a few finishing touches. But we actually managed to do everything ourselves. We did have one small query and the support given was swift and helpful.`,
                    replies: [
                        {
                            user: {
                                name: "oscaroguledo",
                                image: collection10,
                            },
                            rating:5,
                            datetime: "2025-06-08T10:00:00Z",
                            text: `We love to hear it! Part of what we love most about Modave is how much it empowers store owners like yourself to build a beautiful website without having to hire a developer :) Thank you for this fantastic review!`,
                        },
                    ],
                },
                {
                    user: {
                        name: "Superb quality apparel that exceeds expectations",
                        profileLink: "#",
                        image: collection9,
                    },
                    rating:5,
                    datetime: "2025-06-08T10:00:00Z",
                    text: `Great theme - we were looking for a theme with lots of built in features and flexibility and this was perfect. We expected to need to employ a developer to add a few finishing touches. But we actually managed to do everything ourselves. We did have one small query and the support given was swift and helpful.`,
                    replies: [],
                },
            ],
    options : [
        { label: "Edit", sortValue: "edit" },
        { label: "Delete", sortValue: "delete" },
    ]
}
const ProductDetails = ( {categories =[]}) =>{
    const { loading:isloading, error, user} = useAuth();
    const [loading, setLoading] = useState(isloading);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Destructure the product from the location state
    const { product:currentproduct } = location?.state || {};
    // Set method from paymentMethod (string or object)
    const defaultMethod = paymentMethods.find(pm => pm.id === 'credit_card') || paymentMethods[0];

    const initialMethod = (() => {
        return defaultMethod;
    })();

    const [paymentmethod, setPaymentMethod] = useState(initialMethod);
    const [relatedProductsLoading, setRelatedProductsLoading] = useState(false);
    const [product, setProduct] = useState(currentproduct||{});
    const { productReview,setProductReview } = useProductReview(productreview,product?.id);
    
    const [relatedProducts, setRelatedProducts] = useState(relatedproducts || []);
    const [quantity, setQuantity] = useState(1);
    
    const handleSetCurrentProduct =(product)=>{
        
        setProduct(product);
        // Assuming your product has an id or slug to put in the URL
        const productIdOrSlug = product.id || product.slug || product.name.toLowerCase().replace(/\s+/g, '-');

        // Change the URL without reloading the page
        navigate(`/products/${productIdOrSlug}`, { replace: false });
    }
    const [currentComment, setCurrentComment] = useState(null);
    const handleCurrentCommentData = (review)=>{
        setCurrentComment(review);
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

    useEffect(() => {
        const loadReviewedProducts = async () => {
            // setReviewedProductsLoading(true);
            const result = await fetchProductReviews({ productId: product?.id });
            if (result.data) {
                    setProductReview(result.data);
            }
            // setReviewedProductsLoading(false);
        };
      
        if (product?.id) {
            loadReviewedProducts();
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
                                                    {/* <p className="fw-6">Selling fast! 56 people have this in their carts.</p> */}
                                                </div>
                                            </div>
                                            {(product?.discountEndDate && product?.salePrice) ?
                                                <div className="tf-product-info-price">
                                                    <div className="price-on-sale">{product?.currency}{product?.salePrice}</div>
                                                    <div className="compare-at-price">{product?.currency}{product?.price}</div>
                                                    <div className="badges-on-sale"><span>{getDiscount(product?.price, product?.salePrice)}</span>% OFF</div>
                                                </div>:
                                                <div className="tf-product-info-price">
                                                    <div className="price-on-sale">{product?.currency}{product?.price}</div>
                                                </div>
                                            }
                                            
                                            {/* <div className="tf-product-info-liveview">
                                                <div className="liveview-count">20</div>
                                                <p className="fw-6">People are viewing this right now</p>
                                            </div> */}
                                            {(product?.discountEndDate && product?.discount) && <div className="tf-product-info-countdown">
                                                <div className="countdown-wrap">
                                                    <div className="countdown-title">
                                                        <i className="icon-time tf-ani-tada"></i>
                                                        <p>HURRY UP! SALE ENDS IN:</p>
                                                    </div>
                                                    <div className="tf-countdown style-1">
                                                        <CountDownTimer starttime={new Date(product?.discountEndDate).getTime()}/>
                                                    </div>
                                                </div>
                                            </div>}
                                            
                                            <div className="tf-product-info-variant-picker">
                                                
                                                <div className="variant-picker-item">
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
                                                        onClick={()=>handleAddToCart(product, user, {quantity, price:((product?.salePrice || product?.price) * quantity).toFixed(2)})}
                                                        className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn btn-add-to-cart"><span>Add
                                                            to cart -&nbsp;</span><span
                                                            className="tf-qty-price total-price">{product?.currency}{((product?.salePrice || product?.price) * quantity).toFixed(2)}</span></a>
                                                    <a href="javascript:void(0);"
                                                        onClick={()=>handleAddToWishlist(product, user)}
                                                        className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action">
                                                        <span className="icon icon-heart"></span>
                                                        <span className="tooltip">Add to Wishlist</span>
                                                        <span className="icon icon-delete"></span>
                                                    </a>
                                                    
                                                    <div className="w-100">
                                                        <div data-bs-dismiss="modal">
                                                            <Link 
                                                                to="/account/orders/checkout" 
                                                                state={{
                                                                    product,
                                                                    user,
                                                                    quantity,
                                                                    paymentMethod:paymentmethod?.id,
                                                                    price: ((product?.salePrice || product?.price) * quantity).toFixed(2)
                                                                }}
                                                                className="btns-full">
                                                                Buy with 
                                                                <img src={paymentmethod?.image} alt={paymentmethod?.name} style={{maxHeight:'18px', marginLeft:'2rem'}} className='ms-2'/></Link>
                                                        </div>
                                                        <a
                                                            href="#payment_options"  
                                                            data-bs-toggle="offcanvas" 
                                                            aria-controls="offcanvasLeft" 
                                                            className="payment-more-option">
                                                                More payment options
                                                        </a>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="tf-product-info-extra-link">
                                                
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
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>

                <section className="flat-spacing-17 pt_0">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <Tab2 product={product} productReview={productReview} onCurrentCommentData={handleCurrentCommentData}/>
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
                                                    {(product?.discountEndDate && product?.discount) ?
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
                            
                        </div>
                    </div>
                </section>
                }                                                    
                

                {/* <!-- Testimonial --> */}
                <section className="flat-spacing-17 pt_0 flat-testimonial">
                    <div className="container">
                        <div className="flat-title">
                            <span className="title">Happy Clients</span>
                        </div>
                        <Scroller5 items={items} />
                    </div>
                </section>
                {/* <!-- /Testimonial --> */}

                <Footer />
                
            </div>
            
            
            
            <Extras categories={categories}  product={product} amount={quantity} currentComment={currentComment} />
        </div>
        )
    }
export default ProductDetails;