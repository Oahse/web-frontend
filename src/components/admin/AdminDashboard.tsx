import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Database,
  Clock
} from 'lucide-react';
import { ExportButton } from '../dashboard/utils/ExportUtils';
import { exportAnalytics } from '../../lib/exportUtils';

// ... (rest of the file)

  const handleExport = async (format: string, exportType: 'users' | 'orders') => {
    try {
      if (exportType === 'users') {
        await exportAnalytics('users', format, {});
      } else if (exportType === 'orders') {
        await exportAnalytics('orders', format, {});
      }
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-200 h-64 rounded-lg"></div>
            <div className="bg-gray-200 h-64 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-red-800">Error loading dashboard: {error}</span>
          </div>
          <button
            onClick={fetchDashboardData}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <ExportButton
            formats={['csv', 'json', 'excel']}
            onExport={(format) => handleExport(format, 'users')}
            filename="dashboard_export"
          />
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_users.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_orders.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_products.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.total_revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex items-center space-x-2">
            <Database className={`h-5 w-5 ${stats.system_health.database_status === 'healthy' ? 'text-green-500' : 'text-red-500'}`} />
            <div>
              <p className="text-sm text-gray-600">Database</p>
              <p className="font-medium capitalize">{stats.system_health.database_status}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <AlertTriangle className={`h-5 w-5 ${stats.system_health.error_rate < 0.05 ? 'text-green-500' : 'text-yellow-500'}`} />
            <div>
              <p className="text-sm text-gray-600">Error Rate</p>
              <p className="font-medium">{(stats.system_health.error_rate * 100).toFixed(2)}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Avg Response</p>
              <p className="font-medium">{stats.system_health.avg_response_time}ms</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Active Sessions</p>
              <p className="font-medium">{stats.system_health.active_sessions}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Uptime</p>
              <p className="font-medium">{stats.system_health.uptime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
            <ExportButton
              formats={['csv', 'json']}
              onExport={(format) => handleExport(format, 'users')}
              filename="recent_users"
            />
          </div>
          <div className="space-y-3">
            {stats.recent_users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.firstname} {user.lastname}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <ExportButton
              formats={['csv', 'json']}
              onExport={(format) => handleExport(format, 'orders')}
              filename="recent_orders"
            />
          </div>
          <div className="space-y-3">
            {stats.recent_orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.total_amount}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-6 w-6 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">Manage Users</p>
            <p className="text-sm text-gray-600">View and manage user accounts</p>
          </button>

          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="h-6 w-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">Manage Products</p>
            <p className="text-sm text-gray-600">Add and edit product catalog</p>
          </button>

          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ShoppingCart className="h-6 w-6 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">View Orders</p>
            <p className="text-sm text-gray-600">Monitor and process orders</p>
          </button>

          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-6 w-6 text-yellow-600 mb-2" />
            <p className="font-medium text-gray-900">Analytics</p>
            <p className="text-sm text-gray-600">View detailed reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;