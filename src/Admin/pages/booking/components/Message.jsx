import React from 'react';
import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";
const Message = () => {
  return (
    <Banner >
      <div className="">
        <div className="mx-auto flex items-center">
          <small className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <MdAnnouncement className="mr-4 h-4 w-4 text-yellow-400" />
            <span className="[&_p]:inline">
              If you want to make booking to <p className='text-yellow-300'>*Pending</p> or <p className='text-green-400'>*Completed</p> make sure room's status must be <p className='text-green-400'>*available </p>or <p className='text-red-500'>*checked-out </p>.&nbsp;
            </span>
          </small>
        </div>
      </div>
    </Banner>
  );
}

export default Message;
