import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 1210, profit: 510, expenses: 700 },
  { month: "Feb", revenue: 1510, profit: 610, expenses: 900 },
  { month: "Mar", revenue: 1710, profit: 710, expenses: 1000 },
  { month: "Apr", revenue: 1410, profit: 510, expenses: 900 },
  { month: "May", revenue: 2010, profit: 810, expenses: 1200 },
  { month: "Jun", revenue: 1810, profit: 710, expenses: 1100 },
  { month: "Jul", revenue: 2210, profit: 910, expenses: 1300 },
  { month: "Aug", revenue: 2410, profit: 1010, expenses: 1400 },
  { month: "Sep", revenue: 1910, profit: 810, expenses: 1100 },
  { month: "Oct", revenue: 2510, profit: 1110, expenses: 1400 },
  { month: "Nov", revenue: 2310, profit: 1010, expenses: 1300 },
  { month: "Dec", revenue: 3010, profit: 1510, expenses: 1500 },
];

const RevenueLineChart = () => {
  return (
    <div className="flex w-full justify-center mt-10">
      <LineChart
        width={750}
        height={400}
        data={revenueData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => `$${value}`} />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
        <Line type="monotone" dataKey="expenses" stroke="#ff7300" />
      </LineChart>
    </div>
  );
};

export default RevenueLineChart;
