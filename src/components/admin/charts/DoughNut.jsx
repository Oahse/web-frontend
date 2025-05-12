import React, { useEffect, useRef } from 'react';

// Generate random hex colors based on data length
const generateRandomColors = (count) => {
  return Array.from({ length: count }, () =>
    '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  );
};

const DonutChart = ({ data = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (typeof Morris === 'undefined' || !chartRef.current) return;

    // Clear previous chart content (simulate destroy)
    chartRef.current.innerHTML = '';

    // Generate new colors
    const colors = generateRandomColors(data.length);

    // Create the chart
    new Morris.Donut({
      element: chartRef.current.id,
      data: data,
      resize: true,
      colors: colors,
      formatter: (y) => y,
    });

  }, [data]); // Re-run on data change

  return (
    <div className='p-2'>
      <div
        id="morris-donut-1"
        ref={chartRef}
        className="text-center"
        style={{ maxWidth: '482px', height: '300px'}}
      />
    </div>
  );
};

export default DonutChart;
