import { apiClient, APIResponse } from './client';
import { Notification } from './types';

export class NotificationsAPI {
  static async getNotifications(params?: { limit?: number; unread?: boolean }): Promise<APIResponse<Notification[]>> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.unread) queryParams.append('unread', params.unread.toString());
    const url = `/notifications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiClient.get<Notification[]>(url);
  }

  static async markAsRead(notificationId: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put(`/notifications/${notificationId}/read`);
  }

  static async markAllAsRead(): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put('/notifications/read-all');
  }
}

export default NotificationsAPI;
