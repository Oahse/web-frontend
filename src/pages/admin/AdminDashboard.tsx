import React, { useEffect } from 'react';
import { BarChart3Icon, ShoppingCartIcon, UsersIcon, DollarSignIcon, ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, CalendarIcon, PackageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import ErrorMessage from '../../components/common/ErrorMessage';

export const AdminDashboard: React.FC = () => {
  // API calls for dashboard data
  const {
    data: adminStats,
    loading: statsLoading,
    error: statsError,
    execute: fetchStats,
  } = useApi<any>({ showErrorToast: false });

  const {
    data: platformOverview,
    loading: overviewLoading,
    error: overviewError,
    execute: fetchOverview,
  } = useApi<any>({ showErrorToast: false });

  const {
    data: recentOrdersData,
    loading: ordersLoading,
    error: ordersError,
    execute: fetchRecentOrders,
  } = useApi<any>({ showErrorToast: false });

  useEffect(() => {
    // Fetch dashboard data
    fetchStats(() => AdminAPI.getAdminStats());
    fetchOverview(() => AdminAPI.getPlatformOverview());
    fetchRecentOrders(() => AdminAPI.getAllOrders({ page: 1, limit: 5 }));
  }, [fetchStats, fetchOverview, fetchRecentOrders]);

  // Fallback data for when API fails
  const fallbackStats = [{
    title: 'Total Revenue',
    value: '$12,628',
    change: '+12.5%',
    increasing: true,
    icon: <DollarSignIcon size={20} />,
    color: 'bg-blue-500'
  }, {
    title: 'Orders',
    value: '356',
    change: '+8.2%',
    increasing: true,
    icon: <ShoppingCartIcon size={20} />,
    color: 'bg-green-500'
  }, {
    title: 'Customers',
    value: '2,420',
    change: '+5.7%',
    increasing: true,
    icon: <UsersIcon size={20} />,
    color: 'bg-purple-500'
  }, {
    title: 'Conversion Rate',
    value: '3.42%',
    change: '-0.5%',
    increasing: false,
    icon: <TrendingUpIcon size={20} />,
    color: 'bg-orange-500'
  }];

  const fallbackRecentOrders = [{
    id: 'ORD-1234',
    customer: 'John Doe',
    date: '2023-05-15',
    status: 'Delivered',
    total: 78.95
  }, {
    id: 'ORD-1235',
    customer: 'Jane Smith',
    date: '2023-05-14',
    status: 'Processing',
    total: 124.5
  }, {
    id: 'ORD-1236',
    customer: 'Robert Johnson',
    date: '2023-05-14',
    status: 'Shipped',
    total: 54.25
  }, {
    id: 'ORD-1237',
    customer: 'Emily Davis',
    date: '2023-05-13',
    status: 'Delivered',
    total: 92.3
  }, {
    id: 'ORD-1238',
    customer: 'Michael Brown',
    date: '2023-05-12',
    status: 'Processing',
    total: 45.75
  }];

  const fallbackTopProducts = [{
    id: '1',
    name: 'Organic Shea Butter',
    sales: 142,
    revenue: 1419.58,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  }, {
    id: '2',
    name: 'Premium Arabica Coffee',
    sales: 98,
    revenue: 1861.02,
    image: 'https://images.unsplash.com/photo-1559525839-8f27c16df8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  }, {
    id: '3',
    name: 'Organic Quinoa',
    sales: 76,
    revenue: 532.24,
    image: 'https://images.unsplash.com/photo-1612257999968-a42df8159183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  }, {
    id: '4',
    name: 'Moringa Powder',
    sales: 65,
    revenue: 1039.35,
    image: 'https://images.unsplash.com/photo-1515362655824-9a74989f318e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  }];

  // Use API data or fallback to demo data
  const stats = adminStats ? [
    {
      title: 'Total Revenue',
      value: `$${adminStats.total_revenue?.toLocaleString() || '0'}`,
      change: '+12.5%', // This would come from API
      increasing: true,
      icon: <DollarSignIcon size={20} />,
      color: 'bg-blue-500'
    },
    {
      title: 'Orders',
      value: adminStats.total_orders?.toString() || '0',
      change: '+8.2%', // This would come from API
      increasing: true,
      icon: <ShoppingCartIcon size={20} />,
      color: 'bg-green-500'
    },
    {
      title: 'Customers',
      value: adminStats.total_customers?.toString() || '0',
      change: '+5.7%', // This would come from API
      increasing: true,
      icon: <UsersIcon size={20} />,
      color: 'bg-purple-500'
    },
    {
      title: 'Products',
      value: adminStats.total_products?.toString() || '0',
      change: '+2.1%', // This would come from API
      increasing: true,
      icon: <PackageIcon size={20} />,
      color: 'bg-orange-500'
    }
  ] : fallbackStats;

  const recentOrders = recentOrdersData?.data || fallbackRecentOrders;
  const topProducts = platformOverview?.top_products || fallbackTopProducts;

  if (statsError && overviewError && ordersError) {
    return (
      <div className="p-6">
        <ErrorMessage
          error={statsError}
          onRetry={() => {
            fetchStats(() => AdminAPI.getAdminStats());
            fetchOverview(() => AdminAPI.getPlatformOverview());
            fetchRecentOrders(() => AdminAPI.getAllOrders({ page: 1, limit: 5 }));
          }}
        />
      </div>
    );
  }

  return <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm">
            <CalendarIcon size={16} className="mr-2" />
            Last 30 Days
          </button>
          <button className="px-3 py-1.5 bg-primary text-white rounded-md text-sm">
            Export
          </button>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsLoading ? (
          // Loading skeleton
          [...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-20 h-4 bg-gray-200 rounded mb-1"></div>
              <div className="w-24 h-8 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          stats.map((stat, index) => <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${stat.color} text-white flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className={`flex items-center text-sm ${stat.increasing ? 'text-green-600' : 'text-red-600'}`}>
                {stat.increasing ? <ArrowUpIcon size={16} className="mr-1" /> : <ArrowDownIcon size={16} className="mr-1" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
            <div className="text-2xl font-bold text-main">{stat.value}</div>
          </div>)
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">Recent Orders</h2>
            <Link to="/admin/orders" className="text-primary hover:underline text-sm">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b text-sm">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {ordersLoading ? (
                  // Loading skeleton for orders
                  [...Array(5)].map((_, index) => (
                    <tr key={index} className="border-b last:border-0 animate-pulse">
                      <td className="py-3"><div className="w-20 h-4 bg-gray-200 rounded"></div></td>
                      <td className="py-3"><div className="w-24 h-4 bg-gray-200 rounded"></div></td>
                      <td className="py-3"><div className="w-16 h-4 bg-gray-200 rounded"></div></td>
                      <td className="py-3"><div className="w-16 h-6 bg-gray-200 rounded-full"></div></td>
                      <td className="py-3"><div className="w-12 h-4 bg-gray-200 rounded"></div></td>
                    </tr>
                  ))
                ) : (
                  recentOrders.map(order => <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 text-main">
                      <Link to={`/admin/orders/${order.id}`} className="hover:text-primary">
                        {order.id}
                      </Link>
                    </td>
                    <td className="py-3 text-main">
                      {order.customer || `${order.user?.firstname} ${order.user?.lastname}` || 'N/A'}
                    </td>
                    <td className="py-3 text-gray-500">
                      {order.date || new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Processing'}
                      </span>
                    </td>
                    <td className="py-3 font-medium">
                      ${(order.total || order.total_amount || 0).toFixed(2)}
                    </td>
                  </tr>)
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">Top Products</h2>
            <Link to="/admin/products" className="text-primary hover:underline text-sm">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {overviewLoading ? (
              // Loading skeleton for top products
              [...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                  <div className="flex-grow">
                    <div className="w-32 h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
              ))
            ) : (
              topProducts.map(product => <div key={product.id} className="flex items-center">
                <img 
                  src={product.image || product.variants?.[0]?.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'} 
                  alt={product.name} 
                  className="w-10 h-10 rounded-md object-cover mr-3" 
                />
                <div className="flex-grow">
                  <h3 className="font-medium text-main text-sm">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs">{product.sales || 0} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-main">
                    ${(product.revenue || 0).toFixed(2)}
                  </p>
                </div>
              </div>)
            )}
          </div>
        </div>
      </div>
      {/* Analytics Summary */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-main">Sales Overview</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm">
              Weekly
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
              Monthly
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
              Yearly
            </button>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200">
          <div className="text-center">
            <BarChart3Icon size={48} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">Sales chart visualization</p>
            <p className="text-sm text-gray-400">
              (This would be an actual chart in a real implementation)
            </p>
          </div>
        </div>
      </div>
    </div>;
};