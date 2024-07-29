import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import { FaStar, FaStarHalfAlt, FaRegStar, FaTag, } from 'react-icons/fa';
import { BsFillCartPlusFill, BsFillBagFill } from 'react-icons/bs';
import EmiLogo from '../assets/emi-logo.png'
import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai';
import FrequentlyBought from '../components/FrequentlyBought';
import RatingsReview from '../components/RatingsReview';
import FaqsProduct from '../components/FaqsProduct'
import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaTruck, FaDollarSign, FaBoxOpen } from 'react-icons/fa';

import axios from 'axios';


const product = {
  brand: "MSI",
  name: "MSI GF63 Thin, Intel Core i5-11260H, 40CM FHD 60Hz Gaming Laptop(16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeForce GTX 1650 Max Q, GDDR6 4GB/Black/1.8Kg), 11SC-1493IN",
  rating: 4.0,
  reviews: 400,
  price: 50000,
  originalPrice: 100000,
  discount: 50,
  emi: "₹1209.91/- per month",
  images: [
    "https://m.media-amazon.com/images/I/51nifWngl-L._SX679_.jpg",
    "https://m.media-amazon.com/images/I/41ZTSKvhmZL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/317pB2MO57L._SX679_.jpg",
    "https://m.media-amazon.com/images/I/81TurWp5IdL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/71Wy96L0h1L._SX679_.jpg"
  ],
  description: "MSI GF63 Thin is a lightweight and powerful gaming laptop with Intel Core i5-12450H, 16GB DDR4 memory, and NVIDIA GeForce GTX 1650 Max-Q graphics.",
  specifications: {
    "Sales Package": "Laptop, Power Adaptor, User Guide, Warranty Documents",
    "Model Number": "GF63 Thin 11UCX-1496IN",
    "Part Number": "9S7-16R612-1496",
    "Series": "GF63",
    "Color": "Black",
    "Type": "Gaming Laptop",
    "Suitable For": "Gaming",
    "Power Supply": "120W AC Adapter",
    "Battery Cell": "3 Cell",
    "MS Office Provided": "No",
    "Processor Brand": "Intel",
    "Processor Name": "Core i5",
    "Processor Generation": "11th Gen",
    "SSD": "Yes",
    "SSD Capacity": "512 GB",
    "RAM": "16 GB",
    "RAM Type": "DDR4",
    "Clock Speed": "2.6 GHz with Turbo Boost Upto 4.4 GHz",
    "Cache": "12 MB",
    "Graphic Processor": "NVIDIA GeForce RTX 2050",
    "Number of Cores": "4",
    "OS Architecture": "64 bit",
    "Operating System": "Windows 11 Home",
    "System Architecture": "64 bit",
    "Mic In": "Yes",
    "RJ45": "Yes",
    "USB Port": "1 x Type-C USB 3.2 Gen 1, 3 x Type-A USB 3.2 Gen 1",
    "HDMI Port": "1 x HDMI (4k @ 30Hz)",
    "Multi Card Slot": "No",
    "Touchscreen": "No",
    "Screen Size": "15.6 inch",
    "Screen Resolution": "1920 x 1080 Pixel",
    "Screen Type": "Full HD LED Backlit IPS Display (144Hz Refresh Rate)",
    "Speakers": "Built-in Dual Speakers",
    "Internal Mic": "Built-in Microphone",
    "Sound Properties": "Nahimic 3",
    "Wireless LAN": "Intel Wi-Fi 6 AX201 (2x2)",
    "Bluetooth": "v5.2",
    "Dimensions": "359 x 254 x 21.7 mm",
    "Weight": "1.86 kg",
  },
  highlights: [
    "Lightweight and portable design",
    "High-performance components for gaming and multitasking",
    "Vivid Full HD display",
    "Efficient cooling system"
  ],
  salientFeatures: [
    "Powerful Intel Core i5 processor for seamless performance",
    "NVIDIA GeForce GTX 1650 Max-Q for stunning graphics",
    "High-speed 512GB NVMe SSD for quick data access",
    "16GB DDR4 RAM for efficient multitasking",
  ],
  shippingInfo: {
    shipsFrom: "Uoons",
    soldBy: "Lotus Electronics"
  }
};

