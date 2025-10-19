import React, { useState } from 'react';
import { format } from 'date-fns';
import TrackingTimeline from './TrackingTimeline';
import TrackingMap from './TrackingMap';
import OrderNotes from './OrderNotes';
import { Order } from '../../apis/types';

interface OrderDetailsProps {
  order: Order;
  editable?: boolean;
  showTracking?: boolean;
  onAddNote?: (note: string, attachments?: File[]) => void;
  onStatusUpdate?: (orderId: string, status: string) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  editable = false,
  showTracking = true,
  onAddNote,
  onStatusUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'tracking' | 'notes'>('details');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!onStatusUpdate) return;
    
    setIsUpdatingStatus(true);
    try {
      await onStatusUpdate(order.id, newStatus);
    } catch (error) {
      console.error('Failed to update order status:', error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const currentLocation = order.tracking_events.length > 0 && order.tracking_events[0].coordinates
    ? order.tracking_events[0].coordinates
    : undefined;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Order #{order.id.slice(-8)}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Placed on {format(new Date(order.created_at), 'MMM dd, yyyy')}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
            {order.tracking_number && (
              <div className="text-sm text-gray-600">
                Tracking: {order.tracking_number}
              </div>
            )}
          </div>
        </div>

        {/* Status update for suppliers/admins */}
        {editable && (
          <div className="mt-4 flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Update Status:</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={order.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              disabled={isUpdatingStatus}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
            {isUpdatingStatus && (
              <div className="text-sm text-gray-500">Updating...</div>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Order Details
          </button>
          {showTracking && (
            <button
              onClick={() => setActiveTab('tracking')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tracking'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tracking ({order.tracking_events.length})
            </button>
          )}
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Notes ({order.notes.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium">{order.currency}{order.total_amount}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">{order.currency}{order.total_amount}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Items ({order.items.length})</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Product ID: {item.product_id}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price per unit: {order.currency}{item.price_per_unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{order.currency}{item.total_price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && showTracking && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrackingTimeline
                trackingEvents={order.tracking_events}
                currentStatus={order.status}
                estimatedDelivery={order.estimated_delivery ? new Date(order.estimated_delivery) : undefined}
              />
              <TrackingMap
                currentLocation={currentLocation}
                deliveryAddress={order.shipping_address}
                carrier={order.tracking_events[0]?.carrier}
              />
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <OrderNotes
            orderId={order.id}
            notes={order.notes}
            onAddNote={onAddNote}
            editable={editable}
          />
        )}
      </div>
    </div>
  );
};

export default OrderDetails;