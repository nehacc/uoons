import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LowerNavbar from '../components/LowerNavbar'
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import UserSession from '../user';
import ImageMagnification from '../components/ImageMagnification';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTag, } from 'react-icons/fa';
import EmiLogo from '../assets/emi-logo.png'
import { FaCartPlus } from "react-icons/fa";

import { FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaTruck, FaDollarSign, FaBoxOpen } from 'react-icons/fa';
import AvailabilityCheck from '../components/AvailabilityCheck';
import { BsFillCartPlusFill, BsFillBagFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaExchangeAlt, FaClipboardCheck, FaShieldAlt } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai';
import FrequentlyBought from '../components/FrequentlyBought';
import RatingsReview from '../components/RatingsReview';
import FaqsProduct from '../components/FaqsProduct'
import ProductsContainer from '../components/ProductsContainer';
import { useNavigate } from 'react-router-dom';
// hello






const PdTest = () => {
  const navigate = useNavigate();

  const notify = (msg) => toast(msg);

    const { p_id } = useParams();

    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [similarProductData, setsimilarProductData] = useState([])

    // Add to Recently Viewed
    const addToRecentlyViewed = async (p_id) => {
        try {
            const response = await axios.post(
                '/api/addRecentyViewedProduct',
                { product_id: p_id },
                {
                    headers: {
                        'Channel-Code': 'ANDROID',
                        'auth': UserSession.getAuth(),
                    },
                }
            );
            // alert("Recently Viewed Added");
        } catch (error) {
            console.error('Error adding to recently viewed:', error);
        }
    };

    const fetchProductData = async () => {
      try {
          const response = await axios.get(`/api/productDetail?pid=${p_id}`, {
              headers: {
                  'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                  'Accept': '*/*',
                  'channel-code': 'ANDROID',
                  'auth': UserSession.getAuth(),
              },
          });
          setProductData(response.data);
          addToRecentlyViewed(p_id);
          setLoading(false);
          setsimilarProductData(response.data.Data.similar_products)
      } catch (err) {
          setError(err);
          setLoading(false);
      }
  };

    // Fetching the product data
    useEffect(() => {
      
        fetchProductData();
        fetchBrandName();
    }, [p_id]); // Added p_id as a dependency

    const baseURL = "https://uoons.com/";

    const [coupon, setCoupon] = useState('');
    const handleApplyCoupon = () => {
        alert(`Coupon "${coupon}" applied!`);
    };

    const [amount, setAmount] = useState(1);

    const addToCart = async (event, pid) => {

        event.stopPropagation(); // Prevents the event from bubbling up to the div
        if (UserSession.getSession()) {
          try {
            const response = await axios.post('/api/addItemToCart',
              {
                pid: pid,
                qty: 1
              }, 
              {
                headers: {
                  'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                  'Accept': '*/*',
                  'Channel-Code': 'ANDROID',
                  'auth': UserSession.getAuth(),
                }
              });
            
            // Check response status
            if (response.data.status === 'success') {
              toast.success("Product added to Cart");
            }
          } catch (err) {
            toast.error("An error occurred while adding the item to the cart");
          }
        } else {
          toast.info("Please log in to add items to your cart.");
        }
      }

      // Function to parse the return policy string
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


        const [brandName, setBrandName] = useState('');
        const whatBrand = async (id) => {
            try {
                const response = await axios.post(
                    `/api/getBrandNameById?Brand_id=${id}`,
                    {
                        headers: {
                            'Channel-Code': 'ANDROID',
                            // 'auth': UserSession.getAuth(),
                        },
                    }
                );
        
                if (response.data && response.data.status === "success") {
                    return response.data.data.name; // Return the brand name
                } else {
                    console.error('Failed to retrieve brand name:', response.data.message);
                    return null; // Return null if there's an issue
                }
            } catch (error) {
                console.error('Error retrieving brand name:', error);
                return null; // Return null if an error occurs
            }
        };
        const fetchBrandName = async () => {
            const name = await whatBrand(productData.Data.brand);
            setBrandName(name || ''); // Set the brand name or an empty string if none is found
        };
        

        
        
        

    return (
        <>
            <Navbar />
            <LowerNavbar />
            {error && <p>Error loading product data.</p>}
            {loading?(<div>Loading...</div>):(
                // main-body_Description 
                <div className="p-2 bg-white w-screen">
                    {/* main-Section */}
                    <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6">
                        {/* productImage */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[500px]">
                            <ImageMagnification 
                                mainImage={baseURL + productData.Data.images[0].product_image} 
                                thumbnailImages={productData.Data.images.map(image => baseURL + image.product_image)} 
                            />
                            </div>
                        </div>
                        {/* main-description */}
                        <div className='flex items-start'>
                            {/* mid-section */}
                            <div className="flex flex-col p-4 gap-2 lg:w-custom">
                                {/* headings */}
                                <div>
                                    <span className="text-grey-100 font-semibold">{brandName}</span>
                                    <h1 className="text-3xl font-bold ">{productData.Data.product_name}</h1>
                                </div>
                                {/* ratings */}
                                <div className="flex items-center mt-1 pb-1 border-b border-gray-400">
                                    <div className="flex items-center text-yellow-400">
                                        {[...Array(Math.floor(productData.Data.rating.rating))].map((_, index) => <FaStar key={index} />)}
                                        {productData.Data.rating.rating % 1 !== 0 && <FaStarHalfAlt />}
                                        {[...Array(5 - Math.ceil(productData.Data.rating.rating))].map((_, index) => <FaRegStar key={index} />)}
                                    </div>
                                    <span className="ml-2 text-gray-600">({productData.Data.reviews.length} reviews)</span>
                                </div>
                                {/* pricing */}
                                <div className="flex flex-row items-center gap-3 mt-3">
                                    <h6 className="text-2xl font-semibold">₹{productData.Data.product_sale_price}</h6>
                                    <span className="line-through text-gray-500">₹{productData.Data.product_price}</span>
                                    <span className="bg-green-300 p-2 py-1 rounded-lg">({productData.Data.discount}% OFF)</span>
                                </div>
                                 {/* Emi option */}
                                <div className="text-gray-600 flex items-center gap-1">
                                    <img src={EmiLogo} alt="" className='w-10'/>
                                    <span>Starts at</span>
                                    ₹1209.91/- per month
                                </div>           
                                {/* apply coupon */}
                                <div className="mt-1 flex items-center gap-2">
                                    <FaTag className="text-green-600" />
                                    <input
                                        type="text"
                                        placeholder="Apply coupon code"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        className="border border-gray-300 rounded-l-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105 outline-0"
                                    />
                                    <button onClick={handleApplyCoupon} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105">Apply</button>
                                </div>
                                <AvailabilityCheck p_id={p_id} />
                                {/* set quantity and the buttons */}
                                <div className="flex flex-col items-start md:flex-row md:items-center gap-12 mt-4">
                                {/* quantity */}
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
                                <div className="flex gap-4 text-lg">
                                    <a
                                        onClick={(e) => { 
                                            e.stopPropagation();
                                            navigate(`/Checkout/${productData.Data.pid}`) }}
                                        className="relative flex items-center justify-center rounded-lg p-3 overflow-hidden group bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 hover:ring-4 hover:ring-orange-300 transition-all ease-out duration-300"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                        <span className="relative flex items-center space-x-2 text-lg font-bold">
                                        <BsFillBagFill />
                                        <span>BUY NOW</span>
                                        </span>
                                    </a>
                                    <a
                                        onClick={(e) => {
                                        addToCart(e, productData.Data.pid);
                                        }}
                                        className="relative flex items-center justify-center rounded-lg p-3 overflow-hidden group bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 hover:ring-4 hover:ring-orange-300 transition-all ease-out duration-300 cursor-pointer"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                        <span className="relative flex items-center space-x-2 text-lg font-bold">
                                        <FaCartPlus />
                                        <span>Add to Cart</span>
                                        </span>
                                    </a>
                                    </div>

                                </div>
                                {/* salient features and seller highlight */}
                                <div className='flex items-start gap-3 mt-6'>
                                <div className="p-6 bg-gradient-to-b from-orange-100 to-white shadow-lg rounded-lg border-orange-500 border ">
                                    <h3 className="text-2xl font-bold text-gray-800">Salient Features</h3>
                                    <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
                                    {productData.Data.salient_features.map((feature, index) => (
                                        <li key={index} className="text-lg leading-6">
                                        {feature}
                                        </li>
                                    ))}
                                    </ul>
                                </div>


                                <div className="p-6 bg-gradient-to-b from-orange-100 to-white shadow-lg rounded-lg border-orange-500 border">
                                    <h3 className="text-2xl font-bold text-gray-800">Shipping Information</h3>
                                    <div className="mt-2 text-gray-700">
                                    <div className="flex items-center mb-2">
                                        <AiOutlineHome className="mr-2 text-gray-600" size={20} />
                                        <p>Ships From: <span className="font-medium text-orange-600">Uoons</span></p>
                                    </div>
                                    <div className="flex items-center">
                                        <AiOutlineShop className="mr-2 text-gray-600" size={20} />
                                        <p>Sold By: <span className="font-medium text-blue-600">Lotus Electronics</span></p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                {/* return policy */}
                                <div className="mt-6 p-6 bg-white shadow rounded-lg">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Return Policy</h3>
                                    <div className="space-y-4">
                                    {(() => {
                                        const { summary, serviceType, covered } = parseReturnPolicy(productData.Data.return_policy);
                                        return (
                                        <>
                                            <div className="flex gap-2 items-start space-x-3">
                                            <FaExchangeAlt className="text-blue-500 text-2xl mt-1 w-[40px]" />
                                            <div>
                                                <h4 className="text-xl font-semibold text-gray-700">Warranty Summary</h4>
                                                <p className="text-gray-600">{summary}</p>
                                            </div>
                                            </div>
                                            <div className="flex gap-2 items-start space-x-3">
                                            <FaClipboardCheck className="text-green-500 text-2xl mt-1 w-[40px]" />
                                            <div>
                                                <h4 className="text-xl font-semibold text-gray-700">Service Type</h4>
                                                <p className="text-gray-600">{serviceType}</p>
                                            </div>
                                            </div>
                                            <div className="flex items-start space-x-3">
                                            <FaShieldAlt className="text-red-500 text-2xl mt-1 w-[40px]" />
                                            <div>
                                                <h4 className="text-xl font-semibold text-gray-700">Covered in Warranty</h4>
                                                <p className="text-gray-600">{covered}</p>
                                            </div>
                                            </div>
                                        </>
                                        );
                                    })()}
                                    </div>
                                </div>
                                
                                <FrequentlyBought pids={productData.Data.freqvently_bought}/>
                                {/* { pid, rating = { total: 0, rating: 0 }, reviews = []  */}
                                <RatingsReview pid={p_id} rating={productData.Data.rating} reviews={productData.Data.reviews} fetchProductData={fetchProductData}/>
                                <FaqsProduct pid={p_id} auth={UserSession.getAuth()}  fetchProductData={fetchProductData}/>
                                   

                            </div>
                        </div> 
                    </div>
                </div>
            )}
            <div className="bg-white duration-200">
                <ProductsContainer className='bg-white' heading={"Similar Products"} data={similarProductData}/>
            </div>


        <Footer />
        <ToastContainer />
 
           
        </>
    );
};

export default PdTest;

