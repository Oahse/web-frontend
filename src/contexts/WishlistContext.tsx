import React, { useEffect, useState, createContext, useContext, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

export interface WishlistItem {
  id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  added_at: string;
  product?: {
    id: string;
    name: string;
    variants: Array<{
      images: Array<{ url: string }>;
    }>;
  };
  variant?: {
    id: string;
    name: string;
    base_price: number;
    sale_price?: number;
  };
}

export interface Wishlist {
  id: string;
  user_id: string;
  name?: string;
  is_default: boolean;
  items: WishlistItem[];
}

interface WishlistContextType {
  wishlists: Wishlist[];
  defaultWishlist: Wishlist | undefined;
  fetchWishlists: () => Promise<void>;
  addItem: (productId: string, variantId?: string, quantity?: number) => Promise<void>;
  removeItem: (wishlistId: string, itemId: string) => Promise<void>;
  isInWishlist: (productId: string, variantId?: string) => boolean;
  clearWishlist: () => Promise<void>;
}
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
export const WishlistProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [defaultWishlist, setDefaultWishlist] = useState<Wishlist | undefined>(undefined);
  const { isAuthenticated, user } = useAuth();

  const fetchWishlists = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      setWishlists([]);
      setDefaultWishlist(undefined);
      return;
    }
    try {
      const response = await axios.get<Wishlist[]>(`/api/v1/users/${user.id}/wishlists`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setWishlists(response.data);
      setDefaultWishlist(response.data.find(wl => wl.is_default) || response.data[0]);
    } catch (error) {
      console.error("Failed to fetch wishlists:", error);
      toast.error("Failed to load wishlists.");
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  const addItem = async (productId: string, variantId?: string, quantity: number = 1) => {
    if (!isAuthenticated || !user?.id) {
      toast.error("Please log in to add items to wishlist.");
      return;
    }
    if (!defaultWishlist) {
      // Create a default wishlist if none exists
      try {
        const response = await axios.post<Wishlist>(`/api/v1/users/${user.id}/wishlists`, {
          name: "My Wishlist",
          is_default: true,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setDefaultWishlist(response.data);
        wishlists.push(response.data);
        toast.success("Default wishlist created!");
      } catch (error) {
        console.error("Failed to create default wishlist:", error);
        toast.error("Failed to create default wishlist.");
        return;
      }
    }

    try {
      const response = await axios.post<WishlistItem>(
        `/api/v1/users/${user.id}/wishlists/${defaultWishlist?.id}/items`,
        {
          product_id: productId,
          variant_id: variantId,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success("Item added to wishlist!");
      fetchWishlists(); // Refresh wishlists
    } catch (error) {
      console.error("Failed to add item to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }
  };

  const removeItem = async (wishlistId: string, itemId: string) => {
    if (!isAuthenticated || !user?.id) {
      toast.error("Please log in to remove items from wishlist.");
      return;
    }
    try {
      await axios.delete(`/api/v1/users/${user.id}/wishlists/${wishlistId}/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success("Item removed from wishlist!");
      fetchWishlists(); // Refresh wishlists
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
      toast.error("Failed to remove item from wishlist.");
    }
  };

  const isInWishlist = (productId: string, variantId?: string) => {
    if (!defaultWishlist) return false;
    return defaultWishlist.items.some(
      item => item.product_id === productId && (variantId ? item.variant_id === variantId : true)
    );
  };

  const clearWishlist = async () => {
    if (!isAuthenticated || !user?.id || !defaultWishlist) {
      toast.error("Please log in to clear wishlist.");
      return;
    }
    try {
      // Remove all items from the default wishlist
      await Promise.all(defaultWishlist.items.map(item =>
        axios.delete(`/api/v1/users/${user.id}/wishlists/${defaultWishlist.id}/items/${item.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
      ));
      toast.success("Wishlist cleared!");
      fetchWishlists(); // Refresh wishlists
    } catch (error) {
      console.error("Failed to clear wishlist:", error);
      toast.error("Failed to clear wishlist.");
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
};