import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, TrashIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { CartSkeleton } from '../components/skeletons/CartSkeleton';

export const Cart: React.FC = () => {
  const { cart, removeItem, updateQuantity, clearCart, loading } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock coupon application logic
    alert(`Coupon ${couponCode} applied!`);
  };

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const shipping = subtotal > 49.99 ? 0 : 5.99;
  const tax = cart?.tax_amount || 0;
  const total = cart?.total_amount || 0;

  if (loading) {
    return <CartSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-copy">Shopping Cart</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-copy mb-6">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
            <ShoppingCartIcon size={32} className="text-copy-lighter" />
          </div>
          <h2 className="text-xl font-medium text-copy mb-2">Your cart is empty</h2>
          <p className="text-copy-light mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-background text-copy font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Subtotal</div>
              </div>
              <div className="divide-y divide-border-light">
                {items.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.variant.images[0]?.url} alt={item.variant.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4">
                          <Link
                            to={`/products/${item.variant.product_id}`}
                            className="font-medium text-copy hover:text-primary">
                            {item.variant.name}
                          </Link>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-sm text-error hover:text-error-dark flex items-center mt-1">
                            <TrashIcon size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="md:hidden font-medium text-copy">Price: </span>
                        <span className="font-medium text-primary">${item.price_per_unit.toFixed(2)}</span>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-copy-light hover:text-primary"
                            disabled={item.quantity <= 1}>
                            <MinusIcon size={14} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                            }
                            className="w-10 text-center border-none focus:outline-none bg-transparent"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-copy-light hover:text-primary">
                            <PlusIcon size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="md:hidden font-medium text-copy">Subtotal: </span>
                        <span className="font-medium text-copy">${item.total_price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-background flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => clearCart()}
                    className="text-sm text-error hover:text-error-dark flex items-center">
                    <TrashIcon size={14} className="mr-1" />
                    Clear Cart
                  </button>
                </div>
                <Link to="/products" className="text-sm text-primary hover:underline flex items-center">
                  Continue Shopping
                  <ChevronRightIcon size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-copy mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-copy-light">Subtotal</span>
                  <span className="font-medium text-copy">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-copy-light">Shipping</span>
                  <span className="font-medium text-copy">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-copy-light">Tax</span>
                  <span className="font-medium text-copy">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border-light pt-3 flex justify-between">
                  <span className="text-lg font-semibold text-copy">Total</span>
                  <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-grow px-4 py-2 border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark transition-colors">
                    Apply
                  </button>
                </div>
              </form>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/checkout"
                  className="block w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md transition-colors text-center font-medium">
                  Proceed to Checkout
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};