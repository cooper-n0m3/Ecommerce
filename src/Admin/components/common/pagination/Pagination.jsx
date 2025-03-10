import React, { useEffect } from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../../redux/features/products/productActions";
const PagePagination = ({product}) => {
  const dispatch = useDispatch();
  const { currentPage,itemsPerPage, } = useSelector(
    (state) => state.product
  );
  useEffect(()=>{
    dispatch(setPage(1))
  },[product])

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
        className="bg-gray-600 text-gray-300 border border-gray-400 rounded"
        defaultCurrent={currentPage}
        total={Math.ceil(product.length / itemsPerPage) * 10}
        showSizeChanger={false}
      />
    </>
  );
};
export default PagePagination;
