import { apiClient } from './client';
import { APIResponse, PaginatedResponse } from './types';

interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  start_date: string;
  end_date?: string;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
}

interface SubscriptionCreate {
  plan_id: string;
  status: string;
  end_date?: string;
  auto_renew?: boolean;
}

interface SubscriptionUpdate {
  plan_id?: string;
  status?: string;
  end_date?: string;
  auto_renew?: boolean;
}

class SubscriptionAPI {
  async createSubscription(data: SubscriptionCreate): Promise<APIResponse<Subscription>> {
    return apiClient.post<Subscription>('/subscriptions/', data);
  }

  async getUserSubscriptions(page: number = 1, limit: number = 10): Promise<APIResponse<PaginatedResponse<Subscription>>> {
    return apiClient.get<PaginatedResponse<Subscription>>(`/subscriptions/?page=${page}&limit=${limit}`);
  }

  async getSubscription(subscriptionId: string): Promise<APIResponse<Subscription>> {
    return apiClient.get<Subscription>(`/subscriptions/${subscriptionId}`);
  }

  async updateSubscription(subscriptionId: string, data: SubscriptionUpdate): Promise<APIResponse<Subscription>> {
    return apiClient.put<Subscription>(`/subscriptions/${subscriptionId}`, data);
  }

  async deleteSubscription(subscriptionId: string): Promise<APIResponse<null>> {
    return apiClient.delete<null>(`/subscriptions/${subscriptionId}`);
  }
}

export default new SubscriptionAPI();
