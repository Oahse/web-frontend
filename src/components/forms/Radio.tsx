import React from 'react';
import { cn } from '../../lib/utils';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  error,
  id,
  className,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        className={cn(
          'h-4 w-4 text-primary focus:ring-primary border-border rounded-full bg-transparent',
          className
        )}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="ml-2 block text-sm text-copy-light">
          {label}
        </label>
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
