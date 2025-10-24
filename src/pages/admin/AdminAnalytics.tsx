import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3Icon, TrendingUpIcon, UsersIcon, ShoppingCartIcon, DollarSignIcon, CalendarIcon, ArrowUpIcon, ArrowDownIcon, ArrowRightIcon, PackageIcon } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { AnalyticsAPI } from '../../apis';
import { DashboardData } from '../../types/analytics';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [chartView, setChartView] = useState<'revenue' | 'orders'>('revenue');
  const { data: dashboardData, loading, error, execute: fetchDashboardData } = useApi<DashboardData>(undefined, { showErrorToast: false });

  useEffect(() => {
    const date_from = new Date();
    date_from.setDate(date_from.getDate() - 30);
    fetchDashboardData(() => AnalyticsAPI.getDashboardData({ date_range: timeRange }));
  }, [fetchDashboardData, timeRange]);

  const overviewStats = dashboardData ? [
    {
      title: 'Total Revenue',
      value: `${dashboardData.total_sales.toLocaleString()}`,
      previousValue: '$0', // Placeholder
      change: '+0%', // Placeholder
      increasing: true, // Placeholder
      icon: <DollarSignIcon size={20} />,
      color: 'bg-info'
    },
    {
      title: 'Orders',
      value: dashboardData.total_orders.toLocaleString(),
      previousValue: '0', // Placeholder
      change: '+0%', // Placeholder
      increasing: true, // Placeholder
      icon: <ShoppingCartIcon size={20} />,
      color: 'bg-success'
    },
    {
      title: 'Customers',
      value: dashboardData.total_users.toLocaleString(),
      previousValue: '0', // Placeholder
      change: '+0%', // Placeholder
      increasing: true, // Placeholder
      icon: <UsersIcon size={20} />,
      color: 'bg-secondary'
    },
    {
      title: 'Conversion Rate',
      value: `${dashboardData.conversion_rate.toFixed(2)}%`,
      previousValue: '0%', // Placeholder
      change: '-0%', // Placeholder
      increasing: false, // Placeholder
      icon: <TrendingUpIcon size={20} />,
      color: 'bg-warning'
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
          <div className="bg-surface border border-border rounded-md overflow-hidden flex">
            <button className={`px-3 py-1.5 text-sm ${timeRange === '7d' ? 'bg-primary text-white' : 'bg-surface text-copy'}`} onClick={() => setTimeRange('7d')}>
              7D
            </button>
            <button className={`px-3 py-1.5 text-sm ${timeRange === '30d' ? 'bg-primary text-white' : 'bg-surface text-copy'}`} onClick={() => setTimeRange('30d')}>
              30D
            </button>
            <button className={`px-3 py-1.5 text-sm ${timeRange === '3m' ? 'bg-primary text-white' : 'bg-surface text-copy'}`} onClick={() => setTimeRange('3m')}>
              3M
            </button>
            <button className={`px-3 py-1.5 text-sm ${timeRange === '12m' ? 'bg-primary text-white' : 'bg-surface text-copy'}`} onClick={() => setTimeRange('12m')}>
              12M
            </button>
          </div>
          <button className="flex items-center px-3 py-1.5 bg-surface border border-border rounded-md text-sm">
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
        {overviewStats.map((stat, index) => <div key={index} className="bg-surface rounded-lg shadow-sm p-6 border border-border-light">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${stat.color} text-white flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className={`flex items-center text-sm ${stat.increasing ? 'text-success' : 'text-error'}`}>
                {stat.increasing ? <ArrowUpIcon size={16} className="mr-1" /> : <ArrowDownIcon size={16} className="mr-1" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-copy-light text-sm mb-1">{stat.title}</h3>
            <div className="text-2xl font-bold text-main mb-2">
              {stat.value}
            </div>
            <div className="text-xs text-copy-light">
              vs. {stat.previousValue} previous period
            </div>
          </div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-surface rounded-lg shadow-sm p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">
              Revenue Overview
            </h2>
            <div className="flex space-x-2">
              <button className={`px-3 py-1 rounded-md text-sm ${chartView === 'revenue' ? 'bg-primary/10 text-primary' : 'bg-surface-hover text-copy'}`} onClick={() => setChartView('revenue')}>
                Revenue
              </button>
              <button className={`px-3 py-1 rounded-md text-sm ${chartView === 'orders' ? 'bg-primary/10 text-primary' : 'bg-surface-hover text-copy'}`} onClick={() => setChartView('orders')}>
                Orders
              </button>
            </div>
          </div>
          <div className="h-64">
            {dashboardData?.sales_trend && dashboardData.sales_trend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.sales_trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="date" stroke="var(--color-copy-lighter)" fontSize={12} />
                  <YAxis stroke="var(--color-copy-lighter)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-elevated)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-copy)',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey={chartView === 'revenue' ? 'sales' : 'orders'} stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center bg-background rounded-md border border-border">
                <div className="text-center">
                  <BarChart3Icon size={48} className="mx-auto text-copy-lighter mb-2" />
                  <p className="text-copy-light">No data available for the selected period</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Sales by Category */}
        <div className="bg-surface rounded-lg shadow-sm p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">
              Sales by Category
            </h2>
          </div>
          <div className="space-y-4">
            {Object.entries(dashboardData?.order_status_distribution || {}).map(([status, count], index) => {
              const colors = ['bg-success', 'bg-warning', 'bg-info', 'bg-error', 'bg-secondary'];
              const color = colors[index % colors.length];
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-copy-light">
                      {status}
                    </span>
                    <span className="text-sm font-medium text-main">
                      {count as number}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
                    <div className={`h-full ${color}`} style={{
                      width: `${((count as number) / dashboardData.total_orders) * 100}%`
                    }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-surface rounded-lg shadow-sm p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">
              Top Selling Products
            </h2>
            <Link to="/admin/products" className="text-primary hover:underline text-sm flex items-center">
              View All <ArrowRightIcon size={16} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {dashboardData?.top_products.map(product => <div key={product.id} className="flex items-center">
                <img src={product.image_url} alt={product.name} className="w-10 h-10 rounded-md object-cover mr-3" />
                <div className="flex-grow">
                  <h3 className="font-medium text-main text-sm">
                    {product.name}
                  </h3>
                  <p className="text-copy-light text-xs">
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
        <div className="bg-surface rounded-lg shadow-sm p-6 border border-border-light">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-main">Recent Activity</h2>
            <Link to="/admin/orders" className="text-primary hover:underline text-sm flex items-center">
              View All <ArrowRightIcon size={16} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center mr-3 flex-shrink-0">
                <ShoppingCartIcon size={16} />
              </div>
              <div>
                <p className="text-sm text-main">
                  <span className="font-medium">New order</span> from Jane Smith
                </p>
                <p className="text-xs text-copy-light">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-info/10 text-info flex items-center justify-center mr-3 flex-shrink-0">
                <UsersIcon size={16} />
              </div>
              <div>
                <p className="text-sm text-main">
                  <span className="font-medium">New customer</span> registered
                </p>
                <p className="text-xs text-copy-light">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-warning/10 text-warning flex items-center justify-center mr-3 flex-shrink-0">
                <PackageIcon size={16} />
              </div>
              <div>
                <p className="text-sm text-main">
                  <span className="font-medium">Product update:</span> Moringa
                  Powder is low in stock
                </p>
                <p className="text-xs text-copy-light">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mr-3 flex-shrink-0">
                <DollarSignIcon size={16} />
              </div>
              <div>
                <p className="text-sm text-main">
                  <span className="font-medium">Payment received</span> for
                  order #ORD-1234
                </p>
                <p className="text-xs text-copy-light">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};