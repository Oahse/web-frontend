/**
 * Error handling hook for consistent error management across components
 */

import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import type { APIError } from '../apis/client';

type ToastType = 'always' | 'never' | 'mutation';

interface ErrorHandlerOptions {
  toastType?: ToastType;
  logError?: boolean;
  fallbackMessage?: string;
  onError?: (error: APIError) => void;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const {
    toastType = 'always',
    logError = true,
    fallbackMessage = 'An unexpected error occurred',
    onError
  } = options;

  const handleError = useCallback((error: any) => {
    let apiError: APIError;

    // Convert different error types to APIError format
    if (error?.error && error?.message) {
      // Already an APIError
      apiError = error;
    } else if (error?.response?.data) {
      // Axios error with response
      apiError = {
        error: true,
        message: error.response.data.message || error.response.data.detail || fallbackMessage,
        details: error.response.data.details,
        status: error.response.status,
        timestamp: error.response.data.timestamp,
        path: error.response.data.path,
      };
    } else if (error?.message) {
      // Standard Error object
      apiError = {
        error: true,
        message: error.message,
        status: 500,
      };
    } else {
      // Unknown error format
      apiError = {
        error: true,
        message: fallbackMessage,
        status: 500,
      };
    }

    // Log error if enabled
    if (logError) {
      console.error('Error handled:', {
        message: apiError.message,
        status: apiError.status,
        details: apiError.details,
        timestamp: apiError.timestamp,
        path: apiError.path,
        originalError: error,
      });
    }

    // Show toast notification based on toastType
    // if (toastType === 'always' || (toastType === 'mutation' && apiError.error)) {
    //   const message = getErrorMessage(apiError);
    //   toast.error(message);
    // }

    // Call custom error handler if provided
    if (onError) {
      onError(apiError);
    }

    return apiError;
  }, [toastType, logError, fallbackMessage, onError]);

  return { handleError };
};

/**
 * Get user-friendly error message based on error details
 */
const getErrorMessage = (error: APIError): string => {
  const status = error.status;
  const message = error.message;

  // Customize messages based on status codes
  switch (status) {
    case 400:
      if (error.details && Array.isArray(error.details)) {
        // Validation errors
        const validationErrors = error.details as Array<{ field: string; message: string }>;
        if (validationErrors.length === 1) {
          return validationErrors[0].message;
        } else if (validationErrors.length > 1) {
          return `Please check: ${validationErrors.map(e => e.field).join(', ')}`;
        }
      }
      return message || 'Invalid request. Please check your input.';
    
    case 401:
      return 'Please log in to continue.';
    
    case 403:
      return 'You don\'t have permission to perform this action.';
    
    case 404:
      return 'The requested resource was not found.';
    
    case 409:
      return message || 'This action conflicts with existing data.';
    
    case 422:
      if (error.details && Array.isArray(error.details)) {
        const validationErrors = error.details as Array<{ field: string; message: string }>;
        if (validationErrors.length === 1) {
          return validationErrors[0].message;
        }
      }
      return message || 'Please check your input and try again.';
    
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    
    case 500:
      return 'Server error. Please try again later.';
    
    case 502:
    case 503:
    case 504:
      return 'Service temporarily unavailable. Please try again later.';
    
    default:
      if (status && status >= 500) {
        return 'Server error. Please try again later.';
      }
      return message || 'An unexpected error occurred.';
  }
};

/**
 * Hook for handling async operations with error handling
 */
export const useAsyncError = (options: ErrorHandlerOptions = {}) => {
  const { handleError } = useErrorHandler(options);

  const executeAsync = useCallback(async <T>(
    asyncFn: () => Promise<T>,
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error);
      return null;
    }
  }, [handleError]);

  return { executeAsync, handleError };
};

/**
 * Hook for form error handling
 */
export const useFormErrorHandler = () => {
  const { handleError } = useErrorHandler(); // Call at top level

  const handleFormError = useCallback((error: any, setFieldError?: (field: string, message: string) => void) => {
    if (error?.details && Array.isArray(error.details) && setFieldError) {
      // Handle validation errors by setting field-specific errors
      error.details.forEach((validationError: { field: string; message: string }) => {
        setFieldError(validationError.field, validationError.message);
      });
    } else {
      // Show general error toast
      handleError(error); // Use the top-level handleError
    }
  }, [handleError]); // Add handleError to dependencies


  return { handleFormError };
};

export default useErrorHandler;