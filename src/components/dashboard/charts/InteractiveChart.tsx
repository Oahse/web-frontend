import React, { useState, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { DownloadIcon, MaximizeIcon, RefreshCwIcon } from 'lucide-react';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale,
  Filler
);

export interface ChartDataset {
  label: string;
  data: number[] | { x: string | Date; y: number }[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
}

export interface ChartData {
  labels?: string[];
  datasets: ChartDataset[];
}

export interface DrillDownData {
  [key: string]: ChartData;
}

export interface InteractiveChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  data: ChartData;
  title?: string;
  height?: number;
  showTooltips?: boolean;
  showLegend?: boolean;
  enableDrillDown?: boolean;
  drillDownData?: DrillDownData;
  onDataPointClick?: (dataPoint: { dataIndex: number; datasetIndex: number; label?: string; value: number | { x: string | Date; y: number } }, index: number) => void;
  onExport?: (format: 'png' | 'pdf' | 'csv') => void;
  refreshable?: boolean;
  onRefresh?: () => void;
  loading?: boolean;
  className?: string;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  type,
  data,
  title,
  height = 300,
  showTooltips = true,
  showLegend = true,
  enableDrillDown = false,
  drillDownData,
  onDataPointClick,
  onExport,
  refreshable = false,
  onRefresh,
  loading = false,
  className = ''
}) => {
  const chartRef = useRef<ChartJS | null>(null);
  const [currentData, setCurrentData] = useState<ChartData>(data);
  const [drillDownPath, setDrillDownPath] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        enabled: showTooltips,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: type === 'pie' || type === 'doughnut' ? {} : {
      x: {
        display: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'var(--color-copy-light)',
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'var(--color-copy-light)',
          callback: function(value: unknown) {
            return new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short'
            }).format(value as number);
          }
        }
      }
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const element = elements[0];
        const dataIndex = element.index;
        const datasetIndex = element.datasetIndex;
        
        if (enableDrillDown && drillDownData) {
          const label = currentData.labels?.[dataIndex];
          if (label && drillDownData[label]) {
            setDrillDownPath([...drillDownPath, label]);
            setCurrentData(drillDownData[label]);
          }
        }
        
        if (onDataPointClick) {
          onDataPointClick({
            dataIndex,
            datasetIndex,
            label: currentData.labels?.[dataIndex],
            value: currentData.datasets[datasetIndex].data[dataIndex]
          }, dataIndex);
        }
      }
    },
    onHover: (event: any, elements: any[]) => {
      event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
    }
  };

  const handleExport = (format: 'png' | 'pdf' | 'csv') => {
    if (format === 'png' && chartRef.current) {
      const canvas = chartRef.current.canvas;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${title || 'chart'}.png`;
      link.href = url;
      link.click();
    } else if (onExport) {
      onExport(format);
    }
    setShowExportMenu(false);
  };

  const handleDrillUp = () => {
    if (drillDownPath.length > 0) {
      const newPath = [...drillDownPath];
      newPath.pop();
      setDrillDownPath(newPath);
      
      // Navigate back to parent data
      let targetData = data;
      for (const pathItem of newPath) {
        if (drillDownData && drillDownData[pathItem]) {
          targetData = drillDownData[pathItem];
        }
      }
      setCurrentData(targetData);
    }
  };

  const renderChart = () => {
    const commonProps = {
      ref: chartRef,
      data: currentData,
      options: chartOptions as any,
      height: height
    };

    switch (type) {
      case 'line':
        return <Line {...commonProps} />;
      case 'bar':
        return <Bar {...commonProps} />;
      case 'pie':
        return <Pie {...commonProps} />;
      case 'doughnut':
        return <Doughnut {...commonProps} />;
      case 'area': {
        const areaData = {
          ...currentData,
          datasets: currentData.datasets.map(dataset => ({
            ...dataset,
            fill: true,
            backgroundColor: dataset.backgroundColor || 'rgba(75, 192, 192, 0.2)',
          }))
        };
        return <Line {...commonProps} data={areaData} />;
      }      default:
        return <Line {...commonProps} />;
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="p-4">
          <div className={`bg-gray-200 rounded animate-pulse`} style={{ height: height }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${isFullscreen ? 'fixed inset-4 z-50' : ''} ${className}`}>
      {/* Chart Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {title && (
            <h3 className="font-semibold text-gray-900">{title}</h3>
          )}
          {drillDownPath.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">›</span>
              <button
                onClick={handleDrillUp}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                {drillDownPath[drillDownPath.length - 1]}
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {refreshable && (
            <button
              onClick={onRefresh}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
              title="Refresh"
            >
              <RefreshCwIcon size={16} />
            </button>
          )}
          
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 relative"
            title="Export"
          >
            <DownloadIcon size={16} />
            {showExportMenu && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md py-2 z-10 min-w-32">
                <button
                  onClick={() => handleExport('png')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Export PNG
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Export CSV
                </button>
              </div>
            )}
          </button>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
            title="Fullscreen"
          >
            <MaximizeIcon size={16} />
          </button>
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-4">
        <div style={{ height: isFullscreen ? 'calc(100vh - 200px)' : height }}>
          {renderChart()}
        </div>
      </div>
    </div>
  );
};