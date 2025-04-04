import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { initializeValue } from "./authForm/initializeComponents.js";
import "react-toastify/dist/ReactToastify.css";
import { Flowbite } from "flowbite-react";
import { toast } from "react-hot-toast";
import MultipleTagsSelect from "../../../components/common/forms/TagsSelect.jsx";
import { useDispatch, useSelector } from "react-redux";
import { POST_hotel } from "../../../../redux/features/store/storeActions.js";
import { ValidationSchema } from "./authForm/FormValidation.js";
import HotelFilesUploader from "./HotelFilesUploader.jsx";
import { amenitiesOptions } from "../../roomPage/components/SelectOptions.js";
import FileSingleUploader from "./FileSingleUploader.jsx";
import TagsSelect from "../../roomPage/components/TagsSelect.jsx";

const FormikPost = () => {
  const dispatch = useDispatch();
  const { hotelRateSelect } = useSelector((state) => state.store);
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await toast.promise(dispatch(POST_hotel({ values })).unwrap(), {
        loading: "Saving...",
        success: "Product saved successfully!",
        error: "Failed to save product.",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Flowbite>
      <Formik
        initialValues={initializeValue}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleBlur, setFieldValue }) => {
          return (
            <Form className="w-full flex flex-col gap-2 border-opacity-60">
              <div className="w-full grid grid-cols-2 gap-2 border-opacity-60">
                {/* Basic Information */}
                <div className="col-span-2">
                  <h3 className="font-bold border-b border-gray-600 p-2 text-gray-300 mb-2">
                    Basic Information
                  </h3>
                  <div className="mb-2 mt-2 p-1 w-full flex flex-col">
                    <label htmlFor="name" className="text-gray-400 flex gap-1">
                      Hotel Name
                    </label>
                    <Field
                      className="h-[35px] bg-gray-700 text-gray-500 focus:text-gray-300 focus:outline-none"
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="mb-2 p-1 w-full flex flex-col">
                    <label
                      htmlFor="location"
                      className="text-gray-400 flex gap-1"
                    >
                      Location
                    </label>
                    <Field
                      className="h-[35px] bg-gray-700 text-gray-500 focus:text-gray-300 focus:outline-none"
                      type="text"
                      name="location"
                      id="location"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="mb-2 p-1 w-full flex flex-col">
                    <label
                      htmlFor="amenties"
                      className="text-gray-400 flex gap-1"
                    >
                      Amenities
                    </label>
                    <MultipleTagsSelect
                      MAX_SELECT={5}
                      defaultData={amenitiesOptions}
                      name="amenties"
                      typeSelect="tags"
                      onBlur={handleBlur}
                      onChange={setFieldValue}
                    />
                  </div>
                  <div className="mb-2 p-1 w-full flex flex-col">
                    <label
                      htmlFor="location"
                      className="text-gray-400 flex gap-1"
                    >
                      Star Rating
                    </label>
                    <TagsSelect
                      MAX_SELECT={5}
                      defaultData={hotelRateSelect}
                      name="starRating"
                      typeSelect="tag"
                      onBlur={handleBlur}
                      onChange={setFieldValue}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="col-span-2">
                  <div className="w-full flex justify-between font-bold border-b border-gray-600 p-2">
                    <h3 className="w-6/12 text-gray-300">
                      Uploading hotel's images
                    </h3>
                  </div>
                  <div className="mb-2 p-2 w-full flex flex-col">
                    <label htmlFor="hotelThumbnail" className="text-gray-400">
                      Upload Hotel's Thumbnail (<font color="red">500x500</font>
                      )
                    </label>
                    <FileSingleUploader name="hotelThumbnail" />
                    <ErrorMessage
                      name="hotelThumbnail"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="mb-2 p-2 w-full flex flex-col">
                    <label htmlFor="hotelImage" className="text-gray-400">
                      Upload Hotel's Image (<font color="red">500x500</font>)
                    </label>
                    <HotelFilesUploader name="hotelImage" name2="hotelImage2" />
                    <ErrorMessage
                      name="hotelImage"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="p-0 col-span-2">
                  <div className="mb-2 p-2 w-full flex flex-col">
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
              </div>
              {/* Submit Button */}
              <div className="mb-2 p-2 w-full flex justify-end  h-10 items-center ">
                <button
                  type="submit"
                  className={`p-3  bg-green-500 w-52 h-10 flex items-center justify-center ${
                    isSubmitting ? "bg-opacity-15" : ""
                  } text-white rounded`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Flowbite>
  );
};

export default FormikPost;
