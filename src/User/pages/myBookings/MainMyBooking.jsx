import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FrmSearchRoom from "../main/mainComponent/FrmSearchRoom";
import AnimatedText from "../../../components/common/TextInitialize";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Droplets,
  Tv,
  Utensils,
  Snowflake,
  Dumbbell,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimateOnceBox from "../../../components/common/AnimatedBox";
import { Button } from "@mui/material";
import ScrollToTop from "../../../components/common/ScrollToTop";
import PreviewSlider from "../../../Admin/pages/roomPage/components/PreviewSlider";

const MotionTabs = () => {
  const amenities = ["wifi", "ac", "tv"];
  const [activeTab, setActiveTab] = useState("Booked");
  const tabs = ["Booked", "Saved"];
  const handleTabClick = (tab) => setActiveTab(tab);
  const amenitiesIcons = {
    wifi: <Wifi className="h-4 w-4" />,
    breakfast: <Coffee className="h-4 w-4" />,
    ac: <Snowflake className="h-4 w-4" />,
    tv: <Tv className="h-4 w-4" />,
    minibar: <Droplets className="h-4 w-4" />,
    gym: <Dumbbell className="h-4 w-4" />,
    restaurant: <Utensils className="h-4 w-4" />,
  };

  const renderTab = () => {
    switch (activeTab) {
      case "Booked":
        return (
          <>
            <AnimateOnceBox>
              <motion.div className="w-full  relative grid gap-7 p-5 grid-flow-col grid-cols-3  rounded ">
                <div className="relative">
                  <PreviewSlider arrayImg={[0, 1, 2, 3]} />

                  <span className="absolute select-none right-2 top-2  py-[3px] text-green-500 bg-green-500/10 rounded px-2 border-green-500 border">
                    Booked
                  </span>
                </div>
                <motion.div
                  whileHover={{
                    background:
                      "linear-gradient(white, white),linear-gradient(to right, #ff8a00, #ffd700, #da1b60)",
                    backgroundOrigin: "padding-box, border-box",
                    backgroundClip: "padding-box, border-box",
                    border: "1px solid transparent",
                    scale: 1.01,
                    transition: { type: "spring", damping: 10 },
                    boxShadow: [
                      "9px 9px 16px rgba(0,0,0,0.1)",
                      "-9px -9px 16px rgba(255,255,255,0.8)",
                    ],
                  }}
                  className="relative  group border col-span-2 rounded p-4"
                >
                  <div className="flex  justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Deluxe Ocean View
                      </h3>
                      <p className="text-sm font-bold text-gray-900/60 mb-2">
                        Spacious room with panoramic ocean views and premium
                        amenities.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        $100
                        <span className="text-sm font-normal text-gray-600">
                          {" "}
                          / night
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">+ taxes & fees</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex  items-center text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                      >
                        {amenitiesIcons[amenity]}
                        <span className="ml-1 capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-600 gap-2 flex items-center mt-1 cursor-pointer hover:text-blue-400 transition-all delay-75">
                    <MapPin className="h-4 w-4 mr-1" /> San Francisco, CA
                  </div>
                  <div className="flex mt-2 max-w-40 items-center text-sm text-green-700 border border-green-700 bg-green-700/10 px-2 py-1 rounded">
                    <span className="ml-1 capitalize">Grand Marina Hotel</span>
                  </div>
                  <div className="mt-4  flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p>650 sq ft • King Bed</p>
                      <p>Sleeps 5</p>
                    </div>
                  </div>

                  <div className="space-x-2  bottom-3 right-3 absolute">
                    <Link to={`/my-bookings?hotelId = 1 & roomId= 4`}>
                      <motion.button
                        className="text-red-600 border border-red-600 font-medium py-2 px-4 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 3,
                        }}
                      >
                        Remove
                      </motion.button>
                    </Link>
                    <Link>
                      <motion.button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 3,
                        }}
                      >
                        Paid now!
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>

                <span
                  className="absolute
                    left-0
                    bottom-1/2
                    h-7
                    w-[5px]
                    group-hover:w-[8px]
                    bg-[rgb(255,165,31)]  // Consistent blue
                    transition-all
                    duration-500
                    rounded-t
                    -translate-x-1/2
                    group-hover:h-14
                    group-hover:bg-[rgb(230,226,37)]  // Darker blue on hover
                    origin-bottom"
                ></span>
                <span
                  className="
                    absolute
                    left-0
                    top-1/2
                    h-7
                    w-[5px]
                    group-hover:w-[8px]
                    bg-[rgb(255,165,31)]  // Same exact blue
                    rounded-b
                    transition-all
                    duration-500
                    -translate-x-1/2
                    group-hover:h-14
                    group-hover:bg-[rgb(230,226,37)]  // Same hover color
                    origin-top
                  "
                ></span>
              </motion.div>
            </AnimateOnceBox>
          </>
        );
      case "Pending":
        return (
          <AnimateOnceBox>
            <div className="my-2">
              <div className="relative px-2 py-3">
                <header className="">
                  <AnimatedText
                    text={"Complete your booking."}
                    as="div"
                    className="text-4xl font-extrabold text-black mb-2"
                    staggerDelay={0.03}
                    animation={{
                      opacity: [0, 1],
                      y: [30, 0],
                      rotate: [-5, 0],
                    }}
                  />
                </header>
              </div>
              <div className=" w-full  justify-end p-1 rounded-lg inline-flex">
                {" "}
                {/* Added subtle bg */}
                {tabs.map((tab, index) => (
                  <button
                    key={`${index}-${tab}`}
                    onClick={() => handleTabClick(tab)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab
                        ? "text-blue-500 font-semibold"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabBg" // Use consistent ID for all tabs
                        className="absolute inset-0 border-b-2 border-blue-500 pointer-events-none"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 relative group min-h-[40vh] p-4 border rounded-lg shadow-sm" // Added bg and shadow
                >
                  {/* Your actual tab content here */}
                  {activeTab === "Booked" && <div>Tab 1 Content</div>}
                  {activeTab === "Pending" && <div>Tab 2 Content</div>}

                  <span
                    className="absolute
                    left-0
                    bottom-1/2
                    h-7
                    w-[5px]
                    bg-[rgb(255,165,31)]  // Consistent blue
                    transition-all
                    duration-500
                    rounded-t
                    -translate-x-1/2
                    group-hover:h-14
                    group-hover:bg-[rgb(230,226,37)]  // Darker blue on hover
                    origin-bottom"
                  ></span>
                  <span
                    className="
                    absolute
                    left-0
                    top-1/2
                    h-7
                    w-[5px]
                    bg-[rgb(255,165,31)]  // Same exact blue
                    rounded-b
                    transition-all
                    duration-500
                    -translate-x-1/2
                    group-hover:h-14
                    group-hover:bg-[rgb(230,226,37)]  // Same hover color
                    origin-top
                  "
                  ></span>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimateOnceBox>
        );
    }
  };

  const [scrollY, setScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const mainRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (!mainRef.current) return;

    const currentScrollY = mainRef.current.scrollTop;
    setScrollY(currentScrollY);
    setIsScroll(() => {
      if (currentScrollY > 50) return true;
      return false;
    });
    setIsScrollingDown(currentScrollY > lastScrollY.current);
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    mainElement.addEventListener("scroll", handleScroll);
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const targetRef = useRef(null);
  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


 

  return (
    <main
      ref={mainRef}
      className="w-[100vw] h-[100vh] grid grid-cols-5 Hide-Scrollbar pt-[7vh] px-[5rem]"
    >
      <header
        ref={targetRef}
        className="relative group  mt-10 my-2 col-span-5 px-16"
      >
        <div className="px-10 mb-1">
          <AnimatedText
            text={"Cambodia Stays"}
            className="text-2xl font-bold text-gray-900"
            as="div"
            staggerDelay={0.03}
            animation={{
              opacity: [0, 1],
              y: [30, 0],
              rotate: [-5, 0],
            }}
          />
          <p>
            Explore Cambodia’s top stays– from Siem Reap’s temple-view resorts
            to Koh Rong’s beaches and Phnom Penh’s cultural hubs. Find your
            perfect retreat and book today!
          </p>
        </div>

        <span
          className="
                        absolute
                          left-[4.5rem]
                          bottom-1/2
                          h-5
                          w-[7px]
                          bg-[rgb(255,165,31)]  // Consistent blue
                          transition-all
                          duration-500
                          rounded-t
                          -translate-x-1/2
                          group-hover:h-8
                          group-hover:bg-[rgb(230,226,37)]  // Darker blue on hover
                          origin-bottom
                      "
        ></span>
        <span
          className="
                          absolute
                          left-[4.5rem]
                          top-1/2
                          h-5
                          w-[7px]
                          bg-[rgb(255,165,31)]  // Same exact blue
                          rounded-b
                          transition-all
                          duration-500
                          -translate-x-1/2
                          group-hover:h-8
                          group-hover:bg-[rgb(230,226,37)]  // Same hover color
                          origin-top
                        "
        ></span>
      </header>
      <div className="w-full col-span-5 relative space-y-8 bg-white rounded-lg shadow-sm mt-5  p-4 md:p-8">
        <div className=" flex justify-center">
          <FrmSearchRoom className="border w-full space-x-2 bg-white" />
        </div>

        {/* HEader */}
        <AnimateOnceBox>
          <div className="my-2">
            <div className="relative px-2 py-3">
              <header className="relative group  mt-10 my-2 col-span-5 px-16">
                <div className="px-10 mb-1">
                  <AnimatedText
                    text={"Cambodia Stays"}
                    className="text-2xl font-bold text-gray-900"
                    as="div"
                    staggerDelay={0.03}
                    animation={{
                      opacity: [0, 1],
                      y: [30, 0],
                      rotate: [-5, 0],
                    }}
                  />
                  <p>
                    Explore Cambodia’s top stays– from Siem Reap’s temple-view
                    resorts to Koh Rong’s beaches and Phnom Penh’s cultural
                    hubs. Find your perfect retreat and book today!
                  </p>
                </div>

                <span
                  className="
                             absolute
                               left-[4.5rem]
                               bottom-1/2
                               h-5
                               w-[7px]
                               bg-[rgb(255,165,31)]  // Consistent blue
                               transition-all
                               duration-500
                               rounded-t
                               -translate-x-1/2
                               group-hover:h-8
                               group-hover:bg-[rgb(230,226,37)]  // Darker blue on hover
                               origin-bottom
                           "
                ></span>
                <span
                  className="
                               absolute
                               left-[4.5rem]
                               top-1/2
                               h-5
                               w-[7px]
                               bg-[rgb(255,165,31)]  // Same exact blue
                               rounded-b
                               transition-all
                               duration-500
                               -translate-x-1/2
                               group-hover:h-8
                               group-hover:bg-[rgb(230,226,37)]  // Same hover color
                               origin-top
                             "
                ></span>
              </header>
            </div>
            <div className=" w-full  justify-end p-1 rounded-lg inline-flex">
              {" "}
              {/* Added subtle bg */}
              {tabs.map((tab, index) => (
                <button
                  key={`${index}-${tab}`}
                  onClick={() => handleTabClick(tab)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab
                      ? "text-blue-500 font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabBg" // Use consistent ID for all tabs
                      className="absolute inset-0 border-b-2 border-blue-500 pointer-events-none"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="mt-2 relative group min-h-[40vh] border rounded-md shadow-sm" // Added bg and shadow
              >
                {renderTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimateOnceBox>
        {/* Label Header */}
        <div className="relative ">
          <header className="">
            <AnimatedText
              text={"Top Rooms"}
              as="div"
              className="text-2xl !font-[500] text-black mb-2"
              staggerDelay={0.03}
              animation={{
                opacity: [0, 1],
                y: [30, 0],
                rotate: [-5, 0],
              }}
            />
          </header>
        </div>
        <AnimateOnceBox>
          <div className="w-full relative grid gap-7 p-4 grid-flow-col grid-cols-3  rounded border border-gray-500/20">
            <div className="relative">
              <PreviewSlider arrayImg={[4, 5, 6, 7]} />
              <span className="absolute select-none right-2 top-2  py-[3px] text-green-500 bg-green-500/10 rounded px-2 border-green-500 border">
                Booked
              </span>
            </div>
            <motion.div
              initial={{
                backgroundColor: "white",
              }}
              whileHover={{
                background:
                  "linear-gradient(white, white), linear-gradient(to right, #ff8a00, #da1b60)",
                backgroundOrigin: "padding-box, border-box",
                backgroundClip: "padding-box, border-box",
                border: "1px solid transparent",
                y: -5,
                transition: { type: "spring", damping: 10 },
                boxShadow: [
                  "9px 9px 16px rgba(0,0,0,0.1)",
                  "-9px -9px 16px rgba(255,255,255,0.8)",
                ],
              }}
              className="relative group border col-span-2 rounded p-4"
            >
              <span
                className="
                    absolute
                    left-0
                    bottom-1/2
                    h-5
                    w-[7px]
                    bg-[rgb(255,165,31)]  // Consistent blue
                    transition-all
                    duration-500
                    rounded-t
                    -translate-x-1/2
                    group-hover:h-8
                    group-hover:bg-[rgb(230,226,37)]  // Darker blue on hover
                    origin-bottom
                  "
              ></span>
              {/* Bottom line - grows downward */}
              <span
                className="
                    absolute
                    left-0
                    top-1/2
                    h-5
                    w-[7px]
                    bg-[rgb(255,165,31)]  // Same exact blue
                    rounded-b
                    transition-all
                    duration-500
                    -translate-x-1/2
                    group-hover:h-8
                    group-hover:bg-[rgb(230,226,37)]  // Same hover color
                    origin-top
                  "
              ></span>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Deluxe Ocean View
                  </h3>
                  <p className="text-sm font-bold text-gray-700 mb-2">
                    Spacious room with panoramic ocean views and premium
                    amenities.
                  </p>
                  <AnimatedText
                    text={""}
                    as="div"
                    className="text-sm font-bold text-gray-900 mb-2"
                    staggerDelay={0.03}
                    animation={{
                      opacity: [0, 1],
                      y: [30, 0],
                      rotate: [-5, 0],
                    }}
                  />
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    $100
                    <span className="text-sm font-normal text-gray-600">
                      {" "}
                      / night
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">+ taxes & fees</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                  >
                    {amenitiesIcons[amenity]}
                    <span className="ml-1 capitalize">{amenity}</span>
                  </div>
                ))}
              </div>
              <div className="text-gray-600 gap-2 flex items-center mt-1 cursor-pointer hover:text-blue-400 transition-all delay-75">
                <MapPin className="h-4 w-4 mr-1" /> San Francisco, CA
              </div>
              <div className="flex max-w-40 items-center text-sm text-green-700 border border-green-700 bg-green-700/10 px-2 py-1 rounded">
                <span className="ml-1 capitalize">Grand Marina Hotel</span>
              </div>
              <div className="mt-4  flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>650 sq ft • King Bed</p>
                  <p>Sleeps 5</p>
                </div>
              </div>

              <div className="space-x-2  bottom-3 right-3 absolute">
                <Link to={`/my-bookings?hotelId = 1 & roomId= 4`}>
                  <motion.button
                    className="text-red-600 border border-red-600 font-medium py-2 px-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 3,
                    }}
                  >
                    Remove
                  </motion.button>
                </Link>
                <Link>
                  <motion.button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 3,
                    }}
                  >
                    Paid now!
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            <span className="absolute select-none -left-5 top-7 -rotate-45 py-[3px] text-green-500 bg-green-500/10 rounded px-2 border-green-500 border">
              Grand Marina Hotel
            </span>
          </div>
        </AnimateOnceBox>
        <div className=" flex justify-center">
          <Button
            sx={{
              border: "1px solid rgb(49 196 141 / var(--tw-border-opacity, 1))",
            }}
            className="!px-[5px] !justify-self-end !items-end !py-[7px] !border !normal-case !text-green-500 !rounded-none "
          >
            Load more...
          </Button>
        </div>
        {isScroll && (
          <Button
            onClick={scrollToTarget}
            sx={{
              border: "1px solid rgb(49 196 141)",
              minWidth: 0, // Removes MUI's default min-width
              width: 55, // 40px (10 = 2.5rem, adjust as needed)
              height: 55, // 40px
              padding: 0, // Removes internal padding
              borderRadius: 100, // Optional: removes rounded corners
            }}
            className="text-green-500 !bottom-5 !right-5 !fixed !bg-green-500/20 hover:!bg-green-500/30 normal-case"
          >
            <ChevronUp className="text-green-500" size={25} />
          </Button>
        )}
      </div>
    </main>
  );
};

export default MotionTabs;
