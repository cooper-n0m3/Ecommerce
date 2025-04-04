import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { initializeValue } from "./authForm/initializeComponents.js";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import {
  productMerkOptions,
  productTags,
  productTypeOptions,
} from "./SelectOptions.js";
import StepperCompleted from "./Stepper.jsx";
import { Flowbite } from "flowbite-react";
import { toast } from "react-hot-toast";
import TagsSelect from "./TagsSelect.jsx";
import AreaTabText from "./AreaTabText.jsx";
import DateRangePicker from "./DateRangePicker.jsx";
// import FileUploader fr;
// import FileSingleUploader from "./draft/FileSingleUploader.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  POST_room,
  postProduct,
} from "../../../../redux/features/store/storeActions.js";
import BannerRemind from "./message/BannerRemind.jsx";
import FileProductUploader from "../FIleUploader/ProductFileUpload.jsx";
import FileProductSingleUploader from "../FIleUploader/ProductSingleFileUpload.jsx";
import { ValidationSchema } from "./authForm/FormValidation.js";
import { AnimatePresence, motion } from "framer-motion";
import LoadingMotion from "../../../components/common/loading/LoadingMotion.jsx";
import { Button } from "@mui/material";

const FormikPost = () => {
  const [completedStep, setCompletedStep] = useState(-1);
  const { allHotel, roomSelect } = useSelector((state) => state?.store);
  const CategorySelect = [];
  allHotel?.forEach((item) => {
    CategorySelect.push({ label: item.name, value: item.id });
  });

  const dispatch = useDispatch();
  const handleSubmit = async (values, { setValues }) => {
    try {
      await toast.promise(dispatch(POST_room({ values })).unwrap(), {
        loading: "Saving...",
        success: () => {
          setValues({ pricePerNight: "", description: "" });
          return "Product saved successfully!";
        },
        error: "Failed to save product.",
      });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
  return (
    <>
      <Flowbite>
        {
          <Formik
            initialValues={initializeValue}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, values, handleBlur, isSubmitting, setFieldValue }) => {
              useEffect(() => {
                let completed = 0;
                for (const key in values) {
                  if (
                    values[key] &&
                    (Array.isArray(values[key])
                      ? values[key].length > 0
                      : values[key] !== "")
                  ) {
                    completed += 1;
                  }
                }
                setCompletedStep(completed);
              }, [values]);
              return (
                <Form
                  method="POST"
                  className="w-full relative flex-col flex gap-2 border-opacity-60"
                >
                  <div className="w-full border-b pb-3 border-gray-500">
                    <StepperCompleted completed={completedStep} />
                  </div>
                  <div className="w-full grid grid-cols-2 gap-2 border-opacity-60">
                    <div className="col-span-2">
                      <h3 className="font-bold border-b border-gray-600 p-2 text-gray-300 mb-2">
                        Basic Information
                      </h3>
                      <div className="mb-2 p-1 w-full flex flex-col">
                        <label
                          htmlFor="hotelId"
                          className="text-gray-400 flex gap-1"
                        >
                          Hotel
                        </label>
                        <TagsSelect
                          MAX_SELECT={5}
                          defaultData={CategorySelect}
                          name="hotelId"
                          typeSelect="tag"
                          onBlur={handleBlur}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="mb-2 mt-2 p-1 w-full flex flex-col">
                        <label
                          htmlFor="roomType"
                          className="text-gray-400 flex gap-1"
                        >
                          Type{" "}
                          {values.productName !== "" ? (
                            ""
                          ) : (
                            <p className="text-red-600">*</p>
                          )}
                        </label>
                        <TagsSelect
                          MAX_SELECT={5}
                          defaultData={roomSelect}
                          name="roomType"
                          typeSelect="tag"
                          onBlur={handleBlur}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="mb-2 p-1 relative w-full flex flex-col">
                        <label
                          htmlFor="pricePerNight"
                          className="text-gray-400 flex gap-1"
                        >
                          Price Per night (*
                          <span className="text-yellow-400">
                            accept only number
                          </span>
                          )
                          {values.price !== "" ? (
                            ""
                          ) : (
                            <p className="text-red-600">*</p>
                          )}
                        </label>
                        <Field
                          className="h-[35px]  focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                          type="number"
                          as="input"
                          name="pricePerNight"
                          autoComplete="off"
                          id="pricePerNight"
                        />
                        <svg
                          className="w-6 h-6 absolute top-[33px] right-2 text-gray-500"
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
                            d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                          />
                        </svg>

                        <ErrorMessage name="pricePerNight">
                          {(msg) => <div className="text-red-600">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-2 p-1 relative w-full flex flex-col">
                        <label
                          htmlFor="capacity"
                          className="text-gray-400 flex gap-1"
                        >
                          Capacity Customer (*
                          <span className="text-yellow-400">
                            accept only number
                          </span>
                          )
                        </label>
                        <Field
                          className="h-[35px]  focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                          type="number"
                          as="input"
                          name="capacity"
                          autoComplete="off"
                          id="capacity"
                        />
                        <ErrorMessage name="capacity">
                          {(msg) => <div className="text-red-600">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-2 p-1 w-full flex flex-col">
                        <label htmlFor="description" className="text-gray-400">
                          Description
                        </label>
                        <Field
                          className="min-h-[150px] bg-gray-700 text-gray-300 p-2 focus:outline-none"
                          as="textarea"
                          name="description"
                          id="description"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-600"
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="w-full flex justify-between font-bold border-b border-gray-600 p-2">
                        <h3 className="w-6/12 text-gray-300">
                          Image uploading
                        </h3>
                      </div>

                      <div className="mb-2 p-2  w-full flex flex-col">
                        <label
                          htmlFor="roomThumbnail"
                          className="text-gray-400"
                        >
                          Thumbnail (<font color="red">500x500</font>)
                        </label>
                        <FileProductSingleUploader name="roomThumbnail" />
                        <ErrorMessage name="roomThumbnail">
                          {(msg) => <div className="text-red-600">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="mb-2 p-2  w-full flex flex-col">
                        <label htmlFor="roomImage" className="text-gray-400">
                          Images (<font color="red">500x500</font>)
                        </label>
                        <FileProductUploader
                          name="roomImage"
                          name2="roomImage2"
                        />
                        <ErrorMessage name="roomImage">
                          {(msg) => <div className="text-red-600">{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                    {/* Hidden button */}
                  </div>

                  <div className="w-full flex justify-end  h-10 items-center ">
                    <AnimatePresence mode="wait">
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button
                          // onClick={(e) => handleSubmit("Save")}
                          type="submit"
                          disabled={isSubmitting}
                          className={`!normal-case !flex !items-center !justify-evenly ${
                            isSubmitting ? "!bg-opacity-15" : ""
                          } !gap-2 !text-green-400 !bg-green-400 !bg-opacity-10 !border !border-green-400 !px-4 !border-opacity-50 text-xs`}
                          sx={{ border: "1px solid #ecd9d92a" }}
                        >
                          <svg
                            className="w-[20px] h-[20px] text-green-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 11.917 9.724 16.5 19 7.5"
                            />
                          </svg>
                          <h5>{isSubmitting ? "Saving..." : "Save"}</h5>
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </Form>
              );
            }}
          </Formik>
        }
      </Flowbite>
    </>
  );
};

export default FormikPost;
