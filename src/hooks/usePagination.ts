import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationActions {
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  reset: () => void;
}

export interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
  useUrlParams?: boolean;
  pageParam?: string;
  pageSizeParam?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface UsePaginationReturn extends PaginationState, PaginationActions {
  canGoNext: boolean;
  canGoPrev: boolean;
  startIndex: number;
  endIndex: number;
  isEmpty: boolean;
}

export const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
  totalItems = 0,
  useUrlParams = false,
  pageParam = 'page',
  pageSizeParam = 'pageSize',
  onPageChange,
  onPageSizeChange,
}: UsePaginationOptions = {}): UsePaginationReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial values from URL params if enabled
  const getInitialPage = useCallback(() => {
    if (useUrlParams) {
      const urlPage = searchParams.get(pageParam);
      return urlPage ? Math.max(1, parseInt(urlPage, 10)) : initialPage;
    }
    return initialPage;
  }, [useUrlParams, searchParams, pageParam, initialPage]);

  const getInitialPageSize = useCallback(() => {
    if (useUrlParams) {
      const urlPageSize = searchParams.get(pageSizeParam);
      return urlPageSize ? Math.max(1, parseInt(urlPageSize, 10)) : initialPageSize;
    }
    return initialPageSize;
  }, [useUrlParams, searchParams, pageSizeParam, initialPageSize]);

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [pageSize, setPageSizeState] = useState(getInitialPageSize);
  const [totalItemsState, setTotalItemsState] = useState(totalItems);

  // Update URL params when pagination changes
  const updateUrlParams = useCallback((page: number, size: number) => {
    if (useUrlParams) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(pageParam, page.toString());
      newParams.set(pageSizeParam, size.toString());
      setSearchParams(newParams, { replace: true });
    }
  }, [useUrlParams, searchParams, setSearchParams, pageParam, pageSizeParam]);

  // Computed values
  const totalPages = useMemo(() => {
    return Math.ceil(totalItemsState / pageSize);
  }, [totalItemsState, pageSize]);

  const canGoNext = useMemo(() => {
    return currentPage < totalPages;
  }, [currentPage, totalPages]);

  const canGoPrev = useMemo(() => {
    return currentPage > 1;
  }, [currentPage]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * pageSize;
  }, [currentPage, pageSize]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + pageSize - 1, totalItemsState - 1);
  }, [startIndex, pageSize, totalItemsState]);

  const isEmpty = useMemo(() => {
    return totalItemsState === 0;
  }, [totalItemsState]);

  // Actions
  const setPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    updateUrlParams(validPage, pageSize);
    onPageChange?.(validPage);
  }, [totalPages, pageSize, updateUrlParams, onPageChange]);

  const setPageSize = useCallback((size: number) => {
    const validSize = Math.max(1, size);
    setPageSizeState(validSize);
    
    // Adjust current page if necessary
    const newTotalPages = Math.ceil(totalItemsState / validSize);
    const newPage = Math.min(currentPage, newTotalPages || 1);
    
    setCurrentPage(newPage);
    updateUrlParams(newPage, validSize);
    onPageSizeChange?.(validSize);
  }, [currentPage, totalItemsState, updateUrlParams, onPageSizeChange]);

  const setTotalItems = useCallback((total: number) => {
    setTotalItemsState(Math.max(0, total));
    
    // Adjust current page if it's beyond the new total pages
    const newTotalPages = Math.ceil(total / pageSize);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setPage(newTotalPages);
    }
  }, [currentPage, pageSize, setPage]);

  const nextPage = useCallback(() => {
    if (canGoNext) {
      setPage(currentPage + 1);
    }
  }, [canGoNext, currentPage, setPage]);

  const prevPage = useCallback(() => {
    if (canGoPrev) {
      setPage(currentPage - 1);
    }
  }, [canGoPrev, currentPage, setPage]);

  const firstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const lastPage = useCallback(() => {
    if (totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages, setPage]);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSizeState(initialPageSize);
    setTotalItemsState(totalItems);
    if (useUrlParams) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(pageParam);
      newParams.delete(pageSizeParam);
      setSearchParams(newParams, { replace: true });
    }
  }, [initialPage, initialPageSize, totalItems, useUrlParams, searchParams, setSearchParams, pageParam, pageSizeParam]);

  // Update state when URL params change (browser back/forward)
  useEffect(() => {
    if (useUrlParams) {
      const urlPage = getInitialPage();
      const urlPageSize = getInitialPageSize();
      
      if (urlPage !== currentPage) {
        setCurrentPage(urlPage);
      }
      if (urlPageSize !== pageSize) {
        setPageSizeState(urlPageSize);
      }
    }
  }, [searchParams, useUrlParams, getInitialPage, getInitialPageSize, currentPage, pageSize]);

  // Update total items when prop changes
  useEffect(() => {
    setTotalItems(totalItems);
  }, [totalItems, setTotalItems]);

  return {
    // State
    currentPage,
    pageSize,
    totalItems: totalItemsState,
    totalPages,
    
    // Computed
    canGoNext,
    canGoPrev,
    startIndex,
    endIndex,
    isEmpty,
    
    // Actions
    setPage,
    setPageSize,
    setTotalItems,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    reset,
  };
};

// Helper hook for paginating arrays
export const usePaginatedData = <T>(
  data: T[],
  options?: Omit<UsePaginationOptions, 'totalItems'>
) => {
  const pagination = usePagination({
    ...options,
    totalItems: data.length,
  });

  const paginatedData = useMemo(() => {
    const start = pagination.startIndex;
    const end = start + pagination.pageSize;
    return data.slice(start, end);
  }, [data, pagination.startIndex, pagination.pageSize]);

  return {
    ...pagination,
    data: paginatedData,
    originalData: data,
  };
};