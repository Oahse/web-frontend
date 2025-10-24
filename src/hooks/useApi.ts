/**
 * Enhanced API hooks with unified functionality
 * Combines the original useApi with unified API patterns
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { apiClient, API_CONFIG } from '../apis/client';
import type { ApiResponse, ApiError, PaginatedResponse, User, Product, Order, Review, BlogPost, Cart, Address, Wishlist, PaymentMethod } from '../types';

interface UseApiOptions<T = unknown> {
  showErrorToast?: boolean;
  onError?: (error: ApiError) => void;
  onSuccess?: (data: T) => void;
  mockData?: () => T | Promise<T>;
  autoFetch?: boolean; // Auto-fetch on mount
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UsePaginatedApiState<T> {
  data: T[];
  loading: boolean;
  error: ApiError | null;
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  } | null;
}

interface UseMutationState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

/**
 * Enhanced useApi hook with auto-fetch capability
 */
export const useApi = <T = unknown>(
  apiCall?: () => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) => {
  const { showErrorToast, onError, onSuccess, mockData, autoFetch = false } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: autoFetch && !!apiCall,
    error: null,
  });

  const { handleError } = useErrorHandler({
    toastType: showErrorToast === false ? 'never' : 'mutation',
    onError: onError,
  });

  const execute = useCallback(async (customApiCall?: () => Promise<ApiResponse<T>>): Promise<T | null> => {
    const callToExecute = customApiCall || apiCall;
    if (!callToExecute) return null;

    setState(prev => ({ ...prev, loading: true, error: null }));

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), API_CONFIG.timeout)
    );

    try {
      const response = await Promise.race([
        callToExecute(),
        timeoutPromise
      ]);
      const data = response.data;

      if (onSuccess) {
        onSuccess(data);
      }

      setState({
        data,
        loading: false,
        error: null,
      });
      return data;

    } catch (error: unknown) {
      if (mockData) {
        try {
          const mock = await Promise.resolve(mockData());
          setState({
            data: mock,
            loading: false,
            error: null,
          });
          if (onSuccess) {
            onSuccess(mock);
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
  }, [apiCall, handleError, mockData, onSuccess]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && apiCall) {
      execute();
    }
  }, [autoFetch, apiCall, execute]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const refetch = useCallback(() => {
    if (apiCall) {
      return execute();
    }
    return Promise.resolve(null);
  }, [execute, apiCall]);

  return {
    ...state,
    execute,
    reset,
    refetch,
  };
};

/**
 * Enhanced hook for paginated API calls
 */
