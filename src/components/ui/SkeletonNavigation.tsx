import React from 'react';
import { clsx } from 'clsx';
import { Skeleton, SkeletonText, SkeletonRectangle } from './Skeleton';

export interface SkeletonNavigationProps {
  variant?: 'header' | 'sidebar' | 'breadcrumb' | 'tabs' | 'pagination';
  items?: number;
  showLogo?: boolean;
  showSearch?: boolean;
  showProfile?: boolean;
  className?: string;
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const SkeletonNavigation: React.FC<SkeletonNavigationProps> = ({
  variant = 'header',
  items = 5,
  showLogo = true,
  showSearch = true,
  showProfile = true,
  className,
  animation = 'shimmer'
}) => {
  if (variant === 'header') {
    return (
      <div 
        className={clsx(
          'bg-surface border-b border-border px-4 py-3',
          className
        )} 
        role="status" 
        aria-label="Loading navigation..."
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {showLogo && (
              <SkeletonRectangle width="120px" height="32px" animation={animation} />
            )}
            <div className="hidden md:flex items-center space-x-4">
              {Array.from({ length: items }).map((_, index) => (
                <SkeletonText key={index} width="80px" animation={animation} />
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {showSearch && (
              <SkeletonRectangle width="200px" height="36px" animation={animation} />
            )}
            <div className="flex items-center space-x-3">
              <Skeleton variant="circular" width="24px" height="24px" animation={animation} />
              <Skeleton variant="circular" width="24px" height="24px" animation={animation} />
              {showProfile && (
                <Skeleton variant="circular" width="32px" height="32px" animation={animation} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div 
        className={clsx(
          'bg-surface border-r border-border w-64 p-4 space-y-4',
          className
        )} 
        role="status" 
        aria-label="Loading sidebar..."
      >
        {showLogo && (
          <SkeletonRectangle width="150px" height="40px" animation={animation} />
        )}
        
        <div className="space-y-2">
          {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3 p-2">
              <Skeleton variant="circular" width="20px" height="20px" animation={animation} />
              <SkeletonText width="100px" animation={animation} />
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-border-light">
          <div className="flex items-center space-x-3 p-2">
            <Skeleton variant="circular" width="32px" height="32px" animation={animation} />
            <div className="space-y-1">
              <SkeletonText width="80px" animation={animation} />
              <SkeletonText width="60px" height="12px" animation={animation} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'breadcrumb') {
    return (
      <div 
        className={clsx('flex items-center space-x-2 py-2', className)} 
        role="status" 
        aria-label="Loading breadcrumb..."
      >
        {Array.from({ length: Math.min(items, 4) }).map((_, index) => (
          <React.Fragment key={index}>
            <SkeletonText width="60px" animation={animation} />
            {index < Math.min(items, 4) - 1 && (
              <Skeleton width="4px" height="4px" variant="circular" animation={animation} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (variant === 'tabs') {
    return (
      <div 
        className={clsx(
          'border-b border-border bg-surface',
          className
        )} 
        role="status" 
        aria-label="Loading tabs..."
      >
        <div className="flex items-center space-x-6 px-4">
          {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="py-3">
              <SkeletonText width="80px" animation={animation} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'pagination') {
    return (
      <div 
        className={clsx(
          'flex items-center justify-between py-4',
          className
        )} 
        role="status" 
        aria-label="Loading pagination..."
      >
        <SkeletonText width="120px" animation={animation} />
        
        <div className="flex items-center space-x-2">
          <SkeletonRectangle width="32px" height="32px" animation={animation} />
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonRectangle 
              key={index} 
              width="32px" 
              height="32px" 
              animation={animation} 
            />
          ))}
          <SkeletonRectangle width="32px" height="32px" animation={animation} />
        </div>
        
        <SkeletonText width="100px" animation={animation} />
      </div>
    );
  }

  // Default navigation
  return (
    <div 
      className={clsx('flex items-center space-x-4 p-4', className)} 
      role="status" 
      aria-label="Loading navigation..."
    >
      {Array.from({ length: items }).map((_, index) => (
        <SkeletonText key={index} width="80px" animation={animation} />
      ))}
    </div>
  );
};

// Specialized navigation skeletons
export const SkeletonHeader: React.FC<Omit<SkeletonNavigationProps, 'variant'>> = (props) => (
  <SkeletonNavigation variant="header" {...props} />
);

export const SkeletonSidebar: React.FC<Omit<SkeletonNavigationProps, 'variant'>> = (props) => (
  <SkeletonNavigation variant="sidebar" {...props} />
);

export const SkeletonBreadcrumb: React.FC<Omit<SkeletonNavigationProps, 'variant'>> = (props) => (
  <SkeletonNavigation variant="breadcrumb" {...props} />
);

export const SkeletonTabs: React.FC<Omit<SkeletonNavigationProps, 'variant'>> = (props) => (
  <SkeletonNavigation variant="tabs" {...props} />
);

export const SkeletonPagination: React.FC<Omit<SkeletonNavigationProps, 'variant'>> = (props) => (
  <SkeletonNavigation variant="pagination" {...props} />
);