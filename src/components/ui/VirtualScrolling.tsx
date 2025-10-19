import React, { useState, useRef, useMemo, useCallback } from 'react';

interface VirtualScrollingProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onScroll?: (scrollTop: number) => void;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

export function VirtualScrolling<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className = '',
  onScroll,
  loading = false,
  loadingComponent,
  emptyComponent
}: VirtualScrollingProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;

  const visibleRange = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
      visibleStart + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );

    const start = Math.max(0, visibleStart - overscan);
    const end = Math.min(items.length - 1, visibleEnd + overscan);

    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end + 1);
  }, [items, visibleRange]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    onScroll?.(newScrollTop);
  }, [onScroll]);

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center`} style={{ height: containerHeight }}>
        {loadingComponent || <div>Loading...</div>}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center`} style={{ height: containerHeight }}>
        {emptyComponent || <div>No items to display</div>}
      </div>
    );
  }

  return (
    <div
      ref={scrollElementRef}
      className={`${className} overflow-auto`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${visibleRange.start * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item) => (
            <div
              key={visibleRange.start + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleRange.start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Hook for virtual scrolling with dynamic item heights
export const useVirtualScrolling = <T,>(
  items: T[],
  estimatedItemHeight: number,
  containerHeight: number,
  getItemHeight?: (index: number) => number
) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate cumulative heights for dynamic sizing
  const cumulativeHeights = useMemo(() => {
    const heights = [0];
    for (let i = 0; i < items.length; i++) {
      const height = getItemHeight?.(i) || itemHeights[i] || estimatedItemHeight;
      heights.push(heights[heights.length - 1] + height);
    }
    return heights;
  }, [items.length, itemHeights, estimatedItemHeight, getItemHeight]);

  const totalHeight = cumulativeHeights[cumulativeHeights.length - 1];

  const visibleRange = useMemo(() => {
    let start = 0;
    let end = items.length - 1;

    // Binary search for start index
    for (let i = 0; i < cumulativeHeights.length - 1; i++) {
      if (cumulativeHeights[i + 1] > scrollTop) {
        start = i;
        break;
      }
    }

    // Find end index
    for (let i = start; i < cumulativeHeights.length - 1; i++) {
      if (cumulativeHeights[i] > scrollTop + containerHeight) {
        end = i - 1;
        break;
      }
    }

    return { start: Math.max(0, start - 2), end: Math.min(items.length - 1, end + 2) };
  }, [scrollTop, containerHeight, cumulativeHeights, items.length]);

  const measureItem = useCallback((index: number, height: number) => {
    setItemHeights(prev => {
      const newHeights = [...prev];
      newHeights[index] = height;
      return newHeights;
    });
  }, []);

  return {
    scrollTop,
    setScrollTop,
    visibleRange,
    totalHeight,
    cumulativeHeights,
    measureItem,
    itemRefs
  };
};

// Virtual list component for products
export const VirtualProductList: React.FC<{
  products: any[];
  onProductClick: (product: any) => void;
  loading?: boolean;
}> = ({ products, onProductClick, loading }) => {
  const renderProduct = useCallback((product: any, index: number) => (
    <div
      className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            {product.description}
          </p>
          <p className="text-sm font-medium text-green-600">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  ), [onProductClick]);

  return (
    <VirtualScrolling
      items={products}
      itemHeight={96} // 24 * 4 (6rem height)
      containerHeight={600}
      renderItem={renderProduct}
      loading={loading}
      className="border border-gray-200 rounded-lg"
      loadingComponent={
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
      emptyComponent={
        <div className="text-center text-gray-500">
          No products found
        </div>
      }
    />
  );
};

// Virtual list component for orders
export const VirtualOrderList: React.FC<{
  orders: any[];
  onOrderClick: (order: any) => void;
  loading?: boolean;
}> = ({ orders, onOrderClick, loading }) => {
  const renderOrder = useCallback((order: any) => (
    <div
      className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
      onClick={() => onOrderClick(order)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Order #{order.id}
              </h3>
              <p className="text-sm text-gray-500">
                {order.customer_name} • {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            ${order.total_amount}
          </p>
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            order.status === 'completed' ? 'bg-green-100 text-green-800' :
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {order.status}
          </span>
        </div>
      </div>
    </div>
  ), [onOrderClick]);

  return (
    <VirtualScrolling
      items={orders}
      itemHeight={80} // 20 * 4 (5rem height)
      containerHeight={600}
      renderItem={renderOrder}
      loading={loading}
      className="border border-gray-200 rounded-lg"
      loadingComponent={
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
      emptyComponent={
        <div className="text-center text-gray-500">
          No orders found
        </div>
      }
    />
  );
};