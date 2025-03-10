import React from "react";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <main className="p-4 sm:ml-64 bg-gray-700 h-screen Hide-Scrollbar ">
      <div className="p-4 dashboard-container  border-gray-200 rounded-lg dark:border-gray-700 mt-14">
        {/* Dashboad-Router */}
        <div className="text-2xl fira-sans-medium-italic text-white opacity-60">
          Visitor
        </div>
        {/*End Dashboad-Router */}
        {/* Dashboard Blog card */}
        <div className="dashboard-blog-card flex px-4 py-4 items-center gap-3 justify-center h-24 mb-4 rounded-lg bg-gray-800">
          <Button
            onMouseUp={(e) => ripple.create(e, "dark")}
            className="!font-sans !normal-case w-1/4 p-2 border border-gray-100 border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center"
            style={{ backgroundColor: "var(--blue)" }}
          >
            <div
              className="card-icon  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
              style={{ color: "var(--blue)" }}
            >
              <ion-icon name="trending-up-sharp"></ion-icon>
            </div>
            <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
              <small>Sales Overview</small>
              <div className="text-white">
                <font className="text-xl ">$300K</font>
                <small className="text-xs  opacity-80"> Daily Sales</small>
              </div>
            </div>
          </Button>
          <Button
            onMouseUp={(e) => ripple.create(e, "dark")}
            className="!normal-case w-1/4 p-2 border border-gray-100 border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center"
            style={{ backgroundColor: "var(--success)" }}
          >
            <div
              className="card-icon  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
              style={{ color: "var(--success)" }}
            >
              <ion-icon name="stats-chart"></ion-icon>
            </div>
            <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
              <small>Visitor</small>
              <div className="text-white">
                <font className="text-xl ">300</font>
                <small className="text-xs opacity-80"> a month</small>
              </div>
            </div>
          </Button>
          <Button
            onMouseUp={(e) => ripple.create(e, "dark")}
            className="!normal-case w-1/4 p-2 border border-gray-100 border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center"
            style={{ backgroundColor: "var(--pink)" }}
          >
            <div
              className="card-icon  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
              style={{ color: "var(--pink)" }}
            >
              <ion-icon name="shirt-sharp"></ion-icon>
            </div>
            <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
              <small>Products</small>
              <div className="text-white">
                <font className="text-xl ">300</font>
                <small className="text-xs opacity-80"> +25% new products</small>
              </div>
            </div>
          </Button>
          <Button
            onMouseUp={(e) => ripple.create(e, "dark")}
            className="!normal-case w-1/4 p-2 border border-gray-100 border-opacity-50 opacity-90 transition hover:scale-105  h-full rounded-lg flex justify-center items-center"
            style={{ backgroundColor: "var(--yellow)" }}
          >
            <div
              className="card-icon  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
              style={{ color: "var(--yellow)" }}
            >
              <ion-icon name="cash-sharp"></ion-icon>
            </div>
            <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
              <small>Revenue</small>
              <div className="text-white">
                <font className="text-xl ">300</font>
                <small className="text-xs opacity-80"> Target Revenue</small>
              </div>
            </div>
          </Button>
        </div>
        {/* end dashboard Blog card */}
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
