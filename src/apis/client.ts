/**
 * API Client Configuration and Base Setup
 * Handles authentication, error handling, and request/response interceptors
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { User, ApiResponse, ApiError } from '../types';

// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env?.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Backend error response structure
interface BackendErrorResponse {
  message: string;
  detail?: string;
  details?: Record<string, string[]> | unknown;
  timestamp?: string;
  path?: string;
  errors?: Record<string, string[]>;
}

// Token management
class TokenManager {
  private static readonly TOKEN_KEY = 'banwee_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'banwee_refresh_token';
  private static readonly USER_KEY = 'banwee_user';

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  static getUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

let isToastVisible = false;

// API Client class
class APIClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  constructor() {
    this.client = axios.create(API_CONFIG);
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = TokenManager.getToken();
        if (token && !this.isPublicEndpoint(config.url || '')) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId();

        // Log request in development
        // if (import.meta.env.DEV) {
        //   console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        //     data: config.data,
        //     params: config.params,
        //   });
        // }

        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (import.meta.env.DEV) {
          console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
          });
        }

        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return this.client(originalRequest);
            }).catch((err) => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = TokenManager.getRefreshToken();
            if (refreshToken) {
              const response = await this.client.post('/auth/refresh', {
                refresh_token: refreshToken,
              });

              const { access_token } = response.data;
              TokenManager.setToken(access_token);

              this.processQueue(null, access_token);

              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${access_token}`;
              }

              return this.client(originalRequest);
            }
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            TokenManager.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Check if this is a public endpoint that shouldn't show login toasts
        const isPublic = this.isPublicEndpoint(error.config?.url || '');
        return this.handleError(error, isPublic);
      }
    );
  }

  private processQueue(error: unknown, token: string | null): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private handleError(error: AxiosError, suppressToasts = false): Promise<never> {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      code: error.response?.status?.toString(),
    };

    if (error.response?.data) {
      const errorData = error.response.data as BackendErrorResponse;
      
      // Handle backend error structure
      if (errorData.message) {
        apiError.message = errorData.message;
      } else if (errorData.detail) {
        apiError.message = errorData.detail;
      }
      
      // Handle validation errors
      if (errorData.details || errorData.errors) {
        apiError.message = errorData.details || errorData.errors;
        
        // Extract first validation error for display
        const validationErrors = errorData.details || errorData.errors;
        if (validationErrors && typeof validationErrors === 'object') {
          const firstError = Object.values(validationErrors)[0];
          if (Array.isArray(firstError) && firstError.length > 0) {
            apiError.message = firstError[0];
          }
        }
      }
    } else if (error.request) {
      // This block is executed when the request was made but no response was received.
      // This often indicates a network issue or a server that closed the connection prematurely.
      if (error.code === 'ECONNABORTED') { // Timeout error
        apiError.message = 'Request timed out. Please try again.';
        apiError.code = 'TIMEOUT_ERROR';
      } else {
        apiError.message = 'Failed to connect to the server. Please ensure the backend is running and accessible.';
        apiError.code = 'CONNECTION_ERROR';
      }
    }

    // Show user-friendly error messages (will be suppressed for public endpoints)
    this.showErrorToast(apiError, suppressToasts);

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: apiError.message,
        details: apiError.details,
      });
    }

    return Promise.reject(apiError);
  }

  private showErrorToast(error: ApiError, suppressToasts = false): void {
    // Don't show toast if suppressed or if it's a 401 error on homepage/public endpoints
    if (suppressToasts || this.shouldSuppressErrorToast(error)) {
      return;
    }

    if (isToastVisible) {
      return;
    }

    isToastVisible = true;
    setTimeout(() => {
      isToastVisible = false;
    }, 30000); // Reset after 30 seconds

    const statusCode = error.code ? parseInt(error.code) : null;
    let message = error.message;

    // Customize messages based on status codes
    switch (statusCode) {
      case 400:
        message = 'Invalid request. Please check your input.';
        break;
      case 403:
        message = 'You don\'t have permission to perform this action.';
        break;
      case 404:
        message = 'The requested resource was not found.';
        break;
      case 422:
        // For validation errors, use the specific message from backend
        break;
      case 429:
        message = 'Too many requests. Please wait a moment and try again.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      default:
        if (statusCode && statusCode >= 500) {
          message = 'Server error. Please try again later.';
        }
    }

    toast.error(message);
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private isPublicEndpoint(url: string): boolean {
    // List of public endpoints that shouldn't show login prompts
    const publicEndpoints = [
      '/api/v1/products/featured',
      '/api/v1/products/popular',
      '/api/v1/products',
      '/api/v1/products/categories',
      '/api/v1/auth/refresh',
      '/api/v1/users/profile'
    ];

    return publicEndpoints.some(endpoint => url.includes(endpoint));
  }

  private shouldSuppressErrorToast(error: ApiError): boolean {
    // Suppress 401 errors for public endpoints that don't require authentication
    if (error.code === '401') {
      return true; // Let the auth interceptor handle 401s
    }

    return false;
  }

  // HTTP Methods
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // File upload
  async upload<T = unknown>(url: string, file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    };

    const response = await this.client.post<ApiResponse<T>>(url, formData, config);
    return response.data;
  }

  // Download file
  async download(url: string, filename?: string): Promise<void> {
    const response = await this.client.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  // Get raw axios instance for advanced usage
  getClient(): AxiosInstance {
    return this.client;
  }

  // ==================== CONSOLIDATED API METHODS ====================

  // Auth methods
  async login(credentials: { email: string; password: string }) {
    return this.post('/auth/login', credentials);
  }

  async register(userData: { email: string; password: string; firstname: string; lastname: string; phone?: string }) {
    return this.post('/auth/register', userData);
  }

  async logout() {
    return this.post('/auth/logout', {});
  }

  async refreshToken() {
    return this.post('/auth/refresh', {});
  }

  // User methods
  async getCurrentUser() {
    return this.get('/users/me');
  }

  async updateProfile(updates: Partial<User>) {
    return this.put('/users/me', updates);
  }

  async changePassword(data: { current_password: string; new_password: string }) {
    return this.put('/users/me/password', data);
  }

  // Address methods
  async getUserAddresses() {
    return this.get('/users/me/addresses');
  }

  async createAddress(address: Record<string, unknown>) {
    return this.post('/users/me/addresses', address);
  }

  async updateAddress(id: number, updates: Record<string, unknown>) {
    return this.put(`/users/me/addresses/${id}`, updates);
  }

  async deleteAddress(id: number) {
    return this.delete(`/users/me/addresses/${id}`);
  }

  async setDefaultAddress(id: number) {
    return this.put(`/users/me/addresses/${id}/default`, {});
  }

  // Product methods
  async getProducts(params?: Record<string, unknown>) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(','));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }
    const url = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get(url);
  }

  async getProduct(id: number | string) {
    return this.get(`/products/${id}`);
  }

  async getProductWithDetails(id: number | string) {
    return this.get(`/products/${id}?include_variants=true&include_reviews=true`);
  }

  async getFeaturedProducts(limit = 10) {
    return this.get(`/products/featured?limit=${limit}`);
  }

  async searchProducts(query: string) {
    return this.get(`/products/search?q=${encodeURIComponent(query)}`);
  }

  // Category methods
  async getCategories() {
    return this.get('/categories');
  }

  async getCategory(id: number) {
    return this.get(`/categories/${id}`);
  }

  async getCategoryProducts(id: number, page = 1, limit = 20) {
    return this.get(`/categories/${id}/products?page=${page}&limit=${limit}`);
  }

  // Cart methods
  async getCart() {
    return this.get('/cart');
  }

  async addToCart(variantId: number, quantity: number) {
    return this.post('/cart/items', { variant_id: variantId, quantity });
  }

  async updateCartItem(itemId: number, quantity: number) {
    return this.put(`/cart/items/${itemId}`, { quantity });
  }

  async removeFromCart(itemId: number) {
    return this.delete(`/cart/items/${itemId}`);
  }

  async clearCart() {
    return this.delete('/cart');
  }

  // Order methods
  async getOrders(params?: Record<string, unknown>) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const url = `/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.get(url);
  }

  async getOrder(id: string) {
    return this.get(`/orders/${id}`);
  }

  async createOrder(orderData: {
    shipping_address_id: number;
    shipping_method_id: number;
    payment_method_id: number;
    promocode?: string;
    notes?: string;
  }) {
    return this.post('/orders', orderData);
  }

  async cancelOrder(id: string) {
    return this.put(`/orders/${id}/cancel`, {});
  }

  async trackOrder(id: string) {
    return this.get(`/orders/${id}/tracking`);
  }

  // Review methods
  async getProductReviews(productId: number, page = 1, limit = 10) {
    return this.get(`/products/${productId}/reviews?page=${page}&limit=${limit}`);
  }

  async createReview(review: { product_id: number; rating: number; comment?: string }) {
    return this.post('/reviews', review);
  }

  async updateReview(id: string, updates: Record<string, unknown>) {
    return this.put(`/reviews/${id}`, updates);
  }

  async deleteReview(id: string) {
    return this.delete(`/reviews/${id}`);
  }

  // Wishlist methods
  async getWishlists() {
    return this.get('/wishlists');
  }

  async getWishlist(id: number) {
    return this.get(`/wishlists/${id}`);
  }

  async createWishlist(data: { name: string; is_public?: boolean }) {
    return this.post('/wishlists', data);
  }

  async addToWishlist(wishlistId: number, productId: number, quantity = 1) {
    return this.post(`/wishlists/${wishlistId}/items`, { product_id: productId, quantity });
  }

  async removeFromWishlist(wishlistId: number, itemId: number) {
    return this.delete(`/wishlists/${wishlistId}/items/${itemId}`);
  }

  // Payment methods
  async getPaymentMethods() {
    return this.get('/payment-methods');
  }

  async createPaymentMethod(method: { type: string; provider: string; token: string }) {
    return this.post('/payment-methods', method);
  }

  async deletePaymentMethod(id: number) {
    return this.delete(`/payment-methods/${id}`);
  }

  async setDefaultPaymentMethod(id: number) {
    return this.put(`/payment-methods/${id}/default`, {});
  }

  // Shipping methods
  async getShippingMethods() {
    return this.get('/shipping-methods');
  }

  async calculateShipping(addressId: number, items: Array<{ variant_id: number; quantity: number }>) {
    return this.post('/shipping/calculate', { address_id: addressId, items });
  }

  // Promocode methods
  async validatePromocode(code: string, orderTotal: number) {
    return this.post('/promocodes/validate', { code, order_total: orderTotal });
  }

  // Blog methods
  async getBlogPosts(page = 1, limit = 10) {
    return this.get(`/blog/posts?page=${page}&limit=${limit}`);
  }

  async getBlogPost(id: string) {
    return this.get(`/blog/posts/${id}`);
  }

  async getFeaturedBlogPosts(limit = 5) {
    return this.get(`/blog/posts/featured?limit=${limit}`);
  }
}

// Export singleton instance
export const apiClient = new APIClient();
export { TokenManager };
export default apiClient;