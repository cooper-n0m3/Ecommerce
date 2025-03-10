import React from "react";
import { Footer } from "antd/es/layout/layout";

const LayoutFooter = () => {
  return (
    <>
      <Footer className=" bg-gray-800 min-h-[25vh] text-gray-200 grid-cols-3 grid-rows-1">
        <div className="col-span-1 bg-red-200 h-full"></div>
        <div className="col-span-1 bg-blue-500"></div>
        <div className="col-span-1 bg-yellow-500 "></div>
      </Footer>
    </>
  );
};

export default LayoutFooter;
