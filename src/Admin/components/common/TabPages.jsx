import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LatestUserBookingTable from "../../pages/dashboard/components/LatestUserBookingTable";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  GET_bookings,
  GET_CharsetAsDaily,
} from "../../../redux/features/store/storeActions";

export default function TabPages() {
  const [activeTab, setActiveTab] = useState("Latest");
  const [isFlipping, setIsFlipping] = useState(false);
  const dispatch = useDispatch();

  const handleOnRefresh = () => {
    setIsFlipping((item) => !item);
    dispatch(GET_bookings());
    dispatch(GET_CharsetAsDaily());
  };
  const tabs = [
    { name: "Latest", content: <LatestUserBookingTable sort={activeTab} /> },
    { name: "Arrivals", content: <LatestUserBookingTable sort={activeTab} /> },
    {
      name: "Departures",
      content: <LatestUserBookingTable sort={activeTab} />,
    },
    { name: "Paid", content: <LatestUserBookingTable sort={activeTab} /> },
    { name: "Pending", content: <LatestUserBookingTable sort={activeTab} /> },
  ];

  return (
    <>
      <div className="w-full  relative justify-start border-b border-gray-300/30 flex backdrop-blur-sm p-2 ">
        <p className="text-end absolute right-0 -top-[1.3rem]  bg-gray-500/10 backdrop-blur-sm z-20  border border-gray-300/10 rounded  text-green-400/90 shadow-sm px-2 text-[15px]">
          Latest booking.
        </p>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className="relative  px-4 py-2 text-[13px] rounded-lg text-white font-medium transition-colors"
          >
            {activeTab === tab.name && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 backdrop-blur-sm  from-10% bg-emerald-500 via-90% to-emerald-600 to-90%  rounded-md"
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            )}
            <span className="relative z-10">{tab.name}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-col-2  w-full">
        {/* Bottom Navigation with Full Background Change */}
        <div className=" w-full h-full flex flex-col text-white p-3 rounded-lg ">
          {/* Tab Title */}
          <div className="flex group border-b relative border-gray-600/40 items-center space-x-2">
            <motion.span
              className="w-3 h-3 bg-pink-500/90 backdrop-blur-sm rounded-full"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.5, 1] }} // Pulsing effect (scale from 1 to 1.5 and back)
              transition={{
                duration: 2, // Time it takes to complete the cycle
                ease: "easeInOut",
                repeat: Infinity, // Repeat the animation infinitely
                repeatType: "loop", // Makes the animation loop
              }}
            />
            <h2 className="text-lg font-semibold">{activeTab}</h2>
            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={handleOnRefresh}
              className="flex group px-1 py-[3px] backdrop-blur-sm rounded-sm text-[14px]  absolute right-14 top-0 cursor-pointer float-end"
            >
              <p className="">Refresh</p>
              <svg
                className={`w-6 h-6 text-blue-400 absolute -right-7 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 -top-[3px] ${
                  isFlipping ? "rotate-180" : "rotate-0" // Conditionally apply rotation
                }`}
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
                  d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
                />
              </svg>
            </motion.div>
          </div>

          {/* Animated Content */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              className="text-gray-400 mt-2  text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {tabs.find((tab) => tab.name === activeTab)?.content}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
