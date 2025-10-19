import React, { useMemo } from 'react';
import { cn } from '../../lib/utils';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ChevronsLeftIcon, 
  ChevronsRightIcon 
} from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  className?: string;
  showPageNumbers?: boolean;
  showPageSizeSelector?: boolean;
  showItemsInfo?: boolean;
  showFirstLast?: boolean;
  pageSizeOptions?: number[];
  variant?: 'default' | 'compact' | 'simple';
  loading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  className,
  showPageNumbers = true,
  showPageSizeSelector = false,
  showItemsInfo = true,
  showFirstLast = true,
  pageSizeOptions = [10, 25, 50, 100],
  variant = 'default',
  loading = false
}) => {
  const getPageNumbers = useMemo(() => {
    const pages = [];
    const maxPagesToShow = variant === 'compact' ? 3 : 7;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of page range
      let start = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
      let end = Math.min(totalPages - 1, currentPage + Math.floor(maxPagesToShow / 2));
      
      // Adjust if we're near the beginning or end
      if (start === 2 && end < totalPages - 1) {
        end = Math.min(totalPages - 1, start + maxPagesToShow - 3);
      }
      if (end === totalPages - 1 && start > 2) {
        start = Math.max(2, end - maxPagesToShow + 3);
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages, variant]);

  const itemsInfo = useMemo(() => {
    if (!totalItems) return null;
    
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    
    return {
      start: startItem,
      end: endItem,
      total: totalItems
    };
  }, [currentPage, pageSize, totalItems]);

  if (variant === 'simple') {
    return (
      <div className={cn('flex items-center justify-between', className)}>
        {showItemsInfo && itemsInfo && (
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{itemsInfo.start}</span> to{' '}
            <span className="font-medium">{itemsInfo.end}</span> of{' '}
            <span className="font-medium">{itemsInfo.total}</span> results
          </p>
        )}
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4', className)}>
      {/* Items info and page size selector */}
      <div className="flex items-center gap-4">
        {showItemsInfo && itemsInfo && (
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{itemsInfo.start}</span> to{' '}
            <span className="font-medium">{itemsInfo.end}</span> of{' '}
            <span className="font-medium">{itemsInfo.total}</span> results
          </p>
        )}
        
        {showPageSizeSelector && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm text-gray-700">
              Show:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={loading}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center">
        {showFirstLast && (
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || loading}
            className="p-2 rounded-md border border-gray-300 mr-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            aria-label="First page"
            title="First page"
          >
            <ChevronsLeftIcon size={16} />
          </button>
        )}
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="p-2 rounded-md border border-gray-300 mr-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Previous page"
          title="Previous page"
        >
          <ChevronLeftIcon size={16} />
        </button>

        {showPageNumbers && (
          <div className="flex items-center">
            {getPageNumbers.map((page, index) =>
              page < 0 ? (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  disabled={loading}
                  className={cn(
                    'w-10 h-10 mx-1 flex items-center justify-center rounded-md text-sm font-medium transition-colors',
                    currentPage === page
                      ? 'bg-primary text-white shadow-sm'
                      : 'border border-gray-300 hover:bg-gray-50 text-gray-700 disabled:opacity-50'
                  )}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="p-2 rounded-md border border-gray-300 ml-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Next page"
          title="Next page"
        >
          <ChevronRightIcon size={16} />
        </button>

        {showFirstLast && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || loading}
            className="p-2 rounded-md border border-gray-300 ml-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            aria-label="Last page"
            title="Last page"
          >
            <ChevronsRightIcon size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

// Compact pagination for mobile or tight spaces
export const CompactPagination: React.FC<PaginationProps> = (props) => (
  <Pagination {...props} variant="compact" showFirstLast={false} showPageSizeSelector={false} />
);

// Simple pagination with just prev/next
export const SimplePagination: React.FC<PaginationProps> = (props) => (
  <Pagination {...props} variant="simple" />
);