import { Field, Form, Formik } from "formik";
import React from "react";
import SelectRoom from "../../../Layout/LayoutConponents/MenuSelection";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import DateRangePicker from "../../../../Admin/pages/roomPage/components/DateRangePicker";
const FrmSearchRoom = ({handleClickToTarget,className=""}) => {
  const guestOption = [
    { value: "1 Guests", label: "1 Guests" },
    { value: "2 Guests", label: "2 Guests" },
    { value: "3 Guests", label: "3 Guests" },
    { value: "4 Guests", label: "4 Guests" },
  ];
  return (
    <Formik>
      {({ setFieldValue }) => {
        return (
          <Form className="">
            <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{
                 duration: 0.4,
                 scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
             }}
            className={`${className} divide-x divide-gray-300/40 grid grid-flow-col grid-cols-10 rounded-full p-2 `}>
              <div className="w-full  h-full col-span-2 flex items-center justify-center  max-w-xs mx-auto ">
                <SelectRoom
                  typeSelection={{ isSelectRoom: true }}
                  className="!rounded-l-full"
                  icon={
                    <svg
                      className="w-6 h-6 text-black "
                      aria-hidden="true"
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      strokeWidth={5}
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                      />
                    </svg>
                  }
                  defaultValue={[
                    { value: "Marriott", label: "Marriott" },
                    { value: "Hilton", label: "Hilton" },
                    { value: "Hyatt", label: "Hyatt" },
                    { value: "InterContinental", label: "InterContinental" },
                  ]}
                  title="Hotel"
                  defaultSelection="5-star"
                />
              </div>
              <div className="w-full flex-col col-span-4 h-full  flex items-center justify-center  max-w-xs mx-auto ">
                <DateRangePicker
                  placeholder={["check-in day", "check-out day"]}
                  name="cehck"
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="w-full h-full col-span-2 flex items-center justify-center  max-w-xs mx-auto ">
                <SelectRoom
                  icon={
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth={2}
                        d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                  }
                  title="Guests"
                  defaultValue={guestOption}
                  typeSelection={{isSelectGuests:true}}
                  defaultSelection="2 Guests"
                />
              </div>
              <motion.div className="w-full h-full col-span-2 flex items-center justify-center  max-w-xs mx-auto ">
                <Link
                onClick={handleClickToTarget}
                >
                  <motion.button
                    className="px-4 select-none h-10 text-xs rounded-full flex justify-center items-center cursor-pointer py-2  bg-black text-white hover:bg-black/90"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    
                  >
                    Go to Check
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FrmSearchRoom;
