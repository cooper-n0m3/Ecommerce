import { Modal } from "antd";
import { ExclamationCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const { confirm } = Modal;

export const ConfirmModel = ({
  ActionEvent,
  isActive = true,
  title,
  description,
  icon,
}) => {
  confirm({
    title:
      isActive == null ? (
        <p>
          Do you want to{" "}
          <span className="text-green-600">
            {title ? title : "Do something"}
          </span>{" "}
          this booking?
        </p>
      ) : isActive ? (
        <p>
          Do you want to{" "}
          <span className="text-green-600">
            {title ? title : "Do something"}
          </span>{" "}
          this booking?
        </p>
      ) : (
        <p>
          Do you want to <span className="text-red-600">Check-Out</span> this
          user?
        </p>
      ),
    icon:
      icon ||
      (isActive ? (
        <ExclamationCircleFilled className="text-red-500" />
      ) : (
        <CheckCircleFilled className="text-green-500" />
      )),
    content:
      description ||
      (isActive == null ? (
        <p className="text-gray-500 text-[13px]">
          This change will update the booking status from{" "}
          <span className="text-yellow-400 underline">Pending</span> to{" "}
          <span className="text-green-400 underline">Confirmed</span>.
        </p>
      ) : isActive ? (
        <p className="text-gray-500 text-[13px]">
          This change will mark the room as{" "}
          <span className="text-red-600 underline">Unavailable</span>, and the
          user will be allowed to use it.
        </p>
      ) : (
        <p className="text-gray-500 text-[13px]">
          This change will mark the room as{" "}
          <span className="text-green-400 underline">Available</span> for new
          bookings, and the previous user will no longer have access.
        </p>
      )),
    centered: true,
    wrapClassName: "bg-gray-400/10 backdrop-blur-sm",
    style: { content: "red" },
    onOk() {
      toast.promise(ActionEvent(), {
        loading: "Saving...",
        success: (data) => {
          if (data.payload.data) {
            return data.payload.data.message || "Successfully";
          }
          const res = data?.payload?.response?.data;
          if (!res.success) {
            throw new Error(res.message);
          }
          return res.message || "Succesfully";
        },
        error: (error) => error.message || "Product status change failed",
      });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
