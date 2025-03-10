import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, Title, Tooltip, Legend, LinearScale, PointElement, CategoryScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, Title, Tooltip, Legend, LinearScale, PointElement, CategoryScale);

const LineChartTest = () => {
  const DATA_COUNT = 12;
  const labels = Array.from({ length: DATA_COUNT }, (_, i) => i.toString());
  const datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Cubic interpolation (monotone)',
        data: datapoints,
        borderColor: 'red',
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.4
      },
      {
        label: 'Cubic interpolation',
        data: datapoints,
        borderColor: 'blue',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Linear interpolation (default)',
        data: datapoints,
        borderColor: 'green',
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Cubic interpolation mode'
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value'
        },
        suggestedMin: -10,
        suggestedMax: 200
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default LineChartTest;
