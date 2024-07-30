import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTag } from 'react-icons/fa';
import EmiLogo from '../assets/emi-logo.png';
import { FaMapMarkerAlt, FaCheckCircle, FaTruck, FaDollarSign, FaBoxOpen } from 'react-icons/fa';
import { BsFillCartPlusFill, BsFillBagFill } from 'react-icons/bs';
import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai';
import { FaExchangeAlt, FaClipboardCheck, FaShieldAlt } from 'react-icons/fa';
import FrequentlyBought from '../components/FrequentlyBought';
import RatingsReview from '../components/RatingsReview';
import FaqsProduct from '../components/FaqsProduct';
import ImageMagnification from '../components/ImageMagnification';

const product = {
  specifications: {
    "Sales Package": "Laptop, Power Adaptor, User Guide, Warranty Documents",
    // other specifications
  }
};

const ProductDescription = () => {
  const pid = 242; // for now!
  const auth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijc0MCIsInByb2ZpbGVpZCI6IjE5NzUyNzAwMzgiLCJuYW1lIjoiQWJoaXNoZWsgU2hhcm1hIiwiZW1haWwiOiJzaXRlbnR3ZWJAZ21haWwuY29tIiwibW9iaWxlX25vIjoiOTY5MTQwNzQ1NSIsIm90cCI6ODc0M30.8xH2Twey-4AskGA3y-LSiPs-lmGGOo9NQTw3DkpgIRE";

  const [ProductData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToRecentlyViewed = async () => {
    try {
      const response = await axios.post(
        'api/addRecentyViewedProduct',
        { product_id: pid },
        { headers: { 'Channel-Code': 'ANDROID', 'Auth': auth } }
      );
      console.log('Response:', response.data);
      alert("Recently View Added");
    } catch (error) {
      console.error('Error adding to recently viewed:', error);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/productDetail?pid=${pid}`, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'channel-code': 'ANDROID'
          }
        });
        setProductData(response.data);
        addToRecentlyViewed();
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProductData();
  }, [pid]);

  console.log(ProductData);

  const [coupon, setCoupon] = useState('');
  const handleApplyCoupon = () => {
    alert(`Coupon "${coupon}" applied!`);
  };

  const [pincode, setPincode] = useState(455001);
  const [availability, setAvailability] = useState(null);
  const handleCheckAvailability = async () => {
    const response = await fetch(`api/productLocationAvailability?pincode=${pincode}&pid=${pid}`, {
      method: 'GET',
      headers: { 'Channel-Code': 'ANDROID' }
    });
    const data = await response.json();
    setAvailability(data.Data);
  };

  const [amount, setAmount] = useState(1);

  const images = [
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf9afc0e-f0e0-46f3-b6d5-8e697afa47e2.__CR0,0,2000,2000_PT0_SX300_V1___.jpg",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf9afc0e-f0e0-46f3-b6d5-8e697afa47e2.__CR0,0,2000,2000_PT0_SX300_V1___.jpg",
    "https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf9afc0e-f0e0-46f3-b6d5-8e697afa47e2.__CR0,0,2000,2000_PT0_SX300_V1___.jpg"
  ];

  const parseReturnPolicy = (policy) => {
    const summaryMatch = policy.match(/Warranty Summary\s*:\s*(.+?)\s*Service Type\s*:/s);
    const serviceTypeMatch = policy.match(/Service Type\s*:\s*(.+?)\s*Covered in Warranty\s*:/s);
    const coveredMatch = policy.match(/Covered in Warranty\s*:\s*(.+)$/s);

    return {
      summary: summaryMatch ? summaryMatch[1].trim() : '',
      serviceType: serviceTypeMatch ? serviceTypeMatch[1].trim() : '',
      covered: coveredMatch ? coveredMatch[1].trim() : '',
    };
  };

  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const displayedSpecifications = showAllSpecs ? Object.entries(product.specifications) : Object.entries(product.specifications).slice(0, 4);

  const baseURL = "https://uoons.com/";

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        ProductData && ProductData.Data ? (
          <div className="p-3 bg-white w-screen">
            <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[300px]">
                  <ImageMagnification 
                    mainImage={baseURL + ProductData.Data.images[0].product_image} 
                    thumbnailImages={ProductData.Data.images.map(image => baseURL + image.product_image)} 
                  />
                </div>
              </div>

              <div className='flex items-start lg:w-custom xl:w-5/6'>
                <div className="flex flex-col p-6 gap-2 border border-black w-full xl:w-5/6">
                  <div>
                    <span className="text-grey-100 font-semibold">Brand-Name</span>
                    <h1 className="text-3xl font-bold ">{ProductData.Data.product_name}</h1>
                  </div>
                  <div className="flex items-center mt-1 pb-1 border-b border-gray-400">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(Math.floor(ProductData.Data.rating.rating))].map((_, index) => <FaStar key={index} />)}
                      {ProductData.Data.rating.rating % 1 !== 0 && <FaStarHalfAlt />}
                      {[...Array(5 - Math.ceil(ProductData.Data.rating.rating))].map((_, index) => <FaRegStar key={index} />)}
                    </div>
                    <span className="ml-2 text-gray-600">({ProductData.Data.reviews.length} reviews)</span>
                  </div>
                  <div className="flex flex-row items-center gap-3 mt-3">
                    <h6 className="text-2xl font-semibold">₹{ProductData.Data.product_sale_price}</h6>
                    <span className="line-through text-gray-500">₹{ProductData.Data.product_price}</span>
                    <span className="text-green-600">({ProductData.Data.discount}% OFF)</span>
                  </div>
                  <div className="text-gray-600 flex items-center gap-1">
                    <img src={EmiLogo} alt="" className='w-10'/>
                    <span>Starts at</span>
                    ₹1209.91/- per month
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <FaTag className="text-green-600" />
                    <input
                      type="text"
                      placeholder="Apply coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                    />
                    <button onClick={handleApplyCoupon} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105">Apply</button>
                  </div>
                  <div className="mt-1 p-6 bg-white shadow-lg rounded-lg w-fit">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Specifications</h2>
                    <ul className="text-gray-700 list-disc ml-6">
                      {displayedSpecifications.map(([key, value]) => (
                        <li key={key}>
                          <span className="font-bold">{key}:</span> {value}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setShowAllSpecs(!showAllSpecs)} className="mt-4 text-blue-500 font-semibold hover:underline">
                      {showAllSpecs ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                  <div className="flex flex-col mt-1 gap-3">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-green-600" />
                      <input
                        type="text"
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                      />
                      <button onClick={handleCheckAvailability} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105">Check Availability</button>
                    </div>
                    <div>
                      {availability ? (
                        <p className="text-green-600">Delivery available at {pincode}</p>
                      ) : (
                        <p className="text-red-600">Delivery not available at {pincode}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mt-1 gap-3">
                    <div className="flex items-center">
                      <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                        Buy Now
                      </button>
                      <div className="flex ml-4 gap-2 items-center">
                        <button className="bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                          Add to Cart
                        </button>
                        <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Return Policy</h2>
                    {ProductData.Data.return_policy && (
                      <div className="text-gray-700">
                        <p><span className="font-bold">Summary:</span> {parseReturnPolicy(ProductData.Data.return_policy).summary}</p>
                        <p><span className="font-bold">Service Type:</span> {parseReturnPolicy(ProductData.Data.return_policy).serviceType}</p>
                        <p><span className="font-bold">Covered:</span> {parseReturnPolicy(ProductData.Data.return_policy).covered}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <FrequentlyBought />
            <RatingsReview />
            <FaqsProduct />
          </div>
        ) : (
          <div>Error loading product data.</div>
        )
      )}
    </>
  );
};

export default ProductDescription;
