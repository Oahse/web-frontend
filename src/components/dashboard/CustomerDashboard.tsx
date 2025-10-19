import React, { useState, useEffect } from 'react';
import { CustomizableDashboard, DashboardWidget, WidgetTemplate } from './widgets/CustomizableDashboard';
import { InteractiveChart } from './charts/InteractiveChart';
import { AdvancedTable } from './tables/AdvancedTable';
import {
  ShoppingBagIcon,
  HeartIcon,
  CreditCardIcon,
  TruckIcon,
  StarIcon,
  GiftIcon,
  TrendingUpIcon,
  BarChart3Icon,
  TableIcon
} from 'lucide-react';

interface CustomerDashboardProps {
  customerId?: string;
  onRefresh?: (widgetId?: string) => void;
  onExport?: (widgetId: string, format: string) => void;
}

// Customer Metric Widget
const CustomerMetricWidget: React.FC<{ 
  value: string; 
  label: string;
  icon?: React.ReactNode;
  color?: string;
  actionText?: string;
  onAction?: () => void;
}> = ({ value, label, icon, color = 'blue', actionText, onAction }) => (
  <div className="text-center">
    <div className="flex items-center justify-center mb-3">
      {icon && (
        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
          {icon}
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-500 mb-3">{label}</div>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className={`text-xs px-3 py-1 rounded-full bg-${color}-100 text-${color}-700 hover:bg-${color}-200 transition-colors`}
      >
        {actionText}
      </button>
    )}
  </div>
);

