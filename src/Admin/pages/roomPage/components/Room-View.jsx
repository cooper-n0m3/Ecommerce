import React, { useEffect, useState } from "react";
import { sortCompleteProduct } from "../../../../redux/features/ecommerceTracking/OrderListTable.js";
import numeral from "numeral";
import { Button } from "@mui/material";

import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Modal, Space, Switch, Tooltip } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import {
  PATCH_room_status,
} from "../../../../redux/features/store/storeActions.js";
import PagePagination from "../../../components/common/pagination/Pagination.jsx";
import { FormatDate } from "../../../components/common/services/FormateDate.js";
import DisplayImage from "../../../components/common/AntImageDisplay/DIsplayImage.jsx";
import BoxOrder from "../../../components/common/Overview/BoxOrder.jsx";
import { ConfirmModel } from "../../../components/common/confirmModel/ConfirmModel.jsx";

const uploadFolder_url = import.meta.env.VITE_API_GET_URL;
const ViewProduct = () => {
  const { confirm } = Modal;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    allRoom,
    currentPage,
    itemsPerPage,
    countTotalRoom,
    countAvailableRoom,
    countBooked,
    countChecked_in,
    countChecked_out,
    countClosed,
    countMaintenance,
    countOccupied,
    countNo_show,
    countPending,
  } = useSelector((state) => state?.store);
  /* UseStae */
  const [localProduct, setLocalProduct] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  /* Calculate-page */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    localProduct?.slice(indexOfFirstItem, indexOfLastItem) || [];

  /*sort route*/
  const { status } = useParams();

  useEffect(() => {
    if (search === "") {
      if (status === "available") {
        setLocalProduct(allRoom?.filter((item) => item.status === "available"));
      } else if (status === "occupied") {
        setLocalProduct(allRoom?.filter((item) => item.status === "occupied"));
      } else if (status === "maintenance") {
        setLocalProduct(
          allRoom?.filter((item) => item.status === "maintenance")
        );
      } else if (status === "closed") {
        setLocalProduct(allRoom?.filter((item) => item.status === "closed"));
      } else if (status === "booked") {
        setLocalProduct(allRoom?.filter((item) => item.status === "booked"));
      } else if (status === "pending") {
        setLocalProduct(allRoom?.filter((item) => item.status === "pending"));
      } else if (status === "checked-in") {
        setLocalProduct(
          allRoom?.filter((item) => item.status === "checked-in")
        );
      } else if (status === "checked-out") {
        setLocalProduct(
          allRoom?.filter((item) => item.status === "checked-out")
        );
      } else {
        setLocalProduct(allRoom); // Default case when  status is neither 'fulfilled' nor 'unfulfilled'
      }
    } else {
      if (status === "total") {
        setLocalProduct(
          allRoom?.filter((item) => Number(item.id) === Number(search))
        );
      } else {
        setLocalProduct(
          allRoom?.filter(
            (item) =>
              Number(item.id) === Number(search) && item.status == status
          )
        );
      }
    }
  }, [status, dispatch, allRoom, search]);

  const handleSortChange = (newSortBy) => {
    navigate(`?status=${newSortBy}`);
  };
  const handleSearch = () => {
    setIsSearch((item) => !item);
  };
  return (
    <>
     <span className="m-2 text-gray-400 text-[13px]">
        Room's summary
      </span>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="border w-full rounded-lg border-gray-500 border-opacity-50  bg-gradient-to-r from-gray-800 to-slate-900 "
        // className=" h-20  border border-gray-500 border-opacity-50 flex  px-1 py-[5px] items-center gap-3 justify-center mb-4 rounded-lg  bg-gradient-to-r from-gray-800 to-slate-900"
      >
        <div className=" h-20  flex  px-1 py-[5px] items-center gap-3 justify-center rounded-lg ">
          <BoxOrder
            title1={<span className="text-gray-100 text-lg">Total</span>}
            title2={<span className="text-gray-100 text-lg">Available</span>}
            title3={<span className="text-gray-100 text-lg">Occupied</span>}
            title4={<span className="text-gray-100 text-lg">Maintenance</span>}
            label={<span className="text-gray-300 text-xs">Room</span>}
            defaultValue={{
              value1: countTotalRoom,
              value2: countAvailableRoom,
              value3: countOccupied,
              value4: countMaintenance,
            }}
            icons={{
              icon4: (
                <svg
                  className="w-6 h-6 text-red-600"
                  ariaHidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m20.9532 11.7634-2.0523-2.05225-2.0523 2.05225 2.0523 2.0523 2.0523-2.0523Zm-1.3681-2.73651-4.1046-4.10457L12.06 8.3428l4.1046 4.1046 3.4205-3.42051Zm-4.1047 2.73651-2.7363-2.73638-8.20919 8.20918 2.73639 2.7364 8.2091-8.2092Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m12.9306 3.74083 1.8658 1.86571-2.0523 2.05229-1.5548-1.55476c-.995-.99505-3.23389-.49753-3.91799.18657l2.73639-2.73639c.6841-.68409 1.9901-.74628 2.9229.18658Z"
                  />
                </svg>
              ),
            }}
          />
        </div>
        <div className=" h-20  flex  px-1 py-[5px] items-center gap-3 justify-center rounded-lg  ">
          <BoxOrder
            title1={<span className="text-gray-100 text-lg">Booked</span>}
            title2={<span className="text-gray-100 text-lg">Pending</span>}
            title3={<span className="text-gray-100 text-lg">Checked-In</span>}
            title4={<span className="text-gray-100 text-lg">Checked-Out</span>}
            label={<span className="text-gray-300 text-xs"> Room</span>}
            defaultValue={{
              value1: countBooked,
              value2: countPending,
              value3: countChecked_in,
              value4: countChecked_out,
            }}
            icons={{
              icon1: (
                <svg
                  className="w-6 h-6 text-green-400 "
                  ariaHidden="true"
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
                    d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z"
                  />
                </svg>
              ),
              icon2: (
                <svg
                  className="w-6 h-6 text-yellow-400 "
                  ariaHidden="true"
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
                    d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                  />
                </svg>
              ),
              icon3: (
                <svg
                  className="w-6 h-6 text-green-500 "
                  ariaHidden="true"
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
                    d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"
                  />
                </svg>
              ),
              icon4: (
                <svg
                  className="w-6 h-6 text-red-600 "
                  ariaHidden="true"
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
                    d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                  />
                </svg>
              ),
            }}
          />
        </div>
      </motion.div>
      <span className="m-2 text-gray-400 text-[13px]">
        Sorting room's status
      </span>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="border mt-2 border-gray-500 flex px-1 py-[3px] items-center gap-3 justify-between mb-2 rounded-lg bg-gradient-to-r from-gray-800 to-slate-900"
      >
        <div className="sort-groupflex gap-1 justify-start h-full items-center">
          {sortCompleteProduct.map((item, index) => (
            <Button
              LinkComponent={Link}
              to={item.url}
              onClick={(e) => handleSortChange(item.sort)}
              key={index}
              className={`!p-1 !normal-case !border !px-5 ${
                status === item.sort ? "!bg-gray-700 !border-gray-400" : ""
              } !rounded !text-gray-300 !text-xs`}
              sx={{
                border: `${status === item.sort ? "1px solid gray" : ""}`,
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
        <div className="filter-group flex gap-1 justify-end h-full items-center">
          <AnimatePresence initial={false}>
            {isSearch && (
              <>
                <motion.input
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  key="box"
                  type="number"
                  placeholder="search room's id"
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-[25px] w-40 rounded focus:outline-none focus:border-none  bg-gray-700 text-gray-500 focus:text-gray-300"
                />
                <Tooltip
                  className="!rounded bg-gray-600"
                  title="Close"
                  onClick={handleSearch}
                >
                  <Button>
                    <svg
                      className="!w-[17px] !h-[17px] text-gray-200 dark:text-white"
                      ariaHidden="true"
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
                    ariaHidden="true"
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
          </AnimatePresence>
          <PagePagination bookings={localProduct} />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="border h-[63.1vh] flex-col border-gray-500 flex px-4 py-4 gap-3 mb-4 rounded-lg bg-gradient-to-r from-gray-800 to-slate-900"
      >
        {currentItems?.length !== 0 && (
          <table className="w-full  table-fixed text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="h-15  text-sm text-gray-500 ">
              <tr className="text-center">
                <th scope="col" className="text-xs px-6 py-3 ">
                  Type
                </th>
                <th scope="col" className="text-xs px-6 py-3">
                  ID
                </th>
                <th scope="col" className="text-xs px-6 py-3">
                  Hotel
                </th>
                <th scope="col" className="px-6 py-3">
                  Per-night
                </th>

                <th scope="col" className="px-6 py-3">
                  Images
                </th>
                <th scope="col" className="px-6 text-[13px] py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Available
                </th>
                <th scope="col" className="px-6 py-3 w-36">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {currentItems?.map((item, index) => (
                <tr
                  whiletap={{ scale: 0.95 }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  key={index}
                  className="divide-y items-center text-center align-middle text-xs divide-gray-500 text-gray-300  "
                >
                  <td className=" px-6 py-1 truncate ">
                    <div className="max-w-24 pr-2  truncate flex bg-gray-600 justify-start rounded-full p-[1px]  items-center gap-2">
                      <img
                        className="h-[25px] aspect-square rounded-full border border-gray-400 object-cover bg-no-repeat bg-cover"
                        src={
                          uploadFolder_url + item?.thumbnail[0]?.thumbnail || ""
                        }
                        alt=""
                      />
                      {item?.roomType}
                    </div>
                  </td>
                  <td className="px-6 py-3 truncate">{item?.id}</td>
                  <td className="px-6 py-3 truncate max-w-12 ">
                    {item?.hotel?.name}
                  </td>
                  <td className="px-6 py-3 truncate">
                    $ {numeral(item?.pricePerNight).format("0.00a")}
                  </td>
                  <td className="px-6 py-3 text-center align-middle truncate">
                    <div className="flex justify-center ">
                      <Dropdown
                        className="!bg-gray-500/40 !border-none  !backdrop-blur-sm !pb-2 !px-1 "
                        inline
                        label=""
                      >
                        <DisplayImage data={item?.image} />
                      </Dropdown>
                    </div>
                  </td>
                  <td className="px-6 py-3 truncate">
                    {FormatDate(item?.createdAt)}
                  </td>
                  <td className="px-6 py-3 truncate">
                    <Space direction="vertical">
                      <Switch
                        value={item?.status === "available"}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        disabled={true}
                      />
                    </Space>
                  </td>
                  <td className="px-6 py-3 truncate">
                    {item?.status == "available" && (
                      <button
                        className={`px-2 border border-green-400 text-green-400 rounded`}
                      >
                        *{item?.status}
                      </button>
                    )}
                    {item?.status == "occupied" && (
                      <button
                        className={`px-2 border border-yellow-400 text-yellow-400 rounded`}
                      >
                        *{item?.status}
                      </button>
                    )}
                    {item?.status == "maintenance" && (
                      <button
                        className={`px-2 border border-red-500 text-red-500 rounded`}
                      >
                        *{item?.status}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4   truncate">
                    <div className="flex justify-center ">
                      <Dropdown
                        className="!bg-gray-500/40 !border-none !w-[11vw] !backdrop-blur-sm"
                        inline
                        label=""
                      >
                        <div className="flex  justify-center flex-col">
                          {item?.status !== "available" && (
                            <Button
                              onClick={() =>
                                ConfirmModel({
                                  ActionEvent: () =>
                                    dispatch(
                                      PATCH_room_status({
                                        roomId: item?.id,
                                        status: "available",
                                      })
                                    ),
                                })
                              }
                              className="!w-full !h-[32px] !font-medium gap-2 !normal-case !text-gray-400"
                            >
                              <svg
                                className="w-5 h-5 text-green-400 "
                                ariaHidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M15 7a2 2 0 1 1 4 0v4a1 1 0 1 0 2 0V7a4 4 0 0 0-8 0v3H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V7Zm-5 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Available
                            </Button>
                          )}
                          {item?.status !== "occupied" && (
                            <Button
                              onClick={() =>
                                ConfirmModel({
                                  ActionEvent: () =>
                                    dispatch(
                                      PATCH_room_status({
                                        roomId: item?.id,
                                        status: "occupied",
                                      })
                                    ),
                                })
                              }
                              className="!w-full !h-[32px] !font-medium gap-2 !normal-case !text-gray-400"
                            >
                              <svg
                                className="w-5 h-5 text-yellow-400"
                                ariaHidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Occupied
                            </Button>
                          )}
                          {item?.status !== "maintenance" && (
                            <Button
                              onClick={() =>
                                ConfirmModel({
                                  ActionEvent: () =>
                                    dispatch(
                                      PATCH_room_status({
                                        roomId: item?.id,
                                        status: "maintenance",
                                      })
                                    ),
                                })
                              }
                              className="!w-full !h-[32px] !font-medium gap-2 !normal-case !text-gray-400"
                            >
                              <svg
                                className="w-5 h-5 text-red-500"
                                ariaHidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8.4 6.763c-.251.1-.383.196-.422.235L6.564 5.584l2.737-2.737c1.113-1.113 3.053-1.097 4.337.187l1.159 1.159a1 1 0 0 1 1.39.022l4.105 4.105a1 1 0 0 1 .023 1.39l1.345 1.346a1 1 0 0 1 0 1.415l-2.052 2.052a1 1 0 0 1-1.414 0l-1.346-1.346a1 1 0 0 1-1.323.039L11.29 8.983a1 1 0 0 1 .04-1.324l-.849-.848c-.18-.18-.606-.322-1.258-.25a3.271 3.271 0 0 0-.824.202Zm1.519 3.675L3.828 16.53a1 1 0 0 0 0 1.414l2.736 2.737a1 1 0 0 0 1.414 0l6.091-6.091-4.15-4.15Z" />
                              </svg>
                              Maintenance
                            </Button>
                          )}
                          {item?.status !== "closed" && (
                            <Button
                              onClick={() =>
                                ConfirmModel({
                                  ActionEvent: () =>
                                    dispatch(
                                      PATCH_room_status({
                                        roomId: item?.id,
                                        status: "closed",
                                      })
                                    ),
                                })
                              }
                              className="!w-full !h-[32px] !font-medium gap-2 !normal-case !text-gray-400"
                            >
                              <svg
                                className="w-5 h-5 text-red-500"
                                ariaHidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Closed
                            </Button>
                          )}
                        </div>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {currentItems?.length == 0 && (
          <Empty
            description={<span className="text-gray-400">No Data</span>}
            className="mt-16 text-gray-300"
          />
        )}
        {/* {isLoading && <Skeleton active />} */}
      </motion.div>
    </>
  );
};
export default ViewProduct;
