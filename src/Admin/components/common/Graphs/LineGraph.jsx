import React,{useState} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import { dataAsDay,dataAsMonth } from '../../../redux/features/ecommerceTracking/RevenueDataGraph';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({dataGraph}) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Records', // Title of the chart
      },
    },
    /* {Graph customize row and column} */
    scales: {
      x: {
        grid: {
          color: 'gray', // Set the color of the x-axis gridlines to white
        },
      },
      y: {
        grid: {
          color: 'gray', // Set the color of the y-axis gridlines to white
        },
      },
    },
  };
  return (
    <div className='' style={{ width: '100%', margin: '0 auto'}}>
      <Line data={dataGraph} options={options} />
    </div>
  );
};
export default LineChart