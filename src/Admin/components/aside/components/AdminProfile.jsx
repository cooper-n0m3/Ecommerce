import React, { useEffect, useState } from "react";
import { Card, Dropdown } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const logout_url = import.meta.env.VITE_API_LOGOUT;
const AdminProfile = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
      setUser({
        userName: sessionStorage.getItem("user-name"),
        userRole: sessionStorage.getItem("user-role"),
        userAvatar: sessionStorage.getItem("user-avatar"),
        userStatus: sessionStorage.getItem("user-status"),
      });
    }, []);
  const navigate = useNavigate();
  const handleLogout =async()=>{
    try {
      await axios.post(logout_url, {}, { withCredentials: true });

      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('user-name');
      sessionStorage.removeItem('user-role');
      sessionStorage.removeItem('user-avatar');
      sessionStorage.removeItem('user-status');
      navigate('/auth/login')
    } catch (error) {
      console.error('Logout Failed:',error);
    }
  }
  return (
    <Card className="w-full border-none shadow-none bg-inherit">
      <div className="flex justify-end px-4 pt-4 text-gray-300">
        <Dropdown inline label=""  >
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Export Data
            </a>
          </Dropdown.Item>
          <Dropdown.Item 
              onClick={handleLogout}>
            <a
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Logout
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center">
        <img
          alt="Bonnie image"
          height="96"
          src="https://images.scalebranding.com/9fb1140c-b5f4-4447-bfc5-6148a46d9054.jpg"
          width="96"
          className="mb-3 rounded-full aspect-square shadow-lg"
        />
        <h5 className=" text-xl font-medium text-gray-300 dark:text-white">
          Bookie Booking
        </h5>
          <p className="font-bold text-green-400">{user?.userRole}</p>
      </div>
    </Card>
  );
};
export default AdminProfile;
