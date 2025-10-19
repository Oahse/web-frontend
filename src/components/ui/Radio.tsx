import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  className,
  label,
  ...props
}, ref) => {
  return <div className="flex items-center">
        <input ref={ref} type="radio" className={cn('h-4 w-4 border-gray-300 text-primary focus:ring-primary', className)} {...props} />
        {label && <label htmlFor={props.id} className="ml-2 block text-sm font-medium text-gray-700">
            {label}
          </label>}
      </div>;
});
Radio.displayName = 'Radio';