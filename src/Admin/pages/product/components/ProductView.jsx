import React, { useEffect, useState } from "react";
import {
  OrderList,
  sortApprove,
  sortCompleteProduct,
  sortOrder,
} from "../../../../redux/features/ecommerceTracking/OrderListTable";
import numeral from "numeral";
import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Empty, Skeleton, Modal, Tooltip } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import BannerRemindComplete from "./message/BannerRemindComplete";
import toast from "react-hot-toast";
import SortByAlphaSharpIcon from "@mui/icons-material/SortByAlphaSharp";
import {
  changeStatusProduct,
  deleteProduct,
  makeAChangeDraftProductAction,
  setByNameSort,
} from "../../../../redux/features/products/productActions";
import PagePagination from "../../../components/common/pagination/Pagination";
const ViewProduct = () => {
  const { confirm } = Modal;

  const dispatch = useDispatch();
  const locationRouter = useLocation();
  const navigate = useNavigate();
  const { isLoading, productList, currentPage, itemsPerPage } = useSelector(
    (state) => state?.product
  );
  /* UseStae */
  const [localProduct, setLocalProduct] = useState([]);
  const [sortByName, setSortByName] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  /* Calculate-page */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = localProduct?.slice(indexOfFirstItem, indexOfLastItem);

  /*sort route*/
  const searchParams = new URLSearchParams(locationRouter.search);
  const sortBy = searchParams.get("status") || "all";

  useEffect(() => {
    if (sortBy === "active") {
      setLocalProduct(productList.filter((item) => item.isActive));
    } else if (sortBy === "inactive") {
      setLocalProduct(productList.filter((item) => !item.isActive));
    } else {
      setLocalProduct(productList); // Default case when sortBy is neither 'fulfilled' nor 'unfulfilled'
    }
  }, [sortBy, productList]);

  const handleMakeToDraft = (pId) => {
    confirm({
      title: (
        <p>
          Do you want to <span className="text-red-600 underline">Draft</span>{" "}
          this product?
        </p>
      ),
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          <p className="text-gray-400 text-xs">
            This completed product will be{" "}
            <span className="text-red-600 underline">Draft</span>.
          </p>
        </>
      ),
      onOk() {
        toast.promise(
          dispatch(makeAChangeDraftProductAction({ pId })).unwrap(),
          {
            loading: "Saving...",
            success: () => {
              return "Product deleted successfully!";
            },
            error: (error) => {
              return error.message;
            },
          }
        );
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handleDeleteCompletedProduct = (pId) => {
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
  const handleChangeStatus = (e, pId, currentStatus) => {
    if (currentStatus) {
      confirm({
        title: (
          <p>
            Do you want to <span className="text-red-600 ">Change</span> this
            product to <span className="text-red-600 ">inactive</span>?
          </p>
        ),
        icon: <ExclamationCircleFilled />,
        content: (
          <>
            <p className="text-gray-400 text-xs">
              This completed product will be{" "}
              <span className="text-red-600 underline">Delete</span>{" "}
              permanently.
            </p>
          </>
        ),
        onOk() {
          toast.promise(dispatch(changeStatusProduct({ pId })).unwrap(), {
            loading: isLoading && <p>Saving...</p>,
            success: (data) => {
              return data.description || "Product change status successfully";
            },
            error: (error) => {
              return error.message || "Product changed status failed";
            },
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else {
      toast.promise(dispatch(changeStatusProduct({ pId })).unwrap(), {
        loading: isLoading && <p>Saving...</p>,
        success: (data) => {
          return data.data.description;
        },
        error: (error) => {
          return error.message || "Product changed status failed";
        },
      });
    }
  };
  const handleSortChange = (newSortBy) => {
    navigate(`?status=${newSortBy}`);
  };
  const handleSortByName = () => {
    setSortByName((prevStatus) => {
      const newStatus = prevStatus >= 3 ? 0 : prevStatus + 1;
      if (newStatus == 1) {
        toast(
          <p>
            Sorted to ({" "}
            <span className="text-green-500 font-bold text-[16px]">z-a</span> )
          </p>,
          {
            icon: (
              <SortByAlphaSharpIcon />
              // <svg
              //   className="w-6 h-6 text-white"
              //   aria-hidden="true"
              //   xmlns="http://www.w3.org/2000/svg"
              //   width={24}
              //   height={24}
              //   fill="none"
              //   viewBox="0 0 24 24"
              // >
              //   <path
              //     stroke="currentColor"
              //     strokeLinecap="round"
              //     strokeLinejoin="round"
              //     strokeWidth={2}
              //     d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
              //   />
              // </svg>
            ),
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      } else if (newStatus == 2) {
        toast(
          <p>
            Sorted to ({" "}
            <span className="text-green-500 font-bold text-[16px]">latest</span>{" "}
            )
          </p>,
          {
            icon: <SortByAlphaSharpIcon />,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      } else if (newStatus == 3) {
        toast(
          <p>
            Sorted to ({" "}
            <span className="text-green-500 font-bold text-[16px]">oldest</span>{" "}
            )
          </p>,
          {
            icon: <SortByAlphaSharpIcon />,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      } else {
        toast(
          <p>
            Sorted to ({" "}
            <span className="text-green-500 font-bold text-[16px]">a-z</span> )
          </p>,
          {
            icon: <SortByAlphaSharpIcon />,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      }

      dispatch(setByNameSort(newStatus));
      setLocalProduct(productList);
      return newStatus;
    });
  };
  const handleSearch =()=>{
    setIsSearch(item=>!item);
  }
  return (
    <>
      <BannerRemindComplete />
      <div className="border mt-2 border-gray-500 flex px-1 py-[3px] items-center gap-3 justify-evenly mb-2 rounded-lg bg-gray-800">
        <div className="sort-group w-1/2 flex gap-1 justify-start h-full items-center">
          {sortCompleteProduct.map((item, index) => (
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
          <Tooltip
            title={
              sortByName == 1
                ? "*(latest)"
                : sortByName == 2
                ? "*(oldest)"
                : sortByName == 3
                ? "*(a-z)"
                : "*(z-a)"
            }
          >
            <Button
              onClick={handleSortByName}
              className="!p-1  rounded "
              sx={{ border: "1px solid gray" }}
            >
              <svg
                className="!w-[17px] !h-[17px] text-gray-300 dark:text-white"
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
            </Button>
          </Tooltip>
          <PagePagination product={localProduct} />
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
      <div className="border  h-[63.1vh] flex-col border-gray-500 flex px-4 py-4 gap-3 mb-4 rounded-lg bg-gray-800">
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {localProduct?.length > 0 && (
            <thead className="h-15  text-sm text-gray-500 bg-gray-800">
              <tr className="text-center">
                <th scope="col" className="text-xs px-6 py-3 ">
                  Poster
                </th>
                <th scope="col" className="text-xs px-6 py-3">
                  Product <span className="text-green-600 underline">Name</span>
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
            {currentItems?.map((item, index) => (
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
                  {!item.isActive && (
                    <button
                      className={`px-2 border border-yellow-400 text-yellow-400 rounded`}
                    >
                      *inactive
                    </button>
                  )}
                  {item.isActive && (
                    <button
                      className={`px-2 border border-green-400 text-green-400 rounded`}
                    >
                      *Active
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 gap-1  truncate">
                  <div className="flex justify-end ">
                    <Dropdown className="w-[120px] " inline label="">
                      {item.isActive && (
                        <Dropdown.Item
                          onClick={(e) =>
                            handleChangeStatus(e, item.id, item.isActive)
                          }
                          className="w-full h-[40px] text-red-700 justify-center"
                        >
                          Inactive
                        </Dropdown.Item>
                      )}
                      {!item.isActive && (
                        <Dropdown.Item
                          onClick={(e) =>
                            handleChangeStatus(e, item.id, item.isActive)
                          }
                          className="w-full h-[40px]  text-green-400 justify-center"
                        >
                          Active
                        </Dropdown.Item>
                      )}
                      {!item.isIncomplete && (
                        <Dropdown.Item
                          onClick={(e) => handleMakeToDraft(item.id)}
                          className="w-full h-[40px] text-yellow-400 justify-center"
                        >
                          Draft
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        onClick={(e) => handleDeleteCompletedProduct(item.id)}
                        className="w-full text-red-600 h-[40px] justify-center"
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
        {localProduct.length == 0 && (
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
export default ViewProduct;
