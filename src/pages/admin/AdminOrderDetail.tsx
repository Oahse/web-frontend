import React from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Order } from '../../types';

export const AdminOrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: order, loading, error } = useApi<Order>(
    () => AdminAPI.getOrder(id!),
    { autoFetch: true, showErrorToast: true }
  );

  if (loading) {
    return <div className="p-6">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage error={error} onRetry={() => {}} />
      </div>
    );
  }

  if (!order) {
    return <div className="p-6">Order not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details: {order.id}</h1>
      <div className="bg-white shadow-sm rounded-lg p-4">
        <p><strong>Customer:</strong> {order.user?.firstname} {order.user?.lastname}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Amount:</strong> ${order.total_amount?.toFixed(2)}</p>
        <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <div className="mt-6 bg-white shadow-sm rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
        <p><strong>Carrier:</strong> {order.carrier_name || 'Not available'}</p>
        <p><strong>Tracking Number:</strong> {order.tracking_number || 'Not available'}</p>
      </div>

      <div className="mt-6 bg-white shadow-sm rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <p><strong>Payment Method ID:</strong> {order.payment_method_id || 'Not available'}</p>
        <h3 className="text-lg font-bold mt-4 mb-2">Transactions</h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.transactions?.map(transaction => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">${transaction.amount.toFixed(2)} {transaction.currency}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaction.transaction_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Order Items</h2>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items?.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.variant?.product_name} ({item.variant?.name})</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${item.price_per_unit.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${item.total_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};