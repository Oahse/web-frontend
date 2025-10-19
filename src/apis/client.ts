/**
 * API Client Configuration and Base Setup
 * Handles authentication, error handling, and request/response interceptors
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Error types
export interface APIError {
  error: boolean;
  message: string;
  details?: unknown;
  timestamp?: string;
  path?: string;
  status?: number;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
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

  private handleError(error: AxiosError, suppressToasts: boolean = false): Promise<never> {
    const apiError: APIError = {
      error: true,
      message: 'An unexpected error occurred',
      status: error.response?.status,
    };

    if (error.response?.data) {
      const errorData = error.response.data as unknown;
      if (typeof errorData?.message === 'object' && errorData.message !== null && 'message' in errorData.message) {
        apiError.message = (errorData.message as { message: string }).message;
      } else {
        apiError.message = errorData?.message || errorData?.detail || apiError.message;
      }
      apiError.details = errorData?.details;
      apiError.timestamp = errorData?.timestamp;
      apiError.path = errorData?.path;
    } else if (error.request) {
      apiError.message = 'Network error - please check your connection';
    }

    // Show user-friendly error messages (will be suppressed for public endpoints)
    console.log('API Error URL:', error.config?.url);
    this.showErrorToast(apiError, suppressToasts);

    // Log error in development
    // if (import.meta.env.DEV) {
    //   console.error('❌ API Error:', {
    //     url: error.config?.url,
    //     method: error.config?.method,
    //     status: error.response?.status,
    //     message: apiError.message,
    //     details: apiError.details,
    //   });
    // }

    return Promise.reject(apiError);
  }

  private showErrorToast(error: APIError, suppressToasts: boolean = false): void {
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

    const status = error.status;
    let message = error.message;

    // Customize messages based on status codes
    switch (status) {
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
        message = 'Please check your input and try again.';
        break;
      case 429:
        message = 'Too many requests. Please wait a moment and try again.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      default:
        if (status && status >= 500) {
          message = 'Server error. Please try again later.';
        }
    }

    toast.error(message);
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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

  private shouldSuppressErrorToast(error: APIError): boolean {
    // Suppress 401 errors for public endpoints that don't require authentication
    if (error.status === 401) {
      // Check if the error path matches any public endpoint
      if (error.path && this.isPublicEndpoint(error.path)) {
        return true;
      }
    }
    
    return false;
  }

  // HTTP Methods
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.get<APIResponse<T>>(url, config);
    return response.data;
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.post<APIResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.put<APIResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.patch<APIResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    const response = await this.client.delete<APIResponse<T>>(url, config);
    return response.data;
  }

  // File upload
  async upload<T = unknown>(url: string, file: File, onProgress?: (progress: number) => void): Promise<APIResponse<T>> {
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

    const response = await this.client.post(url, formData, config);
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
}

// Export singleton instance
export const apiClient = new APIClient();
export { TokenManager };
export default apiClient;