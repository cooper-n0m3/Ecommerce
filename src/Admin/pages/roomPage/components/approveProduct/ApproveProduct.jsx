import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  OrderList,
  sortApprove,
} from "/src/redux/features/ecommerceTracking/OrderListTable.js";
import { Button } from "@mui/material";
import numeral from "numeral";
import { Dropdown } from "flowbite-react";
import { useSelector } from "react-redux";
const ApproveProduct = () => {

  const locationRouter = useLocation().pathname;
  const product = useSelector(state=>state.product.draftItems[0]);
  const DraftProduct = product?.data??[];  
  
  const [sortList, setSortList] = useState(sortApprove);
  return (
    <>
      <div className="border border-gray-500 flex px-1 py-[3px] items-center gap-3 justify-evenly mb-4 rounded-lg bg-gray-800">
        <div className="sort-group w-1/2 flex gap-1 justify-start h-full items-center">
          {sortList.map((item, index) => (
            <Button
              LinkComponent={Link}
              to={item.url}
              key={index}
              className={`!p-1 !normal-case !px-5 ${
                locationRouter === item.url ? "!bg-gray-700" : ""
              } !rounded !text-gray-300 !text-xs`}
              sx={{
                border: `${
                  locationRouter === item.url ? "1px solid gray" : ""
                }`,
              }}
            >
              {item.title}
            </Button>
          ))}
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
          <button className="p-1  hover:scale-105 border border-gray-500 rounded ">
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
          <button className=" p-1 hover:scale-105 border border-gray-500 rounded ">
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-500 bg-gray-800">
            <tr className="text-center">
              <th scope="col" className="text-xs px-6 py-3 ">
                Poster
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="text-xs px-6 py-3">
                Brand Name
              </th>

              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="text-xs px-6 py-3">
                Sale Price
              </th>
              <th scope="col" className="px-6 py-3">
                Discount
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="">
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApproveProduct;
