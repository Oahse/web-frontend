/**
 * Orders API endpoints
 */

import { apiClient } from './client';
import { 
  Order, 
  CreateOrderRequest, 
  OrderStatus,
  PaginatedResponse,
  APIResponse 
} from './types';

export class OrdersAPI {
  /**
   * Create new order
   */
  static async createOrder(orderData: CreateOrderRequest): Promise<APIResponse<Order>> {
    return await apiClient.post<Order>('/orders', orderData);
  }

  /**
   * Get user's orders
   */
  static async getOrders(params?: {
    status?: OrderStatus;
    page?: number;
    limit?: number;
    date_from?: string;
    date_to?: string;
  }): Promise<APIResponse<PaginatedResponse<Order>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);

    const url = `/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<Order>>(url);
  }

  /**
   * Get order by ID
   */
  static async getOrder(orderId: string): Promise<APIResponse<Order>> {
    return await apiClient.get<Order>(`/orders/${orderId}`);
  }

  /**
   * Get order tracking information
   */
  static async getOrderTracking(orderId: string): Promise<APIResponse<{
    order_id: string;
    status: OrderStatus;
    tracking_number?: string;
    carrier?: string;
    tracking_url?: string;
    estimated_delivery?: string;
    tracking_events: Array<{
      status: string;
      description: string;
      location?: string;
      timestamp: string;
    }>;
  }>> {
    return await apiClient.get(`/orders/${orderId}/tracking`);
  }

  /**
   * Cancel order
   */
  static async cancelOrder(orderId: string, reason?: string): Promise<APIResponse<Order>> {
    return await apiClient.put<Order>(`/orders/${orderId}/cancel`, { reason });
  }

  /**
   * Request order refund
   */
  static async requestRefund(orderId: string, data: {
    reason: string;
    items?: Array<{
      item_id: string;
      quantity: number;
      reason: string;
    }>;
  }): Promise<APIResponse<{ message: string; refund_id: string }>> {
    return await apiClient.post(`/orders/${orderId}/refund`, data);
  }

  /**
   * Get order invoice
   */
  static async getOrderInvoice(orderId: string): Promise<void> {
    await apiClient.download(`/orders/${orderId}/invoice`, `invoice-${orderId}.pdf`);
  }

  /**
   * Reorder (create new order from existing order)
   */
  static async reorder(orderId: string): Promise<APIResponse<Order>> {
    return await apiClient.post<Order>(`/orders/${orderId}/reorder`);
  }

  /**
   * Add order note
   */
  static async addOrderNote(orderId: string, note: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.post(`/orders/${orderId}/notes`, { note });
  }

  /**
   * Get order notes
   */
  static async getOrderNotes(orderId: string): Promise<APIResponse<Array<{
    id: string;
    note: string;
    created_by: string;
    created_at: string;
  }>>> {
    return await apiClient.get(`/orders/${orderId}/notes`);
  }

  // Supplier endpoints
  /**
   * Get supplier orders (Supplier only)
   */
  static async getSupplierOrders(params?: {
    status?: OrderStatus;
    page?: number;
    limit?: number;
    date_from?: string;
    date_to?: string;
  }): Promise<APIResponse<PaginatedResponse<Order>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);

    const url = `/suppliers/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<Order>>(url);
  }

  /**
   * Update order status (Supplier/Admin only)
   */
  static async updateOrderStatus(orderId: string, data: {
    status: OrderStatus;
    tracking_number?: string;
    carrier?: string;
    notes?: string;
  }): Promise<APIResponse<Order>> {
    return await apiClient.put<Order>(`/orders/${orderId}/status`, data);
  }

  /**
   * Mark order as shipped (Supplier only)
   */
  static async markAsShipped(orderId: string, data: {
    tracking_number: string;
    carrier: string;
    estimated_delivery?: string;
    notes?: string;
  }): Promise<APIResponse<Order>> {
    return await apiClient.put<Order>(`/orders/${orderId}/ship`, data);
  }

  /**
   * Mark order as delivered (Supplier only)
   */
  static async markAsDelivered(orderId: string, data?: {
    delivery_date?: string;
    notes?: string;
  }): Promise<APIResponse<Order>> {
    return await apiClient.put<Order>(`/orders/${orderId}/deliver`, data || {});
  }

  /**
   * Process refund (Supplier/Admin only)
   */
  static async processRefund(refundId: string, data: {
    status: 'approved' | 'rejected';
    reason?: string;
    refund_amount?: number;
  }): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put(`/refunds/${refundId}/process`, data);
  }

  // Admin endpoints
  /**
   * Get all orders (Admin only)
   */
  static async getAllOrders(params?: {
    status?: OrderStatus;
    supplier_id?: string;
    customer_id?: string;
    page?: number;
    limit?: number;
    date_from?: string;
    date_to?: string;
  }): Promise<APIResponse<PaginatedResponse<Order>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.supplier_id) queryParams.append('supplier_id', params.supplier_id);
    if (params?.customer_id) queryParams.append('customer_id', params.customer_id);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);

    const url = `/admin/orders${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<PaginatedResponse<Order>>(url);
  }

  /**
   * Get order statistics (Admin only)
   */
  static async getOrderStatistics(params?: {
    date_from?: string;
    date_to?: string;
    group_by?: 'day' | 'week' | 'month';
  }): Promise<APIResponse<{
    total_orders: number;
    total_revenue: number;
    average_order_value: number;
    orders_by_status: Record<OrderStatus, number>;
    revenue_trend: Array<{
      date: string;
      orders: number;
      revenue: number;
    }>;
  }>> {
    const queryParams = new URLSearchParams();
    
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);
    if (params?.group_by) queryParams.append('group_by', params.group_by);

    const url = `/admin/orders/statistics${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get(url);
  }

  /**
   * Export orders (Admin only)
   */
  static async exportOrders(params?: {
    format: 'csv' | 'xlsx';
    status?: OrderStatus;
    date_from?: string;
    date_to?: string;
  }): Promise<void> {
    const queryParams = new URLSearchParams();
    
    if (params?.format) queryParams.append('format', params.format);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.date_from) queryParams.append('date_from', params.date_from);
    if (params?.date_to) queryParams.append('date_to', params.date_to);

    const url = `/admin/orders/export${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const filename = `orders-export-${new Date().toISOString().split('T')[0]}.${params?.format || 'csv'}`;
    
    await apiClient.download(url, filename);
  }
}

export default OrdersAPI;