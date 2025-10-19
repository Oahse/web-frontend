import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, TruckIcon, BadgeCheckIcon, ShieldIcon, HeadphonesIcon } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { CategoryCard } from '../components/category/CategoryCard';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useApi, usePaginatedApi } from '../hooks/useApi';
import { ProductsAPI } from '../apis';
import { Product, Category} from '../apis/types';
import { useCategories } from '../contexts/CategoryContext';

// Filter category configuration interfaces
interface FilterCategory {
  id: string;
  name: string;
  keywords: string[];
  exactMatches?: string[];
}

// Filter categories configuration system
const FILTER_CATEGORIES: Record<string, FilterCategory> = {
  'cereal-crops': {
    id: 'cereal-crops',
    name: 'Cereal Crops',
    keywords: ['cereal', 'grain', 'crop', 'rice', 'wheat', 'quinoa', 'oats', 'barley', 'corn', 'millet'],
    exactMatches: ['Cereal Crops', 'Grains', 'Cereals']
  },
  'legumes': {
    id: 'legumes',
    name: 'Legumes',
    keywords: ['legume', 'bean', 'pea', 'lentil', 'chickpea', 'soybean', 'kidney bean', 'black-eyed pea'],
    exactMatches: ['Legumes', 'Beans', 'Pulses']
  },
  'fruits-vegetables': {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    keywords: ['fruit', 'vegetable', 'produce', 'fresh', 'dried fruit', 'cassava', 'plantain', 'mango'],
    exactMatches: ['Fruits & Vegetables', 'Produce', 'Fresh Produce', 'Fruits', 'Vegetables']
  },
  'oilseeds': {
    id: 'oilseeds',
    name: 'Oilseeds',
    keywords: ['oil', 'seed', 'nut', 'shea', 'coconut', 'sesame', 'sunflower', 'peanut'],
    exactMatches: ['Oilseeds', 'Nuts', 'Oils', 'Seeds']
  }
};

// Flexible product matching function with case-insensitive keyword matching
const matchesCategory = (product: { category: string }, filterKey: string): boolean => {
  const category = FILTER_CATEGORIES[filterKey];
  if (!category) return false;
  
  // Handle edge cases in product category data
  if (!product.category || typeof product.category !== 'string') {
    return false;
  }
  
  const productCategory = product.category.toLowerCase().trim();
  
  // Check exact matches first (case-insensitive)
  if (category.exactMatches?.some(match => 
    productCategory === match.toLowerCase()
  )) {
    return true;
  }
  
  // Check keyword matches (case-insensitive)
  return category.keywords.some(keyword => 
    productCategory.includes(keyword.toLowerCase())
  );
};

