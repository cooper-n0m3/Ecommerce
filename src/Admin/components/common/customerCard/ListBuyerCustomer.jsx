import React from "react";
import { Card } from "flowbite-react";

const ListBuyerCustomer = () => {
  return (
    
    <Card className="flex w-full border border-gray-400 border-opacity-50 bg-gray-900 justify-start">
      <div className="flex  items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-400">Latest Customers Paid</h5>
        <button href="#" className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          View all
        </button>
      </div>
      <div className="flow-root border-t border-gray-500 border-opacity-50 bg-gray-800 rounded h-64 Hide-Scrollbar hover:cursor-all-scroll">
        <ul className="divide-y p-2 divide-gray-500 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Neil img"
                  height="32"
                  src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/18fafc59-b8f8-4cfd-adb0-ebda9da48e03/4721eea8-03cf-4935-aa3d-0e74bdd2d034.png"
                  width="32"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-500 dark:text-white">Neil Sims</p>
                <p className="truncate text-sm text-gray-300 dark:text-gray-400">email@windster.com</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-green-500 dark:text-white">+$320</div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Neil img"
                  height="32"
                  src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/18fafc59-b8f8-4cfd-adb0-ebda9da48e03/4721eea8-03cf-4935-aa3d-0e74bdd2d034.png"
                  width="32"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-500 dark:text-white">Neil Sims</p>
                <p className="truncate text-sm text-gray-300 dark:text-gray-400">email@windster.com</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-green-500 dark:text-white">+$320</div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Neil img"
                  height="32"
                  src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/18fafc59-b8f8-4cfd-adb0-ebda9da48e03/4721eea8-03cf-4935-aa3d-0e74bdd2d034.png"
                  width="32"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-500 dark:text-white">Neil Sims</p>
                <p className="truncate text-sm text-gray-300 dark:text-gray-400">email@windster.com</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-green-500 dark:text-white">+$320</div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Neil img"
                  height="32"
                  src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/18fafc59-b8f8-4cfd-adb0-ebda9da48e03/4721eea8-03cf-4935-aa3d-0e74bdd2d034.png"
                  width="32"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-500 dark:text-white">Neil Sims</p>
                <p className="truncate text-sm text-gray-300 dark:text-gray-400">email@windster.com</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-green-500 dark:text-white">+$320</div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt="Neil img"
                  height="32"
                  src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/18fafc59-b8f8-4cfd-adb0-ebda9da48e03/4721eea8-03cf-4935-aa3d-0e74bdd2d034.png"
                  width="32"
                  className="rounded-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-500 dark:text-white">Neil Sims</p>
                <p className="truncate text-sm text-gray-300 dark:text-gray-400">email@windster.com</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-green-500 dark:text-white">+$320</div>
            </div>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default ListBuyerCustomer;
