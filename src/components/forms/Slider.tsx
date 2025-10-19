import React from 'react';
import { cn } from '../../lib/utils';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  error,
  id,
  className,
  type = 'range',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-main">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={cn(
          'w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
