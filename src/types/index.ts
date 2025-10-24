// Base types
export interface BaseEntity {
  id: number | string;
  created_at: string;
  updated_at?: string;
}

// User types - Mirrors backend User model exactly
export interface User extends BaseEntity {
  email: string;
  firstname: string;
  lastname: string;
  full_name?: string; // Computed property from backend
  role: 'Customer' | 'Supplier' | 'Admin';
  verified: boolean;
  active: boolean;
  phone?: string;
  avatar_url?: string;
  last_login?: string; // Add last_login field
  orders_count?: number; // Add orders_count field
  // Relationships (loaded when needed)
  addresses?: Address[];
  orders?: Order[];
  reviews?: Review[];
  wishlists?: Wishlist[];
  blog_posts?: BlogPost[];
  subscriptions?: Subscription[];
  payment_methods?: PaymentMethod[];
  transactions?: Transaction[];
  supplied_products?: Product[];
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    // Add other preferences here as needed
  };
}

export interface Address extends BaseEntity {
  user_id: number;
  street: string;
  city: string;
  state: string;
  country: string;
  post_code: string;
  kind: 'Shipping' | 'Billing';
  is_default: boolean;
  // Relationships
  user?: User;
}

// Product types - Mirror backend models exactly
export interface Category extends BaseEntity {
  name: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  // Relationships
  products?: Product[];
}

export interface Product extends BaseEntity {
  name: string;
  description?: string;
  category_id: number;
  supplier_id: number;
  featured: boolean;
  rating: number;
  review_count: number;
  origin?: string;
  dietary_tags?: string[];
  is_active: boolean;
  // Computed properties from backend
  price_range?: {
    min: number;
    max: number;
  };
  in_stock?: boolean;
  primary_variant?: ProductVariant;
  // Relationships
  category?: Category;
  supplier?: User;
  variants?: ProductVariant[];
  reviews?: Review[];
  wishlist_items?: WishlistItem[];
}

export interface ProductVariant extends BaseEntity {
  product_id: number;
  sku: string;
  name: string;
  base_price: number;
  sale_price?: number;
  stock: number;
  attributes?: Record<string, unknown>;
  is_active: boolean;
  // Computed properties from backend
  current_price?: number;
  discount_percentage?: number;
  primary_image?: ProductImage;
  // Product information (when included in API response)
  product_name?: string;
  product_description?: string;
  // Relationships
  product?: Product;
  images?: ProductImage[];
  cart_items?: CartItem[];
  order_items?: OrderItem[];
}

export interface AdminMessage extends BaseEntity {
  sender_id?: number;
  sender_email?: string;
  subject: string;
  message: string;
  read: boolean;
  archived: boolean;
  // Relationships
  sender?: User;
}

export interface ProductImage extends BaseEntity {
  variant_id: number;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
  format?: string;
  // Relationships
  variant?: ProductVariant;
}

// Cart types - Mirror backend models exactly
export interface Cart extends BaseEntity {
  user_id: number;
  session_id?: string;
  // Relationships
  items?: CartItem[];
  // Computed properties (from serializer)
  total_items?: number;
  total_amount?: number;
}

export interface CartItem extends BaseEntity {
  cart_id: number;
  variant_id: number;
  quantity: number;
  price_per_unit: number;
  // Computed properties
  total_price?: number;
  // Relationships
  cart?: Cart;
  variant?: ProductVariant;
}

// Order types - Mirror backend models exactly
export interface Order extends BaseEntity {
  id: string; // UUID in backend
  user_id: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address_id?: number;
  shipping_method_id?: number;
  payment_method_id?: number;
  promocode_id?: number;
  carrier_name?: string;
  tracking_number?: string;
  notes?: string;
  // Relationships
  user?: User;
  items?: OrderItem[];
  tracking_events?: TrackingEvent[];
  transactions?: Transaction[];
}

export interface OrderItem extends BaseEntity {
  order_id: string; // UUID
  variant_id: number;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  // Relationships
  order?: Order;
  variant?: ProductVariant;
}

