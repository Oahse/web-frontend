import { Order, BlogPost, Address, PaymentMethod } from '../types';
import { Notification, AdminDashboardStats } from '../types/api';

// Create a type alias for backward compatibility
type DashboardData = AdminDashboardStats;

export const mockOrders: Order[] = [{
  id: 'ORD123456',
  created_at: '2023-09-15',
  updated_at: '2023-09-15',
  user_id: 1,
  status: 'delivered',
  total_amount: 129.99,
  items: [{
    id: 'ITEM1',
    created_at: '2023-09-15',
    updated_at: '2023-09-15',
    order_id: 'ORD123456',
    variant_id: 1,
    quantity: 1,
    price_per_unit: 79.99,
    total_price: 79.99,
  }, {
    id: 'ITEM2',
    created_at: '2023-09-15',
    updated_at: '2023-09-15',
    order_id: 'ORD123456',
    variant_id: 2,
    quantity: 2,
    price_per_unit: 12.99,
    total_price: 25.98,
  }],
  tracking_events: [],
  transactions: []
}, {
  id: 'ORD123455',
  created_at: '2023-09-10',
  updated_at: '2023-09-10',
  user_id: 1,
  status: 'shipped',
  total_amount: 79.5,
  items: [{
    id: 'ITEM3',
    created_at: '2023-09-10',
    updated_at: '2023-09-10',
    order_id: 'ORD123455',
    variant_id: 3,
    quantity: 1,
    price_per_unit: 79.5,
    total_price: 79.5,
  }],
  tracking_events: [],
  transactions: []
}, {
  id: 'ORD123454',
  created_at: '2023-08-28',
  updated_at: '2023-08-28',
  user_id: 1,
  status: 'pending',
  total_amount: 49.99,
  items: [{
    id: 'ITEM4',
    created_at: '2023-08-28',
    updated_at: '2023-08-28',
    order_id: 'ORD123454',
    variant_id: 4,
    quantity: 1,
    price_per_unit: 49.99,
    total_price: 49.99,
  }],
  tracking_events: [],
  transactions: []
}];
export const mockOrderManagementOrders: Order[] = [
  {
    id: 'order-550e8400-e29b-41d4-a716-446655440301',
    user_id: 1,
    status: 'pending',
    total_amount: 299.99,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item-550e8400-e29b-41d4-a716-446655440501',
        order_id: 'order-550e8400-e29b-41d4-a716-446655440301',
        variant_id: 1,
        quantity: 2,
        price_per_unit: 149.99,
        total_price: 299.98,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    transactions: []
  },
  {
    id: 'order-550e8400-e29b-41d4-a716-446655440302',
    user_id: 2,
    status: 'confirmed',
    total_amount: 149.99,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 'item-550e8400-e29b-41d4-a716-446655440502',
        order_id: 'order-550e8400-e29b-41d4-a716-446655440302',
        variant_id: 2,
        quantity: 1,
        price_per_unit: 149.99,
        total_price: 149.99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    transactions: []
  },
  {
    id: 'order-550e8400-e29b-41d4-a716-446655440303',
    user_id: 3,
    status: 'shipped',
    total_amount: 599.99,
    tracking_number: 'TRK123456789',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 'item-550e8400-e29b-41d4-a716-446655440503',
        order_id: 'order-550e8400-e29b-41d4-a716-446655440303',
        variant_id: 3,
        quantity: 1,
        price_per_unit: 599.99,
        total_price: 599.99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    transactions: []
  }
];

export const mockBlogPosts: BlogPost[] = [{
  id: 'blog-550e8400-e29b-41d4-a716-446655440701',
  title: 'The Benefits of Shea Butter for Skin and Hair',
  excerpt: 'Discover the amazing properties of raw, unrefined shea butter from West Africa and how it can transform your beauty routine.',
  content: '',
  image_url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  created_at: '2023-08-15',
  updated_at: '2023-08-15',
  author_id: 1,
  tags: ['Skincare', 'Natural', 'Beauty'],
  is_published: true,
  published_at: '2023-08-15'
}, {
  id: 'blog-550e8400-e29b-41d4-a716-446655440702',
  title: 'Sustainable Farming Practices in Ghana',
  excerpt: 'Learn about how our partner farms in Ghana are implementing sustainable farming practices to protect the environment.',
  content: '',
  image_url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  created_at: '2023-07-28',
  updated_at: '2023-07-28',
  author_id: 2,
  tags: ['Farming', 'Sustainability', 'Organic'],
  is_published: true,
  published_at: '2023-07-28'
}, {
  id: 'blog-550e8400-e29b-41d4-a716-446655440703',
  title: 'Moringa: The Miracle Tree of Africa',
  excerpt: 'Explore the nutritional benefits of moringa, known as the "miracle tree," and its potential to combat malnutrition.',
  content: '',
  image_url: 'https://images.unsplash.com/photo-1515362655824-9a74989f318e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  created_at: '2023-07-10',
  updated_at: '2023-07-10',
  author_id: 3,
  tags: ['Nutrition', 'Superfoods'],
  is_published: true,
  published_at: '2023-07-10'
}];

