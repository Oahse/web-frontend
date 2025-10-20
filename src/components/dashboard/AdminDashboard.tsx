import React, { useState, useEffect } from 'react';
import { CustomizableDashboard, DashboardWidget, WidgetTemplate } from './widgets/CustomizableDashboard';
import { InteractiveChart } from './charts/InteractiveChart';
import { GeographicChart } from './charts/GeographicChart';
import { AdvancedTable } from './tables/AdvancedTable';
import { RealTimeWidget } from './widgets/RealTimeWidget';
import {
  BarChart3Icon,
  MapIcon,
  TableIcon,
  ActivityIcon,
  PieChartIcon,
  LineChartIcon
} from 'lucide-react';



// Metric Widget Component
const MetricWidget: React.FC<{ title: string; value: string; change: number; label: string }> = ({
  title, value, change, label
}) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
    <div className="text-sm text-gray-500 mb-2">{label}</div>
    <div className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
      {change > 0 ? '+' : ''}{change}%
    </div>
  </div>
);

// Chart Widget Component
const ChartWidget: React.FC<{ data: { labels: string[]; datasets: { label: string; data: number[]; borderColor?: string; backgroundColor?: string; }[] }; type: 'line' | 'bar' | 'pie' }> = ({ data, type }) => (
  <InteractiveChart
    type={type}
    data={data}
    height={200}
    showTooltips={true}
    showLegend={true}
    className="border-0 shadow-none"
  />
);

// Table Widget Component
const TableWidget: React.FC<{ data: { headers: string[]; rows: (string | number | boolean)[][] } }> = ({ data }) => (
  <AdvancedTable
    columns={data.headers.map(header => ({
      key: header.toLowerCase().replace(/\s+/g, '_'),
      label: header,
      sortable: true
    }))}
    data={data.rows.map((row, index) => ({
      id: index,
      ...Object.fromEntries(
        data.headers.map((header, i) => [
          header.toLowerCase().replace(/\s+/g, '_'),
          row[i]
        ])
      )
    }))}
    pagination={false}
    searchable={false}
    className="border-0 shadow-none"
  />
);

// Geographic Widget Component
const GeographicWidget: React.FC<{ data: { countries: { country: string; users: number; percentage: number; }[] } }> = ({ data }) => (
  <GeographicChart
    data={data.countries.map((country: { country: string; users: number; percentage: number; }) => ({
      country: country.country,
      countryCode: country.country.substring(0, 2).toUpperCase(),
      coordinates: [0, 0] as [number, number], // Would be actual coordinates
      value: country.users,
      percentage: country.percentage
    }))}
    height={250}
    viewMode="list"
    className="border-0 shadow-none"
  />
);

