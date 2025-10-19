import { OrdersAPI, AnalyticsAPI } from '../apis';
import { AnalyticsFilters } from '../apis/types';

/**
 * Utility functions for data export functionality
 */

// Utility functions for different export formats
export const exportToCSV = (data: Record<string, unknown>[], filename = 'export') => {
  if (!data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data: unknown, filename = 'export') => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportChartAsPNG = (chartRef: React.RefObject<HTMLCanvasElement>, filename = 'chart') => {
  if (chartRef.current && chartRef.current.canvas) {
    const canvas = chartRef.current.canvas;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = url;
    link.click();
  }
};

// Mock Excel export (would need a library like xlsx in real implementation)
export const exportToExcel = (data: Record<string, unknown>[], filename = 'export') => {
  console.log('Excel export would require xlsx library', data);
  // For now, fallback to CSV
  exportToCSV(data, filename);
};

// Mock PDF export (would need a library like jsPDF in real implementation)
export const exportToPDF = (data: unknown, filename = 'export') => {
  console.log('PDF export would require jsPDF library', data);
  // For now, fallback to JSON
  exportToJSON(data, filename);
};

// API-based export functions
export const exportOrders = async (format: 'csv' | 'xlsx', filters: any) => {
  try {
    await OrdersAPI.exportOrders({ ...filters, format });
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};

export const exportAnalytics = async (type: 'sales' | 'users' | 'products' | 'orders', format: 'csv' | 'xlsx' | 'json', filters: AnalyticsFilters) => {
  try {
    await AnalyticsAPI.exportAnalytics({ type, format, filters });
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};