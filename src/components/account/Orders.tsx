import { OrderItemDetails } from './OrderItemDetails';
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, DownloadIcon, ShoppingBagIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonOrderTable } from '../ui/SkeletonTable';
import { usePaginatedApi } from '../../hooks/useApi';
import { OrdersAPI } from '../../apis';
import { Order } from '../../apis/types';

interface OrdersProps {
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const Orders: React.FC<OrdersProps> = ({ 
  animation = 'shimmer' 
}) => {
  const { data: paginatedData, loading, error, execute } = usePaginatedApi<Order>();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    execute(OrdersAPI.getOrders);
  }, [execute]);

  const orders = paginatedData?.data || [];

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-main dark:text-white mb-6">
          My Orders
        </h1>
        <SkeletonOrderTable animation={animation} rows={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-8">
        <p>Error fetching orders: {error.message}</p>
      </div>
    );
  }

  return <div>
      <h1 className="text-2xl font-bold text-main dark:text-white mb-6">
        My Orders
      </h1>
      {orders.length > 0 ? <div className="space-y-4">
          {orders.map(order => <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750" onClick={() => toggleOrderExpand(order.id)}>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order placed
                  </p>
                  <p className="font-medium text-main dark:text-white">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order ID
                  </p>
                  <p className="font-medium text-main dark:text-white">
                    {order.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total
                  </p>
                  <p className="font-medium text-main dark:text-white">
                    ${order.total_amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                {expandedOrderId === order.id ? <ChevronUpIcon size={20} className="text-gray-500" /> : <ChevronDownIcon size={20} className="text-gray-500" />}
              </div>
              {expandedOrderId === order.id && <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-4">
                    {order.items.map(item => (
                      <OrderItemDetails 
                        key={item.id} 
                        productId={item.product_id} 
                        quantity={item.quantity} 
                        price={item.total_price} 
                      />
                    ))}
                  </div>
                  <div className="mt-6 flex justify-between">
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-500 dark:text-gray-400">
                        Subtotal: ${order.total_amount.toFixed(2)}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Shipping: Free
                      </p>
                      <p className="font-medium text-main dark:text-white">
                        Total: ${order.total_amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/account/orders/${order.id}`} className="flex items-center px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                        <EyeIcon size={16} className="mr-1" />
                        View details
                      </Link>
                      <button className="flex items-center px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                        <DownloadIcon size={16} className="mr-1" />
                        Invoice
                      </button>
                    </div>
                  </div>
                </div>}
            </div>)}
        </div> : <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <ShoppingBagIcon size={24} className="text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-lg font-medium text-main dark:text-white mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            You haven't placed any orders yet.
          </p>
          <Link to="/products" className="inline-block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md">
            Start Shopping
          </Link>
        </div>}
    </div>;
};
export default Orders;