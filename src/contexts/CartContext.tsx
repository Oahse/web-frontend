import React, { useEffect, createContext, useContext, useCallback } from 'react';
import { Cart, CartItem, AddToCartRequest } from '../apis/types';
import { useApi, useMutation } from '../hooks/useApi';
import { CartAPI } from '../apis';
import { TokenManager } from '../apis/client';

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
      fetchCart(CartAPI.getCart);
    }
  }, [fetchCart]);

  const addItem = useCallback(async (item: AddToCartRequest) => {
    const newCartItem = await addItemMutation.mutate(CartAPI.addToCart, item);
    if (newCartItem && cart) {
      const existingItem = cart.items.find(i => i.variant.id === newCartItem.variant.id);
      if (existingItem) {
        setCart({ ...cart, items: cart.items.map(i => i.id === existingItem.id ? newCartItem : i) });
      } else {
        setCart({ ...cart, items: [...cart.items, newCartItem] });
      }
    }
  }, [addItemMutation, cart, setCart]);

  const removeItem = useCallback(async (itemId: string) => {
    await removeItemMutation.mutate(CartAPI.removeFromCart, itemId);
    if (cart) {
      setCart({ ...cart, items: cart.items.filter(i => i.id !== itemId) });
    }
  }, [removeItemMutation, cart, setCart]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    const updatedItem = await updateItemMutation.mutate(
      (vars) => CartAPI.updateCartItem(vars.itemId, vars.quantity),
      { itemId, quantity }
    );
    if (updatedItem && cart) {
      setCart({ ...cart, items: cart.items.map(i => i.id === itemId ? updatedItem : i) });
    }
  }, [updateItemMutation, cart, setCart]);

  const clearCart = useCallback(async () => {
    await clearCartMutation.mutate(CartAPI.clearCart, undefined);
    if (cart) {
      setCart({ ...cart, items: [] });
    }
  }, [clearCartMutation, cart, setCart]);

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