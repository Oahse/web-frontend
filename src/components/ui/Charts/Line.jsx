import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({title, yaxis, xaxis,isMobile, height}) => {
  // Sample data for the chart
  const data = {
    labels: xaxis || [
      'Jan 1, 2025', 'Feb 1, 2025', 'Mar 1, 2025', 'Apr 1, 2025', 'May 1, 2025', 'Jun 1, 2025'
    ], // X-axis labels (dates)
    datasets: [
      {
        label: title || '',
        data: yaxis || [100, 200, 150, 300, 250, 400], // Y-axis data (numbers)
        fill: false,
        borderColor: '#86d1ff',
        tension: 0.1,
        pointRadius: 5, // Point size on the line
        pointBackgroundColor: '#5d92b3',
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true, // Make chart responsive
    maintainAspectRatio: false, // Allow chart to scale freely
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45, // Rotate the labels if needed
        },
      },
      y: {
        ticks: {
          stepSize: 50, // Y-axis increments in 50 units
        },
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
    plugins: {
      tooltip: {
        // Make the tooltip work on mobile view
        bodyFont: {
          size: 12,
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', marginBottom:'16px', height:`${isMobile ?height || '300px':height || '500px'}`  }}> {/* Set relative container height */}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
