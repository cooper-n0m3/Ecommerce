import React,{useEffect} from "react";
import NavbarComponent from "../header/NavbarComponent";
import AsideComponent from "../aside/AsideComponent";
import { Link, Outlet } from "react-router-dom";
import "../../assets/style/App.css";


const LayoutComponent = () => {
  
  return (
    <>
      {/* Navbar */}
      <NavbarComponent />
      {/* End navbar */}
      {/* Sidebar */}
      <AsideComponent />
      {/* End sidebar */}
      {/* Main */}
      <main className="p-4  sm:ml-64 bg-gray-900 ">
        <div className="p-4  dashboard-container w-full border-gray-200  rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </main>
      {/* End main */}
    </>
  );
};

export default LayoutComponent;
