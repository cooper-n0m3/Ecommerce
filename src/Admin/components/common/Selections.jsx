import React from 'react';
import { Select } from 'antd';
const handleChange = value => {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};
const Selections = ({className}) => (
  <Select
    labelInValue
    defaultValue={{ value: 'This week.', label: 'Previous week.' }}
    style={{ width: 200 }}
    onChange={handleChange}
    className={className}
    rootClassName='bg-gray-200/20 backdrop-sm'
    options={[
      {
        value: 'This week.',
        label: 'This week.',
      },
      {
        value: 'Previous week.',
        label: 'Previous week.',
      },
    ]}
  />
);
export default Selections;