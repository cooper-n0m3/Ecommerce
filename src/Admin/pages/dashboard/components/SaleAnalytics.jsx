import React from "react";
import SaleLineChart from "../../../components/common/charts/SaleChart";
import BranchSaleRanking from "../../../components/common/charts/SaleComposeChart";
import ListSaleAnalysis from "../../../components/common/customerCard/ListSaleAnalysis";
import DateSinglePicker from "../../../components/common/datePicker/DatePicker";

const SaleAnalytics = () => {
  return (
    <>
      <div className="p-2 bg-gray-800 mt-3 border border-gray-500 rounded-md">
        <p className="font-sans text-end text-xl text-gray-400 opacity-90">
          Date <code className="text-blue-600 underline">Analytics</code>
        </p>
        <div className="flex border border-gray-500 border-opacity-30 rounded flex-col p-2 gap-4 mb-4 w-full">
          <div className="p-4  bg-gray-900  border border-opacity-30 border-gray-500 rounded-md">
            <font color="white" className="underline-offset-0">
              Pick Date to <code className="text-green-400 ">Analysis</code>
            </font>
            <DateSinglePicker />
          </div>
        </div>
        <p className="font-sans my-2 text-end text-xl text-gray-400 opacity-90">
          Sale <code className="text-blue-600 underline">Analytics</code>
        </p>
        <div className="flex border-y border-gray-500 border-opacity-30 rounded flex-col p-2 gap-4 mb-4 w-full">
          <font color="white" className="underline-offset-0">
            Sale Line Chart <code className="text-green-400">Analysis</code>
          </font>
          <SaleLineChart />
        </div>
        <p className="font-sans my-2 text-end text-xl text-gray-400 opacity-90">
          Table of <code className="text-blue-600 underline">Sale</code>
        </p>
        <div className="flex border-opacity-30 border rounded border-gray-500 p-5 flex-col gap-4 w-full">
          <font color="white" className="underline-offset-0">
            Table Sale <code className="text-green-400">Analysis</code>
          </font>
          <div className="flex w-12/12 h-90 items-start justify-center rounded ">
            <ListSaleAnalysis />
          </div>
        </div>
        <p className="font-sans my-2 text-end text-xl text-gray-400 opacity-90">
          Brands sale{" "}
          <code className="text-blue-600 font-sans underline">Ranking</code>
        </p>
        <div className=" bg-gray-800 border-opacity-30 mt-3 p-5 border-y border-gray-500 rounded-md">
          <div className="w-full composeChart bg-gray-800 pt-2 rounded-sm">
            <font color="white" className="underline-offset-0">
              Top sale <code className="text-green-400">Ranking</code>
            </font>
            <BranchSaleRanking />
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleAnalytics;
