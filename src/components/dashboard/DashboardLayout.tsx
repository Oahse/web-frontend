import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart3Icon, 
  UsersIcon, 
  ShoppingCartIcon, 
  DollarSignIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  RefreshCwIcon,
  SettingsIcon,
  DownloadIcon,
  FilterIcon
} from 'lucide-react';
import { Button } from '../ui/Button';

interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'map' | 'list';
  data: Record<string, unknown>;
  loading?: boolean;
  error?: string;
  refreshable?: boolean;
  exportable?: boolean;
}

interface DashboardLayoutProps {
  title: string;
  widgets: DashboardWidget[];
  onRefresh?: (widgetId?: string) => void;
  onExport?: (widgetId: string, format: string) => void;
  loading?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  widgets,
  onRefresh,
  onExport,
  loading = false
}) => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const handleRefresh = async (widgetId?: string) => {
    if (onRefresh) {
      setRefreshing(widgetId || 'all');
      await onRefresh(widgetId);
      setRefreshing(null);
      setLastUpdated(new Date());
    }
  };

  const handleExport = (widgetId: string, format: string) => {
    if (onExport) {
      onExport(widgetId, format);
    }
  };

  const getRoleBasedWidgets = () => {
    if (!user) return widgets;

    // Filter widgets based on user role
    switch (user.role) {
      case 'admin':
      case 'superadmin':
        return widgets; // Admin sees all widgets
      case 'supplier':
        return widgets.filter(w => 
          w.id.includes('supplier') || 
          w.id.includes('product') || 
          w.id.includes('order') ||
          w.id.includes('analytics')
        );
      case 'customer':
        return widgets.filter(w => 
          w.id.includes('customer') || 
          w.id.includes('order') ||
          w.id.includes('wishlist') ||
          w.id.includes('recommendations')
        );
      default:
        return widgets.slice(0, 3); // Limited view for other roles
    }
  };

  const filteredWidgets = getRoleBasedWidgets();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRefresh()}
                disabled={refreshing === 'all'}
                className="flex items-center gap-2"
              >
                <RefreshCwIcon 
                  size={16} 
                  className={refreshing === 'all' ? 'animate-spin' : ''} 
                />
                Refresh All
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <FilterIcon size={16} />
                Filters
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <SettingsIcon size={16} />
                Customize
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWidgets.map((widget) => (
              <DashboardWidget
                key={widget.id}
                widget={widget}
                onRefresh={() => handleRefresh(widget.id)}
                onExport={(format) => handleExport(widget.id, format)}
                refreshing={refreshing === widget.id}
              />
            ))}
          </div>
        )}

        {/* Real-time Updates Indicator */}
        <div className="fixed bottom-4 right-4">
          <div className="bg-green-500 text-white px-3 py-2 rounded-full text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Live Updates
          </div>
        </div>
      </div>
    </div>
  );
};

interface DashboardWidgetProps {
  widget: DashboardWidget;
  onRefresh: () => void;
  onExport: (format: string) => void;
  refreshing?: boolean;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  widget,
  onRefresh,
  onExport,
  refreshing = false
}) => {
  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'metric':
        return <BarChart3Icon size={20} />;
      case 'chart':
        return <TrendingUpIcon size={20} />;
      case 'table':
        return <UsersIcon size={20} />;
      case 'map':
        return <ShoppingCartIcon size={20} />;
      default:
        return <DollarSignIcon size={20} />;
    }
  };

  const getColSpan = (type: string) => {
    switch (type) {
      case 'chart':
        return 'md:col-span-2';
      case 'table':
        return 'md:col-span-2 lg:col-span-3';
      case 'map':
        return 'md:col-span-2 lg:col-span-2';
      default:
        return '';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${getColSpan(widget.type)}`}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400">
            {getWidgetIcon(widget.type)}
          </span>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {widget.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {widget.refreshable && (
            <button
              onClick={onRefresh}
              disabled={refreshing}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <RefreshCwIcon 
                size={16} 
                className={refreshing ? 'animate-spin' : ''} 
              />
            </button>
          )}
          
          {widget.exportable && (
            <div className="relative group">
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <DownloadIcon size={16} />
              </button>
              <div className="absolute right-0 top-8 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={() => onExport('csv')}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => onExport('excel')}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                >
                  Export Excel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Widget Content */}
      <div className="p-4">
        {widget.loading ? (
          <WidgetSkeleton type={widget.type} />
        ) : widget.error ? (
          <div className="flex items-center justify-center h-32 text-red-500">
            <AlertCircleIcon size={24} className="mr-2" />
            <span>Error loading data</span>
          </div>
        ) : (
          <WidgetContent widget={widget} />
        )}
      </div>
    </div>
  );
};

const WidgetContent: React.FC<{ widget: DashboardWidget }> = ({ widget }) => {
  switch (widget.type) {
    case 'metric':
      return (
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {widget.data.value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {widget.data.label}
          </div>
          {widget.data.change && (
            <div className={`text-sm mt-2 ${
              widget.data.change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {widget.data.change > 0 ? '+' : ''}{widget.data.change}%
            </div>
          )}
        </div>
      );
    
    case 'chart':
      return (
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chart Component Placeholder
        </div>
      );
    
    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                {widget.data.headers?.map((header: string, index: number) => (
                  <th key={index} className="text-left py-2 font-medium text-gray-900 dark:text-white">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {widget.data.rows?.map((row: unknown[], index: number) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                  {row.map((cell: unknown, cellIndex: number) => (
                    <td key={cellIndex} className="py-2 text-gray-600 dark:text-gray-400">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}            </tbody>
          </table>
        </div>
      );
    
    default:
      return (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Widget content
        </div>
      );
  }
};

const WidgetSkeleton: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'metric':
      return (
        <div className="text-center animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto"></div>
        </div>
      );
    
    case 'chart':
      return (
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      );
    
    case 'table':
      return (
        <div className="space-y-2 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      );
    
    default:
      return (
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      );
  }
};

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          <div className="p-4">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};