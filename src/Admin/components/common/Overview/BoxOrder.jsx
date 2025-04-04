/* Order Data */
import numeral from "numeral";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import NumberCount from "../numberCount/NumberCount";
const BoxOrder = ({
  title1 = "Total Booking" || {},
  title2 = "Success" || {},
  title3 = "Pending" || {},
  title4 = "Cancelled" || {},
  label = "label" || {},
  defaultValue = { value1: 0, value2: 450, value3: 0, value4: 0 },
  icons = {},
}) => {
  const OrderBox = [
    {
      title: title1,
      qty: defaultValue.value1,
      label: label,
      svg: icons.icon1 || (
        <svg
          className="w-6 h-6  !text-green-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M5 6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm0 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm3.85-9.76A1 1 0 0 1 10.5 9v6a1 1 0 0 1-1.65.76l-3.5-3a1 1 0 0 1 0-1.52l3.5-3ZM12 10a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "#33ff99",
    },
    {
      title: title2,
      qty: defaultValue.value2,
      label: label,
      svg: icons.icon2 || (
        <svg
          className="w-6 h-6 !text-green-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "#33ff99",
    },
    {
      title: title3,
      qty: defaultValue.value3,
      label: label,
      svg: icons.icon3 || (
        <svg
          className="w-6 h-6 !text-yellow-300 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      color: "#ffaf00",
    },
    {
      title: title4,
      qty: defaultValue.value4,
      label: label,
      svg: icons.icon4 || (
        <svg
          className="w-6 h-6 !text-red-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"
          />
        </svg>
      ),
      color: "#ff0017",
    },
  ];

  return (
    <>
      {OrderBox.map((item, index) => (
        <button
          key={index}
          className={`!font-sans bg-gray-500/5 hover:bg-gray-500/20 hover:backdrop-blur-xl cursor-default !normal-case w-1/4 p-2 border hover:border-none border-gray-400/10 transition hover:scale-105 h-full rounded-lg flex justify-center items-center `}
        >
          <div
            className="card-icon !border-none !bg-green-500/5  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
            style={{ border: `1px solid gray` }}
          >
            {item.svg}
          </div>
          <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
            <small>{item.title}</small>
            <div className="text-white flex  items-center gap-2 w-[70%] ">
              <font className="text-xl flex ">
                <NumberCount
                  className="slashed-zero  text-5xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-ubuntu font-bold"
                  Number={item.qty}
                />
              </font>
              <small className="text-xs  opacity-90 ">{item.label}(s)</small>
            </div>
          </div>
        </button>
      ))}
    </>
  );
};

export default BoxOrder;

//Box Order
