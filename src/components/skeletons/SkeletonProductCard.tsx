import React from 'react';
import { Skeleton } from '../ui/Skeleton';
export const SkeletonProductCard: React.FC = () => {
  return <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 p-4">
      <Skeleton className="w-full h-48 mb-4" />
      <Skeleton className="w-1/4 h-3 mb-2" />
      <Skeleton className="w-3/4 h-5 mb-2" />
      <div className="flex items-center mb-2">
        <Skeleton className="w-1/3 h-3" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-1/4 h-5" />
        <Skeleton className="w-6 h-6 rounded-full" />
      </div>
    </div>;
};