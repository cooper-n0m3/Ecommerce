import React from 'react';
import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";
const BannerRemindComplete = () => {
  return (
    <Banner >
      <div className="flex w-full justify-between border-b border-gray-400 p-3 dark:border-gray-600 bg-gray-700">
        <div className="mx-auto flex items-center">
          <small className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <MdAnnouncement className="mr-4 h-4 w-4 text-yellow-400" />
            <span className="[&_p]:inline">
              If you want to edit product below, you need to make it to <p className='text-yellow-300'>*Draft</p> first and edit in <p className='text-yellow-300'>*Draft</p>.&nbsp;
            </span>
          </small>
        </div>
      </div>
    </Banner>
  );
}

export default BannerRemindComplete;
