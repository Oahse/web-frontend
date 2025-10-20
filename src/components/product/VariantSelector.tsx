import React from 'react';
import { cn } from '../../lib/utils';
import { CheckIcon } from 'lucide-react';

interface ProductVariantAttribute {
  id: string;
  name: string;
  value: string;
}

interface ProductVariantImage {
  id: string;
  variant_id: string;
  url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  base_price: number;
  sale_price?: number;
  stock: number;
  barcode?: string;
  qr_code?: string;
  attributes: ProductVariantAttribute[];
  images: ProductVariantImage[];
}

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
  showImages?: boolean;
  showPrice?: boolean;
  showStock?: boolean;
  className?: string;
  layout?: 'grid' | 'list' | 'dropdown';
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantChange,
  showImages = false,
  showPrice = true,
  showStock = true,
  className,
  layout = 'grid'
}) => {
  // Group variants by attribute types for better organization
  const getAttributeGroups = () => {
    const groups: { [key: string]: Set<string> } = {};
    
    variants.forEach(variant => {
      variant.attributes.forEach(attr => {
        if (!groups[attr.name]) {
          groups[attr.name] = new Set();
        }
        groups[attr.name].add(attr.value);
      });
    });
    
    return groups;
  };

  const attributeGroups = getAttributeGroups();

  const getPrimaryImage = (variant: ProductVariant) => {
    const primaryImage = variant.images.find(img => img.is_primary);
    return primaryImage || variant.images[0];
  };

  const isVariantAvailable = (variant: ProductVariant) => {
    return variant.stock > 0;
  };

  const getVariantPrice = (variant: ProductVariant) => {
    return variant.sale_price || variant.base_price;
  };

  const formatAttributes = (variant: ProductVariant) => {
    return variant.attributes
      .map(attr => `${attr.name}: ${attr.value}`)
      .join(', ');
  };

  if (layout === 'dropdown') {
    return (
      <div className={cn('space-y-2', className)}>
        <label className="block text-sm font-medium text-gray-700">
          Select Variant
        </label>
        <select
          value={selectedVariant.id}
          onChange={(e) => {
            const variant = variants.find(v => v.id === e.target.value);
            if (variant) onVariantChange(variant);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {variants.map(variant => (
            <option 
              key={variant.id} 
              value={variant.id}
              disabled={!isVariantAvailable(variant)}
            >
              {variant.name} - ${getVariantPrice(variant).toFixed(2)}
              {!isVariantAvailable(variant) && ' (Out of Stock)'}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        <h3 className="text-sm font-medium text-gray-700">Select Variant</h3>
        <div className="space-y-2">
          {variants.map(variant => {
            const isSelected = selectedVariant.id === variant.id;
            const isAvailable = isVariantAvailable(variant);
            const primaryImage = getPrimaryImage(variant);

            return (
              <button
                key={variant.id}
                onClick={() => isAvailable && onVariantChange(variant)}
                disabled={!isAvailable}
                className={cn(
                  'w-full p-3 border rounded-lg text-left transition-all',
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border hover:border-border-strong',
                  !isAvailable && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className="flex items-center space-x-3">
                  {showImages && primaryImage && (
                    <img
                      src={primaryImage.url}
                      alt={primaryImage.alt_text || variant.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {variant.name}
                      </span>
                      {isSelected && (
                        <CheckIcon size={16} className="text-primary" />
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {formatAttributes(variant)}
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      {showPrice && (
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-primary">
                            ${getVariantPrice(variant).toFixed(2)}
                          </span>
                          {variant.sale_price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${variant.base_price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {showStock && (
                        <span className={cn(
                          'text-xs px-2 py-1 rounded-full',
                          isAvailable
                            ? 'bg-success-100 text-success-800'
                            : 'bg-error-100 text-error-800'
                        )}>
                          {isAvailable ? `${variant.stock} in stock` : 'Out of stock'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div className={cn('space-y-4', className)}>
      {/* Attribute-based selection */}
      {Object.entries(attributeGroups).map(([attributeName, values]) => (
        <div key={attributeName} className="space-y-2">
          <h3 className="text-sm font-medium text-copy capitalize">
            {attributeName === 'variant_index' ? 'Option' : attributeName}
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(values).map(value => {
              // Find variant with this attribute value
              const variantWithValue = variants.find(variant =>
                variant.attributes.some(attr => 
                  attr.name === attributeName && attr.value === value
                )
              );
              
              if (!variantWithValue) return null;
              
              const isSelected = selectedVariant.attributes.some(attr =>
                attr.name === attributeName && attr.value === value
              );
              const isAvailable = isVariantAvailable(variantWithValue);

              return (
                <button
                  key={value}
                  onClick={() => isAvailable && onVariantChange(variantWithValue)}
                  disabled={!isAvailable}
                  className={cn(
                    'px-4 py-2 border rounded-md text-sm font-medium transition-all',
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : 'border-border text-copy hover:border-border-strong',
                    !isAvailable && 'opacity-50 cursor-not-allowed line-through'
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Variant cards with images */}
      {showImages && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Variants</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {variants.map(variant => {
              const isSelected = selectedVariant.id === variant.id;
              const isAvailable = isVariantAvailable(variant);
              const primaryImage = getPrimaryImage(variant);

              return (
                <button
                  key={variant.id}
                  onClick={() => isAvailable && onVariantChange(variant)}
                  disabled={!isAvailable}
                  className={cn(
                    'p-2 border rounded-lg transition-all text-left',
                    isSelected
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-gray-200 hover:border-gray-300',
                    !isAvailable && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {primaryImage && (
                    <img
                      src={primaryImage.url}
                      alt={primaryImage.alt_text || variant.name}
                      className="w-full h-20 object-cover rounded-md mb-2"
                    />
                  )}
                  
                  <div className="text-xs font-medium text-gray-900 truncate">
                    {variant.name}
                  </div>
                  
                  {showPrice && (
                    <div className="text-xs text-primary font-semibold">
                      ${getVariantPrice(variant).toFixed(2)}
                    </div>
                  )}
                  
                  {showStock && (
                    <div className={cn(
                      'text-xs mt-1',
                      isAvailable ? 'text-success-600' : 'text-error-600'
                    )}>
                      {isAvailable ? `${variant.stock} left` : 'Out of stock'}
                    </div>
                  )}
                  
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-primary text-white rounded-full p-1">
                      <CheckIcon size={12} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected variant info */}
      <div className="p-3 bg-surface rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-copy">Selected:</span>
            <span className="ml-2 text-sm text-copy">1kg Bag</span>
          </div>
          {showPrice && (
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                ${getVariantPrice(selectedVariant).toFixed(2)}
              </div>
              {selectedVariant.sale_price && (
          <div className="text-sm text-copy-light line-through">$137.02</div>
              )}
            </div>
          )}
        </div>
        
        {showStock && (
          <div className="mt-2 text-sm">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs',
              isVariantAvailable(selectedVariant)
                ? 'bg-success-100 text-success-800'
                : 'bg-error-100 text-error-800'
            )}>
              {isVariantAvailable(selectedVariant) 
                ? `${selectedVariant.stock} in stock` 
                : 'Out of stock'
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};