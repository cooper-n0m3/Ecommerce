import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const GraphOfRevenue = () => {
  // Sample data for the line graph
  const dataAsMonth = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ], // X-axis labels
    datasets: [
      {
        label: 'Revenue', // Line label
        data: [25, 59, 40, 7, 56, 25, 80, 47, 25, 60, 17, 49], // Y-axis data points
        fill: false, // Do not fill the area under the line
        borderColor: '#ffd500', 
        tension: 0.1, // Smoothness of the line
      }
    ],
  };
  const dataAsWeek = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], // X-axis labels
    datasets: [
      {
        label: 'Revenue',
        data: [50, 70, 60, 90, 100, 85, 75],
        fill: false,
        borderColor: '#ffd500',
        tension: 0.1,
      }
    ],
  };
  const dataAsDay = {
    labels: [
      "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
      "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
    ], // X-axis labels
    datasets: [
      {
        label: 'Revenue',
        data: [10, 20, 15, 12, 18, 22, 30, 40, 45, 55, 60, 50, 70, 75, 65, 55, 50, 45, 30, 25, 20, 15, 10, 8],
        fill: false,
        borderColor: '#ffd500',
        tension: 0.1,
      }
    ],
  };
  const dataAsYear = {
    labels: ["2019", "2020", "2021", "2022", "2023"], // X-axis labels
    datasets: [
      {
        label: 'Revenue',
        data: [30000, 40000, 38000, 45000, 47000],
        fill: false,
        borderColor: '#ffd500',
        tension: 0.1,
      }
    ],
  };
  // Chart options with white gridlines
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
      <div style={{ width: '100%', height: '350px', margin: '0 auto'}}>
        <Line data={dataAsDay} options={options} />
      </div>
    );
}