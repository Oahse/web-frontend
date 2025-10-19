import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../contexts/ThemeContext';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  label,
  helperText,
  error,
  ...props
}, ref) => {
  const { currentTheme } = useTheme();

  return <div className="mb-2">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input ref={ref} type="checkbox" className={cn('h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary', error && 'border-red-500', currentTheme === 'dark' ? 'dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-primary dark:focus:ring-primary-dark' : '', className)} {...props} />
          </div>
          {label && <div className="ml-2 text-sm">
              <label htmlFor={props.id} className={cn('font-medium', error ? 'text-red-500' : 'text-gray-700', currentTheme === 'dark' ? 'dark:text-gray-300' : '')}>
                {label}
              </label>
              {helperText && <p className={cn('text-gray-500', currentTheme === 'dark' ? 'dark:text-gray-500' : '')}>{helperText}</p>}
            </div>}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>;
});

Checkbox.displayName = 'Checkbox';