export const usePaginatedApi = <T = unknown>(
  apiCall?: (page: number, limit: number) => Promise<ApiResponse<PaginatedResponse<T>>>,
  initialPage = 1,
  initialLimit = 20,
  options: UseApiOptions<PaginatedResponse<T>> = {}
) => {
  const { showErrorToast, onError, onSuccess, mockData, autoFetch = false } = options;

  const [state, setState] = useState<UsePaginatedApiState<T>>({
    data: [],
    loading: autoFetch && !!apiCall,
    error: null,
    pagination: null,
  });

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const { handleError } = useErrorHandler({
    toastType: showErrorToast === false ? 'never' : 'mutation',
    onError: onError,
  });

  const prevApiCall = useRef(apiCall);

  useEffect(() => {
    if (prevApiCall.current !== apiCall) {
      setPage(initialPage);
      prevApiCall.current = apiCall;
    }
  }, [apiCall, initialPage]);

  const execute = useCallback(async (
    customApiCall?: (page: number, limit: number) => Promise<ApiResponse<PaginatedResponse<T>>>,
    pageNum?: number,
    limitNum?: number
  ) => {
    const callToExecute = customApiCall || apiCall;
    if (!callToExecute) return null;

    const currentPage = pageNum ?? page;
    const currentLimit = limitNum ?? limit;

    setState(prev => ({ ...prev, loading: true, error: null }));

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), API_CONFIG.timeout)
    );

    try {
      const response = await Promise.race([
        callToExecute(currentPage, currentLimit),
        timeoutPromise
      ]);
      const result = response.data;

      setState({
        data: result.data,
        loading: false,
        error: null,
        pagination: {
          page: result.page,
          per_page: result.per_page,
          total: result.total,
          total_pages: result.total_pages,
        },
      });

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (error: unknown) {
      if (mockData) {
        try {
          const mock = await Promise.resolve(mockData());
          setState({
            data: mock.data,
            loading: false,
            error: null,
            pagination: {
              page: mock.page,
              per_page: mock.per_page,
              total: mock.total,
              total_pages: mock.total_pages,
            },
          });
          if (onSuccess) {
            onSuccess(mock);
          }
          return mock;
        } catch (mockError: unknown) {
          console.error('Failed to load mock data:', mockError);
          const apiError = handleError(error);
          setState({
            data: [],
            loading: false,
            error: apiError,
            pagination: null,
          });
          return null;
        }
      } else {
        const apiError = handleError(error);
        
        setState({
          data: [],
          loading: false,
          error: apiError,
          pagination: null,
        });

        return null;
      }
    }
  }, [apiCall, page, limit, handleError, mockData, onSuccess]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch && apiCall) {
      execute();
    }
  }, [autoFetch, execute, apiCall]);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
    if (apiCall) {
      execute(undefined, newPage, limit);
    }
  }, [execute, apiCall, limit]);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    if (apiCall) {
      execute(undefined, 1, newLimit);
    }
  }, [execute, apiCall]);

  const reset = useCallback(() => {
    setState({
      data: [],
      loading: false,
      error: null,
      pagination: null,
    });
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  const refetch = useCallback(() => {
    if (apiCall) {
      return execute(undefined, page, limit);
    }
    return Promise.resolve(null);
  }, [execute, apiCall, page, limit]);

  return {
    ...state,
    page,
    limit,
    execute,
    goToPage,
    changeLimit,
    reset,
    refetch,
  };
};

/**
 * Enhanced hook for mutation operations (POST, PUT, DELETE)
 */
export const useMutation = <TData = unknown, TVariables = unknown>(
  mutationFn?: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options: UseApiOptions<TData> = {}
) => {
  const { showErrorToast, onError, onSuccess, mockData } = options;

  const [state, setState] = useState<UseMutationState<TData>>({
    data: null,
    loading: false,
    error: null,
  });

  const { handleError } = useErrorHandler({
    toastType: showErrorToast === false ? 'never' : 'always',
    onError: onError,
  });

  const mutate = useCallback(async (
    customMutationFn?: (variables: TVariables) => Promise<ApiResponse<TData>>,
    variables?: TVariables
  ): Promise<TData | null> => {
    const fnToExecute = customMutationFn || mutationFn;
    if (!fnToExecute || variables === undefined) return null;

    setState({ data: null, loading: true, error: null });

    try {
      const response = await fnToExecute(variables);
      const data = response.data;

      setState({
        data,
        loading: false,
        error: null,
      });

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (error: unknown) {
      if (mockData) {
        try {
          const mock = await Promise.resolve(mockData());
          setState({
            data: mock,
            loading: false,
            error: null,
          });
          if (onSuccess) {
            onSuccess(mock);
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
  }, [mutationFn, handleError, mockData, onSuccess]);

  const reset = useCallback(() => {
    setState({
      data: null,
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
    error: ApiError | null;
  }>({
    loading: false,
    progress: 0,
    error: null,
  });

  const { handleError } = useErrorHandler({
    toastType: showErrorToast === false ? 'never' : 'always',
    onError: onError,
  });

  const upload = useCallback(async (
    apiCall: (file: File, onProgress?: (progress: number) => void) => Promise<ApiResponse<unknown>>,
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

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (error: unknown) {
      if (mockData) {
        try {
          const mock = await Promise.resolve(mockData());
          setState({
            loading: false,
            progress: 100,
            error: null,
          });
          if (onSuccess) {
            onSuccess(mock);
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
  }, [handleError, mockData, onSuccess]);

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

// ==================== SPECIFIC API HOOKS ====================

// Auth hooks
export const useLogin = (options?: UseApiOptions) => {
  return useMutation(apiClient.login, options);
};

export const useRegister = (options?: UseApiOptions) => {
  return useMutation(apiClient.register, options);
};

export const useLogout = (options?: UseApiOptions) => {
  return useMutation(() => apiClient.logout(), options);
};

// User hooks
export const useCurrentUser = (options?: UseApiOptions<User>) => {
  return useApi(() => apiClient.getCurrentUser(), { ...options, autoFetch: true });
};

export const useUpdateProfile = (options?: UseApiOptions) => {
  return useMutation(apiClient.updateProfile, options);
};

// Product hooks
export const useProducts = (filters?: Parameters<typeof apiClient.getProducts>[0], options?: UseApiOptions) => {
  return useApi(() => apiClient.getProducts(filters), options);
};

export const useProduct = (id: number | string, options?: UseApiOptions<Product>) => {
  return useApi(() => apiClient.getProduct(id), { ...options, autoFetch: !!id });
};

export const useProductWithDetails = (id: number | string, options?: UseApiOptions<Product>) => {
  return useApi(() => apiClient.getProductWithDetails(id), { ...options, autoFetch: !!id });
};

export const useFeaturedProducts = (limit = 10, options?: UseApiOptions<Product[]>) => {
  return useApi(() => apiClient.getFeaturedProducts(limit), { ...options, autoFetch: true });
};

// Cart hooks
export const useCart = (options?: UseApiOptions<Cart>) => {
  return useApi(() => apiClient.getCart(), { ...options, autoFetch: true });
};

export const useAddToCart = (options?: UseApiOptions) => {
  return useMutation(({ variantId, quantity }: { variantId: number; quantity: number }) =>
    apiClient.addToCart(variantId, quantity), options
  );
};

export const useUpdateCartItem = (options?: UseApiOptions) => {
  return useMutation(({ itemId, quantity }: { itemId: number; quantity: number }) =>
    apiClient.updateCartItem(itemId, quantity), options
  );
};

export const useRemoveFromCart = (options?: UseApiOptions) => {
  return useMutation((itemId: number) => apiClient.removeFromCart(itemId), options);
};

// Order hooks
export const useOrders = (filters?: Parameters<typeof apiClient.getOrders>[0], options?: UseApiOptions<PaginatedResponse<Order>>) => {
  return usePaginatedApi(
    (page, limit) => apiClient.getOrders({ ...filters, page, limit }) as Promise<ApiResponse<PaginatedResponse<Order>>>,
    1,
    20,
    options
  );
};

export const useOrder = (id: string, options?: UseApiOptions<Order>) => {
  return useApi(() => apiClient.getOrder(id), { ...options, autoFetch: !!id });
};

export const useCreateOrder = (options?: UseApiOptions) => {
  return useMutation(apiClient.createOrder, options);
};

// Address hooks
export const useAddresses = (options?: UseApiOptions<Address[]>) => {
  return useApi(() => apiClient.getUserAddresses(), { ...options, autoFetch: true });
};

export const useCreateAddress = (options?: UseApiOptions) => {
  return useMutation(apiClient.createAddress, options);
};

export const useUpdateAddress = (options?: UseApiOptions) => {
  return useMutation(({ id, updates }: { id: number; updates: Parameters<typeof apiClient.updateAddress>[1] }) =>
    apiClient.updateAddress(id, updates), options
  );
};

export const useDeleteAddress = (options?: UseApiOptions) => {
  return useMutation((id: number) => apiClient.deleteAddress(id), options);
};

// Wishlist hooks
export const useWishlists = (options?: UseApiOptions<Wishlist[]>) => {
  return useApi(() => apiClient.getWishlists(), { ...options, autoFetch: true });
};

export const useWishlist = (id: number, options?: UseApiOptions<Wishlist>) => {
  return useApi(() => apiClient.getWishlist(id), { ...options, autoFetch: !!id });
};

export const useAddToWishlist = (options?: UseApiOptions) => {
  return useMutation(({ wishlistId, productId, quantity }: { 
    wishlistId: number; 
    productId: number; 
    quantity?: number;
  }) => apiClient.addToWishlist(wishlistId, productId, quantity), options);
};

// Review hooks
export const useProductReviews = (productId: number, page = 1, limit = 10, options?: UseApiOptions<PaginatedResponse<Review>>) => {
  return usePaginatedApi(
    (p, l) => apiClient.getProductReviews(productId, p, l) as Promise<ApiResponse<PaginatedResponse<Review>>>,
    page,
    limit,
    options
  );
};

export const useCreateReview = (options?: UseApiOptions) => {
  return useMutation(apiClient.createReview, options);
};

// Payment hooks
export const usePaymentMethods = (options?: UseApiOptions<PaymentMethod[]>) => {
  return useApi(() => apiClient.getPaymentMethods(), { ...options, autoFetch: true });
};

export const useCreatePaymentMethod = (options?: UseApiOptions) => {
  return useMutation(apiClient.createPaymentMethod, options);
};

// Blog hooks
export const useBlogPosts = (page = 1, limit = 10, options?: UseApiOptions<PaginatedResponse<BlogPost>>) => {
  return usePaginatedApi(
    (p, l) => apiClient.getBlogPosts(p, l) as Promise<ApiResponse<PaginatedResponse<BlogPost>>>,
    page,
    limit,
    options
  );
};

export const useBlogPost = (id: string, options?: UseApiOptions<BlogPost>) => {
  return useApi(() => apiClient.getBlogPost(id), { ...options, autoFetch: !!id });
};

export const useFeaturedBlogPosts = (limit = 5, options?: UseApiOptions<BlogPost[]>) => {
  return useApi(() => apiClient.getFeaturedBlogPosts(limit), { ...options, autoFetch: true });
};

export default useApi;