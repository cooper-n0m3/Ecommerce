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
import FileSingleUploader from "./FileSingleUploader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { postCategory, postProduct } from "../../../../redux/features/products/productActions.js";
import { ValidationSchema } from "./authForm/FormValidation.js";

const FormikPost = () => {
  const [completedStep, setCompletedStep] = useState(-1);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    toast.promise(dispatch(postCategory({ values })).unwrap(), {
      loading: "Saving...",
      success: "Product saved successfully!",
      error: "Failed to save product.",
    });
  };
  return (
    <>
      <Flowbite>
        <Formik
          initialValues={initializeValue}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, values, handleBlur, setFieldValue }) => {
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
              setFieldValue(
                "discountPrice",
                values.price && values.discount
                  ? (
                      values.price -
                      values.price * (values.discount / 100)
                    ).toFixed(2)
                  : values.price
                  ? values.price
                  : ""
              );
              setCompletedStep(completed);
            }, [values]);
            return (
              <Form
                method="POST"
                className="w-full flex-col flex gap-2 border-opacity-60"
              >
                <div className="w-full border-b pb-3 border-gray-500">
                  <StepperCompleted completed={completedStep} />
                </div>
                <div className="w-full grid grid-cols-2 gap-2 border-opacity-60">
                  <div className="col-span-2">
                    <h3 className="font-bold border-b border-gray-600 p-2 text-gray-300 mb-2">
                      Basic Information
                    </h3>
                    <div className="mb-2 mt-2 p-1 w-full flex flex-col">
                      <label
                        htmlFor="productName"
                        className="text-gray-400 flex gap-1"
                      >
                        Category Name
                      </label>
                      <Field
                        className="h-[35px]   focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                        type="text"
                        as="input"
                        name="categoryName"
                        id="categoryName"
                        autoComplete="off"
                      />
                      <ErrorMessage name="categoryName">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="mb-2 p-1 w-full flex flex-col">
                      <label className="text-gray-400 flex gap-1">
                        Slug(<p className="text-gray-500">ex: mobile-phone, iphone13-promax</p>)
                      </label>
                      <Field
                        className="h-[35px]   focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                        type="text"
                        as="input"
                        name="Slug"
                        id="Slug"
                        autoComplete="off"
                      />
                      <ErrorMessage name="Slug">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="w-full flex justify-between font-bold border-b border-gray-600 p-2">
                      <h3 className="w-6/12 text-gray-300">
                        Category images Uploading
                      </h3>
                    </div>
                    <div className="mb-2 p-2  w-full flex flex-col">
                      <label htmlFor="tage" className="text-gray-400">
                        Upload Category Thumbnail (
                        <font color="red">500x500</font>)
                      </label>
                      <FileSingleUploader name="CategoryThumbnail" />
                      <ErrorMessage name="CategoryThumbnail">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className=" p-0 col-span-2">
                    <div className="mb-2 p-2  w-full flex flex-col">
                      <label
                        htmlFor="productDescriptions"
                        className="text-gray-400"
                      >
                        Description
                      </label>
                      <Field
                        className="min-h-[150px] focus:outline-none focus:border-none bg-gray-700 text-gray-300  p-2"
                        type="text"
                        as="textarea"
                        name="Description"
                        id="Description"
                      />
                      <ErrorMessage name="Description">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                  {/* Hidden button */}
                  <div className="mb-2 p-2 w-full hidden">
                    <button type="submit" className="p-3 Save bg-gray-400 ">
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Flowbite>
    </>
  );
};
export default FormikPost;
