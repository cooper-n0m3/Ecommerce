import React, { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reviews from "./Reviews";

import AnimatedBox from "../../../../components/common/AnimatedBox";
import AnimatedText from "../../../../components/common/TextInitialize";
import { Link } from "react-router-dom";
const LazyMap = React.lazy(()=>import('./LazyMap'))
import { amenitiesIcons } from "../../../store/hotelStore";
import { Clock, CreditCard, Droplets, Hotel, ListChecks, MapPin, Star } from "lucide-react";

const HotelListCard = ({ hotel }) => {
  const [activeTab, setActiveTab] = useState("Rooms");
  const tabs = ["Rooms", "Reviews", "Details & Google-Map", "Policies"];
  const [isOpen, setIsOpen] = useState(null);


  const handleTabClick = (tab) => setActiveTab(tab);

  const handleIsReviewOpen = (openId) => {
    if (openId === isOpen) {
      setIsOpen(null);
    } else {
      setIsOpen(openId);
    }
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "Rooms":
        return (
          <div className="space-y-4 ">
            {hotel.sections.rooms.map((room, index) => (
              <div
                key={`${room.id}-${index}`}
                className=" gap-2  group w-full relative grid grid-flow-col grid-cols-4"
              >
                <motion.div
                style={{
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
                  // initial={{ backgroundColor: "white" }}
                  className="col-span-4 border group-hover:scale-y-[1.05] group-hover:shadow-sm bg-slate-50 rounded p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{room.type}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {room.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ${room.price}
                        <span className="text-sm font-normal text-gray-600">
                          {" "}
                          / night
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">+ taxes & fees</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center text-sm text-gray-700 bg-slate-200 px-2 py-1 rounded"
                      >
                        {amenitiesIcons[amenity]}
                        <span className="ml-1 capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p>
                        {room.size} • {room.beds}
                      </p>
                      <p>Sleeps {room.capacity}</p>
                    </div>
                    <Link
                      to={`/my-bookings?hotelId = ${hotel.id} & roomId= ${room.id}`}
                    >
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
                        Book Now
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
                {/* Top line - grows upward */}
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
              </div>
            ))}
          </div>
        );
      case "Reviews":
        return (
          <div
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#888 transparent",
              overflowY: "auto",
              maxHeight: "60vh",
            }}
            className="w-full overflow-y-scroll bg-white  p-4  rounded-lg"
          >
            {/* <h2 className="text-2xl text-center border text-green-400 border-green-200">
              Customer feedbacks.
            </h2> */}
            {hotel.sections.reviews.map((review,index) => (
              <Reviews
                key={`${review.id}-${index}`}
                id={review.id}
                data={review}
                isOpenId={isOpen}
                handleIsOpen={handleIsReviewOpen}
              />
            ))}
          </div>
        );
      case "Details & Google-Map":
        return (
          <div className="bg-white rounded-lg  p-6">
            <h3 className="text-lg font-bold mb-4">Details & Google-Map</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Hotel className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">{hotel.name}</p>
                  <p className="text-gray-600 ">
                    {hotel.policies.checkIn} / {hotel.policies.checkOut}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">{hotel.location}</p>
                  <Suspense fallback={<div>Loading map...</div>}>
                    <LazyMap src={hotel?.mapSrc}/>
                  </Suspense>
                </div>
              </div>
              <div className="flex items-start">
                <ListChecks className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">Amenties</p>
                  <div className="mt-3 flex  flex-wrap gap-2">
                    {hotel.amenities.general
                      .filter((item) => item.available)
                      .map((amenity) => (
                        <div
                          key={`${amenity.id}-${amenity}`}
                          className="flex items-center text-sm text-gray-600 bg-slate-100 px-2 py-1 rounded"
                        >
                          {amenitiesIcons[amenity.icon]}
                          <span className="ml-1 capitalize">
                            {amenity.name}
                          </span>
                        </div>
                      ))}
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        );
      case "Policies":
        return (
          <div className="bg-white rounded-lg  p-6">
            <h3 className="text-lg font-bold mb-4">Policies</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">Check-in/Check-out</p>
                  <p className="text-gray-600">
                    {hotel.policies.checkIn} / {hotel.policies.checkOut}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">Cancellation Policy</p>
                  <p className="text-gray-600">{hotel.policies.cancellation}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Droplets className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">Pet Policy</p>
                  <p className="text-gray-600">{hotel.policies.pets}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" pt-5 border-y overflow-hidden mb-8">
      <div className="md:flex  grid grid-flow-col grid-cols-3 ">
        <div className="col-span-1 group p-3 md:w-1/3 h-48 md:h-auto relative">
          <AnimatedBox className="w-full select-none h-full rounded-md overflow-hidden border border-blue-400 ">
            <img
              className="w-full group-hover:scale-105 ease-in-out transition-all duration-300 h-full object-cover bg-no-repeat"
              src={hotel.image}
              alt={hotel.name}
              loading="lazy"
            />
          </AnimatedBox>
          {hotel.available ? (
            <button className="absolute top-5 right-5 bg-green-500/10 border rounded-md cursor-default border-green-500 px-4 py-[3px] text-green-500 text-md">
              Available
            </button>
          ) : (
            <button className="absolute top-5 right-5 bg-yellow-500/10 border rounded-md cursor-default border-yellow-300 px-4 py-[3px] text-yellow-300 text-md">
              Under Maintenance
            </button>
          )}
        </div>

        <div className="col-span-2   p-3 md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <AnimatedText
                text={hotel.name}
                className="text-xl font-bold text-gray-900"
                as="div"
                staggerDelay={0.03}
                animation={{
                  opacity: [0, 1],
                  y: [30, 0],
                  rotate: [-5, 0],
                }}
              />
              <div className="text-gray-600 flex items-center mt-1 cursor-pointer hover:text-blue-400 transition-all delay-75">
                <MapPin className="h-4 w-4 mr-1" />{" "}
                <AnimatedText
                  text={hotel.location}
                  as="div"
                  staggerDelay={0.03}
                  animation={{
                    opacity: [0, 1],
                    y: [30, 0],
                    rotate: [-5, 0],
                  }}
                />
              </div>
            </div>

            <AnimatedBox>
              <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                <span className="mx-1 text-gray-400">|</span>
                <span className="text-sm text-gray-600">
                  {hotel.reviews} reviews
                </span>
              </div>
            </AnimatedBox>
          </div>
          <AnimatedBox>
            <div className="my-2">
              <div className="relative p-1 rounded-lg inline-flex">
                {tabs.map((tab) => (
                  <button
                    key={`${hotel.id}-${tab}`}
                    onClick={() => handleTabClick(tab)}
                    className={`relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab
                        ? "text-blue-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId={`activeTabBg-${hotel.id}`}
                        className="absolute inset-0 border-b border-blue-500 z-0"
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
                  className="mt-2 p-4 flex flex-col  rounded-lg"
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedBox>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HotelListCard, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.hotel) === JSON.stringify(nextProps.hotel);
});
