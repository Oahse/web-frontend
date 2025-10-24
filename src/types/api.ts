// API-specific types that extend the base types
import {
  User, Product, ProductVariant, Category, Order, CartItem,
  Review, Wishlist, BlogPost, Subscription, PaymentMethod,
  ShippingMethod, Promocode, Transaction, Address
} from './index';

// Request/Response types for API endpoints

// Auth
export interface AuthResponse {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  expires_in: number;
  user: User;
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
}

// Products
export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ProductDetailResponse extends Product {
  variants: ProductVariant[];
  reviews: Review[];
  related_products: Product[];
}

// Categories
export interface CategoryListResponse {
  categories: Category[];
}

// Cart
export interface CartResponse {
  items: CartItem[];
  total_items: number;
  total_amount: number;
}

export interface AddToCartRequest {
  variant_id: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Orders
export interface CreateOrderRequest {
  shipping_address_id: number;
  shipping_method_id: number;
  payment_method_id: number;
  promocode?: string;
  notes?: string;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Reviews
export interface CreateReviewRequest {
  product_id: number;
  rating: number;
  comment?: string;
}

export interface ReviewListResponse {
  reviews: Review[];
  total: number;
  average_rating: number;
}

// Wishlist
export interface WishlistResponse {
  wishlists: Wishlist[];
}

export interface AddToWishlistRequest {
  product_id: number;
  wishlist_id?: number;
}

// Blog
export interface BlogPostListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// User Profile
export interface UpdateProfileRequest {
  firstname?: string;
  lastname?: string;
  phone?: string;
  avatar_url?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

// Payment
export interface PaymentMethodListResponse {
  payment_methods: PaymentMethod[];
}

export interface CreatePaymentMethodRequest {
  type: 'card' | 'bank_account' | 'mobile_money';
  provider: string;
  token: string; // From payment provider
}

// Shipping
export interface ShippingMethodListResponse {
  shipping_methods: ShippingMethod[];
}

// Admin types
export interface AdminDashboardStats {
  total_users: number;
  total_orders: number;
  total_products: number;
  total_revenue: number;
  recent_orders: Order[];
  top_products: Product[];
}

export interface PlatformOverviewResponse {
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
}

export interface AdminUserListResponse {
  users: User[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Supplier types
export interface SupplierDashboardStats {
  total_products: number;
  total_orders: number;
  total_revenue: number;
  pending_orders: Order[];
  low_stock_products: ProductVariant[];
}

// Search
export interface SearchResponse {
  products: Product[];
  categories: Category[];
  total_results: number;
  query: string;
}

// Analytics
export interface AnalyticsData {
  period: string;
  revenue: number[];
  orders: number[];
  users: number[];
  labels: string[];
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

// Notifications
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface NotificationListResponse {
  notifications: Notification[];
  unread_count: number;
}

// File upload
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}

// Pagination params
export interface PaginationParams {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  errors?: Record<string, string[]>;
}

// Error response
export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
  success: false;
}
