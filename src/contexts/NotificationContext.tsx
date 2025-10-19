import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  Notification, 
  NotificationPreferences, 
  notificationService, 
  browserNotificationService 
} from '../lib/notifications';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => string;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  requestBrowserPermission: () => Promise<NotificationPermission>;
  // Convenience methods
  success: (title: string, message?: string) => string;
  error: (title: string, message?: string) => string;
  warning: (title: string, message?: string) => string;
  info: (title: string, message?: string) => string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>(
    notificationService.getPreferences()
  );

  useEffect(() => {
    // Subscribe to notification changes
    const unsubscribe = notificationService.subscribe((newNotifications) => {
      setNotifications(newNotifications);
    });

    // Initialize with current notifications
    setNotifications(notificationService.getAll());

    return unsubscribe;
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>): string => {
    const id = notificationService.add(notification);
    
    // Show browser notification if enabled and permission granted
    if (preferences.globalEnabled && !notificationService.isQuietHours()) {
      browserNotificationService.show(notification.title, {
        body: notification.message,
        tag: notification.category,
      });
    }
    
    return id;
  };

  const removeNotification = (id: string): void => {
    notificationService.remove(id);
  };

  const markAsRead = (id: string): void => {
    notificationService.markAsRead(id);
  };

  const markAllAsRead = (): void => {
    notificationService.markAllAsRead();
  };

  const clearAll = (): void => {
    notificationService.clear();
  };

  const updatePreferences = (newPreferences: Partial<NotificationPreferences>): void => {
    notificationService.updatePreferences(newPreferences);
    setPreferences(notificationService.getPreferences());
  };

  const requestBrowserPermission = async (): Promise<NotificationPermission> => {
    return await browserNotificationService.requestPermission();
  };

  // Convenience methods
  const success = (title: string, message?: string): string => {
    return addNotification({ type: 'success', title, message });
  };

  const error = (title: string, message?: string): string => {
    return addNotification({ type: 'error', title, message, persistent: true });
  };

  const warning = (title: string, message?: string): string => {
    return addNotification({ type: 'warning', title, message });
  };

  const info = (title: string, message?: string): string => {
    return addNotification({ type: 'info', title, message });
  };

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    preferences,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    updatePreferences,
    requestBrowserPermission,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};