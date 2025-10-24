import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingBagIcon, HeartIcon, MapPinIcon, CreditCardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonDashboard } from '../ui/SkeletonDashboard';
import { usePaginatedApi } from '../../hooks/useApi';
import { apiClient } from '../../apis';
import OrdersAPI from '../../apis/orders';
import { Order } from '../../types';

interface DashboardProps {
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  animation = 'shimmer' 
}) => {
  const { user } = useAuth();
  const { data: paginatedOrders, loading, error, execute: fetchRecentOrders } = usePaginatedApi<Order>();

  useEffect(() => {
    fetchRecentOrders(() => OrdersAPI.getOrders({ limit: 3 }));
  }, [fetchRecentOrders]);

  const recentOrders = paginatedOrders?.data || [];

  if (loading) {
    return <SkeletonDashboard animation={animation} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>
      <h1 className="text-2xl font-bold text-main dark:text-white mb-6">
        My Account
      </h1>
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-main dark:text-white mb-2">
          Welcome back, {user?.firstname}!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Here's a summary of your account and recent activities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Link to="/account/orders" className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                <ShoppingBagIcon size={20} className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-medium text-main dark:text-white">
                  Orders
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  View your order history
                </p>
              </div>
            </div>
          </Link>
          <Link to="/account/wishlist" className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-3">
                <HeartIcon size={20} className="text-red-600 dark:text-red-300" />
              </div>
              <div>
                <h3 className="font-medium text-main dark:text-white">
                  Wishlist
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Saved items for later
                </p>
              </div>
            </div>
          </Link>
          <Link to="/account/addresses" className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                <MapPinIcon size={20} className="text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="font-medium text-main dark:text-white">
                  Addresses
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage shipping addresses
                </p>
              </div>
            </div>
          </Link>
          <Link to="/account/payment-methods" className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                <CreditCardIcon size={20} className="text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <h3 className="font-medium text-main dark:text-white">
                  Payment Methods
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage payment options
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-main dark:text-white">
            Recent Orders
          </h2>
          <Link to="/account/orders" className="text-primary hover:underline text-sm">
            View all orders
          </Link>
        </div>
        {recentOrders.length > 0 ? <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left">
                    Order ID
                  </th>
                  <th scope="col" className="px-4 py-3 text-left">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-left">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => <tr key={order.id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">
                      <Link to={`/account/orders/${order.id}`} className="text-primary hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-right">
                      ${order.total_amount.toFixed(2)}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div> : <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              You haven't placed any orders yet.
            </p>
            <Link to="/products" className="mt-2 inline-block text-primary hover:underline">
              Start shopping
            </Link>
          </div>}
      </div>
    </div>;
};
export default Dashboard;