/**
 * TypeScript types for API responses and data models
 */

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface APIError {
  error: boolean;
  message: string;
  details?: any;
  timestamp?: string;
  path?: string;
  status?: number;
}

// Base types
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// User types
export type UserRole = 'Guest' | 'Customer' | 'Supplier' | 'Admin' | 'Moderator' | 'Support' | 'Manager' | 'SuperAdmin' | 'GodAdmin';
export type UserGender = 'Male' | 'Female';

export interface User extends BaseEntity {
  email: string;
  firstname: string;
  lastname: string;
  phone?: string;
  role: UserRole;
  verified: boolean;
  active: boolean;
  picture?: string;
  age?: number;
  gender?: UserGender;
  preferences?: Record<string, unknown>;
  language: string;
  country?: string;
  timezone?: string;
  supplier_info?: SupplierInfo;
  social_accounts?: SocialAccount[];
  addresses?: Address[];
}

export interface SupplierInfo extends BaseEntity {
  user_id: string;
  company_name?: string;
  business_registration?: string;
  tax_id?: string;
  description?: string;
  website?: string;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
  rating: number;
  review_count: number;
  total_products: number;
  response_time_hours?: number;
  verified: boolean;
  active: boolean;
  join_date: string;
}

export interface SocialAccount extends BaseEntity {
  user_id: string;
  provider: string;
  provider_id: string;
  email?: string;
  name?: string;
  picture?: string;
  access_token?: string;
  refresh_token?: string;
  expires_at?: string;
}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  user: User;
}

// Product types
export interface Product extends BaseEntity {
  name: string;
  description: string;
  category: Category;
  supplier: User;
  variants: ProductVariant[];
  tags: Tag[];
  rating?: number;
  review_count?: number;
  origin?: string;
  dietary_tags?: string[];
  search_keywords?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  slug?: string;
}

export interface ProductVariant extends BaseEntity {
  product_id: string;
  sku: string;
  name: string;
  base_price: number;
  sale_price?: number;
  stock: number;
  attributes: Record<string, unknown>;
  images: ProductImage[];
  qr_code?: string;
  barcode?: string;
}

export interface ProductImage extends BaseEntity {
  variant_id: string;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
  github_url?: string;
  file_size?: number;
  format: string;
}

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  slug?: string;
  count?: number; // Number of products in this category
}

export interface Tag extends BaseEntity {
  name: string;
  color?: string;
}

// Order types
export interface Order extends BaseEntity {
  user_id: string;
  status: string;
  total_amount: number;
  currency: string;
  tracking_number?: string;
  estimated_delivery?: string;
  items: OrderItem[];
  tracking_events: TrackingEvent[];
  notes: OrderNote[];
}

export interface OrderItem extends BaseEntity {
  order_id: string;
  product_id: string;
  quantity: number;
  price_per_unit: number;
  total_price: number;
}

export interface TrackingEvent extends BaseEntity {
  order_id: string;
  status: string;
  location?: string;
  coordinates?: string;
  timestamp: string;
  carrier?: string;
  description?: string;
  updated_by: string;
}

export interface OrderNote extends BaseEntity {
  order_id: string;
  user_id: string;
  note: string;
  attachments?: string[];
  created_at: string;
}


export interface CreateOrderRequest {
  items: Array<{
    variant_id: string;
    quantity: number;
  }>;
  shipping_address: Omit<Address, 'id' | 'created_at' | 'updated_at'>;
  billing_address?: Omit<Address, 'id' | 'created_at' | 'updated_at'>;
  payment_method: string;
  notes?: string;
}

// Cart types
export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  currency: string;
}

export interface CartItem extends BaseEntity {
  variant: ProductVariant;
  quantity: number;
  price_per_unit: number;
  total_price: number;
}

export interface AddToCartRequest {
  variant_id: string;
  quantity: number;
}

// Address types
export interface Address extends BaseEntity {
  user_id: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  post_code?: string;
  kind: 'Billing' | 'Shipping';
}

// Analytics types
export interface DashboardData {
  total_sales: number;
  total_orders: number;
  total_users: number;
  total_products: number;
  conversion_rate: number;
  average_order_value: number;
  top_products: TopProduct[];
  sales_trend: SalesTrendPoint[];
  order_status_distribution: OrderStatusCount[];
  user_growth: UserGrowthPoint[];
}

export interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  image_url?: string;
}

export interface SalesTrendPoint {
  date: string;
  sales: number;
  orders: number;
}

export interface OrderStatusCount {
  status: string;
  count: number;
}

export interface UserGrowthPoint {
  date: string;
  new_users: number;
  total_users: number;
}

export interface AnalyticsFilters {
  date_range?: {
    start: string;
    end: string;
  };
  category?: string;
  supplier?: string;
  status?: string;
}

// Notification types
export interface Notification extends BaseEntity {
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  read_at?: string;
}

export type NotificationType = 
  | 'order_update' 
  | 'payment_success' 
  | 'payment_failed' 
  | 'product_update' 
  | 'promotion' 
  | 'system';

// Search and pagination types
export interface SearchParams {
  q?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  availability?: boolean;
  sort_by?: 'name' | 'price' | 'created_at' | 'rating';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Export types
export interface ExportRequest {
  format: 'csv' | 'json' | 'xlsx';
  data_types: string[];
  date_range?: {
    start: string;
    end: string;
  };
  filters?: Record<string, unknown>;
}

export interface ExportResponse {
  export_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  download_url?: string;
  created_at: string;
  expires_at: string;
}

// Currency types
export interface Currency extends BaseEntity {
  code: string;
  name: string;
  symbol: string;
  is_default: boolean;
  exchange_rate?: number;
}

// Payment types
export interface PaymentMethod extends BaseEntity {
  user_id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';
  provider: string;
  last_four?: string;
  expiry_month?: number;
  expiry_year?: number;
  is_default: boolean;
}

// Promocode types
export interface Promocode extends BaseEntity {
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: number;
  minimum_order_amount?: number;
  maximum_discount_amount?: number;
  usage_limit?: number;
  usage_count: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
}

// Inventory types
export interface InventoryItem extends BaseEntity {
  variant_id: string;
  variant: ProductVariant;
  stock: number;
  reserved_stock: number;
  available_stock: number;
  reorder_level: number;
  reorder_quantity: number;
  last_restocked?: string;
}

// Admin types
export interface AdminStats {
  total_users: number;
  total_suppliers: number;
  total_customers: number;
  total_products: number;
  total_orders: number;
  total_revenue: number;
  pending_orders: number;
  low_stock_items: number;
}

export interface BlogPost extends BaseEntity {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  slug: string;
}

export interface UserManagement {
  users: User[];
  total: number;
  filters: {
    role?: string;
    status?: string;
    verified?: boolean;
  };
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface APIErrorResponse {
  error: boolean;
  message: string;
  details?: ValidationError[] | Record<string, unknown>;
  timestamp: string;
  path: string;
}