import React, { useState } from "react";
import { Link, Outlet,  } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const ProductComponent = () => {
  return (
    <>
      <div className="text-2xl py-3 fira-sans-medium-italic text-gray-100 opacity-80">
        <p className="ml-5 text-gray-600">
          Product Management/<font className="text-gray-200">Activies</font>
        </p>
      </div>
      <div className="text-xs py-1 fira-sans-medium-italic text-gray-200 bg-opacity-50">
        <Toaster
          position="top-center"
          reverseOrder={true}
        />
      </div>
      <Outlet />
    </>
  );
};

export default ProductComponent;
