import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import LoadingMotion from "../../components/common/loading/LoadingMotion";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const {isLoading} = useSelector(state=>state.store);
  return (
    <>
      {isLoading && (
        <LoadingMotion classNames="fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2" />
      )}
      <div className={` Hide-Scrollbar ${isLoading?'pointer-events-none blur':''} bg-gradient-to-r from-gray-950 to-slate-800 flex justify-center items-center h-[100vh] w-full bg-gray-900`}>
        <Toaster
          toastOptions={{
            className:
              "!bg-gray-800/50 !backdrop-blur-sm !backdrop: !text-white !text-xs !px-4 !py-3 !rounded-lg !shadow-lg",
          }}
          position="top-center"
          reverseOrder={true}
        />
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
