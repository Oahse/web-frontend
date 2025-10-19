import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  orderTrackingService, 
  inventoryService, 
  WebSocketStatus,
  WebSocketStatusType
} from '../lib/websocket';
import { useNotifications } from './NotificationContext';

interface WebSocketContextType {
  orderStatus: WebSocketStatusType;
  inventoryStatus: WebSocketStatusType;
  isOrderServiceConnected: boolean;
  isInventoryServiceConnected: boolean;
  subscribeToOrder: (orderId: string, handler: (update: any) => void) => () => void;
  subscribeToUserOrders: (userId: string, handler: (update: any) => void) => () => void;
  subscribeToProduct: (productId: string, handler: (update: any) => void) => () => void;
  subscribeToLowStockAlerts: (handler: (alert: any) => void) => () => void;
  updateOrderStatus: (orderId: string, status: string, notes?: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
  autoConnect?: boolean;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ 
  children, 
  autoConnect = true,
}) => {
  const [orderStatus, setOrderStatus] = useState<WebSocketStatusType>(WebSocketStatus.DISCONNECTED);
  const [inventoryStatus, setInventoryStatus] = useState<WebSocketStatusType>(WebSocketStatus.DISCONNECTED);
  const { info, warning, error } = useNotifications();

  useEffect(() => {
    if (!autoConnect) return;

    // Set up status listeners
    const unsubscribeOrderStatus = orderTrackingService.onStatusChange((status) => {
      setOrderStatus(status);
      
      // Show notifications for connection status changes
      switch (status) {
        case WebSocketStatus.CONNECTED:
          info('Order tracking connected', 'Real-time order updates are now available');
          break;
        case WebSocketStatus.DISCONNECTED:
          warning('Order tracking disconnected', 'Real-time updates are temporarily unavailable');
          break;
        case WebSocketStatus.ERROR:
          error('Order tracking error', 'Failed to connect to order tracking service');
          break;
      }
    });

    const unsubscribeInventoryStatus = inventoryService.onStatusChange((status) => {
      setInventoryStatus(status);
      
      switch (status) {
        case WebSocketStatus.CONNECTED:
          info('Inventory tracking connected', 'Real-time inventory updates are now available');
          break;
        case WebSocketStatus.DISCONNECTED:
          warning('Inventory tracking disconnected', 'Real-time inventory updates are temporarily unavailable');
          break;
        case WebSocketStatus.ERROR:
          error('Inventory tracking error', 'Failed to connect to inventory service');
          break;
      }
    });

    // Connect services with error handling
    try {
      orderTrackingService.connect(process.env.REACT_APP_ORDER_WS_URL as string);
    } catch (error) {
      console.warn('Failed to connect order tracking service:', error);
    }
    
    try {
      inventoryService.connect(process.env.REACT_APP_INVENTORY_WS_URL as string);
    } catch (error) {
      console.warn('Failed to connect inventory service:', error);
    }

    // Cleanup on unmount
    return () => {
      unsubscribeOrderStatus();
      unsubscribeInventoryStatus();
      orderTrackingService.disconnect();
      inventoryService.disconnect();
    };
  }, [autoConnect, info, warning, error]);

  // Set up global event handlers for notifications
  useEffect(() => {
    // Order update notifications
    const unsubscribeOrderUpdates = orderTrackingService.on('order_update', (data) => {
      const { orderId, status } = data;
      
      switch (status) {
        case 'shipped':
          info(
            'Order Shipped',
            `Your order #${orderId} has been shipped and is on its way!`
          );
          break;
        case 'delivered':
          info(
            'Order Delivered',
            `Your order #${orderId} has been delivered successfully!`
          );
          break;
        case 'cancelled':
          warning(
            'Order Cancelled',
            `Order #${orderId} has been cancelled.`
          );
          break;
        default:
          info(
            'Order Update',
            `Your order #${orderId} status has been updated to ${status}`
          );
          break;
      }
    });

    // Low stock alerts
    const unsubscribeLowStock = inventoryService.on('low_stock_alert', (data) => {
      const { productName, currentStock, threshold } = data;
      warning(
        'Low Stock Alert',
        `${productName} is running low (${currentStock} remaining, threshold: ${threshold})`
      );
    });

    // Inventory updates
    const unsubscribeInventoryUpdates = inventoryService.on('product_inventory_update', (data) => {
      const { productId, previousStock, currentStock } = data;
      
      if (currentStock === 0) {
        error(
          'Out of Stock',
          `Product #${productId} is now out of stock`
        );
      } else if (currentStock < previousStock) {
        info(
          'Stock Updated',
          `Product #${productId} stock updated: ${currentStock} remaining`
        );
      }
    });

    return () => {
      unsubscribeOrderUpdates();
      unsubscribeLowStock();
      unsubscribeInventoryUpdates();
    };
  }, [info, warning, error]);

  const value: WebSocketContextType = {
    orderStatus,
    inventoryStatus,
    isOrderServiceConnected: orderStatus === WebSocketStatus.CONNECTED,
    isInventoryServiceConnected: inventoryStatus === WebSocketStatus.CONNECTED,
    subscribeToOrder: orderTrackingService.subscribeToOrder.bind(orderTrackingService),
    subscribeToUserOrders: orderTrackingService.subscribeToUserOrders.bind(orderTrackingService),
    subscribeToProduct: inventoryService.subscribeToProduct.bind(inventoryService),
    subscribeToLowStockAlerts: inventoryService.subscribeToLowStockAlerts.bind(inventoryService),
    updateOrderStatus: orderTrackingService.updateOrderStatus.bind(orderTrackingService),
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

// Custom hooks for specific WebSocket functionality
export const useOrderTracking = (orderId?: string) => {
  const { subscribeToOrder, isOrderServiceConnected } = useWebSocket();
  const [orderUpdate, setOrderUpdate] = useState<any>(null);

  useEffect(() => {
    if (!orderId || !isOrderServiceConnected) return;

    const unsubscribe = subscribeToOrder(orderId, (update) => {
      setOrderUpdate(update);
    });

    return unsubscribe;
  }, [orderId, isOrderServiceConnected, subscribeToOrder]);

  return {
    orderUpdate,
    isConnected: isOrderServiceConnected,
  };
};

export const useInventoryTracking = (productId?: string) => {
  const { subscribeToProduct, isInventoryServiceConnected } = useWebSocket();
  const [inventoryUpdate, setInventoryUpdate] = useState<any>(null);

  useEffect(() => {
    if (!productId || !isInventoryServiceConnected) return;

    const unsubscribe = subscribeToProduct(productId, (update) => {
      setInventoryUpdate(update);
    });

    return unsubscribe;
  }, [productId, isInventoryServiceConnected, subscribeToProduct]);

  return {
    inventoryUpdate,
    isConnected: isInventoryServiceConnected,
  };
};