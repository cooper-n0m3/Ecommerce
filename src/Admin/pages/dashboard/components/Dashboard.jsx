import React from "react";

const Dashboard = () => {
  return (
    <>
      
      <div className="flex gap-4 mb-4 w-full p-3 px-7 h-20 items-start justify-center rounded bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
        
        <div className="flex w-8/12 h-full items-center text-white text-xl">
          <p className="font-extrabold font-mono">
            Upload Product: Click the button to get started!
          </p>
        </div>
        <div className="flex w-4/12 h-full items-center justify-end">
          <button
            onMouseUp={(e) => ripple.create(e, "dark")}
            className="py-3 border px-4 w-32 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 "
            style={{ backgroundColor: "var(--blue)" }}
          >
            Uploard
          </button>
        </div>
      </div>
      <div className="flex gap-4 mb-4 w-full">
        <div className="bg-gray-800 flex relative flex-col w-8/12 items-center justify-center rounded">
          <small className="absolute top-5 right-5 ">
            <select
              name="recordSelecting"
              id="recordSelecting"
              onChange={handleOnChange}
              className="flex align-middle opacity-70 bg-gray-400 rounded p-2 cursor-pointer"
            >
              <option value="Year">Year</option>
              <option value="Month">Month</option>
              <option value="Week">Week</option>
              <option value="Day">Day</option>
            </select>
          </small>
          <LineChart />
        </div>
        <div className="flex w-4/12 h-90 items-start justify-center rounded ">
          <ListBuyerCustomer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
