import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

// Generate random hex colors based on data length
const generateRandomColors = (count) => {
  return Array.from({ length: count }, () =>
    '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  );
};

const DonutChart = ({ data = [], title='' }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    if (data.length === 0) return;

    // Generate random colors based on the length of the data
    const colors = generateRandomColors(data.length);
    
    setChartData({
      labels: data.map((item) => item.label), // Assuming each data item has a 'label'
      datasets: [
        {
          label: title,
          data: data.map((item) => item.value), // Assuming each data item has a 'value'
          backgroundColor: colors,
          hoverOffset: 4,
          hoverBackgroundColor: colors, // Optionally change colors on hover
        },
      ],
    });
  }, [data,title]); // Re-run when data changes

  return (
    <div className="p-2">
      <div className="text-center">
        <Doughnut data={chartData} options={{ responsive: true, plugins: { tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}` } } } }} />
      </div>
    </div>
  );
};

export default DonutChart;
