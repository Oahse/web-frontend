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
import shirt1 from '@/assets/images/products/light-green-1.jpg';
import shirt2 from '@/assets/images/products/light-green-2.jpg';
import white1 from '@/assets/images/products/white-1.jpg';
import black1 from '@/assets/images/products/black-1.jpg';
import orange1 from '@/assets/images/products/orange-1.jpg';
import spicesHerbsImage from '@/assets/images/collections/spicesherbs.jpg';
import meatFishSweetenersImage from "@/assets/images/collections/meat.jpg";
import paypal from '@/assets/images/payments/paypal.png';
// import visa from '@/assets/images/payments/visa.png';
import mastercard from '@/assets/images/payments/img-2.png';
// Add these imports for your other images:
import cash from '@/assets/images/payments/cash.jpg';
import applepay from '@/assets/images/payments/applepay.jpg';
import googlepay from '@/assets/images/payments/googlepay.png';
import amazonpay from '@/assets/images/payments/amazonpay.jpg';
import cryptocurrency from '@/assets/images/payments/cryptocurrency.webp';
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
import useAuth from '@/hooks/useAuth';
import { handleAddToCart,handleAddToWishlist } from '@/services/helper';
// import "./App.css";


// if you want to use array
const productsCategories = [
  {
    id: 'meat',
    name: 'Meat',
    href: '#meat',
    active: true,
    products: [
      {
        id: 1,
        name: 'Chicken Breast',
        price: 12.5,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'FarmFresh',
        category: 'Meat',
        images: [img1, meatFishSweetenersImage],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        name: 'Lamb Chops',
        price: 18.75,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Butcher’s Best',
        category: 'Meat',
        images: [groceryBanner2, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 3,
        name: 'Turkey Legs',
        price: 10.8,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'TurkeyTime',
        category: 'Meat',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 4,
        name: 'Pork Ribs',
        price: 14.6,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'PiggyFarm',
        category: 'Meat',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 5,
        name: 'Sausages',
        price: 9.5,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'MeatCo',
        category: 'Meat',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 6,
        name: 'Ground Beef',
        price: 11.2,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'BeefLand',
        category: 'Meat',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 }
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
        id: 7,
        name: 'Duck Breast',
        price: 16.3,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'QuackFarm',
        category: 'Meat',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
      }
    ]
  },
  {
    id: 'fibers',
    name: 'Fibers',
    href: '#fibers',
    active: false,
    products: [
      {
        id: 8,
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
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
      }
    ]
  },
  {
    id: 'oils',
    name: 'Oils',
    href: '#oils',
    active: false,
    products: [
      {
        id: 9,
        name: 'Olive Oil',
        price: 9.99,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Oliva',
        category: 'Oils',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 10,
        name: 'Sunflower Oil',
        price: 7.5,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'SunnyFarm',
        category: 'Oils',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        name: 'Coconut Oil',
        price: 8.25,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Tropicoil',
        category: 'Oils',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        name: 'Avocado Oil',
        price: 10.6,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'AvocaPure',
        category: 'Oils',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 13,
        name: 'Canola Oil',
        price: 6.4,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'CanolaKing',
        category: 'Oils',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 14,
        name: 'Peanut Oil',
        price: 7.8,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'NutriOil',
        category: 'Oils',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 15,
        name: 'Sesame Oil',
        price: 9.1,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Sesamoil',
        category: 'Oils',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 16,
        name: 'Grapeseed Oil',
        price: 8.75,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'GrapeseedPro',
        category: 'Oils',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
      }
    ]
  },
  {
    id: 'fruits',
    name: 'Fruits',
    href: '#fruits',
    active: false,
    products: [
      {
        id: 17,
        name: 'Bananas',
        price: 4.2,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Tropical Farms',
        category: 'Fruits',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 18,
        name: 'Apples',
        price: 5.0,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'OrchardFresh',
        category: 'Fruits',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 19,
        name: 'Mangoes',
        price: 6.3,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Sunny Mangoes',
        category: 'Fruits',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 20,
        name: 'Grapes',
        price: 4.5,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Vineyard Select',
        category: 'Fruits',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 21,
        name: 'Oranges',
        price: 3.9,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'CitrusCo',
        category: 'Fruits',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 22,
        name: 'Strawberries',
        price: 5.75,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Berry Farms',
        category: 'Fruits',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 23,
        name: 'Pineapple',
        price: 3.8,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'TropiCo',
        category: 'Fruits',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 24,
        name: 'Blueberries',
        price: 6.1,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'BlueBerry Inc.',
        category: 'Fruits',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
      }
    ]
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    href: '#tomatoes',
    active: false,
    products: [
      {
        id: 25,
        name: 'Cherry Tomatoes',
        price: 3.1,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Tomato Co.',
        category: 'Tomatoes',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 26,
        name: 'Plum Tomatoes',
        price: 3.9,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Tomato Co.',
        category: 'Tomatoes',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 27,
        name: 'Heirloom Tomatoes',
        price: 4.7,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Heritage Farms',
        category: 'Tomatoes',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 28,
        name: 'Roma Tomatoes',
        price: 2.8,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Roma Farms',
        category: 'Tomatoes',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 29,
        name: 'Grape Tomatoes',
        price: 3.6,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Grape Farms',
        category: 'Tomatoes',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 30,
        name: 'Green Tomatoes',
        price: 4.2,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Green Farms',
        category: 'Tomatoes',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 31,
        name: 'Beefsteak Tomatoes',
        price: 4.95,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Steak Farms',
        category: 'Tomatoes',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 32,
        name: 'Campari Tomatoes',
        price: 4.35,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Campari Co.',
        category: 'Tomatoes',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
      }
    ]
  },
  {
    id: 'soup',
    name: 'Soup',
    href: '#soup',
    active: false,
    products: [
      {
        id: 33,
        name: 'Pumpkin Soup',
        price: 5.5,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Soup Master',
        category: 'Soup',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 34,
        name: 'Tomato Basil Soup',
        price: 4.8,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Soup Master',
        category: 'Soup',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 35,
        name: 'Chicken Noodle Soup',
        price: 6.0,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Soup Master',
        category: 'Soup',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 36,
        name: 'Beef Barley Soup',
        price: 6.9,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Soup Master',
        category: 'Soup',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 37,
        name: 'Vegetable Soup',
        price: 5.2,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Soup Master',
        category: 'Soup',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 38,
        name: 'Lentil Soup',
        price: 4.6,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Soup Master',
        category: 'Soup',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 39,
        name: 'Clam Chowder',
        price: 7.1,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Soup Master',
        category: 'Soup',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
        id: 40,
        name: 'Minestrone Soup',
        price: 5.4,
        currency: '$',
        discount: 0,
        discountStartDate: null,
        availability: 'In stock',
        brand: 'Soup Master',
        category: 'Soup',
        images: [img1, img2],
        colors: [
          { name: 'Blue Stripe', swatch: 'bg_stripe-blue', image: shirt1 },
          { name: 'Grey', swatch: 'bg_grey', image: shirt2 }
        ],
        sizes: [
          { label: 'S', id: 'values-s', price: 0 },
          { label: 'M', id: 'values-m', price: 9 },
          { label: 'L', id: 'values-l', price: 10 },
          { label: 'XL', id: 'values-xl', price: 12 }
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
      }
    ]
  }
];


function Home({categories=[]}) {
  const { isMobile} = useDeviceType();
  const { loading:isloading, error, user} = useAuth();
  const [loading, setLoading] = useState(isloading);
  const [currentproduct, setCurrentProduct] = useState(null);
  const slides = [
    {
      img: slidegrocery1,
      headingone: "Don’t miss amazing",
      headingtwo: "grocery deals",
      body: "Save up to 30% off on your first order",
      btntext: "Shop Categories",
      link:'/products'
    },
    {
      img: slidegrocery2,
      headingone: "Sweet Crunchy",
      headingtwo: "Salad",
      body: "Fresh and delicious options for you",
      btntext: "Explore Now",
      link:'/products'
    },
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
      description:{
        desc:'Button-up shirt sleeves and a relaxed silhouette.',
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
                                                <CountDownTimer starttime={deal.timer} />
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
                                                      <Link to={`/products/${product.id || productIndex}`} state={{ product }}  className="product-img">
                                                          {product.images.map((image, productImageIndex)=>(
                                                              <img key={`product-image-${productImageIndex}`} className={`lazyload ${productImageIndex>0?'img-product':'img-hover'}`} data-src={image}
                                                              src={image} alt="image-product" style={{minWidth:'70px',height:`200px`}}/>
                                                          ))}
                                                      </Link>
                                                      <div className="list-product-btn absolute-2">
                                                          <a href="javascript:void(0);" onClick={()=>handleAddToWishlist(product, user)}
                                                              className="box-icon bg_white wishlist btn-icon-action">
                                                              <Icon icon={'icon-heart'}></Icon>
                                                              <span className="tooltip">Add to Wishlist</span>
                                                              <Icon icon={'icon-delete'}></Icon>
                                                          </a>
                                                          <a href="#quick_view" data-bs-toggle="modal" onClick={()=>setCurrentProduct(product)}
                                                              className="box-icon bg_white quickview tf-btn-loading">
                                                              <Icon icon={'icon-view'}></Icon>
                                                              <span className="tooltip">Quick View</span>
                                                          </a>
                                                      </div>
                                                    </>}
                                                    info={
                                                      <>
                                                          <div className="inner-info">
                                                              <Link to={`/products/${product.id || productIndex}`} state={{ product }}  className="title link fw-6">{product.name}</Link>
                                                              <span className="price fw-6">{product.price}</span>
                                                          </div>
                                                          <div className="list-product-btn">
                                                              <a href="#quick_add" data-bs-toggle="modal" onClick={()=>setCurrentProduct(product)}
                                                                  className="box-icon quick-add tf-btn-loading">
                                                                  <Icon icon={'icon-bag'}></Icon>
                                                                  <span className="tooltip">Add to cart</span>
                                                              </a>
                                                          </div>
                                                      </>
                                                    }
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
        <Extras categories={categories} product={currentproduct} user={user}/>
        
      </div>
  )

}

export default Home;