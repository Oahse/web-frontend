import React, { useEffect } from "react";
import ApexCharts from 'apexcharts';
const AreaLineChart = () => {
  useEffect(() => {
    // ApexCharts options and data
    const options = {
      series: [
        {
          name: "Revenue",
          type: "area",
          data: [51, 40, 58, 51, 42, 89, 80, 51, 60, 78, 81, 92],
        },
        {
          name: "Store",
          type: "line",
          data: [131, 132, 145, 132, 134, 152, 101, 81, 50, 38, 51, 42],
        },
      ],
      chart: {
        height: 387,
        type: "area",
        stacked: false,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 10,
          animateGradually: {
            enabled: true,
            delay: 10,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 10,
          },
        },
      },
      stroke: {
        width: [3, 3],
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#FF7433", "#8D79F6"],
      xaxis: {
        labels: {
          style: {
            colors: "#95989D",
          },
        },
        tooltip: {
          enabled: false,
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        show: false,
      },
    };

    // Create and render the chart when the component mounts
    const chart = new ApexCharts(
      document.querySelector("#line-chart-22"),
      options
    );
    chart.render();

    // Cleanup chart on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="line-chart-22"></div>;
};

export default AreaLineChart;
