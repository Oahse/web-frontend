import React from 'react';
import { clsx } from 'clsx';
import { Skeleton, SkeletonText, SkeletonRectangle } from './Skeleton';

export interface SkeletonFormProps {
  fields?: number;
  showLabels?: boolean;
  showButtons?: boolean;
  layout?: 'vertical' | 'horizontal' | 'grid';
  className?: string;
  animation?: 'shimmer' | 'pulse' | 'wave';
  variant?: 'default' | 'compact' | 'detailed';
}

export const SkeletonForm: React.FC<SkeletonFormProps> = ({
  fields = 4,
  showLabels = true,
  showButtons = true,
  layout = 'vertical',
  className,
  animation = 'shimmer',
  variant = 'default'
}) => {
  const formClasses = 'bg-surface border border-border rounded-lg p-6 space-y-6';

  const FormField = ({ index }: { index: number }) => {
    const fieldTypes = ['text', 'email', 'select', 'textarea', 'checkbox', 'radio'];
    const fieldType = fieldTypes[index % fieldTypes.length];

    if (layout === 'horizontal') {
      return (
        <div className="flex items-center space-x-4">
          {showLabels && (
            <div className="w-1/3">
              <SkeletonText width="80px" animation={animation} />
            </div>
          )}
          <div className="flex-1">
            {fieldType === 'textarea' ? (
              <SkeletonRectangle height="80px" animation={animation} />
            ) : fieldType === 'select' ? (
              <div className="relative">
                <SkeletonRectangle height="40px" animation={animation} />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Skeleton variant="circular" width="16px" height="16px" animation={animation} />
                </div>
              </div>
            ) : fieldType === 'checkbox' || fieldType === 'radio' ? (
              <div className="flex items-center space-x-2">
                <Skeleton 
                  variant={fieldType === 'radio' ? 'circular' : 'rectangular'} 
                  width="16px" 
                  height="16px" 
                  animation={animation} 
                />
                <SkeletonText width="120px" animation={animation} />
              </div>
            ) : (
              <SkeletonRectangle height="40px" animation={animation} />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {showLabels && (
          <SkeletonText width="100px" animation={animation} />
        )}
        {fieldType === 'textarea' ? (
          <SkeletonRectangle height="80px" animation={animation} />
        ) : fieldType === 'select' ? (
          <div className="relative">
            <SkeletonRectangle height="40px" animation={animation} />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Skeleton variant="circular" width="16px" height="16px" animation={animation} />
            </div>
          </div>
        ) : fieldType === 'checkbox' || fieldType === 'radio' ? (
          <div className="flex items-center space-x-2">
            <Skeleton 
              variant={fieldType === 'radio' ? 'circular' : 'rectangular'} 
              width="16px" 
              height="16px" 
              animation={animation} 
            />
            <SkeletonText width="120px" animation={animation} />
          </div>
        ) : (
          <SkeletonRectangle height="40px" animation={animation} />
        )}
        {variant === 'detailed' && (
          <SkeletonText width="200px" height="12px" animation={animation} />
        )}
      </div>
    );
  };

  const ButtonGroup = () => (
    <div className="flex items-center justify-between pt-4 border-t border-border-light">
      <SkeletonRectangle width="80px" height="36px" animation={animation} />
      <div className="flex space-x-3">
        <SkeletonRectangle width="80px" height="36px" animation={animation} />
        <SkeletonRectangle width="100px" height="36px" animation={animation} />
      </div>
    </div>
  );

  if (layout === 'grid') {
    return (
      <div className={clsx(formClasses, className)} role="status" aria-label="Loading form...">
        <SkeletonText width="150px" height="24px" animation={animation} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: fields }).map((_, index) => (
            <FormField key={index} index={index} />
          ))}
        </div>
        {showButtons && <ButtonGroup />}
      </div>
    );
  }

  return (
    <div className={clsx(formClasses, className)} role="status" aria-label="Loading form...">
      {variant !== 'compact' && (
        <SkeletonText width="150px" height="24px" animation={animation} />
      )}
      <div className={clsx(
        layout === 'horizontal' ? 'space-y-4' : 'space-y-6'
      )}>
        {Array.from({ length: fields }).map((_, index) => (
          <FormField key={index} index={index} />
        ))}
      </div>
      {showButtons && <ButtonGroup />}
    </div>
  );
};

// Specialized form skeletons
export const SkeletonLoginForm: React.FC<Omit<SkeletonFormProps, 'fields'>> = (props) => (
  <SkeletonForm fields={2} {...props} />
);

export const SkeletonRegistrationForm: React.FC<Omit<SkeletonFormProps, 'fields'>> = (props) => (
  <SkeletonForm fields={5} layout="grid" {...props} />
);

export const SkeletonProfileForm: React.FC<Omit<SkeletonFormProps, 'fields'>> = (props) => (
  <SkeletonForm fields={8} layout="grid" variant="detailed" {...props} />
);

export const SkeletonProductForm: React.FC<Omit<SkeletonFormProps, 'fields'>> = (props) => (
  <SkeletonForm fields={10} layout="vertical" variant="detailed" {...props} />
);