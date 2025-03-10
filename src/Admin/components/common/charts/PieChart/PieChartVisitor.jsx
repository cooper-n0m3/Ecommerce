import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", profit: 510 },
  { month: "Feb", profit: 610 },
  { month: "Mar", profit: 710 },
  { month: "Apr", profit: 510 },
  { month: "May", profit: 810 },
  { month: "Jun", profit: 710 },
  { month: "Jul", profit: 910 },
  { month: "Aug", profit: 1010 },
  { month: "Sep", profit: 810 },
  { month: "Oct", profit: 1110 },
  { month: "Nov", profit: 1010 },
  { month: "Dec", profit: 1510 },
];

// Define a color palette for the chart
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6699",
  "#6A5ACD",
  "#4CAF50",
  "#FFC107",
  "#E91E63",
  "#9C27B0",
  "#2196F3",
  "#607D8B",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const { name, value } = payload[0];
    return (
      <div className="custom-tooltip bg-gray-400 opacity-70 p-3 rounded">
        <p>{`Month: ${name}`}</p>
        <p>{`Profit: $${value}`}</p>
      </div>
    );
  }
  return null;
};

const PieChartExample = () => {
  return (
    <div className="flex w-full justify-center mt-10">
      <PieChart width={500} height={400}>
        <Pie
          data={revenueData}
          dataKey="profit"
          nameKey="month"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {revenueData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartExample;
