import React from "react";
import { StarOutlined } from "@ant-design/icons";
import { Upload } from "antd";
const GET_RoomUrl = import.meta.env.VITE_API_GET_URL;

const DisplayImage = ({ serverUrl = "", url = "", data = [] }) => {
  const props = {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    defaultFileList: data.map((item) => ({
      uid: item.id.toString(), // Ensure uid is a string
      name: item.images,
      size: 1234567, // You might want to replace this with the actual file size
      status: "done",
      response: "Server Error 500", // Custom error message
      url: GET_RoomUrl + item.images, // Generate the correct URL
    })),
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: false,
    },
  };
  return <Upload {...props} className="text-gray-300"></Upload>;
};
export default DisplayImage;
