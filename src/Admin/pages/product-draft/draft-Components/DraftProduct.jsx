import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sortApprove } from "../../../../redux/features/ecommerceTracking/OrderListTable";
import { Button } from "@mui/material";
import numeral from "numeral";
import { Dropdown, Popover } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import PagePagination from "../../../components/common/pagination/Pagination";
import { hashParam } from "../../../components/common/password/passwordGenerator";
import { Empty, Skeleton, Button as AntdButton, message, Modal, Tooltip } from "antd";
const { confirm } = Modal;
import toast from "react-hot-toast";
import {
  deleteProduct,
  makeAChangeDraftProductAction,
} from "../../../../redux/features/products/productActions";
import { ExclamationCircleFilled } from "@ant-design/icons";
const Draft = () => {
  const dispatch = useDispatch();
  const locationRouter = useLocation();
  const navigate = useNavigate();
  const [draftProdut, setDraftProduct] = useState([]);
  const [localProduct, setLocalProduct] = useState([]);

  const {
    isLoading,
    currentPage,
    itemsPerPage,
    fulfilledProduct,
    unfulfilledProduct,
    allProduct,
  } = useSelector((state) => state.product);

  /* Calculate-page */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = localProduct?.slice(indexOfFirstItem, indexOfLastItem);

  /*sort route*/
  const searchParams = new URLSearchParams(locationRouter.search);
  const sortBy = searchParams.get("fulfillment") || "all";
  /* sort from store */

  useEffect(() => {
    if (sortBy === "fulfilled") {
      setLocalProduct(fulfilledProduct);
    } else if (sortBy === "unfulfilled") {
      setLocalProduct(unfulfilledProduct);
    } else {
      setLocalProduct(allProduct); // Default case when sortBy is neither 'fulfilled' nor 'unfulfilled'
    }
  }, [sortBy, draftProdut]);
  useEffect(() => {
    setDraftProduct(allProduct);
  }, [allProduct]);
  const handleSortChange = (newSortBy) => {
    navigate(`?fulfillment=${newSortBy}`);
  };
  /* Handle Delete product */
  const handleDelete = (pId) => {
    confirm({
      title: (
        <p>
          Do you want to <span className="text-red-600 underline">Delete</span>{" "}
          this product?
        </p>
      ),
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          <p className="text-gray-400 text-xs">
            This completed product will be permanently{" "}
            <span className="text-red-600 underline">Deleted</span>.
          </p>
        </>
      ),
      onOk() {
        toast.promise(dispatch(deleteProduct({ pId })).unwrap(), {
          loading: "Saving...",
          success: () => {
            return "Product deleted successfully!";
          },
          error: (error) => {
            return error.message;
          },
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  /* Handle Save to Complete Product */
  const handleSaveToComplete = (pId) => {
    toast.promise(dispatch(makeAChangeDraftProductAction({ pId })).unwrap(), {
      loading: "Saving...",
      success: () => {
        return "Product deleted successfully!";
      },
      error: (error) => {
        return error.message;
      },
    });
  };
  return (
    <>
      <div className="border border-gray-500 flex px-1 py-[3px] items-center gap-3 justify-evenly mb-4 rounded-lg bg-gray-800">
        <div className="sort-group w-1/2 flex gap-1 justify-start h-full items-center">
          {sortApprove.map((item, index) => (
            <Button
              onClick={(e) => handleSortChange(item.sort)}
              key={index}
              className={`!p-1 !normal-case !border !px-5 ${
                sortBy === item.sort ? "!bg-gray-700 !border-gray-400" : ""
              } !rounded !text-gray-300 !text-xs`}
              sx={{
                border: `${sortBy === item.sort ? "1px solid gray" : ""}`,
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
        <div className="filter-group w-1/2 flex gap-1 justify-end h-full items-center">
          <Tooltip className="text-gray-500" title="search">
            <Button
              className="!rounded bg-gray-600"
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
          <PagePagination product={localProduct}  />
        </div>
      </div>
      <div className="border  h-[63.1vh] flex-col border-gray-500 flex px-4 py-4 gap-3 mb-4 rounded-lg bg-gray-800">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {currentItems.length > 0 && (
            <thead className="h-15  text-sm text-gray-500 bg-gray-800">
              <tr className="text-center">
                <th scope="col" className="text-xs px-6 py-3 ">
                  Poster
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="text-xs px-6 py-3">
                  Brand Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="text-xs px-6 py-3">
                  Sale Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Discount
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
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
          <tbody className="">
            {currentItems.map((item, index) => (
              <tr
                whiletap={{ scale: 0.95 }}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                key={index}
                className="divide-y items-center text-center align-middle text-xs divide-gray-500 text-gray-300 bg-gray-800  hover:bg-gray-700"
              >
                <td className=" px-6 py-3 truncate ">
                  <div className="max-w-24 pr-2  truncate flex bg-gray-600 justify-start rounded-full p-[1px]  items-center gap-2">
                    <img
                      className="h-[25px] aspect-square rounded-full border border-gray-400 object-cover bg-no-repeat bg-cover"
                      src={"http://localhost:3000/public/uploads/"}
                      alt=""
                    />
                    {item?.user?.username}
                  </div>
                </td>
                <td className="px-6 py-3 truncate">{item.name}</td>
                <td className="px-6 py-3 truncate max-w-12 ">{item.brand}</td>
                <td className="px-6 py-3 truncate">
                  {item.category?.categoryName}
                </td>
                <td className="px-6 py-3 truncate">
                  ${numeral(item.salePrice).format("0.0a")}
                </td>
                <td className="px-6 py-3 truncate">{item.discountPercent}%</td>
                <td className="px-6 py-3 truncate">{item.quantity} items</td>
                <td className="px-6 py-3 truncate">
                  {item.isIncomplete && (
                    <button
                      className={`px-2 border border-yellow-400 text-yellow-400 rounded`}
                    >
                      *unfulfilled
                    </button>
                  )}
                  {item.isIncomplete === false && (
                    <button
                      className={`px-2 border border-green-400 text-green-400 rounded`}
                    >
                      *fulfilled
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 gap-1  truncate">
                  <div className="flex justify-end ">
                    <Dropdown className="w-[120px] " inline label="">
                      {item.isIncomplete === false && (
                        <Dropdown.Item
                          onClick={(e) => handleSaveToComplete(item.id)}
                          className="w-full h-[40px] justify-center"
                        >
                          save
                        </Dropdown.Item>
                      )}
                      <Link to={`/admin/draft-edit?pid=${hashParam(item.id)}`}>
                        <Dropdown.Item className=" w-full h-[40px] justify-center bg-inherit">
                          Edit
                        </Dropdown.Item>
                      </Link>
                      <Dropdown.Item
                        onClick={(e) => handleDelete(item.id)}
                        className="w-full h-[40px] justify-center"
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentItems.length == 0 && (
          <Empty
            description={<span className="text-gray-400">No Data</span>}
            className="mt-16 text-gray-300"
          />
        )}
        {/* {isLoading && <Skeleton active />} */}
      </div>
    </>
  );
};

export default Draft;
