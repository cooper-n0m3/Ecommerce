import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Breadcrumb } from "antd";

const MainHotel = () => {
  const location = useLocation();
  return (
    <>
      <div className="text-2xl flex items-center justify-between px-2 py-3 fira-sans-medium-italic text-gray-100 opacity-80">
        <p className="ml-5 text-gray-600">
          Hotel/<font className="text-gray-200">Activies</font>
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
                  to="/admin/post-hotel"
                  className={`${
                    location.pathname == "/admin/post-hotel"
                      ? "!text-gray-300"
                      : "!text-gray-500"
                  }`}
                >
                  post-hotel
                </Link>
              ),
            },
            {
              title: (
                <Link
                  to="/admin/view-hotel/all"
                  className={`${
                    location.pathname == "/admin/view-hotel/" ||
                    location.pathname == "/admin/view-hotel/all" ||
                    location.pathname == "/admin/view-hotel/active" ||
                    location.pathname == "/admin/view-hotel/inactive"
                      ? "!text-gray-300"
                      : "!text-gray-500"
                  }`}
                >
                  view-hotel
                </Link>
              ),
            },
          ]}
        />
      </div>
      <Outlet />
    </>
  );
};

export default MainHotel;
