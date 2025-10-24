import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, EyeIcon, CheckIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { SkeletonCard } from '../ui/SkeletonCard';
import { QRCodeDisplay } from './QRCodeDisplay';
import { BarcodeDisplay } from './BarcodeDisplay';
import { toast } from 'react-hot-toast';
interface ProductVariantImage {
  id: string;
  variant_id: string;
  url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  base_price: number;
  sale_price?: number;
  stock: number;
  barcode?: string;
  qr_code?: string;
  images: ProductVariantImage[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  variants?: ProductVariant[];
}

interface ProductCardProps {
  product?: Product;
  selectedVariant?: ProductVariant;
  showQRCode?: boolean;
  showBarcode?: boolean;
  viewMode?: 'grid' | 'list';
  className?: string;
  isLoading?: boolean;
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedVariant,
  showQRCode = false,
  showBarcode = false,
  viewMode = 'grid',

  className,
  isLoading = false,
  animation = 'shimmer',
}) => {
  const { addItem: addToCart, removeItem: removeFromCart, cart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist, defaultWishlist } = useWishlist();
  const { isAuthenticated, setRedirectPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the display variant (selected variant or first variant or fallback to product)
  const displayVariant = selectedVariant || (product.variants && product.variants[0]);

  const isInCart = cart?.items.some(item => item.variant.id === displayVariant?.id) || false;

  // Get the primary image from variant or fallback to product image
  const getPrimaryImage = () => {
    if (displayVariant && displayVariant.images.length > 0) {
      const primaryImage = displayVariant.images.find(img => img.is_primary);
      return primaryImage?.url || displayVariant.images[0]?.url;
    }
    return product.image;
  };

  // Get the display price (variant price or product price)
  const getDisplayPrice = () => {
    if (displayVariant) {
      return {
        price: displayVariant.base_price,
        discountPrice: displayVariant.sale_price || null
      };
    }
    return {
      price: product.price,
      discountPrice: product.discountPrice
    };
  };

  const displayImage = getPrimaryImage();
  const { price, discountPrice } = getDisplayPrice();

      const handleAddToCart = async (e: React.MouseEvent) => {

        e.preventDefault();

        e.stopPropagation();

    

        if (!product) {

          toast.error("Product data is not available.");

          return;

        }


        const variantToAdd = displayVariant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);

    

        if (!variantToAdd) {

          toast.error("This product has no variants available.");

          return;

        }

    

        if (isInCart) {

          toast.success('This item is already in your cart.');

        } else {

                    try {
                      await addToCart({
                        variant_id: String(variantToAdd.id),
                        quantity: 1,
                      });
                      toast.success('Item added to cart!');
                    } catch (error) {
                      console.error('Failed to add to cart:', error);
                      // If user is not authenticated, redirect to login
                      if (error instanceof Error && error.message.includes('authenticated')) {
                        setRedirectPath(location.pathname);
                        navigate('/login');
                      } else {
                        toast.error('Failed to add item to cart');
                      }
                    }

                  }

                };

    

      const handleAddToWishlist = async (e: React.MouseEvent) => {

        e.preventDefault();

        e.stopPropagation();

    

        if (!product) {

          toast.error("Product data is not available.");

          return;

        }


        const variantToAdd = displayVariant || (product.variants && product.variants.length > 0 ? product.variants[0] : undefined);


        if (!variantToAdd) {

          toast.error("This product has no variants available.");

          return;

        }

    

        const isProductInWishlist = isInWishlist(product.id, displayVariant?.id);

    

        if (isProductInWishlist) {

          toast.success('This item is already in your wishlist.');

        } else {

          const success = await addToWishlist(product.id, displayVariant?.id);

          if (!success) {

            setRedirectPath(location.pathname);

            navigate('/login');

          }

        }

      };

  return (
    <motion.div
      className={cn(
        'bg-surface rounded-lg overflow-hidden shadow-sm border border-border-light transition-shadow hover:shadow-md group text-copy',
        viewMode === 'list' && 'flex flex-col md:flex-row items-center p-4',
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}>
      <div className={cn('relative', viewMode === 'list' && 'w-full md:w-1/3 flex-shrink-0 mb-4 md:mb-0 md:mr-4')}>
        <Link to={`/product/${product.id}`}>
          <img
            src={displayImage}
            alt={displayVariant ? `${product.name} - ${displayVariant.name}` : product.name}
            className={cn(
              'w-full object-cover group-hover:scale-105 transition-transform duration-300',
              viewMode === 'grid' && 'h-40 sm:h-48', // Adjusted height
              viewMode === 'list' && 'h-40 md:h-32 rounded-md'
            )}
          />
        </Link>
        {/* Product badges */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
            New
          </span>
        )}
        {discountPrice && (
          <span className="absolute top-2 right-2 bg-error text-white text-xs font-medium px-2 py-1 rounded-full">
            Sale
          </span>
        )}
        {displayVariant && displayVariant.stock <= 5 && displayVariant.stock > 0 && (
          <span className="absolute bottom-2 left-2 bg-warning text-white text-xs font-medium px-2 py-1 rounded-full">
            Only {displayVariant.stock} left
          </span>
        )}
        {displayVariant && displayVariant.stock === 0 && (
          <span className="absolute bottom-2 left-2 bg-error text-white text-xs font-medium px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
        {/* Quick action buttons - hidden on mobile for grid view */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-20',
            viewMode === 'grid' && 'hidden sm:flex', // Hide on mobile
            viewMode === 'list' && 'hidden md:flex'
          )}>
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isInCart
                ? 'bg-primary text-white'
                : 'bg-surface text-copy hover:bg-primary hover:text-white'
                }`}
              aria-label={isInCart ? "Remove from cart" : "Add to cart"}>
              {isInCart ? <CheckIcon size={16} /> : <ShoppingCartIcon size={16} />}
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isInWishlist(product.id, displayVariant?.id)
                ? 'bg-error text-white'
                : 'bg-surface text-copy hover:bg-primary hover:text-white'
                }`}
              aria-label={isInWishlist(product.id, displayVariant?.id) ? "Remove from wishlist" : "Add to wishlist"}>
              <HeartIcon size={16} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="w-9 h-9 rounded-full bg-surface text-copy flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              aria-label="View product">
              <EyeIcon size={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className={cn('p-3 sm:p-4', viewMode === 'list' && 'flex-grow')}>
        <span className="text-xs text-copy-lighter">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm sm:text-base text-copy hover:text-primary transition-colors mb-1 line-clamp-2 h-10 sm:h-12">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-xs">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-xs text-copy-lighter ml-1">({product.reviewCount})</span>
        </div>
        <div className={cn('flex items-center justify-between', viewMode === 'list' && 'flex-grow md:flex-row-reverse md:justify-start md:space-x-4 md:space-x-reverse')}>
          <div>
            {discountPrice ? (
              <div className="flex items-center">
                <span className="font-bold text-primary mr-2 text-sm sm:text-base">${discountPrice.toFixed(2)}</span>
                <span className="text-xs text-copy-lighter line-through">${price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-bold text-primary text-sm sm:text-base">${price.toFixed(2)}</span>
            )}
            {displayVariant && (
              <div className="text-xs text-copy-lighter mt-1">
                {displayVariant.name}
              </div>
            )}
          </div>
          {/* Show simple add to cart button on mobile for grid view */}
          <button
            onClick={handleAddToCart}
            className={cn(
              'sm:hidden text-copy-lighter hover:text-white transition-colors bg-primary text-white px-3 py-1.5 rounded-md flex items-center',
              viewMode === 'list' && 'hidden' // Hide in list view on mobile
            )}
            aria-label={isInCart ? "Remove from cart" : "Add to cart"}>
            {isInCart ? <CheckIcon size={16} /> : <ShoppingCartIcon size={16} />}
          </button>
          <button
            onClick={handleAddToCart}
            className={cn(
              'hidden sm:flex text-copy-lighter hover:text-white transition-colors bg-primary text-white px-4 py-2 rounded-md items-center',
              viewMode === 'list' && 'md:order-1 md:p-2 md:rounded-md md:bg-primary md:text-white md:hover:bg-primary-dark'
            )}
            aria-label={isInCart ? "Remove from cart" : "Add to cart"}>
            {isInCart ? <CheckIcon size={18} /> : <ShoppingCartIcon size={18} />}
            {viewMode === 'list' && <span className="hidden md:inline ml-2">{isInCart ? "In Cart" : "Add to Cart"}</span>}
          </button>
        </div>

        {/* QR Code and Barcode Display */}
        {(showQRCode || showBarcode) && displayVariant && (
          <div className="mt-4 pt-4 border-t border-border-light">
            <div className="flex items-center justify-center space-x-4">
              {showQRCode && displayVariant.qr_code && (
                <div className="text-center">
                  <QRCodeDisplay
                    qrCode={displayVariant.qr_code}
                    variant={{
                      id: displayVariant.id,
                      name: displayVariant.name,
                      sku: displayVariant.sku,
                      product_name: product.name
                    }}
                    size="sm"
                    showControls={false}
                  />
                </div>
              )}
              {showBarcode && displayVariant.barcode && (
                <div className="text-center">
                  <BarcodeDisplay
                    barcode={displayVariant.barcode}
                    variant={{
                      id: displayVariant.id,
                      name: displayVariant.name,
                      sku: displayVariant.sku,
                      product_name: product.name
                    }}
                    size="sm"
                    showControls={false}
                    showSKU={false}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};