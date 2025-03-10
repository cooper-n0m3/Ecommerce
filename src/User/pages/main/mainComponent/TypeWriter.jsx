import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypeWriter = ({
  text,
  speed = 100,
  fontSize = "40px",
  fontWeight = "normal",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex < text.length) {
          setDisplayedText((prev) => prev + text[prevIndex]);
          return prevIndex + 1;
        }
        clearInterval(intervalId); // Clear interval when done
        return prevIndex;
      });
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]); // Only runs when `text` or `speed` changes

  return (
    <motion.div
      className="flex opacity-60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        whiteSpace: "pre-wrap",
        fontSize: fontSize,
        fontWeight: fontWeight,
      }}
    >
      <motion.div
        className="flex opacity-70 text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          whiteSpace: "pre-wrap",
          fontSize: fontSize,
          fontWeight: "bold",
          opacity: "0.8",
          lineHeight: "40px",
        }}
      >
        <span>
          {displayedText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ display: "inline-block", marginLeft: "2px", opacity: "0.5" }}
          >
            |
          </motion.span>
        </span>
      </motion.div>
    </motion.div>
  );
};

export default TypeWriter;
