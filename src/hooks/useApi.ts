/**
 * Custom hook for API calls with error handling and loading states
 */

import { useState, useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler';
import type { APIResponse, APIError } from '../apis/client';

interface UseApiOptions<T = unknown> {
  showErrorToast?: boolean;
  onError?: (error: APIError) => void;
  onSuccess?: (data: T) => void;
  mockData?: () => T | Promise<T>; // Function to provide mock data on API failure
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: APIError | null;
}

export const useApi = <T = unknown>(options: UseApiOptions<T> = {}) => {
  const { showErrorToast, onError, onSuccess, mockData } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const { handleError } = useErrorHandler({
    toastType: showErrorToast === false ? 'never' : 'mutation', // Default to mutation for general API calls, can be overridden
    onError: onError,
  });

  const execute = useCallback(async (apiCall: () => Promise<APIResponse<T>>): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();
      // console.log('API response:====', response);
      const data = response.data;

      if (options.onSuccess) {
        options.onSuccess(data);
      }

      setState({
        data,
        loading: false,
        error: null,
      });
      return data;

    } catch (error: unknown) {
      if (options.mockData) {
        try {
          const mock = await Promise.resolve(options.mockData());
          setState({
            data: mock,
            loading: false,
            error: null,
          });
          if (options.onSuccess) {
            options.onSuccess(mock);
          }
          return mock;
        } catch (mockError: unknown) {
          console.error('Failed to load mock data:', mockError);
          const apiError = handleError(error);
          setState({
            data: null,
            loading: false,
            error: apiError,
          });
          return null;
        }
      } else {
        const apiError = handleError(error);
        
        setState({
          data: null,
          loading: false,
          error: apiError,
        });

        return null;
      }
    }
  }, [handleError, mockData, onSuccess, showErrorToast]);

  const reset = useCallback(() => {
    setState({
      data: execute ? state.data : null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};

/**
 * Hook for API calls that return paginated data
 */
export const usePaginatedApi = <T = unknown>(options: UseApiOptions<PaginatedResponse<T>> = {}) => {
  const { showErrorToast, onError, onSuccess, mockData } = options;

  const [state, setState] = useState<UseApiState<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>>({
    data: null,
    loading: false,
    error: null,
  });

  const { handleError } = useErrorHandler({
    toastType: showErrorToast === false ? 'never' : 'mutation', // Default to mutation for paginated API calls, can be overridden
    onError: onError,
  });

  const execute = useCallback(async (
    apiCall: () => Promise<APIResponse<{
      data: T[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    }>>
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();
      const result = response.data;

      setState({
        data: result,
        loading: false,
        error: null,
      });

      if (options.onSuccess) {
        options.onSuccess(result);
      }

      return result;
    } catch (error: unknown) {
      if (options.mockData) {
        try {
          const mock = await Promise.resolve(options.mockData());
          setState({
            data: mock,
            loading: false,
            error: null,
          });
          if (options.onSuccess) {
            options.onSuccess(mock);
          }
          return mock;
        } catch (mockError: unknown) {
          console.error('Failed to load mock data:', mockError);
          const apiError = handleError(error);
          setState({
            data: null,
            loading: false,
            error: apiError,
          });
          return null;
        }
      } else {
        const apiError = handleError(error);
        
        setState({
          data: null,
          loading: false,
          error: apiError,
        });

        return null;
      }
    }
  }, [handleError, mockData, onSuccess, showErrorToast]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};

/**
 * Hook for mutation operations (POST, PUT, DELETE)
 */
export const useMutation = <TData = unknown, TVariables = unknown>(
  options: UseApiOptions<TData> = {}
) => {
  const { showErrorToast, onError, onSuccess, mockData } = options;

  const [state, setState] = useState<{
    loading: boolean;
    error: APIError | null;
  }>({
    loading: false,
    error: null,
  });

  const { handleError } = useErrorHandler({
    toastType: showErrorToast === false ? 'never' : 'always', // Always show toast for mutations by default
    onError: onError,
  });

  const mutate = useCallback(async (
    apiCall: (variables: TVariables) => Promise<APIResponse<TData>>,
    variables: TVariables
  ): Promise<TData | null> => {
    setState({ loading: true, error: null });

    try {
      const response = await apiCall(variables);
      const data = response.data;

      setState({
        loading: false,
        error: null,
      });

      if (options.onSuccess) {
        options.onSuccess(data);
      }

      return data;
    } catch (error: unknown) {
      if (options.mockData) {
        try {
          const mock = await Promise.resolve(options.mockData());
          setState({
            loading: false,
            error: null,
          });
          if (options.onSuccess) {
            options.onSuccess(mock);
          }
          return mock;
        } catch (mockError: unknown) {
          console.error('Failed to load mock data:', mockError);
          const apiError = handleError(error);
          setState({
            loading: false,
            error: apiError,
          });
          return null;
        }
      } else {
        const apiError = handleError(error);
        
                  setState({
                    loading: false,
                    error: apiError,
                  });
        
                  return null;
                }
              }
            }, [handleError, mockData, onSuccess, showErrorToast]);
  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
};

/**
 * Hook for file upload operations
 */
export const useFileUpload = (options: UseApiOptions<unknown> = {}) => {
  const { showErrorToast, onError, onSuccess, mockData } = options;

  const [state, setState] = useState<{
    loading: boolean;
    progress: number;
    error: APIError | null;
  }>({
    loading: false,
    progress: 0,
    error: null,
  });

  const { handleError } = useErrorHandler({
    toastType: showErrorToast === false ? 'never' : 'always', // Always show toast for file uploads by default
    onError: onError,
  });

  const upload = useCallback(async (
    apiCall: (file: File, onProgress?: (progress: number) => void) => Promise<APIResponse<unknown>>,
    file: File
  ) => {
    setState({ loading: true, progress: 0, error: null });

    try {
      const response = await apiCall(file, (progress) => {
        setState(prev => ({ ...prev, progress }));
      });

      setState({
        loading: false,
        progress: 100,
        error: null,
      });

      if (options.onSuccess) {
        options.onSuccess(response.data);
      }

      return response.data;
    } catch (error: unknown) {
      if (options.mockData) {
        try {
          const mock = await Promise.resolve(options.mockData());
          setState({
            loading: false,
            progress: 100,
            error: null,
          });
          if (options.onSuccess) {
            options.onSuccess(mock);
          }
          return mock;
        } catch (mockError: unknown) {
          console.error('Failed to load mock data:', mockError);
          const apiError = handleError(error);
          setState({
            loading: false,
            progress: 0,
            error: apiError,
          });
          return null;
        }
      } else {
        const apiError = handleError(error);
        
        setState({
          loading: false,
          progress: 0,
          error: apiError,
        });

        return null;
      }
    }
  }, [handleError, mockData, onSuccess, showErrorToast]);

  const reset = useCallback(() => {
    setState({
      loading: false,
      progress: 0,
      error: null,
    });
  }, []);

  return {
    ...state,
    upload,
    reset,
  };
};

export default useApi;