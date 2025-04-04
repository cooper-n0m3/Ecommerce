import React, { useEffect, useState } from "react";
import numeral from "numeral";
import { AnimatePresence, motion } from "motion/react";
import { sortOrder } from "../../../../redux/features/ecommerceTracking/OrderListTable.js";
import { Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { FormatDate } from "../../../components/common/services/FormateDate.js";
import { Button } from "@mui/material";
import { Empty, Button as AntButton, Tooltip } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import PagePagination from "../../../components/common/pagination/Pagination.jsx";
import BoxOrder from "../../../components/common/Overview/BoxOrder.jsx";
import { ConfirmModel } from "../../../components/common/confirmModel/ConfirmModel.jsx";
import {
  PATCH_changeRoomStatus,
  PUT_CheckOutUser,
} from "../../../../redux/features/store/storeActions.js";
import Message from "./Message.jsx";
import canChangeStatusToCheckedOut from "../../../components/common/services/FindCheckedOutDate.js";
import { isCancelledBooking } from "../../../components/common/services/IsCancelledBooking.js";
import { IsAllowed } from "../../../components/common/services/AllowedChangeStatus.js";
const uploadFolder_url = import.meta.env.VITE_API_GET_URL;
const BookingTableList = () => {
  const { allBooking, currentPage, itemsPerPage } = useSelector(
    (state) => state.store
  );
  const [userRole, setUserRole] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const locationRouter = useLocation().pathname;
  const dispatch = useDispatch();

  /* Calculate-page */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const bookingDisplay =
    bookings.slice(indexOfFirstItem, indexOfLastItem) || [];
  const { status } = useParams(); // Extract 'status' from the URL

  const handleSearch = () => {
    setIsSearch((item) => !item);
  };
  const storeUserRole = sessionStorage.getItem("user-role");

  /* new */
  useEffect(() => {
    if (storeUserRole) {
      setUserRole(storeUserRole);
    }
    if (search === "") {
      if (status == "confirmed") {
        setBookings(
          allBooking.filter((item) => item.bookingStatus == "Confirmed")
        );
      } else if (status === "pending") {
        setBookings(
          allBooking.filter((item) => item.bookingStatus == "Pending")
        );
      } else if (status === "expired") {
        setBookings(
          allBooking.filter((item) => item.bookingStatus == "Expired")
        );
      } else if (status === "cancelled") {
        setBookings(
          allBooking.filter((item) => item.bookingStatus == "Canceled")
        );
      } else {
        setBookings(allBooking); // Default case when  status is neither 'fulfilled' nor 'unfulfilled'
      }
    } else {
      if (status === "confirmed") {
        setBookings(
          allBooking?.filter((item) => Number(item.id) === Number(search))
        );
      } else {
        setBookings(
          allBooking?.filter(
            (item) =>
              Number(item.id) === Number(search) && item.status == status
          )
        );
      }
    }
  }, [status, dispatch, allBooking, search]);


  const { totalBooking, success, pending, cancelled } = useSelector(
    (state) => state?.store
  );
  return (
    <>
      <span className="m-2 text-gray-400 text-[14px]">Booking's Summary</span>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="dashboard-blog-card   h-24 border border-blue-500/30 border-opacity-50 flex  px-4 py-4 items-center gap-3 justify-center mb-4 rounded-lg bg-gradient-to-r from-gray-800 to-slate-900"
      >
        <BoxOrder
          title1="Total"
          title2="Paid"
          title3="Pending"
          title4="Cancel"
          label="Booking"
          defaultValue={{
            value1: totalBooking,
            value2: success,
            value3: pending,
            value4: cancelled,
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="dashboard-blog-card   h-24 border border-blue-500/30 border-opacity-50 flex  px-4 py-4 items-center gap-3 justify-center mb-4 rounded-lg bg-gradient-to-r from-gray-800 to-slate-900"
      >
        <Message />
      </motion.div>
      <span className="m-2 text-gray-400 text-[13px]">
        Sorting Booking Status
      </span>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="border border-gray-500 flex px-1 py-[3px] items-center gap-3 justify-evenly mb-4 rounded-lg bg-gradient-to-r from-gray-800 to-slate-900"
      >
        {/* sort bar */}
        <div className="sort-group w-1/2 flex gap-1 justify-start h-full items-center">
          {sortOrder.map((item, index) => (
            <Button
              LinkComponent={Link}
              to={item.url}
              key={index}
              className={`!p-1 !normal-case !px-5 ${
                locationRouter === item.url ? "!bg-gray-700" : ""
              } !rounded !text-gray-300 !text-xs`}
              sx={{
                border: `${
                  locationRouter === item.url ? "1px solid gray" : ""
                }`,
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
        {/* Search-Bar */}
        <div className="filter-group w-1/2 flex gap-1 justify-end h-full items-center">
          {isSearch && (
            <>
              <AnimatePresence initial={false}>
                <motion.input
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  key="box"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder=""
                  className="h-[25px] w-40 rounded focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                />
              </AnimatePresence>
              <Tooltip
                className="!rounded bg-gray-600"
                title="Close"
                onClick={handleSearch}
              >
                <Button>
                  <svg
                    className="!w-[17px] !h-[17px] text-gray-200 dark:text-white"
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
                      d="M6 18 17.94 6M18 18 6.06 6"
                    />
                  </svg>
                </Button>
              </Tooltip>
            </>
          )}
          {!isSearch && (
            <Tooltip className="text-gray-500 " title="search">
              <Button
                className="!rounded bg-gray-600"
                onClick={handleSearch}
                // sx={{ border: "1px solid gray" }}
              >
                <svg
                  className="!w-[17px] !h-[17px] text-gray-200 dark:text-white"
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
              </Button>
            </Tooltip>
          )}
        </div>
        <PagePagination bookings={bookings} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="border  min-h-[60vh] flex-col  border-gray-500 flex px-4 py-4 items-center gap-3 justify-start mb-4 rounded-lg bg-gray-800"
      >
        {/* Table over here!! */}
        {bookingDisplay?.length !== 0 && (
          <table className="w-full   text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-500 bg-gray-800">
              <tr className="text-center text-[13px]">
                <th scope="col" className="px-5 py-3 uppercase">
                  Booking's ID
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  User
                </th>
                <th scope="col" className="px-5 py-3 uppercase">
                  Room's number
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  ROOM
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Check-in Date
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Check-out Date
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                  Approve Status
                </th>
              </tr>
            </thead>

            <tbody className="">
              {bookingDisplay?.map((item, index) => (
                <tr
                  key={index}
                  className="divide-y hover:bg-gray-700/10 h-[50px] items-center text-center align-middle text-xs divide-gray-500 text-gray-300 "
                >
                  <td
                    scope="row"
                    className="px-6 truncate py-4 font-medium whitespace-nowrap dark:text-gray-500"
                  >
                    #{item.id}
                  </td>
                  <td className="px-6 py-3 truncate">
                    <div className="max-w-24 min-w-16 pr-2 truncate flex bg-gray-600 justify-start rounded-full p-[1px]  items-center gap-2">
                      <img
                        className="h-[25px] aspect-square rounded-full border border-gray-400 object-cover bg-no-repeat bg-cover"
                        src={uploadFolder_url + item?.user?.userAvatar}
                        alt=""
                      />
                      {item?.user?.name}
                    </div>
                  </td>
                  <td className="px-6 py-3 truncate">{item?.room?.id}</td>
                  <td className="px-6 py-3 truncate">
                    {item?.room?.status == "available" && (
                      <button
                        className={`px-2 border border-green-400 text-green-400 rounded`}
                      >
                        *{item.room?.status}
                      </button>
                    )}
                    {item?.room?.status == "occupied" && (
                      <button
                        className={`px-2 border border-yellow-400 text-yellow-400 rounded`}
                      >
                        *{item?.room?.status}
                      </button>
                    )}
                    {item?.room?.status == "maintenance" && (
                      <button
                        className={`px-2 border border-red-500 text-red-500 rounded`}
                      >
                        *{item?.room?.status}
                      </button>
                    )}
                    {item?.room?.status == "closed" && (
                      <button
                        className={`px-2 border border-red-600 text-red-600 rounded`}
                      >
                        *{item?.room?.status}
                      </button>
                    )}
                    {item?.room?.status == "booked" && (
                      <button
                        className={`px-2 border border-blue-600 text-blue-600 rounded`}
                      >
                        *{item?.room?.status}
                      </button>
                    )}
                    {item?.room?.status == "pending" && (
                      <button
                        className={`px-2 border border-yellow-300 text-yellow-300 rounded`}
                      >
                        *{item?.room?.status}
                      </button>
                    )}
                    {item?.room?.status == "checked-in" && (
                      <button
                        className={`px-2 border border-green-400 text-green-400 rounded`}
                      >
                        *{item?.room?.status}
                      </button>
                    )}
                    {item?.room?.status == "checked-out" && (
                      <button
                        className={`px-2 border border-red-600 text-red-600 rounded`}
                      >
                        *{item?.room?.status}
                      </button>
                    )}
                    {item?.room?.status == "no-show" && (
                      <button
                        className={`px-2 border border-red-600 text-red-600 rounded`}
                      >
                        *{item?.room?.status}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-3 truncate">
                    ${numeral(item.totalPrice).format("0.0a")}
                  </td>
                  <td className="px-6 py-3 truncate">
                    {FormatDate(item.checkInDate)}
                  </td>
                  <td className="px-6 py-3 truncate">
                    {FormatDate(item.checkOutDate)}
                  </td>
                  <td className="px-6 py-3  truncate">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`px-2 uppercase border ${
                        item.bookingStatus == "Confirmed"
                          ? "border-white text-white"
                          : item.bookingStatus == "Checked-in"
                          ? "border-green-400 text-green-400"
                          : item.bookingStatus == "Pending"
                          ? "border-yellow-300 text-yellow-300"
                          : item.bookingStatus == "Expired"
                          ? "border-red-500 text-red-500"
                          : "border-red-500 text-red-500"
                      } rounded`}
                    >
                      *{item.bookingStatus}
                    </motion.button>
                  </td>
                  {
                    /* @Source for Supper admin */
                    userRole === "Superadmin" && (
                      <td className="px-6 py-4 gap-1  truncate">
                        <div className="flex justify-center ">
                          <Dropdown
                            className="!bg-gray-500/40 !border-none !w-[11vw] !backdrop-blur-sm"
                            inline
                            label=""
                          >
                            <div className="flex  justify-center flex-col">
                              {IsAllowed({
                                checkInDate: item.checkInDate,
                                checkOutDate: item.checkOutDate,
                                currentStatus: item.bookingStatus,
                                newStatus: "Checked-in",
                              }) && (
                                <Button
                                  onClick={() =>
                                    ConfirmModel({
                                      ActionEvent: () =>
                                        dispatch(
                                          PUT_CheckOutUser({
                                            bookingId: item.id,
                                            bookingStatus: "Checked-in",
                                          })
                                        ),
                                      title: "Pending",
                                      description:
                                        "Do you want to set this booking to pending?",
                                    })
                                  }
                                  className="!w-full !h-[32px] !font-medium gap-2 !normal-case !text-gray-400"
                                >
                                  <svg
                                    className="w-5 h-5 text-green-400 "
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
                                      d="M5 11.917 9.724 16.5 19 7.5"
                                    />
                                  </svg>
                                  Check-in
                                </Button>
                              )}
                               {/* If admin want to checks-out bookings */}
                              {IsAllowed({
                                checkInDate: item.checkInDate,
                                checkOutDate: item.checkOutDate,
                                currentStatus: item.bookingStatus,
                                newStatus: "Checked-out",
                              }) && (
                                <Button
                                  onClick={() =>
                                    ConfirmModel({
                                      ActionEvent: () =>
                                        dispatch(
                                          PUT_CheckOutUser({
                                            bookingId: item.id,
                                            bookingStatus: "Checked-out",
                                          })
                                        ),
                                      title: "Check-out",
                                      description:
                                        "Do you want to set this booking to pending?",
                                    })
                                  }
                                  className="!w-full !h-[32px] !font-medium gap-2 !normal-case !text-gray-400"
                                >
                                  <svg
                                    className="w-5 h-5 text-red-500 "
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
                                      d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                                    />
                                  </svg>
                                  Check-out
                                </Button>
                              )}
                              {IsAllowed({
                                checkInDate: item.checkInDate,
                                checkOutDate: item.checkOutDate,
                                currentStatus: item.bookingStatus,
                                newStatus: "Canceled",
                              }) && (
                                <Button
                                  onClick={() =>
                                    ConfirmModel({
                                      ActionEvent: () =>
                                        dispatch(
                                          PUT_CheckOutUser({
                                            bookingId: item.id,
                                            bookingStatus: "Canceled",
                                          })
                                        ),
                                      title: "Cancelled",
                                      description:
                                        "Do you want to set this booking to pending?",
                                      isActive: false,
                                    })
                                  }
                                  className="!w-full !h-[32px] !font-medium gap-2 !normal-case !text-gray-400"
                                >
                                  <svg
                                    className="w-5 h-5 text-red-500 "
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
                                      d="M6 18 17.94 6M18 18 6.06 6"
                                    />
                                  </svg>
                                  Cancelled
                                </Button>
                              )}
                              {IsAllowed({
                                checkInDate: item.checkInDate,
                                checkOutDate: item.checkOutDate,
                                currentStatus: item.bookingStatus,
                                newStatus: "No-show",
                              }) &&(
                                <Button
                                  onClick={() =>
                                    ConfirmModel({
                                      ActionEvent: () =>
                                        dispatch(
                                          PUT_CheckOutUser({
                                            bookingId: item.id,
                                            bookingStatus: "No-show",
                                          })
                                        ),
                                      title: "Hide Booking",
                                      description:
                                        "Do you want to hide this booking?",
                                    })
                                  }
                                  className="!w-full !h-[32px] !font-medium gap-2 !normal-case !text-gray-400"
                                >
                                  <svg
                                    className="w-5 h-5 text-red-400 "
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
                                  Hide Booking
                                </Button>
                              )}
                              {item.bookingStatus === "Pending" && (
                                <Button
                                  onClick={() =>
                                    ConfirmModel({
                                      ActionEvent: () =>
                                        dispatch(
                                          PUT_CheckOutUser({
                                            bookingId: item.id,
                                            bookingStatus: "Confirmed",
                                          })
                                        ),
                                      title: "Confirm",
                                      description:
                                        "Are you want to confirm this booking?",
                                    })
                                  }
                                  className="!w-full !h-[32px] gap-2 !normal-case !text-gray-400 "
                                >
                                  <svg
                                    className="w-5 h-5 text-blue-400 dark:text-white"
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
                                      d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                  Confirm
                                </Button>
                              )}
                              {item.bookingStatus === "Canceled" && (
                                <Button
                                  // onClick={(e) =>
                                  //   handleChangeStatus(e, item.id, item.isActive)
                                  // }
                                  className="!w-full !h-[32px] gap-2 !normal-case !text-gray-400 "
                                >
                                  <svg
                                    className="w-5 h-5 text-red-400 dark:text-white"
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
                                      strokeWidth="2"
                                      d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                  Delete
                                </Button>
                              )}
                              {item.bookingStatus === "Expired" && (
                                <Button
                                  onClick={() =>
                                    ConfirmModel({
                                      ActionEvent: () =>
                                        dispatch(
                                          PUT_CheckOutUser({
                                            bookingId: item.id,
                                            bookingStatus: "No-show",
                                          })
                                        ),
                                      title: "No-show",
                                      description:
                                        "Are you want to confirm this booking?",
                                    })
                                  }
                                  className="!w-full !h-[32px] gap-2 !normal-case !text-gray-400 "
                                >
                                  <svg
                                    className="w-5 h-5 text-red-400 dark:text-white"
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
                                      strokeWidth="2"
                                      d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                  Archive
                                </Button>
                              )}
                            </div>
                          </Dropdown>
                        </div>
                      </td>
                    )
                  }
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {bookingDisplay?.length == 0 && (
          <Empty
            description={<span className="text-gray-400">Not found</span>}
            className="mt-16 text-gray-300"
          />
        )}
      </motion.div>
    </>
  );
  {
  }
};

export default BookingTableList;
