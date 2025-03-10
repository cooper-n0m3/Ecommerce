import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import numeral from "numeral";

const revenueData = [
  { month: "Jan", visitor: 510 },
  { month: "Feb", visitor: 610 },
  { month: "Mar", visitor: 710 },
  { month: "Apr", visitor: 510 },
  { month: "May", visitor: 810 },
  { month: "Jun", visitor: 710 },
  { month: "Jul", visitor: 910 },
  { month: "Aug", visitor: 1010 },
  { month: "Sep", visitor: 810 },
  { month: "Oct", visitor: 1110 },
  { month: "Nov", visitor: 1010 },
  { month: "Dec", visitor: 1510 },
];

const CustomTooltip = ({ payload }) => {
  if (!payload || payload.length === 0) return null;
  const { month, visitor } = payload[0].payload; // Getting the month and visitor values
  const formattedProfit = numeral(visitor).format("0.0a"); // Format visitor value

  return (
    <div className="custom-tooltip bg-gray-400 opacity-70 p-3 rounded">
      <p>{`Month: ${month}`}</p>
      <p>{`Visitor: ${formattedProfit} views`}</p>
    </div>
  );
};

const LineChartVisitor = () => {
  return (
    <>
      <p className="font-sans my-2 text-end text-xl text-gray-400 opacity-90">
        Views <code className="text-blue-600 underline">Line Chart</code> every month
      </p>
      <div className="p-4 w-full bg-gray-800 border-y border-opacity-30 border-gray-500 rounded-md">
        <div className="lineChartContainer w-12/12 flex flex-col">
          <font color="white" className="underline-offset-0">
            Line chart of visitor <code className="text-green-400 ">Analysis</code>
          </font>
          <LineChart
            width={1000}
            height={300}
            data={revenueData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              tickFormatter={(value) =>
                `${numeral(value).format("0.0a")} view(s)`
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="visitor" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </>
  );
};

export default LineChartVisitor;
