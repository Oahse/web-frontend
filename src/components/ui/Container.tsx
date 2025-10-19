import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({
  className,
  children,
  size = 'xl',
  padding = 'md',
  center = true,
  ...props
}, ref) => {
  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  const paddingStyles = {
    none: '',
    sm: 'px-3',
    md: 'px-4 sm:px-6',
    lg: 'px-6 sm:px-8',
    xl: 'px-8 sm:px-12',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'w-full',
        sizeStyles[size],
        paddingStyles[padding],
        center && 'mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

// Section component for consistent page sections
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'surface' | 'elevated';
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
  className,
  children,
  padding = 'lg',
  background = 'default',
  ...props
}, ref) => {
  const paddingStyles = {
    none: '',
    sm: 'py-6',
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-16 lg:py-20',
    xl: 'py-16 md:py-20 lg:py-24',
  };

  const backgroundStyles = {
    default: 'bg-background',
    surface: 'bg-surface',
    elevated: 'bg-surface-elevated',
  };

  return (
    <section
      ref={ref}
      className={cn(
        paddingStyles[padding],
        backgroundStyles[background],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';