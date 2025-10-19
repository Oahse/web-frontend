import React, { useState, Suspense, lazy, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, ShareIcon, MinusIcon, PlusIcon, CheckIcon, TruckIcon, RefreshCwIcon, ChevronLeftIcon, Facebook, Twitter, Linkedin, ChevronRightIcon } from 'lucide-react';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useApi } from '../../hooks/useApi';
import { ProductsAPI } from '../../apis';
import { Product as APIProduct } from '../../apis/types';
import ErrorMessage from '../common/ErrorMessage';
import ReviewForm from './ReviewForm';

const ProductCard = lazy(() => import('../product/ProductCard').then(module => ({
  default: module.ProductCard
})));
const shareProduct = (platform: string, productUrl: string, productName: string) => {
  let shareUrl = '';
  const encodedUrl = encodeURIComponent(productUrl);
  const encodedName = encodeURIComponent(productName);
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedName}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      break;
    case 'pinterest':
      shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedName}`;
      break;
  }
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
};
export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<APIProduct['variants'][0] | undefined>(undefined);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  // API calls
  const {
    data: product,
    loading,
    error,
    execute: fetchProduct,
  } = useApi<APIProduct>();

  const {
    data: relatedProducts,
    loading: relatedLoading,
    error: relatedError,
    execute: fetchRelatedProducts,
  } = useApi<APIProduct[]>();

  const {
    data: reviews,
    loading: reviewsLoading,
    error: reviewsError,
    execute: fetchReviews,
  } = useApi<{
    data: Array<{
      id: string;
      rating: number;
      title?: string;
      comment: string;
      user?: {
        firstname: string;
        lastname: string;
      };
      created_at: string;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>();

  useEffect(() => {
    if (id) {
      // Fetch product details
      fetchProduct(() => ProductsAPI.getProduct(id));

      // Fetch related products
      fetchRelatedProducts(() => ProductsAPI.getRecommendedProducts(id, 4));

      // Fetch product reviews
      fetchReviews(() => ProductsAPI.getProductReviews(id, 1, 10));
    }
  }, [id, fetchProduct, fetchRelatedProducts, fetchReviews]);

  // Set selected variant when product loads
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
    console.log('Selected Variant:', product.variants);
  }, [product]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="bg-dark-200 rounded-lg h-96 mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-md h-24"></div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-200 h-8 rounded mb-4"></div>
              <div className="bg-gray-200 h-6 rounded mb-4 w-1/2"></div>
              <div className="bg-gray-200 h-8 rounded mb-6 w-1/3"></div>
              <div className="bg-gray-200 h-20 rounded mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          error={error}
          onRetry={() => id && fetchProduct(() => ProductsAPI.getProduct(id))}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="text-primary hover:underline">
          Browse all products
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    addItem({
      id: selectedVariant.id,
      name: `${product.name} - ${selectedVariant.name}`,
      price: selectedVariant.sale_price || selectedVariant.base_price,
      quantity: quantity,
      image: selectedVariant.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      variant: selectedVariant.name
    });
    toast.success(`Added to cart! ${product.name} - ${selectedVariant.name} has been added to your cart.`);
  };

  const handleAddToWishlist = () => {
    if (!product || !selectedVariant) return;
    addToWishlist({
      id: product.id,
      name: product.name,
      price: selectedVariant.sale_price || selectedVariant.base_price,
      image: selectedVariant.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    });
    if (!isInWishlist(product.id)) {
      toast.success(`Added to wishlist! ${product.name} has been added to your wishlist.`);
    } else {
      toast(`Already in wishlist: ${product.name} is already in your wishlist.`);
    }
  };

  const isWishlisted = isInWishlist(product.id);

  // Get all images from selected variant
  
  const productImages = selectedVariant?.images || [];

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + productImages.length) % productImages.length);
  };

  const productUrl = window.location.href;

  // Calculate review statistics
  const reviewsData = reviews?.data || [];
  const averageRating = product?.rating || 0;
  const reviewCount = product?.review_count || 0;

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Products', link: '/products' },
    { label: product.category?.name || 'Category', link: `/products?category=${encodeURIComponent(product.category?.name || '')}` },
    { label: product.name },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="mb-4 relative">
            <div className="rounded-lg overflow-hidden bg-gray-100">
              {productImages.length > 0 ? (
                <img
                  src={productImages[currentImageIndex]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                  alt={productImages[currentImageIndex]?.alt_text || `${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            {/* Navigation buttons */}
            {productImages.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors">
                  <ChevronLeftIcon size={20} />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors">
                  <ChevronRightIcon size={20} />
                </button>
              </>
            )}
          </div>
          {/* Thumbnails */}
          {productImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden h-24 transition-all ${currentImageIndex === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt_text || `${product.name} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold text-main mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(averageRating))}
              {'☆'.repeat(5 - Math.floor(averageRating))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({reviewCount} reviews)
            </span>
          </div>
          <div className="mb-6">
            {selectedVariant && selectedVariant.sale_price ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary mr-2">
                  ${selectedVariant.sale_price.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through">
                  ${selectedVariant.base_price.toFixed(2)}
                </span>
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                  Save $
                  {(selectedVariant.base_price - selectedVariant.sale_price).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-primary">
                ${selectedVariant?.base_price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="mb-6">
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-main font-medium mr-4">Size:</span>
              <div className="flex gap-2">
                {product.variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 py-1 border rounded-md ${selectedVariant?.id === variant.id ? 'border-primary text-primary bg-primary/5' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <div className="flex items-center border border-gray-300 rounded-md mr-4">
              <button onClick={() => handleQuantityChange(quantity - 1)} className="px-3 py-2 text-gray-600 hover:text-primary" disabled={quantity <= 1}>
                <MinusIcon size={16} />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-12 text-center border-none focus:outline-none"
              />
              <button onClick={() => handleQuantityChange(quantity + 1)} className="px-3 py-2 text-gray-600 hover:text-primary">
                <PlusIcon size={16} />
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-grow bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center"
            >
              <ShoppingCartIcon size={18} className="mr-2" />
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToWishlist}
              className={`ml-3 w-12 h-12 rounded-full flex items-center justify-center ${isWishlisted ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <HeartIcon size={20} />
            </motion.button>
            <div className="relative ml-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center"
              >
                <ShareIcon size={20} />
              </motion.button>
              {shareMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-2 z-10 border border-gray-200">
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center p-2 hover:bg-gray-100 rounded-md" onClick={() => shareProduct('facebook', productUrl, product.name)}>
                      <Facebook size={18} className="mr-2 text-blue-600" />
                      <span className="text-sm">Facebook</span>
                    </button>
                    <button className="flex items-center p-2 hover:bg-gray-100 rounded-md" onClick={() => shareProduct('twitter', productUrl, product.name)}>
                      <Twitter size={18} className="mr-2 text-blue-400" />
                      <span className="text-sm">Twitter</span>
                    </button>
                    <button className="flex items-center p-2 hover:bg-gray-100 rounded-md" onClick={() => shareProduct('linkedin', productUrl, product.name)}>
                      <Linkedin size={18} className="mr-2 text-blue-700" />
                      <span className="text-sm">LinkedIn</span>
                    </button>
                    <button className="flex items-center p-2 hover:bg-gray-100 rounded-md" onClick={() => shareProduct('pinterest', productUrl, product.name)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-600">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      <span className="text-sm">Pinterest</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <CheckIcon size={14} className="text-green-600" />
              </div>
              <span className="text-sm">
                <span className="font-medium text-main">Availability:</span>{' '}
                {selectedVariant && selectedVariant.stock > 0 ? 'In Stock' : 'Out of Stock'}
                {selectedVariant && selectedVariant.stock > 0 && (
                  <span className="text-gray-500 ml-1">({selectedVariant.stock} available)</span>
                )}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <TruckIcon size={14} className="text-blue-600" />
              </div>
              <span className="text-sm">
                <span className="font-medium text-main">Shipping:</span> Free
                shipping on orders over $49.99
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <RefreshCwIcon size={14} className="text-purple-600" />
              </div>
              <span className="text-sm">
                <span className="font-medium text-main">Returns:</span> 30-day
                return policy
              </span>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-sm">
                <span className="font-medium text-main">Supplier:</span>{' '}
                {product.supplier?.firstname} {product.supplier?.lastname}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-sm">
                <span className="font-medium text-main">SKU:</span>{' '}
                {selectedVariant?.sku}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm">
                <span className="font-medium text-main">Category:</span>{' '}
                {product.category?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Product Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button onClick={() => setActiveTab('description')} className={`pb-4 px-1 ${activeTab === 'description' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500'}`}>
              Description
            </button>
            <button onClick={() => setActiveTab('features')} className={`pb-4 px-1 ${activeTab === 'features' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500'}`}>
              Features
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`pb-4 px-1 ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-500'}`}>
              Reviews ({reviewCount})
            </button>
          </div>
        </div>
        <div className="py-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Our premium organic shea butter is harvested using traditional
                methods that have been passed down through generations. The nuts
                are collected, cleaned, and processed by hand to ensure the
                highest quality product.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                The butter is then carefully packaged to preserve its natural
                properties and shipped directly to our facilities where it
                undergoes rigorous quality testing before reaching your
                doorstep.
              </p>
            </div>
          )}
          {activeTab === 'features' && (
            <div>
              <h3 className="text-lg font-medium text-main mb-4">
                Product Details
              </h3>
              {selectedVariant?.attributes && Object.keys(selectedVariant.attributes).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-main mb-2">Specifications</h4>
                  <ul className="space-y-2">
                    {Object.entries(selectedVariant.attributes).map(([key, value]) => (
                      <li key={key} className="flex items-start">
                        <CheckIcon size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">
                          <strong className="capitalize">{key.replace('_', ' ')}:</strong> {String(value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div>
                  <h4 className="font-medium text-main mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        style={{ backgroundColor: tag.color ? `${tag.color}20` : undefined }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <h3 className="text-lg font-medium text-main mt-6 mb-4">
                How to Use
              </h3>
              <p className="text-gray-600 leading-relaxed">
                For skin: Apply a small amount to damp skin and massage gently
                until absorbed. Can be used daily on face and body.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                For hair: Warm a small amount between palms and apply to hair
                ends or use as a deep conditioning treatment.
              </p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-medium text-main mb-2">
                  Customer Reviews
                </h3>
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {'★'.repeat(Math.floor(averageRating))}
                    {'☆'.repeat(5 - Math.floor(averageRating))}
                  </div>
                  <span className="text-sm text-gray-500">
                    Based on {reviewCount} reviews
                  </span>
                </div>
              </div>

              {reviewsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse border-b border-gray-200 pb-4">
                      <div className="flex items-center mb-2">
                        <div className="bg-gray-200 h-4 w-20 rounded mr-2"></div>
                        <div className="bg-gray-200 h-4 w-24 rounded"></div>
                      </div>
                      <div className="bg-gray-200 h-16 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : reviewsError ? (
                <ErrorMessage
                  error={reviewsError}
                  onRetry={() => id && fetchReviews(() => ProductsAPI.getProductReviews(id, 1, 10))}
                />
              ) : reviewsData.length > 0 ? (
                <div className="space-y-6">
                  {reviewsData.map((review) => (
                    <div key={review.id} className="border-b border-border-light pb-6 mb-6 last:border-0 last:mb-0">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400 mr-2">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </div>
                        <span className="font-semibold text-main text-sm">
                          {review.user?.firstname} {review.user?.lastname}
                        </span>
                        <span className="text-xs text-copy-light ml-2">
                          - {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {review.title && (
                        <h4 className="font-medium text-main mb-1">{review.title}</h4>
                      )}
                      <p className="text-copy-light text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed border-border-light rounded-lg bg-surface-hover/20">
                  <p className="text-copy-light text-lg font-medium">No reviews yet. Be the first to review this product!</p>
                  <p className="text-copy-lighter text-sm mt-2">Share your thoughts and help other shoppers.</p>
                </div>
              )}

              <div className="mt-8">
                <Link to={`/product/${product.id}/reviews`} className="inline-flex items-center text-primary hover:underline">
                  See all reviews
                  <ChevronRightIcon size={16} className="ml-1" />
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-border-light">
                <h3 className="text-lg font-medium text-main mb-4">Write a Review</h3>
                <ReviewForm productId={product.id} onReviewSubmitted={() => fetchReviews(() => ProductsAPI.getProductReviews(id, 1, 10))} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-main mb-6">Related Products</h2>

        {relatedLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-48 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded mb-1"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : relatedError ? (
          <ErrorMessage
            error={relatedError}
            onRetry={() => id && fetchRelatedProducts(() => ProductsAPI.getRecommendedProducts(id, 4))}
          />
        ) : relatedProducts && relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Suspense fallback={<div className="col-span-4 h-48 flex items-center justify-center">
              Loading related products...
            </div>}>
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct.id}
                  product={{
                    id: String(relatedProduct.id),
                    name: relatedProduct.name,
                    price: relatedProduct.variants?.[0]?.base_price || 0,
                    discountPrice: relatedProduct.variants?.[0]?.sale_price || null,
                    rating: relatedProduct.rating || 0,
                    reviewCount: relatedProduct.review_count || 0,
                    image: relatedProduct.variants?.[0]?.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    category: relatedProduct.category?.name || 'General',
                    isNew: false,
                    isFeatured: false,
                  }}
                  addToCart={() => {
                    const variant = relatedProduct.variants?.[0];
                    if (variant) {
                      addItem({
                        id: variant.id,
                        name: relatedProduct.name,
                        price: variant.sale_price || variant.base_price,
                        quantity: 1,
                        image: variant.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                        variant: variant.name
                      });
                    }
                  }}
                  removeFromCart={() => {
                    // Not implemented for related products
                  }}
                  isInCart={false} // Not tracked for related products
                  addToWishlist={() => {
                    const variant = relatedProduct.variants?.[0];
                    if (variant) {
                      addToWishlist({
                        id: relatedProduct.id,
                        name: relatedProduct.name,
                        price: variant.sale_price || variant.base_price,
                        image: variant.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                      });
                    }
                  }}
                  removeFromWishlist={() => {
                    // Not implemented for related products
                  }}
                  isInWishlist={false} // Not tracked for related products
                />
              ))}
            </Suspense>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No related products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};