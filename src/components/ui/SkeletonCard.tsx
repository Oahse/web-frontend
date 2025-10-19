import React from 'react';
import { clsx } from 'clsx';
import { Skeleton, SkeletonText, SkeletonRectangle } from './Skeleton';

export interface SkeletonCardProps {
  variant?: 'product' | 'user' | 'order' | 'dashboard';
  showImage?: boolean;
  showActions?: boolean;
  className?: string;
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  variant = 'product',
  showImage = true,
  showActions = true,
  className,
  animation = 'shimmer'
}) => {
  const cardClasses = 'bg-surface border border-border rounded-lg p-4 space-y-4';

  if (variant === 'product') {
    return (
      <div className={clsx(cardClasses, className)} role="status" aria-label="Loading product...">
        {showImage && (
          <SkeletonRectangle 
            height="200px" 
            animation={animation}
            className="w-full"
          />
        )}
        <div className="space-y-3">
          <SkeletonText lines={2} animation={animation} />
          <div className="flex items-center justify-between">
            <SkeletonText width="60px" animation={animation} />
            <SkeletonText width="80px" animation={animation} />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton variant="circular" width="16px" height="16px" animation={animation} />
            <SkeletonText width="100px" animation={animation} />
          </div>
          {showActions && (
            <div className="flex space-x-2 pt-2">
              <SkeletonRectangle height="36px" className="flex-1" animation={animation} />
              <SkeletonRectangle height="36px" width="36px" animation={animation} />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'user') {
    return (
      <div className={clsx(cardClasses, className)} role="status" aria-label="Loading user...">
        <div className="flex items-center space-x-4">
          <Skeleton variant="circular" width="48px" height="48px" animation={animation} />
          <div className="flex-1 space-y-2">
            <SkeletonText width="120px" animation={animation} />
            <SkeletonText width="180px" animation={animation} />
          </div>
        </div>
        {showActions && (
          <div className="flex space-x-2 pt-2">
            <SkeletonRectangle height="32px" width="80px" animation={animation} />
            <SkeletonRectangle height="32px" width="60px" animation={animation} />
          </div>
        )}
      </div>
    );
  }

  if (variant === 'order') {
    return (
      <div className={clsx(cardClasses, className)} role="status" aria-label="Loading order...">
        <div className="flex items-center justify-between">
          <SkeletonText width="100px" animation={animation} />
          <SkeletonRectangle height="24px" width="80px" rounded="full" animation={animation} />
        </div>
        <div className="space-y-2">
          <SkeletonText lines={2} animation={animation} />
          <div className="flex items-center justify-between">
            <SkeletonText width="80px" animation={animation} />
            <SkeletonText width="60px" animation={animation} />
          </div>
        </div>
        {showActions && (
          <div className="flex space-x-2 pt-2 border-t border-border-light">
            <SkeletonRectangle height="32px" width="100px" animation={animation} />
            <SkeletonRectangle height="32px" width="80px" animation={animation} />
          </div>
        )}
      </div>
    );
  }

  if (variant === 'dashboard') {
    return (
      <div className={clsx(cardClasses, className)} role="status" aria-label="Loading dashboard widget...">
        <div className="flex items-center justify-between">
          <SkeletonText width="120px" animation={animation} />
          <Skeleton variant="circular" width="24px" height="24px" animation={animation} />
        </div>
        <div className="space-y-4">
          <SkeletonRectangle height="60px" animation={animation} />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <SkeletonText width="60px" animation={animation} />
              <SkeletonText width="40px" animation={animation} />
            </div>
            <div className="space-y-2">
              <SkeletonText width="60px" animation={animation} />
              <SkeletonText width="40px" animation={animation} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default rectangular card
  return (
    <div className={clsx(cardClasses, className)} role="status" aria-label="Loading...">
      <SkeletonRectangle height="120px" animation={animation} />
      <div className="space-y-2">
        <SkeletonText lines={3} animation={animation} />
      </div>
    </div>
  );
};