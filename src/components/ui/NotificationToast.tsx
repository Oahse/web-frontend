import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  AlertTriangleIcon, 
  InfoIcon, 
  XIcon 
} from 'lucide-react';
import { Notification } from '../../lib/notifications';
import { cn } from '../../lib/utils';

interface NotificationToastProps {
  notification: Notification;
  onClose: (id: string) => void;
  onAction?: (action: () => void) => void;
}

const iconMap = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: AlertTriangleIcon,
  info: InfoIcon,
};

const colorMap = {
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    title: 'text-green-900',
    message: 'text-green-700',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    title: 'text-red-900',
    message: 'text-red-700',
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-600',
    title: 'text-yellow-900',
    message: 'text-yellow-700',
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-900',
    message: 'text-blue-700',
  },
};

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
  onAction,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = iconMap[notification.type];
  const colors = colorMap[notification.type];

  useEffect(() => {
    if (!notification.persistent && notification.duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification, handleClose]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(notification.id), 300);
  }, [setIsVisible, onClose, notification.id]);

  const handleActionClick = (action: () => void) => {
    if (onAction) {
      onAction(action);
    } else {
      action();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'max-w-sm w-full border rounded-lg shadow-lg pointer-events-auto',
            colors.bg
          )}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Icon className={cn('h-5 w-5', colors.icon)} />
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className={cn('text-sm font-medium', colors.title)}>
                  {notification.title}
                </p>
                {notification.message && (
                  <p className={cn('mt-1 text-sm', colors.message)}>
                    {notification.message}
                  </p>
                )}
                {notification.actions && notification.actions.length > 0 && (
                  <div className="mt-3 flex space-x-2">
                    {notification.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleActionClick(action.action)}
                        className={cn(
                          'text-xs font-medium px-3 py-1 rounded-md transition-colors',
                          action.style === 'primary' && 'bg-primary text-white hover:bg-primary-dark',
                          action.style === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
                          (!action.style || action.style === 'secondary') && 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        )}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={handleClose}
                  className={cn(
                    'rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                    colors.message
                  )}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface NotificationContainerProps {
  notifications: Notification[];
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxNotifications?: number;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onClose,
  position = 'top-right',
  maxNotifications = 5,
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const visibleNotifications = notifications
    .filter(n => !n.persistent || n.type === 'error')
    .slice(0, maxNotifications);

  return (
    <div
      className={cn(
        'fixed z-50 pointer-events-none',
        positionClasses[position]
      )}
    >
      <div className="flex flex-col space-y-3">
        <AnimatePresence>
          {visibleNotifications.map((notification) => (
            <NotificationToast
              key={notification.id}
              notification={notification}
              onClose={onClose}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};