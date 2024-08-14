import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaStar } from 'react-icons/fa';
import { IoMdHeart } from 'react-icons/io';
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSession from '../user';


const SpecificCategorieProduct = (props) => {
  const navigate = useNavigate();
    const cat_id = props.c_id;
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init();
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/getAllProductsByCategories?cat_id=${cat_id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                        'Accept': '*/*',
                        'channel-code': 'ANDROID',
                    },
                });
                setData(response.data.Data.products);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cat_id]);

    const addToWishlist = async (event, pid) => {
        event.stopPropagation(); // Prevents the event from bubbling up to the div
        if (UserSession.getSession()) {
          // Add to Wishlist
          try {
            const response = await axios.post('/api/addItemToWishlist',
              {
                pid: pid,
              }, 
              {
                headers: {
                  'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                  'Accept': '*/*',
                  'auth': UserSession.getAuth(),
                  'channel-code': 'ANDROID',
                }
              });
      
            // Check response status
            if (response.data.status === 'success') {
              toast.success("Product added to Wishlist");
            } else if (response.data.status === 'failure' && response.data.message === 'Item is already added to wishlist') {
              toast.info("Item is already added to your wishlist");
            }
          } catch (err) {
            toast.error("An error occurred while adding the item to the wishlist");
          }
        }
        else{
          toast.info("Please log in to add items to your wishlist.");
        }
      }

      const addToCart = async (event, pid) => {
        // hello hello
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

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">{error}</div>;
    }

    return (
        <div className="flex flex-wrap py-2 rounded-lg justify-center gap-4 ">
            {data.map((item) => (
                <div
                    onClick={()=>{navigate(`/PdTest/${item.pid}`)}}
                    key={item.pid}
                    id="product-container"
                    className="border p-3 rounded-lg shadow-lg w-[200px] space-y-2 hover:shadow-2xl flex flex-col items-center relative overflow-hidden bg-white"
                    data-aos="fade-up"
                >
                    <button
                        id="like"
                        onClick={(e) => addToWishlist(e, item.pid)}
                        className="absolute p-2 rounded-full text-lg bg-blue-300 right-[16px] top-[-40px] hover:top-[10px] duration-500 shadow-2xl text-white hover:text-red-500"
                        aria-label="Add to wishlist"
                    >
                        <IoMdHeart />
                    </button>
                    <img
                        src={`https://uoons.com/${item.product_images}`}
                        alt={item.product_name}
                        className="h-[120px] w-full object-contain rounded-md"
                    />
                    <div className="flex flex-col items-center">
                        <h3
                            id="title"
                            className="font-semibold text-lg h-[55px] overflow-hidden text-center"
                        >
                            {item.product_name}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                            <span>4</span>
                            <FaStar />
                            <span className="text-gray-500">(200 Reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <p className="text-lg font-bold text-primary">₹{item.product_sale_price}</p>
                            <p className="line-through text-gray-500">₹{item.product_price}</p>
                        </div>
                        <p className="text-green-600">{item.discount}% off</p>
                    </div>
                    <div id="buy-Cart" className="hidden w-full justify-center gap-5">
                        <a
                          onClick={(e) => { 
                          e.stopPropagation();
                          navigate(`/Checkout/${item.pid}`) }}
                            
                            className="relative rounded p-2 py-1 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300"
                        >
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative text-sm font-bold">BUY NOW</span>
                        </a>

                        <a
                            onClick={(e) => addToCart(e, item.pid)}
                            className="relative flex items-center justify-center rounded p-2 py-1 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300"
                            aria-label="Add to cart"
                        >
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative text-xl flex items-center"><FaCartPlus /></span>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SpecificCategorieProduct;
