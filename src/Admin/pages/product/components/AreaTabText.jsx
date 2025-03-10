import React, { useState } from "react";
import { Badge, Tabs } from "antd";
import { ErrorMessage, Field } from "formik";

const AreaTabText = ({benefit,description,usageInstruction}) => {
  const [isTabs, setIsTabs] = useState(1);

  const onChange = (key) => {
    setIsTabs(key);
  };

  const items = [
    {
      key: "1",
      label: (
        <Badge dot={isTabs!=='1' && benefit === ''}>
          <span
            className={`px-4 py-2 rounded-md ${
              isTabs == 1 ? " text-blue-500" : " text-gray-300"
            }`}
          >
            Benefits
          </span>
        </Badge>
      ),
      children: (
        <div className="p-0 flex flex-col">
          <label htmlFor="benefit" className="text-gray-400">
            Benefits
          </label>
          <Field
            className="min-h-[150px]  bg-gray-700 text-gray-300 p-2"
            type="text"
            as="textarea"
            name="benefit"
            id="benefit"
          />
          <ErrorMessage name="benefit">
            {(msg) => <div className="text-red-600">{msg}</div>}
          </ErrorMessage>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Badge dot={isTabs !='2' && description === ''}>
          <span
            className={`px-4 py-2 rounded-md ${
              isTabs == 2 ? " text-blue-500" : " text-gray-300"
            }`}
          >
            Description
          </span>
        </Badge>
      ),
      children: (
        <div className="p-0 flex flex-col">
          <label htmlFor="productDescriptions" className="text-gray-400">
            Description
          </label>
          <Field
            className="min-h-[150px] focus:outline-none focus:border-none bg-gray-700 text-gray-300  p-2"
            type="text"
            as="textarea"
            name="productDescriptions"
            id="productDescriptions"
          />
          <ErrorMessage name="productDescriptions">
            {(msg) => <div className="text-red-600">{msg}</div>}
          </ErrorMessage>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <Badge dot={isTabs !='3' && usageInstruction === ''}>
          <span
            className={`px-4 py-2 rounded-md ${
              isTabs == 3 ? " text-blue-500" : " text-gray-300"
            }`}
          >
            Usag Instruction
          </span>
        </Badge>
      ),
      children: (
        <div className="p-0 flex flex-col">
          <label htmlFor="usageInstruction" className="text-gray-400">
           Usag Instruction
          </label>
          <Field
            className="min-h-[150px] focus:outline-none focus:border-none bg-gray-700 text-gray-300  p-2"
            type="text"
            as="textarea"
            name="usageInstruction"
            id="usageInstruction"
          />
          <ErrorMessage name="usageInstruction">
            {(msg) => <div className="text-red-600">{msg}</div>}
          </ErrorMessage>
        </div>
      ),
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey={isTabs.toString()}
        onChange={onChange}
        className="p-1"
        tabBarStyle={{opacity:0.6}}
        items={items}
      />
    </>
  );
};
export default AreaTabText;
