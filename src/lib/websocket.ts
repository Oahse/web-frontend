export const WebSocketStatus = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
};

class WebSocketService {
  private ws: WebSocket | null = null;
  private statusCallback: ((status: string) => void) | null = null;
  private eventListeners = new Map<string, Set<(...args: any[]) => any>>(); // Generic event listeners

  onStatusChange(callback: (status: string) => void) {
    this.statusCallback = callback;
    return () => {
      this.statusCallback = null;
    };
  }

  on(eventType: string, handler: (...args: any[]) => any) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    this.eventListeners.get(eventType)?.add(handler);

    return () => {
      this.eventListeners.get(eventType)?.delete(handler);
      if (this.eventListeners.get(eventType)?.size === 0) {
        this.eventListeners.delete(eventType);
      }
    };
  }

  connect(url: string) {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      console.warn('WebSocket already connected or connecting.');
      return;
    }

    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.statusCallback?.(WebSocketStatus.CONNECTED);
    };

    this.ws.onclose = () => {
      this.statusCallback?.(WebSocketStatus.DISCONNECTED);
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      this.statusCallback?.(WebSocketStatus.ERROR);
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type) {
          this.eventListeners.get(data.type)?.forEach(handler => handler(data));
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error, event.data);
      }
    };
  }

  disconnect() {
    this.ws?.close();
    this.eventListeners.clear(); // Clear all listeners on disconnect
  }

  sendMessage(message: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.warn('WebSocket not open. Message not sent:', message);
    }
  }

  subscribeToOrder(orderId: string, handler: (update: any) => void) {
    // Send subscription message to server
    this.sendMessage(JSON.stringify({ action: 'subscribe', topic: 'order_updates', orderId }));
    // Register handler for specific order updates
    return this.on('order_update', (data: any) => {
      if (data.orderId === orderId) {
        handler(data);
      }
    });
  }

  subscribeToUserOrders(userId: string, handler: (update: any) => void) {
    // In a real implementation, you would fetch the user's orders from an API
    // and then subscribe to each one. For now, we'll subscribe to a generic user_order_update topic.
    this.sendMessage(JSON.stringify({ action: 'subscribe', topic: 'user_order_updates', userId }));
    return this.on('user_order_update', (data: any) => {
      if (data.userId === userId) {
        handler(data);
      }
    });
  }

  subscribeToProduct(productId: string, handler: (alert: any) => void) {
    this.sendMessage(JSON.stringify({ action: 'subscribe', topic: 'product_inventory_updates', productId }));
    return this.on('product_inventory_update', (data: any) => {
      if (data.productId === productId) {
        handler(data);
      }
    });
  }

  subscribeToLowStockAlerts(handler: (alert: any) => void) {
    this.sendMessage(JSON.stringify({ action: 'subscribe', topic: 'low_stock_alerts' }));
    return this.on('low_stock_alert', handler);
  }

  updateOrderStatus(orderId: string, status: string, notes?: string) {
    this.sendMessage(JSON.stringify({
      action: 'update_order_status',
      orderId,
      status,
      notes,
    }));
  }

}
export const orderTrackingService = new WebSocketService();
export const inventoryService = new WebSocketService();
