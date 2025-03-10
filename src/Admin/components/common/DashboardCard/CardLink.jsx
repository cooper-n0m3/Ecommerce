import React from "react";
import { useState } from "react";

const CardLink = () => {
  return (
    <button
      className="w-1/4 p-2  transition hover:scale-105  h-full rounded-lg flex justify-center items-center"
      style={{ backgroundColor: "var(--success)" }}
    >
      <div
        className="card-icon  text-xl w-1/5 rounded-full aspect-square  flex items-center justify-center"
        style={{ color: "var(--success)" }}
      >
        <ion-icon name="stats-chart"></ion-icon>
      </div>
      <div className="card-infor  text-white w-4/5 h-full  flex flex-col items-center justify-center">
        <small>Visitor</small>
        <div className="text-white">
          <font className="text-xl ">300</font>
          <small> a month</small>
        </div>
      </div>
    </button>
  );
};

export default CardLink;
