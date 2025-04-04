import { Field, Form, Formik, ErrorMessage } from "formik";
import { initialize } from "./initializeAuth";
import { Button } from "@mui/material";
import { validationAuth } from "./validationAuth";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthLogin } from "../../../redux/features/authAction/authActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingMotion from "../../components/common/loading/LoadingMotion";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state=>state.store)
  const [show, setShow] = useState(false);
  const [isUnAuthorization, setIsUnAuthorization] = useState({
    status: 200,
    msg: null,
  });
  const handleClick = () => {
    setShow(!show);
  };

  const handleOnSubmit = async (values, { setSubmitting }) => {
    const payload = values;
    try {
      await toast.promise(dispatch(AuthLogin({ payload })).unwrap(), {
        loading: <small>saving...</small>,
        success: (data) => {
          const role = sessionStorage.getItem("user-role");
          const userRole = ["Manager", "Superadmin"];
          if (!userRole.includes(role)) {
            throw {
              success: false,
              status: 403,
              statusMessage: "Forbidden",
              message: "User role not allowed",
              error: null,
            };
          }
          navigate("/admin");
          return <span>{data.message}</span>;
        },
        error: (error) => {
          console.log("error", error.errors);
          return <span>{error.message || "Something went wrong"}</span>;
        },
      });
      // Navigate only after successful registration
    } catch (error) {
      console.log(error);

      toast.error(<small>Error saving product</small>);
      console.error("Error saving product:", error);
    }
  };
  const handleCloseError = () => {
    setIsUnAuthorization({
      status: 200,
      msg: null,
    });
  };
  return (
    <Formik
      initialValues={initialize}
      validationSchema={validationAuth}
      onSubmit={handleOnSubmit}
    >
      {({ values, isSubmitting }) => (
        <>
        {isLoading && (
                <LoadingMotion classNames="fixed top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2" />
              )}
        <Form>
          <div className=" flex flex-col w-[400px]  border border-gray-600 rounded shadow bg-gray-800/40 backdrop-blur-sm px-5 py-8">
            <div className="flex p-3 flex-col items-center">
              <img
                alt="Bonnie image"
                height="96"
                src="https://images.scalebranding.com/9fb1140c-b5f4-4447-bfc5-6148a46d9054.jpg"
                width="96"
                className="mb-3 rounded-full aspect-square shadow-lg"
              />
              <h5 className=" text-xl font-medium text-gray-300 dark:text-white">
                Login
              </h5>
              <span className="text-sm text-green-500 font-bold dark:text-gray-400">
                Admin Dashboard
              </span>
            </div>
            <div className="w-full  flex justify-between font-bold border-b border-gray-600">
              {isUnAuthorization.status !== 200 && (
                <div
                  className="w-full border border-gray-400 border-opacity-80 alert-msg-error bg-gradient-to-r opacity-75 from-red-500 to-gray-700 flex justify-around items-center p-2 rounded-lg  text-white"
                  id="error-alert"
                  role="alert"
                >
                  <strong className="text-xl font-bold">
                    {isUnAuthorization.status}
                  </strong>
                  <span>{isUnAuthorization.msg}</span>
                  <button
                    onClick={handleCloseError}
                    type="button"
                    className="ml-4 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 text-gray-300 hover:transition-all focus:outline-none"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div className=" p-1 w-full flex flex-col">
              <label htmlFor="email" className="text-gray-500">
                Email
              </label>
              <Field
                className="h-[40px] focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                type="text"
                placeholder="you@gmail.com"
                as="input"
                autoComplete="off"
                name="email"
                id="email"
              />

              <ErrorMessage name="email">
                {(msg) => <div className="text-red-500">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="p-1 relative w-full flex flex-col">
              <label htmlFor="password" className="text-gray-500">
                Password
              </label>
              <Field
                className={`h-[40px] ${
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
              )}
            </div>
            <div className=" p-1 relative w-full flex flex-col">
              <Button
                type="submit"
                className="!bg-green-400 !rounded !gap-2 !bg-opacity-50  !normal-case !text-gray-300"
              >
                <Spinner
                  className={isSubmitting ? "" : "hidden"}
                  aria-label="Alternate spinner button example"
                  size="sm"
                />
                <span className="">request</span>
              </Button>
            </div>
            <div className=" w-full flex flex-col">
              <Link
                to="/auth/register"
                className="text-[15px] underline float-end text-blue-500"
              >
                Register
              </Link>
            </div>
          </div>
        </Form>
        </>
      )}
    </Formik>
  );
}
