import Loader from "@/components/loader";
import Header from "@/components/toolbar/header";
import TopHeader from '@/components/toolbar/topHeader'
import Footer from "@/components/footer";
import Extras from '@/components/extra'
import useDeviceType from '@/hooks/useDeviceType';
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
import { Link, useLocation } from "react-router-dom";
import BreadCrumbs from '@/components/breadcrumbs';
import FilterAndSort from "@/components/filterandsort";
import currencies from "@/constants/currencies";
import { fetchProducts } from "../services/api/products";
import paypal from '@/assets/images/payments/paypal.png';
// import visa from '@/assets/images/payments/visa.png';
import mastercard from '@/assets/images/payments/img-2.png';
// Add these imports for your other images:
import cash from '@/assets/images/payments/cash.jpg';
import applepay from '@/assets/images/payments/applepay.jpg';
import googlepay from '@/assets/images/payments/googlepay.png';
import amazonpay from '@/assets/images/payments/amazonpay.jpg';
import cryptocurrency from '@/assets/images/payments/cryptocurrency.webp';
import {getDiscount} from '@/services/helper';
const products = [
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

const Products = ({ categories = [] }) => {
    const location = useLocation();
    const searchValue = location.state?.search || '';
    const { isMobile, isTablet, isDesktop } = useDeviceType();
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products|| []);
    const [paginatedProducts, setPaginatedProducts] = useState(filteredProducts||[]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
            const loadProducts = async () => {
                const response = await fetchProducts({ query:searchValue });
                // Assuming your response contains products in response.data or similar
                // console.log(response,'---')
                if (response.data.length > 0 ){
                    setFilteredProducts(response.data || products);
                    
                }else{
                    // setIsEmpty(true);
                }
                // setError(response.error);
                setLoading(response.loading);
            };
    
            if (searchValue) {
                loadProducts();
            }
        }, [searchValue]);
    const handleFilter = (items) => {
        // console.log(items,'----');
        setFilteredProducts(items);
        setPaginatedProducts(items);
        
    };

    const handlePageChange = ({ page, currentItems }) => {
        setPaginatedProducts(currentItems);
    };


    const isDiscountActive = (product) => {
        if (!product.discountEndDate) return false;
        return new Date(product.discountEndDate) <= new Date();
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
        // discounts: [10,20,30,50],
        discountEndDateRange: ["2025-05-01", "2025-05-20"]
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
  
                                              {isDiscountActive(product) && product.salePrice ? (
                                                  <span className="price current-price">
                                                      <div className="d-flex justify-content-between align-items-start flex-wrap">
                                                          <small className="text-success">{product.currency}{product.salePrice}</small>
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
                                                          <span className="ms-2 small text-danger">{getDiscount(product.price, product.salePrice)}% OFF</span>
                                                      </div>
                                                  </span>
                                              ) : (
                                                  <span className="price current-price">
                                                      <div className="d-flex justify-content-between align-items-start flex-wrap">
                                                          <small>{product.currency}{product.salePrice || product.price}</small>
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
                <Extras categories={categories}  product={selectedProduct} />
            </div>
        </div>
    );
};

export default Products;