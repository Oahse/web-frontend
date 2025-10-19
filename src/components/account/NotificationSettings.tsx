import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
export const NotificationSettings: React.FC = () => {
  const {
    user,
    updateUserPreferences
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    email: user?.preferences?.notifications?.email ?? true,
    sms: user?.preferences?.notifications?.sms ?? false,
    whatsapp: user?.preferences?.notifications?.whatsapp ?? false,
    telegram: user?.preferences?.notifications?.telegram ?? false,
    browser: true,
    mobile: true
  });
  const [notificationTypes, setNotificationTypes] = useState({
    orderUpdates: true,
    promotions: true,
    productUpdates: true,
    newsletter: true,
    reminders: true
  });
  const handleNotificationChange = (channel: string) => {
    setNotifications({
      ...notifications,
      [channel]: !notifications[channel as keyof typeof notifications]
    });
  };
  const handleNotificationTypeChange = (type: string) => {
    setNotificationTypes({
      ...notificationTypes,
      [type]: !notificationTypes[type as keyof typeof notificationTypes]
    });
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserPreferences({
        notifications: {
          email: notifications.email,
          sms: notifications.sms,
          whatsapp: notifications.whatsapp,
          telegram: notifications.telegram
        }
      });
      toast.success('Notification preferences updated');
    } catch (error) {
      toast.error('Failed to update notification preferences');
    } finally {
      setLoading(false);
    }
  };
  return <div>
      <h1 className="text-2xl font-bold text-main dark:text-white mb-6">
        Notification Settings
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-main dark:text-white mb-4">
          Notification Channels
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Choose how you'd like to receive notifications from us.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                Email Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive notifications via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.email} onChange={() => handleNotificationChange('email')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                SMS Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive notifications via text message
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.sms} onChange={() => handleNotificationChange('sms')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                WhatsApp Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive notifications via WhatsApp
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.whatsapp} onChange={() => handleNotificationChange('whatsapp')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                Telegram Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive notifications via Telegram
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.telegram} onChange={() => handleNotificationChange('telegram')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                Browser Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive notifications in your browser
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.browser} onChange={() => handleNotificationChange('browser')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                Mobile App Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive push notifications on our mobile app
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.mobile} onChange={() => handleNotificationChange('mobile')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-main dark:text-white mb-4">
          Notification Types
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Select which types of notifications you'd like to receive.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                Order Updates
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Notifications about your orders and shipping
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notificationTypes.orderUpdates} onChange={() => handleNotificationTypeChange('orderUpdates')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                Promotions & Deals
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sales, discounts, and special offers
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notificationTypes.promotions} onChange={() => handleNotificationTypeChange('promotions')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                Product Updates
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                New products and restocks
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notificationTypes.productUpdates} onChange={() => handleNotificationTypeChange('productUpdates')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                Newsletter
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Monthly newsletter with tips and updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notificationTypes.newsletter} onChange={() => handleNotificationTypeChange('newsletter')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-main dark:text-white">
                Reminders
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Abandoned cart and wishlist reminders
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notificationTypes.reminders} onChange={() => handleNotificationTypeChange('reminders')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors flex items-center" onClick={handleSave} disabled={loading}>
          {loading ? <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </> : 'Save Preferences'}
        </button>
      </div>
    </div>;
};