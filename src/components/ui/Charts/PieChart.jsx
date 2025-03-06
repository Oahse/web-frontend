import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

// Function to generate different shades
const generateShades = (baseColor, dataLength) => {
    const color = hexToRgb(baseColor);  // Convert HEX to RGB
    const shades = [];
  
    for (let i = 0; i < dataLength; i++) {
      // Lightness increases or decreases with each slice
      const shade = adjustLightness(color, i / dataLength);  // Adjust lightness based on index
      shades.push(rgbToHex(shade));
    }
  
    return shades;
  };
  
  // Convert HEX to RGB
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
  
    return { r, g, b };
  };
  
  // Adjust lightness of the color by modifying the RGB values
  const adjustLightness = (color, factor) => {
    // factor: value between 0 and 1 that determines how light/dark the color should be
    return {
      r: Math.min(255, Math.floor(color.r + (255 - color.r) * factor)),
      g: Math.min(255, Math.floor(color.g + (255 - color.g) * factor)),
      b: Math.min(255, Math.floor(color.b + (255 - color.b) * factor)),
    };
  };
  
  // Convert RGB back to HEX
  const rgbToHex = (color) => {
    return `#${((1 << 24) | (color.r << 16) | (color.g << 8) | color.b).toString(16).slice(1).toUpperCase()}`;
  };
  


const PieChart = () => {
  const data = [
    { name: 'Item 1', value: 400 },
    { name: 'Item 2', value: 300 },
    { name: 'Item 3', value: 300 },
    { name: 'Item 4', value: 200 },
    // More items...
  ];

  // Generate color shades dynamically based on the data length
  const baseColor = '#5d92b3'; // Base color (light cyan)
  const backgroundColors = generateShades(baseColor, data.length);

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: backgroundColors, // Apply generated shades as background colors
        borderColor: backgroundColors.map(color => color), // Keep the same color for border
        borderWidth: 2,
        cursor:'pointer'
      },
    ],

  };
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
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
    <div style={{ width: '100%', height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Pie data={chartData} options={options}/>
    </div>
  );
};

export default PieChart;
