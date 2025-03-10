import React from "react";
import numeral from "numeral";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SaleRankingData } from "../../../../redux/features/ecommerceTracking/RevenueDataGraph";
// Updated data with more regions

const BranchSaleRanking = () => {
  
  // Custom tooltip function to format numbers
  const CustomTooltip = ({ payload }) => {
    if (!payload || payload.length === 0) return null;
    const { name, branch, amt } = payload[0].payload; // Getting the name, branch, and amt value
    const formattedBranch = numeral(branch).format("0.0a"); // Safely format branch value
    const formattedAmt = numeral(amt).format("0.0a"); // Format amt (e.g., revenue or total)

    return (
      <div className="custom-tooltip bg-gray-400 opacity-70 p-3 rounded">
        <p style={{textShadow:'var(--textShadow)'}}> Branch: <font className="text-[#2d1eb6] ">{`${name}`}</font> </p>
        <p style={{textShadow:'var(--textShadow)'}}> Sales :  <font className="text-[#1eb5db] ">{`${formattedBranch} per day`}</font> </p>
        <p style={{textShadow:'var(--textShadow)'}}> Total : <font className="text-[#37b61e] ">{`${formattedAmt}`}</font> </p>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        data={SaleRankingData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20, // Increased bottom margin to accommodate labels
          left: 0,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        {/* Rotating the X-Axis labels for better fit */}
        <XAxis 
          dataKey="name" 
          scale="band" 
          angle={45} // Rotate labels by 45 degrees
          textAnchor="end" // Align labels properly
        />
        <YAxis />
        <Tooltip content={<CustomTooltip/>} /> {/* Using the custom tooltip */}
        <Legend />
        <Bar dataKey="branch" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="branch" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default BranchSaleRanking;
