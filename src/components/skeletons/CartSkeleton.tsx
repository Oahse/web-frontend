import React from 'react';

export const CartSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-copy">
      <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
        {/* Cart Items Skeleton */}
        <div className="lg:w-2/3">
          <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-background">
              <div className="col-span-6 h-6 bg-gray-200 rounded"></div>
              <div className="col-span-2 h-6 bg-gray-200 rounded"></div>
              <div className="col-span-2 h-6 bg-gray-200 rounded"></div>
              <div className="col-span-2 h-6 bg-gray-200 rounded"></div>
            </div>
            {[...Array(2)].map((_, index) => (
              <div key={index} className="p-4 border-b border-border-light last:border-b-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center">
                    <div className="w-20 h-20 rounded-md bg-gray-200 flex-shrink-0"></div>
                    <div className="ml-4 space-y-2 w-3/4">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <div className="h-8 w-24 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4 bg-background flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:w-1/3">
          <div className="bg-surface rounded-lg shadow-sm p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="border-t border-border-light pt-3 flex justify-between">
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};