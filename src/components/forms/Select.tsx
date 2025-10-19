import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDownIcon } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  id,
  className,
  options,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-main">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={cn(
            'w-full px-4 py-2 border rounded-md appearance-none focus:outline-none focus:ring-1 bg-surface pr-8',
            error ? 'border-error focus:ring-error' : 'border-border focus:ring-primary',
            className
          )}
          {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={16}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-copy-lighter pointer-events-none"
        />
      </div>
      {error && <p className="text-sm text-error mt-1">{error}</p>}
    </div>
  );
};
