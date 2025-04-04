import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Breadcrumb } from "antd";

const Room = () => {
  const location = useLocation();

  return (
    <>
      <div className="flex justify-between items-center py-3 fira-sans-medium-italic text-gray-100 opacity-80">
        <p className="ml-5 text-2xl text-gray-600">
          Room/<font className="text-gray-200">Activies</font>
        </p>
        <Breadcrumb
          className="!text-gray-100"
          separator={<span className="text-gray-500">/</span>} // Change separator color
          items={[
            {
              title: (
                <Link
                  to="/admin"
                  className={`${
                    location.pathname == "/admin"
                      ? "!text-gray-300"
                      : "!text-gray-500"
                  }`}
                >
                  home
                </Link>
              ),
            },
            {
              title: (
                <Link
                  to="/admin/post-room"
                  className={`${
                    location.pathname == "/admin/post-room"
                      ? "!text-gray-300"
                      : "!text-gray-500"
                  }`}
                >
                  post-room
                </Link>
              ),
            },
            {
              title: (
                <Link
                  to="/admin/view-room/total"
                  className={`${
                    location.pathname == "/admin/view-room/total" ||
                    location.pathname == "/admin/view-room/available" ||
                    location.pathname == "/admin/view-room/occupied" ||
                    location.pathname == "/admin/view-room/maintenance" ||
                    location.pathname == "/admin/view-room/booked" ||
                    location.pathname == "/admin/view-room/pending" ||
                    location.pathname == "/admin/view-room/checked-in" ||
                    location.pathname == "/admin/view-room/checked-out" ||
                    location.pathname == "/admin/view-room/closed" 
                      ? "!text-gray-300"
                      : "!text-gray-500"
                  }`}
                >
                  view-room
                </Link>
              ),
            },
          ]}
        />
      </div>
      <div className="text-xs py-1 fira-sans-medium-italic text-gray-200 bg-opacity-50"></div>
      <Outlet />
    </>
  );
};

export default Room;
