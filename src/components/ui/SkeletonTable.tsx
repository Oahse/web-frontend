import React from 'react';
import { clsx } from 'clsx';
import { Skeleton, SkeletonText, SkeletonRectangle } from './Skeleton';

export interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  showActions?: boolean;
  className?: string;
  animation?: 'shimmer' | 'pulse' | 'wave';
  variant?: 'default' | 'compact' | 'detailed';
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  showActions = true,
  className,
  animation = 'shimmer',
  variant = 'default'
}) => {
  const tableClasses = 'w-full bg-surface border border-border rounded-lg overflow-hidden';
  const actualColumns = showActions ? columns + 1 : columns;

  const getCellWidth = (index: number) => {
    if (showActions && index === actualColumns - 1) return '80px'; // Actions column
    if (index === 0) return '25%'; // First column (usually ID or name)
    return `${75 / (actualColumns - (showActions ? 2 : 1))}%`; // Distribute remaining space
  };

  const renderHeaderRow = () => (
    <tr className="bg-background border-b border-border">
      {Array.from({ length: actualColumns }).map((_, index) => (
        <th key={index} className="px-4 py-3 text-left">
          <SkeletonText 
            width={getCellWidth(index)} 
            animation={animation}
            height="16px"
          />
        </th>
      ))}
    </tr>
  );

  const renderDataRow = (rowIndex: number) => (
    <tr key={rowIndex} className="border-b border-border-light last:border-b-0 hover:bg-background/50">
      {Array.from({ length: actualColumns }).map((_, colIndex) => (
        <td key={colIndex} className="px-4 py-3">
          {showActions && colIndex === actualColumns - 1 ? (
            // Actions column
            <div className="flex space-x-2">
              <SkeletonRectangle 
                width="24px" 
                height="24px" 
                animation={animation}
                rounded="sm"
              />
              <SkeletonRectangle 
                width="24px" 
                height="24px" 
                animation={animation}
                rounded="sm"
              />
            </div>
          ) : (
            // Data columns
            <SkeletonText 
              width={getCellWidth(colIndex)} 
              animation={animation}
              height={variant === 'compact' ? '14px' : '16px'}
            />
          )}
        </td>
      ))}
    </tr>
  );

  const renderDetailedRow = (rowIndex: number) => (
    <tr key={rowIndex} className="border-b border-border-light last:border-b-0">
      <td colSpan={actualColumns} className="px-4 py-4">
        <div className="flex items-center space-x-4">
          <Skeleton 
            variant="circular" 
            width="40px" 
            height="40px" 
            animation={animation} 
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <SkeletonText width="200px" animation={animation} />
              <SkeletonRectangle 
                width="60px" 
                height="20px" 
                rounded="full" 
                animation={animation} 
              />
            </div>
            <SkeletonText width="300px" animation={animation} height="14px" />
            <div className="flex items-center space-x-4">
              <SkeletonText width="80px" animation={animation} height="12px" />
              <SkeletonText width="100px" animation={animation} height="12px" />
              <SkeletonText width="60px" animation={animation} height="12px" />
            </div>
          </div>
          {showActions && (
            <div className="flex space-x-2">
              <SkeletonRectangle 
                width="32px" 
                height="32px" 
                animation={animation}
                rounded="md"
              />
              <SkeletonRectangle 
                width="32px" 
                height="32px" 
                animation={animation}
                rounded="md"
              />
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className={clsx(tableClasses, className)} role="status" aria-label="Loading table...">
      <table className="w-full">
        {showHeader && variant !== 'detailed' && (
          <thead>
            {renderHeaderRow()}
          </thead>
        )}
        <tbody>
          {Array.from({ length: rows }).map((_, index) => 
            variant === 'detailed' 
              ? renderDetailedRow(index)
              : renderDataRow(index)
          )}
        </tbody>
      </table>
    </div>
  );
};

// Specialized table skeletons
export const SkeletonProductTable: React.FC<Omit<SkeletonTableProps, 'columns'>> = (props) => (
  <SkeletonTable columns={5} {...props} />
);

export const SkeletonOrderTable: React.FC<Omit<SkeletonTableProps, 'columns'>> = (props) => (
  <SkeletonTable columns={6} variant="detailed" {...props} />
);

export const SkeletonUserTable: React.FC<Omit<SkeletonTableProps, 'columns'>> = (props) => (
  <SkeletonTable columns={4} {...props} />
);