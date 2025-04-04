import React, { useEffect, useState } from "react";
import NavbarComponent from "../header/NavbarComponent";
import AsideComponent from "../aside/AsideComponent";
import { Link, Outlet } from "react-router-dom";
import "../../assets/style/App.css";
import { Toaster } from "react-hot-toast";
import LoadingMotion from "../common/loading/LoadingThreeDotJumping";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const LayoutComponent = () => {
  const { isLoading } = useSelector((state) => state.store);

  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    setLoading(isLoading)
  },[isLoading])
  return (
    <div className="bg-[url('/Bg-Application.svg')] gap-2 bg-gray-900 w-[100vw] h-[100vh]">
      {/* Navbar */}
      <NavbarComponent />
      {/* End navbar */}
      {/* Sidebar */}
      <AsideComponent />
      {/* End sidebar */}
      {/* Main */}
      <Toaster
        toastOptions={{
          className:
            "!bg-gray-800/20 !backdrop-blur-sm !backdrop: !text-gray-300 !font-extrabold  !text-xs !px-4 !py-3 !rounded-lg !shadow-lg",
        }}
        position="top-center"
        reverseOrder={true}
      />
      <main className=" h-[100vh] pl-3 Hide-Scrollbar sm:ml-64 bg-[url('/Bg-Application.svg')] ">
        {loading && <LoadingMotion />}
        {/* <LoadingMotion classNames="fixed h-full top-[37rem] left-1/2 z-30 -translate-x-1/2 -translate-y-1/2" /> */}
        <div
          className={`p-4 ${
            loading ? "pointer-events-none blur " : ""
          } dashboard-container w-full border-gray-200 bg-gray-900/70 !px-1 backdrop-blur-xs rounded-lg  mt-14`}
        >
          <Outlet />
        </div>
      </main>
      {/* End main */}
    </div>
  );
};

export default LayoutComponent;
