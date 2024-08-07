import React, { useRef, useEffect } from "react";
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import '../components/ProductsContainer.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSession from "../user";
import { useNavigate } from 'react-router-dom';


const ProductsContainer = (props) => {
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  const scrollRef = useRef(null);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      if (direction === "left") {
        current.scrollBy({ left: -200, behavior: "smooth" });
      } else {
        current.scrollBy({ left: 200, behavior: "smooth" });
      }
    }
  };

  const { data, heading } = props;

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
    // hello
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
  
  

  

  return (
    <div className="mt-7 mb-12">
      <div className="container mx-auto">
        {/* Header section */}
        <div className="text-center mb-6 max-w-[600px] mx-auto">
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="text-xs text-gray-400">
            Explore our top-selling electronics with amazing discounts and offers.
          </p>
        </div>
        {/* Body section */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex flex-wrap py-2 rounded-lg justify-center gap-4 overflow-x-scroll scrollbar-hide"
          >
            {/* card section */}
            {data.map((item) => (
              <div
                onClick={()=>{navigate(`/ProductDescription/${item.pid}`)}}
                key={item.pid}
                id="product-container"
                className="border p-3 rounded-lg shadow-lg w-[200px] space-y-2 hover:shadow-2xl flex flex-col items-center relative overflow-hidden"
                data-aos="fade-up"
              >
                <button
                  id="like"
                  onClick={(e)=>{addToWishlist(e, item.pid)}}
                  className="absolute p-2 rounded-full text-lg bg-blue-300 right-[16px] top-[-40px] hover:top-[10px] duration-500 shadow-2xl text-white hover:text-red-500"
                >
                  <IoMdHeart />
                </button>
                <img
                  src={"https://uoons.com/" + item.product_images}
                  alt="image"
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
                    onClick={(e)=>{addToCart(e, item.pid)}}
                    className="relative flex items-center justify-center rounded p-2 py-1 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300"
                  >
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative text-xl flex items-center"><MdAddShoppingCart /></span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* Scroll buttons for large screens */}
          <div className="hidden lg:flex absolute top-1/2 transform -translate-y-1/2 w-full justify-between px-2">
            <button
              onClick={() => scroll("left")}
              className="bg-white shadow-lg rounded-full p-2"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-white shadow-lg rounded-full p-2"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        {/* view all button */}
        <div className="flex justify-center">
          <button className="text-center mt-10 cursor-pointer bg-orange-500 text-white py-1 px-5 rounded-md">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;

