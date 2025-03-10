import React, { useState, useEffect } from "react";
import { ConfigProvider, Select, Tag } from "antd";
import { ErrorMessage } from "formik";
import { DownOutlined } from "@ant-design/icons";

const tagRender = (props) => {
  const { label, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      className="flex items-center bg-gray-700 bg-opacity-60 h-[30px] min-w-[40px] rounded-full border border-gray-500 border-opacity-70"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
    >
      {label}
    </Tag>
  );
};

const TagsSelect = ({ defaultSelect, name, onChange, onBlur, defaultData, typeSelect, MAX_SELECT }) => {
  const [step, setStep] = useState(defaultSelect || []); // Initialize with defaultSelect or empty array

  
  useEffect(() => {
    // If the parent value (defaultSelect) changes, update local state
    setStep(defaultSelect || []);
    onChange(name,defaultSelect)
  }, [defaultSelect]); // Runs whenever defaultSelect changes

  const handleChange = (value) => {
    setStep(value);
    onChange(name, value); // Pass the updated value to the parent    
  };

  const handleOnBlur = () => {
    if (onBlur) {
      onBlur({ target: { name } });
    }
  };

  const sufix =
    typeSelect === "tags" ? (
      <>
        <span className="text-gray-400">
          {step.length} / {MAX_SELECT}
        </span>
        <DownOutlined style={{ color: "rgb(161 161 170)" }} />
      </>
    ) : (
      <DownOutlined style={{ color: "rgb(161 161 170)" }} />
    );

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(55 65 81)",
            colorBgBase: "rgb(55 65 81)",
            colorTextBase: "rgb(209 213 219)",
            borderRadius: 0,
            size: "100px",
            colorBorder: "rgb(107 114 128)",
          },
        }}
      >
        {typeSelect === "tags" ? (
          <Select
            placeholder="Type and press Enter to add tags"
            value={step} // Controlled value, tied to state
            tagRender={tagRender}
            maxCount={MAX_SELECT}
            mode={typeSelect}
            size="large"
            suffixIcon={sufix}
            onBlur={handleOnBlur}
            style={{
              width: "100%",
            }}
            onChange={handleChange}
            options={defaultData}
            allowClear
          />
        ) : (
          <Select
            value={step} // Controlled value, tied to state
            tagRender={tagRender}
            mode={typeSelect}
            size="large"
            suffixIcon={sufix}
            onBlur={handleOnBlur}
            style={{
              width: "100%",
            }}
            onChange={handleChange}
            options={defaultData}
            allowClear
          />
        )}

        <ErrorMessage name={name}>
          {(msg) => <div className="text-red-600">{msg}</div>}
        </ErrorMessage>
      </ConfigProvider>
    </>
  );
};

export default TagsSelect;
