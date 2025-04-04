import React, { useEffect, useState } from "react";
import numeral from "numeral";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { FormatDate } from "../../../components/common/services/FormateDate.js";
import { Empty, Button as AntButton, Tooltip } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import PagePagination from "../../../components/common/pagination/Pagination.jsx";
import timeSinceCheckout from '../../../components/common/services/TimeSinceCheckout.js'
const uploadFolder_url = import.meta.env.VITE_API_GET_URL;
const LatestUserBookingTable = ({ sort = "" }) => {
  const { allBooking, currentPage, itemsPerPage } = useSelector(
    (state) => state.store
  );
  const [bookings, setBookings] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const locationRouter = useLocation().pathname;
  const dispatch = useDispatch();

  /* Calculate-page */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const bookingDisplay =
    bookings.slice(indexOfFirstItem, indexOfLastItem) || [];
  const { status } = useParams(); // Extracts dynamic segments from the route

  /* new */
  useEffect(() => {
    if (sort === "") {
      setBookings(allBooking);
    } else {
      if (sort === "Latest") {
        setBookings(allBooking);
      } else if (sort === "Arrivals") {
        setBookings(
          allBooking.filter((item) => item?.bookingStatus == "Checked-in")
        );
      } 
      else if (sort === "Departures") {
        setBookings(
          allBooking.filter((item) => item?.bookingStatus == "Checked-out")
        );
      }
      else if (sort === "Paid") {
        setBookings(
          allBooking.filter((item) => item?.bookingStatus == "Confirmed")
        );
      }
      else if (sort === "Pending") {
        setBookings(
          allBooking.filter((item) => item?.bookingStatus == "Pending")
        );
      }
       else {
      }
    }
  }, [dispatch, allBooking, sort]);
  const { totalBooking, success, pending, cancelled } = useSelector(
    (state) => state?.store
  );
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className=" min-h-[60vh] mb-3 border-b border-gray-500/20 w-full relative flex-col flex items-center gap-3 justify-start "
      >
        {/* Table over here!! */}
        {bookingDisplay?.length !== 0 && (
          <table className="w-full h-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-sm text-gray-500">
              <tr className="text-center text-[13px] uppercase">
                <th scope="col" className="px-6 py-3 w-16">
                  Name
                </th>
                <th scope="col" className="px-5 py-3 uppercase">
                  Booking's ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Room's Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Check-in Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Check-out Date
                </th>
                <th scope="col" className="px-6 py-3">
                  In
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="">
              {bookingDisplay?.map((item, index) => (
                <>
                  <tr
                    key={index}
                    className="divide-y hover:bg-gray-700/10 h-[50px] items-center text-center align-middle text-xs divide-gray-500 text-gray-300 "
                  >
                    <td className="px-6 py-3 truncate">
                      <div className="max-w-14 min-w-16 pr-2 truncate flex bg-gray-600 justify-start rounded-full p-[1px]  items-center gap-2">
                        <img
                          className="h-[25px] aspect-square rounded-full border border-gray-400 object-cover bg-no-repeat bg-cover"
                          src={uploadFolder_url + item?.user?.userAvatar}
                          alt=""
                        />
                        {item?.user?.name}
                      </div>
                    </td>
                    <td className="px-6 py-3 truncate">{item?.id}</td>
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
                    <td className="px-6 py-3 truncate">
                      {
                        timeSinceCheckout(item.updatedAt)
                      }
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
                            ? "border-green-500 text-green-500"
                            : item.bookingStatus == "Pending"
                            ? "border-yellow-300 text-yellow-300"
                            : item.bookingStatus == "Checked-in"
                            ? "border-green-400 text-green-400"
                            : "border-red-500 text-red-500"
                        } rounded`}
                      >
                        *{item.bookingStatus}
                      </motion.button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        )}

        <PagePagination
          bookings={bookings}
          className="absolute -bottom-[1.9rem] left-[45%] !bg-gray-600/10 backdrop-blur-sm"
        />
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

export default LatestUserBookingTable;
