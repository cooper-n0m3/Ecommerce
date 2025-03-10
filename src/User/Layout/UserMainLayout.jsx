import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import "../style/UserApp.css";
// import Button from
import React, { useEffect, useRef, useState } from "react";
import LayoutHeader from "./LayoutConponents/LayoutHeader";
import LayoutBody from "./LayoutConponents/LayoutBody";

const UserMainLayout = () => {

  return (
    <>
      <Layout className={``}>
        {/* Header layout */}
        <LayoutHeader />
        {/* Body Layout */}
        <LayoutBody/>
        {/* Footer */}
      </Layout>
    </>
  );
};

export default UserMainLayout;
