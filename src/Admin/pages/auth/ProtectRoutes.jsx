import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  approveProduct,
  bookingSummary,
  GET_bookings,
  GET_CharsetAsDaily,
  GET_hotels,
  GET_room,
  GET_Room_Summary,
  getCategory,
} from "../../../redux/features/store/storeActions.js";
import toast from "react-hot-toast";
const protectRoute_url = import.meta.env.VITE_API_PROTECT_ROUTE;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null);

  /* Fetch-Draft */

  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      
      if (!accessToken) {
        
        try {
          const response = await fetch(
            "http://localhost:3000/api/auth/refresh",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (data.status === 200) {
            sessionStorage.setItem("accessToken", data.accessToken);
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
          
      
        } catch (error) {
          console.log("Error", error);
          setIsAuthorized(false);
        }
      }
      try {
        const newAccessToken = sessionStorage.getItem("accessToken");
        const response = await fetch(
          "http://localhost:3000/auth/tokenValidation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === 200) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.log("Error", error);
        setIsAuthorized(false);
      }
    };
    checkTokenValidity();
  }, []);
  useEffect(() => {
    if (isAuthorized) {
      dispatch(bookingSummary());
      dispatch(GET_bookings());
      dispatch(GET_hotels());
      dispatch(GET_room());
      dispatch(GET_Room_Summary());
      dispatch(GET_CharsetAsDaily());
    }
  }, [isAuthorized, dispatch]);
  if (isAuthorized) {
    return children;
  } else {
    navigate("/auth/login");
    return null;
  }
};
export default ProtectedRoute;
