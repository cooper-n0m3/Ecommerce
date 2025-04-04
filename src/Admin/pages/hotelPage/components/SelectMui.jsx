import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ErrorMessage } from "formik";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: "var(--selectOption)", // Background color of the dropdown container
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for better visibility
    },
  },
};

export default function MultipleSelectChip({
  label,
  data,
  name,
  id,
  value,
  onChange,
  onBlur
}) {
  const [personName, setPersonName] = React.useState(value || []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
    onChange(name, value); // Update parent form state
  };
  const handleFieldBlur=()=>{
    if(onBlur){
      onBlur({target:{name}})
    }
  }
  React.useEffect(() => {
    if (value !== personName) {
      setPersonName(value); // Sync with parent value
    }
  }, [value]);

  return (
    <div className="w-full">
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="select-multiple-chip" className="!text-gray-400">
          {label}
        </InputLabel>
        <Select
          id={id}
          name={name}
          onBlur={handleFieldBlur}
          labelId="select-multiple-chip-label"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput
              className="bg-gray-700 bg-opacity-60 border-none "
              id="select-multiple-chip"
              label={label}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  className="!text-gray-300 !bg-gray-800"
                  sx={{ border: "1px solid var(--opac)" }}
                  key={value}
                  label={value}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          sx={{
            ".MuiPaper-root": {
              backgroundColor: "var(--selectOption)", // Custom background using CSS variable
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Box shadow remains
            },
            ".MuiMenuItem-root:hover": {
              backgroundColor: "darkgray", // Background on hover
            },
            ".MuiSelect-root": {
              backgroundColor: "gray", // Background color for the select input itself
            },
          }}
        >
          {data.map((item, index) => (
            <MenuItem
              key={index}
              value={label === "Tag" ? "#" + item.value : item.value}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "var(--selectOptionsub)", // Highlight selected item
                  color: "var(--selectOptionText)", // Text color for selected item
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "gray", // Brighter background on hover
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "rgba(200, 200, 200, 0.5)", // Hover background for other items
                },
                color: personName.includes(item.value) ? "blue" : "white", // Text color for selected options
              }}
            >
              {label === "Tag" ? "#" + item.value : item.value}
            </MenuItem>
          ))}
        </Select>
        <ErrorMessage name={id}>
          {(msg) => <div className="text-red-600">{msg}</div>}
        </ErrorMessage>
      </FormControl>
    </div>
  );
}
