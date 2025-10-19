import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { usePerformanceMonitoring } from '../../utils/performance';
import { usePerformanceMonitoring } from '../../utils/performance';

interface PerformanceStats {
  system_metrics: {
    cpu_percent: number;
    memory_percent: number;
    disk_percent: number;
    uptime_seconds: number;
  };
  active_alerts: Array<{
    id: string;
    metric_name: string;
    severity: string;
    message: string;
    timestamp: string;
  }>;
  response_time_summary: {
    avg: number;
    min: number;
    max: number;
    count: number;
  };
  monitoring_status: string;
}

interface CacheStats {
  [cacheName: string]: {
    size: number;
    max_size: number;
    hit_ratio: number;
  };
}

export const PerformanceMonitor: React.FC = () => {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [cacheStats, setCacheStats] = useState<CacheStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Initialize performance monitoring
  const { getMetrics } = usePerformanceMonitoring();

  const fetchPerformanceStats = async () => {
    try {
      const response = await fetch('/api/v1/performance/dashboard');
      if (!response.ok) throw new Error('Failed to fetch performance stats');
      
      const result = await response.json();
      setStats(result.data);
      
      // Fetch cache stats
      const cacheResponse = await fetch('/api/v1/performance/cache/stats');
      if (cacheResponse.ok) {
        const cacheResult = await cacheResponse.json();
        setCacheStats(cacheResult.data);
      }
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformanceStats();
    
    if (autoRefresh) {
      const interval = setInterval(fetchPerformanceStats, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const clearCache = async (cacheName?: string) => {
    try {
      const url = cacheName 
        ? `/api/v1/performance/cache/clear?cache_name=${cacheName}`
        : '/api/v1/performance/cache/clear';
      
      const response = await fetch(url, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to clear cache');
      
      await fetchPerformanceStats(); // Refresh stats
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cache');
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/v1/performance/alerts/${alertId}/resolve`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to resolve alert');
      
      await fetchPerformanceStats(); // Refresh stats
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve alert');
    }
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return 'text-red-600 bg-red-100';
    if (value >= thresholds.warning) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get frontend performance metrics
  const frontendMetrics = useMemo(() => {
    const metrics = getMetrics();
    return Array.from(metrics.entries()).map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100
    }));
  }, [getMetrics]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error Loading Performance Data</h3>
          <p className="text-red-600 mt-1">{error}</p>
          <Button onClick={fetchPerformanceStats} className="mt-3">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Performance Monitor</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="mr-2"
            />
            Auto Refresh
          </label>
          <Button onClick={fetchPerformanceStats} variant="outline">
            Refresh Now
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">CPU Usage</p>
                  <p className={`text-2xl font-bold ${getStatusColor(stats.system_metrics.cpu_percent, { warning: 70, critical: 85 })}`}>
                    {stats.system_metrics.cpu_percent.toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Memory Usage</p>
                  <p className={`text-2xl font-bold ${getStatusColor(stats.system_metrics.memory_percent, { warning: 75, critical: 90 })}`}>
                    {stats.system_metrics.memory_percent.toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Disk Usage</p>
                  <p className={`text-2xl font-bold ${getStatusColor(stats.system_metrics.disk_percent, { warning: 80, critical: 95 })}`}>
                    {stats.system_metrics.disk_percent.toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatUptime(stats.system_metrics.uptime_seconds)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </Card>
          </div>

          {/* Response Time Summary */}
          {stats.response_time_summary && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Response Time Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Average</p>
                  <p className="text-xl font-bold text-blue-600">
                    {stats.response_time_summary.avg.toFixed(2)}ms
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Minimum</p>
                  <p className="text-xl font-bold text-green-600">
                    {stats.response_time_summary.min.toFixed(2)}ms
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Maximum</p>
                  <p className="text-xl font-bold text-red-600">
                    {stats.response_time_summary.max.toFixed(2)}ms
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Requests</p>
                  <p className="text-xl font-bold text-gray-800">
                    {stats.response_time_summary.count}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Active Alerts */}
          {stats.active_alerts.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-600">Active Alerts</h3>
              <div className="space-y-3">
                {stats.active_alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm opacity-75 mt-1">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Cache Statistics */}
          {Object.keys(cacheStats).length > 0 && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Cache Statistics</h3>
                <Button onClick={() => clearCache()} variant="outline" size="sm">
                  Clear All Caches
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(cacheStats).map(([cacheName, stats]) => (
                  <div key={cacheName} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium capitalize">{cacheName}</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => clearCache(cacheName)}
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>Size: {stats.size} / {stats.max_size}</p>
                      <p>Hit Ratio: {(stats.hit_ratio * 100).toFixed(1)}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(stats.size / stats.max_size) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Frontend Performance Metrics */}
          {frontendMetrics.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Frontend Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {frontendMetrics.map((metric) => (
                  <div key={metric.name} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium capitalize">{metric.name.replace('_', ' ')}</p>
                    <p className="text-xl font-bold text-blue-600">
                      {metric.value}
                      {metric.name.includes('time') ? 'ms' : ''}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};