import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import { FaTruck, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LowerNavbar from '../components/LowerNavbar';
import Footer from '../components/Footer';

const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOrderClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/bundleOrders', {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'channel-code': 'ANDROID',
            'auth': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijc0MCIsInByb2ZpbGVpZCI6IjE5NzUyNzAwMzgiLCJuYW1lIjoiQWJoaXNoZWsgU2hhcm1hIiwiZW1haWwiOiJzaXRlbnR3ZWJAZ21haWwuY29tIiwibW9iaWxlX25vIjoiOTY5MTQwNzQ1NSIsIm90cCI6ODc0M30.8xH2Twey-4AskGA3y-LSiPs-lmGGOo9NQTw3DkpgIRE', // Replace with your auth token
          },
        });

        if (response.data && Array.isArray(response.data.Data)) {
          setOrderData(response.data.Data);
        } else {
          setOrderData([]);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  return (
    <>
    <Navbar />
    <LowerNavbar />
    <div className="container mx-auto p-4">
        <h1 className='text-center font-semibold text-xl text text-slate-600 py-3 '>My Orders</h1>
      <div className="flex space-x-4 mb-4">
        <button className="py-2 px-4 bg-blue-500 text-white rounded-full">All Orders</button>
        <button className="py-2 px-4 bg-gray-300 text-gray-700 rounded-full">Pending</button>
        <button className="py-2 px-4 bg-gray-300 text-gray-700 rounded-full">Confirmed</button>
        <button className="py-2 px-4 bg-gray-300 text-gray-700 rounded-full">On Its Way</button>
        <button className="py-2 px-4 bg-gray-300 text-gray-700 rounded-full">Delivered</button>
        <button className="py-2 px-4 bg-gray-300 text-gray-700 rounded-full">Cancelled</button>
      </div>

      {Array.isArray(orderData) && orderData.length > 0 ? (
        orderData.map((bundle) => (
          <div key={bundle.bundle_id}
           className="bg-white shadow rounded-lg p-4 mb-4"
           >
            {/* {console.log(bundle.orders)} */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Order ID: #{bundle.bundle_id}
                  {/* Null Check for orders object */}
                  {bundle.orders && bundle.orders.status === '0' ? (
                    <span className="text-blue-500"> On Its Way</span>
                  ) : bundle.orders && bundle.orders.status === '1' ? (
                    <span className="text-green-500"> Delivered</span>
                  ) : bundle.orders && bundle.orders.status === '2' ? (
                    <span className="text-red-500"> Cancelled</span>
                  ) : (
                    <span className="text-gray-500"> Unknown Status</span>
                  )}
                </h2>
                <p className="text-gray-600">
                  Placed on: {new Date(bundle.bundle_created).toDateString()} &bull; Total: SAR {bundle.orders?.amount || 0}
                </p>
              </div>
              <div className="text-lg font-bold">
                {bundle.orders && bundle.orders.status === '0' && <FaTruck className="text-blue-500" />}
                {bundle.orders && bundle.orders.status === '1' && <FaCheckCircle className="text-green-500" />}
                {bundle.orders && bundle.orders.status === '2' && <MdOutlineCancel className="text-red-500" />}
              </div>
            </div>
            
            {bundle.orders && bundle.orders.productid && (
              <div className="flex items-center space-x-4 border border-slate-700 p-1 rounded-lg cursor-pointer"
                    onClick={() => handleOrderClick(bundle.orders.id)}
           >
                <img
                  src={"https://uoons.com/" + bundle.orders.product_images}
                  alt={bundle.orders.product_name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-sm font-semibold">{bundle.orders.product_name}</h3>
                  <p className="text-gray-600">Qty: {bundle.orders.qty}</p>
                  <p className="text-gray-600">Price: SAR {bundle.orders.product_sale_price}</p>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No orders found.</div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default MyOrders;
