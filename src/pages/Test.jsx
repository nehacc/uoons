import React, { useState, useRef, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdAddShoppingCart } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSession from "../user";
import '../components/ProductsContainer.css';

const ProductsContainer = ({ data, heading }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollTo({ left: newScrollPosition, behavior: "smooth" });
  };

  const addToWishlist = async (pid) => {
    if (UserSession.getSession()) {
      try {
        const response = await axios.post('/api/addItemToWishlist', { pid }, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'auth': UserSession.getAuth(),
            'channel-code': 'ANDROID',
          }
        });
        if (response.data.status === 'success') {
          toast.success("Product added to Wishlist");
        } else if (response.data.status === 'failure' && response.data.message === 'Item is already added to wishlist') {
          toast.info("Item is already added to your wishlist");
        }
      } catch (err) {
        toast.error("An error occurred while adding the item to the wishlist");
      }
    } else {
      toast.info("Please log in to add items to your wishlist.");
    }
  };

  const addToCart = async (pid) => {
    if (UserSession.getSession()) {
      try {
        const response = await axios.post('/api/addItemToCart', { pid, qty: 1 }, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'Channel-Code': 'ANDROID',
            'auth': UserSession.getAuth(),
          }
        });
        if (response.data.status === 'success') {
          toast.success("Product added to Cart");
        }
      } catch (err) {
        toast.error("An error occurred while adding the item to the cart");
      }
    } else {
      toast.info("Please log in to add items to your cart.");
    }
  };

  return (
    <div className="mt-7 mb-12">
      <div className="container mx-auto">
        <div className="text-center mb-6 max-w-[600px] mx-auto">
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="text-xs text-gray-400">
            Explore our top-selling electronics with amazing discounts and offers.
          </p>
        </div>
        <div className="relative">
          <div
            ref={containerRef}
            className="overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth"
          >
            <div className="inline-flex space-x-4">
              {data.map((item) => (
                <div
                  key={item.pid}
                  id="product-container"
                  className="border p-3 rounded-lg shadow-lg w-[200px] space-y-2 hover:shadow-2xl flex-shrink-0 flex flex-col items-center relative overflow-hidden"
                  data-aos="fade-up"
                >
                  <button
                    id="like"
                    onClick={() => addToWishlist(item.pid)}
                    className="absolute p-2 rounded-full text-lg bg-blue-300 right-[16px] top-[-40px] hover:top-[10px] duration-500 shadow-2xl text-white hover:text-red-500"
                  >
                    <IoMdHeart />
                  </button>
                  <img
                    src={`https://uoons.com/${item.product_images}`}
                    alt="product"
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
                      href="#_"
                      className="relative rounded p-2 py-1 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300"
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      <span className="relative text-sm">BUY NOW</span>
                    </a>
                    <a
                      onClick={() => addToCart(item.pid)}
                      className="relative flex items-center justify-center rounded p-2 py-1 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300"
                    >
                      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                      <span className="relative text-xl flex items-center"><MdAddShoppingCart /></span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="absolute p-[0.4rem] text-[3rem] border-[5px] border-white bg-blue-100 text-orange-600 rounded-full left-[-37px] top-[47%]" onClick={() => handleScroll(-300)}>
            <MdOutlineKeyboardArrowLeft />
          </button>
          <button className="absolute p-[0.4rem] text-[3rem] border-[5px] border-white bg-blue-100 text-orange-600 rounded-full right-[-37px] top-[47%]" onClick={() => handleScroll(300)}>
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
        <div className="flex justify-center">
          <button className="text-center mt-10 cursor-pointer bg-orange-500 text-white py-1 px-5 rounded-md">
            View All
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductsContainer;
