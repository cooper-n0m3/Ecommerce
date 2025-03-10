import { Space, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "moment/moment";

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const DateRangePicker = ({
  name,
  setFieldValue,
  createdDefaultDate = "",
  expirationDefaultDate = "",
}) => {
  const { RangePicker } = DatePicker;

  const [defaultDates, setDefaultDates] = useState(null);

  const handleRangePicker = (event) => {
    setFieldValue(name, event || []);
  };

  useEffect(() => {
    // Update default dates when props change
    if (createdDefaultDate && expirationDefaultDate) {
      setDefaultDates([
        dayjs(moment(createdDefaultDate).format("YYYY-MM-DD")),
        dayjs(moment(expirationDefaultDate).format("YYYY-MM-DD")),
      ]);
      
      
      // setFieldValue('expireDate',defaultDates)
    }
  }, [createdDefaultDate, expirationDefaultDate]);

  useEffect(()=>{
    setFieldValue('expireDate',defaultDates)
  },[defaultDates])

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        value={defaultDates} // Use `value` for controlled input
        name={name}
        onChange={(e) => {
          setDefaultDates(e); // Update local state when user changes dates
          handleRangePicker(e);
        }}
        disabledDate={disabledDate}
        style={{
          color: "var(--date-range-picker-color)", // Text color inside the input
        }}
        placeholder={["Creation Date", "Expiration Date"]}
        className="bg-gray-600 w-[300px] border border-gray-500 hover:bg-gray-500"
        suffixIcon={
          <svg
            className="w-[20px] h-[20px] text-gray-400"
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
              strokeWidth="1.1"
              d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
            />
          </svg>
        }
      />
    </Space>
  );
};

export default DateRangePicker;
