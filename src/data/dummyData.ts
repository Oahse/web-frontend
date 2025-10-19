import { Order, BlogPost, DashboardData, Address, PaymentMethod, Notification } from '../apis/types';

export const mockOrders: Order[] = [{
  id: 'ORD123456',
  created_at: '2023-09-15',
  updated_at: '2023-09-15',
  user_id: 'USR123',
  status: 'Delivered',
  total_amount: 129.99,
  currency: 'USD',
  items: [{
    id: 'ITEM1',
    created_at: '2023-09-15',
    updated_at: '2023-09-15',
    order_id: 'ORD123456',
    product_id: 'prod1',
    quantity: 1,
    price_per_unit: 79.99,
    total_price: 79.99,
  }, {
    id: 'ITEM2',
    created_at: '2023-09-15',
    updated_at: '2023-09-15',
    order_id: 'ORD123456',
    product_id: 'prod2',
    quantity: 2,
    price_per_unit: 12.99,
    total_price: 25.98,
  }],
  tracking_events: [],
  notes: [],
}, {
  id: 'ORD123455',
  created_at: '2023-09-10',
  updated_at: '2023-09-10',
  user_id: 'USR123',
  status: 'Shipped',
  total_amount: 79.5,
  currency: 'USD',
  items: [{
    id: 'ITEM3',
    created_at: '2023-09-10',
    updated_at: '2023-09-10',
    order_id: 'ORD123455',
    product_id: 'prod3',
    quantity: 1,
    price_per_unit: 79.5,
    total_price: 79.5,
  }],
  tracking_events: [],
  notes: [],
}, {
  id: 'ORD123454',
  created_at: '2023-08-28',
  updated_at: '2023-08-28',
  user_id: 'USR123',
  status: 'Processing',
  total_amount: 49.99,
  currency: 'USD',
  items: [{
    id: 'ITEM4',
    created_at: '2023-08-28',
    updated_at: '2023-08-28',
    order_id: 'ORD123454',
    product_id: 'prod4',
    quantity: 1,
    price_per_unit: 49.99,
    total_price: 49.99,
  }],
  tracking_events: [],
  notes: [],
}];

export const mockOrderManagementOrders: Order[] = [
  {
    id: '1',
    user_id: 'user1',
    status: 'Pending',
    total_amount: 299.99,
    currency: '$',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item1',
        order_id: '1',
        product_id: 'prod1',
        quantity: 2,
        price_per_unit: 149.99,
        total_price: 299.98,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    notes: []
  },
  {
    id: '2',
    user_id: 'user2',
    status: 'Processing',
    total_amount: 149.99,
    currency: '$',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 'item2',
        order_id: '2',
        product_id: 'prod2',
        quantity: 1,
        price_per_unit: 149.99,
        total_price: 149.99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    notes: []
  },
  {
    id: '3',
    user_id: 'user3',
    status: 'Shipped',
    total_amount: 599.99,
    currency: '$',
    tracking_number: 'TRK123456789',
    estimated_delivery: new Date(Date.now() + 172800000).toISOString(),
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 'item3',
        order_id: '3',
        product_id: 'prod3',
        quantity: 1,
        price_per_unit: 599.99,
        total_price: 599.99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    notes: []
  }
];

