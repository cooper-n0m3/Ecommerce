import { Button, Flex } from "antd";
import { DarkThemeToggle, MegaMenu, Navbar } from "flowbite-react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
import React from "react";
import { Input } from "@mui/material";
import * as motion from "motion/react-client";
const LayoutHeader = () => {
  return (
    <>
      <MegaMenu className="fixed z-40 p-0 text-gray-100 bg-opacity-30 flex justify-center  w-full">
        <div className="h-[50px]  inset-0 w-[100vw] bg-inherit  flex max-w-screen-xl flex-wrap items-center justify-between  md:space-x-8">
          <Navbar.Brand href="/">
            <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              shopee
            </span>
          </Navbar.Brand>
          <Flex
            gap="small"
            vertical
            className="order-2 hidden items-center md:flex"
          >
            <Flex gap="small" align="center" wrap>
              <Space size={24}>
                <>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
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
                      strokeWidth={2}
                      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
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
                </>

                <motion.div
                  className="px-4 h-9 drop-shadow-lg text-xs w-24 rounded-full flex justify-center items-center cursor-pointer py-2  bg-gray-900 text-white hover:bg-gray-950"
                  // whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.div>
                <Badge dot>
                  <Avatar shape="circle" icon={<UserOutlined />} />
                </Badge>
              </Space>
            </Flex>
          </Flex>
          <Navbar.Toggle />
          <Navbar.Collapse className="">
            <Navbar.Link className="text-gray-900" href="#">Home</Navbar.Link>
            <Navbar.Link className="text-gray-900" href="#">Booking</Navbar.Link>
            <Navbar.Link className="text-gray-900" href="#">My Booking</Navbar.Link>
            {/* <Navbar.Link>
              <MegaMenu.Dropdown
                className="z-50 p-0 backdrop-blur-xl bg-gray-800 text-gray-100 border-none"
                toggle={<span className="focus:outline-none p-0 text-gray-100">My Bookings</span>}
              >
                <ul className=" border-none top-0 left-0 right-0 w-full grid grid-cols-3 z-50 min-h-[20vh] ">
                  <div className="space-y-4 p-4 text-gray-600">
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Support Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Terms
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Blog
                      </a>
                    </li>
                  </div>

                  <div className=" space-y-4 p-4 text-gray-200">
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Newsletter
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        Playground
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-primary-600 dark:hover:text-primary-500"
                      >
                        License
                      </a>
                    </li>
                  </div>
                </ul>
              </MegaMenu.Dropdown>
            </Navbar.Link> */}
            <Navbar.Link className="text-gray-900" href="#">Customer Support</Navbar.Link>
          </Navbar.Collapse>
        </div>
      </MegaMenu>
    </>
  );
};

export default LayoutHeader;