export const mockAdminDashboardData: DashboardData = {
  total_users: 2420,
  total_orders: 356,
  total_products: 120,
  total_revenue: 12628,
  recent_orders: [],
  top_products: [
    {
      id: 'top-prod-550e8400-e29b-41d4-a716-446655440801',
      name: 'Organic Shea Butter',
      description: 'Premium organic shea butter',
      category_id: 1,
      supplier_id: 1,
      featured: true,
      rating: 4.8,
      review_count: 142,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'top-prod-550e8400-e29b-41d4-a716-446655440802',
      name: 'Premium Arabica Coffee',
      description: 'Premium coffee from Africa',
      category_id: 2,
      supplier_id: 2,
      featured: true,
      rating: 4.9,
      review_count: 98,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'top-prod-550e8400-e29b-41d4-a716-446655440803',
      name: 'Organic Quinoa',
      description: 'High-quality organic quinoa',
      category_id: 3,
      supplier_id: 3,
      featured: true,
      rating: 4.7,
      review_count: 76,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ]
};

export const mockAddresses: Address[] = [{
  id: 'addr-550e8400-e29b-41d4-a716-446655440901',
  user_id: 1,
  street: '123 Main Street',
  city: 'New York',
  state: 'NY',
  post_code: '10001',
  country: 'United States',
  kind: 'Shipping',
  is_default: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}, {
  id: 'addr-550e8400-e29b-41d4-a716-446655440902',
  user_id: 1,
  street: '456 Business Ave',
  city: 'San Francisco',
  state: 'CA',
  post_code: '94105',
  country: 'United States',
  kind: 'Billing',
  is_default: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}];

export const mockPaymentMethods: PaymentMethod[] = [{
  id: 'pm-550e8400-e29b-41d4-a716-446655441001',
  user_id: 1,
  type: 'card',
  provider: 'visa',
  last_four: '4242',
  expiry_month: 12,
  expiry_year: 2025,
  is_default: true,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}, {
  id: 'pm-550e8400-e29b-41d4-a716-446655441002',
  user_id: 1,
  type: 'card',
  provider: 'mastercard',
  last_four: '5555',
  expiry_month: 8,
  expiry_year: 2024,
  is_default: false,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}];

export const mockRecentOrders: Order[] = [{
  id: 'ORD123456',
  created_at: '2023-09-15',
  updated_at: '2023-09-15',
  user_id: 1,
  status: 'delivered',
  total_amount: 129.99,
  items: [],
  tracking_events: [],
  transactions: []
}, {
  id: 'ORD123455',
  created_at: '2023-09-10',
  updated_at: '2023-09-10',
  user_id: 1,
  status: 'shipped',
  total_amount: 79.5,
  items: [],
  tracking_events: [],
  transactions: []
}];

export const mockSupplierOrders: Order[] = [
  {
    id: 'supplier-order-550e8400-e29b-41d4-a716-446655441101',
    user_id: 1,
    status: 'pending',
    total_amount: 299.99,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'supplier-item-550e8400-e29b-41d4-a716-446655441201',
        order_id: 'supplier-order-550e8400-e29b-41d4-a716-446655441101',
        variant_id: 1,
        quantity: 2,
        price_per_unit: 149.99,
        total_price: 299.98,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    transactions: []
  },
  {
    id: 'supplier-order-550e8400-e29b-41d4-a716-446655441102',
    user_id: 2,
    status: 'confirmed',
    total_amount: 149.99,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 'supplier-item-550e8400-e29b-41d4-a716-446655441202',
        order_id: 'supplier-order-550e8400-e29b-41d4-a716-446655441102',
        variant_id: 2,
        quantity: 1,
        price_per_unit: 149.99,
        total_price: 149.99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    transactions: []
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-550e8400-e29b-41d4-a716-446655441301',
    type: 'info',
    title: 'New Order Received',
    message: 'You have received a new order #12345 worth $299.99',
    read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'notif-550e8400-e29b-41d4-a716-446655441302',
    type: 'warning',
    title: 'Urgent: Order Requires Attention',
    message: 'Order #12344 has been pending for 24 hours and requires immediate processing',
    read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const mockRecentSearches: string[] = ['Organic quinoa', 'Moringa powder', 'Shea butter', 'African coffee'];

export const mockPopularCategories: { name: string; path: string; }[] = [
  {
    name: 'Spices',
    path: '/products/spices-herbs'
  }, 
  {
    name: 'Superfoods',
    path: '/products/superfoods'
  }, 
  {
    name: 'Oils',
    path: '/products/oilseeds'
  }, 
  {
    name: 'Nuts',
    path: '/products/nuts-flowers-beverages'
  }
];