import React, { useEffect, useState } from "react";
import { Field, useFormikContext } from "formik";
import { motion as motionFrame, AnimatePresence } from "framer-motion";
import { Image, Tooltip } from "antd";
import { toast } from "react-hot-toast";

const FileSingleUploader = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [preview, setPreview] = useState([]);

  const handlePreview = (fileObject) => {
    if (fileObject.file) {
      const objectUrl = URL.createObjectURL(fileObject.file);
      setPreviewImage(objectUrl);
      setPreviewOpen(true);
    }
  };
  const fileValidation = (files, sizeMax) => {
    const maxSize = sizeMax * 1024 * 1024;
    const allowedType = ["image/jpeg", "image/png", "image/webp", "image/avif"];

    const validateFiles = files.map((file) => {
      let errorMsg = "";
      if (file.size > maxSize) {
        errorMsg = "File too large!";
      } else if (!allowedType.includes(file.type)) {
        errorMsg =
          "The selected file is not supported. Please upload a valid image file (e.g., .jpg, .png, .jpeg).";
      }
      if (errorMsg) {
        return { file, isValid: false, msg: errorMsg };
      } else {
        return { file, isValid: true, msg: "valid type" };
      }
    });
    return validateFiles;
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.currentTarget.files);
    if (files.length > 4) {
      return toast.error("Sorry images are available 4 slots!");
    }
    if (preview.length === 4) {
      return toast.error("Sorry, Images are fulled!");
    }
    const validateFiles = fileValidation(files);
    setPreview((prevPreview) => {
      const updatedPreview = [...prevPreview, ...validateFiles]; // Add validated files to preview
      return updatedPreview;
    });
    toast.success("Image's successfully choose");
  };
  const handleRemove = (event, id) => {
    const prevPreview = preview.filter((file, index) => index !== id);
    setPreview(prevPreview);
    return toast.success("Image removed");
  };
  useEffect(() => {
    const prevPreview = preview
      .filter((file) => file.isValid)
      .map((file) => file.file);
    setFieldValue(name, prevPreview);
  }, [preview, setFieldValue, name]);

  const handleClickFile = (fieldName) => {
    const file = document.getElementById(fieldName);
    file.click();
  };
  return (
    <div className="grid  grid-cols-5 gap-2 ">
      <div className="col-span-2">
        {preview.length == 0 && (
          <div
            onClick={(e) => handleClickFile(name)}
            className="group mb-4 w-full gap-5 min-h-[240px] flex flex-col justify-center items-center border border-dotted hover:border-dashed cursor-pointer border-gray-500 rounded bg-gray-700 bg-opacity-35"
          >
            <div className="box-upload transform transition-transform duration-300 group-hover:scale-110 flex justify-center items-center w-[50px] rounded-full aspect-square bg-opacity-60 bg-gray-600">
              <svg
                className="w-7 shadow transform transition-transform duration-300 group-hover:scale-110 h-7 p-1 bg-gray-400 rounded-full bg-opacity-65   text-white"
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
                  strokeWidth={2}
                  d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
                />
              </svg>
            </div>
            <p className="text-[13px] text-gray-400">
              <span className="text-blue-500">Browse</span> or drag files here(
              <font color="white">alt+u</font>)
            </p>
            <input
              className="border hidden border-gray-400 rounded bg-gray-700 text-gray-400 focus:text-gray-300"
              type="file"
              multiple
              accessKey="u"
              name={name}
              id={name}
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
      <div className="col-span-5">
        <AnimatePresence transition={{ duration: 0.5 }}>
          {preview.map((file, index) => (
            <motionFrame.div
              initial={{ opacity: 1, transitionDuration: 0.5 }}
              animate={{ opacity: 1, transitionDuration: 0.5 }}
              exit={{ opacity: 0 }}
              style={{ listStyle: "none", marginBottom: "3px" }}
              key={index}
              className={`w-full  bg-gray-700 bg-opacity-40 p-1 flex items-center h-[58px] gap-3 border ${
                file.isValid ? "border-green-500" : "border-red-500"
              } border-opacity-20 rounded `}
            >
              <div className="w-1/12 border border-gray-400 border-opacity-70 rounded h-full flex items-center justify-start">
                <div
                  className={`w-full  group relative h-full bg-cover bg-gray-600 rounded overflow-hidden flex justify-center items-center`}
                >
                  {/* for valide file */}
                  {file.isValid && (
                    <img
                      className=" w-full object-cover"
                      src={URL.createObjectURL(file.file)}
                      alt=""
                    />
                  )}
                  {/* for invalid file */}
                  {!file.isValid && (
                    <svg
                      className="w-6 h-6  text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div className="w-9/12 overflow-hidden  h-full flex items-center justify-start">
                <div className="w-full  h-full  flex flex-col justify-center items-start">
                  <p className="text-gray-400 text-[11px] truncate">
                    {file.file.name} (
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                  <small
                    className={`${
                      file.isValid ? "text-green-500" : "text-red-500"
                    } text-[10px]`}
                  >
                    {file.msg}
                  </small>
                </div>
              </div>
              {file.isValid && (
                <div className=" w-2/12  rounded h-full divide-x divide-gray-700  border-gray-600 border-opacity-50 p-[3px] flex items-center justify-between">
                  {/* For previewing items */}
                  <Tooltip
                    title="full screen"
                    placement="left"
                    color="var(--primary)"
                  >
                    <div
                      onClick={(e) => handlePreview(file)}
                      className="group  transform transition-transform duration-500 w-1/2 cursor-pointer h-full  flex justify-center items-center"
                    >
                      <svg
                        className="w-[15px] h-[15px] group-hover:scale-125 group-hover:text-blue-600 transform transition-transform duration-500  text-gray-400"
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
                          strokeWidth={2}
                          d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
                        />
                      </svg>
                    </div>
                  </Tooltip>
                  {/* For removing items */}
                  <Tooltip
                    title="drop (alt+r)"
                    placement="right"
                    color="var(--danger)"
                  >
                    <div
                      onClick={(e) => handleRemove(e, index)}
                      accessKey="r"
                      tabIndex={index}
                      className="group  transform transition-transform duration-500 w-1/2 cursor-pointer h-full  flex justify-center items-center"
                    >
                      <svg
                        className="w-[18px] h-[18px] group-hover:scale-125 group-hover:text-red-600 transform transition-transform duration-500  text-gray-400"
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
                          strokeWidth={2}
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </div>
                  </Tooltip>
                </div>
              )}
              {!file.isValid && (
                <Tooltip
                  title="drop (alt+r)"
                  placement="right"
                  color="var(--danger)"
                >
                  <div
                    onClick={(e) => handleRemove(e, index)}
                    tabIndex={index}
                    className=" w-2/12 group  cursor-pointer  rounded h-full divide-x divide-gray-700  border-gray-600 border-opacity-50 p-[3px] flex items-center justify-center"
                  >
                    <svg
                      className="w-[18px]  h-[18px] group-hover:scale-125 group-hover:text-red-600 transform transition-transform duration-500   text-gray-400"
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
                        strokeWidth={2}
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </div>
                </Tooltip>
              )}
            </motionFrame.div>
          ))}
        </AnimatePresence>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>
    </div>
  );
};
export default FileSingleUploader;
