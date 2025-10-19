/**
 * Analytics API endpoints
 */

import { apiClient } from './client';
import { 
  DashboardData, 
  AnalyticsFilters,
  APIResponse 
} from './types';

export class AnalyticsAPI {
  /**
   * Get dashboard data
   */
  static async getDashboardData(filters?: AnalyticsFilters): Promise<APIResponse<DashboardData>> {
    const queryParams = new URLSearchParams();
      
    if (filters?.date_range?.start) queryParams.append('date_from', filters.date_range.start);
    if (filters?.date_range?.end) queryParams.append('date_to', filters.date_range.end);
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.supplier) queryParams.append('supplier', filters.supplier);

    const url = `/analytics/dashboard${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<DashboardData>(url);
  }

  /**
   * Get real-time metrics
   */
  static async getRealTimeMetrics(): Promise<APIResponse<{
    active_users: number;
    orders_today: number;
    revenue_today: number;
    conversion_rate: number;
    page_views_today: number;
    cart_additions_today: number;
    last_updated: string;
  }>> {
    return await apiClient.get<{
    active_users: number;
    orders_today: number;
    revenue_today: number;
    conversion_rate: number;
    page_views_today: number;
    cart_additions_today: number;
    last_updated: string;
  }>('/analytics/real-time');
  }

  /**
   * Get sales analytics
   */
  static async getSalesAnalytics(filters?: AnalyticsFilters & {
    group_by?: 'day' | 'week' | 'month' | 'year';
  }): Promise<APIResponse<{
    total_sales: number;
    total_orders: number;
    average_order_value: number;
    sales_trend: Array<{
      date: string;
      sales: number;
      orders: number;
    }>;
    top_selling_products: Array<{
      product_id: string;
      product_name: string;
      sales: number;
      revenue: number;
    }>;
    sales_by_category: Array<{
      category: string;
      sales: number;
      revenue: number;
    }>;
  }>> {
    const queryParams = new URLSearchParams();
      
    if (filters?.date_range?.start) queryParams.append('date_from', filters.date_range.start);
    if (filters?.date_range?.end) queryParams.append('date_to', filters.date_range.end);
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.supplier) queryParams.append('supplier', filters.supplier);
    if (filters?.group_by) queryParams.append('group_by', filters.group_by);

    return await apiClient.get<{
    total_sales: number;
    total_orders: number;
    average_order_value: number;
    sales_trend: Array<{
      date: string;
      sales: number;
      orders: number;
    }>;
    top_selling_products: Array<{
      product_id: string;
      product_name: string;
      sales: number;
      revenue: number;
    }>;
    sales_by_category: Array<{
      category: string;
      sales: number;
      revenue: number;
    }>;
  }>(url);
  }

  /**
   * Get user analytics
   */
  static async getUserAnalytics(filters?: AnalyticsFilters): Promise<APIResponse<{
    total_users: number;
    new_users: number;
    active_users: number;
    user_growth: Array<{
      date: string;
      new_users: number;
      total_users: number;
    }>;
    users_by_role: Array<{
      role: string;
      count: number;
    }>;
    users_by_country: Array<{
      country: string;
      count: number;
    }>;
    retention_rate: number;
  }>> {
    const queryParams = new URLSearchParams();
      
    if (filters?.date_range?.start) queryParams.append('date_from', filters.date_range.start);
    if (filters?.date_range?.end) queryParams.append('date_to', filters.date_range.end);

    return await apiClient.get<{
    total_users: number;
    new_users: number;
    active_users: number;
    user_growth: Array<{
      date: string;
      new_users: number;
      total_users: number;
    }>;
    users_by_role: Array<{
      role: string;
      count: number;
    }>;
    users_by_country: Array<{
      country: string;
      count: number;
    }>;
    retention_rate: number;
  }>(url);
  }

  /**
   * Get product analytics
   */
  static async getProductAnalytics(filters?: AnalyticsFilters): Promise<APIResponse<{
    total_products: number;
    total_variants: number;
    products_by_category: Array<{
      category: string;
      count: number;
    }>;
    top_viewed_products: Array<{
      product_id: string;
      product_name: string;
      views: number;
    }>;
    low_stock_products: Array<{
      variant_id: string;
      product_name: string;
      variant_name: string;
      stock: number;
    }>;
    inventory_value: number;
  }>> {
    const queryParams = new URLSearchParams();
      
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.supplier) queryParams.append('supplier', filters.supplier);

    return await apiClient.get<{
    total_products: number;
    total_variants: number;
    products_by_category: Array<{
      category: string;
      count: number;
    }>;
    top_viewed_products: Array<{
      product_id: string;
      product_name: string;
      views: number;
    }>;
    low_stock_products: Array<{
      variant_id: string;
      product_name: string;
      variant_name: string;
      stock: number;
    }>;
    inventory_value: number;
  }>(url);
  }

  /**
   * Get conversion funnel analytics
   */
  static async getConversionFunnel(filters?: AnalyticsFilters): Promise<APIResponse<{
    page_views: number;
    product_views: number;
    cart_additions: number;
    checkout_starts: number;
    orders_completed: number;
    conversion_rates: {
      view_to_cart: number;
      cart_to_checkout: number;
      checkout_to_order: number;
      overall: number;
    };
  }>> {
    const queryParams = new URLSearchParams();
      
    if (filters?.date_range?.start) queryParams.append('date_from', filters.date_range.start);
    if (filters?.date_range?.end) queryParams.append('date_to', filters.date_range.end);

    const url = `/analytics/conversion-funnel${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<{
    page_views: number;
    product_views: number;
    cart_additions: number;
    checkout_starts: number;
    orders_completed: number;
    conversion_rates: {
      view_to_cart: number;
      cart_to_checkout: number;
      checkout_to_order: number;
      overall: number;
    };
  }>(url);
  }

