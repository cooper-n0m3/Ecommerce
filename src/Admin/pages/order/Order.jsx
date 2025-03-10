import React, { useState } from "react";
import DateSinglePicker from "../../components/common/datePicker/DatePicker";
import numeral from "numeral";
import { OrderBox } from "../../../redux/features/ecommerceTracking/BoxOrder";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { sortOrder } from "../../../redux/features/ecommerceTracking/OrderListTable";

const ListOrder = () => {
  const locationRouter = useLocation().pathname;
  
  const boxOrder = OrderBox;
  return (
    <>
    
      <div className="text-2xl py-3 fira-sans-medium-italic text-gray-100 opacity-80">
        <p className="ml-5 text-gray-600">
          Order/<font className="text-gray-200">Activies</font>
        </p>
      </div>
      <div className="text-2xl py-3 fira-sans-medium-italic">
        <DateSinglePicker />
      </div>
      <div className="dashboard-blog-card h-24 border border-gray-500 border-opacity-50 flex  px-4 py-4 items-center gap-3 justify-center mb-4 rounded-lg bg-gray-800">
        {boxOrder.map((item, index) => (
          <button
            key={index}
            className={`!font-sans  cursor-default !normal-case w-1/4 p-2 border border-gray-400 border-opacity-50 opacity-90 transition hover:scale-105 h-full rounded-lg flex justify-center items-center`}
          >
            <div
              className="card-icon !shadow !bg-gray-700 border border-opacity-70 text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
              style={{ border: `1px solid gray` ,}}
            >
              {item.svg}
            </div>
            <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
              <small>{item.title}</small>
              <div className="text-white">
                <font className="text-xl ">
                  {numeral(item.qty).format("0.a")}
                </font>
                <small className="text-xs  opacity-80">
                  {" "}
                  {item.title === "Total Orders"
                    ? ``
                    : `products in ${item.in}`}
                </small>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="border border-gray-500 flex px-1 py-[3px] items-center gap-3 justify-evenly mb-4 rounded-lg bg-gray-800">
        <div className="sort-group w-1/2 flex gap-1 justify-start h-full items-center">
          {
            sortOrder.map((item,index)=>(
              <Button 
                  LinkComponent={Link} to={item.url} key={index} className={`!p-1 !normal-case !px-5 ${locationRouter===item.url?'!bg-gray-700':''} !rounded !text-gray-300 !text-xs`}
                  sx={{ border: `${locationRouter===item.url?'1px solid gray':''}`}}
              >
                {item.title}
              </Button>
            ))
          }
        </div>
        <div className="filter-group w-1/2 flex gap-1 justify-end h-full items-center">
          <button className="p-1  border border-gray-500 rounded bg-gray-600">
            <svg
              className="w-[17px] h-[17px] text-gray-200 dark:text-white"
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
                strokeWidth={2}
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
          <button className="p-1 hover:scale-105 border border-gray-500 rounded ">
            <svg
              className="w-[17px] h-[17px] text-gray-300 dark:text-white"
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
                d="M8 6h8M6 10h12M8 14h8M6 18h12"
              />
            </svg>
          </button>
          <button className="p-1 hover:scale-105 border border-gray-500 rounded ">
            <svg
              className="w-[17px] h-[17px] text-gray-300 dark:text-white"
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
                d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
              />
            </svg>
          </button>
          <button className="p-1 hover:scale-105 border border-gray-500 rounded ">
            <svg
              className="w-[17px] h-[17px] text-gray-300 dark:text-white"
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
                strokeWidth={2}
                d="M6 12h.01m6 0h.01m5.99 0h.01"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="border flex-col border-gray-500 flex px-4 py-4 items-center gap-3 justify-evenly mb-4 rounded-lg bg-gray-800">
        <Outlet />  
      </div>
    </>
  );
};

export default ListOrder;
