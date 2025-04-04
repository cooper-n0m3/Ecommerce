import { Button } from "@mui/material";
import React, { useState } from "react";
import { Label, Select } from "flowbite-react";
import FormikPost from "./FormikPost";
import { Link } from "react-router-dom";
import {
  ValidationSchema,
  validationSchemaDraft,
} from "./authForm/FormValidation";
import { motion, AnimatePresence } from "framer-motion";

const PostProduct = () => {
  const [action, setAction] = useState(true);
  const handleSubmit = (id) => {
    const btnSubmit = document.querySelector("." + id);
    btnSubmit.click();
  };
  const handleStatus = (e) => {
    if (e.target.value == "Save") setAction(true);
    else {
      setAction(false);
    }
  };
  return (
    <>
    
      <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{
             duration: 0.7,
             scale: { type: "tween", visualDuration: 0.7, bounce: 0.7 },
           }}
        className="border  border-gray-500 flex p-3 items-center gap-3 justify-evenly mb-4 rounded-lg backdrop-blur-sm bg-gra-700/40"
      >
        <FormikPost />
      </motion.div>
    </>
  );
};
export default PostProduct;
