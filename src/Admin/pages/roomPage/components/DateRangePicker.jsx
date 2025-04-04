import { Space, DatePicker } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const { RangePicker } = DatePicker;

const DateRangePicker = ({
  name,
  setFieldValue,
  placeholder = ["Start date", "End date"],
  width = 300,
  disabledFuture = false,
  disabledPast = true,
}) => {
  const [selectedDates, setSelectedDates] = useState(null);

  const handleRangeChange = (dates) => {
    setSelectedDates(dates);
    setFieldValue(name, dates || []);
  };

  const disabledDate = (current) => {
    if (!current) return false;

    const today = dayjs().startOf("day");

    if (disabledPast && disabledFuture) {
      return !current.isSame(today);
    }
    if (disabledPast) {
      return current < today;
    }
    if (disabledFuture) {
      return current > today;
    }
    return false;
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        value={selectedDates}
        name={name}
        onChange={handleRangeChange}
        disabledDate={disabledPast || disabledFuture ? disabledDate : undefined}
        style={{
          width: `${width}px`,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #d9d9d9",
          borderRadius: "6px",
        }}
        placeholder={placeholder}
        allowClear={true}
        suffixIcon={<CalendarIcon />}
        className="hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
      />
    </Space>
  );
};

const CalendarIcon = () => (
  <svg
    className="w-5 h-5 text-gray-600"
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
      strokeWidth="1.5"
      d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
    />
  </svg>
);

DateRangePicker.propTypes = {
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  placeholder: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.number,
  disabledFuture: PropTypes.bool,
  disabledPast: PropTypes.bool,
};

export default DateRangePicker;