  /**
   * Get geographic analytics
   */
  static async getGeographicAnalytics(filters?: AnalyticsFilters): Promise<APIResponse<{
    orders_by_country: Array<{
      country: string;
      orders: number;
      revenue: number;
    }>;
    orders_by_state: Array<{
      state: string;
      country: string;
      orders: number;
      revenue: number;
    }>;
    orders_by_city: Array<{
      city: string;
      state: string;
      country: string;
      orders: number;
      revenue: number;
    }>;
  }>> {
    const queryParams = new URLSearchParams();
      
    if (filters?.date_range?.start) queryParams.append('date_from', filters.date_range.start);
    if (filters?.date_range?.end) queryParams.append('date_to', filters.date_range.end);

    return await apiClient.get<{
    orders_by_country: Array<{
      country: string;
      orders: number;
      revenue: number;
    }>;
    orders_by_state: Array<{
      state: string;
      country: string;
      orders: number;
      revenue: number;
    }>;
    orders_by_city: Array<{
      city: string;
      state: string;
      country: string;
      orders: number;
      revenue: number;
    }>;
  }>(url);
  }

  // Supplier Analytics
  /**
   * Get supplier dashboard data
   */
  static async getSupplierDashboard(filters?: AnalyticsFilters): Promise<APIResponse<{
    total_products: number;
    total_orders: number;
    total_revenue: number;
    pending_orders: number;
    recent_orders: Array<Order>;
    top_products: Array<{
      product_id: string;
      product_name: string;
      orders: number;
      revenue: number;
    }>;
    revenue_trend: Array<{
      date: string;
      revenue: number;
      orders: number;
    }>;
  }>> {
    const queryParams = new URLSearchParams();
      
    if (filters?.date_range?.start) queryParams.append('date_from', filters.date_range.start);
    if (filters?.date_range?.end) queryParams.append('date_to', filters.date_range.end);

    const url = `/analytics/supplier${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<{
    total_products: number;
    total_orders: number;
    total_revenue: number;
    pending_orders: number;
    recent_orders: Array<Order>;
    top_products: Array<{
      product_id: string;
      product_name: string;
      orders: number;
      revenue: number;
    }>;
    revenue_trend: Array<{
      date: string;
      revenue: number;
      orders: number;
    }>;
  }>(url);
  }

  /**
   * Get supplier product performance
   */
  static async getSupplierProductPerformance(filters?: AnalyticsFilters): Promise<APIResponse<{
    products: Array<{
      product_id: string;
      product_name: string;
      total_views: number;
      total_orders: number;
      total_revenue: number;
      conversion_rate: number;
      average_rating: number;
      stock_level: number;
    }>;
  }>> {
    const queryParams = new URLSearchParams();
      
    if (filters?.date_range?.start) queryParams.append('date_from', filters.date_range.start);
    if (filters?.date_range?.end) queryParams.append('date_to', filters.date_range.end);

    const url = `/analytics/supplier/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<{
    products: Array<{
      product_id: string;
      product_name: string;
      total_views: number;
      total_orders: number;
      total_revenue: number;
      conversion_rate: number;
      average_rating: number;
      stock_level: number;
    }>;
  }>(url);
  }

  /**
   * Export analytics data
   */
  static async exportAnalytics(data: {
    type: 'sales' | 'users' | 'products' | 'orders';
    format: 'csv' | 'xlsx' | 'json';
    filters?: AnalyticsFilters;
  }): Promise<void> {
    const queryParams = new URLSearchParams();
      
    queryParams.append('type', data.type);
    queryParams.append('format', data.format);
    
    if (data.filters?.date_range?.start) queryParams.append('date_from', data.filters.date_range.start);
    if (data.filters?.date_range?.end) queryParams.append('date_to', data.filters.date_range.end);
    if (data.filters?.category) queryParams.append('category', data.filters.category);
    if (data.filters?.supplier) queryParams.append('supplier', data.filters.supplier);

    const url = `/analytics/export?${queryParams.toString()}`;
    const filename = `${data.type}-analytics-${new Date().toISOString().split('T')[0]}.${data.format}`;
    
    await apiClient.download<void>(url, filename);
  }

  /**
   * Track custom event
   */
  static async trackEvent(event: {
    name: string;
    properties?: Record<string, unknown>;
    user_id?: string;
    session_id?: string;
  }): Promise<APIResponse<{ message: string }>> {
    return await apiClient.post<APIResponse<{ message: string }>>('/analytics/events', event);
  }

  /**
   * Get performance metrics
   */
  static async getPerformanceMetrics(): Promise<APIResponse<{
    api_response_time: number;
    database_query_time: number;
    cache_hit_rate: number;
    error_rate: number;
    uptime: number;
    active_connections: number;
  }>> {
    return await apiClient.get<{
    api_response_time: number;
    database_query_time: number;
    cache_hit_rate: number;
    error_rate: number;
    uptime: number;
    active_connections: number;
  }>('/analytics/performance');
  }
}

export default AnalyticsAPI;