import React from "react";
import { TableSaleAnalysis } from "../../../../redux/features/ecommerceTracking/RevenueDataGraph";
// plugins: [require("tailwind-scrollbar")({ nocompatible: true })];

const ListSaleAnalysis = () => {
  const totalProfit = TableSaleAnalysis.reduce(
    (sum, item) => sum + item.profit,
    0
  );

  return (
    <div className="h-auto flex flex-col rounded  border border-gray-500">
      {/* Table Header */}
      <table className="table-fixed divide-y divide-gray-500 divide-opacity-50 rounded bg-gray-900 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  text-center w-full h-[10%] text-gray-400 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr className="divide-x divide-gray-500 divide-opacity-50">
            <th className="px-6 w-1/2 py-3 ">Month</th>
            <th className="px-6 w-1/2 py-3 ">Profit</th>
            <th className="px-6 w-1/2 py-3 ">Revenue</th>
            <th className="px-6 w-1/2 py-3 ">Expenses</th>
          </tr>
        </thead>
        <tbody className="divide-y h-[80%] text-center divide-gray-500">
          {TableSaleAnalysis.map((item, index) => (
            <tr className="" key={index}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text-white"
              >
                {item.month}
              </th>
              <td className="px-6 py-4 text-[#82ca9d]">{item.profit}</td>
              <td className="px-6 py-4 text-[#8884d8]">{item.revenue}</td>
              <td className="px-6 py-4 text-[#ff0000]">-{item.expenses}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="text-center h-[10%]">
          <tr className="font-semibold divide-x divide-gray-500 divide-opacity-50">
            <th scope="row" className="px-6 py-3 text-base">
              Total
            </th>
            <td
              className="px-6 py-3 text-[#82ca9d]"
              style={{ textShadow: "var(--textShadow)" }}
            >
              21,000K
            </td>
            <td
              className="px-6 py-3 text-[#8884d8]"
              style={{ textShadow: "var(--textShadow)" }}
            >
              21,000K
            </td>
            <td
              className="px-6 py-3 text-[#ff0000]"
              style={{ textShadow: "var(--textShadow)" }}
            >
              -21,000K
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ListSaleAnalysis;
