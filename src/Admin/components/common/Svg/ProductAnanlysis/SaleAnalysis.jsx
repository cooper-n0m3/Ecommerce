import React from "react";

export const SaleSvg = () => {
  return (
    <>
      <svg
        className={`w-6 h-6 ${
          location.pathname === "/admin/product-analysis/sale"
            ? " svg-menu "
            : ""
        } text-gray-800 dark:text-white`}
        style={{
          color: `${
            location.pathname === "/admin/product-analysis/sale"
              ? "var(--blue)"
              : "var(--gray-dark)"
          }`,
        }}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"
        />
      </svg>
    </>
  );
};
