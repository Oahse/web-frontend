// Re-export types from the main types files
export * from '../types';
export * from '../types/api';

// Additional model utilities
export interface ModelWithTimestamps {
  created_at: string;
  updated_at?: string;
}

export interface ModelWithId {
  id: number | string;
}

export type BaseModel = ModelWithId & ModelWithTimestamps;

// Utility types for forms
export type CreateModel<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
export type UpdateModel<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;

// Common status types
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'cancelled';
export type UserRole = 'Customer' | 'Supplier' | 'Admin';
export type AddressType = 'Shipping' | 'Billing';
export type DiscountType = 'percentage' | 'fixed';
export type TransactionType = 'payment' | 'refund' | 'payout';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'paused';
export type BillingCycle = 'monthly' | 'yearly';

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const isValidPostalCode = (code: string): boolean => {
  // Basic validation - can be enhanced based on country
  return code.length >= 3 && code.length <= 10;
};