import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LowerNavbar from '../components/LowerNavbar';
import Footer from '../components/Footer';

const OrderDetailPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useParams(); // assuming you're using react-router for routing

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`/api/fetch_order?order_id=${orderId}`, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'Accept': '*/*',
          'channel-code': 'ANDROID',
          'auth': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijc0MCIsInByb2ZpbGVpZCI6IjE5NzUyNzAwMzgiLCJuYW1lIjoiQWJoaXNoZWsgU2hhcm1hIiwiZW1haWwiOiJzaXRlbnR3ZWJAZ21haWwuY29tIiwibW9iaWxlX25vIjoiOTY5MTQwNzQ1NSIsIm90cCI6ODc0M30.8xH2Twey-4AskGA3y-LSiPs-lmGGOo9NQTw3DkpgIRE', // Replace with your auth token
        },
      });
      setOrderData(response.data.Data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch order details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!orderData) {
    return <div className="flex justify-center items-center h-screen">No order details available.</div>;
  }

  return (
    <>
    <Navbar />
    <LowerNavbar />
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Order Header */}
      <div className="flex justify-between items-center bg-orange-100 p-4 rounded-md">
        <div>
          <h2 className="text-lg font-bold">Order ID: {orderData.id}</h2>
          <p className="text-sm text-gray-600">Placed on: {orderData.created_at}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Total Amount: ₹{orderData.amount}</p>
          <p className={`text-sm ${orderData.status === '5' ? 'text-red-500' : 'text-green-500'}`}>
            {orderData.status === '5' ? 'Order Cancelled' : 'Order Completed'}
          </p>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col md:flex-row gap-4 my-6">
        <div className="flex-shrink-0">
          <img
            src={"https://uoons.com/" +orderData.product_images} // Ensure correct image URL path
            alt={orderData.product_name}
            className="w-64 h-64 object-cover rounded-lg"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold">{orderData.product_name}</h3>
          <p className="text-sm text-gray-600">SKU: {orderData.product_sku}</p>
          <p className="text-sm text-gray-600">Category: {orderData.product_category}</p>
          <div className="flex items-center my-2">
            <p className="text-lg font-bold text-orange-600">₹{orderData.product_sale_price}</p>
            <p className="text-sm text-gray-500 line-through ml-2">₹{orderData.product_price}</p>
            <p className="ml-2 text-green-500">({Math.round(((orderData.product_price - orderData.product_sale_price) / orderData.product_price) * 100)}% off)</p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: orderData.product_description }}
            className="text-sm text-gray-700 my-4"
          ></div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold">Shipping Information</h4>
        <p className="text-sm text-gray-600">{orderData.sname}</p>
        <p className="text-sm text-gray-600">
          {orderData.saddress1}, {orderData.saddress2}
        </p>
        <p className="text-sm text-gray-600">
          {orderData.scity}, {orderData.sstate} - {orderData.spincode}
        </p>
        <p className="text-sm text-gray-600">Phone: {orderData.smobile_no}</p>
      </div>

      {/* Billing Information */}
      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <h4 className="text-lg font-semibold">Billing Information</h4>
        <p className="text-sm text-gray-600">{orderData.bname}</p>
        <p className="text-sm text-gray-600">
          {orderData.baddress1}, {orderData.baddress2}
        </p>
        <p className="text-sm text-gray-600">
          {orderData.bcity}, {orderData.bstate} - {orderData.bpincode}
        </p>
        <p className="text-sm text-gray-600">Phone: {orderData.bmobile_no}</p>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h4 className="text-lg font-semibold">Additional Information</h4>
        <div
          dangerouslySetInnerHTML={{ __html: orderData.add_info }}
          className="text-sm text-gray-700 my-4"
        ></div>
        <div
          dangerouslySetInnerHTML={{ __html: orderData.return_policy }}
          className="text-sm text-gray-700"
        ></div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OrderDetailPage;
