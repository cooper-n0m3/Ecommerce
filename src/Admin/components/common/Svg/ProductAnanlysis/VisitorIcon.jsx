import React from "react";

export const DownStatistic = () => {
  return (
    <>
      <div className="card-icon p-2 bg-gray-800 text-xl rounded-full aspect-square  flex items-center justify-center">
        <code
          style={{ textShadow: "var(--textShadow)" }}
          className=" font-bold text-red-500 z-10 relative bottom-0"
        >
          -0.9%
        </code>
        <svg
          className="w-[40px] h-[40px] absolute  text-red-500 border border-red-500  rounded-full"
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
            strokeWidth="1.9"
            d="M4 4.5V19a1 1 0 0 0 1 1h15M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207"
          />
        </svg>
      </div>
    </>
  );
};
