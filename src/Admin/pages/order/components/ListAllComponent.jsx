import React from "react";
import { OrderList } from "../../../../redux/features/ecommerceTracking/OrderListTable";
import numeral from "numeral";
import { motion } from "motion/react";

const ListAllComponent = () => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-sm text-gray-500 bg-gray-800">
        <tr className="text-center">
          <th scope="col" className="px-6 py-3 ">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </th>
          <th scope="col" className="px-6 py-3 ">
            Order
          </th>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Customer
          </th>
          <th scope="col" className="px-6 py-3">
            Payment
          </th>
          <th scope="col" className="px-6 py-3">
            Total
          </th>
          <th scope="col" className="px-6 py-3">
            Delivery
          </th>
          <th scope="col" className="px-6 py-3">
            Items
          </th>
          <th scope="col" className="px-6 py-3">
            Fulfilment
          </th>
          <th scope="col" className="px-6 py-3">
            location
          </th>
        </tr>
      </thead>
                       

      <tbody className="">
        {OrderList.map((item, index) => (
          <motion.tr
          whileTap={{ scale: 0.95 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
            key={index}
            className="divide-y h-[50px] items-center text-center align-middle text-xs divide-gray-500 text-gray-300 "
          >
            <td className="px-6 py-3 truncate ">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-500 border-gray-300 rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </td>
            <td
              scope="row"
              className="px-6 truncate py-4 font-medium whitespace-nowrap dark:text-gray-500"
            >
              #{item.orderId}
            </td>
            <td className="px-6 py-3 truncate ">{item.orderDate}</td>
            <td className="px-6 py-3 truncate">
              <div className="max-w-24 pr-2 truncate flex bg-gray-600 justify-start rounded-full p-[1px]  items-center gap-2">
                <img
                  className="h-[25px] aspect-square rounded-full border border-gray-400 object-cover bg-no-repeat bg-cover"
                  src={item.customer.url}
                  alt=""
                />
                {item.customer.title}
              </div>
            </td>
            <td className="px-6 py-3 truncate">
              <button
                className={`px-2 border border-${item.paymentStatus.color} text-${item.paymentStatus.color} rounded`}
              >
                *{item.paymentStatus.title}
              </button>
            </td>
            <td className="px-6 py-3 truncate">
              ${numeral(item.total).format("0.0a")}
            </td>
            <td className="px-6 py-3 truncate">{item.delivery}</td>
            <td className="px-6 py-3 truncate">{item.orderQtyItem} items</td>
            <td className="px-6 py-3 truncate">
              <button
                className={`px-2 border border-${item.fulfilment.color} text-${item.fulfilment.color} rounded`}
              >
                *{item.fulfilment.title}
              </button>
            </td>
            <td className="px-6 py-4 truncate">
              <button className="px-2 border border-green-500 text-green-500 rounded">
                {item.location}
              </button>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListAllComponent;
