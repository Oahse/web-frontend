
import React, { useState, useCallback, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useApi } from '../../hooks/useApi';
import { AdminAPI } from '../../apis';
import { themeClasses } from '../../lib/theme';

import { SalesData } from '../../types/api';

export const SalesChart: React.FC = () => {
  console.log("SalesChart rendering");
  const [days, setDays] = useState(30);

  const { data: salesData, loading, error, execute: fetchSalesData } = useApi<SalesData[]>(
    undefined,
    { autoFetch: false, showErrorToast: false }
  );

  useEffect(() => {
    fetchSalesData(() => AdminAPI.getSalesTrend(days));
    
  }, [days, fetchSalesData]);

  const handleTimeRangeChange = (newDays: number) => {
    setDays(newDays);
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200">
        <p className={themeClasses.text.muted}>Loading chart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200">
        <p className={themeClasses.text.muted}>Error loading chart data.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`${themeClasses.text.heading} text-lg`}>Sales Overview</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleTimeRangeChange(7)}
            className={`px-3 py-1 rounded-md text-sm ${days === 7 ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => handleTimeRangeChange(30)}
            className={`px-3 py-1 rounded-md text-sm ${days === 30 ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleTimeRangeChange(365)}
            className={`px-3 py-1 rounded-md text-sm ${days === 365 ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700'}`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#61b482" />
            <Bar dataKey="orders" fill="#f2c94c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
