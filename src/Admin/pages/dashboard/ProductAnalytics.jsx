import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { SaleSvg } from "../../components/common/Svg/ProductAnanlysis/SaleAnalysis";
import UpAnalysis from "../../components/common/Svg/ProductAnanlysis/DownAnalysis";
import { DownStatistic } from "../../components/common/Svg/ProductAnanlysis/VisitorIcon";
/* Date Picker */

const ProductAnalytics = () => {
  const location = useLocation();
  return (
    <>
      <div className="text-2xl py-3 fira-sans-medium-italic text-gray-100 opacity-80">
        <p className="ml-5 text-gray-600">
          Analystics/<font className="text-gray-200">Activies</font>
        </p>
      </div>
      <div className="dashboard-blog-card border border-gray-500 flex px-4 py-4 items-center gap-3 justify-evenly h-24 mb-4 rounded-lg bg-gray-800">
        <Button
          component={Link}
          to="/admin/product-analysis/sale"
          focusRipple
          className={`!font-sans !normal-case w-3/6 overflow-hidden p-2  border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center ${
            location.pathname === "/admin/product-analysis/sale"
              ? ""
              : " !opacity-75 "
          }`}
          style={{
            backgroundColor: `${
              location.pathname === "/admin/product-analysis/sale"
                ? "var(--blue)"
                : "#6c757d49"
            }`,
          }}
        >
          {/* Blog Sale Icon Svg */}
          <div className="card-icon bg-white text-xl w-1/6 rounded-full aspect-square  flex items-center justify-center">
            <SaleSvg />
          </div>
          {/*End Blog Sale Icon Svg */}
          <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
            <small className="text-xl">Sales Analysis </small>
            <div className="text-white">
              <font className="text-xl ">$300K</font>
              <small className="text-xs  opacity-80"> Daily Sales</small>
            </div>
          </div>
          <div className="card-icon p-2 bg-gray-800 text-xl rounded-full aspect-square  flex items-center justify-center">
            <code
              style={{ textShadow: "var(--textShadow)" }}
              className=" font-bold text-green-500 z-10 relative bottom-0"
            >
              +2.9%
            </code>
            <UpAnalysis />
          </div>
        </Button>
        <Button
          component={Link}
          to="/admin/product-analysis/visitor"
          focusRipple
          className={`!normal-case w-3/6 overflow-hidden p-2  border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center ${
            location.pathname === "/admin/product-analysis/visitor"
              ? ""
              : " !opacity-75  "
          }`}
          style={{
            backgroundColor: `${
              location.pathname === "/admin/product-analysis/visitor"
                ? "var(--success)"
                : "#6c757d49"
            }`,
          }}
        >
          <div className="card-icon bg-white text-xl w-1/6 rounded-full aspect-square  flex items-center justify-center">
            <svg
              className={`w-6 h-6 ${
                location.pathname === "/admin/product-analysis/visitor"
                  ? " svg-menu "
                  : " "
              }`}
              style={{
                color: `${
                  location.pathname === "/admin/product-analysis/visitor"
                    ? "var(--success)"
                    : "var(--gray-dark)"
                }`,
              }}
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
                d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"
              />
            </svg>
          </div>
          <div className="card-infor text-white w-4/5 h-full  flex flex-col items-center justify-center">
            <small className="text-xl">Visitor</small>
            <div className="text-white">
              <font className="text-xl ">300M</font>
              <small className="text-xs opacity-80"> Total views</small>
            </div>
          </div>
          <DownStatistic />
        </Button>
      </div>
      <Outlet />
    </>
  );
};
export default ProductAnalytics;
