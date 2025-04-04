import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const colourOptions = [
  { value: "Dry Skin", label: "Dry Skin" },
  { value: "Oily Skin", label: "Oily Skin" },
  { value: "Combination Skin", label: "Combination Skin" },
  { value: "Sensitive Skin", label: "Sensitive Skin" },
  { value: "Normal Skin", label: "Normal Skin" },
  { value: "Acne-Prone", label: "Acne-Prone" },
];

const MultipleSelect = ({ name, id, value, onChange }) => {
  const animatedComponents = makeAnimated();

  return (
    <Select
      name={name}
      id={id}
      components={animatedComponents}
      isMulti
      options={colourOptions}
      value={value} // Bind Formik's value
      onChange={(selectedOptions) => onChange(name, selectedOptions)} // Update Formik state
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        border: "unset",
        colors: {
          ...theme.colors,
          primary25: "lightgray",
          primary: "black",
        },
      })}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }),
      }}
    />
  );
};

export default MultipleSelect;