export const mockBlogPosts: BlogPost[] = [{
  id: '1',
  title: 'The Benefits of Shea Butter for Skin and Hair',
  excerpt: 'Discover the amazing properties of raw, unrefined shea butter from West Africa and how it can transform your beauty routine.',
  content: '',
  image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  created_at: '2023-08-15',
  updated_at: '2023-08-15',
  author: {
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
  },
  category: 'Health & Wellness',
  tags: ['Skincare', 'Natural', 'Beauty'],
  slug: 'benefits-of-shea-butter'
}, {
  id: '2',
  title: 'Sustainable Farming Practices in Ghana',
  excerpt: 'Learn about how our partner farms in Ghana are implementing sustainable farming practices to protect the environment.',
  content: '',
  image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  created_at: '2023-07-28',
  updated_at: '2023-07-28',
  author: {
    name: 'Michael Addo',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  category: 'Sustainability',
  tags: ['Farming', 'Sustainability', 'Organic'],
  slug: 'sustainable-farming-ghana'
}, {
  id: '3',
  title: 'Moringa: The Miracle Tree of Africa',
  excerpt: 'Explore the nutritional benefits of moringa, known as the "miracle tree," and its potential to combat malnutrition.',
  content: '',
  image: 'https://images.unsplash.com/photo-1515362655824-9a74989f318e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  created_at: '2023-07-10',
  updated_at: '2023-07-10',
  author: {
    name: 'Dr. Amina Diallo',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  category: 'Health & Wellness',
  tags: ['Nutrition', 'Superfoods'],
  slug: 'moringa-miracle-tree'
}];

export const mockAdminDashboardData: DashboardData = {
  total_sales: 12628,
  total_orders: 356,
  total_users: 2420,
  total_products: 120,
  conversion_rate: 3.42,
  average_order_value: 35.47,
  top_products: [
    {
      id: '1',
      name: 'Organic Shea Butter',
      sales: 142,
      revenue: 1419.58,
      image_url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '2',
      name: 'Premium Arabica Coffee',
      sales: 98,
      revenue: 1861.02,
      image_url: 'https://images.unsplash.com/photo-1559525839-8f27c16df8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: '3',
      name: 'Organic Quinoa',
      sales: 76,
      revenue: 532.24,
      image_url: 'https://images.unsplash.com/photo-1612257999968-a42df8159183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    }
  ],
  sales_trend: [],
  order_status_distribution: [],
  user_growth: [],
};

export const mockAddresses: Address[] = [{
  id: 'addr1',
  user_id: 'user1',
  street: '123 Main Street',
  city: 'New York',
  state: 'NY',
  post_code: '10001',
  country: 'United States',
  kind: 'Shipping',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}, {
  id: 'addr2',
  user_id: 'user1',
  street: '456 Business Ave',
  city: 'San Francisco',
  state: 'CA',
  post_code: '94105',
  country: 'United States',
  kind: 'Billing',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}];

export const mockPaymentMethods: PaymentMethod[] = [{
  id: 'pm_1',
  user_id: 'user1',
  type: 'credit_card',
  provider: 'visa',
  last_four: '4242',
  expiry_month: 12,
  expiry_year: 2025,
  is_default: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}, {
  id: 'pm_2',
  user_id: 'user1',
  type: 'credit_card',
  provider: 'mastercard',
  last_four: '5555',
  expiry_month: 8,
  expiry_year: 2024,
  is_default: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}];

export const mockRecentOrders: Order[] = [{
  id: 'ORD123456',
  created_at: '2023-09-15',
  updated_at: '2023-09-15',
  user_id: 'USR123',
  status: 'Delivered',
  total_amount: 129.99,
  currency: 'USD',
  items: [],
  tracking_events: [],
  notes: [],
}, {
  id: 'ORD123455',
  created_at: '2023-09-10',
  updated_at: '2023-09-10',
  user_id: 'USR123',
  status: 'Shipped',
  total_amount: 79.5,
  currency: 'USD',
  items: [],
  tracking_events: [],
  notes: [],
}];

export const mockSupplierOrders: Order[] = [
  {
    id: '1',
    user_id: 'user1',
    status: 'Pending',
    total_amount: 299.99,
    currency: '$',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item1',
        order_id: '1',
        product_id: 'prod1',
        quantity: 2,
        price_per_unit: 149.99,
        total_price: 299.98,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    notes: []
  },
  {
    id: '2',
    user_id: 'user2',
    status: 'Processing',
    total_amount: 149.99,
    currency: '$',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 'item2',
        order_id: '2',
        product_id: 'prod2',
        quantity: 1,
        price_per_unit: 149.99,
        total_price: 149.99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ],
    tracking_events: [],
    notes: []
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    user_id: 'user1',
    type: 'order_update',
    title: 'New Order Received',
    message: 'You have received a new order #12345 worth $299.99',
    data: { orderId: '12345' },
    read: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'user1',
    type: 'system',
    title: 'Urgent: Order Requires Attention',
    message: 'Order #12344 has been pending for 24 hours and requires immediate processing',
    data: { orderId: '12344' },
    read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
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

export const mockProducts = [
  {
    id: 'prod1',
    name: 'Organic Extra Virgin Olive Oil',
    description: 'Cold-pressed from the finest organic olives.',
    category: { id: 'cat1', name: 'Oils' },
    supplier: { id: 'sup1', firstname: 'Bio', lastname: 'Farm' },
    variants: [
      { 
        id: 'var1', 
        base_price: 25.99, 
        sale_price: 22.99, 
        stock_quantity: 100, 
        images: [{ url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' }] 
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod2',
    name: 'Natural Honey',
    description: 'Pure and natural honey from local bees.',
    category: { id: 'cat2', name: 'Sweeteners' },
    supplier: { id: 'sup2', firstname: 'Honey', lastname: 'Bee' },
    variants: [
      { 
        id: 'var2', 
        base_price: 15.50, 
        sale_price: null, 
        stock_quantity: 50, 
        images: [{ url: 'https://images.unsplash.com/photo-1559525839-8f27c16df8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' }] 
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod3',
    name: 'Organic Green Tea',
    description: 'Finest organic green tea leaves.',
    category: { id: 'cat3', name: 'Beverages' },
    supplier: { id: 'sup3', firstname: 'Tea', lastname: 'Co' },
    variants: [
      { 
        id: 'var3', 
        base_price: 10.00, 
        sale_price: 8.00, 
        stock_quantity: 200, 
        images: [{ url: 'https://images.unsplash.com/photo-1612257999968-a42df8159183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' }] 
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod4',
    name: 'Organic Quinoa',
    description: 'High-protein organic quinoa.',
    category: { id: 'cat4', name: 'Grains' },
    supplier: { id: 'sup4', firstname: 'Grain', lastname: 'Farm' },
    variants: [
      { 
        id: 'var4', 
        base_price: 12.00, 
        sale_price: null, 
        stock_quantity: 150, 
        images: [{ url: 'https://images.unsplash.com/photo-1515362655824-9a74989f318e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' }] 
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod5',
    name: 'Organic Chia Seeds',
    description: 'Nutrient-rich organic chia seeds.',
    category: { id: 'cat5', name: 'Seeds' },
    supplier: { id: 'sup5', firstname: 'Seed', lastname: 'Co' },
    variants: [
      { 
        id: 'var5', 
        base_price: 8.00, 
        sale_price: 6.50, 
        stock_quantity: 120, 
        images: [{ url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }] 
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod6',
    name: 'Organic Almond Milk',
    description: 'Creamy organic almond milk.',
    category: { id: 'cat6', name: 'Dairy Alternatives' },
    supplier: { id: 'sup6', firstname: 'Almond', lastname: 'Dream' },
    variants: [
      { 
        id: 'var6', 
        base_price: 4.50, 
        sale_price: null, 
        stock_quantity: 80, 
        images: [{ url: 'https://images.unsplash.com/photo-1559525839-8f27c16df8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' }] 
      }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockCategories = [
  { id: 'cat1', name: 'Oils', slug: 'oils' },
  { id: 'cat2', name: 'Sweeteners', slug: 'sweeteners' },
  { id: 'cat3', name: 'Beverages', slug: 'beverages' },
  { id: 'cat4', name: 'Grains', slug: 'grains' },
  { id: 'cat5', name: 'Seeds', slug: 'seeds' },
  { id: 'cat6', name: 'Dairy Alternatives', slug: 'dairy-alternatives' },
];
