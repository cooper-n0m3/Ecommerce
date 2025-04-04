import React, { useEffect, useState } from "react";
import { Avatar, Badge, Button, Dropdown, Space, Switch } from "antd";
const uploadFolder_url = import.meta.env.VITE_API_GET_URL;
const NavbarComponent = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser({
      userName: sessionStorage.getItem("user-name"),
      userRole: sessionStorage.getItem("user-role"),
      userAvatar: sessionStorage.getItem("user-avatar"),
      userStatus: sessionStorage.getItem("user-status"),
    });
  }, []);

  return (
    <>
      <nav className="bg-gray-600/20 border-b border-gray-600 border-opacity-50 backdrop-blur-sm fixed top-0 px-2 z-50 w-full    ">
        {/* Header Container */}
        <div className="max-w-screen-xl h-[10vh] flex flex-wrap items-center justify-end mx-auto p-4">
          {/* Brand Container */}

          {/* End Brand Container */}

          {/* Avatar container */}
          <div className="flex  items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Space direction="vertical">
              <Space size="middle" className="">
                <Badge color="green" dot={user.userStatus} className="">
                  <Avatar
                    shape="circle"
                    src={uploadFolder_url + user.userAvatar}
                    size="default"
                  />
                </Badge>
                <span className="self-center text-xs font-semibold whitespace-nowrap text-white">
                  {user?.userName}
                </span>
              </Space>
            </Space>
          </div>
          {/* End Avatar container */}
        </div>
        
        {/*End Header Container */}
      </nav>
    </>
  );
};

export default NavbarComponent;