export const AdminDashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);

  const widgetTemplates: WidgetTemplate[] = [
    {
      id: 'metric-template',
      name: 'Metric Card',
      description: 'Display key performance indicators',
      type: 'metric',
      component: MetricWidget,
      defaultLayout: { w: 3, h: 3, minW: 2, minH: 2 },
      icon: <BarChart3Icon size={20} />,
      category: 'analytics'
    },
    {
      id: 'line-chart-template',
      name: 'Line Chart',
      description: 'Show trends over time',
      type: 'chart',
      component: ChartWidget,
      defaultProps: { type: 'line' },
      defaultLayout: { w: 6, h: 4, minW: 4, minH: 3 },
      icon: <LineChartIcon size={20} />,
      category: 'analytics'
    },
    {
      id: 'bar-chart-template',
      name: 'Bar Chart',
      description: 'Compare different categories',
      type: 'chart',
      component: ChartWidget,
      defaultProps: { type: 'bar' },
      defaultLayout: { w: 6, h: 4, minW: 4, minH: 3 },
      icon: <BarChart3Icon size={20} />,
      category: 'analytics'
    },
    {
      id: 'pie-chart-template',
      name: 'Pie Chart',
      description: 'Show proportional data',
      type: 'chart',
      component: ChartWidget,
      defaultProps: { type: 'pie' },
      defaultLayout: { w: 4, h: 4, minW: 3, minH: 3 },
      icon: <PieChartIcon size={20} />,
      category: 'analytics'
    },
    {
      id: 'table-template',
      name: 'Data Table',
      description: 'Display tabular data with sorting and filtering',
      type: 'table',
      component: TableWidget,
      defaultLayout: { w: 8, h: 5, minW: 6, minH: 4 },
      icon: <TableIcon size={20} />,
      category: 'analytics'
    },
    {
      id: 'geographic-template',
      name: 'Geographic Chart',
      description: 'Show data by geographic location',
      type: 'map',
      component: GeographicWidget,
      defaultLayout: { w: 6, h: 5, minW: 4, minH: 4 },
      icon: <MapIcon size={20} />,
      category: 'analytics'
    },
    {
      id: 'realtime-template',
      name: 'Real-time Monitor',
      description: 'Live data updates',
      type: 'realtime',
      component: RealTimeWidget,
      defaultLayout: { w: 6, h: 4, minW: 4, minH: 3 },
      icon: <ActivityIcon size={20} />,
      category: 'analytics'
    }
  ];

  useEffect(() => {
    // Initialize default widgets
    const defaultWidgets: DashboardWidget[] = [
      {
        id: 'total-users',
        type: 'metric',
        title: 'Total Users',
        component: MetricWidget,
        props: {
          title: 'Total Users',
          value: '12,847',
          label: 'Active Users',
          change: 12.5
        },
        layout: { x: 0, y: 0, w: 3, h: 3 }
      },
      {
        id: 'total-orders',
        type: 'metric',
        title: 'Total Orders',
        component: MetricWidget,
        props: {
          title: 'Total Orders',
          value: '3,421',
          label: 'This Month',
          change: 8.2
        },
        layout: { x: 3, y: 0, w: 3, h: 3 }
      },
      {
        id: 'revenue',
        type: 'metric',
        title: 'Revenue',
        component: MetricWidget,
        props: {
          title: 'Revenue',
          value: '$284,592',
          label: 'This Month',
          change: 15.3
        },
        layout: { x: 6, y: 0, w: 3, h: 3 }
      },
      {
        id: 'conversion-rate',
        type: 'metric',
        title: 'Conversion Rate',
        component: MetricWidget,
        props: {
          title: 'Conversion Rate',
          value: '3.24%',
          label: 'Last 30 Days',
          change: -2.1
        },
        layout: { x: 9, y: 0, w: 3, h: 3 }
      },
      {
        id: 'visitor-analytics',
        type: 'chart',
        title: 'Visitor Analytics',
        component: ChartWidget,
        props: {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
      label: 'Sales Over Time',
      data: [1200, 1900, 3000, 2500, 2000, 3000],
      borderColor: 'var(--color-info)',
      backgroundColor: 'var(--color-info)20',
      fill: true,
      tension: 0.4
    }]
          }
        },
        layout: { x: 0, y: 3, w: 6, h: 4 }
      },
      {
        id: 'device-analytics',
        type: 'chart',
        title: 'Device Analytics',
        component: ChartWidget,
        props: {
          type: 'pie',
          data: {
            labels: ['Desktop', 'Mobile', 'Tablet'],
            datasets: [{
              label: 'Users',
              data: [45.2, 42.8, 12.0],
              backgroundColor: ['var(--color-info)', 'var(--color-success)', 'var(--color-warning)']
            }]
          }
        },
        layout: { x: 6, y: 3, w: 6, h: 4 }
      },
      {
        id: 'geographic-data',
        type: 'map',
        title: 'Geographic Distribution',
        component: GeographicWidget,
        props: {
          data: {
            countries: [
              { country: 'United States', users: 5420, percentage: 42.1 },
              { country: 'Canada', users: 2180, percentage: 17.0 },
              { country: 'United Kingdom', users: 1890, percentage: 14.7 },
              { country: 'Germany', users: 1240, percentage: 9.6 },
              { country: 'France', users: 980, percentage: 7.6 }
            ]
          }
        },
        layout: { x: 0, y: 7, w: 6, h: 5 }
      },
      {
        id: 'top-products',
        type: 'table',
        title: 'Top Performing Products',
        component: TableWidget,
        props: {
          data: {
            headers: ['Product', 'Sales', 'Revenue', 'Growth'],
            rows: [
              ['Wireless Headphones', '1,234', '$49,360', '+12%'],
              ['Smart Watch', '987', '$78,960', '+8%'],
              ['Laptop Stand', '756', '$22,680', '+15%'],
              ['USB-C Hub', '654', '$19,620', '+5%'],
              ['Bluetooth Speaker', '543', '$21,720', '+18%']
            ]
          }
        },
        layout: { x: 6, y: 7, w: 6, h: 5 }
      }
    ];

    setWidgets(defaultWidgets);
  }, []);

  const handleWidgetsChange = (updatedWidgets: DashboardWidget[]) => {
    setWidgets(updatedWidgets);
  };

  const handleSave = (layout: DashboardWidget[]) => {
    console.log('Saving dashboard layout:', layout);
    // Here you would save to backend
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <CustomizableDashboard
        widgets={widgets}
        widgetTemplates={widgetTemplates}
        editable={true}
        onWidgetsChange={handleWidgetsChange}
        onSave={handleSave}
        className="max-w-7xl mx-auto"
      />
    </div>
  );
};