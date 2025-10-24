/**
 * Admin API endpoints
 */

import { apiClient } from './client';
import { User, Product, Order, AdminStats, PaginatedResponse, APIResponse } from './types';

export class AdminAPI {
  /**
   * Get admin dashboard statistics
   */
  static async getAdminStats(): Promise<APIResponse<AdminStats>> {
    return await apiClient.get<AdminStats>('/admin/stats');
  }

  /**
   * Get platform overview
   */
  static async getPlatformOverview(): Promise<APIResponse<{
    total_users: number;
    total_suppliers: number;
    total_customers: number;
    total_products: number;
    total_orders: number;
    total_revenue: number;
    monthly_growth: {
      users: number;
      orders: number;
      revenue: number;
    };
    recent_activities: Array<{
      id: string;
      type: string;
      description: string;
      timestamp: string;
      user?: string;
    }>;
  }>> {
    return await apiClient.get<{
      total_users: number;
      total_suppliers: number;
      total_customers: number;
      total_products: number;
      total_orders: number;
      total_revenue: number;
      monthly_growth: {
        users: number;
        orders: number;
        revenue: number;
      };
      recent_activities: Array<{
        id: string;
        type: string;
        description: string;
        timestamp: string;
        user?: string;
      }>;
    }>('/admin/overview');
  }

  // User Management
  /**
   * Get all users with filters
   */
  static async getUsers(params?: {
    role?: 'customer' | 'supplier' | 'admin';
    status?: 'active' | 'inactive';
    verified?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<User>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.role) queryParams.append('role', params.role);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.verified !== undefined) queryParams.append('verified', params.verified.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/users${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<User>>(url);
  }

  /**
   * Get user details
   */
  static async getUser(userId: string): Promise<APIResponse<User & {
    orders_count: number;
    total_spent: number;
    last_login: string;
    registration_date: string;
  }>> {
    return await apiClient.get<User & {
      orders_count: number;
      total_spent: number;
      last_login: string;
      registration_date: string;
    }>(`/admin/users/${userId}`);
  }

  /**
   * Update user
   */
  static async updateUser(userId: string, updates: Partial<User>): Promise<APIResponse<User>> {
    return await apiClient.put<User>(`/admin/users/${userId}`, updates);
  }

  /**
   * Activate/Deactivate user
   */
  static async toggleUserStatus(userId: string, active: boolean): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put<{ message: string }>(`/admin/users/${userId}/status`, { active });
  }

  /**
   * Verify user
   */
  static async verifyUser(userId: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put<{ message: string }>(`/admin/users/${userId}/verify`);
  }

  /**
   * Delete user
   */
  static async deleteUser(userId: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.delete<{ message: string }>(`/admin/users/${userId}`);
  }

