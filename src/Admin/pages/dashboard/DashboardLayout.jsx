import React, { useState } from "react";
import LineChart from "../../components/common/Graphs/LineGraph";
import ListBuyerCustomer from "../../components/common/customerCard/ListBuyerCustomer";
import Ripple from "material-ripple-effects";
import { AnimatePresence, motion } from "framer-motion";
import PopularsProductTable from "../../components/common/tables/PopularsProduct";
import {
  dataAsDay,
  dataAsWeek,
  dataAsMonth,
  dataAsYear,
} from "/src/redux/features/ecommerceTracking/RevenueDataGraph.js";
import BoxOrder from "../../components/common/Overview/BoxOrder";
import LineChartVisitor from "../../components/common/charts/visitorPieChart";
import TabPages from "../../components/common/TabPages";
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

      {/* <Selections className=' shadow-none'/> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="dashboard-blog-card  relative h-24  border border-blue-500/30 flex  px-4 py-4 items-center gap-3 justify-center  rounded-lg bg-gradient-to-r from-gray-800 to-slate-900"
      >
        <p className="text-end absolute right-2 border border-gray-300/10  -top-[0.9rem] bg-gray-500/20 rounded backdrop-blur-sm text-green-400/90 shadow-sm px-2 text-[15px]">
          this week.
        </p>

        <BoxOrder
          title1={
            <p className="text-[12px] flex items-center justify-end gap-[1px]">
              Arrivals(
              <small className="text-green-500 text-[14px] font-bold flex justify-center items-center">
                +28%
              </small>
              )
            </p>
          }
          title2={
            <p className="text-[12px] flex items-center justify-end gap-[1px]">
              Departure(
              <small className="text-red-500 text-[14px] font-bold flex justify-center items-center">
                -5%
              </small>
              )
            </p>
          }
          title3={
            <p className="text-[12px] flex items-center justify-end gap-[1px]">
              Bookings(
              <small className="text-green-500 text-[14px] font-bold flex justify-center items-center">
                +8%
              </small>
              )
            </p>
          }
          title4={
            <p className="text-[12px] flex items-center justify-end gap-[1px]">
              Revenue(
              <small className="text-green-500 text-[14px] font-bold flex justify-center items-center">
                +28%
              </small>
              )
            </p>
          }
          label={<small className="text-[13px]">This week</small>}
          icons={{
            icon1: (
              <svg
                className="w-6 h-6 text-green-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                />
              </svg>
            ),
            icon2: (
              <svg
                className="w-6 h-6 text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>
            ),
            icon4: (
              <svg
                className="w-6 h-6 text-green-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.6 16.733c.234.269.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.446-1.287-1.242-1.481-.796-.194-1.41-.861-1.241-1.481a1.4 1.4 0 0 1 1.75-.762c.343.077.654.26.888.524m-1.358 4.017v.617m0-5.939v.725M4 15v4m3-6v6M6 8.5 10.5 5 14 7.5 18 4m0 0h-3.5M18 4v3m2 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                />
              </svg>
            ),
          }}
          // defaultValue={{
          //   value1: totalBooking,
          //   value2: success,
          //   value3: pending,
          //   value4: cancelled,
          // }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="dashboard-blog-card mt-4 mb-4 relative h-24 border border-blue-500/30 flex  px-4 py-4 items-center gap-3 justify-center  rounded-lg bg-gradient-to-r from-gray-800 to-slate-900"
      >
        <p className="text-end absolute right-2 -bottom-[0.9rem] bg-gray-500/20 border border-gray-300/10 rounded backdrop-blur-sm text-green-400/90 shadow-sm px-2 text-[15px]">
          previous week.
        </p>

        <BoxOrder
          title1={
            <p className="text-[12px] flex items-center justify-end gap-[1px]">
              Arrivals(
              <small className="text-green-500 text-[14px] font-bold flex justify-center items-center">
                +28%
              </small>
              )
            </p>
          }
          title2={
            <p className="text-[12px] flex items-center justify-end gap-[1px]">
              Departure(
              <small className="text-red-500 text-[14px] font-bold flex justify-center items-center">
                -5%
              </small>
              )
            </p>
          }
          title3={
            <p className="text-[12px] flex items-center justify-end gap-[1px]">
              Bookings(
              <small className="text-green-500 text-[14px] font-bold flex justify-center items-center">
                +8%
              </small>
              )
            </p>
          }
          title4={
            <p className="text-[12px] flex items-center justify-end gap-[1px]">
              Revenue(
              <small className="text-green-500 text-[14px] font-bold flex justify-center items-center">
                28%
              </small>
              )
            </p>
          }
          label={<small className="text-[13px]">This week</small>}
          icons={{
            icon1: (
              <svg
                className="w-6 h-6 text-green-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                />
              </svg>
            ),
            icon2: (
              <svg
                className="w-6 h-6 text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>
            ),
            icon4: (
              <svg
                className="w-6 h-6 text-green-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.6 16.733c.234.269.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.446-1.287-1.242-1.481-.796-.194-1.41-.861-1.241-1.481a1.4 1.4 0 0 1 1.75-.762c.343.077.654.26.888.524m-1.358 4.017v.617m0-5.939v.725M4 15v4m3-6v6M6 8.5 10.5 5 14 7.5 18 4m0 0h-3.5M18 4v3m2 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                />
              </svg>
            ),
          }}
          // defaultValue={{
          //   value1: totalBooking,
          //   value2: success,
          //   value3: pending,
          //   value4: cancelled,
          // }}
        />
      </motion.div>

      <div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="dashboard-blog-card  flex-col mt-7 relative border border-blue-500/30 flex p-2 items-center gap-3 justify-center  rounded-lg bg-gradient-to-r from-gray-800 to-slate-900"
      >
        <TabPages />
        {/* <LatestUserBookingTable/> */}
      </div>
      {/* Latest Booking */}
      {/* end dashboard Blog card */}
      <div className="mt-14 relative mb-14 flex w-full justify-center items-center ">
        <p className="text-end absolute right-3 -top-3 z-30 bg-gray-500/20  border border-gray-300/10 rounded backdrop-blur-sm text-green-400/90 shadow-sm px-2 text-[15px]">
          Graph analysis.
        </p>
        <LineChartVisitor />
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
      <div className="dashboard-blog-card border mt-7 border-gray-500 border-opacity-50 flex  px-2 py-2 items-center gap-3 justify-center h-24 mb-4 rounded-lg bg-gray-800">
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
