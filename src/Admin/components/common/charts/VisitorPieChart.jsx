import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  BarChart2,
  FileText,
  ChevronDown,
  ChevronUp,
  Clock,
  Zap,
  Users,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

// Enhanced sample data
const monthlyData = [
  { month: "Jan", bookings: 510, growth: 5.2, revenue: 12500, avgStay: 3.2 },
  { month: "Feb", bookings: 610, growth: 19.6, revenue: 15200, avgStay: 3.5 },
  { month: "Mar", bookings: 710, growth: 16.4, revenue: 17800, avgStay: 3.7 },
  { month: "Apr", bookings: 510, growth: -28.2, revenue: 12700, avgStay: 2.9 },
  { month: "May", bookings: 810, growth: 58.8, revenue: 20300, avgStay: 4.1 },
  { month: "Jun", bookings: 710, growth: -12.3, revenue: 17700, avgStay: 3.6 },
  { month: "Jul", bookings: 910, growth: 28.2, revenue: 22800, avgStay: 4.3 },
  { month: "Aug", bookings: 1010, growth: 11.0, revenue: 25300, avgStay: 4.5 },
  { month: "Sep", bookings: 810, growth: -19.8, revenue: 20200, avgStay: 3.8 },
  { month: "Oct", bookings: 1110, growth: 37.0, revenue: 27800, avgStay: 4.7 },
  { month: "Nov", bookings: 1010, growth: -9.0, revenue: 25200, avgStay: 4.2 },
  { month: "Dec", bookings: 1510, growth: 49.5, revenue: 37800, avgStay: 5.2 },
];

const generateDailyData = (month) => {
  const baseValue =
    monthlyData.find((m) => m.month === month)?.bookings / 30 || 25;
  return Array.from({ length: 31 }, (_, i) => ({
    day: `${i + 1}`,
    bookings: Math.floor(baseValue * (0.8 + Math.random() * 0.4)),
    growth: (Math.random() * 40 - 20).toFixed(1),
    revenue: Math.floor(baseValue * (25 + Math.random() * 10)),
  }));
};

