import { Content, Footer } from "antd/es/layout/layout";
import React, { useEffect, useRef } from "react";
import TypeWriter from "./mainComponent/TypeWriter";
import ModalDialog from "./mainComponent/ModalDialog";
import TypeWriterStart from "./mainComponent/TypeWritterStart";
import AvatarUser from "./mainComponent/Avatar";
import ModalDialog2 from "./mainComponent/ModalDialog2";
import * as motion from "motion/react-client";
import CarouselProduct from "../../components/common/Carousel";
import { animated } from "@react-spring/web";
import CarouselProductBenefits from "../../components/common/CarouselProductBenefits";
import ProductBenefits from "../../components/common/CardProductBenefits";
import CardIcon from "../../components/common/CardIcon";
const MainHomePage = () => {
  return (
    <>
      <main className="w-full Hide-Scrollbar h-[100vh] Hide-Scrollbar ">
        <div className="w-[100vw] bg-red-500 grid grid-cols-5 grid-rows-1">
          <div className="banner bg-center bg-no-repeat bg-cover col-span-5 h-[70vh] bg-[url('https://images.pexels.com/photos/11542516/pexels-photo-11542516.jpeg')]">1
          </div>
          <nav className="col-span-2 bg-blue-300">
          </nav>
          <div className="content col-span-3 bg-green-500 h-[120vh]">3</div>
        </div>

      </main>
    </>
  );
};

export default MainHomePage;
