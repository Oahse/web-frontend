/**
 * API Client Index - Export all API modules
 */

// Export the main client and utilities
export { apiClient, TokenManager } from './client';
export type { APIError, APIResponse } from './client';

// Export all API classes
export { default as AuthAPI } from './auth';
export { default as ProductsAPI } from './products';
export { default as OrdersAPI } from './orders';
export { default as CartAPI } from './cart';
export { default as AnalyticsAPI } from './analytics';
export { default as AdminAPI } from './admin';
export { default as ReviewsAPI } from './reviews';
export { default as BlogAPI } from './blog';
export { default as SubscriptionAPI } from './subscription';
export { default as CategoriesAPI } from './categories';

// Export all types
export * from './types';

// Create a centralized API object for easy access
import AuthAPI from './auth';
import ProductsAPI from './products';
import OrdersAPI from './orders';
import CartAPI from './cart';
import AnalyticsAPI from './analytics';
import AdminAPI from './admin';
import ReviewsAPI from './reviews';
import BlogAPI from './blog';
import SubscriptionAPI from './subscription';
import CategoriesAPI from './categories';

export const API = {
  auth: AuthAPI,
  products: ProductsAPI,
  orders: OrdersAPI,
  cart: CartAPI,
  analytics: AnalyticsAPI,
  admin: AdminAPI,
  reviews: ReviewsAPI,
  blog: BlogAPI,
  subscription: SubscriptionAPI,
  categories: CategoriesAPI,
};

// Export default as the centralized API object
export default API;