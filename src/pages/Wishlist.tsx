import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { HeartIcon, ShoppingCartIcon, XCircleIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Wishlist: React.FC = () => {
  const { wishlists, defaultWishlist, removeItem, fetchWishlists } = useWishlist();
  const { addItem: addToCart } = useCart();

  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  const handleRemoveItem = async (wishlistId: string, itemId: string) => {
    await removeItem(wishlistId, itemId);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.product_id,
      name: item.product?.name || "Product",
      price: item.variant?.sale_price || item.variant?.base_price || 0,
      image: item.product?.variants?.[0]?.images?.[0]?.url || "",
      quantity: item.quantity,
      variant: item.variant?.name,
    });
    toast.success("Item added to cart!");
    // Optionally remove from wishlist after adding to cart
    if (defaultWishlist) {
      handleRemoveItem(defaultWishlist.id, item.id);
    }
  };

  if (!defaultWishlist || defaultWishlist.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <HeartIcon size={48} className="mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-main mb-2">Your Wishlist is Empty</h1>
        <p className="text-copy-light mb-6">Add items you love to your wishlist to easily find them later.</p>
        <Link to="/products" className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-main mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {defaultWishlist.items.map((item) => (
          <div key={item.id} className="bg-surface rounded-lg shadow-sm overflow-hidden flex flex-col">
            <Link to={`/product/${item.product_id}`} className="block relative h-48 overflow-hidden">
              <img
                src={item.product?.variants?.[0]?.images?.[0]?.url || "https://via.placeholder.com/150"}
                alt={item.product?.name || "Product Image"}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (defaultWishlist) {
                    handleRemoveItem(defaultWishlist.id, item.id);
                  }
                }}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-error hover:text-error-dark"
                title="Remove from Wishlist"
              >
                <XCircleIcon size={20} />
              </button>
            </Link>
            <div className="p-4 flex-grow flex flex-col">
              <Link to={`/product/${item.product_id}`}>
                <h2 className="text-lg font-semibold text-main hover:text-primary line-clamp-2 mb-1">
                  {item.product?.name}
                </h2>
              </Link>
              {item.variant && (
                <p className="text-sm text-copy-light mb-2">Variant: {item.variant.name}</p>
              )}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-primary">
                  ${(item.variant?.sale_price || item.variant?.base_price || 0).toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors flex items-center"
                >
                  <ShoppingCartIcon size={18} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
