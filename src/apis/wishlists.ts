import { apiClient, APIResponse } from './client';
import { Wishlist, WishlistItem, WishlistCreate, WishlistItemCreate } from './types';

export class WishlistAPI {
  static async getWishlists(userId: string): Promise<APIResponse<Wishlist[]>> {
    return await apiClient.get<Wishlist[]>(`/users/${userId}/wishlists`);
  }

  static async createWishlist(userId: string, data: WishlistCreate): Promise<APIResponse<Wishlist>> {
    return await apiClient.post<Wishlist>(`/users/${userId}/wishlists`, data);
  }

  static async addItemToWishlist(userId: string, wishlistId: string, data: WishlistItemCreate): Promise<APIResponse<WishlistItem>> {
    return await apiClient.post<WishlistItem>(`/users/${userId}/wishlists/${wishlistId}/items`, data);
  }

  static async removeItemFromWishlist(userId: string, wishlistId: string, itemId: string): Promise<APIResponse<null>> {
    return await apiClient.delete<null>(`/users/${userId}/wishlists/${wishlistId}/items/${itemId}`);
  }

  static async clearWishlist(userId: string, wishlistId: string, itemIds: string[]): Promise<APIResponse<null>> {
    // This is a custom implementation for clearing, as the backend doesn't have a direct clear endpoint
    // It will send multiple delete requests
    const deletePromises = itemIds.map(itemId =>
      apiClient.delete<null>(`/users/${userId}/wishlists/${wishlistId}/items/${itemId}`)
    );
    await Promise.all(deletePromises);
    return { success: true, data: null, message: "Wishlist cleared successfully" };
  }

  static async setAsDefault(userId: string, wishlistId: string): Promise<APIResponse<Wishlist>> {
    // Assuming a PUT endpoint for setting default wishlist
    return await apiClient.put<Wishlist>(`/users/${userId}/wishlists/${wishlistId}/default`);
  }
}

export default WishlistAPI;