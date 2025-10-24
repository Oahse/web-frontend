/**
 * Authentication API endpoints
 */

import { apiClient, TokenManager } from './client';
import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  APIResponse, 
  Address
} from './types';

export class AuthAPI {
  /**
   * Register a new user
   */
  static async register(data: RegisterRequest): Promise<APIResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    
    if (response.data.access_token) {
      TokenManager.setToken(response.data.access_token);
      if (response.data.refresh_token) {
        TokenManager.setRefreshToken(response.data.refresh_token);
      }
      TokenManager.setUser(response.data.user);
    }
    
    return response;
  }

  /**
   * Login user
   */
  static async login(data: LoginRequest): Promise<APIResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    
    if (response.data.access_token) {
      TokenManager.setToken(response.data.access_token);
      if (response.data.refresh_token) {
        TokenManager.setRefreshToken(response.data.refresh_token);
      }
      TokenManager.setUser(response.data.user);
    }
    
    return response;
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      // Call logout endpoint if it exists
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      TokenManager.clearTokens();
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(): Promise<APIResponse<User>> {
    return await apiClient.get<User>('/auth/profile');
  }

  /**
   * Update user profile
   */
  static async updateProfile(data: Partial<User>): Promise<APIResponse<User>> {
    const response = await apiClient.put<User>('/auth/profile', data);
    
    // Update stored user data
    if (response.data) {
      TokenManager.setUser(response.data);
    }
    
    return response;
  }

  /**
   * Change password
   */
  static async changePassword(data: {
    current_password: string;
    new_password: string;
  }): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put<APIResponse<{ message: string }>>('/auth/change-password', data);
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.post<APIResponse<{ message: string }>>('/auth/forgot-password', { email });
  }

  /**
   * Reset password with token
   */
  static async resetPassword(data: {
    token: string;
    new_password: string;
  }): Promise<APIResponse<{ message: string }>> {
    return await apiClient.post<APIResponse<{ message: string }>>('/auth/reset-password', data);
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.post<APIResponse<{ message: string }>>('/auth/verify-email', { token });
  }

  /**
   * Resend email verification
   */
  static async resendVerification(): Promise<APIResponse<{ message: string }>> {
    return await apiClient.post<APIResponse<{ message: string }>>('/users/resend-verification');
  }

  /**
   * Social authentication
   */
  static async socialLogin(token: string, provider: string): Promise<APIResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>(`/auth/social/${provider}`, { token });
    
    if (response.data.access_token) {
      TokenManager.setToken(response.data.access_token);
      if (response.data.refresh_token) {
        TokenManager.setRefreshToken(response.data.refresh_token);
      }
      TokenManager.setUser(response.data.user);
    }
    
    return response;
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<APIResponse<{ access_token: string }>> {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<{ access_token: string }>('/auth/refresh', {
        refresh_token: refreshToken,
      });

      if (response.data.access_token) {
        TokenManager.setToken(response.data.access_token);
      }

      return response;
    } catch (error) {
      TokenManager.clearTokens();
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return TokenManager.isAuthenticated();
  }

  /**
   * Get current user from storage
   */
  static getCurrentUser(): User | null {
    return TokenManager.getUser();
  }

  /**
   * Delete user account
   */
  static async deleteAccount(password: string): Promise<APIResponse<{ message: string }>> {
    const response = await apiClient.delete<APIResponse<{ message: string }>>('/users', {
      data: { password }
    });
    
    // Clear tokens after successful deletion
    TokenManager.clearTokens();
    
    return response;
  }

  /**
   * Update notification preferences
   */
  static async updateNotificationPreferences(preferences: {
    email_notifications: boolean;
    sms_notifications: boolean;
    push_notifications: boolean;
    marketing_emails: boolean;
  }): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put<APIResponse<{ message: string }>>('/users/notification-preferences', preferences);
  }

  /**
   * Get user's addresses
   */
  static async getAddresses(): Promise<APIResponse<Address[]>> {
    return await apiClient.get<Address[]>(`/users/me/addresses`);
  }

  /**
   * Add new address
   */
  static async addAddress(address: Omit<Address, 'id' | 'created_at' | 'updated_at'>): Promise<APIResponse<Address>> {
    return await apiClient.post<Address>('/users/addresses', address);
  }

  /**
   * Update address
   */
  static async updateAddress(addressId: string, address: Partial<Omit<Address, 'id' | 'created_at' | 'updated_at'>>): Promise<APIResponse<Address>> {
    return await apiClient.put<Address>(`/users/addresses/${addressId}`, address);
  }

  /**
   * Delete address
   */
  static async deleteAddress(addressId: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.delete(`/users/addresses/${addressId}`);
  }
}

export default AuthAPI;