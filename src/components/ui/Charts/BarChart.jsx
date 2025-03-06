import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({label}) => {
  // Sample data for the bar chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'], // X-axis labels
    datasets: [
      {
        label: label, // Label for the dataset
        data: [30, 50, 70, 40, 90], // Data points for the bars
        backgroundColor: '#ACDDFC', // Color of bars
        borderColor: '#5d92b3', // Border color of bars
        borderWidth: 1, // Border width
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      title: {
        display: true,
        text: 'Sales Performance Over 5 Months', // Chart title
      },
      legend: {
        position: 'top', // Position of the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure the y-axis starts from zero
      },
    },
    onHover: (event, chartElement) => {
      if (chartElement.length > 0) {
        document.body.style.cursor = 'pointer'; // Change cursor on hover
      } else {
        document.body.style.cursor = 'default'; // Reset cursor when not hovering over any slice
      }
    },
  };

  return (
    <div className="scrollable-div">
        <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;