/**
 * Products API endpoints
 */

import { apiClient } from './client';
import { 
  Product,
  ProductVariant, 
  ProductFilters,
  PaginatedResponse,
  ApiResponse,
  Review
} from '../types';

export class ProductsAPI {
  /**
   * Get all products with optional filters
   */
  static async getProducts(params?: ProductFilters): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.q) queryParams.append('q', params.q);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.min_price) queryParams.append('min_price', params.min_price.toString());
    if (params?.max_price) queryParams.append('max_price', params.max_price.toString());
    if (params?.availability !== undefined) queryParams.append('availability', params.availability.toString());
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params?.sort_order) queryParams.append('sort_order', params.sort_order);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<Product>>(url);
  }

  /**
   * Get product by ID
   */
  static async getProduct(productId: string): Promise<ApiResponse<Product>> {
    return await apiClient.get<Product>(`/products/${productId}`);
  }

  /**
   * Search products
   */
  static async searchProducts(query: string, filters?: Omit<ProductFilters, 'search'>): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const params = { q: query, ...filters };
    return await this.getProducts(params);
  }

  /**
   * Get product variants
   */
  static async getProductVariants(productId: string): Promise<ApiResponse<ProductVariant[]>> {
    return await apiClient.get<ProductVariant[]>(`/products/${productId}/variants`);
  }

  /**
   * Get variant by ID
   */
  static async getVariant(variantId: string): Promise<ApiResponse<ProductVariant>> {
    return await apiClient.get<ProductVariant>(`/products/variants/${variantId}`);
  }

  /**
   * Get variant QR code
   */
  static async getVariantQRCode(variantId: string): Promise<ApiResponse<{ qr_code: string }>> {
    return await apiClient.get<{ qr_code: string }>(`/products/variants/${variantId}/qrcode`);
  }

  /**
   * Get variant barcode
   */
  static async getVariantBarcode(variantId: string): Promise<ApiResponse<{ barcode: string }>> {
    return await apiClient.get<{ barcode: string }>(`/products/variants/${variantId}/barcode`);
  }

  /**
   * Get featured products
   */
  static async getFeaturedProducts(limit = 10): Promise<ApiResponse<Product[]>> {
    return await apiClient.get<Product[]>(`/products/featured?limit=${limit}`);
  }
  
  static async getPopularProducts(limit = 10): Promise<ApiResponse<Product[]>> {
    return await apiClient.get<Product[]>(`/products/popular?limit=${limit}`);
  }

  /**
   * Get recommended products
   */
  static async getRecommendedProducts(productId?: string, limit = 10): Promise<ApiResponse<Product[]>> {
    const url = productId 
      ? `/products/${productId}/recommendations?limit=${limit}`
      : `/products/recommendations?limit=${limit}`;
    return await apiClient.get<Product[]>(url);
  }

  /**
   * Get product reviews
   */
  static async getProductReviews(productId: string, page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Review>>> {
    return await apiClient.get<PaginatedResponse<Review>>(`/products/${productId}/reviews?page=${page}&limit=${limit}`);
  }

  /**
   * Add product review
   */
  static async addProductReview(productId: string, review: {
    rating: number;
    title: string;
    comment: string;
  }): Promise<ApiResponse<{ message: string }>> {
    return await apiClient.post<{ message: string }>(`/products/${productId}/reviews`, review);
  }

  /**
   * Get product availability
   */
  static async checkAvailability(variantId: string, quantity = 1): Promise<ApiResponse<{
    available: boolean;
    stock: number;
    max_quantity: number;
  }>> {
    return await apiClient.get<{
      available: boolean;
      stock: number;
      max_quantity: number;
    }>(`/products/variants/${variantId}/availability?quantity=${quantity}`);
  }

  // Supplier/Admin endpoints
  /**
   * Create new product (Supplier/Admin only)
   */
  static async createProduct(product: {
    name: string;
    description: string;
    category_id: number;
    variants?: Array<{
      sku: string;
      name: string;
      base_price: number;
      sale_price?: number;
      stock: number;
      attributes?: Record<string, unknown>;
    }>;
  }): Promise<ApiResponse<Product>> {
    return await apiClient.post<Product>('/products', product);
  }

  /**
   * Update product (Supplier/Admin only)
   */
  static async updateProduct(productId: string, updates: Partial<Product>): Promise<ApiResponse<Product>> {
    return await apiClient.put<Product>(`/products/${productId}`, updates);
  }

  /**
   * Delete product (Supplier/Admin only)
   */
  static async deleteProduct(productId: string): Promise<ApiResponse<{ message: string }>> {
    return await apiClient.delete<{ message: string }>(`/products/${productId}`);
  }

  /**
   * Create product variant (Supplier/Admin only)
   */
  static async createVariant(productId: string, variant: {
    sku: string;
    name: string;
    base_price: number;
    sale_price?: number;
    stock: number;
    attributes?: Record<string, unknown>;
  }): Promise<ApiResponse<ProductVariant>> {
    return await apiClient.post<ProductVariant>(`/products/${productId}/variants`, variant);
  }

  /**
   * Update product variant (Supplier/Admin only)
   */
  static async updateVariant(variantId: string, updates: Partial<ProductVariant>): Promise<ApiResponse<ProductVariant>> {
    return await apiClient.put<ProductVariant>(`/products/variants/${variantId}`, updates);
  }

  /**
   * Delete product variant (Supplier/Admin only)
   */
  static async deleteVariant(variantId: string): Promise<ApiResponse<{ message: string }>> {
    return await apiClient.delete<{ message: string }>(`/products/variants/${variantId}`);
  }

  /**
   * Upload product images (Supplier/Admin only)
   */
  static async uploadProductImage(
    variantId: string, 
    file: File, 
    isPrimary = false,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ message: string; image_url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('is_primary', isPrimary.toString());

    return await apiClient.upload<{ message: string; image_url: string }>(`/products/variants/${variantId}/images`, file, onProgress);
  }

  /**
   * Delete product image (Supplier/Admin only)
   */
  static async deleteProductImage(imageId: string): Promise<ApiResponse<{ message: string }>> {
    return await apiClient.delete<{ message: string }>(`/products/images/${imageId}`);
  }

  /**
   * Update inventory (Supplier/Admin only)
   */
  static async updateInventory(variantId: string, stock: number): Promise<ApiResponse<{ message: string }>> {
    return await apiClient.put<{ message: string }>(`/products/variants/${variantId}/inventory`, { stock });
  }

  /**
   * Get supplier products (Supplier only)
   */
  static async getSupplierProducts(params?: ProductFilters): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.q) queryParams.append('q', params.q);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/suppliers/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<Product>>(url);
  }
}

export default ProductsAPI;