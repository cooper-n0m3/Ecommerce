import React   from "react";
import { Outlet } from "react-router-dom";

const BookingView = () => {
  return (
    <>
      <div className="text-2xl py-3 fira-sans-medium-italic text-gray-100 opacity-80">
        <p className="ml-5 text-gray-600">
          Booking/<font className="text-gray-200">Activies</font>
        </p>
      </div>
      <Outlet />  
    </>
  );
};
export default BookingView;
