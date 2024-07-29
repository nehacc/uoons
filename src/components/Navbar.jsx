import React from "react";
import Logo from "../assets/xlLogoUoons.png";
import { BiSearchAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";



const DropdownLinks = [
  {
    id: 1,
    name: "lorem",
    link: "/#",
  },
  {
    id: 2,
    name: "lorem",
    link: "/#",
  },
  {
    id: 3,
    name: "lorem",
    link: "/#",
  },
];

const Navbar = () => {
  return (
    <div className="shadow-md bg-white duration-200 relative z-50">

      {/* upper Navbar */}
      <div className="bg-white border-b border-b-orange-600 p-2 py-3">
        <div className="container flex flex-col md:flex-row justify-center md:justify-between items-center">
          <div>
            <a href="/home">
              <img src={Logo} alt="Uoons-Logo" />
            </a>
          </div>

          <div className="w-full flex flex-col md:flex-row  items-center gap-4">
            {/* search bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search your favorite products and brands"
                className="w-full lg:w-[450px] lg:hover:w-[500px] transition-all duration-300 rounded-lg border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-orange-600   "
              />
              <BiSearchAlt className="text-gray-500 group-hover:text-orange-600 absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            <div className="flex gap-3">
            {/* Profile button */}
            <button
              
              className="bg-orange-600 transition-all duration-200 text-white px-4 py-1 rounded-lg flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Profile
              </span>
              <FaRegUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>

            {/* cart button */}
            <button
             
              className="bg-blue-600 transition-all duration-200 text-white px-4 py-1 rounded-lg flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Cart
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            </div>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div data-aos="zoom-in" className="flex justify-center">
        <ul className="sm:flex justify-center items-center  hidden gap-4 flex-wrap">
          {/* toprated */}
            <li>
              <a
                href="/"
                className="inline-block px-4 hover:text-orange-600 duration-200"
              >
                Top Rated
              </a>
            </li>
          
          {/* Trending Products-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Trending Products
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>


          {/* Audio-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Audio
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>


          {/* Gamming-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Gamming
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>


          {/* Refurbish-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Refurbish
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>


          {/* Periferals-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Periferals
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>


          {/* Mobile-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Mobile
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>


          {/* Appliance-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Appliance
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>


          {/* Smart Home-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Smart Home
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>


          {/* Laptop & Desktop-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Laptop & Desktop
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>


          {/* Smart Gadget-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Smart Gadget
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>



          {/* Personal & Healthcare-Dropdown and Links */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-[2px] py-2 hover:text-orange-600">
              Personal & Healthcare
              <span>
                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
              </span>
            </a>
            <div className="absolute z-[9999] border hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a
                      href={data.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button className=" cursor-pointer text-blue-700 py-1 ml-auto">
              View All
              </button>
            </div>
          </li>

        


          
          



          


          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