const ProductPage = () => {

  const pid = 242; // for now!
  const auth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijc0MCIsInByb2ZpbGVpZCI6IjE5NzUyNzAwMzgiLCJuYW1lIjoiQWJoaXNoZWsgU2hhcm1hIiwiZW1haWwiOiJzaXRlbnR3ZWJAZ21haWwuY29tIiwibW9iaWxlX25vIjoiOTY5MTQwNzQ1NSIsIm90cCI6ODc0M30.8xH2Twey-4AskGA3y-LSiPs-lmGGOo9NQTw3DkpgIRE"

  // Fetch Product Detail:
  const [ProductData, setProductData] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(ProductData)
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProductData();
  }, []); 


  const [activeImg, setActiveImage] = useState(product.images[0]);
  const [amount, setAmount] = useState(1);
  const [pincode, setPincode] = useState(455001);
  const [availability, setAvailability] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const handleCheckAvailability = async () => {
    const response = await fetch(`api/productLocationAvailability?pincode=${pincode}&pid=1125`, {
      method: 'GET',
      headers: {
        'Channel-Code': 'ANDROID'
      }
    });
    const data = await response.json();
    setAvailability(data.Data);
  };
  const handleApplyCoupon = () => {
    alert(`Coupon "${coupon}" applied!`);
  };

  const displayedSpecifications = showAllSpecs ? Object.entries(product.specifications) : Object.entries(product.specifications).slice(0, 4);

  return (
    <>
    <Navbar />

    {/* main-body_Description */}
    <div className="p-3 bg-white">


      <div className="flex flex-col lg:flex-row gap-6">

        {/* productImage */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-1/4 xl:w-1/4">
          <img src={activeImg} alt="product-image" className="w-full h-96 object-contain rounded-xl border border-black transition duration-300 ease-in-out transform" />
          <div className="flex flex-row sm:flex-col lg:flex-row gap-4 overflow-scroll border border-black">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`img-${index}`}
                className={`w-16 h-16 rounded-md cursor-pointer border transition duration-300 ease-in-out transform hover:scale-110 ${activeImg === img ? 'border-violet-600' : 'border-gray-200'}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>
        

        <div className='flex lg:w-3/4'>
        <div className="flex flex-col p-6 gap-2 border border-black w-full xl:w-5/6">
          <div>
            <span className="text-grey-100 font-semibold">{product.brand}</span>
            <h1 className="text-3xl font-bold ">{product.name}</h1>
          </div>
          <div className="flex items-center mt-1 pb-1 border-b border-gray-400">
            <div className="flex items-center text-yellow-500">
              {[...Array(Math.floor(product.rating))].map((_, index) => <FaStar key={index} />)}
              {product.rating % 1 !== 0 && <FaStarHalfAlt />}
              {[...Array(5 - Math.ceil(product.rating))].map((_, index) => <FaRegStar key={index} />)}
            </div>
            <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
          </div>
          <div className="flex flex-row items-center gap-3 mt-3">
            <h6 className="text-2xl font-semibold">₹{product.price}</h6>
            <span className="line-through text-gray-500">₹{product.originalPrice}</span>
            <span className="text-green-600">({product.discount}% OFF)</span>
          </div>
          <div className="text-gray-600 flex items-center gap-1">
            <img src={EmiLogo} alt="" className='w-10'/>
            <span>Starts at</span>
            { product.emi}
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">Check Availability</h2>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                />
                <button
                  onClick={handleCheckAvailability}
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Check
                </button>
              </div>
              {availability && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Availability Details</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className={`text-${availability.isServiceable ? 'green' : 'red'}-600`} />
                      <span>{availability.isServiceable ? 'Serviceable' : 'Not Serviceable'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaDollarSign className="text-gray-600" />
                      <span>Shipping Charge: ${availability.shippingCharge}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaTruck className="text-gray-600" />
                      <span>Expected Delivery: {availability.expDeliveryTime}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaBoxOpen className="text-gray-600" />
                      <span>Stock Status: {availability.stock_availability}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className={`text-${availability.isCOD ? 'green' : 'red'}-600`} />
                      <span>{availability.isCOD ? 'COD Available' : 'COD Not Available'}</span>
                    </li>
                  </ul>
                </div>
              )}
    </div>






          <div className="flex flex-col items-start md:flex-row md:items-center gap-12 mt-4">


          <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold text-gray-700">Set Quantity:</h2>
      <div className="flex flex-row items-center rounded-lg shadow-md">
        <button
          className="bg-gray-200 px-3 text-gray-700 text-3xl rounded-l-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300"
          onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
        >
          -
        </button>
        <span className=" px-5 text-lg text-gray-700">{amount}</span>
        <button
          className="bg-gray-200 px-3 text-gray-700 text-3xl rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300"
          onClick={() => setAmount((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    </div>


            <div className='flex gap-3 text-lg'>
            <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-xl h-full flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105">
              <BsFillCartPlusFill />
              Add to Cart
            </button>
            <button className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl h-full flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105">
              <BsFillBagFill />
              Buy Now
            </button>
            </div>
          </div>

          


          
          

            <div className='flex items-start gap-3 mt-6 xl:hidden'>
          <div className="p-6 bg-white shadow-lg rounded-lg ">
            <h3 className="text-2xl font-bold text-gray-800">Salient Features</h3>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              {product.salientFeatures.map((feature, index) => (
                <li key={index} className="text-lg leading-6">
                  {feature}
                </li>
              ))}
            </ul>
          </div>


          <div className="p-6 bg-white shadow-lg rounded-lg xl:hidden">
            <h3 className="text-2xl font-bold text-gray-800">Shipping Information</h3>
            <div className="mt-2 text-gray-700">
              <div className="flex items-center mb-2">
                <AiOutlineHome className="mr-2 text-gray-600" size={20} />
                <p>Ships From: <span className="font-medium text-orange-600">{product.shippingInfo.shipsFrom}</span></p>
              </div>
              <div className="flex items-center">
                <AiOutlineShop className="mr-2 text-gray-600" size={20} />
                <p>Sold By: <span className="font-medium">{product.shippingInfo.soldBy}</span></p>
              </div>
            </div>
          </div>
           </div>


          <div className="mt-6 p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800">Product Description</h3>
            <div className="mt-4">
              <img
                src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf9afc0e-f0e0-46f3-b6d5-8e697afa47e2.__CR0,0,2000,2000_PT0_SX300_V1___.jpg"
                alt="Product Image"
                className="w-[300px] mx-auto rounded-md"
              />
              <p className="mt-4 text-gray-700 text-lg leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla commodi quam laboriosam ea, adipisci distinctio modi omnis vero at exercitationem iure voluptas! Laborum aliquam sit accusamus non, voluptas iure optio nemo blanditiis eos libero amet tempora necessitatibus neque a odit facere velit veniam consectetur rem eligendi saepe pariatur ab. Aliquam.
              </p>
            </div>


            <div className="mt-4">
              <img
                src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf9afc0e-f0e0-46f3-b6d5-8e697afa47e2.__CR0,0,2000,2000_PT0_SX300_V1___.jpg"
                alt="Product Image"
                className="w-[300px] mx-auto rounded-md"
              />
              <p className="mt-4 text-gray-700 text-lg leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla commodi quam laboriosam ea, adipisci distinctio modi omnis vero at exercitationem iure voluptas! Laborum aliquam sit accusamus non, voluptas iure optio nemo blanditiis eos libero amet tempora necessitatibus neque a odit facere velit veniam consectetur rem eligendi saepe pariatur ab. Aliquam.
              </p>
            </div>


            <div className="mt-4">
              <img
                src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/cf9afc0e-f0e0-46f3-b6d5-8e697afa47e2.__CR0,0,2000,2000_PT0_SX300_V1___.jpg"
                alt="Product Image"
                className="w-[300px] mx-auto rounded-md"
              />
              <p className="mt-4 text-gray-700 text-lg leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla commodi quam laboriosam ea, adipisci distinctio modi omnis vero at exercitationem iure voluptas! Laborum aliquam sit accusamus non, voluptas iure optio nemo blanditiis eos libero amet tempora necessitatibus neque a odit facere velit veniam consectetur rem eligendi saepe pariatur ab. Aliquam.
              </p>
            </div>
          </div>


          <div className="mt-6 p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800">Specifications</h3>
            <table className="mt-4 text-gray-700 w-full">
              <tbody>
                {displayedSpecifications.map(([key, value], index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-[#f2f2f2]' : 'bg-white'}`}
                  >
                    <td className="py-3 px-4 font-semibold text-gray-800">{key}</td>
                    <td className="py-3 px-4">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="text-blue-600 mt-4 font-semibold hover:underline"
              onClick={() => setShowAllSpecs(!showAllSpecs)}
            >
              {showAllSpecs ? 'Show less' : 'Show more'}
            </button>
          </div>



          

          <FrequentlyBought />
          <RatingsReview />
          <FaqsProduct />


          
        </div>


                <div className='hidden xl:flex flex-col w-1/6'>
                <div className='flex flex-col items-start gap-3 mt-6'>
          <div className="p-6 bg-white shadow-xl rounded-lg ">
            <h3 className="text-2xl font-bold text-gray-800">Salient Features</h3>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              {product.salientFeatures.map((feature, index) => (
                <li key={index} className="text-lg leading-6">
                  {feature}
                </li>
              ))}
            </ul>
          </div>


          <div className="p-6 bg-white shadow-xl rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800">Shipping Information</h3>
            <div className="mt-2 text-gray-700">
              <div className="flex items-center mb-2">
                <AiOutlineHome className="mr-2 text-gray-600" size={20} />
                <p>Ships From: <span className="font-medium text-orange-600">{product.shippingInfo.shipsFrom}</span></p>
              </div>
              <div className="flex items-center">
                <AiOutlineShop className="mr-2 text-gray-600" size={20} />
                <p>Sold By: <span className="font-medium">{product.shippingInfo.soldBy}</span></p>
              </div>
            </div>
          </div>
           </div>
                </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductPage;
