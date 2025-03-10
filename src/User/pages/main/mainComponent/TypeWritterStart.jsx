import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypeWriterStart = ({ text, speed = 100, fontSize = "24px", fontWeight = "normal" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typeText = () => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }
    };

    const intervalId = setInterval(typeText, speed); // Use setInterval to control typing speed

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [index, text, speed]); // Ensure effect runs when index or text changes

  return (
    <motion.div
      className="flex text-gray-600 text-opacity-55 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        // fontFamily: "cursive",
        whiteSpace: "pre-wrap",
        fontSize: fontSize,  // Dynamically set font size
        fontWeight: fontWeight, // Dynamically set font weight
      }}
    >
      {displayedText}
    </motion.div>
  );
};

export default TypeWriterStart;
