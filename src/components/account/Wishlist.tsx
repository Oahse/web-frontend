import React from 'react';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCartIcon, TrashIcon, HeartIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export const Wishlist: React.FC = () => {
  const {
    items,
    removeItem,
    clearWishlist
  } = useWishlist();
  const {
    addItem
  } = useCart();
  const handleAddToCart = (item: { id: string; name: string; price: number; image: string }) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    });
    toast.success(`${item.name} added to cart`);
  };
  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from wishlist`);
  };
  return <div>
      <h1 className="text-2xl font-bold text-main dark:text-white mb-6">
        My Wishlist
      </h1>
      {items.length > 0 ? <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => <tr key={item.id} className="border-b dark:border-gray-700">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                          <Link to={`/product/${item.id}`} className="font-medium text-main dark:text-white hover:text-primary">
                            {item.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-main dark:text-white">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => handleAddToCart(item)} className="p-2 text-primary hover:bg-primary hover:text-white rounded-full transition-colors" title="Add to cart">
                            <ShoppingCartIcon size={18} />
                          </button>
                          <button onClick={() => handleRemoveFromWishlist(item.id, item.name)} className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-colors" title="Remove from wishlist">
                            <TrashIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/products" className="text-primary hover:underline">
              Continue Shopping
            </Link>
            <button onClick={() => {
          clearWishlist();
          toast.success('Wishlist cleared');
        }} className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors">
              Clear Wishlist
            </button>
          </div>
        </> : <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <HeartIcon size={24} className="text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-lg font-medium text-main dark:text-white mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Save items you like to your wishlist and they'll appear here.
          </p>
          <Link to="/products" className="inline-block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md">
            Browse Products
          </Link>
        </div>}
    </div>;
};
export default Wishlist;