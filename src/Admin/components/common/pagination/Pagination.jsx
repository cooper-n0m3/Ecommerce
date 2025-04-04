import React, { useEffect } from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../../redux/features/store/storeActions";
const PagePagination = ({ bookings, className = "" }) => {
  const dispatch = useDispatch();
  const { currentPage, itemsPerPage } = useSelector((state) => state.store);
  useEffect(() => {
    dispatch(setPage(1));
  }, [bookings, dispatch]);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };
  return (
    <>
      <Pagination
        onChange={handlePageChange}
        simple={{
          readOnly: true,
        }}
        className={`bg-gray-600 w-32 text-gray-300 border border-gray-400 rounded ${className}`}
        defaultCurrent={currentPage}
        total={Math.ceil(bookings?.length / itemsPerPage) * 10}
        showSizeChanger={false}
      />
    </>
  );
};
export default PagePagination;
