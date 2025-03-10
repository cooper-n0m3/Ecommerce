import { Button } from "@mui/material";
import React  from "react";
import { Link, useLocation, } from "react-router-dom";
import ScrollToTop from "../../product/components/ScrollToTop";
import DraftEditorForm from "../draft-Form/DraftEditorForm";
import { decodeHash } from "../../../components/common/password/passwordGenerator";
const DraftEditor = () => {
  const handleSubmit = (id) => {
    const btnSubmit = document.querySelector("." + id);
    btnSubmit.click();
  };
  
  /*param route*/
  const location = useLocation();  // Access the current location object
  const queryParams = new URLSearchParams(location.search); // Parse the query string
  const pid = queryParams.get('pid');  // Get the "pid" query parameter
  const decodePid = decodeHash(pid)
  

  return (
    <>
      <div className="border  border-gray-500 flex p-3 items-center gap-3 justify-evenly mb-4 rounded-lg bg-gray-800">
        <div className="w-6/12 gap-2 flex justify-start items-center h-[40px] ">
          <Button
            LinkComponent={Link}
            to="/admin/view-product"
            className="!text-gray-300"
            sx={{ border: "1px solid #ecd9d92a" }}
          >
            <svg
              className="w-[20px] h-[20px] text-gray-300 dark:text-white"
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
                strokeWidth="1.7"
                d="M8.757 6 3.24 10.95a1.05 1.05 0 0 0 0 1.549l5.611 5.088m5.73-3.214v1.615a.948.948 0 0 1-1.524.845l-5.108-4.251a1.1 1.1 0 0 1 0-1.646l5.108-4.251a.95.95 0 0 1 1.524.846v1.7c3.312 0 6 2.979 6 6.654v1.329a.7.7 0 0 1-1.345.353 5.174 5.174 0 0 0-4.652-3.191l-.003-.003Z"
              />
            </svg>
          </Button>
          <div className="box-text flex flex-col">
            <small className="text-xs text-gray-400">Back to list</small>
            <h3 className="font-bold text-gray-300">Add to Product</h3>
          </div>
        </div>
        <div className="w-6/12 flex gap-2 justify-end items-center h-[40px]">
          <Button
            className="!normal-case !gap-2 !opacity-90 !bg-green-500 !text-gray-200 !border !border-gray-700 !border-opacity-50 text-xs"
            sx={{ border: "1px solid #ecd9d92a" }}
            onClick={(e) => handleSubmit("SaveDraft")}
          >
            <svg
              className="w-[20px] h-[20px] text-gray-200 dark:text-white"
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
                strokeWidth="1.7"
                d="M11 16h2m6.707-9.293-2.414-2.414A1 1 0 0 0 16.586 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7.414a1 1 0 0 0-.293-.707ZM16 20v-6a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6h8ZM9 4h6v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4Z"
              />
            </svg>
            <h5>Save</h5>
          </Button>
        </div>
      </div>
      <div className="border  border-gray-500 flex p-3 items-center gap-3 justify-evenly mb-4 rounded-lg bg-gray-800">
        <DraftEditorForm productId={decodePid}/>
      </div>
      <ScrollToTop />
    </>
  );
};

export default DraftEditor;
