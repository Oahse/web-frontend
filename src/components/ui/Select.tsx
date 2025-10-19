import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDownIcon } from 'lucide-react';
export interface SelectOption {
  value: string;
  label: string;
}
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  label,
  helperText,
  error,
  options,
  size = 'md',
  fullWidth = false,
  ...props
}, ref) => {
  const sizeStyles = {
    sm: 'py-1 text-sm',
    md: 'py-2',
    lg: 'py-3 text-lg'
  };
  return <div className={cn('mb-4', fullWidth && 'w-full')}>
        {label && <label htmlFor={props.id} className="block text-sm font-medium text-main mb-1">
            {label}
          </label>}
        <div className="relative">
          <select ref={ref} className={cn('w-full appearance-none px-4 border rounded-md focus:outline-none focus:ring-1 transition-colors pr-10', sizeStyles[size], error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary focus:ring-primary', className)} {...props}>
            {options.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : helperText ? <p className="mt-1 text-sm text-gray-500">{helperText}</p> : null}
      </div>;
});
Select.displayName = 'Select';