// Order History Widget
const OrderHistoryWidget: React.FC = () => {
  const orderData = [
    {
      id: 'ORD-2024-001',
      order_id: 'ORD-2024-001',
      date: '2024-01-15',
      total: 129.99,
      status: 'Delivered',
      items: 3,
      tracking: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      order_id: 'ORD-2024-002',
      date: '2024-01-10',
      total: 89.50,
      status: 'Shipped',
      items: 2,
      tracking: 'TRK987654321'
    },
    {
      id: 'ORD-2024-003',
      order_id: 'ORD-2024-003',
      date: '2024-01-05',
      total: 199.99,
      status: 'Processing',
      items: 1,
      tracking: null
    },
    {
      id: 'ORD-2024-004',
      order_id: 'ORD-2024-004',
      date: '2023-12-28',
      total: 45.00,
      status: 'Delivered',
      items: 4,
      tracking: 'TRK456789123'
    },
    {
      id: 'ORD-2024-005',
      order_id: 'ORD-2024-005',
      date: '2023-12-20',
      total: 299.99,
      status: 'Delivered',
      items: 2,
      tracking: 'TRK789123456'
    }
  ];

  const columns = [
    {
      key: 'order_id',
      label: 'Order ID',
      sortable: true,
      render: (value: string) => (
        <span className="font-mono text-sm text-blue-600">{value}</span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      format: 'date' as const
    },
    {
      key: 'items',
      label: 'Items',
      sortable: true,
      align: 'center' as const,
      render: (value: number) => (
        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{value}</span>
      )
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      format: 'currency' as const,
      align: 'right' as const
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      align: 'center' as const,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Delivered' ? 'bg-green-100 text-green-800' :
          value === 'Shipped' ? 'bg-blue-100 text-blue-800' :
          value === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'tracking',
      label: 'Tracking',
      render: (value: string | null) => (
        value ? (
          <button className="text-blue-600 hover:text-blue-800 text-sm underline">
            Track
          </button>
        ) : (
          <span className="text-gray-400 text-sm">-</span>
        )
      )
    }
  ];

  return (
    <AdvancedTable
      columns={columns}
      data={orderData}
      searchable={true}
      sortable={true}
      exportable={true}
      pagination={true}
      pageSize={5}
      onRowClick={(row) => console.log('View order:', row.order_id)}
      className="border-0 shadow-none"
    />
  );
};

// Wishlist Widget
const WishlistWidget: React.FC = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      inStock: true,
      discount: 20
    },
    {
      id: 2,
      name: 'Smart Fitness Tracker',
      price: 149.99,
      originalPrice: 149.99,
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=100&h=100&fit=crop',
      inStock: true,
      discount: 0
    },
    {
      id: 3,
      name: 'Bluetooth Speaker Pro',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
      inStock: false,
      discount: 25
    }
  ];

  return (
    <div className="space-y-3">
      {wishlistItems.map((item) => (
        <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold text-gray-900">
                ${item.price}
              </span>
              {item.discount > 0 && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    ${item.originalPrice}
                  </span>
                  <span className="text-xs bg-red-100 text-red-800 px-1 rounded">
                    -{item.discount}%
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <button
              className={`px-3 py-1 text-xs rounded-md ${
                item.inStock
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!item.inStock}
            >
              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      ))}
      <button className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 rounded-md hover:bg-blue-50">
        View All Wishlist Items
      </button>
    </div>
  );
};

// Spending Analytics Widget
const SpendingAnalyticsWidget: React.FC = () => {
  const spendingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Spending',
      data: [120, 190, 300, 250, 200, 300],
      borderColor: 'var(--color-info)',
      backgroundColor: 'var(--color-info)20',
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <InteractiveChart
      type="area"
      data={spendingData}
      height={200}
      showTooltips={true}
      showLegend={false}
      className="border-0 shadow-none"
    />
  );
};

// Recommendations Widget
const RecommendationsWidget: React.FC = () => {
  const recommendations = [
    {
      id: 1,
      name: 'Wireless Mouse Pro',
      price: 49.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
      reason: 'Based on your recent purchases'
    },
    {
      id: 2,
      name: 'USB-C Hub Deluxe',
      price: 79.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=100&h=100&fit=crop',
      reason: 'Frequently bought together'
    },
    {
      id: 3,
      name: 'Laptop Stand Adjustable',
      price: 39.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
      reason: 'Trending in your category'
    }
  ];

  return (
    <div className="space-y-3">
      {recommendations.map((item) => (
        <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold text-gray-900">${item.price}</span>
              <div className="flex items-center gap-1">
                <StarIcon size={12} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{item.rating}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
          </div>
          <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View
          </button>
        </div>
      ))}
    </div>
  );
};

// Loyalty Points Widget
const LoyaltyPointsWidget: React.FC = () => {
  const currentPoints = 2450;
  const nextRewardAt = 3000;
  const progress = (currentPoints / nextRewardAt) * 100;

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-3xl font-bold text-purple-600 mb-1">{currentPoints}</div>
        <div className="text-sm text-gray-500">Loyalty Points</div>
      </div>
      
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {nextRewardAt - currentPoints} points to next reward
        </div>
      </div>
      
      <button className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">
        View Rewards
      </button>
    </div>
  );
};

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  customerId
}) => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);

  const widgetTemplates: WidgetTemplate[] = [
    {
      id: 'customer-metric-template',
      name: 'Personal Metric',
      description: 'Personal shopping statistics',
      type: 'metric',
      component: CustomerMetricWidget,
      defaultLayout: { w: 3, h: 4, minW: 2, minH: 3 },
      icon: <BarChart3Icon size={20} />,
      category: 'analytics'
    },
    {
      id: 'order-history-template',
      name: 'Order History',
      description: 'View and track your orders',
      type: 'table',
      component: OrderHistoryWidget,
      defaultLayout: { w: 8, h: 6, minW: 6, minH: 5 },
      icon: <TableIcon size={20} />,
      category: 'sales'
    },
    {
      id: 'wishlist-template',
      name: 'Wishlist',
      description: 'Your saved items',
      type: 'custom',
      component: WishlistWidget,
      defaultLayout: { w: 4, h: 6, minW: 3, minH: 5 },
      icon: <HeartIcon size={20} />,
      category: 'custom'
    },
    {
      id: 'spending-analytics-template',
      name: 'Spending Analytics',
      description: 'Track your spending patterns',
      type: 'chart',
      component: SpendingAnalyticsWidget,
      defaultLayout: { w: 6, h: 4, minW: 4, minH: 3 },
      icon: <TrendingUpIcon size={20} />,
      category: 'analytics'
    },
    {
      id: 'recommendations-template',
      name: 'Recommendations',
      description: 'Personalized product suggestions',
      type: 'custom',
      component: RecommendationsWidget,
      defaultLayout: { w: 4, h: 6, minW: 3, minH: 5 },
      icon: <GiftIcon size={20} />,
      category: 'custom'
    },
    {
      id: 'loyalty-points-template',
      name: 'Loyalty Points',
      description: 'Your rewards and points balance',
      type: 'custom',
      component: LoyaltyPointsWidget,
      defaultLayout: { w: 3, h: 4, minW: 2, minH: 3 },
      icon: <StarIcon size={20} />,
      category: 'custom'
    }
  ];

  useEffect(() => {
    // Initialize customer-specific widgets
    const defaultWidgets: DashboardWidget[] = [
      {
        id: 'total-orders',
        type: 'metric',
        title: 'Total Orders',
        component: CustomerMetricWidget,
        props: {
          value: '24',
          label: 'Lifetime Orders',
          icon: <ShoppingBagIcon size={20} />,
          color: 'blue',
          actionText: 'View All',
          onAction: () => console.log('View all orders')
        },
        layout: { x: 0, y: 0, w: 3, h: 4 }
      },
      {
        id: 'total-spent',
        type: 'metric',
        title: 'Total Spent',
        component: CustomerMetricWidget,
        props: {
          value: '$1,847',
          label: 'Lifetime Value',
          icon: <CreditCardIcon size={20} />,
          color: 'green'
        },
        layout: { x: 3, y: 0, w: 3, h: 4 }
      },
      {
        id: 'loyalty-points',
        type: 'custom',
        title: 'Loyalty Points',
        component: LoyaltyPointsWidget,
        props: {},
        layout: { x: 6, y: 0, w: 3, h: 4 }
      },
      {
        id: 'active-orders',
        type: 'metric',
        title: 'Active Orders',
        component: CustomerMetricWidget,
        props: {
          value: '2',
          label: 'In Progress',
          icon: <TruckIcon size={20} />,
          color: 'orange',
          actionText: 'Track',
          onAction: () => console.log('Track orders')
        },
        layout: { x: 9, y: 0, w: 3, h: 4 }
      },
      {
        id: 'order-history',
        type: 'table',
        title: 'Recent Orders',
        component: OrderHistoryWidget,
        props: {},
        layout: { x: 0, y: 4, w: 8, h: 6 }
      },
      {
        id: 'wishlist',
        type: 'custom',
        title: 'Wishlist',
        component: WishlistWidget,
        props: {},
        layout: { x: 8, y: 4, w: 4, h: 6 }
      },
      {
        id: 'spending-analytics',
        type: 'chart',
        title: 'Spending Analytics',
        component: SpendingAnalyticsWidget,
        props: {},
        layout: { x: 0, y: 10, w: 6, h: 4 }
      },
      {
        id: 'recommendations',
        type: 'custom',
        title: 'Recommended for You',
        component: RecommendationsWidget,
        props: {},
        layout: { x: 6, y: 10, w: 6, h: 6 }
      }
    ];

    setWidgets(defaultWidgets);
  }, [customerId]);

  const handleWidgetsChange = (updatedWidgets: DashboardWidget[]) => {
    setWidgets(updatedWidgets);
  };

  const handleSave = (layout: DashboardWidget[]) => {
    console.log('Saving customer dashboard layout:', layout);
    // Here you would save to backend
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your personalized shopping overview</p>
        </div>
        
        <CustomizableDashboard
          widgets={widgets}
          widgetTemplates={widgetTemplates}
          editable={true}
          onWidgetsChange={handleWidgetsChange}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};