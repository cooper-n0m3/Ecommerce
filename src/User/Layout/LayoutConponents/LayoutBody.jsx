import Layout, { Content } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";
import LayoutFooter from "./LayoutFooter";

const LayoutBody = () => {
 
  return (
    <>
      <Layout>
        <Content
         style={{
          // backgroundImage: `
          //   linear-gradient(to right, #e2e8f0 1px, transparent 1px),
          //   linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            
          // `,
          backgroundSize: '40px 40px',
        }}
        className="h-[100vh] relative bg-white">
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
