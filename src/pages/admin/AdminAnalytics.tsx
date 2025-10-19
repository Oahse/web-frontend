import React, { useState, useEffect } from 'react';
import { BarChart3Icon, TrendingUpIcon, UsersIcon, ShoppingCartIcon, DollarSignIcon, CalendarIcon, ArrowUpIcon, ArrowDownIcon, ArrowRightIcon, PackageIcon } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { AnalyticsAPI } from '../../apis';
import { DashboardData } from '../../apis/types';

export const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const { data: dashboardData, loading, error, execute: fetchDashboardData } = useApi<DashboardData>({ showErrorToast: false });

  useEffect(() => {
    const date_from = new Date();
    date_from.setDate(date_from.getDate() - 30);
    fetchDashboardData(() => AnalyticsAPI.getDashboardData({ date_range: { start: date_from.toISOString(), end: new Date().toISOString() } }));
  }, [fetchDashboardData, timeRange]);

  const overviewStats = dashboardData ? [
    {
      title: 'Total Revenue',
      value: `${dashboardData.total_sales.toLocaleString()}`,
      previousValue: '$0', // Placeholder
      change: '+0%', // Placeholder
      increasing: true, // Placeholder
      icon: <DollarSignIcon size={20} />,
      color: 'bg-blue-500'
    },
    {
      title: 'Orders',
      value: dashboardData.total_orders.toLocaleString(),
      previousValue: '0', // Placeholder
      change: '+0%', // Placeholder
      increasing: true, // Placeholder
      icon: <ShoppingCartIcon size={20} />,
      color: 'bg-green-500'
    },
    {
      title: 'Customers',
      value: dashboardData.total_users.toLocaleString(),
      previousValue: '0', // Placeholder
      change: '+0%', // Placeholder
      increasing: true, // Placeholder
      icon: <UsersIcon size={20} />,
      color: 'bg-purple-500'
    },
    {
      title: 'Conversion Rate',
      value: `${dashboardData.conversion_rate.toFixed(2)}%`,
      previousValue: '0%', // Placeholder
      change: '-0%', // Placeholder
      increasing: false, // Placeholder
      icon: <TrendingUpIcon size={20} />,
      color: 'bg-orange-500'
    }
  ] : [];

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-main mb-2 md:mb-0">Analytics</h1>
        <div className="flex items-center space-x-2">
          <div className="bg-white border border-gray-300 rounded-md overflow-hidden flex">
            <button className={`px-3 py-1.5 text-sm ${timeRange === '7d' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`} onClick={() => setTimeRange('7d')}>
              7D
            </button>
            <button className={`px-3 py-1.5 text-sm ${timeRange === '30d' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`} onClick={() => setTimeRange('30d')}>
              30D
            </button>
            <button className={`px-3 py-1.5 text-sm ${timeRange === '3m' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`} onClick={() => setTimeRange('3m')}>
              3M
            </button>
            <button className={`px-3 py-1.5 text-sm ${timeRange === '12m' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`} onClick={() => setTimeRange('12m')}>
              12M
            </button>
          </div>
          <button className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm">
            <CalendarIcon size={16} className="mr-2" />
            Custom
          </button>
          <button className="px-3 py-1.5 bg-primary text-white rounded-md text-sm">
            Export
          </button>
        </div>
      </div>
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {overviewStats.map((stat, index) => <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
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
            <div className="text-2xl font-bold text-main mb-2">
              {stat.value}
            </div>
            <div className="text-xs text-gray-500">
              vs. {stat.previousValue} previous period
            </div>
          </div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">
              Revenue Overview
            </h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm">
                Revenue
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                Orders
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200">
            <div className="text-center">
              <BarChart3Icon size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">Revenue chart visualization</p>
              <p className="text-sm text-gray-400">
                (This would be an actual chart in a real implementation)
              </p>
            </div>
          </div>
        </div>
        {/* Sales by Category */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">
              Sales by Category
            </h2>
          </div>
          <div className="space-y-4">
            {dashboardData?.order_status_distribution.map((category, index) => <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    {category.status}
                  </span>
                  <span className="text-sm font-medium text-main">
                    {category.count}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-blue-500`} style={{
                width: `${(category.count / dashboardData.total_orders) * 100}%`
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">
              Top Selling Products
            </h2>
            <button className="text-primary hover:underline text-sm flex items-center">
              View All <ArrowRightIcon size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData?.top_products.map(product => <div key={product.id} className="flex items-center">
                <img src={product.image_url} alt={product.name} className="w-10 h-10 rounded-md object-cover mr-3" />
                <div className="flex-grow">
                  <h3 className="font-medium text-main text-sm">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {product.sales} units sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-main">
                    ${product.revenue.toFixed(2)}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">Recent Activity</h2>
            <button className="text-primary hover:underline text-sm flex items-center">
              View All <ArrowRightIcon size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 flex-shrink-0">
                <ShoppingCartIcon size={16} />
              </div>
              <div>
                <p className="text-sm text-main">
                  <span className="font-medium">New order</span> from Jane Smith
                </p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                <UsersIcon size={16} />
              </div>
              <div>
                <p className="text-sm text-main">
                  <span className="font-medium">New customer</span> registered
                </p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3 flex-shrink-0">
                <PackageIcon size={16} />
              </div>
              <div>
                <p className="text-sm text-main">
                  <span className="font-medium">Product update:</span> Moringa
                  Powder is low in stock
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
                <DollarSignIcon size={16} />
              </div>
              <div>
                <p className="text-sm text-main">
                  <span className="font-medium">Payment received</span> for
                  order #ORD-1234
                </p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};