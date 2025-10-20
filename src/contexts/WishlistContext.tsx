import React, { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';
import WishlistAPI from '../apis/wishlists';
import { Wishlist, WishlistItem } from '../apis/types';

interface WishlistContextType {
  wishlists: Wishlist[];
  defaultWishlist?: Wishlist;
  fetchWishlists: () => void;
  addItem: (productId: string, variantId?: string, quantity?: number) => Promise<boolean>;
  removeItem: (wishlistId: string, itemId: string) => Promise<boolean>;
  isInWishlist: (productId: string, variantId?: string) => boolean;
  clearWishlist: () => Promise<boolean>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [defaultWishlist, setDefaultWishlist] = useState<Wishlist | undefined>(undefined);

  const fetchWishlists = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      setWishlists([]);
      setDefaultWishlist(undefined);
      return;
    }
    try {
      console.log('WishlistContext: Fetching wishlists with WishlistAPI.getWishlists');
      const response = await WishlistAPI.getWishlists(user.id);
      if (response.success) {
        setWishlists(response.data);
        setDefaultWishlist(response.data.find(wl => wl.is_default) || response.data[0]);
      } else {
        console.error("Failed to fetch wishlists:", response.message);
        toast.error(response.message || "Failed to load wishlists.");
      }
    } catch (error) {
      console.error("Failed to fetch wishlists:", error);
      toast.error("Failed to load wishlists.");
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  const addItem = async (productId: string, variantId?: string, quantity: number = 1): Promise<boolean> => {
    if (!isAuthenticated || !user?.id) {
      toast.error("Please log in to add items to wishlist.");
      return false;
    }
    let currentDefaultWishlist = defaultWishlist;
    if (!currentDefaultWishlist) {
      // Create a default wishlist if none exists
      try {
        const response = await WishlistAPI.createWishlist(user.id, {
          name: "My Wishlist",
          is_default: true,
        });
        if (response.success) {
          currentDefaultWishlist = response.data;
          setDefaultWishlist(response.data);
          setWishlists(prev => [...prev, response.data]);
          toast.success("Default wishlist created!");
        } else {
          console.error("Failed to create default wishlist:", response.message);
          toast.error(response.message || "Failed to create default wishlist.");
          return false;
        }
      } catch (error) {
        console.error("Failed to create default wishlist:", error);
        toast.error("Failed to create default wishlist.");
        return false;
      }
    }

    try {
      const response = await WishlistAPI.addItemToWishlist(
        user.id,
        currentDefaultWishlist!.id,
        {
          product_id: productId,
          variant_id: variantId,
          quantity: quantity,
        }
      );
      if (response.success) {
        toast.success("Item added to wishlist!");
        fetchWishlists(); // Refresh wishlists
        return true;
      } else {
        console.error("Failed to add item to wishlist:", response.message);
        toast.error(response.message || "Failed to add item to wishlist.");
        return false;
      }
    } catch (error) {
      console.error("Failed to add item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
      return false;
    }
  };

  const removeItem = async (wishlistId: string, itemId: string): Promise<boolean> => {
    if (!isAuthenticated || !user?.id) {
      toast.error("Please log in to remove items from wishlist.");
      return false;
    }
    try {
      const response = await WishlistAPI.removeItemFromWishlist(user.id, wishlistId, itemId);
      if (response.success) {
        toast.success("Item removed from wishlist!");
        fetchWishlists(); // Refresh wishlists
        return true;
      } else {
        console.error("Failed to remove item from wishlist:", response.message);
        toast.error(response.message || "Failed to remove item from wishlist.");
        return false;
      }
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
      toast.error("Failed to remove item from wishlist.");
      return false;
    }
  };

  const isInWishlist = (productId: string, variantId?: string) => {
    if (!defaultWishlist) return false;
    return defaultWishlist.items.some(
      item => item.product_id === productId && (variantId ? item.variant_id === variantId : true)
    );
  };

  const clearWishlist = async (): Promise<boolean> => {
    if (!isAuthenticated || !user?.id || !defaultWishlist) {
      toast.error("Please log in to clear wishlist.");
      return false;
    }
    try {
      const itemIds = defaultWishlist.items.map(item => item.id);
      const response = await WishlistAPI.clearWishlist(user.id, defaultWishlist.id, itemIds);
      if (response.success) {
        toast.success("Wishlist cleared!");
        fetchWishlists(); // Refresh wishlists
        return true;
      } else {
        console.error("Failed to clear wishlist:", response.message);
        toast.error(response.message || "Failed to clear wishlist.");
        return false;
      }
    } catch (error) {
      console.error("Failed to clear wishlist:", error);
      toast.error("Failed to clear wishlist.");
      return false;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        defaultWishlist,
        fetchWishlists,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}