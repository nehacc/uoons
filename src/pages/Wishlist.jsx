import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiCircleRemove } from "react-icons/ci";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserSession from '../user';

const WishList = (props) => {
  // const user_id = props.user_id;
  // const auth = props.auth;
  // for now:
  const user_id = 316;
  // const auth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijc0MCIsInByb2ZpbGVpZCI6IjE5NzUyNzAwMzgiLCJuYW1lIjoiQWJoaXNoZWsgU2hhcm1hIiwiZW1haWwiOiJzaXRlbnR3ZWJAZ21haWwuY29tIiwibW9iaWxlX25vIjoiOTY5MTQwNzQ1NSIsImZ0b2tlbiI6ImFkZmxqamZhc2xkZmprYSIsIm90cCI6NjA1Mn0.e36R2OF9THNrMBB0b4VlDa-1G1Z0TuMGLEGhbbfRKSU";

  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const response = await axios.get(`/api/getMyWishlist?user_id=${user_id}`, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'channel-code': 'ANDROID',
            'auth': UserSession.getAuth()
          }
        });

        setWishlistData(response.data.Data);
      } catch (err) {
        setError('Failed to fetch wishlist data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, [wishlistData]);

  const handleRemoveItem = async (pid) => {
    setRemoving(true);
    try {
      await axios.post("/api/removeWishlist",
        { pid },
        {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'channel-code': 'ANDROID',
            'auth': auth
          }
        }
      );
      setWishlistData(wishlistData.filter(product => product.id !== pid));
      alert(`Item with PID ${pid} removed from the wishlist`);
    } catch (err) {
      alert('Failed to remove item from wishlist.');
    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-blue-100 py-8">
        <div className="w-[95%] relative">
          <div className="mx-auto flex">
            <div className="w-full p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">My Wishlist</h2>
              <p className="text-lg mb-6 text-center text-gray-600">{wishlistData.length} items in your wishlist.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistData.map((product) => {
                  const discountPercentage = ((product.product_price - product.product_sale_price) / product.product_price) * 100;

                  return (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl flex flex-col">
                      <div className="relative h-48">
                        <img src={`https://uoons.com/${product.product_images}`} alt={product.product_name} className="absolute inset-0 w-full h-full object-contain" />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.product_name}</h3>
                        <div className="flex-grow"></div>
                        <div id="priveAndRemove" className="flex justify-between items-center mt-2">
                          <div>
                            <span className="text-xl font-bold text-gray-900">₹{product.product_sale_price}</span>
                            <span className="text-gray-500 line-through ml-2">₹{product.product_price}</span>
                            <span className="text-green-600 ml-2">({Math.round(discountPercentage)}% off)</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(product.pid)} 
                            className={`text-red-500 hover:text-red-700 transition-colors ${removing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            disabled={removing}
                          >
                            <CiCircleRemove size={35} className="font-extrabold" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-fit mx-auto mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
                <p>We'll let you know when the price drops for the items you like. Stay tuned!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
