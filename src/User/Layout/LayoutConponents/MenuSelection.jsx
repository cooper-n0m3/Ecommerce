import { Button } from "@mui/material";
import React, { useState } from "react";

const SelectRoom = ({
  // sx:{checkIn=false},
  typeSelection = {
    isSelectGuests: false,
    isSelectRoom: false,
    isSelectCheckInDate: false,
    isSelectCheckOutDate: false,
  },
  className="",
  icon = "" || {},
  title = "" || {},
  defaultSelection = "",
  defaultValue = [] || [
    { value: "Suite", label: "Suite" },
    { value: "Single room", label: "Single room" },
  ],
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-2  w-full h-full relative flex items-center justify-center">
        {/* Custom Select Trigger */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            !rounded-lg 
            !normal-case
            !focus:outline-none
            !focus:ring-0
            !transition-all 
            !duration-300 
            !ease-in-out
            !gap-2
            !border-none
            !px-4 
            !py-2
            !text-left
            !text-gray-200 
            !font-semibold
            !flex
            !justify-between
            !items-center
            ${className}
          `}
        >
          {icon}
          <div className="flex flex-col ">
            <span className="text-black text-[15px] font-bold">{title}</span>
            <span className="text-[12px]  text-black truncate w-16  ">
              {selectedOption
                ? defaultValue.find((opt) => opt.value === selectedOption)
                    ?.label
                : defaultSelection}
            </span>
          </div>
          <svg
            className={`w-4 text-gray-900 h-4 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>

        {/* Dropdown Menu */}
        {isOpen && typeSelection.isSelectRoom && (
          <div
            className={`
            absolute 
            w-full 
            mt-1 
             bg-white
            text-gray-950
            rounded-lg 
            border
            border-gray-200
            overflow-hidden
          `}
          >
            {defaultValue.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`
                  w-full 
                  text-left
                  hover:bg-indigo-50 
                  focus:bg-indigo-100 
                  focus:text-indigo-900
                  focus:outline-none
                  cursor-pointer 
                  transition-colors 
                  duration-200 
                  ease-in-out
                  px-4 
                  py-2
                                    ${
                                      option.value === selectedOption
                                        ? "bg-black/5"
                                        : ""
                                    }

                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        {isOpen && typeSelection.isSelectGuests && (
          <div
            className={`
            absolute 
            w-full 
            mt-1 
            bg-white
            text-gray-950
            rounded-lg 
            border
            border-gray-200
            overflow-hidden
          `}
          >
            {defaultValue.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`
                  w-full 
                  text-left
                  hover:bg-indigo-50 
                  focus:bg-indigo-100 
                  focus:text-indigo-900
                  focus:outline-none
                  cursor-pointer 
                  transition-colors 
                  duration-200 
                  ease-in-out
                  px-4 
                  py-2
                  ${option.value === selectedOption ? "bg-black/5" : ""}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectRoom;
