import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap-trial/all";
import ScrollGridV2 from "./testScrollGrid";

const ScrollGrid = () => {
  const boxRef = useRef(null);
  const wrapperBox = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ trialWarn: false });
  useEffect(() => {
    gsap.to(boxRef.current, {
      scrollTrigger: {
        trigger: boxRef.current, // The element that triggers the animation
        start: "top center", // When top of `.box` hits center of viewport
        // end: "bottom bottom", // When bottom of `.box` hits top of viewport
        toggleActions: "play none none reverse",
        markers: true,
        onEnter: () => {
          gsap.to(boxRef.current, { opacity: 1, duration: 1 });
        },
        onLeave: () => {
          gsap.to(boxRef.current, { opacity: 0, duration: 1 });
        },
        onEnterBack: () => {
          gsap.to(boxRef.current, { opacity: 1, duration: 1 });
        },
        onLeaveBack: () => {
          gsap.to(boxRef.current, { opacity: 0, duration: 1 });
        },
        // scrub:true
      },
      x: 400,
      duration: 3,
    });
  }, []);

  return (
    <>
    <ScrollGridV2/>
      {/* <div
        id="smooth-wraper"
        className="h-[450vh] z-0 relative flex flex-col items-center justify-center overflow-hidden bg-gray-300 "
      >
        <h1 className="title">ScrollSmoother</h1>
      </div>
      <div
        ref={boxRef}
        className="boxes -left-72 top-3/4 z-10 absolute h-[100vh] items-center   justify-center w-[50vw] flex gap-16"
      >
        <div className="box box-a h-[100px] w-[100px] bg-gray-600"></div>
        <div className="box box-b h-[100px] w-[100px] bg-red-400"></div>
        <div className="box box-c h-[100px] w-[100px] bg-blue-600"></div>
        <div className="box box-b h-[100px] w-[100px] bg-red-400"></div>
      </div> */}
    </>
  );
};

export default ScrollGrid;
