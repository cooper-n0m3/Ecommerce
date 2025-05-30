import React from 'react';
import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";
const BannerRemind = () => {
  return (
    <Banner >
      <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex items-center">
          <small className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <MdAnnouncement className="mr-4 h-4 w-4" />
            <span className="[&_p]:inline">
              Some important fields(<p className='text-red-600'>*</p>) below must be completed if you want to save the product as a draft.&nbsp;
            </span>
          </small>
        </div>
        <BannerCollapseButton color="gray" className=" border-none bg-transparent text-gray-500 dark:text-gray-400">
          <HiX className="h-4 w-4" />
        </BannerCollapseButton>
      </div>
    </Banner>
  );
}

export default BannerRemind;
