import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useParams, useLocation } from 'react-router-dom';
import UserSession from '../user';
import Confetti from 'react-confetti';
import { FiCheckCircle } from 'react-icons/fi';

const ThankYouPage = () => {
  const { p_id } = useParams();
  const location = useLocation();
  const [productDetails, setProductDetails] = useState(null);

  const { paymentId, orderId, signature } = location.state || {};

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/productDetail?pid=${p_id}`, {
          headers: {
            auth: UserSession.getAuth(),
            'channel-code': 'ANDROID',
          },
        });
        setProductDetails(response.data.Data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [p_id]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="thank-you-page flex flex-col items-center p-8 bg-green-300 min-h-screen relative overflow-hidden">
      {/* Confetti effect */}
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      <div className="thank-you-content bg-white p-10 rounded-lg shadow-xl max-w-3xl w-full text-center relative z-10">
        {/* Animated Check Icon */}
        <div className="flex justify-center mb-6">
          <FiCheckCircle size={80} className="text-green-500 animate-bounce" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-green-500 mb-6">Thank You for Your Purchase!</h1>
        <p className="text-lg text-gray-600 mb-10">We're excited to get your order to you. Below are the details of your purchase.</p>
        
        <div className="order-summary mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          
          <div className="flex justify-center">
            <img
              src={`https://uoons.com/${productDetails.images[0]?.product_image}`}
              alt={productDetails.product_name}
              className="w-[300px] h-[350px] object-contain rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
            />
          </div>
          
          <div className="mt-6 text-left text-gray-700 space-y-4">
            <p className="text-lg"><strong>Order ID:</strong> {productDetails.pid}</p>
            <p className="text-lg"><strong>Product Name:</strong> {productDetails.product_name}</p>
            <div className='flex gap-7'>
              <p className="text-lg"><strong>Amount Paid:</strong> 	₹ {productDetails.product_sale_price}</p>
              <p className="text-lg"><strong>You Saved:</strong> 	₹ {productDetails.product_price - productDetails.product_sale_price}</p>
            </div>
          </div>
        </div>
        
        <div className="additional-info mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Additional Information</h2>
          <p className="text-lg text-gray-700"><strong>Payment ID:</strong> {paymentId}</p>
          <p className="text-lg text-gray-700"><strong>Order ID:</strong> {orderId}</p>
          <p className="text-lg text-gray-700"><strong>Signature:</strong> {signature}</p>
          <p className="text-lg text-gray-700 mt-4">Estimated Delivery Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p className="text-lg text-gray-600 mt-2">If you have any questions, feel free to contact our <span className='text-blue-500 underline cursor-pointer'>support team.</span> We're here to help!</p>
        </div>

        <div className="social-media flex justify-center space-x-6 mt-10">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
            <FaFacebook size={32} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors duration-300">
            <FaTwitter size={32} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 transition-colors duration-300">
            <FaInstagram size={32} />
          </a>
        </div>
      </div>

      {/* Glowing background circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
    </div>
  );
};

export default ThankYouPage;
