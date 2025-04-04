/* Order Data */
import numeral from "numeral";
import React from "react";

const OverView = ({ Data = [] }) => {
  return (
    <>
      {Data.map((item, index) => (
        <button
          key={index}
          className={`!font-sans cursor-default !normal-case w-1/4 p-2 border border-gray-400 border-opacity-50 opacity-90 transition hover:scale-105 h-full rounded-lg flex justify-center items-center`}
        >
          <div
            className="card-icon !shadow !bg-gray-700 border border-opacity-70 text-xl w-1/5 rounded-full aspect-square flex items-center justify-center"
            style={{ border: `1px solid gray` }}
          >
            {item.svg}
          </div>
          <div className="card-infor text-white w-4/5 h-full flex flex-col items-center justify-center">
            <small>{item.title}</small>
            <div className="text-white">
              <font className="text-xl">{numeral(item.qty).format("0.a")}</font>
              <small className="text-xs opacity-80">
                {item.title === "Total Orders" ? "" : " items"}
              </small>
            </div>
          </div>
        </button>
      ))}
    </>
  );
};
export default OverView;

//Box Order
