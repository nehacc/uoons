import React from "react";
import Logo from "../assets/xlLogoUoons.png";
import { BiSearchAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import ListComponentHome from "./ListComponentHome";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-md bg-white duration-200 relative z-50">

      {/* upper Navbar */}
      <div className="bg-white border-b border-b-orange-600 p-2 py-3">
        <div className="container flex flex-col gap-3 md:flex-row justify-center md:justify-between items-center">
          <div>
            <a href="/home">
              <img src={Logo} alt="Uoons-Logo" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row  items-center gap-3">
            {/* search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search your favorite products and brands"
                className="w-[400px] lg:w-[500px] lg:hover:w-[550px] transition-all duration-300 rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-orange-600   "
              />
              <BiSearchAlt className="text-gray-500 hover:text-orange-600 absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            <div className="flex gap-3">

            {/* wishlist button */}
            <button
              onClick={()=>navigate('/wishlist')}
              className="bg-orange-500 p-2 rounded-full text-xl text-white hover:scale-[1.1] duration-300"
            >
              <IoMdHeart />
            </button>
            {/* cart button */}
            <button
              onClick={()=>navigate('/AddToCart')}
              className="bg-orange-500 p-2 rounded-full text-xl text-white hover:scale-[1.1] duration-300"
            >
              <FaCartShopping />
            </button>
            {/* Profile button */}
            <button
              onClick={()=>navigate('/Profile')}
              className="bg-orange-500 p-2 rounded-full text-xl text-white hover:scale-[1.1] duration-300"
            >
              <FaRegUser />
            </button>

            
            </div>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="justify-center">
          
        <ListComponentHome/>
              
     
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
