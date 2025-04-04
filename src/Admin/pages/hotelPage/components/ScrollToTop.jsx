import { Tooltip } from "antd";
import React, { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: "smooth", // Smooth scrolling
    });
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
        <button
          className="bg-gray-700 scrollToTop opacity-70 border text-[3px] border-gray-600 "
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "55%",
            width: "30px",
            height: "30px",
            color: "white",
            borderRadius: "50%",
            fontSize: "20px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",

          }}
          
          onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          ↑
        </button>
    )
  );
}
