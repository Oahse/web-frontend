/**
 * Users API endpoints (placeholder - functionality moved to auth.ts)
 */

import { apiClient, APIResponse } from './client';
import { User } from './types';

export class UsersAPI {
  /**
   * Get user profile
   */
  static async getProfile(): Promise<APIResponse<User>> {
    return await apiClient.get<User>('/users/profile');
  }

  /**
   * Update user profile
   */
  static async updateProfile(data: Partial<User>): Promise<APIResponse<User>> {
    return await apiClient.put<User>('/users/profile', data);
  }
}

export default UsersAPI;