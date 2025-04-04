import { Flex } from "antd";
import { MegaMenu, Navbar } from "flowbite-react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space, Dropdown } from "antd";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import StylishDropdown from "./SelectStyle";

const LayoutHeader = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const urlPath = useLocation();
  

  const tabs = [
    { name: "Home", path: "/", content: "Find your perfect stay" },
    { name: "Hotels", path: "/hotels", content: "Browse hotels & resorts" },
    {
      name: "My Bookings",
      path: "/my-bookings",
      content: "Manage your reservations",
    },
    {
      name: "Destinations",
      path: "/destinations",
      content: "Popular travel locations",
    },
    { name: "Contact", path: "/contact", content: "24/7 customer support" },
  ];

  return (
    <MegaMenu className="fixed z-40 p-0 text-gray-100 bg-gray-600/20 backdrop-blur-sm flex justify-center w-screen">
      <div className="h-[65px] grid grid-cols-10 px-5 w-[100vw] bg-inherit items-center justify-between md:space-x-8">
        {/* Logo/Brand - Same as original */}
        <Link 
        to=''
        className="col-span-3 flex justify-start hover:text-inherit pl-10">
          <span className="self-center hover:text-green-400 whitespace-nowrap text-xl font-semibold dark:text-white">
            shopee
          </span>
        </Link>

        {/* Improved Menu Navigation */}
        <div className="col-span-4 select-none flex items-center justify-center">
          <nav className="flex space-x-1  p-1 bg-inherit">
            {tabs.map((tab,index) => (
              <Link
                key={`${tab.name}-${index}`}
                to={tab.path}
                onClick={() => setActiveTab(tab.name)}
                className={`relative ${
                  urlPath.pathname === tab.path
                    ? "hover:text-white"
                    : " hover:text-white/50"
                }  px-4 py-2 text-[13px] rounded-lg text-white font-medium transition-colors`}
              >
                {urlPath.pathname === tab.path && (
                  <motion.button
                  layoutId={`active-Tab`}
                    className="absolute  inset-0 bg-gradient-to-r  from-gray-900 to-black rounded-md"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        {/* User Actions - Same as original */}
        <Flex
          gap="small"
          align="end"
          vertical
          className="order-2 col-span-3 flex  items-center md:flex"
        >
          <Flex gap="small" align="end" wrap>
            <Space size={24}>
              <>
                <svg
                  className="w-6 h-6  text-gray-200 dark:text-white"
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
                <StylishDropdown/>
              </>
              <LoginButton
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              <UserAvatar isLoggedIn={isLoggedIn} />
            </Space>
          </Flex>
        </Flex>
      </div>
    </MegaMenu>
  );
};

const LoginButton = ({ isLoggedIn, setIsLoggedIn }) => (
  <motion.div
    className="px-4 select-none h-9 text-xs w-24 rounded-full flex justify-center items-center cursor-pointer py-2  bg-gray-900 text-white hover:bg-gray-950"
    // whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => !isLoggedIn && setIsLoggedIn(true)}
  >
    {isLoggedIn ? "Account" : "Login"}
  </motion.div>
);

const UserAvatar = ({ isLoggedIn }) => (
  <Dropdown
    menu={{
      items: isLoggedIn
        ? [
            { key: "profile", label: "Profile" },
            { key: "orders", label: "My Orders" },
            { key: "wishlist", label: "Wishlist" },
            { type: "divider" },
            { key: "logout", label: "Logout" },
          ]
        : [
            { key: "login", label: "Login" },
            { key: "register", label: "Register" },
          ],
    }}
    trigger={["click"]}
  >
    <Badge dot={isLoggedIn} className="cursor-pointer">
      <motion.div whileTap={{ scale: 0.95 }}>
        <Avatar shape="circle" icon={<UserOutlined />} />
      </motion.div>
    </Badge>
  </Dropdown>
);

export default LayoutHeader;