  /**
   * Get user activity log
   */
  static async getUserActivity(userId: string, params?: {
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<{
    id: string;
    action: string;
    description: string;
    ip_address: string;
    user_agent: string;
    timestamp: string;
  }>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/users/${userId}/activity${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<{
      id: string;
      action: string;
      description: string;
      ip_address: string;
      user_agent: string;
      timestamp: string;
    }>>(url);
  }

  // Product Management
  /**
   * Get all products for admin review
   */
  static async getAllProducts(params?: {
    status?: 'active' | 'inactive' | 'pending';
    category?: string;
    supplier?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<Product>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.supplier) queryParams.append('supplier', params.supplier);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<Product>>(url);
  }

  /**
   * Approve/Reject product
   */
  static async moderateProduct(productId: string, action: 'approve' | 'reject', reason?: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put<{ message: string }>(`/admin/products/${productId}/moderate`, { action, reason });
  }

  /**
   * Feature/Unfeature product
   */
  static async toggleProductFeature(productId: string, featured: boolean): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put<{ message: string }>(`/admin/products/${productId}/feature`, { featured });
  }

  // Order Management
  /**
   * Get all orders for admin oversight
   */
  static async getAllOrders(params?: {
    status?: string;
    q?: string;
    supplier?: string;
    customer?: string;
    date_from?: string;
    date_to?: string;
    min_price?: number;
    max_price?: number;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<Order>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.q) queryParams.append('q', params.q);
    if (params?.supplier) queryParams.append('supplier', params.supplier);
    if (params?.customer) queryParams.append('customer', params.customer);
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);
    if (params?.min_price) queryParams.append('min_price', params.min_price.toString());
    if (params?.max_price) queryParams.append('max_price', params.max_price.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<Order>>(url);
  }

  /**
   * Get all product variants for admin oversight
   */
  static async getAllVariants(params?: {
    product_id?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<ProductVariant>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.product_id) queryParams.append('product_id', params.product_id);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/variants${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<ProductVariant>>(url);
  }

  /**
   * Get order details
   */
  static async getOrder(orderId: string): Promise<APIResponse<Order>> {
    return await apiClient.get<Order>(`/admin/orders/${orderId}`);
  }  /**
   * Get order disputes
   */
  static async getOrderDisputes(params?: {
    status?: 'open' | 'resolved' | 'closed';
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<{
    id: string;
    order_id: string;
    customer: User;
    supplier: User;
    reason: string;
    status: string;
    created_at: string;
    resolved_at?: string;
  }>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/disputes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<{
      id: string;
      order_id: string;
      customer: User;
      supplier: User;
      reason: string;
      status: string;
      created_at: string;
      resolved_at?: string;
    }>>(url);
  }

  /**
   * Get admin messages
   */
  static async getMessages(params?: {
    status?: 'read' | 'unread' | 'archived';
    search?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<AdminMessage>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/messages${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<AdminMessage>>(url);
  }

  /**
   * Resolve order dispute
   */
  static async resolveDispute(disputeId: string, resolution: {
    action: 'refund' | 'replace' | 'dismiss';
    reason: string;
    refund_amount?: number;
  }): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put<{ message: string }>(`/admin/disputes/${disputeId}/resolve`, resolution);
  }

  // System Management
  static async getSalesTrend(days: number): Promise<APIResponse<SalesData[]>> {
    return await apiClient.get<SalesData[]>(`/analytics/sales-trend?days=${days}`);
  }

  /**
   * Get system health
   */
  static async getSystemHealth(): Promise<APIResponse<{
    status: 'healthy' | 'warning' | 'critical';
    database: {
      status: string;
      response_time: number;
      connections: number;
    };
    cache: {
      status: string;
      hit_rate: number;
      memory_usage: number;
    };
    storage: {
      status: string;
      disk_usage: number;
      available_space: number;
    };
    api: {
      response_time: number;
      error_rate: number;
      requests_per_minute: number;
    };
  }>> {
    return await apiClient.get<{
      status: 'healthy' | 'warning' | 'critical';
      database: {
        status: string;
        response_time: number;
        connections: number;
      };
      cache: {
        status: string;
        hit_rate: number;
        memory_usage: number;
      };
      storage: {
        status: string;
        disk_usage: number;
        available_space: number;
      };
      api: {
        response_time: number;
        error_rate: number;
        requests_per_minute: number;
      };
    }>('/admin/system/health');
  }

  /**
   * Get system logs
   */
  static async getSystemLogs(params?: {
    level?: 'info' | 'warning' | 'error' | 'critical';
    service?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<{
    id: string;
    level: string;
    service: string;
    message: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
  }>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.level) queryParams.append('level', params.level);
    if (params?.service) queryParams.append('service', params.service);
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/system/logs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<{
      id: string;
      level: string;
      service: string;
      message: string;
      timestamp: string;
      metadata?: Record<string, unknown>;
    }>>(url);
  }

  /**
   * Get audit logs
   */
  static async getAuditLogs(params?: {
    user_id?: string;
    action?: string;
    resource?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
    limit?: number;
  }): Promise<APIResponse<PaginatedResponse<{
    id: string;
    user_id: string;
    user_email: string;
    action: string;
    resource: string;
    resource_id: string;
    changes?: Record<string, unknown>;
    ip_address: string;
    user_agent: string;
    timestamp: string;
  }>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.user_id) queryParams.append('user_id', params.user_id);
    if (params?.action) queryParams.append('action', params.action);
    if (params?.resource) queryParams.append('resource', params.resource);
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/admin/audit-logs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<{
      id: string;
      user_id: string;
      user_email: string;
      action: string;
      resource: string;
      resource_id: string;
      changes?: Record<string, unknown>;
      ip_address: string;
      user_agent: string;
      timestamp: string;
    }>>(url);
  }

  /**
   * Update system settings
   */
  static async updateSystemSettings(settings: {
    maintenance_mode?: boolean;
    registration_enabled?: boolean;
    max_file_size?: number;
    allowed_file_types?: string[];
    email_notifications?: boolean;
    sms_notifications?: boolean;
  }): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put<{ message: string }>('/admin/system/settings', settings);
  }

  /**
   * Get system settings
   */
  static async getSystemSettings(): Promise<APIResponse<{
    maintenance_mode: boolean;
    registration_enabled: boolean;
    max_file_size: number;
    allowed_file_types: string[];
    email_notifications: boolean;
    sms_notifications: boolean;
  }>> {
    return await apiClient.get<{
      maintenance_mode: boolean;
      registration_enabled: boolean;
      max_file_size: number;
      allowed_file_types: string[];
      email_notifications: boolean;
      sms_notifications: boolean;
    }>('/admin/system/settings');
  }

  /**
   * Export data
   */
  static async exportData(data: {
    type: 'users' | 'products' | 'orders' | 'analytics';
    format: 'csv' | 'xlsx' | 'json';
    filters?: Record<string, string | number | boolean>;
  }): Promise<void> {
    const queryParams = new URLSearchParams();
    
    queryParams.append('type', data.type);
    queryParams.append('format', data.format);
    
    if (data.filters) {
      Object.entries(data.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = `/admin/export?${queryParams.toString()}`;
    const filename = `${data.type}-export-${new Date().toISOString().split('T')[0]}.${data.format}`;
    
    await apiClient.download(url, filename);
  }

  /**
   * Send system notification
   */
  static async sendSystemNotification(notification: {
    type: 'info' | 'warning' | 'error';
    title: string;
    message: string;
    target: 'all' | 'customers' | 'suppliers' | 'admins';
    user_ids?: string[];
  }): Promise<APIResponse<{ message: string; sent_count: number }>> {
    return await apiClient.post<{ message: string; sent_count: number }>('/admin/notifications/send', notification);
  }
}

export default AdminAPI;