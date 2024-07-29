import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const wishlistData = [
  {
    id: 1,
    brand: "MSI",
    name: "MSI Thin GF63 A12VE-071IN",
    rating: 4.0,
    reviews: 400,
    price: 50000,
    originalPrice: 100000,
    discount: 50,
    images: [
      "https://m.media-amazon.com/images/I/51nifWngl-L._SX679_.jpg"
    ],
    description: "MSI GF63 Thin is a lightweight and powerful gaming laptop with Intel Core i5-12450H, 16GB DDR4 memory, and NVIDIA GeForce GTX 1650 Max-Q graphics.",
    salientFeatures: [
      "Intel Core i5-12450H",
      "16GB DDR4 memory",
      "NVIDIA GeForce GTX 1650 Max-Q graphics"
    ],
  },
  {
    id: 2,
    brand: "HP",
    name: "HP Victus Gaming Laptop fa1307TX",
    rating: 4.4,
    reviews: 120,
    price: 75000,
    originalPrice: 85000,
    discount: 12,
    images: [
      "https://m.media-amazon.com/images/I/41lGKvvMOeL._SX300_SY300_QL70_FMwebp_.jpg"
    ],
    description: "HP Victus Gaming Laptop with 13th Gen Intel Core i5-13420H, 16GB DDR4 memory, and NVIDIA GeForce RTX 2050 graphics.",
    salientFeatures: [
      "13th Gen Intel Core i5-13420H",
      "16GB DDR4 memory",
      "NVIDIA GeForce RTX 2050 graphics"
    ],
  }
];

const WishList = () => {
  const [wishlist, setWishlist] = useState(wishlistData);

  const removeFromWishlist = (id) => {
    const newWishlist = wishlist.filter(product => product.id !== id);
    setWishlist(newWishlist);
  };

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center bg-blue-100 min-h-screen py-8">
      <div className="w-[95%] my-5 relative">
        <div className="mx-auto flex">
          <div className="w-full p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">My Wishlist</h2>
            <p className="text-lg mb-6 text-center text-gray-600">{wishlist.length} items in your wishlist.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => {
                const discountPercentage = ((product.originalPrice - product.price) / product.originalPrice) * 100;
                return (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-48">
                      <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-contain" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-2">{product.brand}</p>
                      <p className="text-gray-700 mb-4">{product.description}</p>
                      <h4 className="text-lg font-semibold text-orange-600 mb-2">Salient Features:</h4>
                      <ul className="list-disc list-inside mb-4 text-gray-700">
                        {product.salientFeatures.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                          <span className="text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                          <span className="text-green-600 ml-2">({Math.round(discountPercentage)}% off)</span>
                        </div>
                        <button onClick={() => removeFromWishlist(product.id)} className="text-red-500 hover:text-red-700 transition-colors">
                          <FiTrash2 size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
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
