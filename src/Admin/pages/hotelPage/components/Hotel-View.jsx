import React, { useEffect, useState } from "react";
import { sortCategory } from "../../../../redux/features/ecommerceTracking/OrderListTable";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { Empty, Flex, Input, Space, Switch, Tag, Tooltip } from "antd";
import PagePagination from "../../../components/common/pagination/Pagination";
import OverView from "../../../components/common/Overview/OverviewBlog";
import DisplayImage from "../../../components/common/AntImageDisplay/DIsplayImage";

import { motion, AnimatePresence } from "framer-motion";
const uploadFolder_url = import.meta.env.VITE_API_GET_URL;
const CategoryView = () => {
  const dispatch = useDispatch();
  const { allHotel, itemsPerPage, currentPage } = useSelector(
    (state) => state?.store
  );
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [hotel, setHotel] = useState([]);
  /* Category display */

  const { totalBooking, success, pending, cancelled } = useSelector(
    (state) => state?.store
  );
  const OrderBox = [
    {
      title: "Total",
      qty: totalBooking,
      in: "Day",
      svg: (
        <svg
          className="w-6 h-6  !text-green-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M5 6a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm0 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Zm3.85-9.76A1 1 0 0 1 10.5 9v6a1 1 0 0 1-1.65.76l-3.5-3a1 1 0 0 1 0-1.52l3.5-3ZM12 10a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Zm0 4a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2h-5a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "#33ff99",
    },
    {
      title: "Active",
      qty: success,
      in: "Day",
      svg: (
        <svg
          className="w-6 h-6 !text-green-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "#33ff99",
    },
    {
      title: "Inactive",
      qty: cancelled,
      in: "Day",
      svg: (
        <svg
          className="w-6 h-6 !text-red-500 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      ),
      color: "#ff0017",
    },
    {
      title: "Draft",
      qty: cancelled,
      in: "Day",
      svg: (
        <svg
          className="w-6 h-6 !text-yellow-300 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"
          />
        </svg>
      ),
      color: "#ff0017",
    },
  ];
  /* Route */

  const { status = "all" } = useParams();
  useEffect(() => {
    if (allHotel?.length > 0) {
      if (status === "all") {
        setHotel(allHotel);
      } else if (status === "active") {
        setHotel(allHotel.filter((item) => item.isComplete));
      } else if (status === "inactive") {
        setHotel(allHotel.filter((item) => !item.isComplete));
      } else {
        setHotel([]);
      }
      /* For search */
      if (search !== "") {
        const searchHotel = hotel.filter((hotel) =>
          hotel.name.toLowerCase().includes(search.toLowerCase())
        );
        setHotel(searchHotel);
      }
    }
  }, [allHotel, status, search, dispatch]);

  /* Calculate-page */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const hotelDisplay = hotel?.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = () => {
    setIsSearch((item) => !item);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className=" h-24 border border-gray-500 border-opacity-50 flex  px-4 py-4 items-center gap-3 justify-center mb-4 rounded-lg bg-gray-800"
      >
        <OverView Data={OrderBox} />
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
        className="border  border-gray-500 flex px-1 py-[3px] items-center gap-3 justify-evenly mb-4 rounded-lg bg-gray-800"
      >
        <div className="sort-group w-1/2 flex gap-1 justify-start h-full items-center">
          {sortCategory.map((item, index) => (
            <Button
              LinkComponent={Link}
              to={item.url}
              key={index}
              className={`!p-1 !normal-case !border !px-5 ${
                status === item.title ? "!bg-gray-700 !border-gray-400" : ""
              } !rounded !text-gray-300 !text-xs`}
              sx={{
                border: `${status === item.title ? "1px solid gray" : ""}`,
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
        <div className="filter-group w-1/2 flex gap-1 justify-end h-full items-center">
          {isSearch && (
            <>
              <input
                type="text"
                placeholder=""
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
          <PagePagination bookings={hotel} />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
        }}
        className="border  flex-col  min-h-[63.5vh] border-gray-500 flex p-3 gap-3  mb-4 rounded-lg bg-gray-800"
      >
        {hotelDisplay.length !== 0 && (
          <table className="w-full table-fixed text-sm text-left rtl:text-right  text-gray-400">
            {allHotel.length > 0 && (
              <thead className="text-sm text-gray-500 bg-gray-800 ">
                <tr className="text-center text-[13px] h-7">
                  <th scope="col" className="px-5 py-3">
                    Hotel
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Locations
                  </th>
                  <th scope="col" className="px-6 py-3 w-44">
                    Amenities
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 w-48">
                    Images
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Available
                  </th>
                  <th scope="col" className="px-6 py-3 truncate">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Approve Status
                  </th>
                </tr>
              </thead>
            )}
            <tbody>
              {hotelDisplay.map((item, index) => (
                <tr
                  key={index}
                  className="divide-y items-center text-center align-middle text-xs divide-gray-500 text-gray-300 bg-gray-800  hover:bg-gray-700"
                >
                  <td className=" px-6 py-3 truncate ">
                    <div className="max-w-20 pr-2  truncate flex bg-gray-600 justify-start rounded-full p-[1px]  items-center gap-2">
                      <img
                        className="h-[30px] aspect-square rounded-full border border-gray-400 object-cover bg-no-repeat bg-cover"
                        src={
                          uploadFolder_url + item?.thumbnail[0]?.thumbnail || ""
                        }
                        alt=""
                      />
                      {item.name}
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="px-6 truncate py-4 font-medium whitespace-nowrap text-gray-500"
                  >
                    {item.location}
                  </td>

                  <td className="px-6 py-1  h-7 truncate">
                    <Flex
                      gap="4px 0"
                      wrap
                      className="justify-center items-center"
                    >
                      {item?.amenties &&
                        Object.entries(item.amenties).map(
                          ([key, value], index) => (
                            <Tag
                              key={index}
                              bordered={value}
                              className="text-[11px] flex items-center justify-center !bg-inherit"
                              color="success"
                            >
                              {key}
                            </Tag>
                          )
                        )}
                    </Flex>
                  </td>
                  <td className="px-6 py-3 truncate">{item.description}</td>
                  <td className="px-6 py-3 text-center align-middle truncate">
                    <div className="flex justify-center ">
                      <Dropdown
                        className="!bg-gray-500/40 !border-none  !backdrop-blur-sm !pb-2 !px-1 "
                        inline
                        label=""
                      >
                        <DisplayImage data={item.image} />
                      </Dropdown>
                    </div>
                  </td>
                  <td className="px-6 py-3 truncate">
                    <Space direction="vertical">
                      <Switch
                        value={item.status === 'available'}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        disabled={true}
                      />
                    </Space>
                  </td>
                  <td className="px-6 py-3">
                    {item.status == "available" && (
                      <button
                        className={`px-2 border border-green-400 text-green-400 rounded`}
                      >
                        *{item.status}
                      </button>
                    )}
                    {item.status == "occupied" && (
                      <button
                        className={`px-2 border border-yellow-400 text-yellow-400 rounded`}
                      >
                        *{item.status}
                      </button>
                    )}
                    {item.status == "maintenance" && (
                      <button
                        className={`px-2 border border-red-500 text-red-500 rounded`}
                      >
                        *{item.status}
                      </button>
                    )}
                    {item.status == "closed" && (
                      <button
                        className={`px-2 border border-red-600 text-red-600 rounded`}
                      >
                        *{item.status}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 gap-1  truncate">
                    <div className="flex justify-center ">
                      <Dropdown
                        className="!bg-gray-500/40 !border-none !w-[11vw] !backdrop-blur-sm"
                        inline
                        label=""
                      >
                        <div className="flex  justify-center flex-col">
                          <Button
                            // onClick={(e) =>
                            //   handleChangeStatus(e, item.id, item.isActive)
                            // }
                            className="!w-full !h-[32px] !font-medium gap-2 !normal-case !text-gray-400"
                          >
                            <svg
                              className="w-5 h-5 text-green-400 "
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
                                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            active
                          </Button>
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
                            Inactive
                          </Button>
                        </div>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {hotelDisplay.length == 0 && (
          <Empty
            description={<span className="text-gray-400">No Data</span>}
            className="mt-16 text-gray-300"
          />
        )}
        {/* {hotelDisplay?.length !== 0 && <PagePagination bookings={hotel} />} */}
      </motion.div>
    </>
  );
};
export default CategoryView;
