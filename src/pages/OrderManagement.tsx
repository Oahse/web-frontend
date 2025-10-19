import React, { useState, useEffect, useCallback } from 'react';
import OrderList from '../components/order/OrderList';
import OrderDetails from '../components/order/OrderDetails';
import SupplierOrderDashboard from '../components/supplier/SupplierOrderDashboard';
import SupplierNotifications from '../components/supplier/SupplierNotifications';
import { useAuth } from '../contexts/AuthContext';
import { usePaginatedApi, useMutation } from '../hooks/useApi';
import { OrdersAPI } from '../apis';
import { Order, OrderStatus, OrderNote } from '../apis/types';

interface OrderFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  userId?: string;
  minAmount?: number;
  maxAmount?: number;
}

const OrderManagement: React.FC = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filters, setFilters] = useState<OrderFilters>({});
  const [view, setView] = useState<'list' | 'dashboard'>('list');

  const getUserRole = useCallback((): 'customer' | 'supplier' | 'admin' => {
    if (!user) return 'customer';
    switch (user.role) {
      case 'Supplier':
        return 'supplier';
      case 'Admin':
      case 'SuperAdmin':
      case 'GodAdmin':
        return 'admin';
      default:
        return 'customer';
    }
  }, [user]);

  const userRole = getUserRole();

    const {
      data: paginatedOrders,
      loading,
      execute: fetchOrders
    } = usePaginatedApi<Order>({ showErrorToast: false });
  const updateStatusMutation = useMutation<Order, { orderId: string; status: OrderStatus }>();
  const addNoteMutation = useMutation<OrderNote, { orderId: string; note: string }>();

  useEffect(() => {
    let apiCall: () => Promise<any>;
    const params = {
      page: 1,
      limit: 20,
      status: filters.status as OrderStatus,
      date_from: filters.startDate,
      date_to: filters.endDate,
    };

    switch (userRole) {
      case 'supplier':
        apiCall = () => OrdersAPI.getSupplierOrders(params);
        break;
      case 'admin':
        apiCall = () => OrdersAPI.getAllOrders({ ...params, customer_id: filters.userId });
        break;
      default:
        apiCall = () => OrdersAPI.getOrders(params);
    }
    fetchOrders(apiCall);
  }, [userRole, filters, fetchOrders]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const result = await updateStatusMutation.mutate(
      (vars) => OrdersAPI.updateOrderStatus(vars.orderId, { status: vars.status as OrderStatus }),
      { orderId, status: newStatus as OrderStatus }
    );

    if (result) {
      fetchOrders(OrdersAPI.getOrders); // Refetch orders
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const handleAddNote = async (note: string) => {
    if (!selectedOrder) return;

    const result = await addNoteMutation.mutate(
      (vars) => OrdersAPI.addOrderNote(vars.orderId, vars.note),
      { orderId: selectedOrder.id, note }
    );

    if (result) {
      setSelectedOrder(prev => prev ? { ...prev, notes: [result, ...prev.notes] } : null);
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (notification.orderId) {
      const order = paginatedOrders?.data.find(o => o.id === notification.orderId);
      if (order) {
        setSelectedOrder(order);
      }
    }
  };

  const orders = paginatedOrders?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userRole === 'supplier' ? 'Supplier Dashboard' : 'Order Management'}
            </h1>
            <p className="text-gray-600 mt-2">
              {userRole === 'customer' && 'Track and manage your orders'}
              {userRole === 'supplier' && 'Manage your orders and track their progress'}
              {userRole === 'admin' && 'Oversee all orders and system operations'}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {userRole === 'supplier' && user && (
              <SupplierNotifications
                supplierId={user.id}
                onNotificationClick={handleNotificationClick}
              />
            )}

            {userRole === 'supplier' && (
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('list')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    view === 'list' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setView('dashboard')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    view === 'dashboard' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </button>
              </div>
            )}
          </div>
        </div>

        {userRole === 'supplier' && view === 'dashboard' && user ? (
          <SupplierOrderDashboard supplierId={user.id} />
        ) : (
          <div className="space-y-6">
            <OrderList
              orders={orders}
              userRole={userRole}
              filters={filters}
              onFilterChange={setFilters}
              onStatusUpdate={userRole !== 'customer' ? handleStatusUpdate : undefined}
              onOrderSelect={setSelectedOrder}
              loading={loading}
            />
          </div>
        )}

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Details - #{selectedOrder.id.slice(-8)}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <OrderDetails
                  order={selectedOrder}
                  editable={userRole !== 'customer'}
                  showTracking={true}
                  onAddNote={userRole !== 'customer' ? handleAddNote : undefined}
                  onStatusUpdate={userRole !== 'customer' ? handleStatusUpdate : undefined}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;