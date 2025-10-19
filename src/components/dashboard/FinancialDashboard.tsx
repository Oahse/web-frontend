import React, { useState, useEffect } from 'react';
import { CustomizableDashboard, DashboardWidget, WidgetTemplate } from './widgets/CustomizableDashboard';
import { InteractiveChart } from './charts/InteractiveChart';
import { TimeSeriesChart, TimeSeriesDataset } from './charts/TimeSeriesChart';
import { AdvancedTable } from './tables/AdvancedTable';
import {
  DollarSignIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PieChartIcon,
  BarChart3Icon,
  CreditCardIcon,
  CalculatorIcon,
  LineChartIcon,
  TableIcon
} from 'lucide-react';

interface FinancialDashboardProps {
  onRefresh?: (widgetId?: string) => void;
  onExport?: (widgetId: string, format: string) => void;
}

// Financial Metric Widget
const FinancialMetricWidget: React.FC<{ 
  value: string; 
  change: number; 
  label: string;
  icon?: React.ReactNode;
  color?: string;
}> = ({ value, change, label, icon, color = 'green' }) => (
  <div className="text-center">
    <div className="flex items-center justify-center mb-3">
      {icon && (
        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
          {icon}
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-500 mb-2">{label}</div>
    <div className={`text-sm font-medium flex items-center justify-center gap-1 ${
      change > 0 ? 'text-green-600' : 'text-red-600'
    }`}>
      {change > 0 ? <TrendingUpIcon size={14} /> : <TrendingDownIcon size={14} />}
      {change > 0 ? '+' : ''}{change}%
    </div>
  </div>
);

// Revenue Analytics Widget
const RevenueAnalyticsWidget: React.FC = () => {
  const generateRevenueData = (): TimeSeriesDataset[] => {
    const now = new Date();
    return [
      {
        label: 'Revenue',
        data: Array.from({ length: 30 }, (_, i) => ({
          timestamp: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000),
          value: Math.floor(Math.random() * 10000) + 5000
        })),
        color: 'var(--color-success)'
      },
      {
        label: 'Profit',
        data: Array.from({ length: 30 }, (_, i) => ({
          timestamp: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000),
          value: Math.floor(Math.random() * 3000) + 1000
        })),
        color: 'var(--color-info)'
      }
    ];
  };

  return (
    <TimeSeriesChart
      datasets={generateRevenueData()}
      title="Revenue & Profit Trends"
      height={300}
      defaultTimeRange="30d"
      showComparison={true}
      showTrend={true}
      className="border-0 shadow-none"
    />
  );
};

// Expense Breakdown Widget
const ExpenseBreakdownWidget: React.FC = () => {
  const expenseData = {
    labels: ['Cost of Goods', 'Marketing', 'Operations', 'Salaries', 'Technology', 'Other'],
    datasets: [{
      label: 'Expenses',
      data: [45000, 12000, 8000, 25000, 6000, 4000],
      backgroundColor: [
        'var(--color-error)',
        'var(--color-warning)',
        '#8b5cf6',
        '#06b6d4',
        'var(--color-success)',
        '#6b7280'
      ]
    }]
  };

  return (
    <InteractiveChart
      type="doughnut"
      data={expenseData}
      height={300}
      showTooltips={true}
      showLegend={true}
      className="border-0 shadow-none"
    />
  );
};

// Cash Flow Widget
const CashFlowWidget: React.FC = () => {
  const cashFlowData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Cash Inflow',
        data: [85000, 92000, 78000, 105000, 98000, 112000],
        borderColor: 'var(--color-success)',
        borderWidth: 2
      },
      {
        label: 'Cash Outflow',
        data: [65000, 72000, 68000, 85000, 78000, 82000],
        backgroundColor: 'var(--color-error)',
        borderColor: 'var(--color-error)',
        borderWidth: 2
      }
    ]
  };

  return (
    <InteractiveChart
      type="bar"
      data={cashFlowData}
      height={300}
      showTooltips={true}
      showLegend={true}
      className="border-0 shadow-none"
    />
  );
};

