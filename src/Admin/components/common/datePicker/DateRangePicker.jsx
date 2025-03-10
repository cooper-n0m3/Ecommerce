import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { addDays } from "date-fns";
import { Button } from "@mui/material";

const DateRangePickerWithToggle = () => {
  const calendarIcon = (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
  const close = (
    <div className="w-full h-14 flex  items-center justify-center gap-1">
      <p>confirm</p>
    </div>
  );

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [showPicker, setShowPicker] = useState(false); // State to toggle visibility

  return (
    <>
      <div className="date-container border-blue-600 p-5 w-full overflow-hidden">
        <div className="flex  items-center rounded-full h-auto overflow-hidden  justify-evenly w-full border border-gray-600 gap-3 bg-gray-700 p-5">
          <Button
            focusRipple
            className="!bg-blue-600  !h-12 !normal-case w-36 !text-white"
            onClick={() => setShowPicker(!showPicker)}
            sx={{
                border: "1px solid #ffffff", // Custom border
                borderRadius: "5px",         // Optional: custom border radius
              }}
          >
            {showPicker ? close : calendarIcon}
          </Button>
          {showPicker && (
            <DateRangePicker
              className="!rounded !p-10"
              ranges={range}
              onChange={(item) => setRange([item.selection])}
            />
          )}
          <div className={showPicker ? "hidden" : "show"}>
            <p className="text-white">
              Start Date:{" "}
              <code className="text-blue-600 font-sans">
                {range[0].startDate.toDateString()}
              </code>{" "}
            </p>
            <p className="text-white">
              End Date:{" "}
              <code className="text-blue-600 font-sans">
                {range[0].endDate.toDateString()}
              </code>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateRangePickerWithToggle;
