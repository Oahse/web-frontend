import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, CreditCardIcon, TruckIcon, CheckIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import StripePaymentForm from '../components/payment/StripePaymentForm';
import { v4 as uuidv4 } from 'uuid';

export const Checkout: React.FC = () => {
  const { items, totalItems, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [orderId, setOrderId] = useState<string>(uuidv4()); // Generate a unique order ID

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log("Payment successful with ID:", paymentIntentId);
    setStep('confirmation');
    window.scrollTo(0, 0);
    clearCart(); // Clear cart after successful payment
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    // Optionally, show an error message to the user
  };

  // Calculate order summary
  const subtotal = totalItems;
  const shipping = shippingMethod === 'express' ? 12.99 : subtotal > 49.99 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link to="/" className="text-copy-lighter hover:text-primary">
          Home
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <Link to="/cart" className="text-copy-lighter hover:text-primary">
          Cart
        </Link>
        <ChevronRightIcon size={16} className="mx-2" />
        <span className="text-main">Checkout</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-main mb-6">Checkout</h1>

      {/* Checkout Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'shipping' || step === 'payment' || step === 'confirmation'
                ? 'bg-primary text-white'
                : 'bg-border text-copy-lighter'
            }`}>
            1
          </div>
          <div className="text-sm font-medium ml-2">Shipping</div>
          <div className="w-12 h-1 mx-2 bg-border">
            <div
              className={`h-full ${
                step === 'payment' || step === 'confirmation' ? 'bg-primary' : 'bg-border'
              }`}></div>
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'payment' || step === 'confirmation'
                ? 'bg-primary text-white'
                : 'bg-border text-copy-lighter'
            }`}>
            2
          </div>
          <div className="text-sm font-medium ml-2">Payment</div>
          <div className="w-12 h-1 mx-2 bg-border">
            <div className={`h-full ${step === 'confirmation' ? 'bg-primary' : 'bg-border'}`}></div>
          </div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'confirmation' ? 'bg-primary text-white' : 'bg-border text-copy-lighter'
            }`}>
            3
          </div>
          <div className="text-sm font-medium ml-2">Confirmation</div>
        </div>
      </div>

      {step === 'shipping' && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Form */}
          <div className="lg:w-2/3">
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-main mb-4">Shipping Information</h2>
              <form onSubmit={handleShippingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-main mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-main mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-main mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-main mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-main mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-main mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-main mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-main mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="country" className="block text-sm font-medium text-main mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-surface"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                    required>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>
                <h3 className="text-lg font-medium text-main mb-4">Shipping Method</h3>
                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border border-border rounded-md cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="text-primary focus:ring-primary"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium text-main">Standard Shipping</span>
                        <span className="font-medium text-primary">
                          {subtotal > 49.99 ? 'Free' : '$5.99'}
                        </span>
                      </div>
                      <p className="text-sm text-copy-light">Delivery in 3-5 business days</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-border rounded-md cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-primary focus:ring-primary"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <span className="font-medium text-main">Express Shipping</span>
                        <span className="font-medium text-primary">$12.99</span>
                      </div>
                      <p className="text-sm text-copy-light">Delivery in 1-2 business days</p>
                    </div>
                  </label>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-md transition-colors text-center font-medium">
                  Continue to Payment
                </motion.button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-main mb-4">Order Summary</h2>
              <div className="mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant || ''}`} className="flex py-3 border-b border-border-light last:border-0">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.variant.images[0].url} alt={item.variant.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-main">{item.variant.name}</h3>
                        <span className="font-medium text-main">${(item.price_per_unit * item.quantity).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-copy-light">
                        <span>
                          {item.variant && `Size: ${item.variant}, `}
                          Qty: {item.quantity}
                        </span>
                        <span>${item.total_price.toFixed(2)} each</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-copy-light">Subtotal</span>
                  <span className="font-medium text-main">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-copy-light">Shipping</span>
                  <span className="font-medium text-main">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-copy-light">Tax</span>
                  <span className="font-medium text-main">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border-light pt-3 flex justify-between">
                  <span className="text-lg font-semibold text-main">Total</span>
                  <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Form */}
          <div className="lg:w-2/3">
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-main mb-4">Payment Method</h2>
              <div className="space-y-3 mb-6">
                <label className="flex items-center p-4 border border-border rounded-md cursor-pointer hover:border-primary">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="ml-3 flex items-center">
                    <CreditCardIcon size={20} className="text-copy-light mr-2" />
                    <span className="font-medium text-main">Credit / Debit Card</span>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-border rounded-md cursor-pointer hover:border-primary">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-main">PayPal</span>
                  </div>
                </label>
              </div>

              {paymentMethod === 'credit-card' && (
                <StripePaymentForm
                  orderId={orderId}
                  amount={total}
                  currency={items[0]?.currency || "usd"} // Assuming all items have the same currency
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              )}

              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <p className="text-copy-light mb-6">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                  <div className="flex items-center justify-between">
                    <button onClick={() => setStep('shipping')} className="text-primary hover:underline">
                      Back to Shipping
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePaymentSuccess("paypal_mock_id")}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-md transition-colors text-center font-medium">
                      Continue with PayPal
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-main mb-4">Order Summary</h2>
              <div className="mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant || ''}`} className="flex py-3 border-b border-border-light last:border-0">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.variant.images[0].url} alt={item.variant.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-main">{item.variant.name}</h3>
                        <span className="font-medium text-main">${(item.price_per_unit * item.quantity).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-copy-light">
                        <span>
                          {item.variant && `Size: ${item.variant}, `}
                          Qty: {item.quantity}
                        </span>
                        <span>${item.total_price.toFixed(2)} each</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-copy-light">Subtotal</span>
                  <span className="font-medium text-main">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-copy-light">Shipping</span>
                  <span className="font-medium text-main">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-copy-light">Tax</span>
                  <span className="font-medium text-main">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border-light pt-3 flex justify-between">
                  <span className="text-lg font-semibold text-main">Total</span>
                  <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="bg-background p-4 rounded-md">
                <div className="flex items-start mb-2">
                  <TruckIcon size={18} className="text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-main">Shipping Address</h4>
                    <p className="text-sm text-copy-light">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                      <br />
                      {shippingInfo.address}
                      <br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      <br />
                      {shippingInfo.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TruckIcon size={18} className="text-primary mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-main">Shipping Method</h4>
                    <p className="text-sm text-copy-light">
                      {shippingMethod === 'standard'
                        ? 'Standard Shipping (3-5 days)'
                        : 'Express Shipping (1-2 days)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-surface rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckIcon size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-main mb-2">Order Confirmed!</h2>
            <p className="text-copy-light mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <p className="text-copy-light mb-8">
              Order #: <span className="font-medium">BW-{Math.floor(Math.random() * 10000)}</span>
            </p>
            <div className="bg-background p-6 rounded-md mb-8">
              <h3 className="text-lg font-semibold text-main mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-copy-light">Subtotal</span>
                  <span className="font-medium text-main">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-copy-light">Shipping</span>
                  <span className="font-medium text-main">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-copy-light">Tax</span>
                  <span className="font-medium text-main">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border-light pt-3 flex justify-between">
                  <span className="text-lg font-semibold text-main">Total</span>
                  <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/orders"
                className="bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md transition-colors">
                View Order
              </Link>
              <Link
                to="/"
                className="bg-border hover:bg-border-light text-main py-3 px-6 rounded-md transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};