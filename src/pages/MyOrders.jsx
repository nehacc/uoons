import React from "react";
import { FaBoxOpen, FaTruck, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const orders = [
  {
    id: "#2012343",
    date: "8 Jan 2022",
    total: "SAR 12000",
    status: "On It's Way",
    estimatedDelivery: "Arrives in Today",
    items: [
      { name: "HDI ADAPTER CABLE 654616010", method: "Pick Up", price: "SAR 2000", seller: "obikan", quantity: "2 Items" },
      { name: "Induction Motor 3 Phase, 1000 KW", method: "Delivering", price: "SAR 2000", seller: "obikan", quantity: "2 Items" },
      { name: "pressure regulator set regulator", method: "Pick Up", price: "SAR 2000", seller: "obikan", quantity: "2 Items" },
    ],
  },
  {
    id: "#2012343",
    date: "8 Jan 2022",
    total: "SAR 12000",
    status: "Cancelled",
    items: [
      { name: "HDI ADAPTER CABLE 654616010", method: "Pick Up", price: "SAR 2000", seller: "obikan", quantity: "2 Items" },
      { name: "Induction Motor 3 Phase, 1000 KW", method: "Delivering", price: "SAR 2000", seller: "obikan", quantity: "2 Items" },
      { name: "pressure regulator set regulator", method: "Pick Up", price: "SAR 2000", seller: "obikan", quantity: "2 Items" },
    ],
  },
  {
    id: "#2012343",
    date: "8 Jan 2022",
    total: "SAR 12000",
    status: "Delivered",
    items: [
      { name: "HDI ADAPTER CABLE 654616010", method: "Pick Up", price: "SAR 2000", seller: "obikan", quantity: "2 Items" },
      { name: "Induction Motor 3 Phase, 1000 KW", method: "Delivering", price: "SAR 2000", seller: "obikan", quantity: "2 Items" },
      { name: "pressure regulator set regulator", method: "Pick Up", price: "SAR 2000", seller: "obikan", quantity: "2 Items" },
    ],
  },
];

const MyOrders = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "On It's Way":
        return <FaTruck className="text-blue-500" />;
      case "Delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "Cancelled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.map((order, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Order ID: {order.id}</div>
            <div className="text-sm text-gray-500">{order.date}</div>
            <div className="text-lg font-semibold">{order.total}</div>
            <div className="flex items-center">
              {getStatusIcon(order.status)}
              <span className="ml-2 font-semibold text-sm">{order.status}</span>
            </div>
          </div>
          {order.status === "On It's Way" && (
            <div className="text-sm text-blue-500 mt-1">Estimated Delivery: {order.estimatedDelivery}</div>
          )}
          <table className="w-full mt-4 text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2">Product</th>
                <th className="pb-2">Shipping Method</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Seller</th>
                <th className="pb-2">QTY</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.method}</td>
                  <td className="py-2">{item.price}</td>
                  <td className="py-2">{item.seller}</td>
                  <td className="py-2">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
