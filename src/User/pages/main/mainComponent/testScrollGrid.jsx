import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SplitText from "../../../../Admin/components/common/TextPopup/SplitText";
import ModalDialog2 from "./ModalDialog2";
const ScrollGridV2 = () => {
  const boxRef = useRef(null);
  const secondRef = useRef(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(boxRef.current, {
      scrollTrigger: {
        trigger: boxRef.current, // The element that triggers the animation
        start: "top top", // When the top of the box hits the top of the viewport
        end: "bottom top", // When the bottom of the box hits the top of the viewport
        toggleActions: "play none none reverse", // Controls the animation
        markers: false, // Show markers for debugging
      },
      x:-80,
      opacity: 0.5, // Example animation (fade out)
      duration: 1, // Animation duration
    });

    gsap.to(secondRef.current, {
      scrollTrigger: {
        trigger: secondRef.current, // The element that triggers the animation
        start: "top top", // When the top of the box hits the top of the viewport
        end: (e) => {
            console.log("End Triggered:", e); // This logs the scroll trigger event
            boxRef.current.style.backgroundColor = "yellow"; // You can style it here
          }, // When the bottom of the box hits the top of the viewport
        toggleActions: "play none none reverse", // Controls the animation
        markers: false, // Show markers for debugging
      },
      x:80,
      opacity: 0.3, // Example animation (fade out)
      duration: 1, // Animation duration
    });
  }, []);

  return (
    <>
    
      {/* <SplitText/> */}
    <div className=" flex bg-gray-800 overflow-hidden justify-between" style={{ minHeight: "500vh" ,display:'flex',alignItems:'center'}}> {/* Scrollable space */}
      
      <div
        ref={boxRef}
        style={{
          height: "50vh", // Example: element that is 50% of the viewport height
          background: "red",
          margin: "20px 0",
        }}
      >
        This element first will fade when it scrolls into view
      </div>
      <div
        ref={secondRef}
        style={{
          height: "50vh", // Example: element that is 50% of the viewport height
          background: "blue",
          margin: "20px 0",
        }}
      >
        
        This element second will fade when it scrolls into view
      </div>
    </div>
        <ModalDialog2/>
    </>
  );
};

export default ScrollGridV2;
