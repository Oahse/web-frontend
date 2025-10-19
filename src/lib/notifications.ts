export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
  timestamp: Date;
  read?: boolean;
  category?: string;
  data?: any;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface NotificationChannel {
  id: string;
  name: string;
  enabled: boolean;
  types: NotificationType[];
  settings: {
    email?: boolean;
    push?: boolean;
    inApp?: boolean;
    sms?: boolean;
  };
}

export interface NotificationPreferences {
  channels: NotificationChannel[];
  globalEnabled: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string;   // HH:mm format
  };
  categories: {
    [key: string]: {
      enabled: boolean;
      channels: string[];
    };
  };
}

// Default notification channels
export const defaultChannels: NotificationChannel[] = [
  {
    id: 'orders',
    name: 'Order Updates',
    enabled: true,
    types: ['info', 'success'],
    settings: {
      email: true,
      push: true,
      inApp: true,
      sms: false,
    },
  },
  {
    id: 'promotions',
    name: 'Promotions & Offers',
    enabled: true,
    types: ['info'],
    settings: {
      email: true,
      push: false,
      inApp: true,
      sms: false,
    },
  },
  {
    id: 'security',
    name: 'Security Alerts',
    enabled: true,
    types: ['warning', 'error'],
    settings: {
      email: true,
      push: true,
      inApp: true,
      sms: true,
    },
  },
  {
    id: 'system',
    name: 'System Updates',
    enabled: true,
    types: ['info', 'warning'],
    settings: {
      email: false,
      push: true,
      inApp: true,
      sms: false,
    },
  },
];

// Notification service class
export class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];
  private preferences: NotificationPreferences;

  constructor() {
    this.preferences = this.loadPreferences();
    this.loadNotifications();
  }

  // Add a new notification
  add(notification: Omit<Notification, 'id' | 'timestamp'>): string {
    const id = this.generateId();
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      read: false,
    };

    this.notifications.unshift(newNotification);
    this.saveNotifications();
    this.notifyListeners();

    // Auto-remove non-persistent notifications
    if (!notification.persistent) {
      const duration = notification.duration || this.getDefaultDuration(notification.type);
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }

    return id;
  }

  // Remove a notification
  remove(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.saveNotifications();
    this.notifyListeners();
  }

  // Mark notification as read
  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.saveNotifications();
      this.notifyListeners();
    }
  }

  // Mark all notifications as read
  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.saveNotifications();
    this.notifyListeners();
  }

  // Get all notifications
  getAll(): Notification[] {
    return [...this.notifications];
  }

  // Get unread notifications
  getUnread(): Notification[] {
    return this.notifications.filter(n => !n.read);
  }

  // Get notifications by category
  getByCategory(category: string): Notification[] {
    return this.notifications.filter(n => n.category === category);
  }

  // Clear all notifications
  clear(): void {
    this.notifications = [];
    this.saveNotifications();
    this.notifyListeners();
  }

  // Subscribe to notification changes
  subscribe(listener: (notifications: Notification[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notification preferences
  getPreferences(): NotificationPreferences {
    return { ...this.preferences };
  }

  updatePreferences(preferences: Partial<NotificationPreferences>): void {
    this.preferences = { ...this.preferences, ...preferences };
    this.savePreferences();
  }

  // Check if notifications are allowed for a channel
  isChannelEnabled(channelId: string): boolean {
    const channel = this.preferences.channels.find(c => c.id === channelId);
    return channel?.enabled ?? false;
  }

  // Check if we're in quiet hours
  isQuietHours(): boolean {
    if (!this.preferences.quietHours.enabled) return false;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const { start, end } = this.preferences.quietHours;
    
    if (start <= end) {
      return currentTime >= start && currentTime <= end;
    } else {
      // Quiet hours span midnight
      return currentTime >= start || currentTime <= end;
    }
  }

  // Convenience methods for different notification types
  success(title: string, message?: string, options?: Partial<Notification>): string {
    return this.add({
      type: 'success',
      title,
      message,
      ...options,
    });
  }

  error(title: string, message?: string, options?: Partial<Notification>): string {
    return this.add({
      type: 'error',
      title,
      message,
      persistent: true, // Errors should be persistent by default
      ...options,
    });
  }

  warning(title: string, message?: string, options?: Partial<Notification>): string {
    return this.add({
      type: 'warning',
      title,
      message,
      ...options,
    });
  }

  info(title: string, message?: string, options?: Partial<Notification>): string {
    return this.add({
      type: 'info',
      title,
      message,
      ...options,
    });
  }

  // Private methods
  private generateId(): string {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDefaultDuration(type: NotificationType): number {
    const durations = {
      success: 4000,
      info: 5000,
      warning: 6000,
      error: 8000,
    };
    return durations[type];
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  private loadNotifications(): void {
    try {
      const stored = localStorage.getItem('banwee_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.notifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  }

  private saveNotifications(): void {
    try {
      // Only keep last 100 notifications
      const toSave = this.notifications.slice(0, 100);
      localStorage.setItem('banwee_notifications', JSON.stringify(toSave));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }

  private loadPreferences(): NotificationPreferences {
    try {
      const stored = localStorage.getItem('banwee_notification_preferences');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load notification preferences:', error);
    }

    // Return default preferences
    return {
      channels: defaultChannels,
      globalEnabled: true,
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00',
      },
      categories: {
        orders: { enabled: true, channels: ['orders'] },
        promotions: { enabled: true, channels: ['promotions'] },
        security: { enabled: true, channels: ['security'] },
        system: { enabled: true, channels: ['system'] },
      },
    };
  }

  private savePreferences(): void {
    try {
      localStorage.setItem('banwee_notification_preferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save notification preferences:', error);
    }
  }
}

// Global notification service instance
export const notificationService = new NotificationService();

// Browser notification API integration
export class BrowserNotificationService {
  private static instance: BrowserNotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.permission = Notification.permission;
  }

  static getInstance(): BrowserNotificationService {
    if (!BrowserNotificationService.instance) {
      BrowserNotificationService.instance = new BrowserNotificationService();
    }
    return BrowserNotificationService.instance;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
      return this.permission;
    }
    return 'denied';
  }

  canShowNotifications(): boolean {
    return 'Notification' in window && this.permission === 'granted';
  }

  show(title: string, options?: NotificationOptions): Notification | null {
    if (!this.canShowNotifications()) {
      return null;
    }

    const notification = new Notification(title, {
      icon: '/favicon-32x32.png',
      badge: '/favicon-16x16.png',
      ...options,
    });

    // Auto-close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);

    return notification;
  }
}

export const browserNotificationService = BrowserNotificationService.getInstance();