export interface TrackingEvent extends BaseEntity {
  order_id: string; // UUID
  status: string;
  description?: string;
  location?: string;
  timestamp: string;
  // Relationships
  order?: Order;
}

// Payment types - Mirror backend models exactly
export interface PaymentMethod extends BaseEntity {
  user_id: number;
  type: 'card' | 'bank_account' | 'mobile_money';
  provider: string;
  last_four?: string;
  expiry_month?: number;
  expiry_year?: number;
  brand?: string;
  is_default: boolean;
  is_active: boolean;
  meta_data?: string; // JSON string in backend
  // Relationships
  user?: User;
}

export interface Transaction extends BaseEntity {
  user_id: number;
  order_id?: string; // UUID
  stripe_payment_intent_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  transaction_type: 'payment' | 'refund' | 'payout';
  description?: string;
  meta_data?: string; // JSON string in backend
  // Relationships
  user?: User;
  order?: Order;
}

// Shipping types
export interface ShippingMethod extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  estimated_days: number;
  is_active: boolean;
}

// Promocode types
export interface Promocode extends BaseEntity {
  code: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  value: number;
  minimum_order_amount?: number;
  maximum_discount_amount?: number;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
  valid_from?: string;
  valid_until?: string;
}

// Review types - Mirror backend models exactly
export interface Review extends BaseEntity {
  id: string; // UUID in backend
  product_id: number;
  user_id: number;
  rating: number;
  comment?: string;
  is_verified_purchase: boolean;
  is_approved: boolean;
  // Relationships
  product?: Product;
  user?: User;
}

// Wishlist types - Mirror backend models exactly
export interface Wishlist extends BaseEntity {
  user_id: number;
  name: string;
  is_default: boolean;
  is_public: boolean;
  // Relationships
  user?: User;
  items?: WishlistItem[];
}

export interface WishlistItem extends BaseEntity {
  wishlist_id: number;
  product_id: number;
  quantity: number;
  // Relationships
  wishlist?: Wishlist;
  product?: Product;
}

// Blog types - Mirror backend models exactly
export interface BlogPost extends BaseEntity {
  id: string; // UUID in backend
  title: string;
  content: string;
  excerpt?: string;
  author_id: number;
  tags?: string[];
  image_url?: string;
  is_published: boolean;
  published_at?: string;
  // Relationships
  author?: User;
}

// Subscription types - Mirror backend models exactly
export interface Subscription extends BaseEntity {
  id: string; // UUID in backend
  user_id: number;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'paused';
  price?: number;
  currency: string;
  billing_cycle: 'monthly' | 'yearly';
  auto_renew: boolean;
  current_period_start?: string;
  current_period_end?: string;
  cancelled_at?: string;
  // Relationships
  user?: User;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone?: string;
}

export interface AddressForm {
  street: string;
  city: string;
  state: string;
  country: string;
  post_code: string;
  kind: 'Shipping' | 'Billing';
  is_default: boolean;
}

export interface ProductForm {
  name: string;
  description?: string;
  category_id: number;
  featured: boolean;
  origin?: string;
  dietary_tags?: string[];
}

export interface VariantForm {
  sku: string;
  name: string;
  base_price: number;
  sale_price?: number;
  stock: number;
  attributes?: Record<string, unknown>;
}

// Filter and search types
export interface ProductFilters {
  // Search and filtering
  q?: string; // Search query
  search?: string; // Alternative search field
  category?: string; // Category name
  category_id?: number; // Category ID
  min_price?: number;
  max_price?: number;
  rating?: number;
  dietary_tags?: string[];
  origin?: string;
  featured?: boolean;
  availability?: boolean;
  
  // Sorting and pagination
  sort_by?: 'name' | 'price' | 'created_at' | 'rating';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface OrderFilters {
  status?: string;
  date_from?: string;
  date_to?: string;
}

export interface SystemSettings extends BaseEntity {
  maintenance_mode: boolean;
  registration_enabled: boolean;
  max_file_size: number;
  allowed_file_types: string;
  email_notifications: boolean;
  sms_notifications: boolean;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}