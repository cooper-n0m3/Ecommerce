import Layout, { Content } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";
import LayoutFooter from "./LayoutFooter";

const LayoutBody = () => {
  return (
    <>
      <Layout>
        <Content className="h-[100vh] w-[100vw] flex justify-center items-start  bg-gray-900 text-gray-200">
            {/* Contents outlet */}
          <Outlet />
          {/* Footer */}
          {/* <LayoutFooter /> */}
        </Content>
      </Layout>
    </>
  );
};

export default LayoutBody;
