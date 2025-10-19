/**
 * Reusable Error Message component for displaying errors in forms and pages
 */

import React from 'react';
import type { APIError } from '../../apis/client';

interface ErrorMessageProps {
  error?: APIError | Error | string | null;
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'inline' | 'banner';
  onRetry?: () => void;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  className = '',
  showIcon = true,
  variant = 'default',
  onRetry,
  onDismiss,
}) => {
  if (!error) return null;

  // Extract error message
  let message: string;
  let details: unknown = null;

  if (!error) {
    message = 'An unexpected error occurred';
  } else if (typeof error === 'string') {
    message = error;
  } else if ('message' in error) {
    if (typeof error.message === 'string') {
      message = error.message;
    } else if (typeof error.message === 'object' && error.message !== null) {
      // For nested message objects like { message: "Failed to fetch product", errors: null }
      message = (error.message.message as string) || JSON.stringify(error.message);
    } else {
      message = String(error.message);
    }

    if ('details' in error) {
      details = error.details;
    }
  } else {
    message = JSON.stringify(error);
  }


  // Base classes for different variants
  const baseClasses = {
    default: 'bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4',
    inline: 'text-red-600 dark:text-red-400 text-sm',
    banner: 'bg-red-600 dark:bg-red-800 text-white p-4 rounded-md',
  };

  const iconClasses = {
    default: 'text-red-400 dark:text-red-300',
    inline: 'text-red-600 dark:text-red-400',
    banner: 'text-white',
  };

  const textClasses = {
    default: 'text-red-800 dark:text-red-200',
    inline: 'text-red-600 dark:text-red-400',
    banner: 'text-white',
  };

  if (variant === 'inline') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {showIcon && (
          <svg
            className={`w-4 h-4 ${iconClasses[variant]}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span className={textClasses[variant]}>{message}</span>
      </div>
    );
  }

  return (
    <div className={`${baseClasses[variant]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {showIcon && (
            <svg
              className={`w-5 h-5 ${iconClasses[variant]}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${textClasses[variant]}`}>
            {message}
          </h3>
          
          {details && Array.isArray(details) && (
            <div className={`mt-2 text-sm ${textClasses[variant]}`}>
              <ul className="list-disc list-inside space-y-1">
                {details.map((detail: unknown, index: number) => (
                  <li key={index}>
                    {typeof detail === 'string' 
                      ? detail 
                      : (detail as { message?: string; field?: string }).message || (detail as { message?: string; field?: string }).field || JSON.stringify(detail)
                    }
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(onRetry || onDismiss) && (
            <div className="mt-4 flex space-x-3">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className={`text-sm font-medium ${
                    variant === 'banner' 
                      ? 'text-white hover:text-gray-200' 
                      : 'text-red-800 hover:text-red-900'
                  } underline`}
                >
                  Try Again
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className={`text-sm font-medium ${
                    variant === 'banner' 
                      ? 'text-white hover:text-gray-200' 
                      : 'text-red-800 hover:text-red-900'
                  } underline`}
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>

        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 ${
                  variant === 'banner'
                    ? 'text-white hover:bg-red-700'
                    : 'text-red-400 hover:bg-red-100'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;