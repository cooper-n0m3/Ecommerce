import React from "react";
import { Carousel } from "flowbite-react";

const PreviewSlider = ({ArrayImage}) => {
  
  const left = (
    <svg
      className="w-[35px] h-[35px] text-gray-400 hover:border border-gray-400 rounded-full dark:text-white"
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
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 19-7-7 7-7"
      />
    </svg>
  );
  const right = (
    <svg
    className="w-[35px] h-[35px] text-gray-400 hover:border border-gray-400 rounded-full dark:text-white"
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
        strokeLinejoin="round"
        strokeWidth={2}
        d="m9 5 7 7-7 7"
      />
    </svg>
  );
  return (
    <>
      <div className="h-40 text-gray-400 m-1 sm:h-48 xl:h-52 2xl:h-96">
        <Carousel control={{base:'hidden'}} leftControl={left} rightControl={right} >
          {
            ArrayImage.map((item,index)=>(
                <img key={index}
                  src={URL.createObjectURL(item)}
                  alt="..."
                />
            ))
          }
        </Carousel>
      </div>
    </>
  );
};

export default PreviewSlider;
