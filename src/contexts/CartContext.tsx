import React, { useEffect, createContext, useContext, useCallback, useState } from 'react';
import { Cart, CartItem } from '../types';
import { AddToCartRequest } from '../types/api';
import { useApi } from '../hooks/useApi';
import { TokenManager } from '../apis/client';
import { CartAPI } from '../apis/cart';

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
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!TokenManager.isAuthenticated()) return;
    
    try {
      setLoading(true);
      const response = await CartAPI.getCart(TokenManager.getToken()!);
      if (response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = useCallback(async (item: AddToCartRequest) => {
    if (!TokenManager.isAuthenticated()) {
      throw new Error('User must be authenticated to add items to cart');
    }
    
    try {
      setLoading(true);
      const response = await CartAPI.addToCart(item, TokenManager.getToken()!);
      if (response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    if (!TokenManager.isAuthenticated()) {
      throw new Error('User must be authenticated to remove items from cart');
    }
    
    try {
      setLoading(true);
      const response = await CartAPI.removeFromCart(itemId, TokenManager.getToken()!);
      if (response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (!TokenManager.isAuthenticated()) {
      throw new Error('User must be authenticated to update cart items');
    }
    
    try {
      setLoading(true);
      const response = await CartAPI.updateCartItem(itemId, quantity, TokenManager.getToken()!);
      if (response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    if (!TokenManager.isAuthenticated()) {
      throw new Error('User must be authenticated to clear cart');
    }
    
    try {
      setLoading(true);
      const response = await CartAPI.clearCart(TokenManager.getToken()!);
      if (response.data) {
        setCart(response.data);
      } else {
        // Fallback to manual clear if API doesn't return cart data
        setCart(cart ? { ...cart, items: [], total_items: 0, total_amount: 0 } : null);
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [cart]);

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