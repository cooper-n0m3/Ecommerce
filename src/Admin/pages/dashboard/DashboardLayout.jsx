import React, { useState } from "react";
import LineChart from "../../components/common/Graphs/LineGraph";
import ListBuyerCustomer from "../../components/common/customerCard/ListBuyerCustomer";
import Ripple from "material-ripple-effects";
import { Button } from "@mui/material";
import PopularsProductTable from "../../components/common/tables/PopularsProduct";
import {
  dataAsDay,
  dataAsWeek,
  dataAsMonth,
  dataAsYear,
} from "/src/redux/features/ecommerceTracking/RevenueDataGraph.js";


const Dashboard = () => {
  
  const [data, setData] = useState(dataAsDay);
  const ripple = new Ripple();

  /* handleOnChange */
  const handleOnChange = (e) => {
    return e.target.value == "Week"
      ? setData(dataAsWeek)
      : e.target.value == "Month"
      ? setData(dataAsMonth)
      : e.target.value == "Year"
      ? setData(dataAsYear)
      : setData(dataAsDay);
  };
  const iconUpload = (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <>
      {/* Dashboad-Router */}
      <div className="text-2xl  py-3 fira-sans-medium-italic text-gray-100 opacity-80">
        <p className="ml-5 text-gray-600">
        Overview/<font className="text-gray-200">Activities</font>
        </p>
      </div>
      {/*End Dashboad-Router */}
      {/* Dashboard Blog card */}
      <div className="dashboard-blog-card border border-gray-500 border-opacity-50 flex  px-4 py-4 items-center gap-3 justify-center h-24 mb-4 rounded-lg bg-gray-800">
        <Button
          onMouseUp={(e) => ripple.create(e, "dark")}
          className="!font-sans !normal-case w-1/4 p-2 border border-gray-100 border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center"
          style={{ backgroundColor: "var(--blue)" }}
        >
          <div
            className="card-icon  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
            style={{ color: "var(--blue)" }}
          >
            <ion-icon name="trending-up-sharp"></ion-icon>
          </div>
          <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
            <small>Sales Overview</small>
            <div className="text-white">
              <font className="text-xl ">$300K</font>
              <small className="text-xs  opacity-80"> Daily Sales</small>
            </div>
          </div>
        </Button>
        <Button
          onMouseUp={(e) => ripple.create(e, "dark")}
          className="!normal-case w-1/4 p-2 border border-gray-100 border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center"
          style={{ backgroundColor: "var(--success)" }}
        >
          <div
            className="card-icon  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
            style={{ color: "var(--success)" }}
          >
            <ion-icon name="stats-chart"></ion-icon>
          </div>
          <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
            <small>Visitor</small>
            <div className="text-white">
              <font className="text-xl ">300</font>
              <small className="text-xs opacity-80"> a month</small>
            </div>
          </div>
        </Button>
        <Button
          onMouseUp={(e) => ripple.create(e, "dark")}
          className="!normal-case w-1/4 p-2 border border-gray-100 border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center"
          style={{ backgroundColor: "var(--pink)" }}
        >
          <div
            className="card-icon  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
            style={{ color: "var(--pink)" }}
          >
            <ion-icon name="shirt-sharp"></ion-icon>
          </div>
          <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
            <small>Products</small>
            <div className="text-white">
              <font className="text-xl ">300</font>
              <small className="text-xs opacity-80"> +25% new products</small>
            </div>
          </div>
        </Button>
        <Button
          onMouseUp={(e) => ripple.create(e, "dark")}
          className="!normal-case w-1/4 p-2 border border-gray-100 border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center"
          style={{ backgroundColor: "var(--yellow)" }}
        >
          <div
            className="card-icon  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
            style={{ color: "var(--yellow)" }}
          >
            <ion-icon name="cash-sharp"></ion-icon>
          </div>
          <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
            <small>Revenue</small>
            <div className="text-white">
              <font className="text-xl ">300</font>
              <small className="text-xs opacity-80"> Target Revenue</small>
            </div>
          </div>
        </Button>
      </div>
      {/* end dashboard Blog card */}
      <div className="dashboard-blog-card border border-gray-500 border-opacity-50 flex  px-2 py-2 items-center gap-3 justify-center h-24 mb-4 rounded-lg bg-gray-800">
        <div className="flex  gap-4 w-full p-3 px-7 h-20 items-start justify-center rounded bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          <div className="flex w-8/12 h-full items-center text-white text-xl">
            <p className="font-extrabold font-mono">
              Upload Product:{" "}
              <code className="text-gray-300 font-bold">
                Click the button to get started uploading new product!
              </code>
            </p>
          </div>
          <div className="flex w-4/12 h-full items-center justify-end">
            <button
              onMouseUp={(e) => ripple.create(e, "dark")}
              className="py-3 border flex justify-center px-4 w-32 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
              style={{ backgroundColor: "var(--blue)" }}
            >
              {iconUpload}
            </button>
          </div>
        </div>
      </div>
      <div className="dashboard-blog-card flex gap-4 mb-4 w-full border border-gray-500 border-opacity-50  p-2 items-center  justify-center rounded-lg bg-gray-800">
        <div className=" h-full  flex relative flex-col w-8/12 items-center justify-center">
          <small className="absolute text-xs top-5 right-5 ">
            <select
              onChange={handleOnChange}
              name="recordSelecting"
              id="recordSelecting"
              className="flex align-middle opacity-70 bg-gray-800 text-gray-500 rounded p-2 cursor-pointer"
            >
              <option value="Year">Year</option>
              <option value="Month">Month</option>
              <option value="Week">Week</option>
              <option value="Day">Day</option>
            </select>
          </small>
          <LineChart dataGraph={data} />
        </div>
        <div className="flex w-4/12 h-full items-start justify-center rounded ">
          <ListBuyerCustomer />
        </div>
      </div>
      <div className="dashboard-blog-card flex flex-col gap-4 mb-4 w-full border border-gray-500 border-opacity-50  p-2 items-center  justify-center rounded-lg bg-gray-800">
        <p className="font-mono text-2xl text-gray-200 opacity-90">
          Product{" "}
          <font color="blue" className="underline underline-offset-1">
            Ranking
          </font>
        </p>
        <PopularsProductTable />
      </div>
    </>
  );
};
export default Dashboard;