// Hero slides data - Amazon-style instant loading with demo data
const heroSlides = [
  {
    id: 1,
    title: 'Organic Products from Africa',
    subtitle: 'Farm Fresh & Natural',
    description: 'Experience the authentic taste of Africa with our premium organic products.',
    buttonText: 'Shop Now',
    buttonLink: '/products/featured',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    title: 'Ethically Sourced Ingredients',
    subtitle: 'Pure & Natural',
    description: 'Supporting local farmers while bringing you the best quality African produce.',
    buttonText: 'Discover More',
    buttonLink: '/about',
    image: 'https://images.unsplash.com/photo-1595356161904-6708c97be89c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 3,
    title: 'Sustainable Packaging',
    subtitle: 'Eco-Friendly',
    description: 'Our commitment to the planet with biodegradable and recyclable packaging.',
    buttonText: 'Learn More',
    buttonLink: '/about',
    image: 'https://images.unsplash.com/photo-1509099652299-30938b0aeb63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  },
];

// Categories data - instant loading

const categories = [
  {
    id: 1,
    name: 'Cereal Crops',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1c0cf4b7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    count: 24,
    path: '/products?category=Cereal%20Crops',
  },
  {
    id: 2,
    name: 'Legumes',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757abe62ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    count: 18,
    path: '/products?category=Legumes',
  },
  {
    id: 3,
    name: 'Fruits & Veggies',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    count: 32,
    path: '/products?category=Fruits%20%26%20Veggies',
  },
  {
    id: 4,
    name: 'Oilseeds',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    count: 15,
    path: '/products?category=Oilseeds',
  },
  {
    id: 5,
    name: 'Spices and Herbs',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    count: 27,
    path: '/products?category=Spices%20and%20Herbs',
  },
  {
    id: 6,
    name: 'Nuts & Beverages',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    count: 21,
    path: '/products?category=Nuts%20%26%20Beverages',
  },
  { name: 'Brands', path: '/products?category=brands', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    count: 21,},
    { name: 'Fibers', path: '/products?category=fibers',image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    count: 21, },
    { name: 'Meat, Fish & Sweeteners', path: '/products?category=meat-fish-sweeteners',image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    count: 21, },
];

// Featured products data - instant loading
const featuredProducts = [
  {
    id: '1',
    name: 'Organic Shea Butter',
    price: 12.99,
    discountPrice: 9.99,
    rating: 4.8,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Oilseeds',
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Organic Peanuts',
    price: 18.99,
    discountPrice: null,
    rating: 4.9,
    reviewCount: 86,
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Oilseeds',
    isNew: false,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Organic Quinoa',
    price: 8.99,
    discountPrice: 6.99,
    rating: 4.7,
    reviewCount: 53,
    image: 'https://images.unsplash.com/photo-1612257999968-a42df8159183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Cereal Crops',
    isNew: false,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Dried Cassava',
    price: 15.99,
    discountPrice: null,
    rating: 4.6,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Fruits & Vegetables',
    isNew: true,
    isFeatured: true,
  },
];

// Popular products data - instant loading with updated categories for better filtering
const popularProducts = [
  {
    id: '5',
    name: 'Organic Brown Rice',
    price: 14.99,
    discountPrice: 11.99,
    rating: 4.7,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Cereal Crops',
    isNew: false,
    isFeatured: false,
  },
  {
    id: '6',
    name: 'Organic Wheat Flour',
    price: 9.99,
    discountPrice: null,
    rating: 4.9,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1c0cf4b7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Cereal Crops',
    isNew: false,
    isFeatured: false,
  },
  {
    id: '7',
    name: 'Black-Eyed Peas',
    price: 7.99,
    discountPrice: 5.99,
    rating: 4.8,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1515543904379-3d757abe62ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Legumes',
    isNew: true,
    isFeatured: false,
  },
  {
    id: '8',
    name: 'Red Kidney Beans',
    price: 12.99,
    discountPrice: null,
    rating: 4.9,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Legumes',
    isNew: false,
    isFeatured: false,
  },
  {
    id: '11',
    name: 'Organic Lentils',
    price: 8.99,
    discountPrice: 6.99,
    rating: 4.6,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Legumes',
    isNew: false,
    isFeatured: false,
  },
  {
    id: '12',
    name: 'Dried Mangoes',
    price: 11.99,
    discountPrice: null,
    rating: 4.8,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Fruits & Vegetables',
    isNew: true,
    isFeatured: false,
  },
  {
    id: '13',
    name: 'Organic Plantain Chips',
    price: 6.99,
    discountPrice: 4.99,
    rating: 4.5,
    reviewCount: 43,
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Fruits & Vegetables',
    isNew: false,
    isFeatured: false,
  },
  {
    id: '14',
    name: 'Sesame Seeds',
    price: 13.99,
    discountPrice: null,
    rating: 4.7,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Oilseeds',
    isNew: false,
    isFeatured: false,
  },
  {
    id: '15',
    name: 'Sunflower Seeds',
    price: 9.99,
    discountPrice: 7.99,
    rating: 4.6,
    reviewCount: 71,
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Oilseeds',
    isNew: true,
    isFeatured: false,
  },
];

// Deals data - instant loading
const deals = [
  {
    id: '9',
    name: 'Organic Coconut Oil',
    price: 16.99,
    discountPrice: 12.99,
    discountPercent: 24,
    rating: 4.7,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Oilseeds',
    endsIn: '2d 15h 22m',
  },
  {
    id: '10',
    name: 'Organic Chickpeas',
    price: 24.99,
    discountPrice: 19.99,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 47,
    image: 'https://images.unsplash.com/photo-1515543904379-3d757abe62ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    category: 'Legumes',
    endsIn: '1d 8h 15m',
  },
];

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'cereal-crops' | 'legumes' | 'fruits-vegetables' | 'oilseeds'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const { addItem: addToCart, removeItem: removeFromCart, items: cartItems } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  // API calls with quiet failure - use demo data as fallbackEstablished receive
  const { categories: apiCategories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const {data: featuredProductsData,execute: fetchFeaturedProducts,} = useApi<Product[]>({ showErrorToast: false });

  const {data: popularProductsData,execute: fetchPopularProducts,} = useApi<Product>({ showErrorToast: false });

  const {data: dealsData, execute: fetchDeals} = usePaginatedApi<PaginatedResponse<Product>>({ showErrorToast: false });

  // Fetch data on component mount with quiet failure
  useEffect(() => {

    // Fetch featured products - fail quietly, use demo data
    fetchFeaturedProducts(() => ProductsAPI.getFeaturedProducts(4)).catch(() => {
      // Quiet failure - demo data will be used
    });

    // Fetch popular products - fail quietly, use demo data
    fetchPopularProducts(() => ProductsAPI.getPopularProducts(8)).catch(() => {
      // Quiet failure - demo data will be used
    });

    // Fetch products for deals section - fail quietly, use demo data
    fetchDeals(() => ProductsAPI.getProducts({
      page: 1,
      limit: 12,
      sort_by: 'created_at',
      sort_order: 'desc'
    })).catch(() => {
      // Quiet failure - demo data will be used
    });
  }, []);

  // Simple carousel functionality
  const nextSlide = () => {
    setCurrentSlide((prev) => (heroSlides.length ? (prev + 1) % heroSlides.length : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (heroSlides.length ? (prev - 1 + heroSlides.length) % heroSlides.length : 0));
  };

  // Helper function to convert API products to demo format
  const convertApiProductToDemo = (product: Product): {
    id: string;
    name: string;
    price: number;
    discountPrice: number | null;
    rating: number;
    reviewCount: number;
    image: string;
    category: string;
    isNew: boolean;
    isFeatured: boolean;
  } => ({
    id: String(product.id),
    name: product.name,
    price: product.variants?.[0]?.base_price || 0,
    discountPrice: product.variants?.[0]?.sale_price || null,
    rating: product.rating || 4.5,
    reviewCount: product.review_count || 0,
    image: product.variants?.[0]?.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: product.category?.name || 'General',
    isNew: false,
    isFeatured: true,
  });

  // Helper function to convert API categories to demo format
  const convertApiCategoryToDemo = (category: Category): { id: string | number; name: string; image: string; count: number; path: string } => ({
    id: category.id,
    name: category.name,
    image: category.image_url || getCategoryImage(category.name),
    count: category.count || 0, // This would need to be calculated in the backend
    path: `/products?category=${encodeURIComponent(category.name)}`
  });

  // Function to get appropriate demo images for categories
  const getCategoryImage = (categoryName: string): string => {
    if (!categoryName) return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    const name = categoryName.toLowerCase();

    if (name.includes('cereal') || name.includes('grain') || name.includes('rice') || name.includes('wheat')) {
      return 'https://images.unsplash.com/photo-1574323347407-f5e1c0cf4b7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    }
    if (name.includes('legume') || name.includes('bean') || name.includes('pea')) {
      return 'https://images.unsplash.com/photo-1515543904379-3d757abe62ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    }
    if (name.includes('fruit') || name.includes('vegetable') || name.includes('produce')) {
      return 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    }
    if (name.includes('oil') || name.includes('seed') || name.includes('spice') || name.includes('herb')) {
      return 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    }
    if (name.includes('nut') || name.includes('beverage') || name.includes('drink')) {
      return 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    }

    return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
  };

  // Get data with API preference but demo fallback

  const getFeaturedProducts = () => {
    if (Array.isArray(featuredProductsData) && featuredProductsData.length > 0) {
      return featuredProductsData.map(convertApiProductToDemo);
    }
    return featuredProducts;
  };

  const getPopularProducts = () => {
    if (Array.isArray(popularProductsData) && popularProductsData.length > 0) {
      return popularProductsData.map(convertApiProductToDemo);
    }
    return popularProducts;
  };

  const getDealsProducts = () => {
    const apiItems = dealsData?.data || [];
    if (Array.isArray(apiItems) && apiItems.length > 0) {
      // Filter for products with discounts
      const productsWithDeals = apiItems
        .map(convertApiProductToDemo)
        .filter(product => product.discountPrice && product.discountPrice < product.price)
        .slice(0, 2);

      if (productsWithDeals.length > 0) {
        return productsWithDeals.map(product => ({
          ...product,
          discountPercent: Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100),
          endsIn: '2d 15h 22m' // Demo countdown
        }));
      }
    }
    return deals;
  };

  // Filter popular products based on active tab using enhanced matching system
  const getFilteredPopularProducts = () => {
    const products = getPopularProducts();

    if (activeTab === 'all') {
      return products;
    }

    // Use enhanced matching system for compatibility with both API and demo data
    return products.filter((product) => {
      return matchesCategory(product, activeTab);
    });
  };

  const filteredPopularProducts = getFilteredPopularProducts();

  return (
    <div className="pb-16 md:pb-0 text-copy">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[60vh] md:h-[70vh] w-full">
          <div className="absolute inset-0 bg-black/40 z-10" aria-hidden />
          <img
            src={heroSlides[currentSlide]?.image}
            alt={heroSlides[currentSlide]?.title || 'Hero image'}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl text-white">
              <motion.span
                className="inline-block px-4 py-1 bg-primary text-white rounded-full mb-4 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                {heroSlides[currentSlide]?.subtitle}
              </motion.span>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}>
                {heroSlides[currentSlide]?.title}
              </motion.h1>
              <motion.p
                className="text-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}>
                {heroSlides[currentSlide]?.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}>
                <Link
                  to={heroSlides[currentSlide]?.buttonLink || '/products'}
                  className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors">
                  {heroSlides[currentSlide]?.buttonText}
                  <ArrowRightIcon size={16} className="ml-2" />
                </Link>
              </motion.div>
            </div>
          </div>
          {/* Navigation buttons */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center">
            ❮
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center">
            ❯
          </button>
          {/* Pagination dots */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
            {heroSlides.map((_, index: number) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full mx-1 ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <TruckIcon size={24} className="text-primary" />
              </div>
              <h3 className="font-medium text-main">Free Delivery</h3>
              <p className="text-sm text-copy-light">From $49.99</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <BadgeCheckIcon size={24} className="text-primary" />
              </div>
              <h3 className="font-medium text-main">Certified Organic</h3>
              <p className="text-sm text-copy-light">100% Guarantee</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <ShieldIcon size={24} className="text-primary" />
              </div>
              <h3 className="font-medium text-main">Secure Payments</h3>
              <p className="text-sm text-copy-light">100% Protected</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <HeadphonesIcon size={24} className="text-primary" />
              </div>
              <h3 className="font-medium text-main">24/7 Support</h3>
              <p className="text-sm text-copy-light">Dedicated Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <span className="text-primary font-medium">Explore our product range</span>
              <h2 className="text-2xl md:text-3xl font-bold text-main mt-1">Shop Categories</h2>
            </div>
            <Link to="/products" className="inline-flex items-center text-primary hover:underline mt-4 md:mt-0">
              All Categories
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>

          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {categoriesLoading ? (
              <p>Loading categories...</p>
            ) : categoriesError ? (
              <p>Error loading categories: {categoriesError.message}</p>
            ) : (
              (apiCategories || []).slice(0, 10).map(convertApiCategoryToDemo).map((category: { id: string | number; name: string; image: string; count: number; path: string }) => (
                <div key={category.id} className="flex-none w-40">
                  <CategoryCard
                    category={category}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <span className="text-primary font-medium">Popular Products</span>
              <h2 className="text-2xl md:text-3xl font-bold text-main mt-1">Featured Products</h2>
            </div>
            <Link
              to="/products?featured=true"
              className="inline-flex items-center text-primary hover:underline mt-4 md:mt-0">
              All Featured
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {getFeaturedProducts().map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                isInCart={cartItems.some(item => String(item.id) === String(product.id))}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                isInWishlist={isInWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products with Tabs */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <span className="text-primary font-medium">Best Sellers</span>
              <h2 className="text-2xl md:text-3xl font-bold text-main mt-1">Popular Products</h2>
            </div>
            <Link to="/products?popular=true" className="inline-flex items-center text-primary hover:underline mt-4 md:mt-0">
              All Popular
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105 ${activeTab === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface text-copy hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary'
                }`}>
              All Products
            </button>
            <button
              onClick={() => setActiveTab('cereal-crops')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105 ${activeTab === 'cereal-crops'
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface text-copy hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary'
                }`}>
              Cereal Crops
            </button>
            <button
              onClick={() => setActiveTab('legumes')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105 ${activeTab === 'legumes'
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface text-copy hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary'
                }`}>
              Legumes
            </button>
            <button
              onClick={() => setActiveTab('fruits-vegetables')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105 ${activeTab === 'fruits-vegetables'
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface text-copy hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary'
                }`}>
              Fruits & Vegetables
            </button>
            <button
              onClick={() => setActiveTab('oilseeds')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:scale-105 ${activeTab === 'oilseeds'
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface text-copy hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary'
                }`}>
              Oilseeds
            </button>
          </div>

          {/* Product Grid or Empty State */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {filteredPopularProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {filteredPopularProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    <ProductCard
                      product={product}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      isInCart={cartItems.some(item => String(item.id) === String(product.id))}
                      addToWishlist={addToWishlist}
                      removeFromWishlist={removeFromWishlist}
                      isInWishlist={isInWishlist(product.id)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="max-w-md mx-auto">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-4 bg-surface-hover rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
                  >
                    <svg className="w-8 h-8 text-copy-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
                    </svg>
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-medium text-main mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    No products found
                  </motion.h3>
                  <motion.p 
                    className="text-copy-light mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    {activeTab === 'all' 
                      ? "We couldn't find any products at the moment."
                      : `We couldn't find any products in the "${FILTER_CATEGORIES[activeTab]?.name || activeTab}" category.`
                    }
                  </motion.p>
                  {activeTab !== 'all' && (
                    <motion.div 
                      className="space-y-2 text-sm text-copy-light"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <p>Try browsing:</p>
                      <button
                        onClick={() => setActiveTab('all')}
                        className="inline-flex items-center text-primary hover:text-primary-dark hover:underline transition-colors duration-200"
                      >
                        All Products
                        <ArrowRightIcon size={14} className="ml-1" />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Deals of the day */}
      <section className="py-10 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <span className="text-primary font-medium">Best deals</span>
              <h2 className="text-2xl md:text-3xl font-bold text-main mt-1">Top Deals of the Day</h2>
            </div>
            <Link to="/products?sale=true" className="inline-flex items-center text-primary hover:underline mt-4 md:mt-0">
              All Deals
              <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getDealsProducts().map((product: {
              id: string;
              name: string;
              price: number;
              discountPrice: number | null;
              rating: number;
              reviewCount: number;
              image: string;
              category: string;
              isNew: boolean;
              isFeatured: boolean;
              discountPercent?: number;
              endsIn?: string;
            }) => (
              <div key={product.id} className="flex flex-col md:flex-row bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="md:w-1/3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 md:h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      -{product.discountPercent || Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100)}%
                    </span>
                    <span className="text-red-500 text-sm font-medium">
                      Ends in {product.endsIn || '2d 15h 22m'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-main mb-2">{product.name}</h3>
                  <p className="text-sm text-copy-light mb-4">{product.category}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                            }`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-copy-light">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-primary">${product.discountPrice || product.price}</span>
                    {product.discountPrice && (
                      <span className="text-sm text-copy-light line-through">${product.price}</span>
                    )}
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors text-sm">
                    View Deal
                    <ArrowRightIcon size={14} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};