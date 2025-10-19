import React from 'react';
import { clsx } from 'clsx';
import { Skeleton, SkeletonText, SkeletonRectangle } from './Skeleton';

export interface SkeletonDashboardProps {
  layout?: 'grid' | 'list' | 'mixed';
  showMetrics?: boolean;
  showCharts?: boolean;
  showTables?: boolean;
  className?: string;
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const SkeletonDashboard: React.FC<SkeletonDashboardProps> = ({
  layout = 'mixed',
  showMetrics = true,
  showCharts = true,
  showTables = true,
  className,
  animation = 'shimmer'
}) => {
  const MetricCard = () => (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonText width="120px" animation={animation} />
        <Skeleton variant="circular" width="32px" height="32px" animation={animation} />
      </div>
      <div className="space-y-2">
        <SkeletonText width="80px" height="32px" animation={animation} />
        <div className="flex items-center space-x-2">
          <SkeletonRectangle width="12px" height="12px" animation={animation} />
          <SkeletonText width="60px" height="14px" animation={animation} />
        </div>
      </div>
    </div>
  );

  const ChartCard = () => (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonText width="150px" animation={animation} />
        <div className="flex space-x-2">
          <SkeletonRectangle width="60px" height="24px" rounded="md" animation={animation} />
          <SkeletonRectangle width="24px" height="24px" rounded="md" animation={animation} />
        </div>
      </div>
      <SkeletonRectangle height="200px" animation={animation} />
      <div className="flex items-center justify-between">
        <SkeletonText width="100px" height="14px" animation={animation} />
        <SkeletonText width="80px" height="14px" animation={animation} />
      </div>
    </div>
  );

  const TableCard = () => (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonText width="140px" animation={animation} />
        <SkeletonRectangle width="80px" height="32px" rounded="md" animation={animation} />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-border-light last:border-b-0">
            <div className="flex items-center space-x-3">
              <Skeleton variant="circular" width="24px" height="24px" animation={animation} />
              <SkeletonText width="120px" animation={animation} />
            </div>
            <div className="flex items-center space-x-4">
              <SkeletonText width="60px" animation={animation} />
              <SkeletonRectangle width="50px" height="20px" rounded="full" animation={animation} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ActivityFeed = () => (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
      <SkeletonText width="100px" animation={animation} />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Skeleton variant="circular" width="32px" height="32px" animation={animation} />
            <div className="flex-1 space-y-2">
              <SkeletonText width="200px" animation={animation} />
              <SkeletonText width="150px" height="14px" animation={animation} />
              <SkeletonText width="80px" height="12px" animation={animation} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (layout === 'grid') {
    return (
      <div className={clsx('space-y-6', className)} role="status" aria-label="Loading dashboard...">
        {showMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
          </div>
        )}
        {showCharts && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard />
            <ChartCard />
          </div>
        )}
        {showTables && (
          <div className="grid grid-cols-1 gap-6">
            <TableCard />
          </div>
        )}
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className={clsx('space-y-6', className)} role="status" aria-label="Loading dashboard...">
        {showMetrics && (
          <div className="space-y-4">
            <MetricCard />
            <MetricCard />
            <MetricCard />
          </div>
        )}
        {showCharts && (
          <div className="space-y-4">
            <ChartCard />
            <ChartCard />
          </div>
        )}
        {showTables && (
          <div className="space-y-4">
            <TableCard />
          </div>
        )}
      </div>
    );
  }

  // Mixed layout (default)
  return (
    <div className={clsx('space-y-6', className)} role="status" aria-label="Loading dashboard...">
      {showMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard />
          <MetricCard />
          <MetricCard />
          <MetricCard />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {showCharts && <ChartCard />}
          {showTables && <TableCard />}
        </div>
        <div className="space-y-6">
          <ActivityFeed />
          {showCharts && (
            <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
              <SkeletonText width="120px" animation={animation} />
              <SkeletonRectangle height="150px" animation={animation} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};