const CustomTooltip = ({ active, payload, viewType }) => {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/95 backdrop-blur-md border border-gray-800 p-4 rounded-xl shadow-2xl space-y-3 min-w-[220px]"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-900/30 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-400" />
        </div>
        <p className="font-bold text-white text-lg">
          {viewType === "daily" ? `Day ${data.day}` : data.month}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-300" />
            <span className="text-gray-300">Bookings</span>
          </div>
          <span className="font-medium text-white">
            {data.bookings.toLocaleString()}
          </span>
        </div>

        {data.growth && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {data.growth > 0 ? (
                <ChevronUp className="w-4 h-4 text-green-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-red-400" />
              )}
              <span className="text-gray-300">Growth</span>
            </div>
            <span
              className={`font-medium ${
                data.growth > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {data.growth > 0 ? "+" : ""}
              {data.growth}%
            </span>
          </div>
        )}

        {data.revenue && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-300" />
              <span className="text-gray-300">Revenue</span>
            </div>
            <span className="font-medium text-white">
              ${data.revenue.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon, title, value, change }) => {
  const isPositive = change >= 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 rounded-xl p-2 flex-1 min-w-[200px] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`p-2 rounded-lg ${
            isPositive ? "bg-green-900/30" : "bg-red-900/30"
          }`}
        >
          {React.cloneElement(icon, {
            className: `w-5 h-5 ${
              isPositive ? "text-green-400" : "text-red-400"
            }`,
          })}
        </div>
        <span className="text-gray-400 text-sm">{title}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span
          className={`flex items-center text-sm ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {change}%
          {isPositive ? (
            <ChevronUp className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
          )}
        </span>
      </div>
    </motion.div>
  );
};

const LineChartVisitor = () => {
  const [viewType, setViewType] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [chartType, setChartType] = useState("line");

  const { dailyData } = useSelector(
      (state) => state.store
    );
  // const dailyData = {
  //   Jan: [
  //     { day: "1", bookings: 0, revenue: 375, occupancy: 65 },
  //     { day: "2", bookings: 18, revenue: 450, occupancy: 70 },
  //     { day: "3", bookings: 15, revenue: 450, occupancy: 70 },
  //     { day: "4", bookings: 18, revenue: 450, occupancy: 70 },
  //     { day: "5", bookings: 7, revenue: 450, occupancy: 70 },
  //     { day: "6", bookings: 22, revenue: 525, occupancy: 75 },
  //     { day: "7", bookings: 25, revenue: 600, occupancy: 80 },
  //     { day: "8", bookings: 12, revenue: 375, occupancy: 65 },
  //     { day: "9", bookings: 14, revenue: 450, occupancy: 70 },
  //     { day: "10", bookings: 19, revenue: 450, occupancy: 70 },
  //     { day: "11", bookings: 21, revenue: 525, occupancy: 75 },
  //     { day: "12", bookings: 24, revenue: 600, occupancy: 80 },
  //     { day: "13", bookings: 26, revenue: 675, occupancy: 85 },
  //     { day: "14", bookings: 28, revenue: 750, occupancy: 90 },
  //     { day: "15", bookings: 15, revenue: 450, occupancy: 70 },
  //     { day: "16", bookings: 17, revenue: 450, occupancy: 70 },
  //     { day: "17", bookings: 20, revenue: 525, occupancy: 75 },
  //     { day: "18", bookings: 22, revenue: 600, occupancy: 80 },
  //     { day: "19", bookings: 10, revenue: 375, occupancy: 65 },
  //     { day: "20", bookings: 13, revenue: 450, occupancy: 70 },
  //     { day: "21", bookings: 25, revenue: 675, occupancy: 85 },
  //     { day: "22", bookings: 27, revenue: 750, occupancy: 90 },
  //     { day: "23", bookings: 18, revenue: 450, occupancy: 70 },
  //     { day: "24", bookings: 20, revenue: 525, occupancy: 75 },
  //     { day: "25", bookings: 22, revenue: 600, occupancy: 80 },
  //     { day: "26", bookings: 14, revenue: 450, occupancy: 70 },
  //     { day: "27", bookings: 16, revenue: 450, occupancy: 70 },
  //     { day: "28", bookings: 19, revenue: 525, occupancy: 75 },
  //     { day: "29", bookings: 21, revenue: 600, occupancy: 80 },
  //     { day: "30", bookings: 23, revenue: 675, occupancy: 85 },
  //     { day: "31", bookings: 12, revenue: 375, occupancy: 65 }
  //   ],
  //   Feb: [
  //     { day: "1", bookings: 2, revenue: 300, occupancy: 60 },
  //     { day: "2", bookings: 12, revenue: 300, occupancy: 60 },
  //     { day: "3", bookings: 52, revenue: 300, occupancy: 60 },
  //     { day: "4", bookings: 10, revenue: 300, occupancy: 60 },
  //     { day: "5", bookings: 30, revenue: 300, occupancy: 60 },
  //   ],
  //   Mar: [
  //     { day: "1", bookings: 5, revenue: 350, occupancy: 65 },
  //     { day: "2", bookings: 12, revenue: 350, occupancy: 65 },
  //     { day: "3", bookings: 8, revenue: 350, occupancy: 65 },
  //     { day: "4", bookings: 15, revenue: 350, occupancy: 65 },
  //     { day: "5", bookings: 20, revenue: 350, occupancy: 65 },
  //   ],
  //   Apr: [
  //     { day: "1", bookings: 10, revenue: 400, occupancy: 70 },
  //     { day: "2", bookings: 25, revenue: 400, occupancy: 70 },
  //     { day: "3", bookings: 7, revenue: 400, occupancy: 70 },
  //     { day: "4", bookings: 5, revenue: 400, occupancy: 70 },
  //     { day: "5", bookings: 15, revenue: 400, occupancy: 70 },
  //   ],
  //   May: [
  //     { day: "1", bookings: 12, revenue: 450, occupancy: 75 },
  //     { day: "2", bookings: 30, revenue: 450, occupancy: 75 },
  //     { day: "3", bookings: 20, revenue: 450, occupancy: 75 },
  //     { day: "4", bookings: 25, revenue: 450, occupancy: 75 },
  //     { day: "5", bookings: 35, revenue: 450, occupancy: 75 },
  //   ],
  //   Jun: [
  //     { day: "1", bookings: 8, revenue: 500, occupancy: 80 },
  //     { day: "2", bookings: 10, revenue: 500, occupancy: 80 },
  //     { day: "3", bookings: 15, revenue: 500, occupancy: 80 },
  //     { day: "4", bookings: 18, revenue: 500, occupancy: 80 },
  //     { day: "5", bookings: 20, revenue: 500, occupancy: 80 },
  //   ],
  //   Jul: [
  //     { day: "1", bookings: 5, revenue: 450, occupancy: 70 },
  //     { day: "2", bookings: 10, revenue: 450, occupancy: 70 },
  //     { day: "3", bookings: 8, revenue: 450, occupancy: 70 },
  //     { day: "4", bookings: 12, revenue: 450, occupancy: 70 },
  //     { day: "5", bookings: 25, revenue: 450, occupancy: 70 },
  //   ],
  //   Aug: [
  //     { day: "1", bookings: 14, revenue: 500, occupancy: 75 },
  //     { day: "2", bookings: 18, revenue: 500, occupancy: 75 },
  //     { day: "3", bookings: 22, revenue: 500, occupancy: 75 },
  //     { day: "4", bookings: 16, revenue: 500, occupancy: 75 },
  //     { day: "5", bookings: 25, revenue: 500, occupancy: 75 },
  //   ],
  //   Sep: [
  //     { day: "1", bookings: 9, revenue: 450, occupancy: 65 },
  //     { day: "2", bookings: 20, revenue: 450, occupancy: 65 },
  //     { day: "3", bookings: 12, revenue: 450, occupancy: 65 },
  //     { day: "4", bookings: 15, revenue: 450, occupancy: 65 },
  //     { day: "5", bookings: 8, revenue: 450, occupancy: 65 },
  //   ],
  //   Oct: [
  //     { day: "1", bookings: 13, revenue: 400, occupancy: 60 },
  //     { day: "2", bookings: 25, revenue: 400, occupancy: 60 },
  //     { day: "3", bookings: 17, revenue: 400, occupancy: 60 },
  //     { day: "4", bookings: 19, revenue: 400, occupancy: 60 },
  //     { day: "5", bookings: 8, revenue: 400, occupancy: 60 },
  //   ],
  //   Nov: [
  //     { day: "1", bookings: 4, revenue: 375, occupancy: 65 },
  //     { day: "2", bookings: 18, revenue: 375, occupancy: 65 },
  //     { day: "3", bookings: 12, revenue: 375, occupancy: 65 },
  //     { day: "4", bookings: 15, revenue: 375, occupancy: 65 },
  //     { day: "5", bookings: 10, revenue: 375, occupancy: 65 },
  //   ],
  //   Dec: [
  //     { day: "1", bookings: 8, revenue: 300, occupancy: 60 },
  //     { day: "2", bookings: 10, revenue: 300, occupancy: 60 },
  //     { day: "3", bookings: 15, revenue: 300, occupancy: 60 },
  //     { day: "4", bookings: 5, revenue: 300, occupancy: 60 },
  //     { day: "5", bookings: 25, revenue: 300, occupancy: 60 },
  //   ],
  // };

  const chartData = useMemo(() => {
    if (viewType === "daily") {
      // Return your actual daily data for selected month
      return dailyData[selectedMonth] || [];
    }
    return monthlyData;
  }, [viewType, selectedMonth]);

  const currentStats = useMemo(() => {
    if (viewType === "monthly") {
      const current = monthlyData[monthlyData.length - 1];
      const previous = monthlyData[monthlyData.length - 2];
      return {
        bookings: current.bookings,
        bookingsChange: current.growth,
        revenue: current.revenue,
        revenueChange: (
          ((current.revenue - previous.revenue) / previous.revenue) *
          100
        ).toFixed(1),
        avgStay: current.avgStay,
        avgStayChange: (
          ((current.avgStay - previous.avgStay) / previous.avgStay) *
          100
        ).toFixed(1),
      };
    } else {
      const lastDay = chartData[chartData.length - 1];
      const prevDay = chartData[chartData.length - 2];
      return {
        bookings: lastDay.bookings,
        bookingsChange: lastDay.growth,
        revenue: lastDay.revenue,
        revenueChange: (
          ((lastDay.revenue - prevDay.revenue) / prevDay.revenue) *
          100
        ).toFixed(1),
        avgStay: (Math.random() * 2 + 3).toFixed(1),
        avgStayChange: (Math.random() * 20 - 10).toFixed(1),
      };
    }
  }, [viewType, chartData]);

  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <Area
            type="monotone"
            className=""
            dataKey="bookings"
            stroke="#3b82f6"
            fill="url(#colorGradient)"
            strokeWidth={2}
            activeDot={{
              r: 8,
              fill: "#3b82f6",
              stroke: "white",
              strokeWidth: 2,
            }}
          />
        );
      case "bar":
        return (
          <Bar
            dataKey="bookings"
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
            activeBar={{ fill: "#3b82f6" }}
          />
        );
      default:
        return (
          <Line
            type="monotone"
            dataKey="bookings"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 5, fill: "#3b82f6" }}
            activeDot={{
              r: 8,
              fill: "#3b82f6",
              stroke: "white",
              strokeWidth: 2,
            }}
          />
        );
    }
  };

  

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-800/50 border border-blue-500/30 backdrop-blur-sm  rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-900/30 rounded-lg">
            <BarChart2 className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Booking Analytics</h2>
            <p className="text-sm text-gray-400">
              {viewType === "monthly"
                ? "Monthly performance overview"
                : `Daily insights for ${selectedMonth}`}
            </p>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {viewType === "daily" && (
            <motion.div
              key="month-selector"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 bg-gray-800 rounded-lg px-3"
            >
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="
                border-none
                    bg-transparent text-sm py-1.5 appearance-none
                    focus:outline-none text-white cursor-pointer
                  "
              >
                {monthlyData.map((monthData) => (
                  <option
                    key={monthData.month}
                    value={monthData.month}
                    className="bg-gray-800 text-white"
                  >
                    {monthData.month}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-wrap gap-3">
          <div className="flex  rounded-lg p-1">
            <button
              onClick={() => setViewType("monthly")}
              className="relative px-3 py-1 text-sm font-medium transition-all rounded-lg group"
            >
              {viewType === "monthly" && (
                <motion.div
                  layoutId="active-button"
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg opacity-80"
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  viewType === "monthly"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }`}
              >
                Monthly
              </span>
            </button>
            <button
              onClick={() => setViewType("daily")}
              className="relative px-3 py-1 text-sm font-medium transition-all rounded-lg group"
            >
              {viewType === "daily" && (
                <motion.div
                  layoutId="active-button"
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg opacity-80"
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  viewType === "daily"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }`}
              >
                Daily
              </span>
            </button>
          </div>

          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setChartType("line")}
              className="relative p-2 transition-all rounded-lg group"
              title="Line Chart"
            >
              {chartType === "line" && (
                <motion.div
                  layoutId="active-chart-button"
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg opacity-80"
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              )}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`relative z-10 ${
                  chartType === "line"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }`}
              >
                <path d="M3 3v18h18" />
                <path d="M19 9l-5 5-4-4-3 3" />
              </svg>
            </button>

            <button
              onClick={() => setChartType("bar")}
              className="relative p-2 transition-all rounded-lg group"
              title="Bar Chart"
            >
              {chartType === "bar" && (
                <motion.div
                  layoutId="active-chart-button"
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg opacity-80"
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              )}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={`relative z-10 ${
                  chartType === "bar"
                    ? "text-white"
                    : "text-gray-400 group-hover:text-white"
                }`}
              >
                <path d="M3 3v18h18" />
                <rect x="4" y="8" width="4" height="10" />
                <rect x="10" y="4" width="4" height="14" />
                <rect x="16" y="12" width="4" height="6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<Users />}
          title="Total Bookings"
          value={currentStats.bookings.toLocaleString()}
          change={currentStats.bookingsChange}
        />
        <StatCard
          icon={<DollarSign />}
          title="Revenue"
          value={`$${currentStats.revenue.toLocaleString()}`}
          change={currentStats.revenueChange}
        />
        <StatCard
          icon={<Clock />}
          title="Avg. Stay"
          value={`${currentStats.avgStay} days`}
          change={currentStats.avgStayChange}
        />
      </div>

      {/* Main Chart */}
      <div className="w-full h-[400px] justify-start flex items-center">
        <ResponsiveContainer width="100%" height="100%" className="">
          {chartType === "bar" ? (
            <BarChart
              className=""
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey={viewType === "daily" ? "day" : "month"}
                tick={{ fill: "rgb(156 163 175)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis
                tick={{ fill: "rgb(156 163 175)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip viewType={viewType} />} />
              {renderChart()}
            </BarChart>
          ) : (
            <LineChart
              data={chartData}
              className=""
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey={viewType === "daily" ? "day" : "month"}
                tick={{ fill: "rgb(156 163 175)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis
                tick={{ fill: "rgb(156 163 175)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip viewType={viewType} />} />
              {renderChart()}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-300">
            {viewType === "monthly"
              ? "Last 12 months performance"
              : `Daily trends for ${selectedMonth}`}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default LineChartVisitor;
