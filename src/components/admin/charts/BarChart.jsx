import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
const BarLineChart = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      const options = {
        series: [
          {
            name: 'Revenue',
            type: 'column',
            data: [51, 40, 58, 51, 42, 89, 80, 51, 60, 78, 81, 92],
          },
          {
            name: 'Order',
            type: 'line',
            data: [31, 32, 45, 32, 34, 52, 41, 31, 40, 28, 51, 42],
          },
        ],
        chart: {
          height: 404,
          type: 'line', // Set to 'line' for the combination of bar and line charts
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
            borderRadius: 5,
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
            columnWidth: '20px',
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        colors: ['#31A56D', '#8F77F3'], // Color for the bar and line charts
        stroke: {
          width: [0, 3], // Line chart stroke width
          curve: 'smooth', // Smooth curve for the line chart
        },
        xaxis: {
          labels: {
            style: {
              colors: '#95989D',
            },
          },
          tooltip: {
            enabled: false,
          },
          categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ], // X-axis labels
        },
        responsive: [
          {
            breakpoint: 991,
            options: {
              chart: {
                height: 300, // Adjust height for smaller screens
              },
            },
          },
        ],
        yaxis: {
          show: false,
        },
        tooltip: {
          y: {
            title: {
              formatter: function (e) {
                return e;
              },
            },
          },
        },
      };

      // Initialize the chart using plain JavaScript
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      // Cleanup the chart on component unmount
      return () => {
        chart.destroy();
      };
    };

  }, []);

  return (
     <div style={{ overflowX: 'auto' }}>
     <div  ref={chartRef} class="apexcharts-canvas apexchartsw741rqyi apexcharts-theme-light" style={{minWidth: '473px', height: '404px'}}>
     <svg id="SvgjsSvg7070" width="473" height="404" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.dev" class="apexcharts-svg apexcharts-zoomable hovering-zoom" xmlnsData="ApexChartsNS" transform="translate(0, 0)" style={{background: "none"}}>
     <foreignObject x="0" y="0" width="473" height="404">
     <div class="apexcharts-legend" xmlns="http://www.w3.org/1999/xhtml" style={{maxHeight: "202px"}}>
     </div>
     </foreignObject>
     <rect id="SvgjsRect7074" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe">
     </rect><g id="SvgjsG7176" class="apexcharts-yaxis" rel="0" transform="translate(-18, 0)">
     </g>
     <g id="SvgjsG7072" class="apexcharts-inner apexcharts-graphical" transform="translate(26.325189393939393, 30)">
     <defs id="SvgjsDefs7071">
     <clipPath id="gridRectMaskw741rqyi">
     <rect id="SvgjsRect7076" width="447.67774621212124" height="352.32271875" x="-17" y="-8" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff">
     </rect>
     </clipPath>
     <clipPath id="forecastMaskw741rqyi">
     </clipPath>
     <clipPath id="nonForecastMaskw741rqyi">
     </clipPath><clipPath id="gridRectMarkerMaskw741rqyi">
     <rect id="SvgjsRect7077" width="422.67774621212124" height="340.32271875" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff">
     </rect>
     </clipPath>
     </defs>
     <line id="SvgjsLine7075" x1="342.0545196280992" y1="0" x2="342.0545196280992" y2="336.32271875" stroke="#b6b6b6" stroke-dasharray="3" stroke-linecap="butt" class="apexcharts-xcrosshairs" x="342.0545196280992" y="0" width="1" height="336.32271875" fill="#b1b9c4" filter="none" fill-opacity="0.9" stroke-width="1"></line><line id="SvgjsLine7116" x1="0" y1="337.32271875" x2="0" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7117" x1="38.061613292011025" y1="337.32271875" x2="38.061613292011025" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7118" x1="76.12322658402205" y1="337.32271875" x2="76.12322658402205" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7119" x1="114.18483987603307" y1="337.32271875" x2="114.18483987603307" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7120" x1="152.2464531680441" y1="337.32271875" x2="152.2464531680441" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7121" x1="190.30806646005513" y1="337.32271875" x2="190.30806646005513" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7122" x1="228.36967975206616" y1="337.32271875" x2="228.36967975206616" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7123" x1="266.43129304407717" y1="337.32271875" x2="266.43129304407717" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7124" x1="304.4929063360882" y1="337.32271875" x2="304.4929063360882" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7125" x1="342.55451962809923" y1="337.32271875" x2="342.55451962809923" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7126" x1="380.61613292011026" y1="337.32271875" x2="380.61613292011026" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><line id="SvgjsLine7127" x1="418.6777462121213" y1="337.32271875" x2="418.6777462121213" y2="343.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-xaxis-tick"></line><g id="SvgjsG7112" class="apexcharts-grid"><g id="SvgjsG7113" class="apexcharts-gridlines-horizontal"><line id="SvgjsLine7129" x1="-10.325189393939393" y1="84.0806796875" x2="429.00293560606065" y2="84.0806796875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine7130" x1="-10.325189393939393" y1="168.161359375" x2="429.00293560606065" y2="168.161359375" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine7131" x1="-10.325189393939393" y1="252.2420390625" x2="429.00293560606065" y2="252.2420390625" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line></g><g id="SvgjsG7114" class="apexcharts-gridlines-vertical"></g><line id="SvgjsLine7134" x1="0" y1="336.32271875" x2="418.67774621212124" y2="336.32271875" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line><line id="SvgjsLine7133" x1="0" y1="1" x2="0" y2="336.32271875" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line></g>
     <g id="SvgjsG7115" class="apexcharts-grid-borders">
     <line id="SvgjsLine7128" x1="-10.325189393939393" y1="0" x2="429.00293560606065" y2="0" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine7132" x1="-10.325189393939393" y1="336.32271875" x2="429.00293560606065" y2="336.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine7175" x1="-10.325189393939393" y1="337.32271875" x2="429.0029356060606" y2="337.32271875" stroke="#e0e0e0" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt"></line></g><g id="SvgjsG7078" class="apexcharts-bar-series apexcharts-plot-series"><g id="SvgjsG7079" class="apexcharts-series" rel="1" seriesName="Revenue" data:realIndex="0"><path id="SvgjsPath7084" d="M -10 420.40439843749994 L -10 210.99866523437495 C -10 208.49866523437495 -7.5 205.99866523437495 -5 205.99866523437495 L 5 205.99866523437495 C 7.5 205.99866523437495 10 208.49866523437495 10 210.99866523437495 L 10 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M -10 420.40439843749994 L -10 210.99866523437495 C -10 208.49866523437495 -7.5 205.99866523437495 -5 205.99866523437495 L 5 205.99866523437495 C 7.5 205.99866523437495 10 208.49866523437495 10 210.99866523437495 L 10 420.40439843749994 z " pathFrom="M -10 420.40439843749994 L -10 420.40439843749994 L 10 420.40439843749994 L 10 420.40439843749994 L 10 420.40439843749994 L 10 420.40439843749994 L 10 420.40439843749994 L -10 420.40439843749994 z" cy="205.99766523437495" cx="10" j="0" val="51" barHeight="214.405733203125" barWidth="20"></path><path id="SvgjsPath7086" d="M 28.061613292011018 420.40439843749994 L 28.061613292011018 257.2430390625 C 28.061613292011018 254.74303906249997 30.561613292011018 252.24303906249997 33.06161329201102 252.24303906249997 L 43.06161329201102 252.24303906249997 C 45.56161329201102 252.24303906249997 48.06161329201102 254.74303906249997 48.06161329201102 257.2430390625 L 48.06161329201102 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 28.061613292011018 420.40439843749994 L 28.061613292011018 257.2430390625 C 28.061613292011018 254.74303906249997 30.561613292011018 252.24303906249997 33.06161329201102 252.24303906249997 L 43.06161329201102 252.24303906249997 C 45.56161329201102 252.24303906249997 48.06161329201102 254.74303906249997 48.06161329201102 257.2430390625 L 48.06161329201102 420.40439843749994 z " pathFrom="M 28.061613292011018 420.40439843749994 L 28.061613292011018 420.40439843749994 L 48.06161329201102 420.40439843749994 L 48.06161329201102 420.40439843749994 L 48.06161329201102 420.40439843749994 L 48.06161329201102 420.40439843749994 L 48.06161329201102 420.40439843749994 L 28.061613292011018 420.40439843749994 z" cy="252.24203906249997" cx="48.06161329201102" j="1" val="40" barHeight="168.161359375" barWidth="20"></path><path id="SvgjsPath7088" d="M 66.12322658402204 420.40439843749994 L 66.12322658402204 181.57042734374997 C 66.12322658402204 179.07042734374997 68.62322658402204 176.57042734374997 71.12322658402204 176.57042734374997 L 81.12322658402204 176.57042734374997 C 83.62322658402204 176.57042734374997 86.12322658402204 179.07042734374997 86.12322658402204 181.57042734374997 L 86.12322658402204 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 66.12322658402204 420.40439843749994 L 66.12322658402204 181.57042734374997 C 66.12322658402204 179.07042734374997 68.62322658402204 176.57042734374997 71.12322658402204 176.57042734374997 L 81.12322658402204 176.57042734374997 C 83.62322658402204 176.57042734374997 86.12322658402204 179.07042734374997 86.12322658402204 181.57042734374997 L 86.12322658402204 420.40439843749994 z " pathFrom="M 66.12322658402204 420.40439843749994 L 66.12322658402204 420.40439843749994 L 86.12322658402204 420.40439843749994 L 86.12322658402204 420.40439843749994 L 86.12322658402204 420.40439843749994 L 86.12322658402204 420.40439843749994 L 86.12322658402204 420.40439843749994 L 66.12322658402204 420.40439843749994 z" cy="176.56942734374996" cx="86.12322658402204" j="2" val="58" barHeight="243.83397109375" barWidth="20"></path><path id="SvgjsPath7090" d="M 104.18483987603305 420.40439843749994 L 104.18483987603305 210.99866523437495 C 104.18483987603305 208.49866523437495 106.68483987603305 205.99866523437495 109.18483987603305 205.99866523437495 L 119.18483987603305 205.99866523437495 C 121.68483987603305 205.99866523437495 124.18483987603305 208.49866523437495 124.18483987603305 210.99866523437495 L 124.18483987603305 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 104.18483987603305 420.40439843749994 L 104.18483987603305 210.99866523437495 C 104.18483987603305 208.49866523437495 106.68483987603305 205.99866523437495 109.18483987603305 205.99866523437495 L 119.18483987603305 205.99866523437495 C 121.68483987603305 205.99866523437495 124.18483987603305 208.49866523437495 124.18483987603305 210.99866523437495 L 124.18483987603305 420.40439843749994 z " pathFrom="M 104.18483987603305 420.40439843749994 L 104.18483987603305 420.40439843749994 L 124.18483987603305 420.40439843749994 L 124.18483987603305 420.40439843749994 L 124.18483987603305 420.40439843749994 L 124.18483987603305 420.40439843749994 L 124.18483987603305 420.40439843749994 L 104.18483987603305 420.40439843749994 z" cy="205.99766523437495" cx="124.18483987603305" j="3" val="51" barHeight="214.405733203125" barWidth="20"></path><path id="SvgjsPath7092" d="M 142.24645316804407 420.40439843749994 L 142.24645316804407 248.83497109374997 C 142.24645316804407 246.33497109374997 144.74645316804407 243.83497109374997 147.24645316804407 243.83497109374997 L 157.24645316804407 243.83497109374997 C 159.74645316804407 243.83497109374997 162.24645316804407 246.33497109374997 162.24645316804407 248.83497109374997 L 162.24645316804407 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 142.24645316804407 420.40439843749994 L 142.24645316804407 248.83497109374997 C 142.24645316804407 246.33497109374997 144.74645316804407 243.83497109374997 147.24645316804407 243.83497109374997 L 157.24645316804407 243.83497109374997 C 159.74645316804407 243.83497109374997 162.24645316804407 246.33497109374997 162.24645316804407 248.83497109374997 L 162.24645316804407 420.40439843749994 z " pathFrom="M 142.24645316804407 420.40439843749994 L 142.24645316804407 420.40439843749994 L 162.24645316804407 420.40439843749994 L 162.24645316804407 420.40439843749994 L 162.24645316804407 420.40439843749994 L 162.24645316804407 420.40439843749994 L 162.24645316804407 420.40439843749994 L 142.24645316804407 420.40439843749994 z" cy="243.83397109374997" cx="162.24645316804407" j="4" val="42" barHeight="176.56942734375" barWidth="20"></path><path id="SvgjsPath7094" d="M 180.3080664600551 420.40439843749994 L 180.3080664600551 51.24537382812499 C 180.3080664600551 48.74537382812499 182.8080664600551 46.24537382812499 185.3080664600551 46.24537382812499 L 195.3080664600551 46.24537382812499 C 197.8080664600551 46.24537382812499 200.3080664600551 48.74537382812499 200.3080664600551 51.24537382812499 L 200.3080664600551 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 180.3080664600551 420.40439843749994 L 180.3080664600551 51.24537382812499 C 180.3080664600551 48.74537382812499 182.8080664600551 46.24537382812499 185.3080664600551 46.24537382812499 L 195.3080664600551 46.24537382812499 C 197.8080664600551 46.24537382812499 200.3080664600551 48.74537382812499 200.3080664600551 51.24537382812499 L 200.3080664600551 420.40439843749994 z " pathFrom="M 180.3080664600551 420.40439843749994 L 180.3080664600551 420.40439843749994 L 200.3080664600551 420.40439843749994 L 200.3080664600551 420.40439843749994 L 200.3080664600551 420.40439843749994 L 200.3080664600551 420.40439843749994 L 200.3080664600551 420.40439843749994 L 180.3080664600551 420.40439843749994 z" cy="46.24437382812499" cx="200.3080664600551" j="5" val="89" barHeight="374.15902460937497" barWidth="20"></path><path id="SvgjsPath7096" d="M 218.3696797520661 420.40439843749994 L 218.3696797520661 89.08167968749999 C 218.3696797520661 86.58167968749999 220.8696797520661 84.08167968749999 223.3696797520661 84.08167968749999 L 233.3696797520661 84.08167968749999 C 235.8696797520661 84.08167968749999 238.3696797520661 86.58167968749999 238.3696797520661 89.08167968749999 L 238.3696797520661 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 218.3696797520661 420.40439843749994 L 218.3696797520661 89.08167968749999 C 218.3696797520661 86.58167968749999 220.8696797520661 84.08167968749999 223.3696797520661 84.08167968749999 L 233.3696797520661 84.08167968749999 C 235.8696797520661 84.08167968749999 238.3696797520661 86.58167968749999 238.3696797520661 89.08167968749999 L 238.3696797520661 420.40439843749994 z " pathFrom="M 218.3696797520661 420.40439843749994 L 218.3696797520661 420.40439843749994 L 238.3696797520661 420.40439843749994 L 238.3696797520661 420.40439843749994 L 238.3696797520661 420.40439843749994 L 238.3696797520661 420.40439843749994 L 238.3696797520661 420.40439843749994 L 218.3696797520661 420.40439843749994 z" cy="84.08067968749998" cx="238.3696797520661" j="6" val="80" barHeight="336.32271875" barWidth="20"></path><path id="SvgjsPath7098" d="M 256.4312930440771 420.40439843749994 L 256.4312930440771 210.99866523437495 C 256.4312930440771 208.49866523437495 258.9312930440771 205.99866523437495 261.4312930440771 205.99866523437495 L 271.4312930440771 205.99866523437495 C 273.9312930440771 205.99866523437495 276.4312930440771 208.49866523437495 276.4312930440771 210.99866523437495 L 276.4312930440771 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 256.4312930440771 420.40439843749994 L 256.4312930440771 210.99866523437495 C 256.4312930440771 208.49866523437495 258.9312930440771 205.99866523437495 261.4312930440771 205.99866523437495 L 271.4312930440771 205.99866523437495 C 273.9312930440771 205.99866523437495 276.4312930440771 208.49866523437495 276.4312930440771 210.99866523437495 L 276.4312930440771 420.40439843749994 z " pathFrom="M 256.4312930440771 420.40439843749994 L 256.4312930440771 420.40439843749994 L 276.4312930440771 420.40439843749994 L 276.4312930440771 420.40439843749994 L 276.4312930440771 420.40439843749994 L 276.4312930440771 420.40439843749994 L 276.4312930440771 420.40439843749994 L 256.4312930440771 420.40439843749994 z" cy="205.99766523437495" cx="276.4312930440771" j="7" val="51" barHeight="214.405733203125" barWidth="20"></path><path id="SvgjsPath7100" d="M 294.49290633608814 420.40439843749994 L 294.49290633608814 173.16235937499997 C 294.49290633608814 170.66235937499997 296.99290633608814 168.16235937499997 299.49290633608814 168.16235937499997 L 309.49290633608814 168.16235937499997 C 311.99290633608814 168.16235937499997 314.49290633608814 170.66235937499997 314.49290633608814 173.16235937499997 L 314.49290633608814 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 294.49290633608814 420.40439843749994 L 294.49290633608814 173.16235937499997 C 294.49290633608814 170.66235937499997 296.99290633608814 168.16235937499997 299.49290633608814 168.16235937499997 L 309.49290633608814 168.16235937499997 C 311.99290633608814 168.16235937499997 314.49290633608814 170.66235937499997 314.49290633608814 173.16235937499997 L 314.49290633608814 420.40439843749994 z " pathFrom="M 294.49290633608814 420.40439843749994 L 294.49290633608814 420.40439843749994 L 314.49290633608814 420.40439843749994 L 314.49290633608814 420.40439843749994 L 314.49290633608814 420.40439843749994 L 314.49290633608814 420.40439843749994 L 314.49290633608814 420.40439843749994 L 294.49290633608814 420.40439843749994 z" cy="168.16135937499996" cx="314.49290633608814" j="8" val="60" barHeight="252.2420390625" barWidth="20"></path><path id="SvgjsPath7102" d="M 332.5545196280992 420.40439843749994 L 332.5545196280992 97.48974765624999 C 332.5545196280992 94.98974765624999 335.0545196280992 92.48974765624999 337.5545196280992 92.48974765624999 L 347.5545196280992 92.48974765624999 C 350.0545196280992 92.48974765624999 352.5545196280992 94.98974765624999 352.5545196280992 97.48974765624999 L 352.5545196280992 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 332.5545196280992 420.40439843749994 L 332.5545196280992 97.48974765624999 C 332.5545196280992 94.98974765624999 335.0545196280992 92.48974765624999 337.5545196280992 92.48974765624999 L 347.5545196280992 92.48974765624999 C 350.0545196280992 92.48974765624999 352.5545196280992 94.98974765624999 352.5545196280992 97.48974765624999 L 352.5545196280992 420.40439843749994 z " pathFrom="M 332.5545196280992 420.40439843749994 L 332.5545196280992 420.40439843749994 L 352.5545196280992 420.40439843749994 L 352.5545196280992 420.40439843749994 L 352.5545196280992 420.40439843749994 L 352.5545196280992 420.40439843749994 L 352.5545196280992 420.40439843749994 L 332.5545196280992 420.40439843749994 z" cy="92.48874765624998" cx="352.5545196280992" j="9" val="78" barHeight="327.91465078125" barWidth="20"></path><path id="SvgjsPath7104" d="M 370.6161329201102 420.40439843749994 L 370.6161329201102 84.87764570312495 C 370.6161329201102 82.37764570312495 373.1161329201102 79.87764570312495 375.6161329201102 79.87764570312495 L 385.6161329201102 79.87764570312495 C 388.1161329201102 79.87764570312495 390.6161329201102 82.37764570312495 390.6161329201102 84.87764570312495 L 390.6161329201102 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 370.6161329201102 420.40439843749994 L 370.6161329201102 84.87764570312495 C 370.6161329201102 82.37764570312495 373.1161329201102 79.87764570312495 375.6161329201102 79.87764570312495 L 385.6161329201102 79.87764570312495 C 388.1161329201102 79.87764570312495 390.6161329201102 82.37764570312495 390.6161329201102 84.87764570312495 L 390.6161329201102 420.40439843749994 z " pathFrom="M 370.6161329201102 420.40439843749994 L 370.6161329201102 420.40439843749994 L 390.6161329201102 420.40439843749994 L 390.6161329201102 420.40439843749994 L 390.6161329201102 420.40439843749994 L 390.6161329201102 420.40439843749994 L 390.6161329201102 420.40439843749994 L 370.6161329201102 420.40439843749994 z" cy="79.87664570312495" cx="390.6161329201102" j="10" val="81" barHeight="340.526752734375" barWidth="20"></path>
     <path id="SvgjsPath7106" d="M 408.67774621212124 420.40439843749994 L 408.67774621212124 38.633271874999956 C 408.67774621212124 36.133271874999956 411.17774621212124 33.633271874999956 413.67774621212124 33.633271874999956 L 423.67774621212124 33.633271874999956 C 426.17774621212124 33.633271874999956 428.67774621212124 36.133271874999956 428.67774621212124 38.633271874999956 L 428.67774621212124 420.40439843749994 z " fill="rgba(255,116,51,0.85)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-bar-area" index="0" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 408.67774621212124 420.40439843749994 L 408.67774621212124 38.633271874999956 C 408.67774621212124 36.133271874999956 411.17774621212124 33.633271874999956 413.67774621212124 33.633271874999956 L 423.67774621212124 33.633271874999956 C 426.17774621212124 33.633271874999956 428.67774621212124 36.133271874999956 428.67774621212124 38.633271874999956 L 428.67774621212124 420.40439843749994 z " pathFrom="M 408.67774621212124 420.40439843749994 L 408.67774621212124 420.40439843749994 L 428.67774621212124 420.40439843749994 L 428.67774621212124 420.40439843749994 L 428.67774621212124 420.40439843749994 L 428.67774621212124 420.40439843749994 L 428.67774621212124 420.40439843749994 L 408.67774621212124 420.40439843749994 z" cy="33.63227187499996" cx="428.67774621212124" j="11" val="92" barHeight="386.7711265625" barWidth="20"></path><g id="SvgjsG7081" class="apexcharts-bar-goals-markers"><g id="SvgjsG7083" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7085" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7087" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7089" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7091" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7093" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7095" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7097" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7099" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7101" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g><g id="SvgjsG7103" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g>
     <g id="SvgjsG7105" className="apexcharts-bar-goals-groups" class="apexcharts-hidden-element-shown" clip-path="url(#gridRectMarkerMaskw741rqyi)"></g>
     </g><g id="SvgjsG7082" class="apexcharts-bar-shadows apexcharts-hidden-element-shown"></g>
     </g></g><g id="SvgjsG7107" class="apexcharts-line-series apexcharts-plot-series">
     <g id="SvgjsG7108" class="apexcharts-series" zIndex="1" seriesName="Order" data:longestSeries="true" rel="1" data:realIndex="1"><path id="SvgjsPath7111" d="M 0 290.078344921875C6.3297022461556685, 289.7817262000502, 26.606969320967586, 289.6317756729049, 38.06161329201102, 285.87431093749996S63.43602215335169, 231.22186914062496, 76.12322658402204, 231.22186914062496S102.67196988949566, 282.1973611450748, 114.18483987603305, 285.87431093749996S142.7585385760256, 282.97574283209883, 152.24645316804407, 277.46624296874995S179.2704300343471, 206.06063627674354, 190.3080664600551, 201.79363124999998S222.95946067484553, 241.7634465291999, 228.3696797520661, 248.03800507812497S253.78266676548822, 289.3798031348666, 266.4312930440771, 290.078344921875S292.1446598817592, 250.19618065353706, 304.49290633608814, 252.24203906249997S333.28735009904256, 308.3201931595624, 342.5545196280992, 302.69044687499996S372.6756998997944, 212.13699911083665, 380.6161329201102, 205.99766523437495S415.48711391448484, 240.66222588757628, 418.67774621212124, 243.83397109374997" fill="none" fill-opacity="1" stroke="rgba(143,119,243,0.85)" stroke-opacity="1" stroke-linecap="butt" stroke-width="3" stroke-dasharray="0" class="apexcharts-line" index="1" clip-path="url(#gridRectMaskw741rqyi)" pathTo="M 0 290.078344921875C6.3297022461556685, 289.7817262000502, 26.606969320967586, 289.6317756729049, 38.06161329201102, 285.87431093749996S63.43602215335169, 231.22186914062496, 76.12322658402204, 231.22186914062496S102.67196988949566, 282.1973611450748, 114.18483987603305, 285.87431093749996S142.7585385760256, 282.97574283209883, 152.24645316804407, 277.46624296874995S179.2704300343471, 206.06063627674354, 190.3080664600551, 201.79363124999998S222.95946067484553, 241.7634465291999, 228.3696797520661, 248.03800507812497S253.78266676548822, 289.3798031348666, 266.4312930440771, 290.078344921875S292.1446598817592, 250.19618065353706, 304.49290633608814, 252.24203906249997S333.28735009904256, 308.3201931595624, 342.5545196280992, 302.69044687499996S372.6756998997944, 212.13699911083665, 380.6161329201102, 205.99766523437495S415.48711391448484, 240.66222588757628, 418.67774621212124, 243.83397109374997" pathFrom="M -1 420.40339843749996 L -1 420.40339843749996 L 38.06161329201102 420.40339843749996 L 76.12322658402204 420.40339843749996 L 114.18483987603305 420.40339843749996 L 152.24645316804407 420.40339843749996 L 190.3080664600551 420.40339843749996 L 228.3696797520661 420.40339843749996 L 266.4312930440771 420.40339843749996 L 304.49290633608814 420.40339843749996 L 342.5545196280992 420.40339843749996 L 380.6161329201102 420.40339843749996 L 418.67774621212124 420.40339843749996" fill-rule="evenodd"></path>
     <g id="SvgjsG7109" class="apexcharts-series-markers-wrap apexcharts-hidden-element-shown" data:realIndex="1">
     <g class="apexcharts-series-markers"><circle id="SvgjsCircle7180" r="0" cx="0" cy="0" class="apexcharts-marker wnkdaxc99" stroke="#ffffff" fill="#8f77f3" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" default-marker-size="0"></circle></g></g></g><g id="SvgjsG7080" class="apexcharts-datalabels apexcharts-hidden-element-shown" data:realIndex="0"></g>
     <g id="SvgjsG7110" class="apexcharts-datalabels" data:realIndex="1"></g></g><line id="SvgjsLine7135" x1="-10.325189393939393" y1="0" x2="429.00293560606065" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt" class="apexcharts-ycrosshairs"></line><line id="SvgjsLine7136" x1="-10.325189393939393" y1="0" x2="429.00293560606065" y2="0" stroke-dasharray="0" stroke-width="0" stroke-linecap="butt" class="apexcharts-ycrosshairs-hidden"></line><g id="SvgjsG7137" class="apexcharts-xaxis" transform="translate(0, 0)"><g id="SvgjsG7138" class="apexcharts-xaxis-texts-g" transform="translate(0, -4)"><text id="SvgjsText7140" fontFamily="Helvetica, Arial, sans-serif" x="0" y="365.32271875" text-anchor="middle" dominant-baseline="auto" fontSize="12px" fontWeight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7141">Jan</tspan><title>Jan</title></text><text id="SvgjsText7143" fontFamily="Helvetica, Arial, sans-serif" x="38.06161329201102" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7144">Feb</tspan><title>Feb</title></text><text id="SvgjsText7146" fontFamily="Helvetica, Arial, sans-serif" x="76.12322658402204" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7147">Mar</tspan><title>Mar</title></text><text id="SvgjsText7149" fontFamily="Helvetica, Arial, sans-serif" x="114.18483987603307" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7150">Apr</tspan><title>Apr</title></text><text id="SvgjsText7152" fontFamily="Helvetica, Arial, sans-serif" x="152.2464531680441" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7153">May</tspan><title>May</title></text><text id="SvgjsText7155" fontFamily="Helvetica, Arial, sans-serif" x="190.30806646005513" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7156">Jun</tspan><title>Jun</title></text><text id="SvgjsText7158" fontFamily="Helvetica, Arial, sans-serif" x="228.36967975206616" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7159">Jul</tspan><title>Jul</title></text><text id="SvgjsText7161" fontFamily="Helvetica, Arial, sans-serif" x="266.4312930440772" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7162">Aug</tspan><title>Aug</title></text><text id="SvgjsText7164" fontFamily="Helvetica, Arial, sans-serif" x="304.49290633608825" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7165">Sep</tspan><title>Sep</title></text><text id="SvgjsText7167" fontFamily="Helvetica, Arial, sans-serif" x="342.5545196280993" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7168">Oct</tspan><title>Oct</title></text><text id="SvgjsText7170" fontFamily="Helvetica, Arial, sans-serif" x="380.6161329201103" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7171">Nov</tspan><title>Nov</title></text><text id="SvgjsText7173" fontFamily="Helvetica, Arial, sans-serif" x="418.67774621212135" y="365.32271875" text-anchor="middle" dominant-baseline="auto" font-size="12px" font-weight="400" fill="#95989d" class="apexcharts-text apexcharts-xaxis-label " style={{
  fontFamily: 'Helvetica, Arial, sans-serif'
}}
><tspan id="SvgjsTspan7174">Dec</tspan><title>Dec</title></text></g></g><g id="SvgjsG7177" class="apexcharts-yaxis-annotations"></g><g id="SvgjsG7178" class="apexcharts-xaxis-annotations"></g>
     <g id="SvgjsG7179" class="apexcharts-point-annotations"></g><rect id="SvgjsRect7181" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-zoom-rect"></rect><rect id="SvgjsRect7182" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-selection-rect"></rect></g></svg><div class="apexcharts-tooltip apexcharts-theme-light" style={{
  left: '253.223459px',
  top: '92.988748px'
}}
><div class="apexcharts-tooltip-title" style={{
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '12px'
}}
>Oct</div><div class="apexcharts-tooltip-series-group apexcharts-active" style={{
  order: 1,
  display: 'flex'
}}
><span class="apexcharts-tooltip-marker" style={{
  backgroundColor: 'rgb(255, 116, 51)',
  display: 'block'
}}
></span><div class="apexcharts-tooltip-text" style={{
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '12px',
  display: 'block'
}}
><div class="apexcharts-tooltip-y-group">
     <span class="apexcharts-tooltip-text-y-label">Revenue</span><span class="apexcharts-tooltip-text-y-value">78</span></div><div class="apexcharts-tooltip-goals-group"><span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span>
     <span class="apexcharts-tooltip-text-z-value"></span></div></div></div><div class="apexcharts-tooltip-series-group apexcharts-active" style={{
  order: 2,
  display: 'flex'
}}
>
     <span class="apexcharts-tooltip-marker" style={{
  backgroundColor: 'rgb(143, 119, 243)',
  display: 'block'
}}
></span><div class="apexcharts-tooltip-text" style={{
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontSize: '12px',
  display: 'block'
}}
>
     <div class="apexcharts-tooltip-y-group">
     <span class="apexcharts-tooltip-text-y-label">Order</span><span class="apexcharts-tooltip-text-y-value">28</span></div><div class="apexcharts-tooltip-goals-group">
     <span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div>
     <div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span>
     <span class="apexcharts-tooltip-text-z-value"></span></div></div></div></div><div class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
     <div class="apexcharts-yaxistooltip-text"></div></div></div></div>
  );
};

export default BarLineChart;
