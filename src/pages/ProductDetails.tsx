import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronRightIcon,
  HeartIcon,
  ShareIcon,
  ShoppingCartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
  MinusIcon,
  PlusIcon,
  QrCodeIcon,
  ScanLineIcon,
} from 'lucide-react';

import { ProductImageGallery } from '../components/product/ProductImageGallery';
import { VariantSelector } from '../components/product/VariantSelector';
import { QRCodeModal } from '../components/product/QRCodeModal';
import { BarcodeModal } from '../components/product/BarcodeModal';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useApi, usePaginatedApi } from '../hooks/useApi';
import { ProductsAPI, ReviewsAPI } from '../apis';
import { Product, Review as APIReview } from '../apis/types';
import ErrorMessage from '../components/common/ErrorMessage';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

// Transform API product data
const transformProduct = (product: Product, averageRating: number, reviewCount: number) => ({
  id: product.id,
  name: product.name,
  price: product.variants?.[0]?.base_price || 0,
  discountPrice: product.variants?.[0]?.sale_price || null,
  rating: averageRating, 
  reviewCount: reviewCount, 
  description: product.description,
  longDescription: product.description, 
  category: product.category?.name || 'General',
  brand: product.supplier ? `${product.supplier.firstname} ${product.supplier.lastname}` : 'Banwee',
  sku: product.variants?.[0]?.sku || 'N/A',
  stock: product.variants?.[0]?.stock || 0,
  images: product.variants?.[0]?.images?.map(img => img.url) || [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  ],
  variants: product.variants?.map(variant => ({
    id: variant.id,
    name: variant.name,
    base_price: variant.base_price,
    sale_price: variant.sale_price,
    stock: variant.stock,
    sku: variant.sku,
    attributes: variant.attributes
  })) || [],
  features: [
    'High Quality Product',
    'Fast Shipping',
    'Customer Satisfaction Guaranteed',
    'Secure Payment',
  ],
  specifications: {
    'Product Name': product.name,
    'Category': product.category?.name || 'General',
    'Supplier': product.supplier ? `${product.supplier.firstname} ${product.supplier.lastname}` : 'Banwee',
    'SKU': product.variants?.[0]?.sku || 'N/A',
  },
  reviews: [], 
});

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedVariant, setSelectedVariant] = useState<{
    id: string;
    name: string;
    base_price: number;
    sale_price?: number;
    stock: number;
    sku: string;
    attributes: Record<string, unknown>;
    barcode?: string;
    qr_code?: string;
  } | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showQR, setShowQR] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [maxRating, setMaxRating] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [reviewsPage, setReviewsPage] = useState(1);

  const { addItem: addToCart, removeItem: removeFromCart, updateQuantity, cart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist, defaultWishlist } = useWishlist();
  const { isAuthenticated, setRedirectPath } = useAuth();

  // API calls
  const {
    data: productData,
    loading: productLoading,
    error: productError,
    execute: fetchProduct,
  } = useApi<Product>({ showErrorToast: false });

  const {
    data: relatedProductsData,
    loading: relatedLoading,
    error: relatedError,
    execute: fetchRelatedProducts,
  } = useApi<Product[]>({ showErrorToast: false });

  const {
    data: reviewsData,
    loading: reviewsLoading,
    error: reviewsError,
    execute: fetchReviews,
  } = usePaginatedApi<APIReview>();

  // Fetch product data
  useEffect(() => {
    if (id) {
      fetchProduct(() => ProductsAPI.getProduct(id));
      fetchRelatedProducts(() => ProductsAPI.getRecommendedProducts(id, 4));
    }
  }, [id, fetchProduct, fetchRelatedProducts]);

  // Fetch reviews when product ID, filters, or page change
  useEffect(() => {
    if (id) {
      fetchReviews(() => ReviewsAPI.getProductReviews(id, reviewsPage, 10, minRating, maxRating, sortBy));
    }
  }, [id, reviewsPage, minRating, maxRating, sortBy, fetchReviews]);

  // Set initial variant when product loads
  useEffect(() => {
    if (productData && productData.variants && productData.variants.length > 0) {
      const variant = productData.variants[0];
      setSelectedVariant({
        id: variant.id,
        name: variant.name,
        base_price: variant.base_price,
        sale_price: variant.sale_price,
        stock: variant.stock,
        sku: variant.sku,
        attributes: variant.attributes,
        barcode: variant.barcode,
        qr_code: variant.qr_code,
      });
    }
  }, [productData]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  if (!id) {
    return <div>Product not found</div>;
  }

  if (productLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded"></div>
              <div className="bg-gray-200 h-6 rounded w-3/4"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              <div className="bg-gray-200 h-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (productError || !productData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          error={productError || { error: true, message: 'Product not found' }}
          onRetry={() => fetchProduct(() => ProductsAPI.getProduct(id))}
        />
      </div>
    );
  }

  const averageRating = reviewsData?.data ? reviewsData.data.reduce((acc, review) => acc + review.rating, 0) / reviewsData.data.length : 0;
  const totalReviews = reviewsData?.total || 0;

  const product = transformProduct(productData, averageRating, totalReviews);
  const isInWishlistState = isInWishlist(product.id, selectedVariant?.id);

  // Get cart item quantity
  const cartItem = cart?.items.find(item => item.variant.id === selectedVariant?.id);
  const cartQuantity = cartItem?.quantity || 0;

  // Check if product is in wishlist
  const wishlistQuantity = isInWishlistState ? 1 : 0;

  return (
    <div className="pb-16 md:pb-0">
      {/* Breadcrumb */}
      <div className="bg-surface py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-copy-light">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRightIcon size={16} />
            <Link to="/products" className="hover:text-primary">Products</Link>
            <ChevronRightIcon size={16} />
            <span className="text-main">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery
              images={productData.variants?.[0]?.images || []}
              selectedImageIndex={selectedImage}
              onImageSelect={setSelectedImage}
              showThumbnails={true}
              zoomEnabled={true}
            />
            
            {/* QR Code and Barcode Section */}
            {selectedVariant && (
              <div className="flex space-x-4 justify-center">
                {selectedVariant.qr_code && (
                  <button
                    onClick={() => setShowQR(true)}
                    className="flex items-center space-x-2 text-sm text-primary hover:underline"
                  >
                    <QrCodeIcon size={16} />
                    <span>View QR Code</span>
                  </button>
                )}
                
                {selectedVariant.barcode && (
                  <button
                    onClick={() => setShowBarcode(true)}
                    className="flex items-center space-x-2 text-sm text-primary hover:underline"
                  >
                    <ScanLineIcon size={16} />
                    <span>View Barcode</span>
                  </button>
                )}
              </div>
            )}

            {/* QR Code Modal */}
            <QRCodeModal
              data={selectedVariant?.qr_code || `${window.location.origin}/products/${id}`}
              title={`${product.name} - QR Code`}
              description={`QR Code for ${product.name} (${selectedVariant?.sku || product.sku})`}
              isOpen={showQR}
              onClose={() => setShowQR(false)}
            />

            {/* Barcode Modal */}
            <BarcodeModal
              code={selectedVariant?.barcode || selectedVariant?.sku || product.sku}
              title={`${product.name} - Barcode`}
              isOpen={showBarcode}
              onClose={() => setShowBarcode(false)}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-main mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-copy-light ml-2">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-sm text-copy-light">SKU: {product.sku}</span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                {selectedVariant?.sale_price ? (
                  <>
                    <span className="text-3xl font-bold text-primary">
                      ${selectedVariant.sale_price.toFixed(2)}
                    </span>
                    <span className="text-xl text-copy-light line-through">
                      ${selectedVariant.base_price.toFixed(2)}
                    </span>
                    <span className="bg-error-100 text-error-600 px-2 py-1 rounded text-sm font-medium">
                      Save ${(selectedVariant.base_price - selectedVariant.sale_price).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    ${selectedVariant?.base_price?.toFixed(2) || product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-copy-light mb-6">{product.description}</p>
            </div>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 1 && selectedVariant && (
              <VariantSelector
                variants={productData.variants?.map(variant => ({
                  id: variant.id,
                  product_id: variant.product_id,
                  sku: variant.sku,
                  name: variant.name,
                  base_price: variant.base_price,
                  sale_price: variant.sale_price,
                  stock: variant.stock,
                  barcode: variant.barcode,
                  qr_code: variant.qr_code,
                  attributes: variant.attributes ? Object.entries(variant.attributes).map(([name, value]) => ({
                    id: `${variant.id}-${name}`,
                    name,
                    value: String(value)
                  })) : [],
                  images: variant.images || []
                })) || []}
                selectedVariant={{
                  id: selectedVariant.id,
                  product_id: productData.id,
                  sku: selectedVariant.sku,
                  name: selectedVariant.name,
                  base_price: selectedVariant.base_price,
                  sale_price: selectedVariant.sale_price,
                  stock: selectedVariant.stock,
                  barcode: selectedVariant.barcode,
                  qr_code: selectedVariant.qr_code,
                  attributes: selectedVariant.attributes ? Object.entries(selectedVariant.attributes).map(([name, value]) => ({
                    id: `${selectedVariant.id}-${name}`,
                    name,
                    value: String(value)
                  })) : [],
                  images: productData.variants?.find(v => v.id === selectedVariant.id)?.images || []
                }}
                onVariantChange={(variant) => {
                  const originalVariant = productData.variants?.find(v => v.id === variant.id);
                  if (originalVariant) {
                    setSelectedVariant({
                      id: originalVariant.id,
                      name: originalVariant.name,
                      base_price: originalVariant.base_price,
                      sale_price: originalVariant.sale_price,
                      stock: originalVariant.stock,
                      sku: originalVariant.sku,
                      attributes: originalVariant.attributes,
                      barcode: originalVariant.barcode,
                      qr_code: originalVariant.qr_code,
                    });
                  }
                }}
                showImages={false}
                showPrice={true}
                showStock={true}
                layout="grid"
              />
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="font-medium text-main mb-3">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-surface-hover"
                >
                  <MinusIcon size={16} />
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 rounded-md border border-border flex items-center justify-center hover:bg-surface-hover"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              {/* Cart Button with Quantity */}
              <div className="flex-1">
                {cartQuantity > 0 ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={async () => {
                        if (!selectedVariant) return;
                        const newQuantity = Math.max(0, cartQuantity - 1);
                        if (newQuantity === 0) {
                          if (cartItem) await removeFromCart(cartItem.id);
                        } else {
                          if (cartItem) await updateQuantity(cartItem.id, newQuantity);
                        }
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-md transition-colors"
                    >
                      <MinusIcon size={16} />
                    </button>
                    <span className="bg-primary text-white px-4 py-2 rounded-md font-medium min-w-[120px] text-center">
                      In Cart ({cartQuantity})
                    </span>
                    <button
                      onClick={async () => {
                        if (!selectedVariant) return;
                        if (cartItem) await updateQuantity(cartItem.id, cartQuantity + 1);
                      }}
                      className="bg-primary hover:bg-primary-dark text-white p-2 rounded-md transition-colors"
                    >
                      <PlusIcon size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={async () => {
                      if (!selectedVariant) return;
                      const success = await addToCart({ product_id: product.id, variant_id: selectedVariant.id, quantity: quantity });
                      if (!success) {
                        setRedirectPath(location.pathname);
                        navigate('/login');
                      }
                    }}
                    className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
                  >
                    <ShoppingCartIcon size={20} className="mr-2" />
                    Add to Cart
                  </button>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={async () => {
                  if (!defaultWishlist) {
                    toast.error("No default wishlist found.");
                    return;
                  }
                  if (isInWishlistState) {
                    const wishlistItem = defaultWishlist.items.find(
                      item => item.product_id === product.id && (selectedVariant ? item.variant_id === selectedVariant.id : true)
                    );
                    if (wishlistItem) {
                      const success = await removeFromWishlist(defaultWishlist.id, wishlistItem.id);
                      if (!success) {
                        setRedirectPath(location.pathname);
                        navigate('/login');
                      }
                    }
                  } else {
                    const success = await addToWishlist(product.id, selectedVariant?.id, quantity);
                    if (!success) {
                      setRedirectPath(location.pathname);
                      navigate('/login');
                    }
                  }
                }}
                className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center min-w-[60px] ${isInWishlistState
                  ? 'bg-error-100 text-error-600 hover:bg-error-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                title={isInWishlistState ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <HeartIcon size={20} className={isInWishlistState ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <TruckIcon size={20} className="text-primary" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon size={20} className="text-primary" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCwIcon size={20} className="text-primary" />
                <span className="text-sm">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShareIcon size={20} className="text-primary" />
                <span className="text-sm">Share Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-copy-light hover:text-copy'
                  }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'specifications'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-copy-light hover:text-copy'
                  }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-copy-light hover:text-copy'
                  }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div>
                <p className="text-copy-light mb-4">{product.longDescription}</p>
                <h4 className="font-medium text-main mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-copy-light">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-main">{key}:</span>
                      <span className="text-copy-light">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  {/* Min Rating Filter */}
                  <div>
                    <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Min Rating</label>
                    <select
                      id="minRating"
                      value={minRating || ''}
                      onChange={(e) => setMinRating(e.target.value ? Number(e.target.value) : undefined)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>

                  {/* Max Rating Filter */}
                  <div>
                    <label htmlFor="maxRating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Rating</label>
                    <select
                      id="maxRating"
                      value={maxRating || ''}
                      onChange={(e) => setMaxRating(e.target.value ? Number(e.target.value) : undefined)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
                    <select
                      id="sortBy"
                      value={sortBy || ''}
                      onChange={(e) => setSortBy(e.target.value || undefined)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Newest</option>
                      <option value="rating_desc">Rating (High to Low)</option>
                      <option value="rating_asc">Rating (Low to High)</option>
                      <option value="created_at_asc">Oldest</option>
                    </select>
                  </div>
                </div>

                {reviewsLoading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="animate-pulse border-b border-gray-100 pb-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : reviewsData?.data && reviewsData.data.length > 0 ? (
                  <div className="space-y-6">
                    {reviewsData.data.map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-main">{review.user?.firstname} {review.user?.lastname}</span>
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }, (_, i) => (
                                <StarIcon
                                  key={i}
                                  size={14}
                                  className={i < review.rating ? 'fill-current' : ''}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-copy-light">{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-copy-light">{review.comment}</p>
                      </div>
                    ))}

                    {/* Reviews Pagination */}
                    {reviewsData.pagination && reviewsData.pagination.pages > 1 && (
                      <div className="flex items-center justify-center space-x-2 mt-8">
                        <button
                          onClick={() => setReviewsPage(prev => Math.max(1, prev - 1))}
                          disabled={reviewsPage === 1}
                          className="px-3 py-2 rounded-md bg-surface border border-border text-copy hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: reviewsData.pagination.pages }, (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => setReviewsPage(page)}
                              className={`px-3 py-2 rounded-md ${
                                page === reviewsPage
                                  ? 'bg-primary text-white'
                                  : 'bg-surface border border-border text-copy hover:bg-surface-hover'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                        
                        <button
                          onClick={() => setReviewsPage(prev => Math.min(reviewsData.pagination.pages, prev + 1))}
                          disabled={reviewsPage === reviewsData.pagination.pages}
                          className="px-3 py-2 rounded-md bg-surface border border-border text-copy hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-copy-light">No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="py-12 bg-surface">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-main mb-8">Related Products</h2>

            {relatedError && (
              <ErrorMessage
                error={relatedError}
                onRetry={() => fetchRelatedProducts(() => ProductsAPI.getRecommendedProducts(id || '', 4))}
                className="mb-6"
              />
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedLoading ? (
                Array(4).fill(0).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-48 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded mb-1"></div>
                    <div className="bg-gray-200 h-3 rounded w-16"></div>
                  </div>
                ))
              ) : relatedProductsData && relatedProductsData.length > 0 ? (
                relatedProductsData.map((relatedProduct) => {
                  const transformedProduct = {
                    id: relatedProduct.id,
                    name: relatedProduct.name,
                    price: relatedProduct.variants?.[0]?.base_price || 0,
                    discountPrice: relatedProduct.variants?.[0]?.sale_price || null,
                    rating: 4.5,
                    reviewCount: 0,
                    image: relatedProduct.variants?.[0]?.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    category: relatedProduct.category?.name || 'General',
                    isNew: false,
                    isFeatured: false,
                  };

                  return (
                    <ProductCard
                      key={relatedProduct.id}
                      product={transformedProduct}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      isInCart={cart?.items.some(item => item.id === relatedProduct.id)}
                      addToWishlist={addToWishlist}
                      removeFromWishlist={removeFromWishlist}
                      isInWishlist={isInWishlist(relatedProduct.id)}
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No related products found.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};