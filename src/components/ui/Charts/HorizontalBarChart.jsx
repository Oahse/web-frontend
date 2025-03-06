import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importing the plugin

// Register necessary components and the datalabels plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const HorizontalBarChart = ({ data, label }) => {
  const chartData = {
    labels: data.map((item) => item.location),
    datasets: [
      {
        label: 'Sessions',
        data: data.map((item) => item.sessions),
        backgroundColor: '#ACDDFC', // Color of bars
        borderColor: '#5d92b3', // Border color of bars
        borderWidth: 1,
        anchor: 'end', // Position the labels at the end of each bar
        align: 'top',  // Align the labels to the end of the bars
      },
      
    ],
  };

  const options = {
    indexAxis: 'y', // Horizontal bars
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: label,
      },
      // Configure the datalabels plugin
      datalabels: {
        anchor: 'end', // Position the labels at the end of each bar
        align: 'end',  // Align the labels to the end of the bars
        color: '#000', // Color of the labels
        font: {
          weight: 'bold',
        },
        formatter: (value) => value, // Optional: format data (e.g., rounding)
      },
      
    },
    scales: {
      x: {
        // Remove vertical grid lines (x-axis is horizontal in a horizontal bar chart)
        grid: {
          display: false, // Hide vertical grid lines (x-axis)
        },
        ticks: {
          display: false, // Disable x-axis labels
        },
      },
      y: {
        // The y-axis is horizontal in a horizontal bar chart, and this would control horizontal grid lines
        grid: {
          display: true, // Optional: keep the horizontal grid lines if you need them
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
