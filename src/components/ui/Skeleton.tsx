import React from 'react';
import { clsx } from 'clsx';

export interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'shimmer' | 'pulse' | 'wave';
  className?: string;
  lines?: number; // For text variant
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'shimmer',
  className,
  lines = 1,
  rounded = 'md',
  ...props
}) => {
  const baseClasses = 'bg-border-light relative overflow-hidden';
  
  const animationClasses = {
    shimmer: 'animate-shimmer bg-gradient-to-r from-border-light via-border to-border-light bg-[length:200%_100%]',
    pulse: 'animate-pulse',
    wave: 'animate-wave'
  };

  const variantClasses = {
    text: 'h-4',
    rectangular: 'rounded-md',
    circular: 'rounded-full aspect-square',
    rounded: `rounded-${rounded}`
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const getVariantClass = () => {
    if (variant === 'text') return variantClasses.text;
    if (variant === 'circular') return variantClasses.circular;
    if (variant === 'rounded') return roundedClasses[rounded];
    return variantClasses.rectangular;
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? undefined : '1rem'),
  };

  // For text variant with multiple lines
  if (variant === 'text' && lines > 1) {
    return (
      <div className={clsx('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={clsx(
              baseClasses,
              animationClasses[animation],
              getVariantClass(),
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : style.width
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        baseClasses,
        animationClasses[animation],
        getVariantClass(),
        className
      )}
      style={style}
      role="status"
      aria-label="Loading content..."
      aria-live="polite"
      {...props}
    />
  );
};

// Specialized skeleton components for common use cases
export const SkeletonText: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="text" {...props} />
);

export const SkeletonCircle: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="circular" {...props} />
);

export const SkeletonRectangle: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="rectangular" {...props} />
);

export const SkeletonRounded: React.FC<Omit<SkeletonProps, 'variant'>> = (props) => (
  <Skeleton variant="rounded" {...props} />
);