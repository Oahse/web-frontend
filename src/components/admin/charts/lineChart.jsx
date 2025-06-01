import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
const LineChart = ({color='#22C55E'}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        series: [
          {
            data: [20, 50, 7, 100, 30, 80, 100],
          },
        ],
        colors: [color],
        chart: {
          type: "area",
          height: 117,
          stacked: false,
          toolbar: {
            show: false,
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
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
            columnWidth: '10px',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        yaxis: {
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
        tooltip: {
          fixed: { enabled: false },
          x: { show: false },
          y: {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
          marker: { show: false },
        },
      };

      // Initialize the chart using plain JavaScript
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      // Cleanup the chart on component unmount
      return () => {
        chart.destroy();
      };
    }
  }, []);

  return (
    <div className="wrap-chart">
      <div className="wrap-line-chart" id="line-chart-1" style={{ minHeight: '132px' }}>
        <div ref={chartRef} className="apexcharts-canvas apexchartswdm2v6gh apexcharts-theme-light"
          style={{ minwidth: '202px', height: '117px' }}
        >
          <svg
            id="SvgjsSvg5712"
            width="202"
            height="117"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="apexcharts-svg apexcharts-zoomable"
            transform="translate(0, 0)"
            style={{ background: 'none' }}
          >
            <foreignObject x="0" y="0" width="202" height="117">
              <div className="apexcharts-legend" style={{ maxHeight: '58.5px' }}></div>
            </foreignObject>
            <rect
              id="SvgjsRect5716"
              width="0"
              height="0"
              x="0"
              y="0"
              rx="0"
              ry="0"
              opacity="1"
              strokeWidth="0"
              stroke="none"
              strokeDasharray="0"
              fill="#fefefe"
            ></rect>
            <g id="SvgjsG5754" className="apexcharts-yaxis" transform="translate(-18, 0)"></g>
            <g id="SvgjsG5714" className="apexcharts-inner apexcharts-graphical" transform="translate(12, 30)">
              <defs id="SvgjsDefs5713">
                <clipPath id="gridRectMaskwdm2v6gh">
                  <rect
                    id="SvgjsRect5718"
                    width="188"
                    height="92"
                    x="-6"
                    y="-10"
                    rx="0"
                    ry="0"
                    opacity="1"
                    strokeWidth="0"
                    stroke="none"
                    strokeDasharray="0"
                    fill="#fff"
                  ></rect>
                </clipPath>
              </defs>
              <line
                id="SvgjsLine5717"
                x1="0"
                y1="0"
                x2="0"
                y2="72"
                stroke="#b6b6b6"
                strokeDasharray="3"
                strokeLinecap="butt"
                className="apexcharts-xcrosshairs"
                x="0"
                y="0"
                width="1"
                height="72"
                fill="#b1b9c4"
                filter="none"
                fillOpacity="0.9"
                strokeWidth="1"
              ></line>
            </g>
            {/* Tooltips and Annotations */}
            <rect
              id="SvgjsRect5759"
              width="0"
              height="0"
              x="0"
              y="0"
              rx="0"
              ry="0"
              opacity="1"
              strokeWidth="0"
              stroke="none"
              strokeDasharray="0"
              fill="#fefefe"
              className="apexcharts-zoom-rect"
            ></rect>
            <rect
              id="SvgjsRect5760"
              width="0"
              height="0"
              x="0"
              y="0"
              rx="0"
              ry="0"
              opacity="1"
              strokeWidth="0"
              stroke="none"
              strokeDasharray="0"
              fill="#fefefe"
              className="apexcharts-selection-rect"
            ></rect>
          </svg>
        </div>
      </div>
    </div>
  );
};


export default LineChart;
