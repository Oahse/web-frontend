/**
 * Brands API endpoints (placeholder for future implementation)
 */

import { apiClient, APIResponse } from './client';

export interface Brand {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    website?: string;
    created_at: string;
    updated_at: string;
}

export class BrandsAPI {
    /**
     * Get all brands (placeholder)
     */
    static async getBrands(): Promise<APIResponse<Brand[]>> {
        return await apiClient.get('/brands');
    }

    /**
     * Get brand by ID (placeholder)
     */
    static async getBrand(id: string): Promise<APIResponse<Brand>> {
        return await apiClient.get(`/brands/${id}`);
    }
}

export default BrandsAPI;