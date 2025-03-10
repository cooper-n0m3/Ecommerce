import React from "react";
import { Card, Dropdown } from "flowbite-react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const AdminProfile = () => {
  return (
    <Card className="w-full bg-gray-800 border mb-3 border-gray-500 border-opacity-55">
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
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
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center">
        <img
          alt="Bonnie image"
          height="96"
          src="https://m.media-amazon.com/images/M/MV5BZmE3NmQyMjYtYjlhNC00NmMyLWI2MTktOTQ3MzFlNzIxMzZjXkEyXkFqcGc@._V1_.jpg"
          width="96"
          className="mb-3 rounded-full aspect-square shadow-lg"
        />
        <h5 className=" text-xl font-medium text-gray-300 dark:text-white">
          Bonnie Green
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Visual Designer
        </span>
      </div>
    </Card>
  );
};

export default AdminProfile;
