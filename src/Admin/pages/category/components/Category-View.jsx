import React, { useEffect, useState } from "react";
import { sortCategory } from "../../../../redux/features/ecommerceTracking/OrderListTable";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { Empty } from "antd";
import { disabledCategory } from "../../../../redux/features/products/productActions";
import toast from "react-hot-toast";

const CategoryView = () => {
  const dispatch = useDispatch();
  const { categories, allCategories, activeCategories, inactiveCategories } =
    useSelector((state) => state?.product);
  const locationRouter = useLocation().pathname;
  const [sortList, setSortList] = useState(sortCategory);

  /* Category display */
  const [displayCate, setDisplayCate] = useState([]);

  /* Route */

  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const sortBy = searchParam.get("sort") || "all";

  useEffect(() => {
    if (sortBy === "active") {
      setDisplayCate(activeCategories);
      // setLocalProduct(fulfilledProduct);
    } else if (sortBy === "inactive") {
      setDisplayCate(inactiveCategories);
      // setLocalProduct(unfulfilledProduct);
    } else {
      setDisplayCate(allCategories);
      // setLocalProduct(allProduct); // Default case when sortBy is neither 'fulfilled' nor 'unfulfilled'
    }
  }, [sortBy, allCategories]);

  const handleCategoryAction = (cateId) => {
    toast.promise(dispatch(disabledCategory({ cateId })).unwrap(), {
      loading: "Saving...",
      success: (data) => {
        
        return (data.data.isActive)?'Category changed to active successfully':'Category changed to inactive successfully';
      },
      error: (error) => {
        return error.message || "Failed to edit Category.";
      },
    });
  };
  return (
    <div className="">
      <div className="border  border-gray-500 flex px-1 py-[3px] items-center gap-3 justify-evenly mb-4 rounded-lg bg-gray-800">
        <div className="sort-group w-1/2 flex gap-1 justify-start h-full items-center">
          {sortList.map((item, index) => (
            <Button
              LinkComponent={Link}
              to={item.url}
              key={index}
              className={`!p-1 !normal-case !border !px-5 ${
                sortBy === item.title ? "!bg-gray-700 !border-gray-400" : ""
              } !rounded !text-gray-300 !text-xs`}
              sx={{
                border: `${sortBy === item.title ? "1px solid gray" : ""}`,
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
        <div className="filter-group w-1/2 flex gap-1 justify-end h-full items-center">
          <button className="p-1  border border-gray-500 rounded bg-gray-600">
            <svg
              className="w-[17px] h-[17px] text-gray-200 dark:text-white"
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
          </button>
          <button className="p-1 hover:scale-105 border border-gray-500 rounded ">
            <svg
              className="w-[17px] h-[17px] text-gray-300 dark:text-white"
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
                d="M8 6h8M6 10h12M8 14h8M6 18h12"
              />
            </svg>
          </button>
          <button className="p-1 hover:scale-105 border border-gray-500 rounded ">
            <svg
              className="w-[17px] h-[17px] text-gray-300 dark:text-white"
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
                d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"
              />
            </svg>
          </button>
          <button className="p-1 hover:scale-105 border border-gray-500 rounded ">
            <svg
              className="w-[17px] h-[17px] text-gray-300 dark:text-white"
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
                d="M6 12h.01m6 0h.01m5.99 0h.01"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="border h-[62vh] Hide-Scrollbar flex-col  min-h-[63.5vh] border-gray-500 flex p-3 gap-3  mb-4 rounded-lg bg-gray-800">
        <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
          {displayCate.length > 0 && (
            <thead className=" text-sm text-gray-500 bg-gray-800">
              <tr className="text-center">
                <th scope="col" className="px-6 py-3 ">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 ">
                  NO.
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Slot
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            {displayCate.map((item, index) => (
              <tr
                key={index}
                className="divide-y items-center text-center align-middle text-xs divide-gray-500 text-gray-300 bg-gray-800  hover:bg-gray-700"
              >
                <td className=" px-6 py-3 truncate ">
                  <div className="max-w-24 pr-2  truncate flex bg-gray-600 justify-start rounded-full p-[1px]  items-center gap-2">
                    <img
                      className="h-[25px] aspect-square rounded-full border border-gray-400 object-cover bg-no-repeat bg-cover"
                      src={
                        "http://localhost:3000/public/uploads/" +
                        item.categoryThumbnail
                      }
                      alt=""
                    />
                    {/* {item.customer.title} */}
                    json
                  </div>
                </td>
                <td
                  scope="row"
                  className="px-6 truncate py-4 font-medium whitespace-nowrap text-gray-500"
                >
                  #{item.id}
                </td>
                <td className="px-6 py-3 truncate ">{item.categoryName}1</td>
                <td className="px-6 py-3 truncate">{item.slug}</td>

                <td className="px-6 py-3 truncate">{item.description}</td>
                <td className="px-6 py-3 truncate">
                  {item.isActive && (
                    <button
                      className={`px-2 border border-green-300 text-green-300 rounded`}
                    >
                      Active
                    </button>
                  )}
                  {!item.isActive && (
                    <button
                      className={`px-2 border border-yellow-300 text-yellow-300 rounded`}
                    >
                      Inactiv
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 gap-1  truncate">
                  <div className="flex justify-end ">
                    <Dropdown className="w-[120px]" inline label="">
                      {item.isActive && (
                        <Dropdown.Item
                          onClick={(e) => handleCategoryAction(item.id)}
                          className="w-full h-[40px] justify-center"
                        >
                          disabled
                        </Dropdown.Item>
                      )}
                      {!item.isActive && (
                        <Dropdown.Item
                          onClick={(e) => handleCategoryAction(item.id)}
                          className="w-full h-[40px] justify-center"
                        >
                          active
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item className="w-full h-[40px] justify-center">
                        delete
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayCate.length == 0 && (
          <Empty
            description={<span className="text-gray-400">No Data</span>}
            className="mt-16 text-gray-300"
          />
        )}
      </div>
    </div>
  );
};
export default CategoryView;