// Financial Transactions Table
const TransactionsTableWidget: React.FC = () => {
  const transactionData = [
    {
      id: 'TXN-001',
      transaction_id: 'TXN-001',
      date: '2024-01-15',
      type: 'Revenue',
      category: 'Product Sales',
      amount: 2450.00,
      status: 'Completed',
      payment_method: 'Credit Card'
    },
    {
      id: 'TXN-002',
      transaction_id: 'TXN-002',
      date: '2024-01-15',
      type: 'Expense',
      category: 'Marketing',
      amount: -850.00,
      status: 'Completed',
      payment_method: 'Bank Transfer'
    },
    {
      id: 'TXN-003',
      transaction_id: 'TXN-003',
      date: '2024-01-14',
      type: 'Revenue',
      category: 'Subscription',
      amount: 199.99,
      status: 'Completed',
      payment_method: 'PayPal'
    },
    {
      id: 'TXN-004',
      transaction_id: 'TXN-004',
      date: '2024-01-14',
      type: 'Expense',
      category: 'Operations',
      amount: -1200.00,
      status: 'Pending',
      payment_method: 'Bank Transfer'
    },
    {
      id: 'TXN-005',
      transaction_id: 'TXN-005',
      date: '2024-01-13',
      type: 'Revenue',
      category: 'Product Sales',
      amount: 3200.00,
      status: 'Completed',
      payment_method: 'Credit Card'
    }
  ];

  const columns = [
    {
      key: 'transaction_id',
      label: 'Transaction ID',
      sortable: true,
      render: (value: string) => (
        <span className="font-mono text-sm text-blue-600">{value}</span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      format: 'date' as const
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Revenue' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      align: 'right' as const,
      render: (value: number) => (
        <span className={`font-semibold ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {value > 0 ? '+' : ''}${Math.abs(value).toLocaleString()}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'payment_method',
      label: 'Payment Method',
      sortable: true
    }
  ];

  return (
    <AdvancedTable
      columns={columns}
      data={transactionData}
      searchable={true}
      sortable={true}
      exportable={true}
      pagination={true}
      pageSize={10}
      className="border-0 shadow-none"
    />
  );
};

// Profit Margin Analysis Widget
const ProfitMarginWidget: React.FC = () => {
  const marginData = {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
    datasets: [
      {
        label: 'Gross Margin %',
        data: [65, 68, 72, 70, 75],
        borderColor: 'var(--color-success)',
        backgroundColor: 'var(--color-success)20',
        fill: true
      },
      {
        label: 'Net Margin %',
        data: [15, 18, 22, 20, 25],
        borderColor: 'var(--color-info)',
        backgroundColor: 'var(--color-info)20',
        fill: true
      }
    ]
  };

  return (
    <InteractiveChart
      type="line"
      data={marginData}
      height={250}
      showTooltips={true}
      showLegend={true}
      className="border-0 shadow-none"
    />
  );
};

export const FinancialDashboard: React.FC<FinancialDashboardProps> = () => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);

  const widgetTemplates: WidgetTemplate[] = [
    {
      id: 'financial-metric-template',
      name: 'Financial Metric',
      description: 'Key financial performance indicators',
      type: 'metric',
      component: FinancialMetricWidget,
      defaultLayout: { w: 3, h: 4, minW: 2, minH: 3 },
      icon: <DollarSignIcon size={20} />,
      category: 'analytics'
    },
    {
      id: 'revenue-analytics-template',
      name: 'Revenue Analytics',
      description: 'Revenue and profit trends over time',
      type: 'chart',
      component: RevenueAnalyticsWidget,
      defaultLayout: { w: 8, h: 5, minW: 6, minH: 4 },
      icon: <LineChartIcon size={20} />,
      category: 'analytics'
    },
    {
      id: 'expense-breakdown-template',
      name: 'Expense Breakdown',
      description: 'Categorized expense analysis',
      type: 'chart',
      component: ExpenseBreakdownWidget,
      defaultLayout: { w: 6, h: 5, minW: 4, minH: 4 },
      icon: <PieChartIcon size={20} />,
      category: 'analytics'
    },
    {
      id: 'cash-flow-template',
      name: 'Cash Flow',
      description: 'Cash inflow and outflow analysis',
      type: 'chart',
      component: CashFlowWidget,
      defaultLayout: { w: 6, h: 5, minW: 4, minH: 4 },
      icon: <BarChart3Icon size={20} />,
      category: 'analytics'
    },
    {
      id: 'transactions-table-template',
      name: 'Transactions',
      description: 'Detailed financial transactions',
      type: 'table',
      component: TransactionsTableWidget,
      defaultLayout: { w: 12, h: 6, minW: 8, minH: 5 },
      icon: <TableIcon size={20} />,
      category: 'analytics'
    },
    {
      id: 'profit-margin-template',
      name: 'Profit Margins',
      description: 'Profit margin analysis over time',
      type: 'chart',
      component: ProfitMarginWidget,
      defaultLayout: { w: 6, h: 4, minW: 4, minH: 3 },
      icon: <TrendingUpIcon size={20} />,
      category: 'analytics'
    }
  ];

  useEffect(() => {
    const defaultWidgets: DashboardWidget[] = [
      {
        id: 'total-revenue',
        type: 'metric',
        title: 'Total Revenue',
        component: FinancialMetricWidget,
        props: {
          value: '$284,592',
          label: 'This Month',
          change: 15.3,
          icon: <DollarSignIcon size={20} />,
          color: 'green'
        },
        layout: { x: 0, y: 0, w: 3, h: 4 }
      },
      {
        id: 'net-profit',
        type: 'metric',
        title: 'Net Profit',
        component: FinancialMetricWidget,
        props: {
          value: '$71,148',
          label: 'This Month',
          change: 8.7,
          icon: <TrendingUpIcon size={20} />,
          color: 'blue'
        },
        layout: { x: 3, y: 0, w: 3, h: 4 }
      },
      {
        id: 'profit-margin',
        type: 'metric',
        title: 'Profit Margin',
        component: FinancialMetricWidget,
        props: {
          value: '25.0%',
          label: 'This Month',
          change: 2.1,
          icon: <CalculatorIcon size={20} />,
          color: 'purple'
        },
        layout: { x: 6, y: 0, w: 3, h: 4 }
      },
      {
        id: 'total-expenses',
        type: 'metric',
        title: 'Total Expenses',
        component: FinancialMetricWidget,
        props: {
          value: '$213,444',
          label: 'This Month',
          change: -3.2,
          icon: <CreditCardIcon size={20} />,
          color: 'red'
        },
        layout: { x: 9, y: 0, w: 3, h: 4 }
      },
      {
        id: 'revenue-analytics',
        type: 'chart',
        title: 'Revenue & Profit Trends',
        component: RevenueAnalyticsWidget,
        props: {},
        layout: { x: 0, y: 4, w: 8, h: 5 }
      },
      {
        id: 'expense-breakdown',
        type: 'chart',
        title: 'Expense Breakdown',
        component: ExpenseBreakdownWidget,
        props: {},
        layout: { x: 8, y: 4, w: 4, h: 5 }
      },
      {
        id: 'cash-flow',
        type: 'chart',
        title: 'Cash Flow Analysis',
        component: CashFlowWidget,
        props: {},
        layout: { x: 0, y: 9, w: 6, h: 5 }
      },
      {
        id: 'profit-margins',
        type: 'chart',
        title: 'Profit Margin Trends',
        component: ProfitMarginWidget,
        props: {},
        layout: { x: 6, y: 9, w: 6, h: 5 }
      },
      {
        id: 'transactions-table',
        type: 'table',
        title: 'Recent Transactions',
        component: TransactionsTableWidget,
        props: {},
        layout: { x: 0, y: 14, w: 12, h: 6 }
      }
    ];

    setWidgets(defaultWidgets);
  }, []);

  const handleWidgetsChange = (updatedWidgets: DashboardWidget[]) => {
    setWidgets(updatedWidgets);
  };

  const handleSave = (layout: DashboardWidget[]) => {
    console.log('Saving financial dashboard layout:', layout);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-600">Monitor revenue, expenses, and financial performance</p>
        </div>
        
        <CustomizableDashboard
          widgets={widgets}
          widgetTemplates={widgetTemplates}
          editable={true}
          onWidgetsChange={handleWidgetsChange}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};