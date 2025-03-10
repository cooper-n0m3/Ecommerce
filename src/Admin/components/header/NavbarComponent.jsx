import React from "react";
import { Dropdown } from "flowbite-react";
const NavbarComponent = () => {
  return (
    <>
      <nav className="header-container fixed top-0 px-2 z-50 w-full   bg-gray-800 dark:border-gray-700">
        {/* Header Container */}
        <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Brand Container */}
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Flowbite
            </span>
          </a>
          {/* End Brand Container */}

          {/* Avatar container */}
          <div className="flex  items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex border text-sm bg-gray-800 rounded-full md:me-0 "
              // id="user-menu-button"
              // aria-expanded="false"
              // data-dropdown-toggle="user-dropdown"
              // data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg"
                alt="user photo"
              />
            </button>
          </div>
          {/* End Avatar container */}
        </div>
        {/*End Header Container */}
      </nav>
    </>
  );
};

export default NavbarComponent;
