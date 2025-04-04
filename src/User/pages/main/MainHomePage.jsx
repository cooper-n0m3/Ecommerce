import React, { useCallback, useEffect, useRef, useState } from "react";
import FrmSearchRoom from "./mainComponent/FrmSearchRoom";
import HotelList from "./mainComponent/HotelList";
import "../../style/UserApp.css";
import SplitText from "./mainComponent/SplitText";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBox from "../../../components/common/AnimatedBox";
import { Empty } from "antd";
import AnimatedText from "../../../components/common/TextInitialize";
import ProgressButton from "../../../components/common/Progress";
import { Button } from "@mui/material";
import AnimateOnceBox from "../../../components/common/AnimatedBox";
import SortHotelCard from "./mainComponent/SortHotelCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarouselRenderBoxSlider from "../../../components/common/CarouselRenderBoxSlider";
import { Link } from "react-router-dom";
const MainHomePage = () => {
  const [activeTab, setActiveTab] = useState("🏙️ Phnom Penh");
  const targetRef = useRef(null);
  const targetRefTop = useRef(null);
  const carouselRef = useRef();
  const scrollToTarget = (getTarget) => {
    getTarget.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const handleTabClick = (tab) => setActiveTab(tab);
  const tabs = [
    "🏙️ Phnom Penh",
    "📍 Siem Reap(Angkor Wat)",
    "🏖️ Koh Rong",
    "🌿 Eco Retreats",
    "✨ Luxury Picks",
  ];

  const [scrollY, setScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isScroll, setIsScroll] = useState(false);
  const mainRef = useRef(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (!mainRef.current) return;

    const currentScrollY = mainRef.current.scrollTop;
    const maxScroll =
      (mainRef.current?.scrollHeight || 0) -
      (mainRef.current?.clientHeight || 0);
    const scrollPercent = (currentScrollY / maxScroll) * 100;

    setScrollPercent(scrollPercent);
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

  const renderTabSort = () => {
    switch (activeTab) {
      case "🏙️ Phnom Penh":
        return (
          <>
            <div className="grid gap-3 grid-flow-col grid-cols-4">
              <div className="col-span-1  w-full ">
                <SortHotelCard />
              </div>
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
            </div>
          </>
        );

      case "📍 Siem Reap(Angkor Wat)":
        return (
          <>
            <div className="grid gap-3 grid-flow-col grid-cols-4">
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
            </div>
          </>
        );
      case "🏖️ Koh Rong":
        return (
          <>
            <div className="grid gap-3 grid-flow-col grid-cols-4">
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
              <div className="col-span-1 w-full ">
                <SortHotelCard />
              </div>
            </div>
          </>
        );
      case "🌿 Eco Retreats":
        return <div></div>;
      case "✨ Luxury Picks":
        return <div></div>;
      default:
        return null;
    }
  };

  const handleClickRight = () => {
    carouselRef.current.next();
  };

  const handleClickLeft = () => {
    carouselRef.current.prev();
  };

  return (
    <>
      <main ref={mainRef} className="w-[100vw] Hide-Scrollbar h-[100vh]  ">
        <div
          ref={targetRefTop}
          className="w-full  relative  grid grid-cols-5 grid-rows-1"
        >
          <div className="relative  col-span-5 h-[75vh] bg-[url('/home-page.jpg')] bg-center bg-no-repeat bg-cover">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gray-400/5 to-gray-700/40"></div>
          </div>
          <div
            className="absolute  grid grid-flow-row  top-[50vh] left-1/2 z-20 rounded-md 
                  transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className=" select-none flex-col  text-center font-extrabold px-4  text-blue-200 flex justify-center items-center">
              <header className="mb-8">
                <SplitText Text="Find Your Perfect Stay" className="text-3xl" />
                <SplitText
                  className="text-sm"
                  Text="Discover and book hotels with the best amenities"
                />
              </header>
            </div>
            <FrmSearchRoom
              className="bg-white w-[60vw]"
              handleClickToTarget={(e) => scrollToTarget(targetRef)}
            />
          </div>
          <header className="relative group  mt-10  col-span-5 px-16">
            <div className="px-10 mb-1">
              <AnimatedText
                text={"Discover Cambodia’s Best Stays"}
                className="text-2xl font-bold text-gray-900"
                as="div"
                staggerDelay={0.03}
                animation={{
                  opacity: [0, 1],
                  y: [30, 0],
                  rotate: [-5, 0],
                }}
              />
              <p className="text-gray-600">
                Explore Cambodia’s finest accommodations—from Siem Reap’s
                temple-view resorts to Koh Rong’s beachfront villas and Phnom
                Penh’s urban charm. Find your ideal stay and embrace the
                kingdom’s magic.
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
          <div className=" group  col-span-5  px-16">
              <div className="w-full mt-2  bg-inherit ">
                <div className="relative w-full justify-center border-black/10 inline-flex">
                  <div className="flex absolute -top-7 space-x-1 pt-1  dark:bg-gray-800 rounded-lg">
                    {tabs.map((tab, index) => (
                      <button
                        key={`${index}-${tab}`}
                        onClick={() => handleTabClick(tab)}
                        className={`relative px-4 select-none py-2 text-sm font-medium rounded-md transition-all duration-200 z-10 ${
                          activeTab === tab
                            ? "text-black mt-3"
                            : "text-black/50 mb-4 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                        }`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <motion.div
                            layoutId="activeTabBg"
                            className="absolute -inset-[0.4rem] h-[3rem] bg-slate-100 border-[5px] border-white    z-[-1]"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={false}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="p-0 relative rounded-md bg-slate-100    "
                  >
                    <CarouselRenderBoxSlider
                      renderData={renderTabSort()}
                      ref={carouselRef}
                    />
                    <Button
                      onClick={handleClickLeft}
                      className="!absolute !bg-slate-100 !border-white !-left-7 !top-1/2 !normal-case !text-xs !text-green-400"
                      sx={{
                        minWidth: 0,
                        border: "5px solid",
                        width: "50px",
                        height: "50px",
                        padding: 0,
                        borderRadius: "50%",
                      }}
                    >
                      <ChevronLeft className="" size={25} />
                    </Button>
                    <Button
                      onClick={handleClickRight}
                      className="!absolute !bg-slate-100 !border-white !-right-7 !top-1/2 !normal-case !text-xs !text-green-400"
                      sx={{
                        minWidth: 0,
                        border: "5px solid",
                        width: "50px",
                        height: "50px",
                        padding: 0,
                        borderRadius: "50%",
                      }}
                    >
                      <ChevronRight className="" size={25} />
                    </Button>
                  </motion.div>
                </AnimatePresence>
                <div className="w-full mt-2  flex justify-center">
                  <Link to="/hotels">
                    <Button
                      className="!normal-case !text-xs !text-green-400"
                      sx={{
                        minWidth: 0,
                        width: "200px",
                        height: "35px",
                        padding: 0,
                        border: "1px solid",
                        borderRadius: "3px",
                        backgroundColor: "rgba(49, 196, 142, 0.062)",
                        "&:hover": {
                          backgroundColor: "rgb(49 196 141 / 0.3)",
                        },
                      }}
                    >
                      See more
                    </Button>
                  </Link>
                </div>
              </div>
          </div>
          <header className="relative group  my-2 col-span-5 px-16">
            <div className="px-10 mb-1">
              <AnimatedText
                text={"Popular destinations"}
                className="text-xl font-bold text-gray-900"
                as="div"
                staggerDelay={0.03}
                animation={{
                  opacity: [0, 1],
                  y: [30, 0],
                  rotate: [-5, 0],
                }}
              />
              <p className="text-gray-600">
                Explore Cambodia’s top stays– from Siem Reap’s temple-view
                resorts to Koh Rong’s beaches and Phnom Penh’s cultural hubs.
                Find your perfect retreat and book today!
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
          <div className="  col-span-5  px-16">
            <div className="grid  p-6  my-2 grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: "Angkor Wat",
                  image:
                    "https://media.istockphoto.com/id/1032930350/photo/view-of-angkor-wat-at-sunrise-archaeological-park-in-siem-reap-cambodia-unesco-world-heritage.jpg?s=612x612&w=0&k=20&c=-FuqiolxeleQ4uDUh8gk-yc4hkcGgOjV5foLNHiztn0=",
                },
                {
                  name: "Phnom Penh",
                  image:
                    "https://t4.ftcdn.net/jpg/04/27/16/01/360_F_427160100_ZHezGj0GODktzwjQyMUOmkLqhHp400cP.jpg",
                },
                {
                  name: "Koh Rong",
                  image:
                    "https://www.geckoroutes.com/wp-content/uploads/2023/02/Koh-Touch-Koh-Tui-village-in-Koh-Rong-island-in-Cambodia.jpg",
                },
                {
                  name: "Kep",
                  image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQduAanCBETbVZ8IamqJFvpXefvuQMGA2Js2g&s",
                },
              ].map((destination,index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden h-24 cursor-pointer group"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {destination.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex justify-center">
              <Button
                className="!normal-case !text-xs !text-blue-500"
                sx={{
                  minWidth: 0,
                  width: "200px",
                  height: "30px",
                  padding: 0,
                  border: "1px solid",
                  borderRadius: "3px",
                  backgroundColor: "rgba(49, 196, 142, 0.062)",
                  "&:hover": {
                    backgroundColor: "rgb(118 169 250 / 0.3)",
                  },
                }}
              >
                See more
              </Button>
            </div>
          </div>
          <header
            ref={targetRef}
            className="relative group  my-2 col-span-5 px-16"
          >
            <div className="px-10 mb-1">
              <AnimatedText
                text={"Cambodia Stays"}
                className="text-xl font-bold text-gray-900"
                as="div"
                staggerDelay={0.03}
                animation={{
                  opacity: [0, 1],
                  y: [30, 0],
                  rotate: [-5, 0],
                }}
              />
              <p className="text-gray-600">
                Explore Cambodia’s top stays– from Siem Reap’s temple-view
                resorts to Koh Rong’s beaches and Phnom Penh’s cultural hubs.
                Find your perfect retreat and book today!
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
          <div className="content  relative mt-5 px-16 col-span-5 ">
            <HotelList />
          </div>
          <header
            className="relative group  my-10 col-span-5 px-16"
          >
            <div className="px-10 mb-1 flex justify-center flex-col items-center">
              <h2 className="text-xl font-bold text-gray-900">
                <span className="text-indigo-500">Why</span> choose Us
              </h2> 
              <p className="w-[50%] text-center text-gray-600">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur, quod ea ut corrupti molestias tempora repellat
                accusamus doloremque earum similique!
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </header>


          {/* <div className="content col-span-1 bg-[url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D')] bg-contain bg-green-500 blob-box"></div> */}
          {isScroll && (
            <ProgressButton
              onClick={(e) => scrollToTarget(targetRefTop)}
              progress={scrollPercent}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default MainHomePage;
