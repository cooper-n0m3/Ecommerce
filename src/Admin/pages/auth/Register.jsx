import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { registerInitialize } from "./initializeAuth.js";
import { RegisterValidation } from "./validationAuth.js";
import { Button } from "@mui/material";
import { Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthRegister } from "../../../redux/features/authAction/authActions.js";
import { useDispatch } from "react-redux";
const Register = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    setShow(!show);
  };
  const handleOnSubmit = async (values, { setErrors }) => {
    const payload = values;
    try {
      await toast.promise(dispatch(AuthRegister({ payload })).unwrap(), {
        loading: <small>saving...</small>,
        success: (data) => {
          return data.message;
        },
        error: (error) => {
          console.log("error", error.errors);
          setErrors({ [error.errors.path]: error.message });
          return error.message || "Something went wrong";
        },
      });
      // Navigate only after successful registration
      navigate("/admin");
    } catch (error) {
      toast.error("Error saving product");
      console.error("Error saving product:", error);
    }
  };
  /* @File Validation */
  const fileValidation = (files, sizeMax) => {
    const maxSize = sizeMax * 1024 * 1024;
    const allowedType = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedType.includes(files.type)) {
      errorMsg =
        "The selected file is not supported. Please upload a valid image file (e.g., .jpg, .png, .jpeg).";
      toast.error(errorMsg);
      return false;
    } else if (files.size > maxSize) {
      toast.error("Image size to larged, Server not allowed");
      return false;
    }
    return true;
  };
  const handleFileChange = (e, setFieldValue) => {
    const files = e.currentTarget.files[0];
    const validateFiles = fileValidation(files, 5);
    if (!validateFiles) {
      setFieldValue("userProfile", null);
    }
    setFieldValue("userProfile", files);
  };
  return (
    <Formik
      initialValues={registerInitialize}
      //   validationSchema={RegisterValidation}
      onSubmit={handleOnSubmit}
    >
      {({ values, isSubmitting, handleSubmit, setFieldValue }) => (
        <Form className="">
          <div className="grid  mt-[20vh] mb-[2.5vh] grid-cols-2 w-[550px] border border-gray-600/80 backdrop-blur-md rounded shadow bg-gray-800 py-5 px-5 ">
            <div className="flex border-b border-gray-600  p-3 flex-col items-center col-span-2">
              <img
                alt="Bonnie image"
                height="96"
                src="https://images.scalebranding.com/9fb1140c-b5f4-4447-bfc5-6148a46d9054.jpg"
                width="96"
                className="mb-3 rounded-full aspect-square shadow-lg"
              />
              <h5 className=" text-xl font-medium text-gray-300 dark:text-white">
                Register
              </h5>
              <span className="text-sm text-green-500 font-bold dark:text-gray-400">
                Admin Dashboard
              </span>
            </div>
            <div className=" p-1 col-span-2 flex flex-col">
              <label htmlFor="email" className="text-gray-500">
                Email
              </label>
              <Field
                className="h-[30px] focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                type="text"
                as="input"
                placeholder = "you@gmail.com"
                autoComplete="off"
                name="email"
                id="email"
              />

              <ErrorMessage name="email">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-1 p-1 relative col-span-2 flex flex-col">
              <label htmlFor="password" className="text-gray-500">
                Password
              </label>
              <Field
                className={`h-[30px] ${
                  show ? "!blur-[3px]" : "!blur-none"
                } focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300`}
                type={show ? "password" : "text"}
                as="input"
                autoComplete="off"
                name="password"
                id="password"
              />
              <ErrorMessage name="password">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
              {values.password !== "" && (
                <>
                  <svg
                    onClick={handleClick}
                    className={`w-6 h-6 ${
                      show ? "hidden" : ""
                    } absolute right-5 top-8 text-gray-400 dark:text-white`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth={2}
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <svg
                    onClick={handleClick}
                    className={`w-6 h-6 absolute ${
                      show ? "" : "hidden"
                    } right-5 top-8 text-gray-400 dark:text-white`}
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
                      d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </>
              )}
            </div>

            <div className="mb-1 p-1 w-full flex flex-col">
              <label htmlFor="name" className="text-gray-500">
                Username
              </label>
              <Field
                className="h-[30px] focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                type="text"
                as="input"
                autoComplete="off"
                name="name"
                id="name"
              />
              <ErrorMessage name="name">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-1 p-1 w-full flex flex-col">
              <label htmlFor="name" className="text-gray-500">
                Secret Key
              </label>
              <Field
                className="h-[30px] focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                type="text"
                as="input"
                autoComplete="off"
                name="secretKey"
                id="secretKey"
              />
              <ErrorMessage name="secretKey">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-1 p-1 col-span-2 w-full flex flex-col">
              <label htmlFor="name" className="text-gray-500">
                Phone-Number
              </label>
              <Field
                className="h-[30px] focus:outline-none border border-gray-500 focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                type="text"
                as="input"
                autoComplete="off"
                name="phone"
                id="phone"
              />
              <ErrorMessage name="phone">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-1 p-1 col-span-2 w-full flex flex-col">
              <label htmlFor="name" className="text-gray-500">
                User-Profile
              </label>
              <input
                className=" focus:outline-none border border-gray-500 focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                type="file"
                as="input"
                autoComplete="off"
                name="userProfile"
                id="userProfile"
                onChange={(e) => handleFileChange(e, setFieldValue)}
              />
              <ErrorMessage name="userProfile">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className=" col-span-2 p-2 w-full flex flex-col">
              <Button
                type="submit"
                className="!bg-green-400  !gap-2 !bg-opacity-50  !normal-case !text-gray-300"
              >
                <Spinner
                  className={isSubmitting ? "" : "hidden"}
                  aria-label="Alternate spinner button example"
                  size="sm"
                />
                <span className="">Register</span>
              </Button>
            </div>
            <div className=" p-2 w-full flex flex-col">
              <Link
                to="/auth/login"
                className="text-[13px] underline float-end text-blue-400"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
