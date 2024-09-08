import React from "react";
import { useState } from "react";
import Logo from "../assets/uoonsLogoXl.png";
import { BiSearchAlt } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import UserSession from "../user";
import { FaUser, FaBoxOpen, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
  const navigate = useNavigate();

  // for a button
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const logout = () => {
    UserSession.resetSession()
    toast.info("You're succesfully logged out!");
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      search()
    }
  };
  const search = () => {
    navigate('/ProductListSearch')
  }
  
  


  return (
    <div className="shadow-md bg-white duration-200 z-50 sticky top-[0px]">

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
            <div className="relative border rounded-full">
              <input
                type="text"
                placeholder="Search your favorite products and brands"
                className="w-[400px] lg:w-[500px] lg:hover:w-[550px] transition-all duration-300 rounded-full border-none px-4 py-2 shadow-lg focus:outline-none focus:ring-1 focus:ring-orange-600"
                onKeyDown={handleKeyDown}
              />
              <button onClick={search} className="absolute top-1/2 right-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center transform -translate-y-1/2">
                <BiSearchAlt className="text-xl" />
              </button>
            </div>

            {/* old search bar */}
            {/* <div className="relative">
              <input
                type="text"
                placeholder="Search your favorite products and brands"
                className="w-[400px] lg:w-[500px] lg:hover:w-[550px] transition-all duration-300 rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-orange-600   "
              />
              <BiSearchAlt className="cursor-pointer text-orange-600 text-xl absolute top-1/2 -translate-y-1/2 right-3" />
            </div> */}


            <div className="flex gap-3">

            {/* wishlist button */}
            <button
              onClick={() => navigate('/wishlist')}
              className="bg-orange-600 w-10 h-10 p-2 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transform duration-300"
            >
              <IoMdHeart className="text-xl" />
            </button>

            {/* cart button */}
            <button
              onClick={() => navigate('/AddToCart')}
              className="bg-orange-600 w-10 h-10 p-2 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transform duration-300"
            >
              <FaCartShopping className="text-xl" />
            </button>
           
            {/* Profile button */}
            <div className="relative">
              {/* Profile button */}
              <button
                onClick={() => navigate(UserSession.getAuth() ? '/profile' : '/auth')}
                className="z-10 bg-orange-600 w-10 h-10 p-2 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transform duration-300 relative"
                onMouseEnter={()=>setIsDropdownOpen(true)}
              >
                <FaUser className="text-xl" />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-2xl z-10 animate-fadeIn"
                  onMouseLeave={()=>setIsDropdownOpen(false)}
                >
                  
                  <ul className="text-gray-700">
                    {UserSession.getAuth() ? (
                      <>
                        <li>
                          <button
                            onClick={() => navigate('/profile')}
                            className="flex items-center w-full text-left px-4 py-3 hover:bg-orange-100 transition-colors duration-300"
                          >
                            <FaUser className="mr-3 text-orange-600" />
                            My Profile
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => navigate('/MyOrders2')}
                            className="flex items-center w-full text-left px-4 py-3 hover:bg-orange-100 transition-colors duration-300"
                          >
                            <FaBoxOpen className="mr-3 text-orange-600" />
                            My Orders
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={logout}
                            className="flex items-center w-full text-left px-4 py-3 hover:bg-orange-100 transition-colors duration-300"
                          >
                            <FaSignOutAlt className="mr-3 text-orange-600" />
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <button
                            onClick={() => navigate('/auth?mode=login')}
                            className="flex items-center w-full text-left px-4 py-3 hover:bg-orange-100 transition-colors duration-300"
                          >
                            <FaSignInAlt className="mr-3 text-orange-600" />
                            Login
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => navigate('/auth?mode=register')}
                            className="flex items-center w-full text-left px-4 py-3 hover:bg-orange-100 transition-colors duration-300"
                          >
                            <FaUserPlus className="mr-3 text-orange-600" />
                            Register
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>        
            </div>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      {/* <div className="flex justify-center">
        <ul className="justify-center">
          
          <ListComponentHome/>
              
     
        </ul>
      </div> */}
    </div>
  );
};

export default Navbar;
