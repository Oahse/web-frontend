import React, { useEffect, createContext, useContext, useCallback, useState } from 'react';
import { Cart, CartItem, AddToCartRequest } from '../apis/types';
import { useApi, useMutation } from '../hooks/useApi';
import { CartAPI } from '../apis';
import { TokenManager } from '../apis/client';
import { setDatasets } from 'react-chartjs-2/dist/utils';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (item: AddToCartRequest) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  items: CartItem[]; // Add items for backward compatibility
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const apiOptions = React.useMemo(() => ({}), []);
  const { data: cart, loading, execute: fetchCart, setData: setCart } = useApi<Cart>(apiOptions);

  const mutationOptions = React.useMemo(() => ({}), []);
  const addItemMutation = useMutation<CartItem, AddToCartRequest>(mutationOptions);
  const updateItemMutation = useMutation<CartItem, { itemId: string, quantity: number }>(mutationOptions);
  const removeItemMutation = useMutation<{ message: string }, string>(mutationOptions);
  const clearCartMutation = useMutation<{ message: string }>(mutationOptions);

  useEffect(() => {
    if (TokenManager.isAuthenticated()) {
      console.log('CartContext: Fetching cart with CartAPI.getCart');
      fetchCart(() => CartAPI.getCart(TokenManager.getToken()!));
    }
  }, [fetchCart]);

  const addItem = async (item: AddToCartRequest) => {
    const updatedCart = await addItemMutation.mutate(CartAPI.addToCart, item);
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  const removeItem = async (itemId: string) => {
    const updatedCart = await removeItemMutation.mutate(CartAPI.removeFromCart, itemId);
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    const updatedCart = await updateItemMutation.mutate(
      (vars) => CartAPI.updateCartItem(vars.itemId, vars.quantity),
      { itemId, quantity }
    );
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  const clearCart = async () => {
    await clearCartMutation.mutate(CartAPI.clearCart, undefined);
    setCart({ ...cart, items: [], subtotal: 0, tax_amount: 0, shipping_amount: 0, total_amount: 0 });
  };

  const totalItems = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const items = cart?.items || [];

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      items
    }}>
      {children}
    </CartContext.Provider>
  );
};