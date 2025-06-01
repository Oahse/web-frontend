import React, { useEffect } from "react";
import ApexCharts from 'apexcharts';
const LineChart11 = () => {
  useEffect(() => {
    // ApexCharts options and data
    const options = {
      series: [
        {
          name: "Price",
          data: [
            55, 60, 65, 70, 75, 80, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35,
            55, 60, 65, 70, 75, 80, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35,
            55, 60, 65, 70, 75, 80, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35,
            55, 60, 65, 70, 75, 80, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35,
            55, 60, 65, 70, 75, 80, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35,
          ],
        },
      ],
      chart: {
        type: "bar",
        height: 165,
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
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "3px",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: "#BFDBFE",
      stroke: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return "$";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    };

    // Create and render the chart when the component mounts
    const chart = new ApexCharts(
      document.querySelector("#line-chart-11"),
      options
    );
    chart.render();

    // Cleanup chart on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <div id="line-chart-11"></div>
    </div>
  );
};

export default LineChart11;
