/**
 * Categories API endpoints
 */

import { apiClient, APIResponse } from './client';
import { Category } from './types';

export class CategoriesAPI {
  /**
   * Get all categories
   */
  static async getCategories(): Promise<APIResponse<Category[]>> {
    return await apiClient.get<Category[]>('/products/categories');
  }

  /**
   * Get category by ID
   */
  static async getCategory(id: string): Promise<APIResponse<Category>> {
    return await apiClient.get<Category>(`/products/categories/${id}`);
  }
}

export default CategoriesAPI;