import React, { useState, useRef, useEffect } from "react";
import HotelListCard from "./HotelListCard";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { hotelsData } from "../../../store/hotelData";
const HotelRoomCard = () => {
 
  // const handleTabChangesHotel
  return (
    <div className="flex bg-slate-100 items-center  flex-col md:flex-row gap-8 ">
      {/* Hotels List */} 
      <div className="px-10 ">
        {hotelsData.map((hotel, index) => (
          <HotelListCard key={hotel.id} hotel={hotel} />
        ))}

        <div className="mb-[10px] flex justify-center">
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
  );
};

export default HotelRoomCard;
