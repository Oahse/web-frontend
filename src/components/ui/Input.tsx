import React, { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  helperText,
  error,
  success,
  leftIcon,
  rightIcon,
  fullWidth = true,
  variant = 'default',
  size = 'md',
  rounded = 'md',
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError;

  const variantStyles = {
    default: cn(
      'bg-surface border border-border',
      'focus:border-primary focus:ring-1 focus:ring-primary/20',
      hasError && 'border-error focus:border-error focus:ring-error/20',
      hasSuccess && 'border-success focus:border-success focus:ring-success/20'
    ),
    filled: cn(
      'bg-surface-hover border border-transparent',
      'focus:bg-surface focus:border-primary focus:ring-1 focus:ring-primary/20',
      hasError && 'bg-error/5 border-error focus:border-error focus:ring-error/20',
      hasSuccess && 'bg-success/5 border-success focus:border-success focus:ring-success/20'
    ),
    outlined: cn(
      'bg-transparent border-2 border-border',
      'focus:border-primary',
      hasError && 'border-error focus:border-error',
      hasSuccess && 'border-success focus:border-success'
    ),
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-sm min-h-[40px]',
    lg: 'px-4 py-3 text-base min-h-[48px]',
  };

  const roundedStyles = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const iconPadding = {
    sm: leftIcon ? 'pl-8' : rightIcon ? 'pr-8' : '',
    md: leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '',
    lg: leftIcon ? 'pl-12' : rightIcon ? 'pr-12' : '',
  };

  return (
    <div className={cn('space-y-1', fullWidth && 'w-full')}>
      {label && (
        <label 
          htmlFor={props.id} 
          className={cn(
            'block text-sm font-medium text-copy transition-colors',
            hasError && 'text-error',
            hasSuccess && 'text-success',
            disabled && 'text-copy-muted'
          )}
        >
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className={cn(
            'absolute inset-y-0 left-0 flex items-center justify-center',
            size === 'sm' ? 'w-8' : size === 'md' ? 'w-10' : 'w-12',
            'text-copy-light pointer-events-none',
            hasError && 'text-error',
            hasSuccess && 'text-success',
            isFocused && 'text-primary'
          )}>
            <span className={iconSize[size]}>{leftIcon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            // Base styles
            'w-full text-copy placeholder:text-copy-muted',
            'transition-all duration-200 ease-in-out',
            'focus:outline-none',
            
            // Variant styles
            variantStyles[variant],
            
            // Size styles
            sizeStyles[size],
            
            // Rounded styles
            roundedStyles[rounded],
            
            // Icon padding
            iconPadding[size],
            
            // State styles
            disabled && 'bg-surface-disabled cursor-not-allowed opacity-60',
            
            className
          )}
          disabled={disabled}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        
        {rightIcon && (
          <div className={cn(
            'absolute inset-y-0 right-0 flex items-center justify-center',
            size === 'sm' ? 'w-8' : size === 'md' ? 'w-10' : 'w-12',
            'text-copy-light pointer-events-none',
            hasError && 'text-error',
            hasSuccess && 'text-success',
            isFocused && 'text-primary'
          )}>
            <span className={iconSize[size]}>{rightIcon}</span>
          </div>
        )}
      </div>
      
      {(error || success || helperText) && (
        <div className="space-y-1">
          {error && (
            <p className="text-sm text-error flex items-center gap-1">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
          {success && !error && (
            <p className="text-sm text-success flex items-center gap-1">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </p>
          )}
          {helperText && !error && !success && (
            <p className="text-sm text-copy-light">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';