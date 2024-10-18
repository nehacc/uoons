import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import { FaTruck, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LowerNavbar from '../components/LowerNavbar';
import Footer from '../components/Footer';
import UserSession from '../user';

const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
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
            'auth': UserSession.getAuth()
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

  const filteredOrders = orderData.filter((bundle) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'on-its-way' && bundle.orders?.status === '0') return true;
    if (selectedFilter === 'delivered' && bundle.orders?.status === '1') return true;
    if (selectedFilter === 'cancelled' && bundle.orders?.status === '2') return true;
    return false;
  });

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
        <h1 className="text-center font-semibold text-2xl text-slate-600 py-3">My Orders</h1>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`py-2 px-6 rounded-full transition-colors duration-300 ${
              selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setSelectedFilter('on-its-way')}
            className={`py-2 px-6 rounded-full transition-colors duration-300 ${
              selectedFilter === 'on-its-way' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            On Its Way
          </button>
          <button
            onClick={() => setSelectedFilter('delivered')}
            className={`py-2 px-6 rounded-full transition-colors duration-300 ${
              selectedFilter === 'delivered' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setSelectedFilter('cancelled')}
            className={`py-2 px-6 rounded-full transition-colors duration-300 ${
              selectedFilter === 'cancelled' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancelled
          </button>
        </div>

        {filteredOrders.length > 0 ? (
          filteredOrders.map((bundle) => (
            <div key={bundle.bundle_id} className="bg-white shadow-md rounded-lg p-5 mb-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order ID: #{bundle.bundle_id}
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
                    Placed on: {new Date(bundle.bundle_created).toDateString()} &bull; Total: ₹{bundle.orders?.amount || 0}
                  </p>
                </div>
                <div className="text-lg font-bold">
                  {bundle.orders && bundle.orders.status === '0' && <FaTruck className="text-blue-500" />}
                  {bundle.orders && bundle.orders.status === '1' && <FaCheckCircle className="text-green-500" />}
                  {bundle.orders && bundle.orders.status === '2' && <MdOutlineCancel className="text-red-500" />}
                </div>
              </div>

              {bundle.orders && bundle.orders.productid && (
                <div
                  className="flex items-center space-x-4 border border-gray-300 p-2 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => handleOrderClick(bundle.orders.id)}
                >
                  <img
                    src={`https://uoons.com/${bundle.orders.product_images}`}
                    alt={bundle.orders.product_name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{bundle.orders.product_name}</h3>
                    <p className="text-gray-600">Qty: {bundle.orders.qty}</p>
                    <p className="text-gray-600">Price: ₹{bundle.orders.product_sale_price}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No orders found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
