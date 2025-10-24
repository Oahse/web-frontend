import { apiClient, APIResponse } from './client';
import { PaymentMethod } from './types';

export class PaymentsAPI {
  static async getPaymentMethods(): Promise<APIResponse<PaymentMethod[]>> {
    return await apiClient.get<PaymentMethod[]>('/users/me/payment-methods');
  }

  static async addPaymentMethod(data: Omit<PaymentMethod, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<APIResponse<PaymentMethod>> {
    return await apiClient.post<PaymentMethod>('/users/payment-methods', data);
  }

  static async updatePaymentMethod(paymentMethodId: string, data: Partial<Omit<PaymentMethod, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<APIResponse<PaymentMethod>> {
    return await apiClient.put<PaymentMethod>(`/users/payment-methods/${paymentMethodId}`, data);
  }

  static async deletePaymentMethod(paymentMethodId: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.delete(`/users/payment-methods/${paymentMethodId}`);
  }

  static async setDefaultPaymentMethod(paymentMethodId: string): Promise<APIResponse<{ message: string }>> {
    return await apiClient.put(`/users/payment-methods/${paymentMethodId}/default`);
  }
}

export default PaymentsAPI;
