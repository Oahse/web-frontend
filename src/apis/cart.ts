/**
 * Shopping Cart API endpoints
 */

import { apiClient } from './client';
import {
  Cart,
  CartItem,
  ApiResponse
} from '../types';

interface AddToCartRequest {
  variant_id: string;
  quantity: number;
}

export class CartAPI {
  static async getCart(access_token: string): Promise<ApiResponse<Cart>> {
    return await apiClient.get<Cart>('/cart', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async addToCart(item: AddToCartRequest, access_token: string): Promise<ApiResponse<Cart>> {
    return await apiClient.post<Cart>('/cart/add', item, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async updateCartItem(itemId: string, quantity: number, access_token: string): Promise<ApiResponse<Cart>> {
    return await apiClient.put<Cart>(`/cart/update/${itemId}`, { quantity }, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async removeFromCart(itemId: string, access_token: string): Promise<ApiResponse<Cart>> {
    return await apiClient.delete<Cart>(`/cart/remove/${itemId}`, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async clearCart(access_token: string): Promise<ApiResponse<Cart>> {
    return await apiClient.post<Cart>('/cart/clear', {}, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async applyPromocode(code: string, access_token: string): Promise<ApiResponse<{ message: string; discount_amount: number; cart: Cart }>> {
    return await apiClient.post('/cart/promocode', { code }, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async removePromocode(access_token: string): Promise<ApiResponse<{ message: string; cart: Cart }>> {
    return await apiClient.delete('/cart/promocode', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async getCartItemCount(access_token: string): Promise<ApiResponse<{ count: number }>> {
    return await apiClient.get<{ count: number }>('/cart/count', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async validateCart(access_token: string): Promise<ApiResponse<{ valid: boolean; issues: Array<{ item_id: string; issue: string; message: string }>; cart: Cart }>> {
    return await apiClient.post('/cart/validate', {}, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async getShippingOptions(address: { country: string; state: string; city: string; post_code: string }, access_token: string): Promise<ApiResponse<Array<{ id: string; name: string; description: string; price: number; estimated_days: number }>>> {
    return await apiClient.post('/cart/shipping-options', address, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async calculateTotals(data: { shipping_option_id?: string; promocode?: string; tax_address?: { country: string; state: string; city: string; post_code: string } }, access_token: string): Promise<ApiResponse<{ subtotal: number; tax_amount: number; shipping_amount: number; discount_amount: number; total_amount: number; currency: string }>> {
    return await apiClient.post('/cart/calculate', data, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async saveForLater(itemId: string, access_token: string): Promise<ApiResponse<{ message: string }>> {
    return await apiClient.post(`/cart/items/${itemId}/save-for-later`, {}, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async moveToCart(itemId: string, access_token: string): Promise<ApiResponse<Cart>> {
    return await apiClient.post<Cart>(`/cart/items/${itemId}/move-to-cart`, {}, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async getSavedItems(access_token: string): Promise<ApiResponse<CartItem[]>> {
    return await apiClient.get<CartItem[]>('/cart/saved-items', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async mergeCart(guestCartItems: Array<{ variant_id: string; quantity: number }>, access_token: string): Promise<ApiResponse<Cart>> {
    return await apiClient.post<Cart>('/cart/merge', { items: guestCartItems }, {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }

  static async getCheckoutSummary(access_token: string): Promise<ApiResponse<{ cart: Cart; available_payment_methods: Array<{ id: string; name: string; type: string; fees?: number }>; available_shipping_methods: Array<{ id: string; name: string; price: number; estimated_days: number }>; tax_info: { tax_rate: number; tax_amount: number; tax_included: boolean } }>> {
    return await apiClient.get('/cart/checkout-summary', {
      headers: { 'Authorization': `Bearer ${access_token}` },
    });
  }
}

export default CartAPI;