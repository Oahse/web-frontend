import React, { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { ProductsAPI } from '../../apis';
import { Product } from '../../apis/types';

interface OrderItemDetailsProps {
  productId: string;
  quantity: number;
  price: number;
}

export const OrderItemDetails: React.FC<OrderItemDetailsProps> = ({ productId, quantity, price }) => {
  const { data: product, loading, error, execute } = useApi<Product>();

  useEffect(() => {
    if (productId) {
      execute(() => ProductsAPI.getProduct(productId));
    }
  }, [productId, execute]);

  if (loading) {
    return <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
    </div>;
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error loading product</div>;
  }

  if (!product) {
    return null;
  }

  const variant = product.variants?.[0];
  const image = variant?.images?.[0];

  return (
    <div className="flex items-center space-x-4">
      {image ? (
        <img src={image.url} alt={image.alt_text || product.name} className="w-16 h-16 object-cover rounded" />
      ) : (
        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-xs text-gray-500">No Image</span>
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-medium text-main dark:text-white">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Qty: {quantity}
        </p>
      </div>
      <p className="font-medium text-main dark:text-white">
        ${price.toFixed(2)}
      </p>
    </div>
  );
};
