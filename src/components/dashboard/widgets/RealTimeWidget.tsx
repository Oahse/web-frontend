import React, { useState, useEffect, useRef } from 'react';
import { InteractiveChart, ChartData } from '../charts/InteractiveChart';
import { 
  ActivityIcon, 
  WifiIcon, 
  WifiOffIcon, 
  PauseIcon, 
  PlayIcon,
  SettingsIcon,
  AlertCircleIcon
} from 'lucide-react';

export interface RealTimeDataPoint {
  timestamp: Date;
  value: number;
  metadata?: { [key: string]: unknown };
}

export interface RealTimeWidgetProps {
  title: string;
  dataSource: string; // WebSocket URL or API endpoint
  chartType?: 'line' | 'bar' | 'area';
  maxDataPoints?: number;
  updateInterval?: number; // in milliseconds
  showConnectionStatus?: boolean;
  showControls?: boolean;
  height?: number;
  color?: string;
  thresholds?: {
    warning?: number;
    critical?: number;
  };
  onDataUpdate?: (data: RealTimeDataPoint[]) => void;
  onThresholdExceeded?: (type: 'warning' | 'critical', value: number) => void;
  className?: string;
}

export const RealTimeWidget: React.FC<RealTimeWidgetProps> = ({
  title,
  dataSource,
  chartType = 'line',
  maxDataPoints = 50,
  updateInterval = 1000,
  showConnectionStatus = true,
  showControls = true,
  height = 300,
  color = 'var(--color-info)',
  thresholds,
  onDataUpdate,
  onThresholdExceeded,
  className = ''
}) => {
  const [data, setData] = useState<RealTimeDataPoint[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize connection
  useEffect(() => {
    if (!isPaused) {
      connectToDataSource();
    }
    
    return () => {
      cleanup();
    };
  }, [dataSource, isPaused, cleanup, connectToDataSource]);

  // Auto-reconnect logic
  useEffect(() => {
    if (!isConnected && !isPaused && connectionAttempts < 5) {
      const delay = Math.min(1000 * Math.pow(2, connectionAttempts), 30000); // Exponential backoff
      reconnectTimeoutRef.current = setTimeout(() => {
        setConnectionAttempts(prev => prev + 1);
        connectToDataSource();
      }, delay);
    }
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [isConnected, isPaused, connectionAttempts, connectToDataSource]);

  const connectToDataSource = useCallback(() => {
    cleanup();
    
    if (dataSource.startsWith('ws://') || dataSource.startsWith('wss://')) {
      connectWebSocket();
    } else {
      connectPolling();
    }
  }, [cleanup, dataSource, connectWebSocket, connectPolling]);

  const connectWebSocket = useCallback(() => {
    try {
      wsRef.current = new WebSocket(dataSource);
      
      wsRef.current.onopen = () => {
        setIsConnected(true);
        setError(null);
        setConnectionAttempts(0);
        console.log(`WebSocket connected to ${dataSource}`);
      };
      
      wsRef.current.onmessage = (event) => {
        try {
          const newDataPoint: RealTimeDataPoint = JSON.parse(event.data);
          addDataPoint(newDataPoint);
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };
      
      wsRef.current.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket connection closed');
      };
      
      wsRef.current.onerror = (error) => {
        setError('WebSocket connection error');
        setIsConnected(false);
        console.error('WebSocket error:', error);
      };
    } catch (err) {
      setError('Failed to create WebSocket connection');
      setIsConnected(false);
    }
  }, [dataSource, addDataPoint, setIsConnected, setError, setConnectionAttempts]);

  const connectPolling = useCallback(() => {
    const poll = async () => {
      try {
        const response = await fetch(dataSource);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const newDataPoint: RealTimeDataPoint = await response.json();
        addDataPoint(newDataPoint);
        
        if (!isConnected) {
          setIsConnected(true);
          setError(null);
          setConnectionAttempts(0);
        }
      } catch (err) {
        setError(`Polling error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setIsConnected(false);
      }
    };
    
    // Initial poll
    poll();
    
    // Set up interval
    intervalRef.current = setInterval(poll, updateInterval);
  }, [dataSource, updateInterval, addDataPoint, isConnected, setIsConnected, setError, setConnectionAttempts]);

  const addDataPoint = useCallback((newPoint: RealTimeDataPoint) => {
    if (isPaused) return;
    
    setData(prevData => {
      const updatedData = [...prevData, newPoint];
      
      // Keep only the last maxDataPoints
      if (updatedData.length > maxDataPoints) {
        updatedData.splice(0, updatedData.length - maxDataPoints);
      }
      
      // Check thresholds
      if (thresholds) {
        if (thresholds.critical && newPoint.value >= thresholds.critical) {
          onThresholdExceeded?.('critical', newPoint.value);
        } else if (thresholds.warning && newPoint.value >= thresholds.warning) {
          onThresholdExceeded?.('warning', newPoint.value);
        }
      }
      
      setLastUpdate(new Date());
      
      if (onDataUpdate) {
        onDataUpdate(updatedData);
      }
      
      return updatedData;
    });
  }, [isPaused, maxDataPoints, thresholds, onThresholdExceeded, setLastUpdate, onDataUpdate]);

  const cleanup = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const togglePause = () => {
    setIsPaused(prev => {
      const newPaused = !prev;
      if (newPaused) {
        cleanup();
        setIsConnected(false);
      } else {
        connectToDataSource();
      }
      return newPaused;
    });
  };

  const reconnect = () => {
    setConnectionAttempts(0);
    setError(null);
    connectToDataSource();
  };

  const formatChartData = (): ChartData => {
    return {
      datasets: [{
        label: title,
        data: data.map(point => ({
          x: point.timestamp,
          y: point.value
        })),
        borderColor: color,
        backgroundColor: `${color}20`,
        fill: chartType === 'area',
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 4,
        borderWidth: 2
      }]
    };
  };

  const getConnectionStatusColor = () => {
    if (isPaused) return 'text-yellow-500';
    if (isConnected) return 'text-green-500';
    if (error) return 'text-red-500';
    return 'text-gray-500';
  };

  const getConnectionStatusText = () => {
    if (isPaused) return 'Paused';
    if (isConnected) return 'Connected';
    if (error) return 'Error';
    return 'Connecting...';
  };

  const getCurrentValue = () => {
    if (data.length === 0) return null;
    return data[data.length - 1].value;
  };

  const getValueTrend = () => {
    if (data.length < 2) return null;
    
    const current = data[data.length - 1].value;
    const previous = data[data.length - 2].value;
    
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <ActivityIcon size={20} className="text-gray-500" />
          <h3 className="font-semibold text-gray-900">{title}</h3>
          
          {showConnectionStatus && (
            <div className="flex items-center gap-2">
              {isConnected && !isPaused ? (
                <WifiIcon size={16} className={getConnectionStatusColor()} />
              ) : (
                <WifiOffIcon size={16} className={getConnectionStatusColor()} />
              )}
              <span className={`text-xs ${getConnectionStatusColor()}`}>
                {getConnectionStatusText()}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Current Value */}
          {getCurrentValue() !== null && (
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                {new Intl.NumberFormat().format(getCurrentValue()!)}
              </div>
              {getValueTrend() && (
                <div className={`text-xs ${
                  getValueTrend() === 'up' ? 'text-green-600' :
                  getValueTrend() === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {getValueTrend() === 'up' ? '↗' : getValueTrend() === 'down' ? '↘' : '→'}
                </div>
              )}
            </div>
          )}
          
          {showControls && (
            <div className="flex items-center gap-1">
              <button
                onClick={togglePause}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
              </button>
              
              <button
                onClick={reconnect}
                disabled={isConnected && !error}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 disabled:opacity-50"
                title="Reconnect"
              >
                <SettingsIcon size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-200">
          <div className="flex items-center gap-2 text-red-700 text-sm">
            <AlertCircleIcon size={16} />
            <span>{error}</span>
            <button
              onClick={reconnect}
              className="ml-auto text-red-600 hover:text-red-800 underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="p-4">
        {data.length > 0 ? (
          <InteractiveChart
            type={chartType}
            data={formatChartData()}
            height={height}
            showTooltips={true}
            showLegend={false}
            className="border-0 shadow-none"
          />
        ) : (
          <div 
            className="flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg"
            style={{ height }}
          >
            <div className="text-center">
              <ActivityIcon size={48} className="mx-auto mb-2 text-gray-300" />
              <p>Waiting for data...</p>
              {lastUpdate && (
                <p className="text-xs text-gray-400 mt-1">
                  Last update: {lastUpdate.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Threshold Indicators */}
      {thresholds && data.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              {thresholds.warning && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Warning: {new Intl.NumberFormat().format(thresholds.warning)}</span>
                </div>
              )}
              {thresholds.critical && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Critical: {new Intl.NumberFormat().format(thresholds.critical)}</span>
                </div>
              )}
            </div>
            
            {lastUpdate && (
              <span>Updated: {lastUpdate.toLocaleTimeString()}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};