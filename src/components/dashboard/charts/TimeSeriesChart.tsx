import React, { useState, useEffect } from 'react';
import { InteractiveChart, ChartData } from './InteractiveChart';
import { CalendarIcon, ClockIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { subDays, subYears, startOfDay, endOfDay } from 'date-fns';

export type TimeRange = '1h' | '24h' | '7d' | '30d' | '90d' | '1y' | 'custom';

export interface TimeSeriesDataPoint {
  timestamp: Date;
  value: number;
  label?: string;
}

export interface TimeSeriesDataset {
  label: string;
  data: TimeSeriesDataPoint[];
  color: string;
  fillColor?: string;
}

export interface TimeSeriesChartProps {
  datasets: TimeSeriesDataset[];
  title?: string;
  height?: number;
  defaultTimeRange?: TimeRange;
  showComparison?: boolean;
  showTrend?: boolean;
  onTimeRangeChange?: (range: TimeRange, startDate: Date, endDate: Date) => void;
  onDataUpdate?: (range: TimeRange) => Promise<TimeSeriesDataset[]>;
  loading?: boolean;
  className?: string;
}

export const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  datasets,
  title,
  height = 400,
  defaultTimeRange = '7d',
  showComparison = true,
  showTrend = true,
  onTimeRangeChange,
  onDataUpdate,
  loading = false,
  className = ''
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(defaultTimeRange);
  const [currentDatasets, setCurrentDatasets] = useState<TimeSeriesDataset[]>(datasets);
  const [customDateRange, setCustomDateRange] = useState<{ start: Date; end: Date } | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [trendData, setTrendData] = useState<{ [key: string]: { trend: 'up' | 'down' | 'neutral'; percentage: number } }>({});

  const timeRangeOptions: { value: TimeRange; label: string; description: string }[] = [
    { value: '1h', label: '1H', description: 'Last Hour' },
    { value: '24h', label: '24H', description: 'Last 24 Hours' },
    { value: '7d', label: '7D', description: 'Last 7 Days' },
    { value: '30d', label: '30D', description: 'Last 30 Days' },
    { value: '90d', label: '90D', description: 'Last 90 Days' },
    { value: '1y', label: '1Y', description: 'Last Year' },
    { value: 'custom', label: 'Custom', description: 'Custom Range' }
  ];

  useEffect(() => {
    setCurrentDatasets(datasets);
    calculateTrends(datasets);
  }, [datasets, calculateTrends]);

  useEffect(() => {
    handleTimeRangeChange(selectedTimeRange);
  }, [selectedTimeRange, handleTimeRangeChange]);

  const calculateTrends = useCallback((data: TimeSeriesDataset[]) => {
    const trends: { [key: string]: { trend: 'up' | 'down' | 'neutral'; percentage: number } } = {};
    
    data.forEach(dataset => {
      if (dataset.data.length >= 2) {
        const sortedData = [...dataset.data].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        const firstValue = sortedData[0].value;
        const lastValue = sortedData[sortedData.length - 1].value;
        
        if (firstValue === 0) {
          trends[dataset.label] = { trend: 'neutral', percentage: 0 };
        } else {
          const percentage = ((lastValue - firstValue) / firstValue) * 100;
          trends[dataset.label] = {
            trend: percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'neutral',
            percentage: Math.abs(percentage)
          };
        }
      }
    });
    
    setTrendData(trends);
  }, [setTrendData]);

  const getDateRange = useCallback((range: TimeRange): { start: Date; end: Date } => {
    const now = new Date();
    const end = endOfDay(now);
    
    switch (range) {
      case '1h':
        return { start: new Date(now.getTime() - 60 * 60 * 1000), end: now };
      case '24h':
        return { start: new Date(now.getTime() - 24 * 60 * 60 * 1000), end: now };
      case '7d':
        return { start: startOfDay(subDays(now, 7)), end };
      case '30d':
        return { start: startOfDay(subDays(now, 30)), end };
      case '90d':
        return { start: startOfDay(subDays(now, 90)), end };
      case '1y':
        return { start: startOfDay(subYears(now, 1)), end };
      case 'custom':
        return customDateRange || { start: startOfDay(subDays(now, 7)), end };
      default:
        return { start: startOfDay(subDays(now, 7)), end };
    }
  }, [customDateRange]);

  const handleTimeRangeChange = useCallback(async (range: TimeRange) => {
    setSelectedTimeRange(range);
    const { start, end } = getDateRange(range);
    
    if (onTimeRangeChange) {
      onTimeRangeChange(range, start, end);
    }
    
    if (onDataUpdate) {
      setIsLoadingData(true);
      try {
        const newData = await onDataUpdate(range);
        setCurrentDatasets(newData);
        calculateTrends(newData);
      } catch (error) {
        console.error('Error updating time series data:', error);
      } finally {
        setIsLoadingData(false);
      }
    }
  }, [setSelectedTimeRange, getDateRange, onTimeRangeChange, onDataUpdate, setIsLoadingData, setCurrentDatasets, calculateTrends]);

  const formatChartData = (): ChartData => {
    return {
      datasets: currentDatasets.map(dataset => ({
        label: dataset.label,
        data: dataset.data.map(point => ({
          x: point.timestamp,
          y: point.value
        })),
        borderColor: dataset.color,
        backgroundColor: dataset.fillColor || `${dataset.color}20`,
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 6,
        borderWidth: 2
      }))
    };
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header with Time Range Selector */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ClockIcon size={20} className="text-gray-500" />
            {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
          </div>
          
          {showTrend && (
            <div className="flex items-center gap-4">
              {Object.entries(trendData).map(([label, trend]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{label}:</span>
                  <div className={`flex items-center gap-1 ${
                    trend.trend === 'up' ? 'text-green-600' : 
                    trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {trend.trend === 'up' ? (
                      <TrendingUpIcon size={16} />
                    ) : trend.trend === 'down' ? (
                      <TrendingDownIcon size={16} />
                    ) : null}
                    <span className="text-sm font-medium">
                      {trend.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Time Range Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {timeRangeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleTimeRangeChange(option.value)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedTimeRange === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={option.description}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        {/* Custom Date Range Picker */}
        {selectedTimeRange === 'custom' && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} className="text-gray-500" />
              <input
                type="datetime-local"
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                onChange={(e) => {
                  const start = new Date(e.target.value);
                  setCustomDateRange(prev => ({ start, end: prev?.end || new Date() }));
                }}
              />
              <span className="text-gray-500">to</span>
              <input
                type="datetime-local"
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                onChange={(e) => {
                  const end = new Date(e.target.value);
                  setCustomDateRange(prev => ({ start: prev?.start || new Date(), end }));
                }}
              />
              <button
                onClick={() => handleTimeRangeChange('custom')}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="p-4">
        {loading || isLoadingData ? (
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <InteractiveChart
            type="area"
            data={formatChartData()}
            height={height}
            showTooltips={true}
            showLegend={true}
            className="border-0 shadow-none"
          />
        )}
      </div>
      
      {/* Summary Stats */}
      {showComparison && currentDatasets.length > 0 && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            {currentDatasets.map(dataset => {
              const values = dataset.data.map(d => d.value);
              const total = values.reduce((sum, val) => sum + val, 0);
              const average = total / values.length;
              const max = Math.max(...values);
              const min = Math.min(...values);
              
              return (
                <div key={dataset.label} className="text-center">
                  <div className="text-sm text-gray-500 mb-1">{dataset.label}</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Intl.NumberFormat().format(average)}
                      </div>
                      <div className="text-gray-500">Avg</div>
                    </div>
                    <div>
                      <div className="font-medium text-green-600">
                        {new Intl.NumberFormat().format(max)}
                      </div>
                      <div className="text-gray-500">Max</div>
                    </div>
                    <div>
                      <div className="font-medium text-red-600">
                        {new Intl.NumberFormat().format(min)}
                      </div>
                      <div className="text-gray-500">Min</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};