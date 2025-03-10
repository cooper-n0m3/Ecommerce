import React from "react";
import { Datepicker,Flowbite} from "flowbite-react";

const DateSinglePicker = ({name,onChange}) => {
  const handleOnChange=(e)=>{
    onChange(name,e)
  }
  return (
    <> 
      <Flowbite>
        <Datepicker autoHide onChange={e=>handleOnChange(e)} minDate={new Date()} id={name} name={name}  title="Shopee" className="w-fit m-2" />
      </Flowbite>
    </>
  );
};
export default DateSinglePicker;