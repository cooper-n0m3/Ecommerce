import { Field, Form, Formik, ErrorMessage } from "formik";
import { initialize } from "./initializeAuth";
import { Button } from "@mui/material";
import { validationAuth } from "./validationAuth";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
class JsonFetchError extends Error {
  constructor(msg, status, data) {
    super(msg);
    this.status = status;
    this.data = data;
  }
}
export function SignIn() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error,setError] = useState(true);
  const [isUnAuthorization,setIsUnAuthorization] = useState({
    status:200,
    msg:null
  });
  const handleClick = () => {
    setShow(!show);
  };

  const handleOnSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const bodyRequest = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest),
      });
      if (!response.ok) {
        const ErrorData = await response.json();
        throw new JsonFetchError(
          "Bad Request",
          response.status,
          JSON.stringify(ErrorData)
        );
      }
      const data = await response.json();
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem('userId',data.user.id)
      navigate("/admin");
    } catch (error) {
      setIsUnAuthorization({
        status:error.status,
        msg:error.message
      });
      if (error instanceof JsonFetchError) {
        console.error(`HTTP Error ${error.status}`, error.data);
      } else {
        console.error("Unexpected error:", error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };
  const handleCloseError=()=>{
    setIsUnAuthorization({
      status:200,
      msg:null
    })
  }
  return (
    <Formik
      initialValues={initialize}
      validationSchema={validationAuth}
      onSubmit={handleOnSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <div className="flex flex-col w-[450px] border border-gray-600 rounded shadow bg-gray-800 p-4">
            <div className="w-full h-[50px] flex justify-between font-bold border-b border-gray-600 p-2">
              <h3 className="w-6/12 text-gray-400 text-2xl">Signin</h3>
              {
               isUnAuthorization.status !== 200 &&
              <div
                className="w-full border border-gray-400 border-opacity-80 alert-msg-error bg-gradient-to-r opacity-75 from-red-500 to-gray-700 flex justify-around items-center p-2 rounded-lg  text-white"
                id="error-alert"
                role="alert"
              >
                <strong className="text-xl font-bold">{isUnAuthorization.status}</strong>
                <span>{isUnAuthorization.msg}</span>
              <button
                onClick={handleCloseError}
                type="button"
                className="ml-4 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 text-gray-300 hover:transition-all focus:outline-none"
                aria-label="Close"
              >
                  ✕
              </button>
              </div>}
            </div>
            <div className="mb-2 p-2 w-full flex flex-col">
              <label htmlFor="email" className="text-gray-500">
                Email
              </label>
              <Field
                className="h-[35px] focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                type="text"
                as="input"
                autoComplete="off"
                name="email"
                id="email"
              />

              <ErrorMessage name="email">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="mb-2 p-2 relative w-full flex flex-col">
              <label htmlFor="password" className="text-gray-500">
                Password
              </label>
              <Field
                className={`h-[35px] ${show ? "!blur-[3px]" : "!blur-none"} focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300`}
                type={show ? "password" : "text"}
                as="input"
                autoComplete="off"
                name="password"
                id="password"
              />
              <ErrorMessage name="password">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
                 {
                  values.password!=='' &&
                    <>
                       <svg
                    onClick={handleClick}
                    className={`w-6 h-6 ${
                      show ? "hidden" : ""
                    } absolute right-5 top-9 text-gray-400 dark:text-white`}
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
                    } right-5 top-9 text-gray-400 dark:text-white`}
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
                 }
            </div>
            <div className="mb-2 p-2 w-full flex flex-col">
              <Button
                type="submit"
                className="!bg-green-400  !gap-2 !bg-opacity-50  !rounded-none !normal-case !text-gray-300"
              >
                <Spinner
                  className={isSubmitting ? "" : "hidden"}
                  aria-label="Alternate spinner button example"
                  size="sm"
                />
                <span className="">request</span>
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
