import React from "react";
import numeral from "numeral";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { SaleAnalysisData } from "../../../../redux/features/ecommerceTracking/RevenueDataGraph";
// Sample data

// Custom Tooltip Component
const CustomTooltip = ({ payload, label }) => {
  if (!payload || payload.length === 0) return null;

  const { month, revenue, profit, expenses } = payload[0].payload; // Extracting values
  const formattedRevenue = numeral(revenue).format("0.0a");
  const formattedProfit = numeral(profit).format("0.0a");
  const formattedExpenses = numeral(expenses).format("0.0a");

  return (
    <div className="custom-tooltip bg-gray-400 opacity-70 p-3 rounded">
      <p style={{textShadow:'var(--textShadow)'}}> <font className="text-[#2d1eb6] ">Month: {`${month}`}</font> </p>
      <p style={{textShadow:'var(--textShadow)'}}> <font className="text-[#8884d8] ">Revenue: </font>{`${formattedRevenue}`}</p>
      <p style={{textShadow:'var(--textShadow)'}}> <font className="text-[#82ca9d] ">Profit: </font>{`${formattedProfit}`}</p>
      <p style={{textShadow:'var(--textShadow)'}}> <font className="text-[#ff0000] ">Expenses: </font>{`-${formattedExpenses}`}</p>
    </div>
  );
};

const SaleLineChart = () => {
  return (
    <div className="flex w-full justify-center p-5 px-0 rounded">
      <LineChart
        width={1050}
        height={400}
        data={SaleAnalysisData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${numeral(value).format("0.0a")}`} />
        <Tooltip content={<CustomTooltip />} /> {/* Using custom tooltip */}
        <Legend />
        <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expenses" stroke="#ff0000" />
      </LineChart>
    </div>
  );
};

export default SaleLineChart;
