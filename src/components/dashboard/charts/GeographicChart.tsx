import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { GlobeIcon, MapIcon, BarChart3Icon, ListIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export interface GeographicDataPoint {
  country: string;
  countryCode: string;
  coordinates: LatLngExpression;
  value: number;
  percentage?: number;
  color?: string;
  label?: string;
  additionalData?: { [key: string]: unknown };
}

export interface GeographicChartProps {
  data: GeographicDataPoint[];
  title?: string;
  height?: number;
  viewMode?: 'map' | 'list' | 'chart';
  showPercentages?: boolean;
  showTooltips?: boolean;
  colorScale?: string[];
  onCountryClick?: (country: GeographicDataPoint) => void;
  onViewModeChange?: (mode: 'map' | 'list' | 'chart') => void;
  loading?: boolean;
  className?: string;
}

export const GeographicChart: React.FC<GeographicChartProps> = ({
  data,
  title,
  height = 400,
  viewMode = 'map',
  showPercentages = true,
  showTooltips = true,
  colorScale = ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
  onCountryClick,
  onViewModeChange,
  loading = false,
  className = ''
}) => {
  const [currentViewMode, setCurrentViewMode] = useState<'map' | 'list' | 'chart'>(viewMode);
  const [sortedData, setSortedData] = useState<GeographicDataPoint[]>([]);
  const [maxValue, setMaxValue] = useState<number>(0);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => b.value - a.value);
    setSortedData(sorted);
    setMaxValue(Math.max(...data.map(d => d.value)));
  }, [data]);

  const getColorForValue = (value: number): string => {
    if (maxValue === 0) return colorScale[0];
    
    const ratio = value / maxValue;
    const index = Math.min(Math.floor(ratio * colorScale.length), colorScale.length - 1);
    return colorScale[index];
  };

  const getRadiusForValue = (value: number): number => {
    if (maxValue === 0) return 5;
    
    const ratio = value / maxValue;
    return Math.max(5, ratio * 30); // Min radius 5, max radius 30
  };

  const handleViewModeChange = (mode: 'map' | 'list' | 'chart') => {
    setCurrentViewMode(mode);
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  const handleCountryClick = (country: GeographicDataPoint) => {
    if (onCountryClick) {
      onCountryClick(country);
    }
  };

  const renderMap = () => (
    <div style={{ height: height - 60 }}>
      <MapContainer
        ref={mapRef}
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {sortedData.map((point, index) => (
          <CircleMarker
            key={`${point.countryCode}-${index}`}
            center={point.coordinates}
            radius={getRadiusForValue(point.value)}
            fillColor={point.color || getColorForValue(point.value)}
            color="var(--color-copy-inverse)"
            weight={2}
            opacity={1}
            fillOpacity={0.7}
            eventHandlers={{
              click: () => handleCountryClick(point)
            }}
          >
            {showTooltips && (
              <Tooltip>
                <div className="text-sm">
                  <div className="font-semibold">{point.country}</div>
                  <div>Value: {new Intl.NumberFormat().format(point.value)}</div>
                  {showPercentages && point.percentage && (
                    <div>Percentage: {point.percentage.toFixed(1)}%</div>
                  )}
                  {point.label && <div>{point.label}</div>}
                </div>
              </Tooltip>
            )}
            
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg mb-2">{point.country}</h3>
                <div className="space-y-1 text-sm">
                  <div>
                    <span className="font-medium">Value:</span>{' '}
                    {new Intl.NumberFormat().format(point.value)}
                  </div>
                  {showPercentages && point.percentage && (
                    <div>
                      <span className="font-medium">Percentage:</span>{' '}
                      {point.percentage.toFixed(1)}%
                    </div>
                  )}
                  {point.additionalData && Object.entries(point.additionalData).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium capitalize">{key}:</span>{' '}
                      {typeof value === 'number' ? new Intl.NumberFormat().format(value) : value}
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );

  const renderList = () => (
    <div className="space-y-2" style={{ height: height - 60, overflowY: 'auto' }}>
      {sortedData.map((point, index) => (
        <div
          key={`${point.countryCode}-${index}`}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
          onClick={() => handleCountryClick(point)}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: point.color || getColorForValue(point.value) }}
              />
              <span className="font-medium text-gray-900">{point.country}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {new Intl.NumberFormat().format(point.value)}
              </div>
              {showPercentages && point.percentage && (
                <div className="text-gray-500">{point.percentage.toFixed(1)}%</div>
              )}
            </div>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(point.value / maxValue) * 100}%`,
                  backgroundColor: point.color || getColorForValue(point.value)
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChart = () => (
    <div className="space-y-4" style={{ height: height - 60, overflowY: 'auto' }}>
      <div className="grid grid-cols-1 gap-3">
        {sortedData.slice(0, 10).map((point, index) => (
          <div key={`${point.countryCode}-${index}`} className="flex items-center gap-3">
            <div className="w-20 text-sm font-medium text-gray-700 truncate">
              {point.country}
            </div>
            <div className="flex-1 relative">
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium transition-all duration-500"
                  style={{
                    width: `${(point.value / maxValue) * 100}%`,
                    backgroundColor: point.color || getColorForValue(point.value)
                  }}
                >
                  {point.value > maxValue * 0.1 && new Intl.NumberFormat().format(point.value)}
                </div>
              </div>
            </div>
            <div className="w-16 text-right text-sm text-gray-600">
              {showPercentages && point.percentage ? `${point.percentage.toFixed(1)}%` : ''}
            </div>
          </div>
        ))}
      </div>
      
      {sortedData.length > 10 && (
        <div className="text-center text-sm text-gray-500 pt-2 border-t border-gray-200">
          Showing top 10 of {sortedData.length} countries
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="p-4">
          <div className={`bg-gray-200 rounded animate-pulse`} style={{ height: height - 60 }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <GlobeIcon size={20} className="text-gray-500" />
          {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
        </div>
        
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleViewModeChange('map')}
            className={`p-2 rounded-md transition-colors ${
              currentViewMode === 'map'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Map View"
          >
            <MapIcon size={16} />
          </button>
          <button
            onClick={() => handleViewModeChange('list')}
            className={`p-2 rounded-md transition-colors ${
              currentViewMode === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="List View"
          >
            <ListIcon size={16} />
          </button>
          <button
            onClick={() => handleViewModeChange('chart')}
            className={`p-2 rounded-md transition-colors ${
              currentViewMode === 'chart'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Chart View"
          >
            <BarChart3Icon size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {currentViewMode === 'map' && renderMap()}
        {currentViewMode === 'list' && renderList()}
        {currentViewMode === 'chart' && renderChart()}
      </div>

      {/* Legend */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Low</span>
          <div className="flex items-center gap-1">
            {colorScale.map((color, index) => (
              <div
                key={index}
                className="w-4 h-2 rounded-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};