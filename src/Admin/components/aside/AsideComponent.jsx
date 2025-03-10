import React, { useState } from "react";
import CustomizedList from "../sidebar/SidebarComponent";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import AdminProfile from "./components/AdminProfile";
import { motion } from "motion/react";

const AsideComponent = () => {
  const location = useLocation().pathname;
  const [dashboardBlog, setDashboardBlog] = useState([
    {
      id: 1,
      title: "Overviews",
      sub: [
        {
          title: "Dashboard",
          to: "/admin/dashboard",
        },
        {
          title: "Analytics",
          to: "/admin/product-analysis/sale",
        },
      ],
      svg: (
        <svg
          className="w-5 h-5 text-gray-400 transition duration-75"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
      ),
      action: false,
    },
  ]);
  const [orderBlog, setOrderBlog] = useState([
    {
      id: 1,
      title: "Order",
      sub: [
        {
          title: "Order List",
          to: "/admin/list-order",
        },
      ],
      svg: (
        <svg
          className="w-6 h-6 text-gray-400 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Zm5-7a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm0 2a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H8Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      action: false,
    },
  ]);
  const [product, setProductBlog] = useState([
    {
      id: 1,
      title: "Management",
      sub: [
        {
          title: "Add-Product",
          to: "/admin/post-product",
        },
        {
          title: "View-Product",
          to: "/admin/view-product",
        },
        {
          title: "Draft-Product",
          to: "/admin/draft",
        },
      ],
      svg: (
        <svg
          className="w-6 h-6 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
          />
          <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
        </svg>
      ),
      action: false,
    },
  ]);
  const [category, setCategory] = useState([
    {
      id: 1,
      title: "Category",
      sub: [
        {
          title: "Add-Category",
          to: "/admin/add-category",
        },
        {
          title: "View-Category",
          to: "/admin/view-category",
        },
      ],
      svg: (
        <svg
          className="w-6 h-6 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      action: false,
    },
  ]);
  const handleEvent = (id, Data, setState) => {
    const updatedMenu = Data?.map((item) =>
      item.id === id ? { ...item, action: !item.action } : item
    );
    setState(updatedMenu);
  };
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed  Hide-Scrollbar px-2 bg-gray-900 top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 border-opacity-55 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="w-full flex flex-col  items-center justify-center  mb-4 border-opacity-45">
          <AdminProfile />
        </div>
        <div className="h-full z-0 px-1 pb-4  Hide-Scrollbar bg-gray-900 dark:bg-gray-900">
          <p className="text-gray-400">Dashboard</p>
          <ul className="space-y-2 p-2 font-medium border-l border-gray-400">
            {dashboardBlog.map((component, index) => (
              /* [Check exist menu or just button] */
              <li key={index}>
                <button
                  onClick={(e) =>
                    handleEvent(component.id, dashboardBlog, setDashboardBlog)
                  }
                  className="flex w-full h-[40px] border border-gray-700 rounded relative items-center justify-start p-2   group"
                >
                  {component.svg}
                  <span className="ms-3 whitespace-nowrap text-gray-300">
                    {component.title}
                  </span>
                  {!component.action && (
                    <svg
                      className="w-[27px] h-[27px] absolute right-5 text-gray-400 dark:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m10 16 4-4-4-4"
                      />
                    </svg>
                  )}
                  {component.action && (
                    <svg
                      className="w-[27px] h-[27px] absolute right-5 text-gray-300 dark:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m8 10 4 4 4-4"
                      ></path>
                    </svg>
                  )}
                </button>
                {component.action && component.sub && (
                  <ul className="bg-gray-800  !p-2 border border-gray-600 !border-opacity-55 rounded mt-2 space-y-2 px-0.5">
                    {component.sub.map((item, indexSub) => (
                      <motion.li
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`h-7 ${
                          location === item.to
                            ? "!border  !border-gray-600 border-opacity-50 rounded"
                            : ""
                        }`}
                        key={indexSub}
                      >
                        <Button
                          component={Link}
                          to={item.to}
                          focusRipple
                          className={`custom-class h-full !bg-gray-900 w-full !font-thin !normal-case !my-0 !text-gray-300`}
                        >
                          {item.title}
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <p className="text-gray-400">Order</p>
          <ul className="space-y-2 p-2 font-medium border-l border-gray-400">
            {orderBlog.map((component, index) => (
              /* [Check exist menu or just button] */
              <li key={index}>
                <button
                  onClick={(e) =>
                    handleEvent(component.id, orderBlog, setOrderBlog)
                  }
                  className="flex w-full h-[40px] border border-gray-700 relative items-center justify-start p-2  rounded-lg  group"
                >
                  {component.svg}
                  <span className="ms-3 whitespace-nowrap text-gray-300">
                    {component.title}
                  </span>
                  {!component.action && (
                    <svg
                      className="w-[27px] h-[27px] absolute right-5 text-gray-400 dark:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m10 16 4-4-4-4"
                      />
                    </svg>
                  )}
                  {component.action && (
                    <svg
                      className="w-[27px] h-[27px] absolute right-5 text-gray-300 dark:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m8 10 4 4 4-4"
                      ></path>
                    </svg>
                  )}
                </button>
                {component.action && component.sub && (
                  <ul className="bg-gray-800 !p-2 border-t border-gray-600 !border-opacity-55 rounded mt-2 space-y-2 px-0.5">
                    {component.sub.map((item, indexSub) => (
                      <motion.li
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        key={indexSub}
                        className={`h-7 ${
                          location === item.to
                            ? "!border  !border-gray-600 border-opacity-50 rounded"
                            : ""
                        }`}
                      >
                        <Button
                          component={Link}
                          to={item.to}
                          focusRipple
                          className={`custom-class h-full !bg-gray-900 w-full !font-thin !normal-case !my-0 !text-gray-300`}
                        >
                          {item.title}
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <p className="text-gray-400">Product</p>
          <ul className="space-y-2 p-2 font-medium border-l border-gray-400">
            {product.map((component, index) => (
              /* [Check exist menu or just button] */
              <li key={index}>
                <button
                  onClick={(e) =>
                    handleEvent(component.id, product, setProductBlog)
                  }
                  className="flex w-full h-[40px] border border-gray-700 relative items-center justify-start p-2  rounded-lg  group"
                >
                  {component.svg}
                  <span className="ms-3 whitespace-nowrap text-gray-300">
                    {component.title}
                  </span>
                  {!component.action && (
                    <svg
                      className="w-[27px] h-[27px] absolute right-5 text-gray-400 dark:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m10 16 4-4-4-4"
                      />
                    </svg>
                  )}
                  {component.action && (
                    <svg
                      className="w-[27px] h-[27px] absolute right-5 text-gray-300 dark:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m8 10 4 4 4-4"
                      ></path>
                    </svg>
                  )}
                </button>
                {component.action && component.sub && (
                  <ul className="bg-gray-800 !p-2 border-t border-gray-600 !border-opacity-55 rounded mt-2 space-y-2 px-0.5">
                    {component.sub.map((item, indexSub) => (
                      <motion.li
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={indexSub}
                        className={`h-7 ${
                          location === item.to
                            ? "!border  !border-gray-600 border-opacity-50 rounded"
                            : ""
                        }`}
                      >
                        <Button
                          component={Link}
                          to={item.to}
                          focusRipple
                          className={`custom-class h-full !bg-gray-900 w-full !font-thin !normal-case !my-0 !text-gray-300`}
                        >
                          {item.title}
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <p className="text-gray-400">Category</p>
          <ul className="space-y-2 p-2 font-medium border-l border-gray-400">
            {category.map((component, index) => (
              /* [Check exist menu or just button] */
              <li key={index}>
                <button
                  onClick={(e) =>
                    handleEvent(component.id, category, setCategory)
                  }
                  className="flex w-full h-[40px] border border-gray-700 relative items-center justify-start p-2  rounded-lg  group"
                >
                  {component.svg}
                  <span className="ms-3 whitespace-nowrap text-gray-300">
                    {component.title}
                  </span>
                  {!component.action && (
                    <svg
                      className="w-[27px] h-[27px] absolute right-5 text-gray-400 dark:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m10 16 4-4-4-4"
                      />
                    </svg>
                  )}
                  {component.action && (
                    <svg
                      className="w-[27px] h-[27px] absolute right-5 text-gray-300 dark:text-gray-900"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m8 10 4 4 4-4"
                      ></path>
                    </svg>
                  )}
                </button>
                {component.action && component.sub && (
                  <ul className="bg-gray-800 !p-2 border-t border-gray-600 !border-opacity-55 rounded mt-2 space-y-2 px-0.5">
                    {component.sub.map((item, indexSub) => (
                      <motion.li
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={indexSub}
                        className={`h-7 ${
                          location === item.to
                            ? "!border  !border-gray-600 border-opacity-50 rounded"
                            : ""
                        }`}
                      >
                        <Button
                          component={Link}
                          to={item.to}
                          focusRipple
                          className={`custom-class h-full !bg-gray-900 w-full !font-thin !normal-case !my-0 !text-gray-300`}
                        >
                          {item.title}
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AsideComponent;
